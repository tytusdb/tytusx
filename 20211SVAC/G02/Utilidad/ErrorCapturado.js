"use strict";
class ErrorCapturado {
    constructor(tipoError, token, mensaje, linea, columna) {
        this.mensaje = mensaje;
        this.tipoError = tipoError;
        this.token = token;
        this.linea = linea;
        this.columna = columna;
    }
}
