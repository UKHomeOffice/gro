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
    caseworker: process.env.CASEWORKER_EMAIL || 'sas-hof-test@digital.homeoffice.gov.uk',
    notifyApiKey: process.env.NOTIFY_KEY ||
    'hof_test-89548f6c-39cd-4acb-851c-1f4ffa2e479b-28426e56-443a-4ba4-98ed-fb576e717ed9',
    notifyTemplate: process.env.NOTIFY_TEMPLATE || 'c78918be-fccb-4e7b-a333-beee0436c2bd',
    applicant: 'email-text'
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
