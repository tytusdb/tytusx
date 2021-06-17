"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabla = void 0;
var Tabla = /** @class */ (function () {
    function Tabla(global, errores, encode) {
        this.global = global;
        this.errores = errores;
        this.encode = encode;
    }
    Tabla.prototype.insertObjet = function (nuevo) {
        this.global.push(nuevo);
    };
    Tabla.prototype.getReporteTS = function () {
        //Metodo para reporte de tabla de simbolos
        return "";
    };
    Tabla.prototype.getErroresDot = function () {
        //Metodo para reporte de errores
        return this.errores;
    };
    Tabla.prototype.getNodo = function (nombre) {
        //Hacer metodo para buscar 
    };
    Tabla.prototype.ejecutar = function () {
        this.global.forEach(function (element) {
            //element.ejecutar(this,);
        });
    };
    Tabla.prototype.insertError = function (error) {
        this.errores.push(error);
    };
    Tabla.prototype.getErrores = function () {
        return this.errores;
    };
    return Tabla;
}());
exports.Tabla = Tabla;
