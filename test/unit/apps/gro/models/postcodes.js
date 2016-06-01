'use strict';

const proxyquire = require('proxyquire');

class BaseModel {
  url(props) {
    return props;
  }

  request(conf, cb) {
    cb(null);
  }
}

describe('apps/gro/models/postcodes', () => {
  let model;
  let PostcodeModel;

  beforeEach(() => {
    PostcodeModel = proxyquire('../../../../../apps/gro/models/postcodes', {
      'hof': {
        Model: BaseModel
      },
      url: {
        parse: props => props
      }
    });

    sinon.spy(BaseModel.prototype, 'request');
    model = new PostcodeModel();
  });

  afterEach(() => {
    BaseModel.prototype.request.restore();
  });

  describe('fetch', () => {
    it('should return a promise', () => {
      model.fetch().should.be.a('promise');
    });

    it('should call BaseModel.prototype.request', done => {
      model.fetch()
        .then(() => {
          BaseModel.prototype.request.should.have.been.calledOnce;
          done();
        });
    });

    it('passes given options to BaseModel.prototype.request', done => {
      const opts = {
        url: 'http://test.com'
      };
      model.fetch(opts)
        .then(() => {
          BaseModel.prototype.request.should.have.been.calledWith(sinon.match({
            url: 'http://test.com'
          }));
          done();
        });
    });

    describe('request throws an error', () => {
      beforeEach(() => {
        BaseModel.prototype.request = (conf, cb) => {
          cb(true);
        };
        sinon.spy(BaseModel.prototype, 'request');

        PostcodeModel = proxyquire('../../../../../apps/gro/models/postcodes', {
          'hof': {
            Model: BaseModel
          },
          url: {
            parse: props => props
          }
        });

        model = new PostcodeModel();
      });

      it('throws an error if BaseModel.prototype.request calls callback with err defined', done => {
        model.fetch()
          .catch(err => {
            console.error(err);
            done();
          });
      });
    });
  });
});
