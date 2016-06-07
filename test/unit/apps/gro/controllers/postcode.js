'use strict';

const proxyquire = require('proxyquire');
const BaseController = sinon.stub();
class PostcodesModel {}

describe('apps/gro/controllers/no-postcode', () => {
  let PostcodeController;
  let controller;
  const req = {};
  const res = {};
  let callback;
  let logger;

  beforeEach(() => {
    callback = sinon.stub();
    logger = {
      error: sinon.stub()
    };
    PostcodesModel.prototype.fetch = sinon.stub().returns(new Promise((resolve) => resolve()));
    PostcodeController = proxyquire('../../../../../apps/gro/controllers/postcode', {
      'hof': {
        controllers: {
          base: BaseController
        }
      },
      '../models/postcodes': PostcodesModel,
      '../../../lib/logger': logger
    });
    req.sessionModel = {
      get: sinon.stub().returns('BN1 1AA')
    };
    req.form = {
      values: {
        postcode: 'BN1 1AA'
      }
    };
    controller = new PostcodeController();
  });

  describe('process', () => {
    it('should call callback with no args if req.form.values.postcode is the same as in sessionModel', () => {
      controller.process(req, res, callback);
      callback.should.have.been.calledOnce.and.calledWithExactly();
      PostcodesModel.prototype.fetch.should.not.have.been.called;
    });

    it('should call fetch with postcode in options object if postcode isn\'t saved to sessionModel', function () {
      req.sessionModel.get = sinon.stub().returns(undefined);
      controller.process(req, res, callback);
      PostcodesModel.prototype.fetch.should.have.been.calledOnce.and.calledWithExactly({
        postcode: 'BN1 1AA'
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

        it('calls logger.error with status: 404, detail: \'something went wrong\'', done => {
          controller.process(req, res, callback);
          Promise.all([promiseStub()]).catch(() => {
            logger.error.should.have.been.calledWithExactly('Postcode lookup error: ',
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