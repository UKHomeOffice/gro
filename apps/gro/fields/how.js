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
      label: 'fields.how-radio.options.online.label'
    }, {
      value: 'telephone',
      label: 'fields.how-radio.options.telephone.label'
    }, {
      value: 'post',
      label: 'fields.how-radio.options.post.label'
    }]
  }
};
