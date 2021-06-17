"use strict";
class Error {
    constructor(tipo, descripcion, line, column) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.line = line;
        this.column = column;
    }
    getTipo() {
        return this.tipo;
    }
    getDescripcion() {
        return this.descripcion;
    }
    getLine() {
        return this.line;
    }
    getColumn() {
        return this.column;
    }
}
