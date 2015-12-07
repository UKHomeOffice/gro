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
      'about-radio'
    ],
    backLink: 'start',
    next: '/type'
  },
  '/type': {
    controller: require('./controllers/type'),
    template: 'type',
    fields: [
      'type-radio'
    ],
    backLink: 'about',
    next: '/person'
  },
  '/details': {
    controller: require('./controllers/details'),
    template: 'details',
    fields: [
      'details-text',
      'existing-radio',
      'previous-radio'
    ],
    backLink: 'about',
    next: '/type'
  },
  "/person": {
    controller: require('./controllers/person'),
    template: 'person',
    fields: [
      'person-text'
    ],
    backLink: 'type',
    next: '/how'
  },
  "/people": {
    controller: require('./controllers/people'),
    template: 'people',
    fields: [
      'person-one-text',
      'person-two-text'
    ],
    backLink: 'type',
    next: '/how'
  },
  '/how': {
    controller: require('./controllers/how'),
    template: 'how',
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
