'use strict';
const BaseController = require('hof').controllers.base;
const ErrorController = require('hof').controllers.error;
const _ = require('lodash');

module.exports = class Address extends BaseController {

  getValues(req, res, callback) {
    const addresses = req.sessionModel.get('addresses');
    const formattedlist = _.map(_.map(addresses, 'formatted_address'), arg => arg.split('\n').join(', '));

    const count = `${formattedlist.length} addresses`;
    this.options.fields.address.options = [count].concat(formattedlist);
    super.getValues(req, res, callback);
  }

  saveValues(req, res, callback) {
    const addressLines = req.form.values.address.split(', ').join('\n');
    req.sessionModel.set('address-textarea', addressLines);

    super.saveValues(req, res, callback);
  }

  validateField(key, req) {
    if (req.form.values[key] === this.options.fields.address.options[0]) {
      return new ErrorController('address', {
        key: 'address',
        type: 'required',
        redirect: undefined
      });
    }
  }
};
