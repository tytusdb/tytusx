"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entorno_1 = require("./xml/ast/Entorno");
const Simbolo_1 = require("./xml/ast/Simbolo");
const Tipo_1 = require("./xml/ast/Tipo");
const ReporteXML_1 = require("./xml/reportes/ReporteXML");
const GraphAST_1 = require("./grafo/GraphAST");
var gramatica = require('../grammar/Grammar_xml');
let contenido = `
<!--Students grades are uploaded by months-->

<?xml version="1.0" encoding="UTF-8"?>

<bibliotec>
  <libro>
    <titulo>Pantaleon y las visitadoras</titulo>
    <autor fechaNacimiento="28/03/1936">Mario (Varga)s Llosa</autor>
    <fechaPublicacion ano="1973" año="1000"/>
  </libro>
  <libro>
    <titulo>Conversacion en la catedral</titulo>
    <autor fechaNacimiento="28/03/1936">FFF Vargas: Llosa</autor>
    <fechaPublicacion ano="1969"/>
  </libro>
</biblioteca>
`;
let instrucciones;
instrucciones = gramatica.parse(contenido);
const entornoGlobal = new Entorno_1.Entorno(null);
function ejecutarCodigo() {
    instrucciones.getExpresiones().forEach((element) => {
        if (element.listAtributos != undefined) {
            if (element.listAtributos.length > 0) {
                element.listAtributos.forEach((a) => {
                    const simbolo = new Simbolo_1.Simbolo(a.id, a.value, Tipo_1.Tipo.ATRIBUTO, a.line, a.column);
                    entornoGlobal.agregar(simbolo);
                });
            }
        }
        let entornoObj = new Entorno_1.Entorno(null);
        if (element.listObjetos != undefined && element.listObjetos != null) {
            entornoObj = ambito_objeto(element.listObjetos, entornoGlobal);
        }
        if (element.id1 != undefined) {
            element.entorno = entornoObj;
            const simbolo = new Simbolo_1.Simbolo(element.id1, element, Tipo_1.Tipo.OBJETO, element.line, element.column);
            entornoGlobal.agregar(simbolo);
        }
    });
    //entornoGlobal.print()
}
function ambito_objeto(listO, entornoAnterior) {
    const entornoObjeto = new Entorno_1.Entorno(entornoAnterior);
    listO.forEach((element) => {
        if (element.listAtributos != undefined) {
            if (element.listAtributos.length > 0) {
                element.listAtributos.forEach((a) => {
                    const simbolo = new Simbolo_1.Simbolo(a.id, a.value, Tipo_1.Tipo.ATRIBUTO, a.line, a.column);
                    //entornoObjeto.print();
                    entornoObjeto.agregar(simbolo);
                });
            }
        }
        let entornoObj = new Entorno_1.Entorno(null);
        if (element.listObjetos != undefined && element.listObjetos != null) {
            //entornoObjeto.print();
            entornoObj = ambito_objeto(element.listObjetos, entornoObjeto);
        }
        if (element.id1 != undefined) {
            element.entorno = entornoObj;
            const simbolo = new Simbolo_1.Simbolo(element.id1, element, Tipo_1.Tipo.OBJETO, element.line, element.column);
            entornoObjeto.agregar(simbolo);
        }
    });
    return entornoObjeto;
}
ejecutarCodigo();
//REPORTE 
const reporte = new ReporteXML_1.ReporteXML();
reporte.tablaSimbolos(entornoGlobal);
console.log(instrucciones.getProducciones());
//GRAFO
let graph = new GraphAST_1.GraphAST(instrucciones);
console.log(graph.getGrafo());
