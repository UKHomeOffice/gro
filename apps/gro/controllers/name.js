'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;
var _ = require('underscore');

var NameController = function NameController() {
  BaseController.apply(this, arguments);
};

util.inherits(NameController, BaseController);

function setBackLink(req, backStep) {
  _.each(req.sessionModel.get('steps'), function checkStep(step) {
    if (step === '/when' || step === '/details') {
      backStep = step.replace(/^\//, '');
    }
  });
  return backStep;
}

NameController.prototype.getValues = function getValues(req, res) {

  res.locals.backLink = setBackLink(req, res.locals.backLink);

  BaseController.prototype.getValues.apply(this, arguments);
};

module.exports = NameController;
