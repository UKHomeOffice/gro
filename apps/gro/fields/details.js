'use strict';

module.exports = {
  'details-text': {
    validate: ['required'],
    label: 'fields.details-text.label'
  },
  'existing-radio': {
    validate: ['required'],
    className: ['inline', 'form-group'],
    legend: {
      value: 'Is your complaint about an order you have made?'
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
      value: 'Have you previously complained about this?'
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
