"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.Simbolo = void 0;
class Simbolo {
    constructor(id, tipo, valor, linea, columna, entorno) {
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.entorno = entorno;
    }
    existe(id) {
        for (let ent of this.entorno) {
            if (id == ent.id)
                return true;
        }
        return false;
    }
    getSimbolo(id) {
        let simboloTemp = [];
        for (let ent of this.entorno) {
            if (id == ent.id) {
                simboloTemp.push(ent);
            }
        }
        return simboloTemp;
    }
}
// exports.Simbolo = Simbolo;
