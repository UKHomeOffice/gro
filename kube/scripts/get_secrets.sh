#!/usr/bin/env bash
# Script to get the correct secrets given an environment name.

SCRIPT_HOME=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
ENV=""

export SECRET_ROOT=${SCRIPT_HOME}/../services/secrets
source ${SCRIPT_HOME}/s3.cfg

while getopts ":e:" opt; do
    case "$opt" in
    e)  export ENV=${OPTARG}
        ;;
    *)
        ;;
    esac
done

echo "Using profile:${AWS_DEFAULT_PROFILE}"
export SECRET_PATH=${SECRET_ROOT}/${ENV}

echo "Getting shared secrets (for all environments)..."
s3secrets --region "${AWS_DEFAULT_REGION}" s3 get --bucket "${SECRETS_BUCKET}" -d ${SECRET_ROOT}/shared shared/
echo "Getting secrets for ${ENV}..."
s3secrets --region "${AWS_DEFAULT_REGION}" s3 get --bucket "${SECRETS_BUCKET}" -d ${SECRET_PATH} ${ENV}/

export KUBECONFIG="${SCRIPT_HOME}/../services/secrets/${ENV}/kubeconfig"
if [ ! -f "${KUBECONFIG}" ]; then
  export KUBECONFIG="${SCRIPT_HOME}/../services/secrets/shared/kubeconfig"
fi
