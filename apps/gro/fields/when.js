'use strict';

module.exports = {
  'when-date': {},
  'when-date-day': {
    validate: ['required', 'numeric'],
    includeInEmail: false
  },
  'when-date-month': {
    validate: ['required', 'numeric'],
    includeInEmail: false
  },
  'when-date-year': {
    validate: ['required', 'numeric'],
    includeInEmail: false
  }
};
