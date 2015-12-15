'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;
var _ = require('underscore');

var HowController = function HowController() {
  BaseController.apply(this, arguments);
};

util.inherits(HowController, BaseController);

HowController.prototype.validateField = function validateField(keyToValidate, req) {
  // TO DO. Figure out why this is NOT needed
  // return BaseController.prototype.validateField.call(this, keyToValidate, req);
};

HowController.prototype.getValues = function getValues(req, res) {

  // TO DO. Figure out why this is needed
  res.locals.backLink = setBackLink(req);

  BaseController.prototype.getValues.apply(this, arguments);
};

// TO DO. Figure out why this is needed
HowController.prototype.getErrors = function(req, res) {
  var errs = req.sessionModel.get('errors');
  errs = _.pick(errs, Object.keys(this.options.fields));
  errs = _.pick(errs, function (err, key) {
    return !err.redirect;
  });
  return errs;
};

function setBackLink(req) {
  var backStep = '';
  if (_.contains(req.sessionModel.get('steps'), '/additional')) {
    backStep = 'additional';
  } else {
    _.each(req.sessionModel.get('steps'), function (step) {
      if (step === '/person' || step === '/people') {
        backStep = step.replace(/^\//, '');
      }
    });
  }
  return backStep;
}

module.exports = HowController;
