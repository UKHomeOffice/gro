'use strict';

const proxyquire = require('proxyquire');
const emailService = {
  send: sinon.stub()
};

describe('apps/common/models/email', () => {

  describe('instantiated', () => {
    const hof = {
      Model: sinon.stub()
    };
    const EmailModel = proxyquire('../../../../../apps/common/models/email', {
      '../../../services/email': emailService,
      'hof': hof
    });

    it('calls hmpo-model Model with the arguments', () => {
      const emailData = {
        some: 'email data'
      };
      // eslint-disable-next-line no-unused-vars
      const model = new EmailModel(emailData);
      hof.Model.should.have.been.calledWith(emailData);
    });
  });

  describe('.save()', () => {

    let model;
    let callback;
    const EmailModel = proxyquire('../../../../../apps/common/models/email', {
      '../../../services/email': emailService
    });

    beforeEach(() => {
      callback = sinon.stub();

      model = new EmailModel({
        template: 'test_template',
        email: 'email@email.com',
        subject: 'email subject',
        steps: ['session', 'steps'],
        'csrf-secret': 'itsasecret',
        name: 'dave',
        other: 'data'
      });
      model.save(callback);
    });

    it('calls the send endpoint on the email service with the model data', () => {

      emailService.send.should.have.been.calledWith({
        template: 'test_template',
        to: 'email@email.com',
        subject: 'email subject',
        dataToSend: {
          email: 'email@email.com',
          name: 'dave',
          other: 'data',
          subject: 'email subject'
        }
      }, callback);
    });

  });

});
