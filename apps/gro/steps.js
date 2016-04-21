'use strict';

var _ = require('lodash');

module.exports = {
  '/': {
    controller: require('../common/controllers/start'),
    next: '/country'
  },
  '/country': {
    fields: [
      'country'
    ],
    forks: [{
      target: '/post-outside',
      condition: function checkIfUK(req) {
        return req.form.values.country !== 'United Kingdom';
      }
    }],
    next: '/postcode'
  },
  '/postcode': {
    template: 'postcode',
    fields: [
      'postcode'
    ],
    forks: [{
      target: '/post-inside',
      condition: function checkNI(req) {
        return _.startsWith(req.form.values.postcode, 'BT');
      }
    }],
    next: '/address'
  },
  '/address': {
    controller: require('./controllers/address'),
    template: 'address',
    fields: [
      'address',
      'address-found-message'
    ],
    next: '/about'
  },
  '/post-outside': {
    fields: [
      'address-text-one',
      'address-text-two',
      'address-text-three',
      'address-text-four',
      'address-text-five'
    ],
    next: '/about',
    backLinks: ['/country']
  },
  '/post-inside': {
    fields: [
      'address-text-one',
      'address-text-two',
      'address-text-three',
      'address-text-four',
      'town'
    ],
    next: '/about',
    backLinks: ['address']
  },

  '/about': {
    template: 'about',
    fields: ['about-radio'],
    next: '/type',
    continueOnEdit: true,
    forks: [{
      target: '/details',
      condition: function checkComplaintOther(req) {
        return _.contains(['complaint', 'other'], req.form.values['about-radio']);
      }
    }]
  },
  '/type': {
    template: 'type',
    fields: ['type-radio'],
    next: '/person',
    prereqs: ['/about', '/details'],
    continueOnEdit: true,
    forks: [{
      target: '/people',
      condition: function checkMarriagePartnership(req) {
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
    backLinks: ['about'],
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
      condition: function checkSteps(req) {
        return _.contains(req.sessionModel.get('steps'), '/details') && req.params.action !== 'edit';
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
    backLinks: ['type'],
    continueOnEdit: true,
    forks: [{
      target: '/how',
      condition: function checkSteps(req) {
        return _.contains(req.sessionModel.get('steps'), '/details') && req.params.action !== 'edit';
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
    continueOnEdit: true,
    prereqs: ['/person', '/people']
  },
  '/how': {
    template: 'how',
    fields: [
      'how-radio',
      'online-toggle-text',
      'telephone-toggle-text',
      'post-toggle-text'
    ],
    continueOnEdit: true,
    next: '/which',
    backLinks: ['person', 'people'],
    prereqs: ['/person', '/people', 'additional']
  },
  '/which': {
    template: 'which',
    fields: [
      'which-radio',
      'order-number-text'
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
    next: '/email',
    backLinks: ['details'],
    prereqs: ['/when', '/details']
  },
  '/email': {
    template: 'email',
    fields: ['email-text'],
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
}
;
