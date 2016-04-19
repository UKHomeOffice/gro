'use strict';

module.exports = {
  'address': {
    className: ['address'],
    options: ['16 addresses'].concat(require('../../../assets/countries').allCountries),
    legend: {
      className: 'visuallyhidden',
      value: 'fields.address.label'
    },
    label: 'fields.address.label'
  }
};

