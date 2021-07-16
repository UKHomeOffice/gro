
const moment = require('moment');
const config = require('../../../config');

module.exports = {
  'enquiry-details': [
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
  ],
  'order-details': [
    'how-radio',
    'online-toggle-text',
    'telephone-toggle-text',
    'telephone-toggle-text-2',
    'which-radio',
    {
      field: 'when-date',
      parse: d => d && moment(d).format(config.PRETTY_DATE_FORMAT)
    }
  ],
  'contact-details': [
    'name-text',
    'email-text',
    'building',
    'street',
    'townOrCity',
    'postcode',
    'country-select'
  ]
};
