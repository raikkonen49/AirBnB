import $ from 'jquery';
export function initializeScripts() {
$(document).ready(function() {
    function equalizeHeight(selector) {
        // Получаем все элементы по заданному селектору
        var elements = $(selector);

        // Находим максимальную высоту среди всех элементов
        var maxHeight = 0;
        elements.each(function() {
            var elementHeight = $(this).outerHeight();
            if (elementHeight > maxHeight) {
                maxHeight = elementHeight;
            }
        });

        // Устанавливаем максимальную высоту для всех элементов
        elements.css('height', maxHeight);
    }

    // Вызов функции для разных классов
    equalizeHeight('.equalize-me');
    equalizeHeight('.check');
    equalizeHeight('.search-block-item');
});

}
