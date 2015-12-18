'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;
var _ = require('lodash');

var DetailsController = function DetailsController() {
  BaseController.apply(this, arguments);
};

util.inherits(DetailsController, BaseController);

DetailsController.prototype.validateField = function validateField(keyToValidate, req) {
  return BaseController.prototype.validateField.call(this, keyToValidate, req);
};

DetailsController.prototype.getNextStep = function getNextStep(req, res) {
  var next = BaseController.prototype.getNextStep.apply(this, arguments);

  var forks = (this.options || {}).forks || [];

  _.each(forks, function eachFork(fork) {
    if (_.isFunction(fork.condition)) {
      if (fork.condition(req, res)) {
        next = req.baseUrl + fork.target;
      }
    }
    if (_.isPlainObject(fork.condition)) {
      if (fork.condition.value === req.form.values[fork.condition.field]) {
        next = req.baseUrl + fork.target;
      }
    }
  });

  if (req.params.action === 'edit' && !this.options.continueOnEdit) {
    if (!_.contains(req.sessionModel.get('steps'), next)) {
      next = req.baseUrl === '/' ? this.confirmStep : req.baseUrl + this.confirmStep;
    }
  } else if (req.params.action === 'edit') {
    next += '/edit';
  }

  return next;
};

DetailsController.prototype.saveValues = function saveValues(req) {
  if (req.sessionModel.get('existing-radio') !== req.form.values['existing-radio']) {
    req.sessionModel.set('steps', ['/', '/about', '/details']);
  }

  BaseController.prototype.saveValues.apply(this, arguments);
};

module.exports = DetailsController;
