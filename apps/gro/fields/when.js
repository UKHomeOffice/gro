'use strict';

module.exports = {
  'when-date': {},
  'when-date-day': {
    validate: ['required', 'numeric'],
    includeInEmail: false,
    includeInSummary: false
  },
  'when-date-month': {
    validate: ['required', 'numeric'],
    includeInEmail: false,
    includeInSummary: false
  },
  'when-date-year': {
    validate: ['required', 'numeric'],
    includeInEmail: false,
    includeInSummary: false
  }
};
