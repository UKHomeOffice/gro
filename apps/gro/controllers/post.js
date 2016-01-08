'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;

var PostController = function PostController() {
  BaseController.apply(this, arguments);
};

util.inherits(PostController, BaseController);

/* eslint no-unused-vars: 0 */
PostController.prototype.saveValues = function saveValues(req, res, callback) {

  var address = (function createAddressString(data) {

    return data['address-text-one'] + ' ' +
      data['address-text-two'] + ' ' +
      data['address-text-three'] + ' ' +
      data['address-text-four'] + ' ' +
      data['address-text-five'];


  }(req.form.values));

  req.sessionModel.set('address', address);

  BaseController.prototype.saveValues.apply(this, arguments);

};

module.exports = PostController;
