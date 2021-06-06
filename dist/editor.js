'use strict';
const btnReset = document.querySelector('#reset');
const inputFile = document.querySelector('#archivoEntrada');
const inputText = document.querySelector('#inputText');
const analyzeText = document.querySelector('#analyzeText');
const areaInfo = document.querySelector('#areaInfo');
const position = document.querySelector('#position');

let codeEditor = ace.edit("textEditor");

let editorLib = {
    init() {
        codeEditor.setValue('');

        //Tema
        codeEditor.setTheme("ace/theme/merbivore");

        //Language
        codeEditor.session.setMode("ace/mode/xml");

        //Options
        codeEditor.setOptions({
            fontFamily: 'Inconsolata',
            fontSize: '12pt',
            printMarginColumn: 100
        });
    }
};

codeEditor.getSession().on('change', () => {
    inputText.innerHTML = codeEditor.getValue();
    analyzeText.innerHTML = codeEditor.getValue();
});

codeEditor.session.selection.on('changeCursor', function(e) {
    const line = codeEditor.getCursorPosition().row;
    const column = codeEditor.getCursorPosition().column;
    position.innerHTML = 'Current position: ' + (line + 1) + ' - ' + (column + 1);
});

btnReset.addEventListener('click', () => {
    codeEditor.setValue('');
    inputFile.value = '';
});

function loadText () {
    codeEditor.setValue(analyzeText.value);
}

function processFile(files) {
    var file = files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
        let texto = e.target.result.toString();
        const codeEditor = ace.edit("textEditor");
        codeEditor.setValue(texto);
    };
}
editorLib.init();
