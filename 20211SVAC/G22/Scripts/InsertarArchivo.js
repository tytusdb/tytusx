var nombreEntrada ='';
var textA = document.getElementById("editor");
var editor = CodeMirror.fromTextArea(textA, {
  lineNumbers: true,
mode: "text/html",
matchBrackets: true
});


var contenidoGeneral ;

var inputElement = document.getElementById("abrir");
inputElement.addEventListener("change", leerArchivo, false);

function ingresarTexto(item) {
    contenido = document.getElementById(item).firstChild.value;
    //console.log(contenido + '88')
}


function leerArchivo(e) {
    
    var archivo = e.target.files[0];
    nombreEntrada = e.target.files[0].name;
    console.log( nombreEntrada)
    if (!archivo) {
      return;
    }
    var lector = new FileReader();
    lector.onload = function(e) {
      var contenido = e.target.result;
      mostrarContenido(contenido);
      contenidoGeneral = contenido;
      console.log(contenido);
    };
    lector.readAsText(archivo);
};

function mostrarContenido(contenido){
    editor.setValue(contenido);
}


function limpiar() {
  editor.setValue('');
  nombreEntrada = null;
  document.getElementById("abrir").value = '';

}


var num = 0;
function guardarEntrada() {
  console.log(editor.getValue());
  var text = editor.getValue();
  if (nombreEntrada != null) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', nombreEntrada);

    if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
    }
    else {
      pom.click();
    }
  } 
}

function guardarResultado() {
  var nombreRes= 'Resultado Consulta = '+num+".txt";
  var text = document.getElementById('resultado').value;
  if (nombreRes != null) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', nombreRes);

    if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
    }
    else {
      pom.click();
    }
  } 
}



