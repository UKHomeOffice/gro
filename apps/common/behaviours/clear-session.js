
const _ = require('lodash');
const config = require('../../../config');

const confirmStep = config.routes.confirmStep;

module.exports = superclass => class extends superclass {
  getValues(req, res, callback) {
    return super.getValues(req, res, (err, values) => {
      if (err) {
        return callback(err, values);
      }

      if (req.path !== confirmStep && _.get(this, `options.steps[${confirmStep}]`)) {
        this.options.steps[confirmStep].submitted = false;
      }
      const noNext = _.isUndefined(this.options.next);
      const clearSession = this.options.clearSession;
      // clear the session if there's no next step or we request to clear the session
      if ((noNext && clearSession !== false) || clearSession === true) {
        req.sessionModel.reset();
      }
      return callback(null, values);
    });
  }
};
