"use strict";

var XFlowerCondicion = /** @class */ (function () {
    function XFlowerCondicion(idflower, condicion, linea, columna) {
        this.linea = linea;
        this.idflower = idflower;
        this.condicion = condicion;
        this.columna = columna;
        this.tipo = "";
    }
    XFlowerCondicion.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };

    XFlowerCondicion.prototype.getIDIdentificador = function (ent, arbol) {
        return this.identificador;
    };

    XFlowerCondicion.prototype.getValorImplicito = function (objetos, arbol) {

        return this.condicion.getValorImplicito(objetos,"");

    };
    return XFlowerCondicion;
}());
