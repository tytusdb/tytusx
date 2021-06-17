"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tipo_js_1 = require("./Simbolo/Tipo.js");
const Entorno_js_1 = require("./Simbolo/Entorno.js");
const Simbolo_js_1 = require("./Simbolo/Simbolo.js");
const GraficarAST_js_1 = require("./Graficador/GraficarAST.js");
const GraficarCST_XML_1 = require("./Graficador/GraficarCST_XML");
const TError_js_1 = require("./Interprete/Util/TError.js");
const CST_XML = require('./Analizadores/CSTXML.js');
const gramaticaXML = require('./Analizadores/gramaticaXML.js');
const gramaticaXMLD = require('./Analizadores/gramaticaXMLDSC.js');
const gramaticaXpath = require('./Analizadores/gramaticaXPath.js');
let ObjetosNode;
var graficador = new GraficarCST_XML_1.GraficarCST_XML();
let resultadoxpath = "";
let contador;
const TError_1 = require("./Interprete/Util/TError");
let ObjetosXML;
let cadenaReporteTS = ` <thead><tr><th scope="col">Nombre</th><th scope="col">Tipo</th><th scope="col">Ambito</th><th scope="col">Fila</th><th scope="col">Columna</th>
                        </tr></thead>`;
let algo;
let cadenaErrores;
let reporteGramatical;
let cadenaReporteGram;
//Esta funcion es para mientras en lo que sincroniza con la pag
ejecutarXML(`
<?xml version="1.0" encoding="UTF-8" ?>

<app>
<biblioteca dir="calle 3>5<5" prop="Sergio's">
    <libro>
        <titulo>Libro A</titulo>
        <autor>&Julio &amp;Tommy&amp; Garcia</autor>
        <fechapublicacion ano="2001" mes="Enero"/>
    </libro>

    <libro>
        <titulo>Libro B</titulo>
        <autor>Autor 2 &amp; Autor 3</autor>
        <descripcion> holi </descripcion>
        <fechapublicacion ano="2002" mes="Febrero"/>
    </libro>

</biblioteca>
<hem>
    <pdf>
        <titulo>Libro 2</titulo>
        <autor>Autor 2 &amp; Autor 3</autor>
        <descripcion> holi </descripcion>
        <fechapublicacion ano="2002" mes="Febrero"/>
    </pdf>
    <libro>
        <titulo>Libro 3</titulo>
        <autor>Autor 2 &amp; Autor 3</autor>
        <descripcion> holi </descripcion>
        <fechapublicacion ano="2002" mes="Febrero"/>
    </libro>
</hem>
</app>
`);
realizarGraficaAST();
//   tablaErroresFicticia()
//accionesEjecutables()
//tablaErroresFicticia()
function ejecutarXML(entrada) {
    TError_1.resetTE(); // Metodo para resetear la tabla de errores
    vaciarTodo();
    cadenaReporteTS = ` <thead><tr><th scope="col">Nombre</th><th scope="col">Tipo</th><th scope="col">Ambito</th><th scope="col">Fila</th><th scope="col">Columna</th>
                        </tr></thead>`;
    //Parseo para obtener la raiz o raices  
    const resultado = gramaticaXML.parse(entrada);
    const objetos = resultado.result;
    reporteGramatical = resultado.reporteGram;
    ObjetosXML = objetos;
    const entornoGlobal = new Entorno_js_1.Entorno(null);
    //funcion recursiva para manejo de entornos
    objetos.forEach((objeto) => {
        if (objeto.identificador1 == "<?xml") {
            //Acciones para el prologo
        }
        else {
            cadenaReporteTS += `<tr>`;
            llenarTablaXML(objeto, entornoGlobal, null);
            cadenaReporteTS += `</tr>`;
        }
    });
    //esta es solo para debug jaja
    const ent = entornoGlobal;
    algo = entornoGlobal;
    // ejecutarXpath("//libro")
    // console.log(cadenaReporteTS)
    return cadenaReporteTS;
}
;
function validarEtiqueta(cadena1, cadena2) {
    if (cadena2 === "") { //si solo es 1 etiqueta de abrir
        return true;
    }
    if (cadena1 === cadena2) { //si vienen las 2 cadenas
        return true;
    }
    else {
        return false;
    }
}
/*

function recorrer(nodo: Objeto){

    if (nodo.texto!=''){
        resultadoxpath+="<"+nodo.identificador1+">"+nodo.texto+"</"+nodo.identificador1+">\n";
    }
    if (nodo.listaObjetos.length != undefined) {
        if (nodo.listaObjetos.length >0) {
            nodo.listaObjetos.forEach((objetoHijo: Objeto) => {
                recorrer(objetoHijo);
            })
         }
    }
    
}
function avanzar(en: Entorno, listac: Array<Acceso>){
    
    let llave: string=""
    
    llave= listac[listac.length-1].valor
    listac.pop()
    
    if(en.existe(llave)){

        let simbolos :Array<Simbolo>=[]
        simbolos.push(en.getSimbolo(llave))

        if(listac.length===0){

            simbolos.forEach((ob: Simbolo) => {

                let nodo=ob.valor
                recorrer(nodo);
            })

        }else{

            simbolos.forEach((ob: Simbolo) => {
                let nodo=ob.valor
                let entornoNodo: Entorno =nodo.entorno
                avanzar(entornoNodo,listac)
            })
        }
    }
    
}
*/
function generarxml(nodo) {
    let result2 = "";
    if (nodo.texto != "") {
        let result = "";
        result = "<" + nodo.identificador1 + ">" + nodo.texto + "</" + nodo.identificador1 + ">\n";
        return result;
    }
    else {
        if (nodo.listaObjetos.length > 0) {
            let result3 = "";
            nodo.listaObjetos.forEach((objetoHijo) => {
                result3 += generarxml(objetoHijo);
            });
            result2 += "<" + nodo.identificador1 + ">\n" + result3 + "</" + nodo.identificador1 + ">\n";
        }
    }
    return result2;
}
;
function recursiva(en, listac) {
    let llave = "";
    llave = listac[listac.length - 1].valor;
    let salida = "";
    let tiposlash = listac[listac.length - 1].tiposlash;
    listac.pop();
    if (tiposlash == "/" || tiposlash == "") {
        if (en.existeEnActual(llave)) {
            let simbolos = [];
            for (let i = 0; i < en.tablita.length; i++) {
                if (en.tablita[i].indentificador == llave) {
                    simbolos.push(en.tablita[i]);
                }
            }
            //console.log(simbolos)
            if (listac.length == 0) {
                simbolos.forEach((ob) => {
                    if (ob != null) {
                        let nodo = ob.valor;
                        salida += generarxml(nodo);
                    }
                });
            }
            else {
                simbolos.forEach((ob) => {
                    if (ob != null) {
                        let nodo = ob.valor;
                        let entornoNodo = nodo.entorno;
                        let listac2 = [];
                        for (let i = 0; i < listac.length; i++) {
                            listac2.push(listac[i]);
                        }
                        salida += recursiva(entornoNodo, listac2);
                    }
                });
            }
        }
    }
    else if (tiposlash == "//") {
        if (en.existeEnActual(llave)) {
            let simbolos = [];
            for (let i = 0; i < en.tablita.length; i++) {
                if (en.tablita[i].indentificador == llave) {
                    simbolos.push(en.tablita[i]);
                }
            }
            if (listac.length == 0) {
                simbolos.forEach((ob) => {
                    if (ob != null) {
                        let nodo = ob.valor;
                        salida += generarxml(nodo);
                    }
                });
            }
            else {
                simbolos.forEach((ob) => {
                    if (ob != null) {
                        let nodo = ob.valor;
                        let entornoNodo = nodo.entorno;
                        let listac2 = [];
                        for (let i = 0; i < listac.length; i++) {
                            listac2.push(listac[i]);
                        }
                        salida += recursiva(entornoNodo, listac2);
                    }
                });
            }
        }
        else {
            let listac2 = [];
            for (let i = 0; i < listac.length; i++) {
                listac2.push(listac[i]);
            }
            salida += recursiva2(en, llave, listac2);
        }
    }
    return salida;
}
;
function recursiva2(en, nombre, listap) {
    let bo = "";
    if (en.existeEnActual(nombre)) {
        let simbolos = [];
        for (let i = 0; i < en.tablita.length; i++) {
            if (en.tablita[i].indentificador == nombre) {
                simbolos.push(en.tablita[i]);
            }
        }
        if (listap.length == 0) {
            simbolos.forEach((ob) => {
                if (ob != null) {
                    let nodo = ob.valor;
                    bo += generarxml(nodo);
                }
            });
        }
        else {
            simbolos.forEach((ob) => {
                if (ob != null) {
                    let nodo = ob.valor;
                    let entornoNodo = nodo.entorno;
                    let listac3 = [];
                    for (let i = 0; i < listap.length; i++) {
                        listac3.push(listap[i]);
                    }
                    bo += recursiva(entornoNodo, listac3);
                }
            });
        }
        return bo;
    }
    else {
        for (let i = 0; i < en.tablita.length; i++) {
            bo += recursiva2(en.tablita[i].valor.entorno, nombre, listap);
        }
        return bo;
    }
}
function ejecutarXpath(entrada) {
    const en = algo;
    const objetos = gramaticaXpath.parse(entrada);
    resultadoxpath = "";
    //console.log(objetos[0][0][0][0][0].Nacceso[0])
    let listac = [];
    for (let i = objetos[0][0][0][0][0].Nacceso.length - 1; i > -1; i--) {
        listac.push(objetos[0][0][0][0][0].Nacceso[i]);
    }
    //console.log(en)
    //console.log(en.tablita[1])
    return recursiva(en, listac);
    /*
    contador=objetos[0][0][0][0][0].length


    for(let ob1 of objetos[0][0][0][0][0]){

        for(let ob2 of ObjetosXML){

            if (ob2.identificador1 == "?XML") {

            }else if(ob1.valor==ob2.identificador1){
                avanzar(ob2,ob1,objetos[0][0][0][0][0],contador)
            }
        }
    }*/
    /*
    objetos[0][0][0][0][0].forEach((objeto1: Acceso ) => {
    
        ObjetosXML.forEach((objeto2: Objeto) => {
            
            if (objeto2.identificador1 == "?XML") {
                
            } else if (objeto1.valor==objeto2.identificador1) {
                //avanzar(objeto2,contador)
            }
            
        })

    })*/
}
;
function ejecutarXML_DSC(entrada) {
    cadenaReporteTS = ` <thead><tr><th scope="col">Nombre</th><th scope="col">Tipo</th><th scope="col">Ambito</th><th scope="col">Fila</th><th scope="col">Columna</th>
                        </tr></thead>`;
    //Parseo para obtener la raiz o raices  
    const resultado = gramaticaXMLD.parse(entrada);
    const objetos = resultado.result;
    const reporteG = resultado.reporteGram;
    ObjetosXML = objetos;
    const entornoGlobal = new Entorno_js_1.Entorno(null);
    //funcion recursiva para manejo de entornos
    objetos.forEach((objeto) => {
        if (objeto.identificador1 == "<?xml") {
            //Acciones para el prologo
        }
        else {
            cadenaReporteTS += `<tr>`;
            llenarTablaXML(objeto, entornoGlobal, null);
            cadenaReporteTS += `</tr>`;
        }
    });
    //esta es solo para debug jaja
    const ent = entornoGlobal;
    algo = entornoGlobal;
    // console.log(cadenaReporteTS)
    console.log(imprimirTablaErrores());
    return cadenaReporteTS;
}
;
function llenarTablaXML(objeto, entorno, padre) {
    if (!validarEtiqueta(objeto.identificador1, objeto.identificador2)) { //verificamos que las etiquetas sean iguales
        new TError_js_1.ESemantico("Semantico", "No coinciden las etiquetas: '" + objeto.identificador1 + "' y '" + objeto.identificador2 + "'", "XML Asc", objeto.linea, objeto.columna);
        return;
    }
    //Inicializamos los entornos del objeto
    const entornoObjeto = new Entorno_js_1.Entorno(null);
    //Verificamos si tiene atributos para asignarselos
    if (objeto.listaAtributos.length > 0) {
        objeto.listaAtributos.forEach((atributo) => {
            //ESto para el llenada
            const simbolo = new Simbolo_js_1.Simbolo(Tipo_js_1.Tipo.ATRIBUTO, atributo.identificador, atributo.linea, atributo.columna, atributo.valor.replace(/['"]+/g, ''), entornoObjeto);
            entornoObjeto.agregar(simbolo.indentificador, simbolo);
            //Esto es para la graficada de la tabla de simbolos
            cadenaReporteTS += `<tr>`;
            cadenaReporteTS += `<td>${simbolo.indentificador}</td><td>Atributo</td><td>${objeto.identificador1}</td><td>${atributo.linea}</td><td>${atributo.columna}</td>`;
            cadenaReporteTS += `<tr>`;
        });
    }
    //Verificamos si tiene texto para agregarselo
    if (objeto.texto != '') {
        const simbolo = new Simbolo_js_1.Simbolo(Tipo_js_1.Tipo.ATRIBUTO, 'textoInterno', objeto.linea, objeto.columna, objeto.texto, entornoObjeto);
        entornoObjeto.agregar(simbolo.indentificador, simbolo);
        //Esto es para la graficada de la tabla de simbolos
        // cadenaReporteTS+=`<td>${objeto.texto}</td><td>Atributo</td><td>${objeto.identificador1}</td><td>${objeto.linea}</td><td>${objeto.columna}</td>`
    }
    //Agregamos al entorno global
    objeto.entorno = entornoObjeto;
    const simbolo = new Simbolo_js_1.Simbolo(Tipo_js_1.Tipo.ETIQUETA, objeto.identificador1, objeto.linea, objeto.columna, objeto, entornoObjeto);
    entorno.agregar(simbolo.indentificador, simbolo);
    //Esto es para la graficada de la tabla de simbolos
    let ambitoTS = "";
    if (padre != null) {
        ambitoTS = padre.identificador1;
    }
    else {
        ambitoTS = "Global";
    }
    cadenaReporteTS += `<tr>`;
    cadenaReporteTS += `<td>${objeto.identificador1}</td><td>Objeto</td><td>${ambitoTS}</td><td>${objeto.linea}</td><td>${objeto.columna}</td>`;
    cadenaReporteTS += `</tr>`;
    //Verificamos si tiene mas hijos para recorrerlos recursivamente
    if (objeto.listaObjetos.length > 0) {
        objeto.listaObjetos.forEach((objetoHijo) => {
            const resultado = objetoHijo;
            llenarTablaXML(objetoHijo, entornoObjeto, objeto);
        });
    }
}
;
function realizarGraficaAST() {
    const graficador = new GraficarAST_js_1.GraficarAST;
    graficador.graficar(ObjetosXML);
}
;
function reporteTablaErrores() {
    let cadenaReporteTE = ` <thead><tr><th scope="col">Tipo</th><th scope="col">Descripcion</th><th scope="col">Archivo</th><th scope="col">Fila</th><th scope="col">Columna</th>
                        </tr></thead>`;
    TError_js_1.errorLex.forEach(element => {
        cadenaReporteTE += `<tr>`;
        cadenaReporteTE += `<td>${element.tipo}</td><td>${element.descripcion}</td><td>${element.analizador}</td><td>${element.linea}</td><td>${element.columna}</td>`;
        cadenaReporteTE += `</tr>`;
    });
    TError_js_1.errorSin.forEach(element => {
        cadenaReporteTE += `<tr>`;
        cadenaReporteTE += `<td>${element.tipo}</td><td>${element.descripcion}</td><td>${element.analizador}</td><td>${element.linea}</td><td>${element.columna}</td>`;
        cadenaReporteTE += `</tr>`;
    });
    TError_js_1.errorSem.forEach(element => {
        cadenaReporteTE += `<tr>`;
        cadenaReporteTE += `<td>${element.tipo}</td><td>${element.descripcion}</td><td>${element.analizador}</td><td>${element.linea}</td><td>${element.columna}</td>`;
        cadenaReporteTE += `</tr>`;
    });
    return cadenaReporteTE;
}
;
function realizarGraficaCST_XML(entrada) {
    ObjetosNode = CST_XML.parse(entrada);
    var cadena = graficador.graficar(ObjetosNode);
    var direccion = encodeURI("https://dreampuf.github.io/GraphvizOnline/#" + cadena);
    window.open(direccion, '_blank');
}
;
function llenarReporteG() {
    let cadena;
    // console.log(reporteGramatical.listaReporte)
    cadena = ` <thead><tr><th scope="col">Produccion</th><th scope="col">Regla Semántica</th>
    </tr></thead>`;
    reporteGramatical.listaReporte.forEach((element) => {
        cadena += `<tr>`;
        cadena += `<td>${element.produccion}</td><td>${element.regla}</td>`;
        cadena += `</tr>`;
    });
    // console.log(cadena)
    return cadena;
}
function imprimirTablaErrores() {
    let cadenaR = ``;
    TError_js_1.errorLex.forEach(element => {
        cadenaR += `Tipo:${element.tipo} Descripcion: ${element.descripcion} Analizador: ${element.analizador} Linea: ${element.linea} Columna: ${element.columna}\n`;
    });
    TError_js_1.errorSin.forEach(element => {
        cadenaR += `Tipo:${element.tipo} Descripcion: ${element.descripcion} Analizador: ${element.analizador} Linea: ${element.linea} Columna: ${element.columna}\n`;
    });
    TError_js_1.errorSem.forEach(element => {
        cadenaR += `Tipo:${element.tipo} Descripcion: ${element.descripcion} Analizador: ${element.analizador} Linea: ${element.linea} Columna: ${element.columna}\n`;
    });
    return cadenaR;
}
;
function vaciarTodo() {
    cadenaReporteTS = '';
}
/*ejecutarXML_DSC(`
<?xml version="1.0" encoding="UTF-8" ?>

<biblioteca dir="calle 3>5<5" prop="Sergio's">
    <libro>
        <titulo>Libro Actual Nèvada</titulo>
        <autor>Julio &amp;Tommy&amp; Garcia</autor>
        <fechaPublicacion ano="2001" mes="Enero"/>
    </libro>

    <libro>
        <titulo>Libro B</titulo>
        <autor>Autor 2 &amp; Autor 3</autor>
        <descripcion> holi </descripcion>
        <fechaPublicacion ano="2002" mes="Febrero"/>
    </libro>

  
</biblioteca>

<hemeroteca dir="zona 21" prop="kev" estado="chilera">
    
</hemeroteca>
`);*/
module.exports = { ejecutarXML, realizarGraficaAST, reporteTablaErrores, ejecutarXpath, realizarGraficaCST_XML, llenarReporteG, ejecutarXML_DSC };
