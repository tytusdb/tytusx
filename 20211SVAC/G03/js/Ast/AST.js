"use strict";
class AST {
    constructor() {
        this.i = 0;
    }
    generarDot(raiz) {
        var dotReporte = "digraph Arbol_AST{ node[shape=\"box\"]";
        dotReporte += this.dotArbol(raiz);
        dotReporte += "}";
        return dotReporte;
    }
    dotArbol(raiz) {
        var cuerpoRecorridoArbol = "";
        this.i++;
        var padre = "n" + this.i;
        if (raiz.getValor() != null)
            cuerpoRecorridoArbol += padre + "[label = \"" + raiz.getNombre() + "\\n" + raiz.getValor() + "\"];";
        else
            cuerpoRecorridoArbol += padre + "[label = \"" + raiz.getNombre() + "\"];";
        for (let nodo of raiz.getHijos()) {
            cuerpoRecorridoArbol += padre + " -> n" + (this.i + 1) + ";\n";
            cuerpoRecorridoArbol += this.dotArbol(nodo);
        }
        return cuerpoRecorridoArbol;
    }
}
