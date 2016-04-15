'use strict';

module.exports = {
  'country-select': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [''].concat(require('../../../assets/countries').allCountries),
    legend: {
      className: 'visuallyhidden'
    },
    validate: ['required']
  }
};
