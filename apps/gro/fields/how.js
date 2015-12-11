'use strict';

module.exports = {
  'how-radio': {
    validate: ['required'],
    className: ['block', 'form-group'],
    legend: {
      className: 'visuallyhidden',
      value: ''
    },
    options: [{
      value: 'online',
      label: 'fields.how-radio.options.online.label',
      toggle: 'online-toggle-text'
    }, {
      value: 'telephone',
      label: 'fields.how-radio.options.telephone.label',
      toggle: 'telephone-toggle-text'
    }, {
      value: 'post',
      label: 'fields.how-radio.options.post.label',
      toggle: 'post-toggle-text'
    }]
  },
  'online-toggle-text': {
    validate: ['required'],
    legend: 'fields.online-toggle-text.legend',
    dependent: {
      field: 'how-radio',
      value: 'online'
    }
  },
  'telephone-toggle-text': {
    validate: ['required'],
    legend: 'fields.telephone-toggle-text.legend',
    dependent: {
      field: 'how-radio',
      value: 'telephone'
    }
  },
  'post-toggle-text': {
    validate: ['required'],
    legend: 'fields.post-toggle-text-legend',
    dependent: {
      field: 'how-radio',
      value: 'post'
    }
  }
};
