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
  'online-toggle-text': {
    validate: ['required'],
    hint: 'fields.online-toggle-text.hint',
    dependent: {
      field: 'how-radio',
      value: 'online'
    }
  },
  'telephone-toggle-text': {
    validate: ['required'],
    hint: 'fields.telephone-toggle-text.hint',
    dependent: {
      field: 'how-radio',
      value: 'telephone'
    }
  },
  'post-toggle-text': {
    validate: ['required'],
    hint: 'fields.post-toggle-text.hint',
    dependent: {
      field: 'how-radio',
      value: 'post'
    }
  }
};
