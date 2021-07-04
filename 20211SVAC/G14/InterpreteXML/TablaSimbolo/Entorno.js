"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
var Entorno = /** @class */ (function () {
    function Entorno(padre, nombre) {
        this.tabla = {};
        this.padre = padre;
        this.nombre = nombre;
    }
    Entorno.prototype.agregarItem = function (id, simbolo) {
        id = id.toLowerCase();
        simbolo.id = simbolo.id.toLowerCase(); // validar que no se repita
        this.tabla[id] = simbolo;
    };
    return Entorno;
}());
exports.Entorno = Entorno;
