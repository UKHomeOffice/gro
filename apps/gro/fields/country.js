'use strict';

module.exports = {
  country: {
    className: ['typeahead', 'js-hidden'],
    options: [''].concat(require('../../../assets/countries').allCountries),
    legend: {
      className: 'visuallyhidden'
    },
    validate: ['required']
  }
};
