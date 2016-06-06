'use strict';

module.exports = {
  'which-radio': {
    validate: ['required'],
    className: ['block', 'form-group'],
    options: [{
      value: 'standard',
      label: 'fields.which-radio.options.standard.label'
    }, {
      value: 'priority',
      label: 'fields.which-radio.options.priority.label'
    }]
  },
  'order-number-text': {
    validate: ['required']
  }
};
