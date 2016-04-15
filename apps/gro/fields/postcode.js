'use strict';

module.exports = {
  'postcode-code': {
    mixin: 'input-text-code',
    validate: ['required', 'postcode'],
    formatter: 'uppercase'
  }
};
