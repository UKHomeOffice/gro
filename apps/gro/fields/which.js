'use strict';

module.exports = {
  "which-radio": {
    validate: ['required'],
    className: ['block', 'form-group'],
    legend: {
      className: 'visuallyhidden',
      value: ''
    },
    options: [{
      value: 'online',
      label: 'fields.which-radio.options.standard.label'
    }, {
      value: 'telephone',
      label: 'fields.which-radio.options.priority.label'
    }]
  },
  "order-number-text": {
    validate: ['required'],
    label: 'fields.order-number-text.label'
  }
};
