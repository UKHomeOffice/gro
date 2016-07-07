'use strict';

module.exports = {
  'how-radio': {
    validate: ['required'],
    className: ['block', 'form-group'],
    options: [{
      value: 'online',
      label: 'fields.how-radio.options.online.label',
      toggle: 'online-toggle-text',
      child: 'input-text'
    }, {
      value: 'telephone',
      label: 'fields.how-radio.options.telephone.label',
      toggle: 'telephone-toggle-text',
      child: 'input-text'
    }, {
      value: 'post',
      label: 'fields.how-radio.options.post.label',
      toggle: 'post-toggle-text',
      child: 'input-text'
    }]
  },
  'online-toggle-text': {},
  'telephone-toggle-text': {},
  'post-toggle-text': {
    validate: ['numeric',
      {'type': 'minlength', 'arguments': [3]},
      {'type': 'maxlength', 'arguments': [7]}]
  }
};
