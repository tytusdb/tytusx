"use strict";

var EntornoXML = /** @class */ (function () {
    function EntornoXML(anterior) {
        this.tabla = [];
        this.anterior = anterior;
        this.id = 0;
    }
    EntornoXML.prototype.agregar = function (simbolo) {
        this.tabla.push(simbolo);
    };

    EntornoXML.prototype.setAnterior = function (entorno) {
        this.anterior = entorno;
    };

    EntornoXML.prototype.getAnterior = function () {
        return this.anterior;
    };

    EntornoXML.prototype.setID = function (id) {
        this.id = id;
    };

    EntornoXML.prototype.getID = function () {
        return this.id;
    };

    EntornoXML.prototype.getTabla = function () {
        return this.tabla;
    };

    return EntornoXML;
}());

