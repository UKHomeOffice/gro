'use strict';

const _ = require('lodash');
const address = require('./behaviours/address');
const addressLookup = require('./behaviours/address-lookup');
const confirm = require('./behaviours/confirm');
const postcode = require('./behaviours/postcode');

module.exports = {
  name: 'gro',
  params: '/:action?',
  pages: {
    '/cookies': 'cookies',
    '/terms-and-conditions': 'terms'
  },
  steps: {
    '/about': {
      fields: ['about-radio'],
      next: '/type',
      forks: [{
        target: '/details',
        condition(req) {
          return _.includes(['complaint', 'other'], req.form.values['about-radio']);
        }
      }],
      locals: {
        section: 'enquiry-details'
      }
    },
    '/type': {
      fields: ['type-radio'],
      next: '/person',
      forks: [{
        target: '/people',
        condition(req) {
          return _.includes(['marriage', 'partnership'], req.form.values['type-radio']);
        }
      }],
      locals: {
        section: 'enquiry-details'
      }
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
      }],
      locals: {
        section: 'enquiry-details'
      }
    },
    '/person': {
      fields: ['person-text'],
      next: '/additional',
      forks: [{
        target: '/how',
        condition(req) {
          return _.includes(req.sessionModel.get('steps'), '/details');
        }
      }],
      locals: {
        section: 'enquiry-details'
      }
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
          return _.includes(req.sessionModel.get('steps'), '/details');
        }
      }],
      locals: {
        section: 'enquiry-details'
      }
    },
    '/additional': {
      fields: [
        'additional-names',
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
        'telephone-toggle-text-2'
      ],
      next: '/which',
      locals: {
        section: 'order-details'
      }
    },
    '/which': {
      fields: [
        'which-radio'
      ],
      next: '/when',
      locals: {
        section: 'order-details'
      }
    },
    '/when': {
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
      fields: ['name-text'],
      next: '/email-address',
      locals: {
        section: 'contact-details'
      }
    },
    '/email-address': {
      fields: ['email-text'],
      next: '/country',
      locals: {
        section: 'contact-details'
      }
    },
    '/country': {
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
      fields: [
        'postcode-code'
      ],
      behaviours: [postcode],
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
      fields: [
        'address-lookup'
      ],
      continueOnEdit: true,
      next: '/confirm',
      behaviours: [addressLookup],
      locals: {
        section: 'contact-details',
        subsection: 'address'
      }
    },
    '/address': {
      fields: [
        'address-textarea'
      ],
      behaviors: [address],
      next: '/confirm',
      locals: {
        section: 'contact-details',
        subsection: 'address'
      }
    },
    '/confirm': {
      next: '/confirmation',
      behaviours: [confirm],
      fieldsConfig: _.cloneDeep(require('./fields')),
      emailConfig: require('../../config').email,
      customerEmailField: 'email-text',
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
  }
};
