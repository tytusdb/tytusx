"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraficarCST_XML = void 0;
class GraficarCST_XML {
    constructor() {
        this.i = 0;
    }
    graficar(raiz) {
        var codigo = "";
        this.i = 0;
        codigo += 'digraph SG {\n';
        codigo += this.recorrer(raiz);
        codigo += "}";
        return codigo;
    }
    ;
    recorrer(nodo) {
        var cadena = "";
        this.i++;
        var padre = "nodo" + this.i;
        var valor = nodo.valor;
        if (valor == '') {
            cadena += padre + '[label="' + nodo.etiqueta + '"];\n';
        }
        else {
            if (valor.includes('\"')) {
                console.log('entre');
                valor = valor.replace(/"/g, '');
            }
            cadena += padre + '[label="' + nodo.etiqueta + '\\n' + valor + '"];\n';
        }
        for (var j = 0; j < nodo.hijos.length; j++) {
            var nodoHijo = nodo.hijos[j];
            cadena += padre + ' -> nodo' + (this.i + 1) + ';\n';
            cadena += this.recorrer(nodoHijo);
        }
        return cadena;
    }
    ;
}
exports.GraficarCST_XML = GraficarCST_XML;
