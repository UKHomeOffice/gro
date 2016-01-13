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

function setBackLink(req) {
  var backStep = '';
  if (_.contains(req.sessionModel.get('steps'), '/additional')) {
    backStep = 'additional';
  } else {
    _.each(req.sessionModel.get('steps'), function checkStep(step) {
      if (step === '/person' || step === '/people') {
        backStep = step.replace(/^\//, '');
      }
    });
  }
  return backStep;
}

HowController.prototype.getValues = function getValues(req, res) {

  res.locals.backLink = setBackLink(req);

  BaseController.prototype.getValues.apply(this, arguments);
};

module.exports = HowController;
