'use strict';

module.exports = {
  'address-textarea': {
    validate: ['required'],
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens']
  }
};
