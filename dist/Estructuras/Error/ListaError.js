"use strict";
var ListaErrores = /** @class */ (function () {
    function ListaErrores() {
        this.listaerrores = new Array();
    }
    ListaErrores.prototype.setError = function (valor) {
        this.listaerrores.push(valor);
    };
    return ListaErrores;
}());
