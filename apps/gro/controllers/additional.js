'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;
var _ = require('underscore');

var AdditionalController = function AdditionalController() {
  BaseController.apply(this, arguments);
};

util.inherits(AdditionalController, BaseController);

AdditionalController.prototype.validateField = function validateField(keyToValidate, req) {
  return BaseController.prototype.validateField.call(this, keyToValidate, req, false);
};

AdditionalController.prototype.getValues = function getValues(req, res) {

  res.locals.backLink = setBackLink(req, res.locals.backLink);

  BaseController.prototype.getValues.apply(this, arguments);
};

function setBackLink(req, backStep) {
  _.each(req.sessionModel.get('steps'), function (step) {
    if (step === '/person' || step === '/people') {
      backStep = step.replace(/^\//, '');
    }
  });
  return backStep;
}

module.exports = AdditionalController;
