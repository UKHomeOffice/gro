'use strict';

module.exports = {
  'how-radio': {
    validate: ['required'],
    className: ['block', 'form-group'],
    mixin: 'radio-group',
    options: [{
      value: 'online',
      toggle: 'online-toggle-text',
      child: 'input-text'
    }, {
      value: 'telephone',
      toggle: 'telephone-toggle-text',
      child: `<div id='telephone-toggle-text-panel'>
                <div class='panel-indent'>
                  {{#input-text}}telephone-toggle-text{{/input-text}}
                  {{#input-text}}telephone-toggle-text-2{{/input-text}}
                </div>
              </div>`
    },
    'post'
  ]
  },
  'online-toggle-text': {},
  'telephone-toggle-text': {},
  'telephone-toggle-text-2': {
    validate: ['numeric',
      {'type': 'minlength', 'arguments': [3]},
      {'type': 'maxlength', 'arguments': [7]}]
  }
};
