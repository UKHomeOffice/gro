'use strict';

module.exports = {
  'details-text': {
    validate: ['required'],
    label: ' '
  },
  'existing-radio': {
    validate: ['required'],
    className: ['inline', 'form-group'],
    legend: {
      value: 'fields.existing-radio.legend'
    },
    options: [{
      value: 'yes',
      label: 'Yes'
    }, {
      value: 'no',
      label: 'No'
    }]
  },
  'previous-radio': {
    validate: ['required'],
    className: ['inline', 'form-group'],
    legend: {
      value: 'fields.previous-radio.legend'
    },
    options: [{
      value: 'yes',
      label: 'Yes'
    }, {
      value: 'no',
      label: 'No'
    }]
  }
};
