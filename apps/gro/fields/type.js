'use strict';

module.exports = {
  'type-radio': {
    validate: ['required'],
    className: ['block', 'form-group'],
    options: [{
      value: 'birth',
      label: 'fields.type-radio.options.birth.label'
    }, {
      value: 'marriage',
      label: 'fields.type-radio.options.marriage.label'
    }, {
      value: 'death',
      label: 'fields.type-radio.options.death.label'
    }, {
      value: 'adoption',
      label: 'fields.type-radio.options.adoption.label'
    }, {
      value: 'partnership',
      label: 'fields.type-radio.options.partnership.label'
    }]
  }
};
