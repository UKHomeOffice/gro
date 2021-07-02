'use strict';

module.exports = superclass => class AddressController extends superclass {

  getValues(req, res, callback) {
    if (req.params.action === 'manual') {
      req.sessionModel.unset([
        'postcode-code',
        'postcodeApiMeta'
      ]);
    }
    super.getValues(req, res, callback);
  }

  locals(req, res, callback) {
    const isManual = req.params.action === 'manual';
    const locals = super.locals(req, res, callback);
    const isDomestic = req.form.values['country-select'] === 'United Kingdom';
    return Object.assign({}, locals, {
      isDomestic,
      postcodeApiMessageKey: isManual ? '' : (req.sessionModel.get('postcodeApiMeta') || {}).messageKey
    });
  }

  saveValues(req, res, callback) {
    super.saveValues(req, res, err => {
      if (err) {
        return callback(err);
      }
      req.sessionModel.unset('address-lookup');
      return callback();
    });
  }
};
