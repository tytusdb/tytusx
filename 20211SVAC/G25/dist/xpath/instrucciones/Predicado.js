"use strict";
class Predicado {
    constructor(id, expresion, fila, columna) {
        this.id = id;
        this.expresion = expresion;
        this.linea = fila;
        this.columna = columna;
    }
    getValorImplicito() {
        return null;
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.count;
        let hijoEnMedio;
        g.graph += "    " + nombreHijo + "[label=\" [ \"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;
        nombreHijo = "nodo" + g.count;
        g.graph += "    " + nombreHijo + "[label=\" " + this.expresion + " \"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;
        hijoEnMedio = nombreHijo;
        nombreHijo = "nodo" + g.count;
        g.graph += "    " + nombreHijo + "[label=\" ] \"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;
        return hijoEnMedio;
    }
    getNombreHijo() {
        return "";
    }
}
