"use strict";
class Codigo3d {
    constructor(linea, columna) {
        this._linea = linea;
        this._columna = columna;
        this._eliminado = false;
    }
    optimizarCodigo() {
    }
    get eliminado() {
        return this._eliminado;
    }
    set eliminado(value) {
        this._eliminado = value;
    }
    get linea() {
        return this._linea;
    }
    get columna() {
        return this._columna;
    }
    toString() {
        return "";
    }
}
