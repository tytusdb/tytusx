"use strict";
var cadenaASTXML;
var contadorASTXML;
function procesarASTXML() {
    cadenaASTXML = "digraph G { node [shape = record, height = 0.1]; \nnodo0[label=\"Inicio\"];\n";
    var contador = 0;
    if (instruccionesXML != null && instruccionesXML.length > 0) {
        contador += 1;
        recorrerASTXML(instruccionesXML, "nodo0", contador);
    }
    cadenaASTXML += "}";
}
function recorrerASTXML(instrucciones, nodoPadre, contador) {
    instrucciones.forEach((element) => {
        if (element instanceof Objeto) {
            if (element.listaAtributos != null && element.listaAtributos.length > 0) {
                element.listaAtributos.forEach((atributo) => {
                    if (atributo instanceof Atributo) {
                        var nombreHijo = "nodo" + contador;
                        cadenaASTXML += nombreHijo + "[label=\"" + atributo.identificador.split("\"").join("\\\"") + "\"];\n";
                        cadenaASTXML += nodoPadre + "->" + nombreHijo + ";\n";
                        contador++;
                        var nombreNieto = "nodo" + contador;
                        cadenaASTXML += nombreNieto + "[label=\"" + atributo.valor.split("\"").join("\\\"") + "\"];\n";
                        cadenaASTXML += nombreHijo + "->" + nombreNieto + ";\n";
                        contador++;
                    }
                });
            }
            if (element.listaObjetos != null && element.listaObjetos.length > 0) {
                element.listaObjetos.forEach((objetoHijo) => {
                    if (objetoHijo instanceof Objeto) {
                        var nombreHijo = "nodo" + contador;
                        cadenaASTXML += nombreHijo + "[label=\"" + objetoHijo.identificador.split("\"").join("\\\"") + "\"];\n";
                        cadenaASTXML += nodoPadre + "->" + nombreHijo + ";\n";
                        contador++;
                        recorrerASTXML(objetoHijo.listaObjetos, nombreHijo, contador);
                        var nombreNieto = "nodo" + contador;
                        cadenaASTXML += nombreHijo + "[label=\"" + objetoHijo.texto.split("\"").join("\\\"") + "\"];\n";
                        cadenaASTXML += nombreHijo + "->" + nombreNieto + ";\n";
                        contador++;
                    }
                });
            }
        }
    });
}
