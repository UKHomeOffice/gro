'use strict';

var _ = require('lodash');

module.exports = {
  '/': {
    controller: require('../common/controllers/start'),
    next: '/about'
  },
  '/about': {
    fields: ['about-radio'],
    next: '/type',
    forks: [{
      target: '/details',
      condition(req) {
        return _.contains(['complaint', 'other'], req.form.values['about-radio']);
      }
    }]
  },
  '/type': {
    fields: ['type-radio'],
    next: '/person',
    forks: [{
      target: '/people',
      condition(req) {
        return _.contains(['marriage', 'partnership'], req.form.values['type-radio']);
      }
    }]
  },
  '/details': {
    fields: [
      'details-text',
      'existing-radio',
      'previous-radio'
    ],
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
    fields: ['person-text'],
    next: '/additional',
    forks: [{
      target: '/how',
      condition(req) {
        return _.contains(req.sessionModel.get('steps'), '/details');
      }
    }]
  },
  '/people': {
    fields: [
      'person-one',
      'person-two'
    ],
    next: '/additional',
    forks: [{
      target: '/how',
      condition(req) {
        return _.contains(req.sessionModel.get('steps'), '/details');
      }
    }]
  },
  '/additional': {
    fields: [
      'additional-text',
      'additional-radio'
    ],
    next: '/how'
  },
  '/how': {
    fields: [
      'how-radio',
      'online-toggle-text',
      'telephone-toggle-text',
      'post-toggle-text',
    ],
    next: '/which'
  },
  '/which': {
    fields: [
      'which-radio'
    ],
    next: '/when'
  },
  '/when': {
    controller: require('./controllers/when'),
    fields: [
      'when-date',
      'when-date-day',
      'when-date-month',
      'when-date-year'
    ],
    next: '/name'
  },
  '/name': {
    fields: ['name-text'],
    next: '/email'
  },
  '/email': {
    fields: ['email-text'],
    next: '/country'
  },
  '/country': {
    fields: [
      'country'
    ],
    forks: [{
      target: '/postcode',
      condition: {
        field: 'country',
        value: 'United Kingdom'
      }
    }],
    continueOnEdit: true,
    next: '/address'
  },
  '/postcode': {
    controller: require('./controllers/postcode'),
    fields: [
      'postcode'
    ],
    forks: [{
      target: '/address-lookup',
      condition(req) {
        const addresses = req.sessionModel.get('addresses');
        return addresses && addresses.length;
      }
    }],
    continueOnEdit: true,
    next: '/address'
  },
  '/address-lookup': {
    controller: require('./controllers/address-lookup'),
    fields: [
      'address-lookup'
    ],
    continueOnEdit: true,
    next: '/confirm'
  },
  '/address': {
    controller: require('./controllers/address'),
    fields: [
      'address-textarea'
    ],
    next: '/confirm'
  },
  '/confirm': {
    controller: require('./controllers/confirm'),
    next: '/confirmation',
    config: require('./confirm-step-config')
  },
  '/confirmation': {
    backLink: false,
    clearSession: true
  }
};
