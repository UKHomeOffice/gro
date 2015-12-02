'use strict';

module.exports = {
  '/': {
    controller: require('../common/controllers/start'),
    next: '/about'
  },
  '/about': {
    controller: require('./controllers/about'),
    template: 'about',
    fields: [
      'example-radio',
      'example-dob',
      'example-dob-day',
      'example-dob-month',
      'example-dob-year',
      'example-text',
      'example-email'
    ],
    backLink: true,
    next: '/type'
  },
  '/type': {
    controller: require('./controllers/type'),
    template: 'type',
    fields: [
      'yes-no-radio-toggler',
      'example-toggled-text'
    ],
    backLink: true,
    next: '/person'
  },
  "/person": {
    controller: require('./controllers/type'),
    template: 'third-page',
    fields: [
      'yes-no-radio',
      'example-depends-on-text'
    ],
    backLink: true,
    next: '/how'
  },
  '/how': {
    controller: require('./controllers/how'),
    template: 'fourth-page',
    fields: ['multiples-input'],
    next: '/confirm'
  },
  '/confirm': {
    controller: require('./controllers/confirm'),
    template: 'confirm.html',
    next: '/confirmation'
  },
  '/confirmation': {
    template: 'confirmation.html',
    backLink: false,
    clearSession: true
  }
}
;
