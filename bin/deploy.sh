#! /bin/bash
set -e

export INGRESS_INTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-internal-annotations.yaml
export INGRESS_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-external-annotations.yaml
export CONFIGMAP_VALUES=$HOF_CONFIG/configmap-values.yaml
export NGINX_SETTINGS=$HOF_CONFIG/nginx-settings.yaml

kd='kd --insecure-skip-tls-verify --timeout 10m --check-interval 10s'

deploy_redis() {
  if [[ "${REDIS_PERSISTENCE_ENABLED}" == "true" && -z "${REDIS_PERSISTENCE_EXISTING_CLAIM}" ]]; then
    $kd -f kube/redis/redis-pvc.yml
  fi

  $kd -f kube/redis/redis-service.yml -f kube/redis/redis-network-policy.yml -f kube/redis/redis-deployment.yml
}

delete_redis() {
  if [[ "${REDIS_PERSISTENCE_ENABLED}" == "true" && -z "${REDIS_PERSISTENCE_EXISTING_CLAIM}" ]]; then
    $kd --delete -f kube/redis/redis-pvc.yml
  fi

  $kd --delete -f kube/redis/redis-service.yml -f kube/redis/redis-network-policy.yml -f kube/redis/redis-deployment.yml
}

configure_redis_persistence() {
  export REDIS_PERSISTENCE_ENABLED=${REDIS_PERSISTENCE_ENABLED:-false}
  export REDIS_PERSISTENCE_ACCESS_MODES=${REDIS_PERSISTENCE_ACCESS_MODES:-ReadWriteOnce}
  export REDIS_PERSISTENCE_STORAGE_CLASS=${REDIS_PERSISTENCE_STORAGE_CLASS:-gp2-encrypted}
  export REDIS_PERSISTENCE_EXISTING_CLAIM=${REDIS_PERSISTENCE_EXISTING_CLAIM:-}
  export REDIS_PERSISTENCE_SIZE=${REDIS_PERSISTENCE_SIZE:-1Gi}

  REDIS_PERSISTENCE_ENABLED=$(echo "${REDIS_PERSISTENCE_ENABLED}" | tr '[:upper:]' '[:lower:]')
  export REDIS_PERSISTENCE_ENABLED

  if [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
    export REDIS_PERSISTENCE_ENABLED=true
    export REDIS_PERSISTENCE_SIZE=10Gi
  elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
    export REDIS_PERSISTENCE_ENABLED=true
    export REDIS_PERSISTENCE_SIZE=1Gi
  elif [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
    export REDIS_PERSISTENCE_ENABLED=true
    export REDIS_PERSISTENCE_SIZE=1Gi
  else
    export REDIS_PERSISTENCE_ENABLED=false
  fi
}

if [[ $1 == 'tear_down' ]]; then
  export KUBE_NAMESPACE=$BRANCH_ENV
  export DRONE_SOURCE_BRANCH=$(cat /root/.dockersock/branch_name.txt)
  configure_redis_persistence

  $kd --delete -f kube/configmaps/configmap.yml
  delete_redis
  $kd --delete -f kube/app
  echo "Torn Down Branch - $APP_NAME-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
  exit 0
fi

export KUBE_NAMESPACE=$1
export DRONE_SOURCE_BRANCH=$(echo $DRONE_SOURCE_BRANCH | tr '[:upper:]' '[:lower:]' | tr '/' '-')
configure_redis_persistence

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  $kd -f kube/configmaps -f kube/certs
  deploy_redis
  $kd -f kube/app
elif [[ ${KUBE_NAMESPACE} == ${UAT_ENV} ]]; then
  $kd -f kube/configmaps/configmap.yml
  deploy_redis
  $kd -f kube/app
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  $kd -f kube/configmaps/configmap.yml -f kube/app/service.yml
  $kd -f kube/app/networkpolicy-internal.yml -f kube/app/ingress-internal.yml
  deploy_redis
  $kd -f kube/app/deployment.yml
elif [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  $kd -f kube/configmaps/configmap.yml -f kube/app/service.yml
  $kd -f kube/app/networkpolicy-external.yml -f kube/app/ingress-external.yml
  deploy_redis
  $kd -f kube/app/deployment.yml
fi

sleep $READY_FOR_TEST_DELAY


if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  echo "External Branch url - $APP_NAME-$DRONE_SOURCE_BRANCH.$BRANCH_ENV.homeoffice.gov.uk"
  echo "Internal Branch url - $APP_NAME-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
  if [[ -d /root/.dockersock ]]; then
    # Publish internal branch host artifact for downstream PR e2e execution.
    printf '%s\n' "$APP_NAME-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk" > /root/.dockersock/branch_url.txt
  fi
elif [[ ${KUBE_NAMESPACE} == ${UAT_ENV} ]]; then
  echo "External UAT url - $APP_NAME.uat.sas-notprod.homeoffice.gov.uk"
  echo "Internal UAT url - $APP_NAME.internal.uat.sas-notprod.homeoffice.gov.uk"
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  echo "External STG url - $APP_NAME.stg.sas.homeoffice.gov.uk"
  echo "Internal STG url - stg.internal.$APP_NAME.sas.homeoffice.gov.uk"
elif [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  echo "External PROD url - $PRODUCTION_URL"
fi
