'use strict';

process.title = 'gro';

/* eslint no-process-env: 0 */
module.exports = {
  env: process.env.NODE_ENV,
  PRETTY_DATE_FORMAT: 'Do MMMM YYYY',
  dateTimeFormat: 'DD-MM-YYYY, hh:mma',
  redis: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || '127.0.0.1',
    password: process.env.REDIS_PASSWORD
  },
  email: {
    caseworker: process.env.CASEWORKER_EMAIL,
    applicant: 'email-text',
    from: process.env.FROM_ADDRESS,
    replyTo: process.env.REPLY_TO,
    transport: process.env.SEND_TYPE,
    transportOptions: {
      accessKeyId: process.env.AWS_USER,
      secretAccessKey: process.env.AWS_PASSWORD,
      region: process.env.EMAIL_REGION
    }
  },
  hosts: {
    acceptanceTests: process.env.ACCEPTANCE_HOST_NAME || `http://localhost:${process.env.PORT || 8080}`
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
