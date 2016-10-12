'use strict';

module.exports = {
  modifiers: {
    'about-radio': function translateValue(value, req) {
      return req.translate(`fields[${this.name}].options[${value}].label`);
    }
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
      'telephone-toggle-text-2',
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
