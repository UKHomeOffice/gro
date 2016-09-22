'use strict';

const BaseConfirmController = require('hof').controllers.confirm;
const _ = require('lodash');
const config = require('../../../config');
const EmailService = require('../services/email');
const fields = require('../fields');

delete require.cache[require.resolve('../')];
const stepConfig = require('../').steps;

module.exports = class ConfirmController extends BaseConfirmController {

  formatStepsForEmail(data) {
    return _(stepConfig)
      // reject all steps without locals, fields, or all fields in step are empty
      .reject(step => !step.locals || !step.fields || _.every(
        step.fields,
        field => data[field] === undefined)
      )
      // group by section
      .groupBy(step => step.locals.section)
      // flatten fields into sections bypassing steps
      .map((steps, section) => ({
          section,
          fields: _(steps)
            .map('fields')
            .flatten()
            // reject any fields with includeInEmail: false
            .reject(field => fields[field].includeInEmail === false)
            // map value to field
            .map(field => ({
              field,
              value: data[field]
            }))
            .value()
        })
      )
      .value();
  }

  // eslint-disable-next-line consistent-return
  saveValues(req, res, callback) {
    const data = this.formatStepsForEmail(req.sessionModel.toJSON());
    if (!data.length) {
      return callback(new Error('No data to send'));
    }
    _.first(data).fields.unshift({
      field: 'submission-date',
      value: (new Date()).toISOString()
    });
    Promise.all([
      this.sendEmail(config.email.caseworker, 'caseworker', data, req, res),
      this.sendEmail(req.sessionModel.get('email-text'), 'customer', data, req, res)
    ]).then(() => callback()).catch(err => callback(err));
  }

  sendEmail(to, recipient, data, req, res) {
    const subject = req.translate('email.information.subject');
    return new Promise((resolve, reject) => {
      Promise.all([
        this.renderTemplate(res.locals.partials['email-formatted'], recipient, data, res),
        this.renderTemplate(res.locals.partials['email-raw'], recipient, data, res),
      ]).then(values => {
        EmailService.sendEmail(to, subject, values, (err) => {
          if (err) {
            // eslint-disable-next-line no-console
            console.error(err);
            return reject(err);
          }
          // eslint-disable-next-line no-console
          console.info('Email sent');
          return resolve();
        });
      }, err => reject(err));
    });
  }

  renderTemplate(template, recipient, data, res) {
    return new Promise((resolve, reject) => {
      res.render(template, {
        recipient,
        data
      }, (err, html) => {
        if (err) {
          reject(err);
        }
        resolve(html);
      });
    });
  }
};
