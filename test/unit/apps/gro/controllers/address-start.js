'use strict';

const proxyquire = require('proxyquire');
const BaseController = sinon.stub();
const config = require('../../../../../config');

describe('apps/gro/controllers/address-start', () => {

  const res = {
    locals: {
      backLink: 'backLink'
    }
  };
  const postcode = 'SW1P 4DF';
  const prevPostcode = 'SW19 5AE';
  const req = {
    sessionModel: {
      attributes: {
        postcode: {
          toUpperCase: sinon.stub().returns(postcode)
        },
        previouspostcode: 'SW1P 4DF'
      },
      set: sinon.stub()
    }
  };
  let controller;

  describe('.getValues() with data being sent to the Client', () => {

    const Client = sinon.stub().returns({
      get: (url, args, callback) => {
        callback(['address']);
        return {on: () => {}};
      }
    });

    const AddressStartController = proxyquire('../../../../../apps/gro/controllers/address-start', {
      'hof': {
        controllers: {
          base: BaseController
        }
      },
      'node-rest-client': {
        Client: Client
      },
      '../../../config': config
    });

    beforeEach(() => {
      controller = new AddressStartController({template: 'index'});
      BaseController.prototype.getValues = sinon.stub();
      BaseController.prototype.successHandler = sinon.stub();
    });

    it('calls BaseController with the arguments', () => {
      BaseController.should.have.been.calledWith({template: 'index'});
    });

    it('successfully handles the request when the postcode and previous postcode are the same', () => {
      controller.getValues(req, res);
      BaseController.prototype.successHandler.should.have.been.calledWithExactly(req, res);
    });

    it('successfully handles the request when the postcode and previous postcode are NOT the same', () => {
      controller.getValues(req, res);
      BaseController.prototype.successHandler.should.have.been.calledWithExactly(req, res);
    });

    it('saves the addresses found for the postcode to the sessionModel', () => {
      req.sessionModel.attributes.previouspostcode = prevPostcode;
      controller.getValues(req, res);
      req.sessionModel.set.should.have.been.calledWith('addresses', ['address']);
      req.sessionModel.set.should.have.been.calledWith('postcode-found', true);
    });

  });

  describe('.getValues() calling postcode lookup with an authorisation token', () => {

    const error = {
      code: 'errorCode',
      request: {
        options: {
          host: 'host',
          path: '/path'
        }
      }
    };

    const Client = sinon.stub().returns({
      get: (url, args, data) => {
        data([]);
        return {on: (evt, callback) => {
          callback(error);
        }};
      }
    });

    const AddressStartController = proxyquire('../../../../../apps/gro/controllers/address-start', {
      'hof': {
        controllers: {
          base: BaseController
        }
      },
      'node-rest-client': {
        Client: Client
      },
      '../../../config': config
    });

    beforeEach(() => {
      controller = new AddressStartController({template: 'index'});
      BaseController.prototype.getValues = sinon.stub();
      BaseController.prototype.successHandler = sinon.stub();
      req.sessionModel.attributes.previouspostcode = prevPostcode;
      controller.getValues(req, res);
    });

    it('saves postcode error message to sessionModel when no address can be found', () => {
      req.sessionModel.set.should.have.been.calledWith('postcode-found', false);
      req.sessionModel.set.should.have.been.calledWith('postcode-error',
        'Sorry – we couldn’t find any addresses for that postcode.');
    });

    it('calls the error event when the Client cannot connect to the server', () => {
      config.postcode.hostname = '';
      req.sessionModel.set.should.have.been.calledWith('postcode-found', false);
      req.sessionModel.set.should.have.been.calledWith('postcode-error',
        'Sorry - we couldn’t connect to the server at this time.');
    });

  });

  describe('.getValues() calling postcode lookup without an authorisation token', () => {

    const error = {
      code: 'errorCode',
      request: {
        options: {
          host: 'host',
          path: '/path'
        }
      }
    };

    const data = {
      detail: 'You do not have permission to perform this action.'
    };

    const Client = sinon.stub().returns({
      get: (url, args, callback) => {
        callback(data);
        return {on: () => {
          callback(error);
        }};
      }
    });

    const AddressStartController = proxyquire('../../../../../apps/gro/controllers/address-start', {
      'hof': {
        controllers: {
          base: BaseController
        }
      },
      'node-rest-client': {
        Client: Client
      },
      '../../../config': config
    });

    beforeEach(() => {
      controller = new AddressStartController({template: 'index'});
      BaseController.prototype.getValues = sinon.stub();
      BaseController.prototype.successHandler = sinon.stub();
      req.sessionModel.attributes.previouspostcode = prevPostcode;
      config.postcode.authorization = undefined;
      controller.getValues(req, res);
    });

    it('sets the Authorisation header as empty string when the config token is not available', () => {
      req.sessionModel.set.should.have.been.calledWith('postcode-error',
        'Sorry – we couldn’t connect to the server at this time.');
    });

    it('saves postcode error message to sessionModel when there is no authorisation token', () => {
      req.sessionModel.set.should.have.been.calledWith('postcode-error',
        'Sorry – we couldn’t connect to the server at this time.');
    });

  });

});
