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

/* FUNCIONES GRAMATICA DESCENDENTE DEL XML*/
function analizarDescXML(){ // Utilizar la gramatica descendente para analizar la entrada
    
    var editor = $('.CodeMirror')[0].CodeMirror;
    var entrada = editor.getValue();
    console.log("Texto enviado", entrada);
    var objetos = gdesc.parse(entrada);
    let elementoRaiz = objetos['elemento']; // retorna {"elemento": [elementos] , "errores":[array]}
    let arrErrores = objetos['errores'];
    // Verificar si existen errores 
    console.log("SIUU", elementoRaiz);
    let continuar =  true;
    if(arrErrores.length > 0)
         continuar = erroresParserXml(arrErrores);
    if(!continuar) {
        console.log("No se puede continuar, ya que el XML contiene errores, ver reporte de errores para mayor informacion");
        return null;
    }
    // 2) Construir la tabla de simbolos de la entrada Podemos seguir analizando ya que no hubieron errores
    localStorage.removeItem('terrdescxml');
    const ambitoGlobal = elementoRaiz.getTablaSimbolos(null); // construirTablaSimbolos es funcion recursiva
    console.log(ambitoGlobal);

    return ambitoGlobal;
}

function erroresParserXml(arrErrores){
    let continuar = true;
    let char = '.';
    arrErrores.forEach(element => {
        if(char != element['texto']) // Si hay error y no debe proceguir 
            continuar = false;
    });
    if(!continuar){
        let strHtml = generarTablaErroresHtml(arrErrores); // metodo de js/prod/index.js
        localStorage.setItem('terrdescxml', strHtml);
        
    } 
    return continuar;
}

function analizarAscXML(){

    var editor = $('.CodeMirror')[0].CodeMirror;
    var entrada = editor.getValue();
    console.log("Texto enviado y soy otra funcion", entrada);
    let res = analizadorAsc(entrada); // funcion de js/prod/index.js 
    localStorage.setItem('cst-xml', res['DOTCST']);
    console.log(res['DOTCST']);
}

function getXPath(){
    return document.getElementById("txtQuery").value;
}

function setConsola(texto){
    document.getElementById("txtConsola").value = texto;
}

function getXML(){
    var editor = $('.CodeMirror')[0].CodeMirror;
    var entrada = editor.getValue();
    console.log(entrada);
    return entrada;
}