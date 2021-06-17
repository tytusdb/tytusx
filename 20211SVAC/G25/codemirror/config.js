
var editor = CodeMirror.fromTextArea(document.getElementById("xml"), {
    mode : "xml",
    theme: "monokai",
    htmlMode: true,
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
    autoRefresh: true
});

var editor1 = CodeMirror.fromTextArea(document.getElementById("query"), {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
    theme: "monokai"
});
var editor2 = CodeMirror.fromTextArea(document.getElementById("salida"), {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
    theme: "monokai"
});


function analizarXML() {
    ejecutarCodigo(editor.getValue())
}

function analizarXPATH() {
    ejecutarXPATH(editor1.getValue())
}

function nuevoXML() {
    editor.setValue("");
}

function nuevoXPATH() {
    editor1.setValue("");
}

function cargarXML() {
    var dataFile = document.getElementById('upload');
    dataFile.addEventListener('change', function() {
        var fr=new FileReader();
        fr.onload=function(){
            editor.setValue(fr.result);
        }
        fr.readAsText(this.files[0]);
    })
}

function cargarXPATH() {
    var dataFile = document.getElementById('upload');
    dataFile.addEventListener('change', function() {
        var fr=new FileReader();
        fr.onload=function(){
            editor1.setValue(fr.result);
        }
        fr.readAsText(this.files[0]);
    })
}

function limpiarXML() {
    editor.setValue("");
}

function limpiarXPATH() {
    editor1.setValue("");
}

function downloadXML() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(editor.getValue()));
    element.setAttribute('download', "xml.xml");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function downloadXPATH() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(editor1.getValue()));
    element.setAttribute('download', "xpath.txt");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function reporteGramaticalXML() {
    var tabla = document.getElementById("tablaXML"); 
    tabla.innerHTML = "";
    tabla.innerHTML = getReporteGramaticalXMLASC();
}

function tablaSimboloXML() {
    var tabla = document.getElementById("tabla_simbolo"); 
    tabla.innerHTML = "";
    tabla.innerHTML = getTablaSimboloXML();
}

function erroresXML() {
    var errores = document.getElementById("errores"); 
    errores.innerHTML = "";
    errores.innerHTML = getReporteErrorXMLASC();
}


