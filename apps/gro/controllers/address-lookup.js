'use strict';
const BaseController = require('hof').controllers.base;
const ErrorController = require('hof').controllers.error;
const _ = require('lodash');

module.exports = class AddressLookup extends BaseController {

  getValues(req, res, callback) {
    const addresses = req.sessionModel.get('addresses');
    const formattedlist = _.map(_.map(addresses, 'formatted_address'), address => {
      address = address.split('\n').join(', ');
      return {
        value: address,
        label: address
      };
    });

    const count = `${formattedlist.length} addresses`;
    this.options.fields['address-lookup'].options = [{value: count, label: count}].concat(formattedlist);
    super.getValues(req, res, callback);
  }

  saveValues(req, res, callback) {
    const addressLines = req.form.values['address-lookup'].split(', ').join('\n');
    req.sessionModel.set('address-textarea', addressLines);

    super.saveValues(req, res, callback);
  }

  post(req, res, cb) {
    this.getValues(req, res, () => {});
    super.post(req, res, cb);
  }

  validateField(key, req) {
    if (req.form.values[key] === this.options.fields['address-lookup'].options[0].value) {
      return new ErrorController('address-lookup', {
        key: 'address-lookup',
        type: 'required',
        redirect: undefined
      });
    }
    return undefined;
  }
};
