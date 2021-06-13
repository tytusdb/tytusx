"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
class Entorno {
    constructor(anterior) {
        this.anterior = anterior;
        this.tabla = {};
        this.unique = 0;
    }
    agregar(simbolo) {
        simbolo.id = simbolo.id.toLowerCase();
        this.tabla[this.unique] = simbolo;
        this.unique++;
    }
    existe(id) {
        id = id.toLowerCase();
        for (let e = this; e != null; e = e.anterior) {
            const value = e.tabla[id];
            if (value !== undefined) {
                return true;
            }
        }
        return false;
    }
    existeEnActual(id) {
        id = id.toLowerCase();
        if (this.tabla[id] !== undefined) {
            return true;
        }
        return false;
    }
    getSimbolo(id) {
        id = id.toLowerCase();
        for (let e = this; e != null; e = e.anterior) {
            if (e.tabla[id] !== undefined) {
                return e.tabla[id];
            }
        }
        return null;
    }
    getTabla() {
        return this.tabla;
    }
}
exports.Entorno = Entorno;
