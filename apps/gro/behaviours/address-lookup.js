'use strict';

const _ = require('lodash');

module.exports = superclass => class AddressLookup extends superclass {

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

  validate(key, req) {
    if (req.form.values[key] === this.options.fields['address-lookup'].options[0].value) {
      const imageValidationErrors = this.customError('address-lookup', 'required');
      return next(imageValidationErrors);
    }
    return super.validate(req, res, next);
  }

  customError(field, type) {
    const customError = typeof type === 'string' ? { type } : type;
    return { [field]: new this.ValidationError(field, customError) };
  }
};
