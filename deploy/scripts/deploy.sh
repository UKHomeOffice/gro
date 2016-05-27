#!/usr/bin/env bash
# Script used as deployment entrypoint

set -e

if [ -z "$TLS_TAG" ]; then echo "TLS_TAG needs to be set"; exit 1; fi
if [ -z "$APP_TAG" ]; then echo "APP_TAG needs to be set"; exit 1; fi
if [ -z "$REDIS_TAG" ]; then echo "REDIS_TAG needs to be set"; exit 1; fi

DEPLOY_SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
DEPLOY_HOME=${DEPLOY_SCRIPT_DIR}/..
KUBECONFIG=${KUBECONFIG:-~/.kube/config}

mkdir -p ${DEPLOY_SCRIPT_DIR}/../artefacts

echo $TLS_TAG | tr -d '\n' > ${DEPLOY_SCRIPT_DIR}/../artefacts/tls_tag
echo $APP_TAG | tr -d '\n' > ${DEPLOY_SCRIPT_DIR}/../artefacts/app_tag
echo $REDIS_TAG | tr -d '\n' > ${DEPLOY_SCRIPT_DIR}/../artefacts/redis_tag

unset ENV
cd ${DEPLOY_HOME}

if [ "${1}" == "DIND" ]; then
  shift
  echo "Running DIND: with params: '$@' in dir ${PWD}..."
else
  echo "Running PRE-DIND with params:'$@' in dir ${PWD}..."
  export AWS_ACCESS_KEY_ID=$(aws configure get aws_access_key_id)
  export AWS_SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key)

  term=
  if [ -t 0 ]; then
    # We have an interactive shell
    term=t
    echo ${EXTRA_DOCKER_CMD}
  fi


  # Unique name...
  DOCKER_TAG=kb8-deployer
  docker build -t ${DOCKER_TAG} .
  if [ "${1}" == "MOUNT_SECRETS" -o "${1}" == "PUSH_SECRETS" ]; then
    echo "Mounting secrets."
    EXTRA_DOCKER_CMD="-v ${DEPLOY_HOME}/services/secrets:/var/lib/app_deploy/services/secrets -e 'SKIP_SECRETS=TRUE'"
    if [ "${1}" == "MOUNT_SECRETS" ]; then
        shift
    fi
  fi

  echo "Term param = ${term}"
  docker run \
    -i${term} \
    --rm=true \
    ${EXTRA_DOCKER_CMD} \
    -e TLS_TAG=${TLS_TAG} \
    -e APP_TAG=${APP_TAG} \
    -e REDIS_TAG=${REDIS_TAG} \
    -e AWS_ACCESS_KEY_ID \
    -e AWS_SECRET_ACCESS_KEY \
    -e AWS_DEFAULT_REGION \
    ${DOCKER_TAG} \
    DIND $@

  echo "Deploy Success!"
  exit 0
fi

if [ "${1}" == "debug" ]; then
  bash -i
  exit 0
fi
if [ "${SKIP_SECRETS}" != "TRUE" ]; then
  source ${DEPLOY_SCRIPT_DIR}/get_secrets.sh $@
fi
echo "Using kubeconfig:${KUBECONFIG}"
/var/lib/kb8or/kb8or.rb $@
