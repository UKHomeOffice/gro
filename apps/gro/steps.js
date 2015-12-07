'use strict';

module.exports = {
  '/': {
    controller: require('../common/controllers/start'),
    next: '/about'
  },
  '/about': {
    controller: require('./controllers/about'),
    template: 'about',
    fields: ['about-radio'],
    backLink: 'start',
    next: '/type'
  },
  '/type': {
    controller: require('./controllers/type'),
    template: 'type',
    fields: ['type-radio'],
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
    fields: ['person-text'],
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
    fields: ['how-radio'],
    backLink: 'person',
    next: '/which'
  },
  '/which': {
    controller: require('./controllers/which'),
    template: 'which',
    fields: [
      'which-radio',
      'order-number-text'
    ],
    backLink: 'how',
    next: '/when'
  },
  '/when': {
    controller: require('./controllers/when'),
    template: 'when',
    fields: [
      'when-date',
      'when-day',
      'when-month',
      'when-year'
    ],
    backLink: 'which',
    next: '/name'
  },
    '/name': {
    controller: require('./controllers/name'),
    template: 'name',
    fields: ['name-text'],
    backLink: 'when',
    next: '/email'
  },
  '/email': {
    controller: require('./controllers/email'),
    template: 'email',
    fields: ['email-text'],
    backLink: 'name',
    next: '/post'
  },
  '/post': {
    controller: require('./controllers/post'),
    template: 'post',
    fields: [
      'country-text',
      'address-text-one',
      'address-text-two',
      'address-text-three',
      'address-text-four',
      'address-text-five',
    ],
    backLink: 'email',
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
