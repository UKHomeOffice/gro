'use strict';

module.exports = superclass => class WhenController extends superclass {

  constructor(options) {
    super(options);
    this.dateKey = 'when-date';
  }

};
