'use strict';

module.exports = {
  'which-radio': {
    mixin: 'radio-group',
    validate: ['required'],
    className: ['block', 'form-group'],
    options: [{
      value: 'standard',
      label: 'fields.which-radio.options.standard.label'
    }, {
      value: 'priority',
      label: 'fields.which-radio.options.priority.label'
    }]
  }
};
