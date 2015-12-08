'use strict';

var util = require('util');
var _ = require('underscore');
var controllers = require('hof').controllers;
var BaseController = controllers.base;

var TypeController = function TypeController() {
  BaseController.apply(this, arguments);
};

util.inherits(TypeController, BaseController);

TypeController.prototype.validateField = function validateField(keyToValidate, req) {
  return BaseController.prototype.validateField.call(this, keyToValidate, req);
};

TypeController.prototype.getValues = function getValues(req) {
  var previousSteps = req.sessionModel.attributes.steps;

  this.options.backLink = '/gro' + previousSteps[previousSteps.length - 1];

  BaseController.prototype.getValues.apply(this, arguments);
};

TypeController.prototype.successHandler = function successHandler(req) {
  if (_.contains(['marriage', 'partnership'], req.form.values['type-radio'])) {
    this.options.next = '/people';
  } else {
    this.options.next = '/person';
  }

  BaseController.prototype.successHandler.apply(this, arguments);
};

module.exports = TypeController;
