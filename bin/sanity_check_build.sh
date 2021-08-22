#! /bin/bash
set -e

export STATUS=$(drone build info $GIT_REPO $DRONE_BUILD_PARENT --format {{.Status}})
export BRANCH=$(drone build info $GIT_REPO $DRONE_BUILD_PARENT --format {{.Target}})
export EVENT=$(drone build info $GIT_REPO $DRONE_BUILD_PARENT --format {{.Event}})
export REFS=$(drone build info $GIT_REPO $DRONE_BUILD_PARENT --format {{.Ref}})

if [[ "$STATUS" != "success" || "$BRANCH" != "master" || "$EVENT" != "push" || "$REFS" != "refs/heads/master" ]]; then
  exit 1
fi
