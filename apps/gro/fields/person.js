'use strict';

module.exports = {
  'person-text': {
    validate: ['required'],
    label: 'fields.person-text.label'
  },
  'yes-no-radio': {
    validate: ['required'],
    className: ['inline', 'form-group'],
    options: [{
      value: 'Yes',
      label: 'Yes'
    }, {
      value: 'No',
      label: 'No'
    }]
  },
  'example-depends-on-text': {
    validate: ['required'],
    legend: 'fields.toggled-text.legend',
    dependent: {
      field: 'yes-no-radio',
      value: 'Yes'
    }
  }
};
