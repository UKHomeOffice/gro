'use strict';

const path = require('path');
const nodemailer = require('nodemailer');
const config = require('../../../config');
const stubTransport = require('nodemailer-stub-transport');
const smtpTransport = require('nodemailer-smtp-transport');

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

const transport = config.email.host === '' && config.email.port === ''
  ? stubTransport
  : smtpTransport;

const emailer = nodemailer.createTransport(transport(emailOptions));

module.exports = class EmailService {
  static sendEmail(to, subject, values, callback) {
    emailer.sendMail({
      to,
      subject,
      from: config.email.from,
      html: values[0],
      text: values[1],
      attachments: [{
        filename: 'govuk_logotype_email.png',
        path: path.resolve(__dirname, '../images/govuk_logotype_email.png'),
        cid: 'govuk_logotype_email'
      },
      {
        filename: 'ho_crest_27px.png',
        path: path.resolve(__dirname, '../images/ho_crest_27px.png'),
        cid: 'ho_crest_27px'
      },
      {
        filename: 'spacer.gif',
        path: path.resolve(__dirname, '../images/spacer.gif'),
        cid: 'spacer_image'
      }]
    }, callback);
  }
};
