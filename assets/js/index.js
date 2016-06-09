'use strict';

const toolkit = require('hof').toolkit;
const helpers = toolkit.helpers;
const progressiveReveal = toolkit.progressiveReveal;
const formFocus = toolkit.formFocus;

helpers.documentReady(progressiveReveal);
helpers.documentReady(formFocus);

const $ = require('jquery');
const typeahead = require('typeahead-aria');
const Bloodhound = require('typeahead-aria').Bloodhound;

typeahead.loadjQueryPlugin();

$('.typeahead').each((ind, object) => {
  const $el = $(object);
  const $parent = $el.parent();
  const attributes = $el.prop('attributes');
  const $input = $('<input/>');
  const selectedValue = $el.val();
  const typeaheadList = $el.find('option').map((index, obj) => obj.value === '' ? undefined : obj.value).get();

  // remove the selectbox
  $el.remove();

  $.each(attributes, (index, obj) => $input.attr(obj.name, obj.value));

  $input.removeClass('js-hidden');
  $input.addClass('form-control');
  $input.val(selectedValue);
  $parent.append($input);

  $input.typeahead({
    hint: false
  }, {
    source: new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: typeaheadList,
      sorter(a, b) {
        const input = $input.val();
        function startsWithInput(x) {
          return (x.toLowerCase().substr(0, input.length) === input.toLowerCase()) ? -1 : 1;
        }

        function compareAlpha(x, y) {
          const less = (x < y) ? -1 : 1;
          return (x === y) ? 0 : less;
        }

        function compareStartsWithInput(x, y) {
          const startsWithFirst = startsWithInput(x);
          const startsWithSecond = startsWithInput(y);

          return (startsWithFirst === startsWithSecond) ? 0 : startsWithFirst;
        }

        const first = compareStartsWithInput(a, b);
        return (first === 0) ? compareAlpha(a, b) : first;
      }
    }),
    limit: 100
  });
});
