'use strict';


module.exports = superclass => class ConfirmController extends superclass {
  get(req, res, callback) {
    this.removeDuplicateAddress(req);
    return super.get(req, res, callback);
  }

  post(req, res, callback) {
    this.removeDuplicateAddress(req);
    return super.post(req, res, callback);
  }

  removeDuplicateAddress(req) {
    const lookup = req.sessionModel.get('address-lookup');
    if (lookup) {
      this.options.fieldsConfig['address-textarea'].includeInSummary = false;
    } else {
      this.options.fieldsConfig['address-textarea'].includeInSummary = true;
    }
  }
};
