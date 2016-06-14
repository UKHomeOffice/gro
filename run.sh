#!/bin/bash

if [ "$NODE_ENV" = "ci" ]
then echo "starting service"
  SITEROOT=/gro GA_TAG_ID=UA-72527484-1
fi

exec npm start

