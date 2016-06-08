'use strict';

var _ = require('lodash');

module.exports = {
  '/': {
    controller: require('../common/controllers/start'),
    next: '/about'
  },
  '/about': {
    template: 'about',
    fields: ['about-radio'],
    next: '/type',
    continueOnEdit: true,
    forks: [{
      target: '/details',
      condition(req) {
        return _.contains(['complaint', 'other'], req.form.values['about-radio']);
      }
    }]
  },
  '/type': {
    template: 'type',
    fields: ['type-radio'],
    next: '/person',
    continueOnEdit: true,
    forks: [{
      target: '/people',
      condition(req) {
        return _.contains(['marriage', 'partnership'], req.form.values['type-radio']);
      }
    }]
  },
  '/details': {
    template: 'details',
    fields: [
      'details-text',
      'existing-radio',
      'previous-radio'
    ],
    next: '/type',
    continueOnEdit: true,
    forks: [{
      target: '/name',
      condition: {
        field: 'existing-radio',
        value: 'no'
      }
    }]
  },
  '/person': {
    template: 'person',
    fields: ['person-text'],
    next: '/additional',
    continueOnEdit: true,
    forks: [{
      target: '/how',
      condition(req) {
        return _.contains(req.sessionModel.get('steps'), '/details');
      }
    }]
  },
  '/people': {
    template: 'people',
    fields: [
      'person-one',
      'person-two'
    ],
    next: '/additional',
    continueOnEdit: true,
    forks: [{
      target: '/how',
      condition(req) {
        return _.contains(req.sessionModel.get('steps'), '/details');
      }
    }]
  },
  '/additional': {
    template: 'additional',
    fields: [
      'additional-text',
      'additional-radio'
    ],
    next: '/how',
    continueOnEdit: true
  },
  '/how': {
    template: 'how',
    fields: [
      'how-radio',
      'online-toggle-text',
      'telephone-toggle-text',
      'post-toggle-text',
    ],
    continueOnEdit: true,
    next: '/which'
  },
  '/which': {
    template: 'which',
    fields: [
      'which-radio'
    ],
    continueOnEdit: true,
    next: '/when'
  },
  '/when': {
    controller: require('./controllers/when'),
    template: 'when',
    fields: [
      'when-date',
      'when-date-day',
      'when-date-month',
      'when-date-year'
    ],
    continueOnEdit: true,
    next: '/name'
  },
  '/name': {
    template: 'name',
    fields: ['name-text'],
    continueOnEdit: true,
    next: '/email'
  },
  '/email': {
    template: 'email',
    fields: ['email-text'],
    continueOnEdit: true,
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
    continueOnEdit: true,
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
};
