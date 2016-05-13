'use strict';

const BaseController = sinon.stub();
const PostController = require('proxyquire')('../../../../../apps/gro/controllers/post', {
  'hof': {
    controllers: {
      base: BaseController
    }
  }
});

describe('apps/gro/controllers/post', () => {

  let controller;
  const req = {
    form: {
      values: {
        'address-text-one': '1',
        'address-text-two': '2',
        'address-text-three': '3',
        'address-text-four': '4',
        'address-text-five': '5'
      }
    },
    sessionModel: {
      set: sinon.stub(),
      get: sinon.stub(),
      unset: sinon.stub()
    }
  };

  describe('saveValues', () => {

    beforeEach(() => {
      controller = new PostController({template: 'index'});
      BaseController.prototype.saveValues = sinon.stub();
      controller.saveValues(req);
    });

    it('calls the base controller saveValues', () => {
      BaseController.prototype.saveValues.should.have.been.called;
    });

    it('adds a new session Model value called address', () => {
      req.sessionModel.set.should.have.been.calledWith('address', '1 2 3 4 5');
    });

  });

});
