"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlTS = void 0;
class XmlTS {
    constructor() {
        this.tabla = [];
    }
    agregar(identificador, valor, ambito, tipo, linea, columna) {
        this.tabla.push([identificador, valor, ambito, tipo, linea, columna]);
    }
}
exports.XmlTS = XmlTS;
