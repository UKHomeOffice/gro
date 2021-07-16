'use strict';

const hof = require('hof');
const dateComponent = hof.components.date;

module.exports = {
  'about-radio': {
    legend: {
      className: 'visuallyhidden'
    },
    mixin: 'radio-group',
    validate: ['required'],
    className: ['block', 'form-group'],
    options: [
      'not-received',
      'wrong-certificate',
      'damaged',
      'refund',
      'complaint',
      'other'
    ]
  },
  'additional-names': {
    mixin: 'textarea',
    validate: ['notUrl'],
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    useWhen: {
      field: 'about-radio',
      value: 'wrong-certificate'
    }
  },
  'additional-text': {
    mixin: 'textarea',
    validate: ['notUrl'],
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens']
  },
  'additional-radio': {
    mixin: 'radio-group',
    validate: ['required'],
    className: ['inline', 'form-group'],
    options: [
      'yes',
      'no'
    ]
  },
  'details-text': {
    labelClassName: 'visuallyhidden',
    mixin: 'textarea',
    validate: ['required', 'notUrl'],
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens']
  },
  'existing-radio': {
    mixin: 'radio-group',
    validate: ['required'],
    className: ['inline', 'form-group'],
    options: [
      'yes',
      'no'
    ]
  },
  'previous-radio': {
    mixin: 'radio-group',
    validate: ['required'],
    className: ['inline', 'form-group'],
    options: [
      'yes',
      'no'
    ]
  },
  'email-text': {
    labelClassName: 'visuallyhidden',
    mixin: 'input-text',
    validate: ['required', 'email']
  },
  'how-radio': {
    mixin: 'radio-group',
    validate: ['required'],
    options: [{
      value: 'online',
      toggle: 'online-toggle-text',
      child: 'input-text'
    }, {
      value: 'telephone',
      toggle: 'telephone-toggle-text',
      child: 'partials/how-telephone-details'
    },
      { value: 'post' }
    ],
    legend: {
      className: 'visuallyhidden'
    }
  },
  'online-toggle-text': {
    validate: ['required', 'notUrl'],
    dependent: {
      field: 'how-radio',
      value: 'online'
    }
  },
  'telephone-toggle-text': {
    validate: ['required', 'notUrl'],
    dependent: {
      field: 'how-radio',
      value: 'telephone'
    }
  },
  'telephone-toggle-text-2': {
    validate: ['required', 'numeric',
      { type: 'minlength', arguments: [3] },
      { type: 'maxlength', arguments: [7] }
    ],
    dependent: {
      field: 'how-radio',
      value: 'telephone'
    }
  },
  'name-text': {
    labelClassName: 'visuallyhidden',
    mixin: 'input-text',
    validate: ['required', 'notUrl']
  },
  'person-one': {
    labelClassName: 'visuallyhidden',
    mixin: 'input-text',
    validate: ['required', 'notUrl']
  },
  'person-two': {
    mixin: 'input-text',
    validate: ['notUrl']
  },
  'person-text': {
    labelClassName: 'visuallyhidden',
    mixin: 'input-text',
    validate: ['required', 'notUrl']
  },
  'type-radio': {
    legend: {
      className: 'visuallyhidden'
    },
    mixin: 'radio-group',
    validate: ['required'],
    className: ['block', 'form-group'],
    options: [
      'birth',
      'marriage',
      'death',
      'adoption',
      'partnership'
    ]
  },
  'when-date': dateComponent('when-date', {
    validate: ['required', 'before']
  }),
  'which-radio': {
    legend: {
      className: 'visuallyhidden'
    },
    mixin: 'radio-group',
    validate: ['required'],
    className: ['block', 'form-group'],
    options: [
      'standard',
      'priority'
    ]
  },
  'country-select': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [''].concat(require('homeoffice-countries').allCountries),
    legend: {
      className: 'visuallyhidden'
    },
    validate: ['required']
  },
  building: {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 100 }]
  },
  street: {
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }],
    labelClassName: 'visuallyhidden'
  },
  townOrCity: {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 100 }]
  },
  postcode: {
    validate: ['required', 'postcode'],
    formatter: ['removespaces', 'uppercase']
  }
};
