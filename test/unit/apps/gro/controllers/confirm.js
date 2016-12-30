'use strict';

const proxyquire = require('proxyquire');

describe('Confirm Controller', () => {
  const req = {};
  const res = {};
  const cb = sinon.stub();
  let Controller;
  let controller;
  class StubController {}

  beforeEach(() => {
    StubController.prototype.get = sinon.stub();
    StubController.prototype.post = sinon.stub();
    Controller = proxyquire('../../../../../apps/gro/controllers/confirm', {
      'hof-controllers': {
        confirm: StubController
      }
    });
    controller = new Controller();
  });

  it('extends from the base confirm controller', () => {
    controller.should.be.an.instanceOf(StubController);
  });

  it('has a get method', () => {
    controller.should.have.property('get');
  });

  it('has a post method', () => {
    controller.should.have.property('post');
  });

  it('has a removeDuplicateAddress method', () => {
    controller.should.have.property('removeDuplicateAddress');
  });

  describe('get', () => {
    beforeEach(() => {
      sinon.stub(Controller.prototype, 'removeDuplicateAddress');
    });

    afterEach(() => {
      Controller.prototype.removeDuplicateAddress.restore();
    });

    it('calls removeDuplicateAddress passing req', () => {
      controller.get(req, res, cb);
      Controller.prototype.removeDuplicateAddress.should.have.been.calledOnce
        .and.calledWithExactly(req);
    });

    it('calls super', () => {
      controller.get(req, res, cb);
      StubController.prototype.get.should.have.been.calledOnce
        .and.calledWithExactly(req, res, cb);
    });
  });

  describe('post', () => {
    beforeEach(() => {
      sinon.stub(Controller.prototype, 'removeDuplicateAddress');
    });

    afterEach(() => {
      Controller.prototype.removeDuplicateAddress.restore();
    });

    it('calls removeDuplicateAddress passing req', () => {
      controller.post(req, res, cb);
      Controller.prototype.removeDuplicateAddress.should.have.been.calledOnce
        .and.calledWithExactly(req);
    });

    it('calls super', () => {
      controller.post(req, res, cb);
      StubController.prototype.post.should.have.been.calledOnce
        .and.calledWithExactly(req, res, cb);
    });
  });

  describe('removeDuplicateAddress', () => {
    beforeEach(() => {
      req.sessionModel = {
        get: sinon.stub()
      };
      controller.options = {
        fieldsConfig: {
          'address-textarea': {}
        }
      };
    });

    it('sets includeInSummary to false for address-textarea if address-lookup set', () => {
      req.sessionModel.get.returns(true);
      controller.removeDuplicateAddress(req);
      controller.options.fieldsConfig['address-textarea'].includeInSummary.should.be.false;
    });

    it('sets includeInSummary to true for address-textarea if address-lookup not set', () => {
      req.sessionModel.get.returns(false);
      controller.removeDuplicateAddress(req);
      controller.options.fieldsConfig['address-textarea'].includeInSummary.should.be.true;
    });
  });
});
