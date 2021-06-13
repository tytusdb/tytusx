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

<biblioteca>
  <libro>
  <fechaPublicacion ano="1973" año="1000"/>
  <autor fechaNacimiento="28/03/1936">Mario (Varga)s Llosa</autor>
  <f fechaNacimiento="28/03/1936" />
  </libro>
  <libro>
  <fechaPublicacion ano="1973" año="1000"/>
  <autor fechaNacimiento="28/03/1936">Mario (Varga)s Llosa</autor>
  <f fechaNacimiento="28/03/1936" />
  </libro>
</biblioteca>
`;
let instrucciones;
instrucciones = gramatica.parse(contenido);
const entornoGlobal = new Entorno_1.Entorno(null);
function ejecutarCodigo() {
    instrucciones.getExpresiones().forEach((element) => {
        let entornoObj = new Entorno_1.Entorno(null);
        if (element.listObjetos != undefined && element.listObjetos != null) {
            entornoObj = ambito_objeto(element.listObjetos, entornoGlobal);
        }
        if (element.listAtributos != undefined) {
            if (element.listAtributos.length > 0) {
                element.listAtributos.forEach((a) => {
                    const simbolo = new Simbolo_1.Simbolo(a.id, a.value, Tipo_1.Tipo.ATRIBUTO, a.line, a.column);
                    entornoObj.agregar(simbolo);
                });
            }
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
    var entornoObjeto = new Entorno_1.Entorno(entornoAnterior);
    listO.forEach((element) => {
        let entornoObj = new Entorno_1.Entorno(entornoObjeto);
        if (element.listObjetos != undefined && element.listObjetos != null) {
            //entornoObjeto.print();
            entornoObj = ambito_objeto(element.listObjetos, entornoObjeto);
        }
        if (element.listAtributos != undefined) {
            if (element.listAtributos.length > 0) {
                element.listAtributos.forEach((a) => {
                    const simbolo = new Simbolo_1.Simbolo(a.id, a.value, Tipo_1.Tipo.ATRIBUTO, a.line, a.column);
                    //entornoObjeto.print();
                    entornoObj.agregar(simbolo);
                });
            }
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
//REPORTE GRAMATICAL
//console.log(instrucciones.getProducciones())
//console.log(entornoGlobal.getSimbolo("biblioteca").getValorImplicito().
//entorno.getSimbolo("libro").getValorImplicito().entorno.getSimbolo('autor').getValorImplicito().text );
//REPORTE 
const reporte = new ReporteXML_1.ReporteXML();
//*console.log(reporte.tablaSimbolos(entornoGlobal,"0"));
//console.log(entornoGlobal.getTabla())
//console.log(entornoGlobal.getSimbolo("0").getValorImplicito().entorno.getTabla())
//console.log(entornoGlobal.getSimbolo("0").getValorImplicito().entorno.getSimbolo("0").getValorImplicito().entorno.getTabla())
//console.log(entornoGlobal.getSimbolo("0").getValorImplicito().entorno
//.getSimbolo("0").getValorImplicito().entorno.getSimbolo("0").getValorImplicito().entorno.getAnterior())
//PRODUCIONES
//console.log(instrucciones.getPr¡cciones());
//GRAFO
let graph = new GraphAST_1.GraphAST(instrucciones);
//console.log(graph.getGrafo());
