'use strict';

var _ = require('lodash');

module.exports = {
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
      'additional-text',
      'additional-radio'
    ]
  }, {
    name: 'contact-details',
    fields: [
      'name-text',
      'email-text',
      'post-text',
      'country-text'
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
  }],
  modifiers: {
    'post-text': function combineLinesOfAddress(values) {
      var fields = [
        'address-text-one',
        'address-text-two',
        'address-text-three',
        'address-text-four',
        'address-text-five'
      ];
      return _.chain(values)
        .pick(fields)
        .values()
        .value()
        .join('<br />');
    }
  }
};
