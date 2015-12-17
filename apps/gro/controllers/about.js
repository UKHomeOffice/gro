'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;
var _ = require('underscore');

var AboutController = function AboutController() {
  BaseController.apply(this, arguments);
};

util.inherits(AboutController, BaseController);

AboutController.prototype.validateField = function validateField(keyToValidate, req) {
  return BaseController.prototype.validateField.call(this, keyToValidate, req, false);
};

AboutController.prototype.getNextStep = function getNextStep(req) {
  var next = BaseController.prototype.getNextStep.apply(this, arguments);

  if (_.contains(['complaint', 'other'], req.form.values['about-radio'])) {
    next = req.baseUrl + '/details';
  } else {
    next = req.baseUrl + '/type';
  }

  return next;
};

AboutController.prototype.saveValues = function saveValues(req) {
  if (req.params.action === 'edit' && req.sessionModel.get('about-radio') !== req.form.values['about-radio']) {
    var unsetFields = ['details-text', 'existing-radio', 'previous-radio'];

    req.sessionModel.set('steps', ['/', '/about']);

    _.each(unsetFields, function (field) {
      req.sessionModel.unset(field);
    });
  }

  BaseController.prototype.saveValues.apply(this, arguments);
};

module.exports = AboutController;
