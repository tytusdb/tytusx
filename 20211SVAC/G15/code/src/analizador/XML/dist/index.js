"use strict";
var Entorno_1 = require("./Simbolo/Entorno");
var Simbolo_1 = require("./Simbolo/Simbolo");
var Tipo_1 = require("./Simbolo/Tipo");
var gramatica = require('./GramaticaXML/gramaticaXMLASC');
function AnalizarXMLASC(entrada) {
    var objetoparse = gramatica.parse(entrada);
    var contadorGlobal = 0;
    var contadorObjeto = 0;
    var entornoGlobal = new Entorno_1.Entorno(null);
    var objetos = objetoparse.objetos;
    var ecoding = objetoparse.ecoding.replace(/['"]+/g, '');
    var ReporteGr = objetoparse.listaRG;
    var Errores = objetoparse.errores;
    objetos.forEach(function (element) {
        var entornoObjeto = new Entorno_1.Entorno(null);
        contadorObjeto = 0;
        if (element.listaAtributos.length > 0) {
            AgregarEntornoAtributo(element, entornoObjeto, contadorObjeto);
        }
        if (element.listaObjetos.length > 0) {
            AgregarEntornoObjeto(element, entornoObjeto, contadorObjeto);
        }
        var simbolo = new Simbolo_1.Simbolo(Tipo_1.Tipo.OBJETO, element.identificador, element.texto, element.fila, element.columna, entornoObjeto);
        entornoGlobal.agregar(String(contadorGlobal), simbolo);
        contadorGlobal++;
    });

    return {entornoGlobal:entornoGlobal,ecoding:ecoding, ReporteGr: ReporteGr, Errores: Errores, objetos: objetos,msj:"XML Analizado Exitosamente..."};
}



function AgregarEntornoAtributo(objeto, entornoObjeto, contador) {
    objeto.listaAtributos.forEach(function (atributo) {
        var simbolo = new Simbolo_1.Simbolo(Tipo_1.Tipo.ATRIBUTO, atributo.identificador, atributo.valor, objeto.fila, objeto.columna, null);
        entornoObjeto.agregar(String(contador), simbolo);
        contador++;
    });
}

function AgregarEntornoObjeto(objeto, entornoObjeto, contador) {
    if (objeto.listaObjetos.length > 0) {
        var contadorObjeto = 0;
        //RECORRER LISTADO DE OBJETOS
        objeto.listaObjetos.forEach(function (element) {
            var entornoObjeto2 = new Entorno_1.Entorno(null);
            contadorObjeto = 0;
            if (element.listaAtributos.length > 0) {
                AgregarEntornoAtributo(element, entornoObjeto2, contadorObjeto);
            }
            if (element.listaObjetos.length > 0) {
                AgregarEntornoObjeto(element, entornoObjeto2, contadorObjeto);
            }
            var simbolo = new Simbolo_1.Simbolo(Tipo_1.Tipo.OBJETO, element.identificador, element.texto, element.fila, element.columna, entornoObjeto2);
            entornoObjeto.agregar(String(contador), simbolo);
            contador++;
        });
    }
}
var cadenaTablaSimbolos = "";
function PintarTablasSimbolos(entornoGlobal) {
    var contadorPintar = 0;
    var enviarAmbito = "";
    cadenaTablaSimbolos = "";
    while (entornoGlobal.tabla[String(contadorPintar)] != undefined) {
        cadenaTablaSimbolos += "<tr><td>" + entornoGlobal.tabla[String(contadorPintar)].indentificador + "[" + contadorPintar + "]"
            + "</td><td>" + entornoGlobal.tabla[String(contadorPintar)].valor
            + "</td><td>" + Tipo_1.Tipo[entornoGlobal.tabla[String(contadorPintar)].tipo]
            + "</td><td>" + "Global"
            + "</td><td>" + entornoGlobal.tabla[String(contadorPintar)].fila
            + "</td><td>" + entornoGlobal.tabla[String(contadorPintar)].columna
            + "</td></tr>\n";
        enviarAmbito = entornoGlobal.tabla[String(contadorPintar)].indentificador + "[" + contadorPintar + "]";
        PintarEntorno(entornoGlobal.tabla[String(contadorPintar)].entorno, enviarAmbito);
        contadorPintar++;
    }
    return cadenaTablaSimbolos;
}
function PintarEntorno(entornoObjeto, ambito) {
    var contadorPintar = 0;
    var enviarAmbito = "";
    var tipo = "";
    while (entornoObjeto.tabla[String(contadorPintar)] != undefined) {
        cadenaTablaSimbolos += "<tr><td>" + entornoObjeto.tabla[String(contadorPintar)].indentificador + "[" + contadorPintar + "]"
            + "</td><td>" + entornoObjeto.tabla[String(contadorPintar)].valor
            + "</td><td>" + Tipo_1.Tipo[entornoObjeto.tabla[String(contadorPintar)].tipo]
            + "</td><td>" + ambito
            + "</td><td>" + entornoObjeto.tabla[String(contadorPintar)].fila
            + "</td><td>" + entornoObjeto.tabla[String(contadorPintar)].columna
            + "</td></tr>\n";
        tipo = Tipo_1.Tipo[entornoObjeto.tabla[String(contadorPintar)].tipo];
        if (tipo != "ATRIBUTO") {
            enviarAmbito = entornoObjeto.tabla[String(contadorPintar)].indentificador + "[" + contadorPintar + "]";
            PintarEntorno(entornoObjeto.tabla[String(contadorPintar)].entorno, enviarAmbito);
        }
        contadorPintar++;
    }
}
function PintarReporteGramatical(ReporteGr) {
    var splitted = "";
    var cadenaSalida = "";
    for (var i = 0; i < ReporteGr.length; i++) {
        splitted = ReporteGr[i].split(",");
        cadenaSalida += "<tr><td>" + String(i) + "</td><td>" + splitted[0] + "</td><td>" + splitted[1] + "</td></tr>\n";
    }
    return cadenaSalida;
}
var cadenaCST = "";
var contadorId = 0;
function PintarCST(objetos) {
    var idPadre = 0;
    cadenaCST = "";
    contadorId = 0;
    cadenaCST += "digraph G{\nsubgraph cluster {\n\n";
    cadenaCST += "RAIZ0[label=\"Raiz\" style = filled fillcolor = green]; \n";
    contadorId++;
    objetos.forEach(function (element) {
        cadenaCST += "OBJETO" + contadorId + "[label=\"" + "OBJETO" + "\" style = filled fillcolor = green]; \n";
        cadenaCST += "RAIZ0 -> " + "OBJETO" + contadorId + ";\n";
        idPadre = contadorId;
        contadorId++;
        cadenaCST += element.identificador + contadorId + "[label=\"" + element.identificador + "\" style = filled fillcolor = yellow]; \n";
        cadenaCST += "OBJETO" + idPadre + " -> " + element.identificador + contadorId + ";\n";
        contadorId++;
        if (element.listaAtributos.length > 0) {
            PintarCSTAtributo(element, idPadre);
        }
        if (element.listaObjetos.length > 0) {
            PintarCSTObjeto(element, idPadre);
        }
        if (element.texto != "") {
            cadenaCST += "VALOR" + contadorId + "[label=\"val=" + element.texto + "\" style = filled fillcolor = orange]; \n";
            cadenaCST += "OBJETO" + idPadre + " -> " + "VALOR" + contadorId + ";\n";
            contadorId++;
        }
        cadenaCST += element.identificador + contadorId + "[label=\"" + element.identificador + "\" style = filled fillcolor = yellow]; \n";
        cadenaCST += "OBJETO" + idPadre + " -> " + element.identificador + contadorId + ";\n\n";
        contadorId++;
    });
    cadenaCST += "\n\n}\n}";
    return cadenaCST;
}
function PintarCSTAtributo(objeto, idPadre) {
    var idAtributo = 0;
    objeto.listaAtributos.forEach(function (element) {
        cadenaCST += "ATRIBUTO" + contadorId + "[label=\"" + "ATRIBUTO" + "\" style = filled fillcolor = green]; \n";
        cadenaCST += "OBJETO" + idPadre + "-> " + "ATRIBUTO" + contadorId + ";\n";
        idAtributo = contadorId;
        contadorId++;
        cadenaCST += element.identificador + contadorId + "[label=\"" + element.identificador + "\" style = filled fillcolor = yellow]; \n";
        cadenaCST += "ATRIBUTO" + idAtributo + " -> " + element.identificador + contadorId + ";\n";
        idAtributo = contadorId;
        contadorId++;
        cadenaCST += "VALOR" + contadorId + "[label=\"val=" + element.valor.replace(/['"]+/g, '') + "\" style = filled fillcolor = orange]; \n";
        cadenaCST += element.identificador + idAtributo + " -> " + "VALOR" + contadorId + ";\n";
        contadorId++;
    });
}
function PintarCSTObjeto(objetos, idPadre) {
    var idObjeto = 0;
    objetos.listaObjetos.forEach(function (element) {
        cadenaCST += "OBJETO" + contadorId + "[label=\"" + "OBJETO" + "\" style = filled fillcolor = green]; \n";
        cadenaCST += "OBJETO" + idPadre + " -> " + "OBJETO" + contadorId + ";\n";
        idObjeto = contadorId;
        contadorId++;
        cadenaCST += element.identificador + contadorId + "[label=\"" + element.identificador + "\" style = filled fillcolor = yellow]; \n";
        cadenaCST += "OBJETO" + idObjeto + " -> " + element.identificador + contadorId + ";\n";
        contadorId++;
        if (element.listaAtributos.length > 0) {
            PintarCSTAtributo(element, idObjeto);
        }
        if (element.listaObjetos.length > 0) {
            PintarCSTObjeto(element, idObjeto);
        }
        if (element.texto != "") {
            cadenaCST += "VALOR" + contadorId + "[label=\"val=" + element.texto + "\" style = filled fillcolor = orange]; \n";
            cadenaCST += "OBJETO" + idObjeto + " -> " + "VALOR" + contadorId + ";\n";
            contadorId++;
        }
        cadenaCST += element.identificador + contadorId + "[label=\"" + element.identificador + "\" style = filled fillcolor = yellow]; \n";
        cadenaCST += "OBJETO" + idObjeto + " -> " + element.identificador + contadorId + ";\n";
        contadorId++;
    });
}
function PintarReporteErrores(Errores) {
    var splitted = "";
    var cadenaSalida = "";
    for (var i = 0; i < Errores.length; i++) {
        splitted = Errores[i].split(",");
        cadenaSalida += "<tr><td>" + splitted[0] + "</td><td>" + splitted[1] + "</td><td>" + splitted[2] + "</td><td>" + splitted[3] + "</td></tr>\n";
    }
    return cadenaSalida;
}
module.exports = { AnalizarXMLASC: AnalizarXMLASC, PintarTablasSimbolos: PintarTablasSimbolos, PintarReporteGramatical: PintarReporteGramatical,
    PintarReporteErrores: PintarReporteErrores, PintarCST: PintarCST};
// AnalizarXMLASC(` 
//     <?xml version="1.0" encoding="UTF-8"?>
//     <biblioteca>
//         <libro>
//             <titulo>La vida esta en otra parte</titulo>
//             <autor>Milan Kundera</autor>
//             <fechaPublicacion año="1973"/>
//         </libro>
//         <libro>
//             <titulo>Pantaleon y las visitadoras</titulo>
//             <autor fechaNacimiento="28/03/1936">Mario Vargas Llosa</autor>
//             <fechaPublicacion año="1973"/>
//         </libro>
//         <libro>
//             <titulo>Conversacion en la catedral</titulo>
//             <autor fechaNacimiento="28/03/1936">Mario Vargas Llosa</autor>
//             <fechaPublicacion año="1969"/>
//         </libro>
//     </biblioteca>
// `);
