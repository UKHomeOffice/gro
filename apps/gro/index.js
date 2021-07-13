'use strict';

const _ = require('lodash');
const hof = require('hof');
const config = require('../../config')
const Address = require('./behaviours/address');
const AddressLookup = require('./behaviours/address-lookup');
const Postcode = require('./behaviours/postcode');
const Confirm = require('./behaviours/confirm');
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
      behaviours: Postcode,
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
      behaviours: AddressLookup,
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
      behaviours: Address,
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
      next: '/confirmation',
      behaviours: [Confirm, Summary, ApplicantEmailer, CaseworkerEmailer],
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
