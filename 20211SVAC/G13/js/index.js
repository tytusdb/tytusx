var parserXMLA = require('./src/XML.js').parser;
var parserXMLD = require('./src/xmldes.js').parser;

var parserXPathA = require('./src/indexXPath');
var parserXPathD = require('./src/XPathDesc').parser;

var dibujarXpath = require('./arbolASTXpath');
var dibujarXmlCST = require('./arbolCSTxml');
var tablaSimbolos = require('./tablaSimbolos');

let tipoSalida = '';
let objetoXml;

let objetoXpathAsc;
let objetoXpathDes;

let variablePath;

cargarArchivo = () => {
    let archivos = document.getElementById("customFile").files;

    let archivo = archivos[0];

    let reader = new FileReader();

    reader.onload = function(e) {
        let arc = e.target.result
        document.getElementById("taCS").value = archivoABox(arc);
        
    }
    reader.readAsText(archivo)

} 

function archivoABox(entrada) {
    let limpio = [];

    for(let i = 0; i < entrada.length; i++) {
        limpio.push(entrada.charAt(i));
    }
    
    return limpio.join("");
}

parseXMLASC = () => {
    execXMLASC(document.getElementById('taCS').value);
}

parseXMLDES = () => {
    execXMLDES(document.getElementById('taCS').value);
}

hacerConsulta = () => {
    let textoQuery = document.getElementById('taQuery').value;
    execXpatASC(textoQuery);
    console.log(textoQuery);
}

function execXMLASC (input) {
    objetoXml = parserXMLA.parse(input);

    tipoSalida = objetoXml[4];

    limpiarTabla('gramTabla');
    tablaGramaticaXml(objetoXml[2]);
    
    limpiarTabla('simbolosXml');
    simbolosXml(objetoXml[0]);

    dibujarXmlCST.graficarCst(objetoXml[1]);
    
    if(objetoXml[3].length > 0) {
        limpiarTabla('erroresXml');
        erroresXml(objetoXml[3]);
    } 
    
    return; 
}

function execXMLDES (input) {
    objetoXml = parserXMLD.parse(input);

    tipoSalida = objetoXml[4];
    
    limpiarTabla('gramTabla');
    tablaGramaticaXml(objetoXml[2]);

    limpiarTabla('simbolosXml');
    simbolosXml(objetoXml[0]);

    dibujarXmlCST.graficarCst(objetoXml[1]);

    if(objetoXml[3].length > 0) {
        limpiarTabla('erroresXml');
        erroresXml(objetoXml[3]);
    } 

    return;
}

function execXpatASC(input) {
    objetoXpathAsc = parserXPathA.execAscendente(input, objetoXml[0]);

    if(objetoXpathAsc != '') {
        document.getElementById('taResult').value = objetoXpathAsc;
    } else {
        document.getElementById('taResult').value = 'no se encontraron elementos';
    }
    

    variablePath = parserXPathA.aJson();
    console.log(variablePath);
    dibujarXpath.graficarAst(variablePath);
}

// llenar tabla de gramatica
function tablaGramaticaXml(tabla) {
    let tbodyRef = document.getElementById('gramTabla').getElementsByTagName('tbody')[0];

    let rows = '';
    let contador = 1;

    tabla.forEach(element => {
        let newRow = tbodyRef.insertRow(tbodyRef.rows.length);

        rows = `<tr>
                    <td>${ contador }</td>
                    <td>${ element.produccion }</td>
                    <td>${ element.accion }</td>
                </tr>`;

        newRow.innerHTML = rows;
        contador++;
    });
}
// tabla errores
function erroresXml(errores) {
    let tbodyRef = document.getElementById('erroresXml').getElementsByTagName('tbody')[0];

    let rows = '';
    let contador = 1;

    errores.forEach(element => {
        let newRow = tbodyRef.insertRow(tbodyRef.rows.length);

        rows = `<tr>
                    <td>${ contador }</td>
                    <td>${ element.contenido }</td>
                    <td>${ element.mensaje }</td>
                    <td>${ element.tipo }</td>
                    <td>${ element.linea }</td>
                    <td>${ element.columna }</td>
                </tr>`;

        newRow.innerHTML = rows;
        contador++;
    });
}

function simbolosXml(simbolos) {
    let arrSimbolos = tablaSimbolos.hacerTablaSimbolos(simbolos);

    let tbodyRef = document.getElementById('simbolosXml').getElementsByTagName('tbody')[0];

    let rows = '';
    let contador = 1;

    arrSimbolos.forEach(element => {
        let newRow = tbodyRef.insertRow(tbodyRef.rows.length);

        rows = `<tr>
                    <td>${ contador }</td>
                    <td>${ element.nombre }</td>
                    <td>${ element.tipo }</td>
                    <td>${ element.ambito }</td>
                    <td>${ element.linea }</td>
                    <td>${ element.columna }</td>
                </tr>`;

        newRow.innerHTML = rows;
        contador++;
    });
}

function limpiarTabla(nombreTabla) {
    let tableHeaderRowCount = 1;
    let table = document.getElementById(nombreTabla);
    let rowCount = table.rows.length; 

    for(let i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
}