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

module.exports = TypeController;
