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
      condition: function checkComplaintOther(req) {
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
      condition: function checkSteps(req) {
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
      target: '/address-outside',
      condition: function checkIfUK(req) {
        return req.form.values.country !== 'United Kingdom';
      }
    }],
    continueOnEdit: true,
    next: '/postcode'
  },
  '/postcode': {
    template: 'postcode',
    fields: [
      'postcode'
    ],
    forks: [{
      target: '/address-inside',
      condition: function checkNI(req) {
        return _.startsWith(req.form.values.postcode, 'BT');
      }
    }],
    continueOnEdit: true,
    next: '/address-start'
  },
  '/address-start': {
    controller: require('./controllers/address-start'),
    fields: [
      'address-found'
    ],
    forks: [{
      target: '/no-postcode',
      condition: function hasPostcode(req) {
        return !(req.sessionModel.get('postcode-found'));
      }
    }],
    continueOnEdit: true,
    next: '/address'

  },
  '/address': {
    controller: require('./controllers/address'),
    template: 'address',
    fields: [
      'address'
    ],
    continueOnEdit: true,
    next: '/confirm'

  },
  '/no-postcode': {
    template: 'no-postcode',
    fields: [
      'address',
      'postcode-error'
    ],
    continueOnEdit: true,
    next: '/confirm'
  },
  '/address-outside': {
    fields: [
      'address-text-one',
      'address-text-two',
      'address-text-three',
      'address-text-four',
      'address-text-five'
    ],
    continueOnEdit: true,
    next: '/confirm',
    backLinks: ['/country']
  },
  '/address-inside': {
    fields: [
      'address-text-one',
      'address-text-two',
      'address-text-three',
      'address-text-four',
      'town'
    ],
    continueOnEdit: true,
    next: '/confirm',
    backLinks: ['address']
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
