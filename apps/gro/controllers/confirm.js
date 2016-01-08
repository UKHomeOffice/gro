'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;
var path = require('path');
var i18n = require('hof').i18n;

var Model = require('../../common/models/email');

var ConfirmController = function ConfirmController() {
  BaseController.apply(this, arguments);
};

util.inherits(ConfirmController, BaseController);


ConfirmController.prototype.saveValues = function saveValues(req, res, callback) {

  var locali18n = i18n({
    path: path.resolve(
      __dirname, '../translations/__lng__/__ns__.json'
    )
  });

  locali18n.on('ready', function prepareEmail() {

    var subject = locali18n.translate('pages.email-table.information.subject');

    var d = {
      values: (function getSessionValues(data) {
        var r = {};
        for (var prop in data) {
          r[prop] = data[prop];
        }
        return r;
      }(req.sessionModel.attributes))
    };

    var dateTime = new Date();
    d.values.reportDate = dateTime.toISOString();

    var model = new Model(d);
    var service = {
      template: 'gro',
      subject: subject
    };

    if (service) {
      model.set('template', service.template);
      model.set('subject', service.subject);
    } else {
      throw new Error('no service found');
    }

    model.save(callback);

  });

};

module.exports = ConfirmController;
