"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
var Entorno_1 = require("./Entorno");
var Simbolo = /** @class */ (function () {
    function Simbolo(nombre, valor, tipo, fila, columna, padre) {
        this.nombre = nombre;
        this.valor = valor;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        if (padre == undefined || padre == null) {
            this.entorno = null;
        }
        else {
            this.entorno = new Entorno_1.Entorno(padre);
        }
    }
    return Simbolo;
}());
exports.Simbolo = Simbolo;
