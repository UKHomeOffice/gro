'use strict';

module.exports = {
  'which-radio': {
    validate: ['required'],
    className: ['block', 'form-group'],
    legend: {
      className: 'visuallyhidden',
      value: ''
    },
    options: [{
      value: 'standard',
      label: 'fields.which-radio.options.standard.label'
    }, {
      value: 'priority',
      label: 'fields.which-radio.options.priority.label'
    }]
  },
  'order-number-text': {
    validate: ['required'],
    label: 'fields.order-number-text.label',
    hint: 'fields.order-number-text.hint'
  }
};
