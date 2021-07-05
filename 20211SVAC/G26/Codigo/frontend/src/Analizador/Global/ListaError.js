"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = __importDefault(require("./Error"));
class ListaError {
    constructor() {
        this.listaError = new Array();
        if (typeof ListaError._instance === "object") {
            return ListaError._instance;
        }
        ListaError._instance = this;
        return this;
    }
    static getInstance() {
        return this._instance;
    }
    agregarError(tipo, descripcion, linea, columna) {
        this.listaError.push(new Error_1.default(tipo, descripcion, linea, columna));
    }
    getSize() {
        return this.listaError.length;
    }
    getError(indice) {
        return this.listaError[indice];
    }
    limpiar() {
        this.listaError = [];
    }
}
const errores = new ListaError();
exports.default = errores;
