'use strict';

module.exports = {
  'address-textarea': {
    mixin: 'textarea',
    validate: ['required'],
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens']
  }
};
