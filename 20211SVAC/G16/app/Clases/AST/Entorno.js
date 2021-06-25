"use strict";
exports.__esModule = true;
var Entorno = /** @class */ (function () {
    function Entorno(Padre) {
        this.entornos = new Array();
        this.Padre = Padre;
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
