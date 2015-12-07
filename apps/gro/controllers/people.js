'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;

var PeopleController = function PeopleController() {
  BaseController.apply(this, arguments);
};

util.inherits(PeopleController, BaseController);

PeopleController.prototype.validateField = function validateField(keyToValidate, req) {
  return BaseController.prototype.validateField.call(this, keyToValidate, req);
};

module.exports = PeopleController;
