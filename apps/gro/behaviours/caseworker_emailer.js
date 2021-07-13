'use strict';

const hof = require('hof');
const Emailer = hof.components.emailer;
const path = require('path');
const moment = require('moment');
const config = require('../../../config');
const sections = require('../sections/summary-data-sections.js');
const fields = require('../translations/src/en/fields.json');
const _ = require('lodash');

const parse = (model, translate) => {
  const getLabel = key => translate(`pages.confirm.fields.${key}.label`);
  const transformValue = (key, value) => _.get(fields, `${key}.options.${value}.label`) || value;

  const enquiryFields = [
    'about-radio',
    'type-radio',
    'details-text',
    'existing-radio',
    'previous-radio',
    'person-one',
    'person-two',
    'person-text',
    'additional-names',
    'additional-text',
    'additional-radio'
  ];
  const orderFields = [
    'how-radio',
    'online-toggle-text',
    'telephone-toggle-text',
    'telephone-toggle-text-2',
    'which-radio',
    'when-date'
  ];
  const personalFields = [
    'name-text',
    'email-text',
    'country-select',
    'address-lookup',
    'address-textarea',
    'postcode-code'
  ];

  return {
    enquiryDetails: [
      { label: getLabel('uniqueId'), value: model.uniqueId },
      { label: getLabel('submitted'), value: moment().format(config.dateTimeFormat) },
      ...enquiryFields.map(f => ({
        label: getLabel(f),
        value: transformValue(f, model[f])
      }))
    ],
    orderDetails: [
      ...orderFields.map(f => ({
        label: getLabel(f),
        value: transformValue(f, model[f])
      }))
    ],
    personalDetails: [
      ...personalFields.map(f => ({
        label: getLabel(f),
        value: transformValue(f, model[f])
      }))
    ]
  };
};

module.exports = settings => {
  if (!settings.from && !settings.replyTo) {
    // eslint-disable-next-line no-console
    console.warn('WARNING: Email `from` address must be provided. Falling back to stub email transport.');
  }

  return Emailer(Object.assign({}, settings, {
    recipient: settings.caseworker,
    subject: (model, translate) => translate('pages.email.subject'),
    template: path.resolve(__dirname, ('../views/email/caseworker_layout.html')),
    parse
  }));
};
