'use strict';

module.exports = {
  'additional-text': {
    mixin: 'input-text'
  },
  'additional-radio': {
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
