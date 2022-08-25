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
        target: '/person-one',
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
    '/person-one': {
      fields: [
        'person-one'
      ],
      next: '/person-two',
      locals: {
        section: 'enquiry-details'
      }
    },
    '/person-two': {
      fields: [
        'person-two'
      ],
      forks: [{
        target: '/how',
        condition(req) {
          return _.includes(req.sessionModel.get('steps'), '/details');
        }
      }],
      next: '/additional',
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
      next: '/country',
      locals: {
        section: 'contact-details'
      }
    },
    '/country': {
      behaviours: CountrySelect,
      fields: [
        'country-select'
      ],
      continueOnEdit: true,
      next: '/address',
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
    }
  }
};
