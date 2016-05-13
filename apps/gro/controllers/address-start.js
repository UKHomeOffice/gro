'use strict';

const BaseController = require('hof').controllers.base;
const _ = require('lodash');
const Client = require('node-rest-client').Client;
const config = require('../../../config');

module.exports = class AddressStartController extends BaseController {
  constructor(options) {
    super(options);
    this.error = 'An error occurred';
  }

  supercall(req, res, callback) {
    super.successHandler(req, res, callback);
  }

  getValues(req, res, callback) {
    const postcode = req.sessionModel.attributes.postcode.toUpperCase();
    req.sessionModel.set('postcode', postcode);
    const previouspostcode = req.sessionModel.attributes.previouspostcode;
    req.sessionModel.set('previous-step', res.locals.backLink);
    if (postcode !== previouspostcode) {
      const client = new Client();
      const url = config.postcode.hostname + config.postcode.addresses.path;
      const args = {
        parameters: {},
        headers: {'Authorization': config.postcode.authorization || ''}
      };
      args.parameters[config.postcode.addresses.param] = postcode;
      client.get(url, args,
        _.bind(function callbackget(data) {
          if (data.length > 0) {
            req.sessionModel.set('addresses', data);
            req.sessionModel.set('postcode-found', true);
          } else {
            req.sessionModel.set('postcode-found', false);
          }
          req.sessionModel.set('previouspostcode', req.sessionModel.attributes.postcode);
          this.supercall(req, res, callback);


        }, this));
    } else {
      super.successHandler(req, res, callback);
    }
  }
};
