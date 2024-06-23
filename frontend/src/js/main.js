import $ from 'jquery';

export function initializeScripts() {
  $(document).ready(() => {
    const equalizeHeight = (selector) => {
      const elements = $(selector);
      let maxHeight = 0;

      elements.each(function() {
        const elementHeight = $(this).outerHeight();
        maxHeight = Math.max(maxHeight, elementHeight);
      });

      elements.css('height', maxHeight);
    };

    equalizeHeight('.equalize-me');
    equalizeHeight('.check');
    equalizeHeight('.search-block-item');
  });
}
