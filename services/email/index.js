'use strict';

const logger = require('../../lib/logger');
const nodemailer = require('nodemailer');
const config = require('../../config');
const i18n = require('hof').i18n;
const Hogan = require('hogan.js');
const i18nLookup = require('hof').i18nLookup;
const fs = require('fs');
const path = require('path');

const customerHtmlTemplates = {
  gro: fs.readFileSync(
    path.resolve(__dirname, './templates/customer/html/gro.mus')).toString('utf8')
};

const customerPlainTextTemplates = {
  gro: fs.readFileSync(
    path.resolve(__dirname, './templates/customer/plain/gro.mus')).toString('utf8')
};

const caseworkerHtmlTemplates = {
  gro: fs.readFileSync(
    path.resolve(__dirname, './templates/caseworker/html/gro.mus')).toString('utf8')
};

const caseworkerPlainTextTemplates = {
  gro: fs.readFileSync(
    path.resolve(__dirname, './templates/caseworker/plain/gro.mus')).toString('utf8')
};

const translationLocation = {
  gro: 'gro'
};

const transport = (config.email.host === '' && config.email.port === '') ?
  require('nodemailer-stub-transport') : require('nodemailer-smtp-transport');

const emailOptions = {
  host: config.email.host,
  port: config.email.port,
  ignoreTLS: config.email.ignoreTLS
};

if (config.email.auth.user && config.email.auth.pass) {
  emailOptions.auth = config.email.auth;
}

if (config.email.secure) {
  emailOptions.secure = config.email.secure;
}

class Emailer {
  constructor() {
    this.transporter = nodemailer.createTransport(transport(emailOptions));
  }

  send(email, callback) {

    var locali18n = i18n({
      path: path.resolve(
        __dirname, '../../apps/', './' + translationLocation[email.template], './translations/__lng__/__ns__.json'
      )
    });

    locali18n.on('ready', function locali18nLoaded() {
      var lookup = i18nLookup(locali18n.translate.bind(locali18n));
      var templateData = {
        data: email.dataToSend,
        t: function t() {
          return function lookupTranslation(translate) {
            // for translations inside our mustache templates
            return lookup(Hogan.compile(translate).render(email.dataToSend));
          };
        }
      };

      var customerPlainText = Hogan.compile(customerPlainTextTemplates[email.template]).render(templateData);
      var customerHTML = Hogan.compile(customerHtmlTemplates[email.template]).render(templateData);
      var caseworkerPlainText = Hogan.compile(caseworkerPlainTextTemplates[email.template]).render(templateData);
      var caseworkerHTML = Hogan.compile(caseworkerHtmlTemplates[email.template]).render(templateData);

      function sendCustomerEmail() {
        if (email.to) {
          logger.info('Emailing customer: ', email.subject);
          this.transporter.sendMail({
            from: config.email.from,
            to: email.to,
            subject: email.subject,
            text: customerPlainText,
            html: customerHTML,
            attachments: [
              {
                filename: 'govuk_logotype_email.png',
                path: path.resolve(__dirname, './images/govuk_logotype_email.png'),
                cid: 'govuk_logotype_email'
              },
              {
                filename: 'ho_crest_27px.png',
                path: path.resolve(__dirname, './images/ho_crest_27px.png'),
                cid: 'ho_crest_27px'
              },
              {
                filename: 'spacer.gif',
                path: path.resolve(__dirname, './images/spacer.gif'),
                cid: 'spacer_image'
              }
            ]
          }, callback);
        } else {
          callback();
        }
      }

      logger.info('Emailing caseworker: ', email.subject);
      this.transporter.sendMail({
        from: config.email.from,
        to: config.email.caseworker[email.template],
        subject: email.subject,
        text: caseworkerPlainText,
        html: caseworkerHTML,
        attachments: [
          {
            filename: 'govuk_logotype_email.png',
            path: path.resolve(__dirname, './images/govuk_logotype_email.png'),
            cid: 'govuk_logotype_email'
          },
          {
            filename: 'ho_crest_27px.png',
            path: path.resolve(__dirname, './images/ho_crest_27px.png'),
            cid: 'ho_crest_27px'
          },
          {
            filename: 'spacer.gif',
            path: path.resolve(__dirname, './images/spacer.gif'),
            cid: 'spacer_image'
          }
        ]
      }, sendCustomerEmail.bind(this));
    }.bind(this));
  }
}

module.exports = new Emailer();
