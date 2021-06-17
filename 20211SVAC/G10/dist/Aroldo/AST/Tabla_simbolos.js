"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabla_simbolos = void 0;
class Tabla_simbolos {
    constructor() {
        this.registros = {};
        this.num_registro = 0;
    }
    agregar(simbolo) {
        this.num_registro = this.num_registro + 1;
        this.registros[this.num_registro] = simbolo;
    }
    eliminar(num_registro) {
        const value = this.registros[num_registro];
        if (value !== undefined) {
            delete this.registros[num_registro];
            return true;
        }
        return false;
    }
    existe(num_registro) {
        const value = this.registros[num_registro];
        if (value !== undefined) {
            return true;
        }
        return false;
    }
    getSimbolo(num_registro) {
        if (this.registros[num_registro] !== undefined) {
            return this.registros[num_registro];
        }
        return null;
    }
    reemplazar(num_registro, nuevoValor) {
        const value = this.registros[num_registro];
        if (value !== undefined) {
            this.registros[num_registro] = nuevoValor;
        }
    }
}
exports.Tabla_simbolos = Tabla_simbolos;
