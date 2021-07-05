"use strict";
class TablaSimbolosXquery {
    constructor(tsPadre, nombre) {
        this._tsPadre = tsPadre;
        this._nombre = nombre;
        this._listaSimbolos = [];
        this._esGlobal = nombre == 'GLOBAL' ? true : false;
    }
    agregarSimbolo(simbolo) {
        if (!this.existeSimbolo(simbolo)) {
            simbolo.offset = this._listaSimbolos.length;
            this._listaSimbolos.push(simbolo);
            return true;
        }
        return false;
    }
    existeSimbolo(simbolo) {
        for (let actual of this._listaSimbolos) {
            if (actual.equals(simbolo))
                return true;
        }
        return false;
    }
    modificarSimbolo(simbolo) {
        for (let actual = this; actual != null; actual = actual.tsPadre) {
            if (actual.modifySimbol(simbolo)) {
                return true;
            }
        }
        return false;
    }
    modifySimbol(simbolo) {
        let i = 0;
        for (let actual of this._listaSimbolos) {
            if (actual.equals(simbolo)) {
                this._listaSimbolos[i] = simbolo;
                return true;
            }
            i++;
        }
        return false;
    }
    obtenerSimbolo(identifier) {
        let simbolo;
        for (let actual = this; actual != null; actual = actual.tsPadre) {
            simbolo = actual.getSimbolo(identifier);
            if (simbolo != null) {
                return simbolo;
            }
        }
        return null;
    }
    getSimbolo(identifier) {
        for (let actual of this._listaSimbolos) {
            if (actual.identificador == identifier)
                return actual;
        }
        return null;
    }
    obtenerTablaGlobal() {
        for (let actual = this; actual != null; actual = actual.tsPadre) {
            if (actual.esGlobal) {
                return actual;
            }
        }
        return null;
    }
    /*
    todo: Agregar la carga xml a la tabla de simbolos
    public cargarElementosXml():TablaSimbolosXquery{
        this.listaSimbolos.push(new Simbolo("$$Ts",new Tipo(TipoDato.objeto),null,null));
        this.listaSimbolos.push(new Simbolo("$$Ts",new Tipo(TipoDato.xpathValue),null,null));
        return this;
    }*/
    get tsPadre() {
        return this._tsPadre;
    }
    set tsPadre(value) {
        this._tsPadre = value;
    }
    get nombre() {
        return this._nombre;
    }
    set nombre(value) {
        this._nombre = value;
    }
    get listaSimbolos() {
        return this._listaSimbolos;
    }
    set listaSimbolos(value) {
        this._listaSimbolos = value;
    }
    get esGlobal() {
        return this._esGlobal;
    }
    set esGlobal(value) {
        this._esGlobal = value;
    }
}
