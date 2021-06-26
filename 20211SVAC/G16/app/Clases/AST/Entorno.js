"use strict";
exports.__esModule = true;
var Entorno = /** @class */ (function () {
    function Entorno(anterior) {
        this.entornos = new Array();
        this.anterior = anterior;
    }
    Entorno.prototype.Add = function (Simbolo) {
        Simbolo.Nombre = Simbolo.Nombre;
        this.entornos.push(Simbolo);
    };
    Entorno.prototype.Get = function () {
        return this.entornos;
    };
    return Entorno;
}());
exports["default"] = Entorno;
