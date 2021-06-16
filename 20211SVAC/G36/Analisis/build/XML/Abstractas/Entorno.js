"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
//var Tipo_1 = require("./Tipo");
var Entorno = /** @class */ (function () {
    function Entorno(padre) {
        if (padre != undefined || padre != null) {
            this.padre = padre;
        }
        else {
            this.padre = null;
        }
        this.ambito = [];
    }
    Entorno.prototype.insertarObjeto = function (nuevo) {
        this.ambito.push(nuevo);
    };
    Entorno.prototype.eliminarObjeto = function () {
        //Eliminar un entrono (creo que no necesitamos)
    };
    Entorno.prototype.getAtributos = function () {
        //retornar todos los atributos dentro del entorno
        var result = [];
        this.ambito.forEach(function (element) {
            if (element.tipo == Tipo.ATRIBUTO) {
                result.push(element);
            }
        });
        return result;
    };
    Entorno.prototype.existe = function (nombre) {
        //verificar si existe un objeto dentro de un entorno
    };
    Entorno.prototype.getNodo = function (nombre) {
        //busacr todos los que se llamen asi
    };
    return Entorno;
}());
exports.Entorno = Entorno;
