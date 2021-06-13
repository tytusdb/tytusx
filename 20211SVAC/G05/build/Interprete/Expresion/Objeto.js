"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Objeto = void 0;
const Entorno_1 = require("../../Simbolo/Entorno");
class Objeto {
    constructor(id, texto, linea, columna, listaA, listaO, ide) {
        this.identificador1 = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaA;
        this.listaObjetos = listaO;
        this.identificador2 = ide;
        this.entorno = new Entorno_1.Entorno(null);
    }
}
exports.Objeto = Objeto;
