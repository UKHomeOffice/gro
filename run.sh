#!/bin/bash

if [ "$NODE_ENV" = "development" ]
then echo "starting the service"
     npm run dev

elif [ "$NODE_ENV" = "docker" ]
then echo "starting the service"
     npm start

elif [ "$NODE_ENV" = "ci" ] #use this on ci.so
then echo "starting service"
     SITEROOT=/gro GA_TAG_ID=UA-72527484-1 node /var/www/gro/app.js
fi


