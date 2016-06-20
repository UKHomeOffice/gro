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

  beforeEach(() => {
    req = {
      sessionModel: {
        get: sinon.stub(),
        unset: sinon.stub()
      },
      form: {
        values: {}
      },
      params: {
        action: undefined
      }
    };
    controller = new AddressController();
    BaseController.prototype.locals = sinon.stub().returns({});
    BaseController.prototype.getValues = sinon.stub().returns({});
  });

  describe('getValues', () => {
    it('calls parent', () => {
      controller.getValues(req, res, cb);
      BaseController.prototype.getValues.should.have.been.calledOnce;
    });

    it('unsets postcode-code if action is manual', () => {
      req.params.action = 'manual';
      controller.getValues(req, res, cb);
      req.sessionModel.unset.should.have.been.calledOnce.and.calledWithExactly([
        'postcode-code',
        'postcodeApiMeta'
      ]);
    });
  });

  describe('locals', () => {
    it('returns locals including postcodeApiMessageKey, taken from sessionModel', () => {
      req.sessionModel.get.returns({messageKey: 'test'});
      controller.locals(req, res, cb).should.have.property('postcodeApiMessageKey')
        .and.be.equal('test');
    });

    it('adds isDomestic: true to locals if country is United Kingdom', () => {
      req.form.values['country-select'] = 'United Kingdom';
      controller.locals(req, res, cb).should.have.property('isDomestic')
        .and.be.true;
    });

    it('adds isDomestic: false to locals if country isn\'t United Kingdom', () => {
      req.form.values['country-select'] = 'Another country';
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
