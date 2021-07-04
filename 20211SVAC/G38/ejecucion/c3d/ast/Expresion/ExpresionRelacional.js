"use strict";
var TipoRelacional;
(function (TipoRelacional) {
    TipoRelacional["lt"] = "<";
    TipoRelacional["lte"] = "<=";
    TipoRelacional["gt"] = ">";
    TipoRelacional["gte"] = ">=";
    TipoRelacional["equal_equal"] = "==";
    TipoRelacional["nequal"] = "!=";
})(TipoRelacional || (TipoRelacional = {}));
class ExpresionRelacional extends Codigo3d {
    constructor(tipoRelacional, primitivaIzquierda, primitivaDerecha, linea, columna) {
        super(linea, columna);
        this._tipoRelacional = tipoRelacional;
        this._primitivaIzquierda = primitivaIzquierda;
        this._primitivaDerecha = primitivaDerecha;
    }
    negarTipoRelacional() {
        switch (this._tipoRelacional) {
            case TipoRelacional.gt:
                this._tipoRelacional = TipoRelacional.lt;
                break;
            case TipoRelacional.gte:
                this._tipoRelacional = TipoRelacional.lt;
                break;
            case TipoRelacional.lt:
                this._tipoRelacional = TipoRelacional.gt;
                break;
            case TipoRelacional.lte:
                this._tipoRelacional = TipoRelacional.gt;
                break;
            case TipoRelacional.equal_equal:
                this._tipoRelacional = TipoRelacional.nequal;
                break;
            case TipoRelacional.nequal:
                this._tipoRelacional = TipoRelacional.equal_equal;
                break;
        }
    }
    get tipoRelacional() {
        return this._tipoRelacional;
    }
    set tipoRelacional(value) {
        this._tipoRelacional = value;
    }
    get primitivaIzquierda() {
        return this._primitivaIzquierda;
    }
    set primitivaIzquierda(value) {
        this._primitivaIzquierda = value;
    }
    get primitivaDerecha() {
        return this._primitivaDerecha;
    }
    set primitivaDerecha(value) {
        this._primitivaDerecha = value;
    }
    toString() {
        let cadenaSalida = this.primitivaIzquierda.toString() + " " + this.tipoRelacional.toString() + " " + this.primitivaDerecha.toString();
        return cadenaSalida;
    }
}
