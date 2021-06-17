function cargarArchivoXML() {
    document.getElementById('input').click();
    input.onchange = e => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file, 'UTF-8');

        reader.onload = readerEvent => {
            var content = readerEvent.target.result;
            var editor = $('.CodeMirror')[0].CodeMirror;
            editor.setValue(content);
            editor.refresh();
        }
    }
    input.click();
}

function cargarArchivoXPath() {
    document.getElementById('input').click();
    input.onchange = e => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file, 'UTF-8');

        reader.onload = readerEvent => {
            var content = readerEvent.target.result;
            document.getElementById("txtQuery").value = content;
        }
    }
    input.click();
}

function guardarArchivoXML() {
    var fileName = prompt("Nombre del archivo", "");
    if (fileName == undefined) {
        return;
    }
    var editor = $('.CodeMirror')[0].CodeMirror;
    var text = editor.getValue();
    var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, fileName);
}

function guardarArchivoXPath() {
    var fileName = prompt("Nombre del archivo", "");
    if (fileName == undefined) {
        return;
    }
    var text = document.getElementById("txtQuery").value;
    var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, fileName);
}

function limpiarXML(){
    var editor = $('.CodeMirror')[0].CodeMirror;
    editor.setValue("");
    editor.refresh();
}

function limpiarXPath(){
    document.getElementById("txtQuery").value = "";
}

function analizarXPath(){
    var entrada = document.getElementById("txtQuery").value;
    var cadena = gramatica.parse(entrada);
    return cadena;
}

function analizarXML(){
    var editor = $('.CodeMirror')[0].CodeMirror;
    var entrada = editor.getValue();
    //console.log(entrada);
    var tabla = gramatica1.parse(entrada);
    return tabla;
}

function getXPath(){
    return document.getElementById("txtQuery").value;
}

function getXML(){
    var editor = $('.CodeMirror')[0].CodeMirror;
    var entrada = editor.getValue();
    return entrada;
}

function ejecutar(){
    var tabla = analizarXML();
    var cadena = analizarXPath();
    console.log(tabla);
    console.log(cadena);
}