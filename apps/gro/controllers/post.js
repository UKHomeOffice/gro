'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;

var PostController = function PostController() {
  BaseController.apply(this, arguments);
};

util.inherits(PostController, BaseController);

PostController.prototype.validateField = function validateField(keyToValidate, req) {
  return BaseController.prototype.validateField.call(this, keyToValidate, req);
};

module.exports = PostController;
