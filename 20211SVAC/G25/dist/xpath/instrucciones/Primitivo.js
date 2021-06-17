"use strict";
class Primitivo {
    constructor(valor, tipo, fila, columna) {
        this.valor = valor;
        this.tipo = tipo;
        this.linea = fila;
        this.columna = columna;
    }
    getTipo() {
        return this.tipo;
    }
    getValorImplicito() {
        return this.valor;
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.count;
        g.graph += "  " + nombreHijo + "[label=\"" + this.valor.toString().replace("\"", "").replace("\"", "") + "\"];\n";
        g.graph += "  " + padre + " -> " + nombreHijo + ";\n";
        g.count++;
        return null;
    }
    getNombreHijo() {
        return "PRIMITIVO";
    }
}
