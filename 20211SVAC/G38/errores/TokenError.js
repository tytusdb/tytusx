"use strict";
var TipoError;
(function (TipoError) {
    TipoError["Lexico"] = "Lexico";
    TipoError["Sintactico"] = "Sintactico";
    TipoError["Semantico"] = "Semantico";
})(TipoError || (TipoError = {}));
class TokenError {
    constructor(tipoError, mensaje, linea, columna) {
        this._tipoError = tipoError;
        this._mensaje = mensaje;
        this._linea = linea;
        this._columna = columna;
    }
    get tipoError() {
        return this._tipoError;
    }
    get mensaje() {
        return this._mensaje;
    }
    get linea() {
        return this._linea;
    }
    get columna() {
        return this._columna;
    }
}
