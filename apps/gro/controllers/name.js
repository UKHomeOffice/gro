'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;
var _ = require('underscore');

var NameController = function NameController() {
  BaseController.apply(this, arguments);
};

util.inherits(NameController, BaseController);

module.exports = NameController;
