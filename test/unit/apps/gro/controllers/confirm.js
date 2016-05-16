'use strict';

const proxyquire = require('proxyquire');

const modelProto = {
  save: sinon.stub(),
  set: sinon.stub()
};
const Model = sinon.stub();
Model.prototype = modelProto;

const BaseController = sinon.stub();

const i18n = sinon.stub().returns({
  on: (evt, callback) => {
    callback();
  },
  translate: () => {}
});
const path = sinon.stub();

const ConfirmController = proxyquire('../../../../../apps/gro/controllers/confirm', {
  'hof': {
    controllers: {
      base: BaseController
    },
    i18n: i18n
  },
  'path': path,
  '../../common/models/email': Model
});

describe('apps/gro/controllers/confirm', () => {

  describe('.saveValues()', () => {

    let controller;
    const emailText = 'email@email.com';
    const emailJson = {'email-text': 'email@email.com'};
    const req = {
      sessionModel: {
        toJSON: sinon.stub().returns(emailJson),
        get: sinon.stub().returns(emailText)
      },
    };
    const res = {};
    const callback = sinon.stub();

    beforeEach(() => {
      controller = new ConfirmController({template: 'index'});
      BaseController.prototype.saveValues = sinon.stub();
      controller.saveValues(req, res, callback);
    });

    it('calls the email Model', () => {
      Model.prototype.save.should.have.been.called;
    });

    it('saves the email to the session', () => {
      const sessionData = Model.args[0][0];
      sessionData.should.have.property('email').and.be.equal(emailText);
    });
    it('sets a template', () => {
      modelProto.set.should.have.been.calledWith('template', 'gro');
    });

  });

});
