"use strict";
var TipoValor;
(function (TipoValor) {
    TipoValor[TipoValor["temporal"] = 0] = "temporal";
    TipoValor[TipoValor["identifier"] = 1] = "identifier";
    TipoValor[TipoValor["double"] = 2] = "double";
    TipoValor[TipoValor["integer"] = 3] = "integer";
    TipoValor[TipoValor["arreglo"] = 4] = "arreglo";
})(TipoValor || (TipoValor = {}));
class Primitiva extends Codigo3d {
    constructor(tipoPrimitiva, valor, linea, columna) {
        super(linea, columna);
        this._tipoPrimitiva = tipoPrimitiva;
        this._valor = valor;
        this._negativo = false;
        this._valorCasteo = null;
        this._valorAcceso = null;
    }
    get negativo() {
        return this._negativo;
    }
    set negativo(value) {
        this._negativo = value;
    }
    get tipoPrimitiva() {
        return this._tipoPrimitiva;
    }
    get valor() {
        return this._valor;
    }
    get valorCasteo() {
        return this._valorCasteo;
    }
    set valorCasteo(value) {
        this._valorCasteo = value;
    }
    get valorAcceso() {
        return this._valorAcceso;
    }
    set valorAcceso(value) {
        this._valorAcceso = value;
    }
    toString() {
        let cadenaSalida = "";
        if (this._tipoPrimitiva == TipoValor.arreglo) {
            if (this._valorCasteo != null) {
                cadenaSalida = this._valor + '[(' + this._valorCasteo.toString() + ')' + this._valorAcceso.toString() + ']';
            }
            else if (this._valorAcceso != null) {
                cadenaSalida = this._valor + '[' + this._valorAcceso.toString() + ']';
            }
        }
        else {
            cadenaSalida = this._valor;
        }
        if (this.negativo)
            cadenaSalida = "-" + cadenaSalida;
        return cadenaSalida;
    }
}
