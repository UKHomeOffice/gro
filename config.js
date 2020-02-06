'use strict';

const path = require('path');

process.title = 'gro';

/* eslint no-process-env: 0 */
module.exports = {
  env: process.env.NODE_ENV,
  redis: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || '127.0.0.1',
    password: process.env.REDIS_PASSWORD
  },
  email: {
    caseworker: process.env.CASEWORKER_EMAIL || '',
    from: process.env.FROM_ADDRESS || '',
    replyTo: process.env.REPLY_TO || '',
    accessKeyId: process.env.AWS_USER || '',
    secretAccessKey: process.env.AWS_PASSWORD || '',
    transportType: process.env.SEND_TYPE || 'ses',
    region: process.env.EMAIL_REGION || '',
    customViews: path.resolve(__dirname, ('./apps/gro/views/email/'))
  },
  ga: {
    tagId: process.env.GA_TAG
  },
  postcode: {
    hostname: process.env.NODE_ENV === 'ci' ?
      `http://${process.env.LISTEN_HOST || '0.0.0.0'}:${process.env.PORT || 8080}/api/postcode-test` :
      process.env.POSTCODE_HOST,
    authorization: process.env.POSTCODE_AUTH,
    addresses: {
      path: '/addresses',
      param: 'postcode'
    }
  }
};
