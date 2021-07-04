"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElseIf = void 0;
class ElseIf {
    constructor(identifier, condicion, respThen, fila, columna) {
        this.identifier = identifier;
        this.condicion = condicion;
        this.respThen = respThen;
        this.fila = fila;
        this.columna = columna;
    }
    condicionCumple(entorno) {
        let respuesta = this.condicion.getValor(entorno);
        if (respuesta != null && respuesta != undefined) {
            if (respuesta.tsimbolos !== undefined && respuesta.tsimbolos.length > 0) {
                return true;
            }
            else if (respuesta.tsimbolos === undefined && respuesta) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    }
    obtenerResponse(s) {
        if (!this.respThen.isVacio()) {
            return this.respThen.obtenerResponse(s);
        }
        return [];
    }
}
exports.ElseIf = ElseIf;
