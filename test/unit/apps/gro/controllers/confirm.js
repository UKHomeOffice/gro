'use strict';

const proxyquire = require('proxyquire');

const Controller = proxyquire('../../../../../apps/gro/controllers/confirm', {
  hof: {
    controllers: {
      confirm: sinon.stub()
    }
  },
  '../../common/services/email': {
    sendEmail() {
      const cb = arguments[arguments.length - 1];
      cb();
    }
  },
  '../': {
    steps: {
      '/step-1': {
        fields: [
          'field-1',
          'field-2'
        ],
        locals: {
          section: 'section-1'
        }
      },
      '/step-2': {
        fields: [
          'field-3',
        ],
        locals: {
          section: 'section-1'
        }
      },
      '/step-3': {
        fields: [
          'field-4',
          'field-5'
        ],
        locals: {
          section: 'section-2'
        }
      }
    }
  },
  '../fields': {
    'field-1': {},
    'field-2': {},
    'field-3': {},
    'field-4': {},
    'field-5': {
      includeInEmail: false
    }
  }
});

describe('Confirm controller', () => {
  const req = {
    sessionModel: {
      toJSON: sinon.stub(),
      get: sinon.stub()
    }
  };
  const res = {
    locals: {
      partials: {}
    }
  };
  let callback;
  let controller;
  let promiseStub;

  beforeEach(() => {
    promiseStub = data => new Promise((resolve) => resolve(data));
    controller = new Controller();
  });

  describe('formatStepsForEmail', () => {
    let data;
    beforeEach(() => {
      data = controller.formatStepsForEmail({
        'field-1': 'value-1',
        'field-3': 'value-3',
        'field-4': 'value-4',
        'field-5': 'value-5',
      });
    });

    it('returns an array with 2 entries', () => {
      data.should.be.an('array').and.have.property('length').and.be.equal(2);
    });

    it('groups by section', () => {
      data[0].should.have.property('section').and.be.equal('section-1');
      data[1].should.have.property('section').and.be.equal('section-2');
    });

    describe('first section fields', () => {
      it('is an array with 3 entries', () => {
        data[0].fields.should.be.an('array').and.have.property('length').and.be.equal(3);
      });

      it('contains fields from section-1', () => {
        data[0].fields[0].field.should.be.equal('field-1');
        data[0].fields[1].field.should.be.equal('field-2');
        data[0].fields[2].field.should.be.equal('field-3');
      });

      it('contains values passed for the fields', () => {
        data[0].fields[0].value.should.be.equal('value-1');
        should.not.exist(data[0].fields[1].value);
        data[0].fields[2].value.should.be.equal('value-3');
      });
    });

    describe('second section fields', () => {
      it('is an array with 1 entries', () => {
        data[1].fields.should.be.an('array').and.have.property('length').and.be.equal(1);
      });

      it('only contains field-4', () => {
        data[1].fields[0].field.should.be.equal('field-4');
      });
    });
  });

  describe('saveValues', () => {
    let data;

    beforeEach(() => {
      data = [{
        fields: []
      }];
      callback = sinon.stub();
      sinon.stub(Controller.prototype, 'formatStepsForEmail').returns(data);
      sinon.stub(Controller.prototype, 'sendEmail').returns(promiseStub());
    });

    afterEach(() => {
      Controller.prototype.formatStepsForEmail.restore();
      Controller.prototype.sendEmail.restore();
    });

    it('calls callback with an error if formatStepsForEmail return no data', () => {
      Controller.prototype.formatStepsForEmail.returns([]);
      controller.saveValues(req, res, callback);
      callback.should.have.been.calledOnce.and.not.calledWithExactly();
    });

    it('adds a submission-date field to the first section', () => {
      controller.saveValues(req, res, callback);
      data[0].fields[0].should.have.property('field').and.be.equal('submission-date');
    });

    it('calls sendMail twice and callback with no error', done => {
      controller.saveValues(req, res, err => {
        Controller.prototype.sendEmail.should.have.been.calledTwice;
        should.not.exist(err);
        done();
      });
    });

    it('calls callback with an error if sendEmail throws an error', done => {
      promiseStub = err => new Promise((resolve, reject) => reject(err));
      Controller.prototype.sendEmail.returns(promiseStub({
        status: 500,
        detail: 'something went wrong'
      }));
      controller.saveValues(req, res, err => {
        err.should.not.be.undefined;
        done();
      });
    });
  });

  describe('sendEmail', () => {
    beforeEach(() => {
      req.translate = sinon.stub().returns('subject');
      sinon.stub(Controller.prototype, 'renderTemplate').returns(promiseStub());
    });

    afterEach(() => {
      Controller.prototype.renderTemplate.restore();
    });

    it('returns a promise', () => {
      controller.sendEmail('', '', [], req, res).should.be.a('promise');
    });

    it('calls renderTemplate twice', done => {
      Promise.all([
        controller.sendEmail('', '', [], req, res)
      ]).then(() => {
        Controller.prototype.renderTemplate.should.have.been.calledTwice;
        done();
      });
    });
  });

  describe('renderTemplate', () => {
    it('returns a promise', () => {
      controller.renderTemplate().should.be.a('promise');
    });

    it('calls res.render', done => {
      res.render = (template, data, cb) => {
        cb();
      };
      sinon.spy(res, 'render');
      Promise.all([
        controller.renderTemplate('', '', {}, res)
      ]).then(() => {
        res.render.should.have.been.calledOnce;
        done();
      });
    });
  });
});
