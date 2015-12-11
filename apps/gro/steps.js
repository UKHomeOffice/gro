'use strict';

var _ = require('underscore');

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
    next: '/type',
    forks: [{
      target: '/details',
      condition: function (req) {
        return _.contains(['complaint', 'other'], req.form.values['about-radio']);
      }
    }]
  },
  '/type': {
    controller: require('./controllers/type'),
    template: 'type',
    fields: ['type-radio'],
    backLink: 'about',
    next: '/person',
    prereqs: ['/about', '/details'],
    forks: [{
      target: '/people',
      condition: function (req) {
        return _.contains(['marriage', 'partnership'], req.form.values['type-radio']);
      }
    }]
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
    next: '/type',
    forks: [{
      target: '/name',
      condition: {
        field: 'existing-radio',
        value: 'no'
      }
    }]
  },
  '/person': {
    controller: require('./controllers/person'),
    template: 'person',
    fields: ['person-text'],
    backLink: 'type',
    next: '/how'
  },
  '/people': {
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
    fields: [
      'how-radio',
      'online-toggle-text',
      'telephone-toggle-text',
      'post-toggle-text'
    ],
    backLink: 'person',
    next: '/which',
    prereqs: ['/person', '/people']
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
    next: '/email',
    prereqs: ['/when', '/details']
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
      'address-text-five'
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
