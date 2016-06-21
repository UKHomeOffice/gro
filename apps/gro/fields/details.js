'use strict';

module.exports = {
  'details-text': {
    mixin: 'textarea',
    validate: ['required'],
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens']
  },
  'existing-radio': {
    mixin: 'radio-group',
    validate: ['required'],
    className: ['inline', 'form-group'],
    options: [{
      value: 'yes',
      label: 'Yes'
    }, {
      value: 'no',
      label: 'No'
    }]
  },
  'previous-radio': {
    mixin: 'radio-group',
    validate: ['required'],
    className: ['inline', 'form-group'],
    options: [{
      value: 'yes',
      label: 'Yes'
    }, {
      value: 'no',
      label: 'No'
    }]
  }
};
