'use strict';

const controllers = require('hof').controllers;
const BaseController = controllers.base;
const path = require('path');
const i18n = require('hof').i18n;

const Model = require('../../common/models/email');

class ConfirmController extends BaseController {
  saveValues(req, res, callback) {

    const locali18n = i18n({
      path: path.resolve(
        __dirname, '../translations/__lng__/__ns__.json'
      )
    });

    locali18n.on('ready', () => {

      const subject = locali18n.translate('pages.email.information.subject');

      const d = {
        values: (data => {
          const r = {};
          let prop;
          for (prop in data) {
            r[prop] = data[prop];
          }
          return r;
        })(req.sessionModel.attributes)
      };

      const dateTime = new Date();
      d.values.reportDate = dateTime.toISOString();
      d.email = d.values['email-text'];

      const model = new Model(d);

      model.set({
        template: 'gro',
        subject
      });

      model.save(callback);
    });

  }
}

module.exports = ConfirmController;
