var parserXMLA = require('./src/XML.js').parser;
var parserXMLD = require('./src/xmldes.js').parser;

var parserXPathA = require('./src/indexXPath');

var dibujarXpath = require('./arbolASTXpath');
var dibujarXmlCST = require('./arbolCSTxml');
var tablaSimbolos = require('./tablaSimbolos');

var optimizador = require('./optimizador');
var tblOptm = require('./tablaoptm');

var toencoding = require('./encodingTransform');
// nuevo fase 3
var parserXquery = require('./Interprete/index');
var parseXML = require('./Interprete/analizadorXML/grammar');
var salidaXquery = require('./sxquery');
var errores = require('./erroes/eprueba');
var tablaxq = require('./simbolosxq');
var generador = require('./Interprete/index3d');
//var nuevoParser = require('./adaptacion/analizadorXPath/index');

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


// mas de la fase 3
hacerConsulta = () => {
    let textoQuery = document.getElementById('xqResult').value;
    let textoXML = document.getElementById('taCS').value;

    let xml = parseXML.parse(textoXML);

    let salidaXQuery = parserXquery.execXQ(xml.datos, textoQuery);

    salidaXquery.cambiarSalidaXQuery(salidaXQuery);

    //console.log(tablaxq.tablaxq);
    console.log("hola");
    
    if(errores.errores.length > 0) {
        console.log(errores.errores);
        limpiarTabla('errxqTabla');
        llenarTablaErroresXQ(errores.errores);
        errores.errores = [];
    }

    limpiarTabla('simxqTabla');
    tsimbolosXQuery(tablaxq.tablaxq);
    //let textoXML = document.getElementById('taCS').value;
    //probar(textoXML,textoQuery);
    //execXpatASC(textoQuery);
}

generar3D = () => {
    let textoXML = document.getElementById('taCS').value;
    let textoXpath = document.getElementById('xpathInp').value;

    let getGenerador = generador.exec(textoXML, textoXpath);

    document.getElementById('c3dCS').value = getGenerador.codigo;
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
        if(tipoSalida == 'utf8'){
            document.getElementById('taResult').value = toencoding.toUtf8(objetoXpathAsc);
        } else if(tipoSalida == 'latin1') {
            document.getElementById('taResult').value = toencoding.toLatin1(objetoXpathAsc);
        } else if(tipoSalida == 'ascii') {
            document.getElementById('taResult').value = toencoding.toAscii(objetoXpathAsc);
        } else {
            document.getElementById('taResult').value = objetoXpathAsc;
        }
    } else {
        document.getElementById('taResult').value = 'no se encontraron elementos';
    }
    

    variablePath = parserXPathA.aJson();
    //console.log(variablePath);
    dibujarXpath.graficarAst(variablePath);
}

function execXpatDES(input) {
    objetoXpathAsc = parserXPathA.execDescendente(input, objetoXml[0]);

    if(objetoXpathAsc != '') {
        if(tipoSalida == 'utf8'){
            document.getElementById('taResult').value = toencoding.toUtf8(objetoXpathAsc);
        } else if(tipoSalida == 'latin1') {
            document.getElementById('taResult').value = toencoding.toLatin1(objetoXpathAsc);
        } else if(tipoSalida == 'ascii') {
            document.getElementById('taResult').value = toencoding.toAscii(objetoXpathAsc);
        } else {
            document.getElementById('taResult').value = objetoXpathAsc;
        }
    } else {
        document.getElementById('taResult').value = 'no se encontraron elementos';
    }
    

    variablePath = parserXPathA.aJson();
    //console.log(variablePath);
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

cambiar = () => {
    let textoXQuery = document.getElementById('c3dCS').value;

    optimizar(textoXQuery);
}

function optimizar(entrada) {
    let optmGet = optimizador.optm(entrada);

    document.getElementById('c3dCS').value = optmGet[0];

    console.log(optmGet[1]);

    limpiarTabla('optmTabla');
    llenatTableOptmHola(optmGet[1]);
}

function llenatTableOptmHola(arrOptm) {
    let tbodyRef = document.getElementById('optmTabla').getElementsByTagName('tbody')[0];

    let rows = '';
    let contador = 1;

    arrOptm.forEach(element => {
        let newRow = tbodyRef.insertRow(tbodyRef.rows.length);

        rows = `<tr>
                    <td>${ contador }</td>
                    <td>${ element.linea }</td>
                    <td>${ element.regla }</td>
                    <td>${ element.eliminado }</td>
                    <td>${ element.agregado }</td>
                </tr>`;

        newRow.innerHTML = rows;
        contador++;
    });
}

function llenarTablaErroresXQ(arrOptm) {
    let tbodyRef = document.getElementById('errxqTabla').getElementsByTagName('tbody')[0];

    let rows = '';
    let contador = 1;

    arrOptm.forEach(element => {
        let newRow = tbodyRef.insertRow(tbodyRef.rows.length);

        rows = `<tr>
                    <td>${ contador }</td>
                    <td>${ element.linea }</td>
                    <td>${ element.columna }</td>
                    <td>${ element.err }</td>
                    <td>${ element.tipo }</td>
                </tr>`;

        newRow.innerHTML = rows;
        contador++;
    });
}

function tsimbolosXQuery(tabla) {
    let buscarTipo = ["entero", "caracter", "booleano", "doble", "cadena", "error", "tvoid", "nulo", "XPath", "sequence", "defecto", "funcion"];

    let tbodyRef = document.getElementById('simxqTabla').getElementsByTagName('tbody')[0];

    let rows = '';
    
    let contador = 1;
    let nuevaTabla = tabla.entries();
    let nuevaTabla1 = tabla.entries();
    let nuevaTabla2 = tabla.entries();
    nuevaTabla.next().value;
    nuevaTabla1.next().value;
    nuevaTabla2.next().value;
    for(let i = 0; i < tabla.size; i++) {
        //console.log(nuevaTabla.next().value[0]);
        //console.log(nuevaTabla.next().value[1].tipo.tipo);

        let newRow = tbodyRef.insertRow(tbodyRef.rows.length);

        rows = `<tr>
                    <td>${ contador }</td>
                    <td>${ nuevaTabla.next().value[0] }</td>
                    <td>${ buscarTipo[nuevaTabla1.next().value[1].tipo.tipo] }</td>
                    <td>${ nuevaTabla2.next().value[1].valor }</td>
                </tr>`;

        newRow.innerHTML = rows;
        
        contador++;
    }
}