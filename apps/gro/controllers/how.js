'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;
/* eslint no-unused-vars: 0 */
var _ = require('underscore');

var HowController = function HowController() {
  BaseController.apply(this, arguments);
};

util.inherits(HowController, BaseController);

module.exports = HowController;
