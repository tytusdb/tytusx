"use strict";
var TipoNumerico;
(function (TipoNumerico) {
    TipoNumerico["suma"] = "+";
    TipoNumerico["resta"] = "-";
    TipoNumerico["multiplicacion"] = "*";
    TipoNumerico["division"] = "/";
    TipoNumerico["modulo"] = "%";
})(TipoNumerico || (TipoNumerico = {}));
class ExpresionNumerica extends Codigo3d {
    constructor(tipoNumerico, primitivoIzquierda, primitivoDerecha, linea, columna) {
        super(linea, columna);
        this._tipoNumerico = tipoNumerico;
        this._primitivoIzquierda = primitivoIzquierda;
        this._primitivoDerecha = primitivoDerecha;
    }
    get tipoNumerico() {
        return this._tipoNumerico;
    }
    get primitivoIzquierda() {
        return this._primitivoIzquierda;
    }
    get primitivoDerecha() {
        return this._primitivoDerecha;
    }
    set primitivoIzquierda(value) {
        this._primitivoIzquierda = value;
    }
    set primitivoDerecha(value) {
        this._primitivoDerecha = value;
    }
    set tipoNumerico(value) {
        this._tipoNumerico = value;
    }
    toString() {
        let cadenaSalida = this.primitivoIzquierda.toString() + " " + this.tipoNumerico.toString() + " " + this.primitivoDerecha.toString();
        return cadenaSalida;
    }
}
