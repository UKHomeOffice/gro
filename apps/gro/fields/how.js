'use strict';

module.exports = {
  'how-radio': {
    validate: ['required'],
    className: ['block', 'form-group'],
    options: [{
      value: 'online',
      label: 'fields.how-radio.options.online.label',
      toggle: 'online-toggle-text',
      child: 'input-text'
    }, {
      value: 'telephone',
      label: 'fields.how-radio.options.telephone.label',
      toggle: 'telephone-toggle-text',
      child: `<div id='telephone-toggle-text-panel'>
                <div class='panel-indent'>
                  {{#input-text}}telephone-toggle-text{{/input-text}}
                  {{#input-text}}telephone-toggle-text-2{{/input-text}}
                </div>
              </div>`
    }, {
      value: 'post',
      label: 'fields.how-radio.options.post.label'
    }]
  },
  'online-toggle-text': {},
  'telephone-toggle-text': {},
  'telephone-toggle-text-2': {
    validate: ['numeric',
      {'type': 'minlength', 'arguments': [3]},
      {'type': 'maxlength', 'arguments': [7]}]
  }
};
