'use strict';

module.exports = {
  'about-radio': {
    validate: ['required'],
    className: ['block', 'form-group'],
    legend: {
      className: 'visuallyhidden',
      value: ''
    },
    options: [{
      value: 'not-received',
      label: 'fields.about-radio.options.not-received.label'
    }, {
      value: 'wrong-certificate',
      label: 'fields.about-radio.options.wrong-certificate.label'
    }, {
      value: 'damaged',
      label: 'fields.about-radio.options.damaged.label'
    }, {
      value: 'refund',
      label: 'fields.about-radio.options.refund.label'
    }, {
      value: 'complaint',
      label: 'fields.about-radio.options.complaint.label'
    }, {
      value: 'other',
      label: 'fields.about-radio.options.other.label'
    }]
  }
};
