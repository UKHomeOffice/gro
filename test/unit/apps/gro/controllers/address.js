'use strict';

const BaseController = sinon.stub();
const AddressController = require('proxyquire')('../../../../../apps/gro/controllers/address', {
  'hof': {
    controllers: {
      base: BaseController
    }
  }
});

describe('apps/gro/controllers/address', () => {

  let controller;
  let req;
  const res = {};
  const cb = () => {};

  describe('locals', () => {

    beforeEach(() => {
      req = {
        sessionModel: {
          get: sinon.stub()
        },
        form: {
          values: {}
        }
      };
      controller = new AddressController();
      BaseController.prototype.locals = sinon.stub().returns({});
    });

    it('returns locals including postcodeApiMessageKey, taken from sessionModel', () => {
      req.sessionModel.get.returns({messageKey: 'test'});
      controller.locals(req, res, cb).should.have.property('postcodeApiMessageKey')
        .and.be.equal('test');
    });

    it('adds isDomestic: true to locals if country is United Kingdom', () => {
      req.form.values.country = 'United Kingdom';
      controller.locals(req, res, cb).should.have.property('isDomestic')
        .and.be.true;
    });

    it('adds isDomestic: false to locals if country isn\'t United Kingdom', () => {
      req.form.values.country = 'Another country';
      controller.locals(req, res, cb).should.have.property('isDomestic')
        .and.be.false;
    });


    it('returns locals including postcodeApiMessageKey, taken from sessionModel', () => {
      req.sessionModel.get.returns({messageKey: 'anotherErrorKey'});
      controller.locals(req, res, cb).should.have.property('postcodeApiMessageKey')
        .and.be.equal('anotherErrorKey');
    });

  });

});
