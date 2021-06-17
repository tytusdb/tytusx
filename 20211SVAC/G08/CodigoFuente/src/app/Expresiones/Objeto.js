"use strict";
exports.__esModule = true;
exports.Objeto = void 0;
var Objeto = /** @class */ (function () {
    function Objeto(id, texto, linea, columna, listaAtributos, listaO, Tipo, Padre) {
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaO;
        this.tipo = Tipo;
        this.padre = Padre;
    }
    return Objeto;
}());
exports.Objeto = Objeto;
