'use strict';

var _ = require('underscore');

module.exports = {
  '/': {
    controller: require('../common/controllers/start'),
    next: '/about'
  },
  '/about': {
    template: 'about',
    fields: ['about-radio'],
    backLink: 'start',
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
    controller: require('./controllers/type'),
    template: 'type',
    fields: ['type-radio'],
    backLink: 'about',
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
    backLink: 'about',
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
    backLink: 'type',
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
    backLink: 'type',
    next: '/additional',
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
    controller: require('./controllers/how'),
    template: 'how',
    fields: [
      'how-radio',
      'online-toggle-text',
      'telephone-toggle-text',
      'post-toggle-text',
    ],
    continueOnEdit: true,
    backLink: 'additional',
    next: '/which',
    prereqs: ['/person', '/people', 'additional']
  },
  '/which': {
    template: 'which',
    fields: [
      'which-radio',
      'order-number-text'
    ],
    continueOnEdit: true,
    backLink: 'how',
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
    backLink: 'which',
    next: '/name'
  },
  '/name': {
    controller: require('./controllers/name'),
    template: 'name',
    fields: ['name-text'],
    continueOnEdit: true,
    backLink: 'when',
    next: '/email',
    prereqs: ['/when', '/details']
  },
  '/email': {
    template: 'email',
    fields: ['email-text'],
    continueOnEdit: true,
    backLink: 'name',
    next: '/post'
  },
  '/post': {
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
    backLink: 'email',
    next: '/confirm'
  },
  '/confirm': {
    controller: require('./controllers/confirm'),
    template: 'confirm.html',
    backLink: 'post',
    next: '/confirmation'
  },
  '/confirmation': {
    template: 'confirmation.html',
    backLink: false,
    clearSession: true
  }
}
;
