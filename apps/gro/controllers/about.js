'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;
var _ = require('lodash');

var AboutController = function AboutController() {
  BaseController.apply(this, arguments);
};

util.inherits(AboutController, BaseController);

AboutController.prototype.validateField = function validateField(keyToValidate, req) {
  return BaseController.prototype.validateField.call(this, keyToValidate, req, false);
};

AboutController.prototype.getNextStep = function getNextStep(req, res) {
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

AboutController.prototype.saveValues = function saveValues(req) {
  if (req.params.action === 'edit' && req.sessionModel.get('about-radio') !== req.form.values['about-radio']) {
    var unsetFields = [];

    if (_.contains(req.sessionModel.get('steps'), '/details')) {
      unsetFields = ['details-text', 'existing-radio', 'previous-radio'];
    } else {
      unsetFields = [
        'type-radio',
        'person-text',
        'person-one',
        'person-two',
        'additional-radio',
        'how-radio',
        'online-toggle-text',
        'telephone-toggle-text',
        'post-toggle-text',
        'which-radio',
        'order-number-text',
        'when-date',
        'when-date-day',
        'when-date-month',
        'when-date-year',
        'when-date-summary'
      ];
    }

    req.sessionModel.set('steps', ['/', '/about']);

    _.each(unsetFields, function unsetField(field) {
      req.sessionModel.unset(field);
    });
  }

  BaseController.prototype.saveValues.apply(this, arguments);
};

module.exports = AboutController;
