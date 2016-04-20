'use strict';

const controllers = require('hof').controllers;
const DateController = controllers.date;

class WhenController extends DateController {
  constructor(options) {
    super(options);
    this.dateKey = 'when-date';
  }
}

module.exports = WhenController;
