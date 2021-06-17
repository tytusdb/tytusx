"use strict";
var NodoError = /** @class */ (function () {
    function NodoError(tipo, analizador, descripcion, linea, columna) {
        this.tipo = tipo;
        this.analizador = analizador;
        this.descripcion = descripcion;
        this.linea = (linea + 1);
        this.columna = (columna + 1);
    }
    NodoError.prototype.gettipo = function () {
        return this.tipo;
    };
    NodoError.prototype.getAnalizador = function () {
        return this.analizador;
    };
    NodoError.prototype.getdescripcion = function () {
        return this.descripcion;
    };
    NodoError.prototype.getlinea = function () {
        return this.linea;
    };
    NodoError.prototype.getcolumna = function () {
        return this.columna;
    };
    return NodoError;
}());
//# sourceMappingURL=Nodo_Error.js.map