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
  "/person": {
    controller: require('./controllers/type'),
    template: 'person',
    fields: [
      'person-text'
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
