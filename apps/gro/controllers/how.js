'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;
var _ = require('underscore');

var HowController = function HowController() {
  BaseController.apply(this, arguments);
};

util.inherits(HowController, BaseController);

HowController.prototype.getValues = function getValues(req, res) {

  // TO DO. Figure out why this is needed
  res.locals.backLink = setBackLink(req);

  BaseController.prototype.getValues.apply(this, arguments);
};

function setBackLink(req) {
  var backStep = '';
  if (_.contains(req.sessionModel.get('steps'), '/additional')) {
    backStep = 'additional';
  } else {
    _.each(req.sessionModel.get('steps'), function (step) {
      if (step === '/person' || step === '/people') {
        backStep = step.replace(/^\//, '');
      }
    });
  }
  return backStep;
}

module.exports = HowController;
