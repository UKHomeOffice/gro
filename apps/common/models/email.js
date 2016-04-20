'use strict';

const emailService = require('../../../services/email');
const Model = require('hof').Model;
const _ = require('underscore');

class EmailModel extends Model {
  save(callback) {
    // we omit keys that are not part of the session data
    emailService.send({
      template: this.get('template'),
      to: this.get('email'),
      subject: this.get('subject'),
      dataToSend: _.omit(this.toJSON(), ['steps', 'csrf-secret', 'template'])
    }, callback);
  }
}

module.exports = EmailModel;
