'use strict';

const hof = require('hof');
const Notify = hof.components.notify;
const path = require('path');
const moment = require('moment');
const config = require('../../../config');
const fields = require('../translations/src/en/fields.json');
const _ = require('lodash');

const parse = (model, translate) => {
  const format = label => label.includes('?') ? label : label + ":";
  const getLabel = key => format(translate(`pages.confirm.fields.${key}.label`));
  const transformValue = (key, value) => _.get(fields, `${key}.options.${value}.label`) ||
      (key === 'when-date' ? moment(value).format('DD-MM-YYYY') : value);

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
    'building',
    'street',
    'townOrCity',
    'countyOrState',
    'postcodeOrZIPCode',
    'country-select'
  ];

  return {
    enquiryHeader: translate('pages.enquiry-details'),
    orderHeader: translate('pages.order-details'),
    contactHeader: translate('pages.contact-details'),
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
  return Notify(Object.assign({}, settings, {
    recipient: settings.caseworker,
    subject: (model, translate) => translate('pages.email.subject'),
    template: path.resolve(__dirname, ('../views/email/caseworker_layout.html')),
    parse
  }));
};
