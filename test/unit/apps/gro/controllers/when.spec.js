'use strict';

const DateController = sinon.stub();
const WhenController = require('proxyquire')('../../../../../apps/gro/controllers/when', {
  'hof-controllers': {
    date: DateController
  }
});

describe('apps/gro/controllers/when', () => {

  describe('instantiated', () => {

    let controller;
    const args = {template: 'index'};

    beforeEach(() => {
        controller = new WhenController(args);
    });

    it('calls DateController with the arguments', () => {
      DateController.should.have.been.calledWith(args);
    });

    it('has when-date dateKey', () => {
      controller.should.have.property('dateKey').and.equal('when-date');
    });

  });

});
