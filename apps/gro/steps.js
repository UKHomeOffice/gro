'use strict';

var _ = require('lodash');

module.exports = {
  '/': {
    controller: require('../common/controllers/start'),
    next: '/about'
  },
  '/about': {
    template: 'step',
    fields: ['about-radio'],
    next: '/type',
    forks: [{
      target: '/details',
      condition(req) {
        return _.contains(['complaint', 'other'], req.form.values['about-radio']);
      }
    }],
    locals: {
      section: 'enquiry-details'
    }
  },
  '/type': {
    template: 'step',
    fields: ['type-radio'],
    next: '/person',
    forks: [{
      target: '/people',
      condition(req) {
        return _.contains(['marriage', 'partnership'], req.form.values['type-radio']);
      }
    }],
    locals: {
      section: 'enquiry-details'
    }
  },
  '/details': {
    template: 'step',
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
    }],
    locals: {
      section: 'enquiry-details'
    }
  },
  '/person': {
    template: 'step',
    fields: ['person-text'],
    next: '/additional',
    forks: [{
      target: '/how',
      condition(req) {
        return _.contains(req.sessionModel.get('steps'), '/details');
      }
    }],
    locals: {
      section: 'enquiry-details'
    }
  },
  '/people': {
    template: 'step',
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
    }],
    locals: {
      section: 'enquiry-details'
    }
  },
  '/additional': {
    template: 'step',
    fields: [
      'additional-name',
      'additional-text',
      'additional-radio'
    ],
    next: '/how',
    locals: {
      section: 'enquiry-details'
    }
  },
  '/how': {
    fields: [
      'how-radio',
      'online-toggle-text',
      'telephone-toggle-text',
      'post-toggle-text'
    ],
    next: '/which',
    locals: {
      section: 'order-details'
    }
  },
  '/which': {
    template: 'step',
    fields: [
      'which-radio'
    ],
    next: '/when',
    locals: {
      section: 'order-details'
    }
  },
  '/when': {
    controller: require('./controllers/when'),
    fields: [
      'when-date',
      'when-date-day',
      'when-date-month',
      'when-date-year'
    ],
    next: '/name',
    locals: {
      section: 'order-details'
    }
  },
  '/name': {
    template: 'step',
    fields: ['name-text'],
    next: '/email-address',
    locals: {
      section: 'contact-details'
    }
  },
  '/email-address': {
    template: 'step',
    fields: ['email-text'],
    next: '/country',
    locals: {
      section: 'contact-details'
    }
  },
  '/country': {
    template: 'step',
    fields: [
      'country-select'
    ],
    forks: [{
      target: '/postcode',
      condition: {
        field: 'country-select',
        value: 'United Kingdom'
      }
    }],
    continueOnEdit: true,
    next: '/address',
    locals: {
      section: 'contact-details',
      subsection: 'address'
    }
  },
  '/postcode': {
    template: 'step',
    controller: require('./controllers/postcode'),
    fields: [
      'postcode-code'
    ],
    forks: [{
      target: '/address-lookup',
      condition(req) {
        const addresses = req.sessionModel.get('addresses');
        return addresses && addresses.length;
      }
    }],
    continueOnEdit: true,
    next: '/address',
    locals: {
      section: 'contact-details',
      subsection: 'address'
    }
  },
  '/address-lookup': {
    controller: require('./controllers/address-lookup'),
    fields: [
      'address-lookup'
    ],
    continueOnEdit: true,
    next: '/confirm',
    locals: {
      section: 'contact-details',
      subsection: 'address'
    }
  },
  '/address': {
    controller: require('./controllers/address'),
    fields: [
      'address-textarea'
    ],
    next: '/confirm',
    locals: {
      section: 'contact-details',
      subsection: 'address'
    }
  },
  '/confirm': {
    controller: require('./controllers/confirm'),
    next: '/confirmation',
    config: require('./confirm-step-config'),
    locals: {
      section: 'confirm'
    }
  },
  '/confirmation': {
    backLink: false,
    clearSession: true,
    locals: {
      section: 'confirmation'
    }
  }
};
