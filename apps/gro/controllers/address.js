'use strict';
const BaseController = require('hof').controllers.base;
const ErrorController = require('hof').controllers.error;
const _ = require('lodash');

module.exports = class Address extends BaseController {
  constructor(options) {
    super(options);
  }

  getValues(req, res) {
    res.locals.backLink = req.sessionModel.get('previous-step');
    const addresses = req.sessionModel.get('addresses');
    const formattedlist = _.map(_.map(addresses, 'formatted_address'), arg => arg.split('\n').join(', '));

    const count = formattedlist.length + ' addresses';
    this.options.fields.address.options = [count].concat(formattedlist);
    super.getValues.apply(this, arguments);
  }

  saveValues(req) {
    const addressLines = req.form.values.address.split(', ');
    const addressFields = ['address-text-one',
      'address-text-two',
      'address-text-three',
      'address-text-four',
      'address-text-five'];
    for (let i = 0; i < addressLines.length - 1; i++) {
      req.sessionModel.set(addressFields[i], addressLines[i]);
    }

    // const formattedAddress = req.form.values.address.split(', ').join('\n');
    // const addresses = req.sessionModel.attributes.addresses;
    // const address = _.find(addresses, 'formatted_address', formattedAddress);
    super.saveValues.apply(this, arguments);

  }

  validateField(key, req) {
    // custom validation for address
    if (req.form.values[key] === this.options.fields.address.options[0]) {
      return new ErrorController('address', {
        key: 'address',
        type: 'required',
        redirect: undefined
      });
    }
  }
};
