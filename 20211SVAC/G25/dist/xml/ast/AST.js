"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
const Tipo_1 = require("./Tipo");
class AST {
    constructor(expresiones) {
        this.expresiones = expresiones;
        this.list_grammar = [];
        this.line = 0;
        this.column = 0;
    }
    getExpresiones() {
        return this.expresiones;
    }
    setProducciones(lista_grammar) {
        this.list_grammar = lista_grammar;
    }
    getProducciones() {
        return this.list_grammar;
    }
    getTipo(e) {
        return Tipo_1.Tipo.OBJETO;
    }
    ;
    getValorImplicito(e) {
        return null;
    }
    ;
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.count;
        g.graph += "    " + nombreHijo + "[label=\"ESTRUCTURA\"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;
        padre = nombreHijo;
        this.expresiones.forEach((o) => {
            nombreHijo = "nodo" + g.count;
            g.graph += "    " + nombreHijo + "[label=\"" + o.getNombreHijo() + "\"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
            o.generarGrafo(g, nombreHijo);
        });
        return null;
    }
    ;
    getNombreHijo() {
        return "";
    }
    ;
}
exports.AST = AST;
