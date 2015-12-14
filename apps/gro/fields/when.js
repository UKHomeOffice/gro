'use strict';

module.exports = {
  'when-date': {
    legend: 'fields.when-date.legend',
    hint: 'fields.when-date.hint'
  },
  'when-date-day': {
    validate: ['required', 'numeric'],
    label: 'fields.when-date-day.label'
  },
  'when-date-month': {
    validate: ['required', 'numeric'],
    label: 'fields.when-date-month.label'
  },
  'when-date-year': {
    validate: ['required', 'numeric'],
    label: 'fields.when-date-year.label'
  }
};
