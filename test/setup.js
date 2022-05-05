'use strict';

process.env.NODE_ENV = 'test';

global.chai = require('chai')
  .use(require('sinon-chai'));
global.should = chai.should();
global.expect = chai.expect;
global.sinon = require('sinon');

const utils = require('./helpers/supertest_session/supertest-utilities.js');
global.getSupertestApp = (subApp, subAppPath, pages) => utils.getSupertestApp(subApp, subAppPath, pages);

process.setMaxListeners(0);
process.stdout.setMaxListeners(0);
