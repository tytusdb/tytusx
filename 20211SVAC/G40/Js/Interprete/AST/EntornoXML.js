"use strict";

var EntornoXML = /** @class */ (function () {
    function EntornoXML(anterior) {
        this.tabla = [];
        this.anterior = anterior;
    }
    EntornoXML.prototype.agregar = function (simbolo) {
        this.tabla.push(simbolo);
    };

    return EntornoXML;
}());

