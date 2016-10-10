'use strict';

module.exports = {
  modifiers: {
    'about-radio': (value, req) =>
      req.translate(`pages.confirm.table.values['about-radio'][${value}]`)
  },
  tableSections: [{
    name: 'enquiry-details',
    fields: [
      'about-radio',
      'type-radio',
      'person-text',
      'person-one',
      'person-two',
      'details-text',
      'existing-radio',
      'previous-radio',
      'additional-names',
      'additional-text',
      'additional-radio'
    ]
  }, {
    name: 'order-details',
    fields: [
      'how-radio',
      'online-toggle-text',
      'telephone-toggle-text',
      'post-toggle-text',
      'which-radio',
      'order-number-text',
      'when-date'
    ]
  }, {
    name: 'contact-details',
    fields: [
      'name-text',
      'email-text',
      'country-select',
      'postcode-code',
      'address-textarea'
    ]
  }]
};
