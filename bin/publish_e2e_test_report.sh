#!/bin/bash

set -euo pipefail

: "${GITHUB_APP_TOKEN:?Missing GITHUB_APP_TOKEN}"
: "${DRONE_REPO:?Missing DRONE_REPO}"
: "${DRONE_BUILD_NUMBER:?Missing DRONE_BUILD_NUMBER}"
: "${DRONE_BUILD_LINK:?Missing DRONE_BUILD_LINK}"
: "${DRONE_COMMIT_SHA:?Missing DRONE_COMMIT_SHA}"

REPORT_FILE="${REPORT_FILE:-allure-report/index.html}"
if [ ! -s "$REPORT_FILE" ]; then
  echo "Missing Allure report at ${REPORT_FILE}" >&2
  exit 1
fi

if [ -n "${DRONE_PULL_REQUEST:-}" ]; then
  REPORT_ID="pr-${DRONE_PULL_REQUEST}"
  RELEASE_NAME="GRO Allure Report PR #${DRONE_PULL_REQUEST}"
else
  REPORT_ID="nightly"
  RELEASE_NAME="GRO Nightly Allure Report"
fi

WORK_DIR="$(mktemp -d)"
trap 'rm -rf "$WORK_DIR"' EXIT

GH_API="https://api.github.com/repos/${DRONE_REPO}"
TAG_NAME="${REPORT_ID}-allure-report"
ASSET_PREFIX="allure-report-${REPORT_ID}"
REPORT_ASSET="${ASSET_PREFIX}-build-${DRONE_BUILD_NUMBER}.html"
COMMENT_MARKER="<!-- gro-playwright-report -->"
RESPONSE_FILE="${WORK_DIR}/response.json"

github_request() {
  local method="$1"
  local url="$2"
  local expected_status="$3"
  shift 3

  HTTP_CODE="$(curl -sS -o "$RESPONSE_FILE" -w "%{http_code}" \
    -X "$method" \
    -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "$@" "$url")"

  if ! [[ "$HTTP_CODE" =~ $expected_status ]]; then
    echo "GitHub ${method} ${url} failed (HTTP ${HTTP_CODE})" >&2
    sed -n '1,30p' "$RESPONSE_FILE" >&2
    exit 1
  fi

  if [ "$HTTP_CODE" != "204" ] && ! jq -e . "$RESPONSE_FILE" >/dev/null; then
    echo "GitHub ${method} ${url} returned invalid JSON" >&2
    exit 1
  fi
}

github_request GET "${GH_API}/releases/tags/${TAG_NAME}" '^(200|404)$'
if [ "$HTTP_CODE" = "404" ]; then
  github_request POST "${GH_API}/releases" '^201$' \
    -H "Content-Type: application/json" \
    --data "$(jq -n --arg tag "$TAG_NAME" \
      --arg name "$RELEASE_NAME" \
      --arg commit "$DRONE_COMMIT_SHA" \
      '{tag_name:$tag,name:$name,target_commitish:$commit,prerelease:true,draft:false}')"
fi
RELEASE_ID="$(jq -er '.id | numbers' "$RESPONSE_FILE")"

page=1
: > "${WORK_DIR}/asset-ids.txt"
while :; do
  github_request GET "${GH_API}/releases/${RELEASE_ID}/assets?per_page=100&page=${page}" '^200$'
  jq -er 'type == "array"' "$RESPONSE_FILE" >/dev/null
  jq -r --arg prefix "$ASSET_PREFIX" \
    '.[] | select(.name | startswith($prefix + "-")) | .id' \
    "$RESPONSE_FILE" >> "${WORK_DIR}/asset-ids.txt"
  [ "$(jq 'length' "$RESPONSE_FILE")" -eq 100 ] || break
  page=$((page + 1))
done

while IFS= read -r asset_id; do
  github_request DELETE "${GH_API}/releases/assets/${asset_id}" '^204$'
done < "${WORK_DIR}/asset-ids.txt"

github_request POST \
  "https://uploads.github.com/repos/${DRONE_REPO}/releases/${RELEASE_ID}/assets?name=${REPORT_ASSET}" \
  '^201$' -H "Content-Type: text/html" \
  --data-binary @"$REPORT_FILE"
DOWNLOAD_URL="$(jq -er '.browser_download_url | strings | select(length > 0)' "$RESPONSE_FILE")"
echo "Uploaded report asset: ${DOWNLOAD_URL}"

if [ -n "${REPORT_URL_FILE:-}" ]; then
  printf '%s\n' "$DOWNLOAD_URL" > "$REPORT_URL_FILE"
fi

if [ -z "${DRONE_PULL_REQUEST:-}" ]; then
  exit 0
fi

COMMENT_BODY="$(printf '%s\nAllure report for GRO PR build #%s (download and open in a browser):\n* %s\n\nDrone build: %s\n' \
  "$COMMENT_MARKER" "$DRONE_BUILD_NUMBER" "$DOWNLOAD_URL" "$DRONE_BUILD_LINK")"
COMMENT_PAYLOAD="$(jq -n --arg body "$COMMENT_BODY" '{body:$body}')"

page=1
COMMENT_ID=""
while :; do
  github_request GET "${GH_API}/issues/${DRONE_PULL_REQUEST}/comments?per_page=100&page=${page}" '^200$'
  jq -er 'type == "array"' "$RESPONSE_FILE" >/dev/null
  COMMENT_ID="$(jq -r --arg marker "$COMMENT_MARKER" \
    '[.[] | select(.user.type == "Bot" and ((.body // "") | contains($marker)))][0].id // empty' \
    "$RESPONSE_FILE")"
  [ -z "$COMMENT_ID" ] || break
  [ "$(jq 'length' "$RESPONSE_FILE")" -eq 100 ] || break
  page=$((page + 1))
done

if [ -n "$COMMENT_ID" ]; then
  github_request PATCH "${GH_API}/issues/comments/${COMMENT_ID}" '^200$' \
    -H "Content-Type: application/json" --data "$COMMENT_PAYLOAD"
else
  github_request POST "${GH_API}/issues/${DRONE_PULL_REQUEST}/comments" '^201$' \
    -H "Content-Type: application/json" --data "$COMMENT_PAYLOAD"
fi
COMMENT_URL="$(jq -er '.html_url | strings | select(length > 0)' "$RESPONSE_FILE")"

echo "Published PR comment: ${COMMENT_URL}"
