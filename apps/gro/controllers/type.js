'use strict';

var util = require('util');
var controllers = require('hof').controllers;
/* eslint no-unused-vars: 0 */
var _ = require('underscore');
var BaseController = controllers.base;

var TypeController = function TypeController() {
  BaseController.apply(this, arguments);
};

util.inherits(TypeController, BaseController);

function setBackLink(req, backStep) {
  _.each(req.sessionModel.get('steps'), function checkStep(step) {
    if (step === '/about' || step === '/details') {
      backStep = step.replace(/^\//, '');
    }
  });
  return backStep;
}

TypeController.prototype.getValues = function getValues(req, res) {

  res.locals.backLink = setBackLink(req, res.locals.backLink);

  BaseController.prototype.getValues.apply(this, arguments);
};

module.exports = TypeController;
