"use strict";
exports.__esModule = true;
exports.Funciones = void 0;
var Funciones = /** @class */ (function () {
    function Funciones(fn) {
        this.funcion = fn;
    }
    Funciones.prototype.execute = function (padre) {
        var datos = {};
        switch (this.funcion) {
            case "last":
                var tmp = JSON.parse(padre);
                return tmp.length;
            case "position":
                return 1;
            case "node":
                datos = {
                    id: "",
                    pred: "node"
                };
                return datos;
            case "text":
                datos = {
                    id: "",
                    pred: "text"
                };
                return datos;
        }
        return "F";
    };
    return Funciones;
}());
exports.Funciones = Funciones;
