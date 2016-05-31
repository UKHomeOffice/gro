'use strict';

const BaseController = require('hof').controllers.base;
const Client = require('node-rest-client').Client;
const config = require('../../../config');
var logger = require('../../../lib/logger');

module.exports = class AddressStartController extends BaseController {
  constructor(options) {
    super(options);
  }

  getValues(req, res) {
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
      client.get(url, args, data => {
          if (data.length > 0) {
            req.sessionModel.set('addresses', data);
            req.sessionModel.set('postcode-found', true);
          } else {
            req.sessionModel.set('postcode-found', false);
            if (data.detail === 'You do not have permission to perform this action.') {
              req.sessionModel.set('postcode-error', 'Sorry – we couldn’t connect to the server at this time.');
              logger.error('Postcode lookup error: ', 'Authorisation error');
            } else {
              req.sessionModel.set('postcode-error', 'Sorry – we couldn’t find any addresses for that postcode.');
            }
          }
          req.sessionModel.set('previouspostcode', req.sessionModel.attributes.postcode);
          super.successHandler(req, res);
        })
        .on('error', (err) => {
          req.sessionModel.set('postcode-found', false);
          req.sessionModel.set('postcode-error', 'Sorry - we couldn’t connect to the server at this time.');
          logger.error('Postcode lookup error: ',
            `Code: ${err.code} Host: ${err.request.options.host} Path: ${err.request.options.path}`);
          super.successHandler(req, res);
        });
    } else {
      super.successHandler(req, res);
    }
  }
};
