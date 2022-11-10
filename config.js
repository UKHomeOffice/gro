'use strict';

process.title = 'gro';

/* eslint no-process-env: 0 */
module.exports = {
  env: process.env.NODE_ENV,
  PRETTY_DATE_FORMAT: 'Do MMMM YYYY',
  dateTimeFormat: 'DD-MM-YYYY, hh:mma',
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD
  },

  survey: {
    urls: {
      root: 'https://eforms.homeoffice.gov.uk/outreach/Feedback.ofml'
    }
  },

  email: {
    caseworker: process.env.CASEWORKER_EMAIL,
    notifyApiKey: process.env.NOTIFY_KEY,
    notifyTemplate: process.env.NOTIFY_TEMPLATE,
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
