'use strict';

const DateController = require('hof').controllers.date;

module.exports = class WhenController extends DateController {

  constructor(options) {
    super(options);
    this.dateKey = 'when-date';
  }

};
