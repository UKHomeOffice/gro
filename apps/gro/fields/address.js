'use strict';

module.exports = {
  'address-textarea': {
    validate: ['required',
      {'type': 'regex', 'arguments': [/^[a-zA-Z0-9\s,-]*$/]}],
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens']
  }
};
