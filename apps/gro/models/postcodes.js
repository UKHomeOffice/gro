'use strict';

const Model = require('hof').model;
const config = require('../../../config');
const url = require('url');

module.exports = class PostcodesModel extends Model {
  fetch(options) {
    options = options || {};
    return new Promise((resolve, reject) => {
      options = Object.assign({}, options, {
        url: options.url || config.postcode.hostname + config.postcode.addresses.path,
        query: {
          postcode: options.postcode
        }
      });
      const reqConf = url.parse(this.url(options));

      reqConf.method = 'GET';
      reqConf.headers = {
        Authorization: config.postcode.authorization || ''
      };
      this.request(reqConf, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
};
