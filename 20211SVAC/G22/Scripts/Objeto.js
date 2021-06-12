"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Objeto = void 0;
var Objeto = /** @class */ (function () {
    function Objeto(id, texto, listaAtributos, listaObjetos, linea, columna) {
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaAtributos;
        this, this.listaObjetos = listaObjetos;
    }
    return Objeto;
}());
exports.Objeto = Objeto;
