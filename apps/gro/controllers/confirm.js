'use strict';

const BaseController = require('hof').controllers.confirm;
const path = require('path');
const i18n = require('hof').i18n;
const Model = require('../../common/models/email');

module.exports = class ConfirmController extends BaseController {

  saveValues(req, res, callback) {
    const locali18n = i18n({
      path: path.resolve(
        __dirname, '../translations/__lng__/__ns__.json'
      )
    });

    locali18n.on('ready', () => {

      const subject = locali18n.translate('pages.email.information.subject');
      const data = {
        values: Object.assign({}, req.sessionModel.toJSON(), {
          reportDate: (new Date()).toISOString()
        }),
        email: req.sessionModel.get('email-text')
      };

      const model = new Model(data);

      model.set('template', 'gro');
      model.set('subject', subject);

      model.save(callback);

    });
  }
};
