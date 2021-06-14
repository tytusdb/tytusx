"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
var Entorno = /** @class */ (function () {
    function Entorno(padre) {
        this.padre = padre;
        this.ambito = [];
    }
    Entorno.prototype.insertarObjeto = function (nuevo) {
        this.ambito.push(nuevo);
    };
    Entorno.prototype.eliminarObjeto = function () {
        //Eliminar un entrono (creo que no necesitamos)
    };
    Entorno.prototype.getSimoblo = function (nombre) {
        //retornar un simbolo dentro del entorno por id
    };
    Entorno.prototype.existe = function (nombre) {
        //verificar si existe un objeto dentro de un entorno
    };
    return Entorno;
}());
exports.Entorno = Entorno;
