'use strict';

module.exports = {
  'additional-text': {
    label: ' '
  },
  'additional-radio': {
    validate: ['required'],
    className: ['inline', 'form-group'],
    legend: {
      value: 'fields.additional-radio.legend'
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
