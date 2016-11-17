'use strict';

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
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    useWhen: {
      field: 'about-radio',
      value: 'wrong-certificate'
    }
  },
  'additional-text': {
    mixin: 'textarea',
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
  'address-lookup': {
    className: ['address'],
    includeInEmail: false
  },
  'address-textarea': {
    mixin: 'textarea',
    validate: ['required'],
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens']
  },
  'country-select': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [''].concat(require('../../assets/countries').allCountries),
    legend: {
      className: 'visuallyhidden'
    },
    validate: ['required']
  },
  'details-text': {
    labelClassName: 'visuallyhidden',
    mixin: 'textarea',
    validate: ['required'],
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
    legend: {
      className: 'visuallyhidden'
    },
    validate: ['required'],
    className: ['block', 'form-group'],
    mixin: 'radio-group',
    options: [{
      value: 'online',
      toggle: 'online-toggle-text',
      child: 'input-text'
    }, {
      value: 'telephone',
      toggle: 'telephone-toggle-text',
      child: `<div id='telephone-toggle-text-panel'>
                <div class='panel-indent'>
                  {{#input-text}}telephone-toggle-text{{/input-text}}
                  {{#input-text}}telephone-toggle-text-2{{/input-text}}
                </div>
              </div>`
    },
    'post'
  ]
  },
  'online-toggle-text': {},
  'telephone-toggle-text': {},
  'telephone-toggle-text-2': {
    validate: ['numeric',
      {'type': 'minlength', 'arguments': [3]},
      {'type': 'maxlength', 'arguments': [7]}]
  },
  'name-text': {
    labelClassName: 'visuallyhidden',
    mixin: 'input-text',
    validate: ['required']
  },
  'person-one': {
    labelClassName: 'visuallyhidden',
    mixin: 'input-text',
    validate: ['required'],
  },
  'person-two': {
    mixin: 'input-text',
  },
  'person-text': {
    labelClassName: 'visuallyhidden',
    mixin: 'input-text',
    validate: ['required']
  },
  'postcode-code': {
    mixin: 'input-text-code',
    validate: ['required', 'postcode'],
    formatter: 'uppercase'
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
  'when-date': {},
  'when-date-day': {
    validate: ['required', 'numeric'],
    includeInEmail: false,
    includeInSummary: false
  },
  'when-date-month': {
    validate: ['required', 'numeric'],
    includeInEmail: false,
    includeInSummary: false
  },
  'when-date-year': {
    validate: ['required', 'numeric'],
    includeInEmail: false,
    includeInSummary: false
  },
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
  }
};
