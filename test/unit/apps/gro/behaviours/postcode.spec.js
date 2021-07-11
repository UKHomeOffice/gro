'use strict';

const proxyquire = require('proxyquire');
const BaseController = sinon.stub();
class PostcodesModel {}

describe('Postcode Behaviour', () => {
  let PostcodeController;
  let controller;
  const req = {};
  const res = {};
  let callback;

  beforeEach(() => {
    callback = sinon.stub();
    sinon.stub(console, 'error');

    PostcodesModel.prototype.fetch = sinon.stub().returns(new Promise((resolve) => resolve()));
    PostcodeController = proxyquire('../../../../../apps/gro/behaviours/postcode', {
      'hof-controllers': {
        base: BaseController
      },
      '../models/postcodes': PostcodesModel
    });
    req.sessionModel = {
      get: sinon.stub().returns('BN1 1AA')
    };
    req.form = {
      values: {
        'postcode-code': 'BN1 1AA'
      }
    };
    controller = new PostcodeController();
  });

  afterEach(() => {
    console.error.restore();
  });

  describe('process', () => {
    it('should call callback with no args if req.form.values.postcode is the same as in sessionModel', () => {
      controller.process(req, res, callback);
      callback.should.have.been.calledOnce.and.calledWithExactly();
      PostcodesModel.prototype.fetch.should.not.have.been.called;
    });

    it('should call fetch with postcode in options object if postcode isn\'t saved to sessionModel', () => {
      req.sessionModel.get = sinon.stub().returns(undefined);
      controller.process(req, res, callback);
      PostcodesModel.prototype.fetch.should.have.been.calledOnce.and.calledWithExactly({
        postcode: 'BN1 1AA'
      });
    });

    describe('Northern Irish Postcodes', () => {
      beforeEach(() => {
        req.form.values['postcode-code'] = 'BT1 1AA';
        req.sessionModel.unset = sinon.stub();
        controller.process(req, res, callback);
      });

      it('unsets postcodeApiMeta from the sessionModel', () => {
        req.sessionModel.unset.firstCall.should.have.been.calledWithExactly('postcodeApiMeta');
      });

      it('unsets addresses from the sessionModel', () => {
        req.sessionModel.unset.secondCall.should.have.been.calledWithExactly('addresses');
      });

      it('should have called callback', () => {
        callback.should.have.been.calledOnce.and.calledWithExactly();
      });
    });

    describe('api executed', () => {
      let promiseStub = data => new Promise((resolve) => resolve(data));

      beforeEach(() => {
        req.sessionModel.get = sinon.stub().returns(undefined);
        req.sessionModel.set = sinon.stub();
        req.sessionModel.unset = sinon.stub();
      });

      describe('api returned array of addresses', () => {
        beforeEach(() => {
          PostcodesModel.prototype.fetch = sinon.stub().returns(promiseStub([{}, {}, {}]));
        });

        it('calls callback with no arguments', done => {
          controller.process(req, res, callback);
          Promise.all([promiseStub()]).then(() => {
            callback.should.have.been.calledOnce.and.calledWithExactly();
            done();
          });
        });

        it('has set the return value of `then` to the sessionModel', done => {
          controller.process(req, res, callback);
          Promise.all([promiseStub()]).then(() => {
            req.sessionModel.set.should.have.been.calledWith('addresses', [{}, {}, {}]);
            done();
          });
        });
      });

      describe('api returned empty array', () => {
        beforeEach(() => {
          PostcodesModel.prototype.fetch = sinon.stub().returns(promiseStub([]));
        });

        it('unsets addresses from the sessionModel if data has 0 length', done => {
          controller.process(req, res, callback);
          Promise.all([promiseStub()]).then(() => {
            req.sessionModel.unset.should.have.been.calledWithExactly('addresses');
            done();
          });
        });

        it('sets postcodeApiMeta to the sessionModel with messageKey: \'not-found\'', done => {
          controller.process(req, res, callback);
          Promise.all([promiseStub()]).then(() => {
            req.sessionModel.set.should.have.been.calledWithExactly('postcodeApiMeta', {
              messageKey: 'not-found'
            });
            done();
          });
        });
      });

      describe('api throws an error', () => {
        beforeEach(() => {
          promiseStub = err => new Promise((resolve, reject) => reject(err));
          PostcodesModel.prototype.fetch = sinon.stub().returns(promiseStub({
            status: 404,
            detail: 'something went wrong'
          }));
        });

        it('sets postcodeApiMeta to sessionModel with messageKey: \'cant-connect\'', done => {
          controller.process(req, res, callback);
          Promise.all([promiseStub()]).catch(() => {
            req.sessionModel.set.should.have.been.calledWithExactly('postcodeApiMeta', {
              messageKey: 'cant-connect'
            });
            done();
          });
        });

        it('calls console.error with status: 404, detail: \'something went wrong\'', done => {
          controller.process(req, res, callback);
          Promise.all([promiseStub()]).catch(() => {
            console.error.should.have.been.calledWithExactly('Postcode lookup error: ',
              'Code: 404; Detail: something went wrong'
            );
            done();
          });
        });

        it('calls callback', done => {
          controller.process(req, res, callback);
          Promise.all([promiseStub()]).catch(() => {
            callback.should.have.been.calledOnce.and.calledWithExactly();
            done();
          });
        });
      });
    });
  });
});
