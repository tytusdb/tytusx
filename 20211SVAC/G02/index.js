"use strict";
var consola = "";
var entornoGlobal;
var erroresXML = [];
var erroresXPath = [];
var reglasGramaticalesXML;
var reglasGramaticalesXPath;
var instruccionesXML;
var instruccionesXPath;
function procesarProyecto(instruccionesXML, instruccionesXPath) {
    consola = "Iniciando analisis";
    entornoGlobal = new Entorno(null);
    ejecutarXML(instruccionesXML);
    ejecutarXPath(instruccionesXPath);
    return consola;
}
function ejecutarXML(instrucciones) {
    agregarLinea("Analizando XML");
    const ast = new AST(instrucciones);
    const objetos = instrucciones;
    objetos.forEach((element) => {
        entornoGlobal.registrarObjetoEnTS(element, entornoGlobal);
    });
    agregarLinea("Finaliza analisis XML");
    var simbolo = entornoGlobal.getSimbolo('xmlEncoding');
    var entornoEncoding = simbolo.valor == null ? null : simbolo.valor.entorno;
    var version = entornoEncoding.getSimbolo("version") == null ? null : entornoEncoding.getSimbolo("version");
    var encoding = entornoEncoding.getSimbolo("encoding") == null ? null : entornoEncoding.getSimbolo("encoding");
    agregarLinea("\n=====Informacion de XML=====");
    agregarLinea("Version " + (version == null ? "No se encontro version" : version.valor));
    agregarLinea("Encoding " + (encoding == null ? "No se encontro encoding" : encoding.valor));
    agregarLinea("============================");
}
function ejecutarXPath(instrucciones) {
    agregarLinea("Analizando XPath");
    instrucciones.forEach((element) => {
        element.ejecutar(entornoGlobal, instrucciones);
    });
    agregarLinea("Finalizando XPath");
}
function agregarErroresXMLConsola(listaErrores) {
    var header = "==========ERRORES XML==========";
    agregarErroresConsola(header, listaErrores);
}
function agregarErroresConsola(header, listaErrores) {
    agregarLinea(header);
    listaErrores.forEach((err) => {
        agregarLinea("Error: " + err.tipoError + " - " + err.mensaje + " - " + err.token + " - " + err.linea + " - " + err.columna);
    });
}
function agregarLinea(texto) {
    consola += "\n" + texto;
}
