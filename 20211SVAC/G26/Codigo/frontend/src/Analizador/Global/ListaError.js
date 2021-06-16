"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Error_1 = __importDefault(require("./Error"));
var ListaError = /** @class */ (function () {
    function ListaError() {
        this.listaError = new Array();
        if (typeof ListaError._instance === "object") {
            return ListaError._instance;
        }
        ListaError._instance = this;
        return this;
    }
    ListaError.getInstance = function () {
        return this._instance;
    };
    ListaError.prototype.agregarError = function (tipo, descripcion, linea, columna) {
        this.listaError.push(new Error_1.default(tipo, descripcion, linea, columna));
    };
    ListaError.prototype.getSize = function () {
        return this.listaError.length;
    };
    ListaError.prototype.getError = function (indice) {
        return this.listaError[indice];
    };
    ListaError.prototype.limpiar = function () {
        this.listaError = [];
    };
    return ListaError;
}());
var errores = new ListaError();
exports.default = errores;
