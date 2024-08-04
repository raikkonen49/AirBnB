document.addEventListener('DOMContentLoaded', function() {
    var editors = document.querySelectorAll('.wysiwyg');
    editors.forEach(function(editor) {
        // Создаем контейнеры для тулбара и редактора
        var toolbarOptions = [
            ['bold', 'italic', 'underline'],        // toggled buttons
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],      // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean']                                         // remove formatting button
        ];

        var quillContainer = document.createElement('div');
        var toolbarContainer = document.createElement('div');
        toolbarContainer.classList.add('quill-toolbar');
        quillContainer.classList.add('quill-container');
        quillContainer.appendChild(toolbarContainer);
        var editorContainer = document.createElement('div');
        quillContainer.appendChild(editorContainer);

        // Вставляем quillContainer перед текстовым полем и скрываем его
        editor.parentNode.insertBefore(quillContainer, editor);
        editor.style.display = 'none';

        // Инициализируем Quill
        var quill = new Quill(editorContainer, {
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow'
        });

        // Обновляем текстовое поле при изменении содержимого Quill
        quill.on('text-change', function() {
            editor.value = quill.root.innerHTML;
        });

        // Заполняем Quill содержимым текстового поля
        quill.root.innerHTML = editor.value;
    });
});
