'use strict';

const _ = require('lodash');
const hof = require('hof');
const config = require('../../config');
const CountrySelect = require('./behaviours/country-select');
const Summary = hof.components.summary;
const ApplicantEmailer = require('./behaviours/applicant_emailer')(config.email);
const CaseworkerEmailer = require('./behaviours/caseworker_emailer')(config.email);

module.exports = {
  name: 'gro',
  params: '/:action?',
  baseUrl: '/',
  pages: {
    '/accessibility': 'accessibility'
  },
  steps: {
    '/about': {
      fields: ['order-type'],
      locals: {
        section: 'enquiry-details'
      },
      next: '/contact-reason'
    },
    '/contact-reason': {
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
      fields: ['when-date'],
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
      next: '/check-email',
      locals: {
        section: 'contact-details'
      }
    },

    '/check-email': {
      fields: ['confirm-email'],
      forks: [{
        target: '/email-address/',
        condition: {
          field: 'confirm-email',
          value: 'no'
        }
      }],
      continueOnEdit: true,
      next: '/country'
    },


    '/country': {
      behaviours: CountrySelect,
      fields: [
        'country-select'
      ],
      continueOnEdit: true,
      next: '/address-nonuk',
      forks: [{
        target: '/address',
        condition(req) {
          return _.includes(['United Kingdom'], req.form.values['country-select']);
        }
      }],
      locals: {
        section: 'contact-details',
        subsection: 'address'
      }
    },
    '/address': {
      fields: ['building', 'street', 'townOrCity', 'countyOrState', 'postcodeOrZIPCode'],
      next: '/confirm',
      continueOnEdit: true
    },
    '/address-nonuk': {
      fields: ['nonUkAddress'],
      next: '/confirm',
      continueOnEdit: true
    },
    '/confirm': {
      next: '/confirmation',
      behaviours: [Summary, ApplicantEmailer, CaseworkerEmailer],
      sections: require('./sections/summary-data-sections'),
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
    },
    '/session-timeout': {},
    '/exit': {}
  }
};
