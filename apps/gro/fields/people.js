'use strict';

module.exports = {
  'person-one': {
    validate: ['required'],
    label: 'fields.person-one.label',
    invalidates: ['person-text']
  },
  'person-two': {
    label: 'fields.person-two.label',
    invalidates: ['person-text']
  }
};
