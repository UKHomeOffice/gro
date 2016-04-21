'use strict';

function parseFullTCPAddress(addr) {
  var regexp = /tcp:\/\/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):(\d+)/g;
  var details = regexp.exec(addr);
  return details || [];
}

/* parse out some ENV vars */
/* docker-compose / kubernetes dev or local */
var redis_addr = process.env.REDIS_HOST || '127.0.0.1';
var redis_port = process.env.REDIS_PORT || '6379';


var maildev_details = parseFullTCPAddress(process.env.MAILDEV_PORT || '');
var maildev_addr = '';
var maildev_port = '';

if (maildev_details.length > 1) {
  maildev_addr = maildev_details[1];
  maildev_port = maildev_details[2];
}

process.title = 'gro';

/*eslint no-process-env: 0*/
/*eslint no-inline-comments: 0*/
/*eslint camelcase: 0*/
module.exports = {
  env: process.env.NODE_ENV || 'local',
  siteroot: process.env.SITEROOT || '',
  port: process.env.PORT || 3020,
  listen_host: process.env.LISTEN_HOST || '0.0.0.0',
  session: {
    secret: process.env.SESSION_SECRET || 'howdoesyourgardengrow',
    ttl: process.env.SESSION_TTL || 1800 /* 30 mins timeout */
  },
  redis: {
    port: redis_port,
    host: redis_addr
  },
  email: {
    caseworker: {
      gro: process.env.CASEWORKER_EMAIL || ''
    },
    port: maildev_port,
    host: maildev_addr,
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASSWORD || ''
    },
    from: process.env.FROM_ADDRESS || '',
    ignoreTLS: process.env.EMAIL_IGNORE_TLS || false,
    secure: process.env.EMAIL_SECURE || false
  },
  ga: {
    tagId: process.env.GA_TAG_ID
  },
  postcode: {
    hostname: 'https://postcodeinfo.service.justice.gov.uk',
    authorization: process.env.POSTCODE_AUTH,
    addresses: {
      path: '/addresses',
      param: 'postcode'
    }
  }
};
