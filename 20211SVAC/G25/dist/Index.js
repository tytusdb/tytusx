"use strict";
/*import { Entorno } from "./xml/ast/Entorno";
import { Simbolo } from "./xml/ast/Simbolo";
import { Tipo } from "./xml/ast/Tipo";
import { Atributo } from "./xml/expresiones/Atributo";
import { Objeto } from "./xml/expresiones/Objeto";
import { ReporteXML } from "./xml/reportes/ReporteXML";
import { AST_XML } from "./xml/ast/AST_XML";
import { AST_XPATH } from "./xpath/ast/AST_XPATH"
import { GraphAST } from "./grafo/GraphAST";
import { Gramatica } from "./xml/reportes/Gramatica";
import { Instruccion } from "./xpath/interfases/Instruccion";

const gramatica = require('../grammar/Grammar_xml')
const gramaticaDesc = require('../grammar/Grammar_xml_desc')
const gramaticaXPATH = require('../grammar/Grammar_xpath');*/
let contenido = `
  <?xml version="1.0" encoding="UTF-8"?>  <!-- Your comment -->
  <biblioteca>
    <libro>
      <titulo>La vida está en otra parte</titulo>
      <autor>Milan Kundera</autor>
      <fechaPublicacion año="1973"/>
    </libro>
    <libro>
      <titulo>Pantaleón y las visitadoras</titulo>
      <autor fechaNacimiento="28/03/1936">Mario Vargas Llosa</autor>
      <fechaPublicacion año="1973"/>
    </libro>
    <libro>
      <titulo>Conversación en la catedral</titulo>
      <autor fechaNacimiento="28/03/1936">Mario Vargas Llosa</autor>
      <fechaPublicacion año="1969"/>
    </libro>
  </biblioteca>
`;
let instrucciones;
//instrucciones = gramatica.parse(contenido);
const entornoGlobal = new Entorno(null);
function ejecutarCodigo(entrada) {
    instrucciones = Grammar_xml.parse(entrada);
    instrucciones.getExpresiones().forEach((element) => {
        let entornoObj = new Entorno(null);
        if (element.listObjetos != undefined && element.listObjetos != null) {
            entornoObj = ambito_objeto(element.listObjetos, entornoGlobal);
        }
        if (element.listAtributos != undefined) {
            if (element.listAtributos.length > 0) {
                element.listAtributos.forEach((a) => {
                    const simbolo = new Simbolo(a.id, a.value, Tipo.ATRIBUTO, a.line, a.column);
                    entornoObj.agregar(simbolo);
                });
            }
        }
        if (element.id1 != undefined) {
            element.entorno = entornoObj;
            const simbolo = new Simbolo(element.id1, element, Tipo.OBJETO, element.line, element.column);
            entornoGlobal.agregar(simbolo);
        }
    });
}
function ambito_objeto(listO, entornoAnterior) {
    var entornoObjeto = new Entorno(entornoAnterior);
    listO.forEach((element) => {
        let entornoObj = new Entorno(entornoObjeto);
        if (element.listObjetos != undefined && element.listObjetos != null) {
            //entornoObjeto.print();
            entornoObj = ambito_objeto(element.listObjetos, entornoObjeto);
        }
        if (element.listAtributos != undefined) {
            if (element.listAtributos.length > 0) {
                element.listAtributos.forEach((a) => {
                    const simbolo = new Simbolo(a.id, a.value, Tipo.ATRIBUTO, a.line, a.column);
                    //entornoObjeto.print();
                    entornoObj.agregar(simbolo);
                });
            }
        }
        if (element.id1 != undefined) {
            element.entorno = entornoObj;
            const simbolo = new Simbolo(element.id1, element, Tipo.OBJETO, element.line, element.column);
            entornoObjeto.agregar(simbolo);
        }
    });
    return entornoObjeto;
}
let texto = ``;
var text = ``;
var entorno_actual = [];
function ejecutarXPATH(query) {
    text = ``;
    texto = ``;
    entorno_actual = [];
    let ast = Grammar_xpath.parse(query);
    let list_entorno = [];
    //console.log(entornoGlobal)
    ast.getValorImplicito().valor.forEach((id) => {
        if (id.toString()[0] == "/" && id.toString()[1] == "/") {
            list_entorno = getEntornoActual(entornoGlobal, id.toString().substring(2, id.toString().length));
            console.log(id.toString().substring(2, id.toString().length));
            //console.log(descendiente(entornoGlobal, "autor"))
        }
    });
    list_entorno.forEach((e) => {
        //console.log(e)
        print_entorno(e);
    });
    editor2.setValue(text);
}
function print_entorno(o) {
    text += `<${o.id1} `;
    if (o.listAtributos != null) {
        o.listAtributos.forEach(a => {
            text += `${a.id}="${a.value}" `;
        });
    }
    if (o.text == '' && o.listObjetos == null) {
        text += `/>`;
    }
    else {
        if (o.text != null) {
            text += `> ${o.text}`;
        }
        else {
            text += `>`;
        }
        if (o.listObjetos != null) {
            o.listObjetos.forEach(lo => {
                print_entorno(lo);
            });
        }
        text += `</${o.id2}>\n`;
    }
    return text;
}
function getEntornoActual(entornoG, id) {
    for (let key in entornoG.getTabla()) {
        if (entornoG.getSimbolo(key).id === id) {
            //console.log(entornoG)
            entorno_actual.push(entornoG.getSimbolo(key).getValorImplicito());
        }
        let siguienteEntorno = entornoG.getSimbolo(key).getValorImplicito().entorno;
        if (siguienteEntorno != null) {
            getEntornoActual(siguienteEntorno, id);
        }
    }
    return entorno_actual;
}
function descendiente(entornoG, id) {
    for (let key in entornoG.getTabla()) {
        texto += `${entornoG.getSimbolo(key).id}`;
        let siguienteEntorno = entornoG.getSimbolo(key).getValorImplicito().entorno;
        if (siguienteEntorno != null) {
            descendiente(siguienteEntorno, id);
        }
    }
    return texto;
}
//ejecutarXML();
//ejecutarXPATH();
//entorno.getSimbolo("libro").getValorImplicito().entorno.getSimbolo('autor').getValorImplicito().text );
/*
//REPORTE GRAMATICAL
console.log(instrucciones.getProducciones())

//REPORTE
const reporte = new ReporteXML();
console.log(reporte.tablaSimbolos(entornoGlobal,"0"));

//PRODUCIONES
console.log(instrucciones.getProducciones());

*/
function getGrafoAscXML() {
    //GRAFO
    let graph = new GraphAST(instrucciones);
    return graph.getGrafo();
}
