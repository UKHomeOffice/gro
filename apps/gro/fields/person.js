'use strict';

module.exports = {
  'person-text': {
    validate: ['required'],
    label: 'fields.person-text.label',
    invalidates: ['person-one', 'person-two']
  }
};
