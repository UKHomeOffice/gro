'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var _ = require('lodash');
var Client = require('node-rest-client').Client;
var config = require('../../../config');

var BaseController = controllers.base;

var AddressController = function AddressController() {
  BaseController.apply(this, arguments);
};

util.inherits(AddressController, BaseController);

/* eslint no-unused-vars: 0 */
AddressController.prototype.getValues = function getValues(req, res, callback) {

  var argsi = arguments;
  var postcode = req.sessionModel.attributes.postcode;
  var previouspostcode = req.sessionModel.attributes.previouspostcode;
  var data = req.form.values;
  if (postcode !== previouspostcode) {
    var client = new Client();
    var url = config.postcode.hostname + config.postcode.addresses.path;
    var args = {
      parameters: {},
      headers: {'Authorization': config.postcode.authorization || ''}
    };
    args.parameters[config.postcode.addresses.param] = postcode;
    client.get(url, args,
      _.bind(function callbackget(getdata, response) {
        if (getdata.length > 0) {
          var count = getdata.length + ' addresses';
          var list = _.map(_.map(getdata, 'formatted_address'), function callbackmap(arg) {
            return arg.split('\n').join(', ');
          });
          this.options.fields.address.options = [count].concat(list);
          req.sessionModel.set('addresses', data);
        }
        req.sessionModel.set('previouspostcode', req.sessionModel.attributes.postcode);
        BaseController.prototype.getValues.apply(this, argsi);

      }, this));
  } else {
    BaseController.prototype.getValues.apply(this, arguments);
  }
};


/* eslint no-unused-vars: 0 */
AddressController.prototype.saveValues = function saveValues(req, res, callback) {

  var formattedAddress = req.form.values.address.split(', ').join('\n');
  var addresses = req.sessionModel.attributes.addresses;
  var address = _.find(addresses, 'formatted_address', formattedAddress);
  var road = address.building_number + ' ' + _.capitalize(address.thoroughfare_name);
  BaseController.prototype.saveValues.apply(this, arguments);

};

module.exports = AddressController;
