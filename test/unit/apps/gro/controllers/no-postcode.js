'use strict';

const BaseController = sinon.stub();
const NoPostcodeController = require('proxyquire')('../../../../../apps/gro/controllers/no-postcode', {
  'hof': {
    controllers: {
      base: BaseController
    }
  }
});

describe('apps/gro/controllers/no-postcode', () => {

  let controller;
  let req;
  const res = {};
  const cb = () => {};

  describe('locals', () => {

    beforeEach(() => {
      controller = new NoPostcodeController();
      BaseController.prototype.locals = sinon.stub().returns({});
    });

    it('returns locals including postcodeApiMessageKey, taken from sessionModel', () => {
      req = {
        sessionModel: {
          get: sinon.stub().returns({messageKey: 'test'})
        }
      };
      controller.locals(req, res, cb).should.be.eql({
        postcodeApiMessageKey: 'test'
      });
    });

    it('returns locals including postcodeApiMessageKey, taken from sessionModel', () => {
      req = {
        sessionModel: {
          get: sinon.stub().returns({messageKey: 'anotherErrorKey'})
        }
      };
      controller.locals(req, res, cb).should.be.eql({
        postcodeApiMessageKey: 'anotherErrorKey'
      });
    });

  });

});
