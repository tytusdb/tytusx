"use strict";
class Simbolo {
    constructor(identificador, tipo, valorPrimitvo, valorXpath) {
        this._identificador = identificador;
        this._tipo = tipo;
        this._valorPrimitvo = valorPrimitvo;
        this._valorXpath = valorXpath;
    }
    get identificador() {
        return this._identificador;
    }
    set identificador(value) {
        this._identificador = value;
    }
    get tipo() {
        return this._tipo;
    }
    set tipo(value) {
        this._tipo = value;
    }
    get valorPrimitvo() {
        return this._valorPrimitvo;
    }
    set valorPrimitvo(value) {
        this._valorPrimitvo = value;
    }
    get valorXpath() {
        return this._valorXpath;
    }
    set valorXpath(value) {
        this._valorXpath = value;
    }
    equals(simbolo) {
        if (this.identificador != null && simbolo.identificador != null &&
            this.identificador == simbolo.identificador &&
            this.tipo != null && simbolo.tipo != null &&
            this.tipo.equals(simbolo.tipo)) {
            return true;
        }
        return false;
    }
}
