'use strict';

process.env.NODE_ENV = 'test';

process.env.FROM_ADDRESS = 'mock';
process.env.REPLY_TO = 'mock';
process.env.CASEWORKER_EMAIL = 'mock';
process.env.SEND_TYPE = 'ses';
process.env.AWS_USER = 'mock';
process.env.AWS_PASSWORD = 'mock';
process.env.EMAIL_REGION = 'mock';

global.chai = require('chai')
  .use(require('sinon-chai'));
global.should = chai.should();
global.expect = chai.expect;
global.sinon = require('sinon');

const utils = require('./helpers/supertest_session/supertest-utilities.js');
global.getSupertestApp = (subApp, subAppPath, pages) => utils.getSupertestApp(subApp, subAppPath, pages);

process.setMaxListeners(0);
process.stdout.setMaxListeners(0);
