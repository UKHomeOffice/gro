'use strict';

process.env.NODE_ENV = 'test';
process.env.CASEWORKER_EMAIL = 'mock';
process.env.SESSION_SECRET = process.env.SESSION_SECRET || '12345678901234567890123456789012';

const sinonChai = require('sinon-chai');

global.chai = require('chai')
  .use(sinonChai.default || sinonChai);
global.should = chai.should();
global.expect = chai.expect;
global.sinon = require('sinon');

const utils = require('./helpers/supertest_session/supertest-utilities.js');
global.getSupertestApp = (subApp, subAppPath, pages) => utils.getSupertestApp(subApp, subAppPath, pages);

process.setMaxListeners(0);
process.stdout.setMaxListeners(0);
