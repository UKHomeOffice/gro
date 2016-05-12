'use strict';

const StartController = require('../../../../../apps/common/controllers/start');
const controllers = require('hof').controllers;
const Controller = controllers.base;

describe('apps/common/controllers/start', () => {

  describe('.getValues()', () => {

    let controller;
    let req;
    let res;
    let callback;

    beforeEach(() => {
      req = {
        params: {},
        form: {
          values: {
          }
        },
        sessionModel: {
          set: sinon.stub(),
          get: sinon.stub(),
          unset: sinon.stub()
        }
      };
      res = {};
      callback = sinon.stub();
      req.sessionModel.reset = sinon.stub();
      Controller.prototype.successHandler = sinon.stub();
      controller = new StartController({template: 'index'});
    });

    it('resets the session', () => {
      controller.getValues(req, res, callback);

      req.sessionModel.reset.should.have.been.calledOnce;
    });

    it('successfully handles the request', () => {
      controller.getValues(req, res, callback);

      Controller.prototype.successHandler.should.have.been.calledWithExactly(req, res, callback);
    });

  });

});
