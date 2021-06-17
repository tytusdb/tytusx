"use strict";
class Nodo {
    constructor(node, valor, axes, predicado, wildcard, tipo, fila, columna) {
        this.valor = valor;
        this.node = node;
        this.axes = axes;
        this.predicado = predicado;
        this.wildcard = wildcard;
        this.tipo = tipo;
        this.linea = fila;
        this.columna = columna;
    }
    getNode() {
        return this.node;
    }
    getPredicado() {
        return this.predicado;
    }
    getValorImplicito() {
        return this.valor;
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.count;
        g.graph += "    " + nombreHijo + "[label=\"" + this.node + "\"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;
        padre = nombreHijo;
        if (typeof (this.predicado) == "object") {
            nombreHijo = this.predicado.generarGrafo(g, padre);
        }
        else {
            nombreHijo = "nodo" + g.count;
            g.graph += "    " + nombreHijo + "[label=\" " + this.predicado + " \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
        }
        return nombreHijo;
    }
    getNombreHijo() {
        return "";
    }
}
