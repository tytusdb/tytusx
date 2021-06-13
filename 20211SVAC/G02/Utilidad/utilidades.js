
var EDITOR_XML = "editorXML";
var EDITOR_XPATH = "editorXPath";
var EDITOR_CONSOLA = "editorConsola";

var editorXML = CodeMirror.fromTextArea(document.getElementById(EDITOR_XML), {
    lineNumbers: true,
    firstLineNumber: 1,
    dragDrop: true
});
var editorXPath = CodeMirror.fromTextArea(document.getElementById(EDITOR_XPATH), {
    lineNumbers: true,
    firstLineNumber: 1,
    dragDrop: true
});

var editorConsola = CodeMirror.fromTextArea(document.getElementById(EDITOR_CONSOLA), {
    lineNumbers: true,
    firstLineNumber: 1
});

$(document).ready(function () {
    editorXML.setSize(600, 400);
    editorXPath.setSize(600, 400);
    editorConsola.setSize(1200, 400);
})

function limpiarEditor(tipo) {
    if (tipo === EDITOR_XML) {
        editorXML.setValue("");
        editorXML.clearHistory();
    } else if (tipo === EDITOR_XPATH) {
        editorXPath.setValue("");
        editorXPath.clearHistory();
    } else if (tipo === EDITOR_CONSOLA) {
        editorConsola.setValue("");
        editorConsola.clearHistory();
    }

}

function guardarArchivo(tipo) {
    var extension;
    var editorElegido;
    if (tipo === EDITOR_XML) {
        extension = "xml";
        editorElegido = editorXML;
    } else if (tipo === EDITOR_XPATH) {
        extension = "xpath";
        editorElegido = editorXPath;
    }

    var textToWrite = editorElegido.getValue();
    var textToWrite = textToWrite.replace(/\n/g, "\r\n");

    var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
    var fileNameToSaveAs = tipo + "." + extension;

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "LINKTITLE";

    window.URL = window.URL || window.webkitURL;

    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);

    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}

function analizar(){
    var instruccionesXML = gramaticaXML.parse(editorXML.getValue());
    var instruccionesXPath = gramaticaXPath.parse(editorXPath.getValue());

    procesarProyecto(instruccionesXML, instruccionesXPath);
    agregarErroresXMLConsola(erroresXML);
    editorConsola.setValue(consola);
}