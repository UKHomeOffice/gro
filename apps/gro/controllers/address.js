'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var _ = require('lodash');
var Client = require('node-rest-client').Client;
var config = require('../../../config');
var BaseController = controllers.base;
var ErrorController = controllers.error;

var AddressController = function AddressController() {
  BaseController.apply(this, arguments);
};

util.inherits(AddressController, BaseController);

/* eslint no-unused-vars: 0 */
AddressController.prototype.getValues = function getValues(req, res, callback) {
  res.locals.backLink = req.sessionModel.get('previous-step');
  var addresses = req.sessionModel.get('addresses');
  var formattedlist = _.map(_.map(addresses, 'formatted_address'), function callbackmap(arg) {
    return arg.split('\n').join(', ');
  });

  var count = formattedlist.length + ' addresses';
  this.options.fields.address.options = [count].concat(formattedlist);
  BaseController.prototype.getValues.apply(this, arguments);
};


/* eslint no-unused-vars: 0 */
AddressController.prototype.saveValues = function saveValues(req, res, callback) {
  var addressLines = req.form.values.address.split(', ');
  var addressFields = ['address-text-one',
    'address-text-two',
    'address-text-three',
    'address-text-four',
    'address-text-five'];
  for (var i = 0; i < addressLines.length - 1; i++) {
    req.sessionModel.set(addressFields[i], addressLines[i]);
  }

  var formattedAddress = req.form.values.address.split(', ').join('\n');
  var addresses = req.sessionModel.attributes.addresses;
  var address = _.find(addresses, 'formatted_address', formattedAddress);
  this.options.fields.address.validate = [];
  BaseController.prototype.saveValues.apply(this, arguments);

};

AddressController.prototype.validateField = function validateField(key, req) {
  // custom validation for address
  if (req.form.values[key] === this.options.fields.address.options[0]) {
    return new ErrorController('address', {
      key: 'address',
      type: 'required',
      redirect: undefined
    });
  }
};

module.exports = AddressController;
