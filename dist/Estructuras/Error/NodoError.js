"use strict";
var NodoError = /** @class */ (function () {
    function NodoError(lexema, tipoerror, descripcion, lenguaje, linea, columna) {
        this.lenguaje = lenguaje;
        this.lexema = lexema;
        this.tipoerror = tipoerror;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
    }
    return NodoError;
}());
