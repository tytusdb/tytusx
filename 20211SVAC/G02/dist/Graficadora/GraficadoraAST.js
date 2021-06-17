"use strict";
var cadenaASTXML;
var contadorASTXML;
function procesarASTXML() {
    cadenaASTXML = "digraph G { node [shape = record, height = 0.1]; \nnodo0[label=\"Inicio\"];\n";
    contadorASTXML = 0;
    if (instruccionesXML != null && instruccionesXML.length > 0) {
        var nodoPadre = "nodo0";
        contadorASTXML++;
        instruccionesXML.forEach((objetoHijo) => {
            if (objetoHijo instanceof Objeto) {
                var nodoHijo = "nodo" + contadorASTXML;
                cadenaASTXML += nodoHijo + "[label=\"" + objetoHijo.identificador.split("\"").join("\\\"") + "\"];\n";
                cadenaASTXML += nodoPadre + "->" + nodoHijo + ";\n";
                contadorASTXML++;
                recorrerASTXML(objetoHijo, nodoHijo);
            }
        });
    }
    cadenaASTXML += "}";
}
function recorrerASTXML(element, nodoPadre) {
    if (element instanceof Objeto) {
        if (element.listaObjetos != null && element.listaObjetos.length > 0) {
            element.listaObjetos.forEach((objetoHijo) => {
                if (objetoHijo instanceof Objeto) {
                    var nombreHijo = "nodo" + contadorASTXML;
                    cadenaASTXML += nombreHijo + "[label=\"" + objetoHijo.identificador.split("\"").join("\\\"") + "\"];\n";
                    cadenaASTXML += nodoPadre + "->" + nombreHijo + ";\n";
                    contadorASTXML++;
                    recorrerASTXML(objetoHijo, nombreHijo);
                    if (objetoHijo.texto != null && objetoHijo.texto != "") {
                        var nombreNieto = "nodo" + contadorASTXML;
                        cadenaASTXML += nombreNieto + "[label=\"" + objetoHijo.texto.split("\"").join("\\\"") + "\"];\n";
                        cadenaASTXML += nombreHijo + "->" + nombreNieto + ";\n";
                        contadorASTXML++;
                    }
                }
            });
        }
        if (element.listaAtributos != null && element.listaAtributos.length > 0) {
            element.listaAtributos.forEach((atributo) => {
                if (atributo instanceof Atributo) {
                    var nombreHijo = "nodo" + contadorASTXML;
                    cadenaASTXML += nombreHijo + "[label=\"" + atributo.identificador.split("\"").join("\\\"") + "\"];\n";
                    cadenaASTXML += nodoPadre + "->" + nombreHijo + ";\n";
                    contadorASTXML++;
                    var nombreNieto = "nodo" + contadorASTXML;
                    cadenaASTXML += nombreNieto + "[label=\"" + atributo.valor.split("\"").join("\\\"") + "\"];\n";
                    cadenaASTXML += nombreHijo + "->" + nombreNieto + ";\n";
                    contadorASTXML++;
                }
            });
        }
    }
}
