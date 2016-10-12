'use strict';

module.exports = {
  'about-radio': {
    mixin: 'radio-group',
    validate: ['required'],
    className: ['block', 'form-group'],
    options: [
      'not-received',
      'wrong-certificate',
      'damaged',
      'refund',
      'complaint',
      'other'
    ]
  }
};
