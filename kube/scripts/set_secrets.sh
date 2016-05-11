#!/usr/bin/env bash
# Script to set the correct secrets given an environment name.

SCRIPT_HOME=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
ENV=""

export SECRET_ROOT=${SCRIPT_HOME}/../services/secrets
source ${SCRIPT_HOME}/s3.cfg

if [ "${1}" == "" ]; then
    echo "Expecting file or directory (relative to secrets dir) as second parameter"
    exit 1
fi
if [ ! -e "${SECRET_ROOT}/${1}" ]; then
    echo "Can't find file to create secret:${SECRET_ROOT}/${1}"
    exit 1
else
    if [ -d "${SECRET_ROOT}/${1}" ]; then
        echo "Directory detected."
        ITEM=${1}
        DIR=$(basename ${SECRET_ROOT}/${ITEM})/
    else
        echo "File detected."
        ITEM=${1}
        DIR=$(basename $(dirname ${SECRET_ROOT}/${ITEM}))/
    fi
fi

echo "Setting secrets from ${SECRET_ROOT}..."
cd ${SECRET_ROOT}
s3secrets --region "${AWS_DEFAULT_REGION}" s3 put -k ${KMS_ID} --bucket "${SECRETS_BUCKET}" -p ${DIR} ${ITEM}
