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
    agregarSimboloAlInicio(simbolo) {
        this._listaSimbolos.unshift(simbolo);
        this.actualizarOffsetSimbolos();
    }
    actualizarOffsetSimbolos() {
        for (let iSimbolo in this._listaSimbolos) {
            this._listaSimbolos[iSimbolo].offset = +iSimbolo;
        }
    }
    borrarValoresInterprete() {
        for (let iSimbolo in this._listaSimbolos) {
            this._listaSimbolos[iSimbolo].valorXpath = null;
        }
    }
    existeSimbolo(simbolo) {
        for (let actual of this._listaSimbolos) {
            if (actual.existe(simbolo))
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
    cargarElementosXml() {
        this.agregarSimboloAlInicio(new Simbolo("$$LTs", new Tipo(TipoDato.xpathValue), null, null));
        this.agregarSimboloAlInicio(new Simbolo("$$Ts", new Tipo(TipoDato.objeto), null, null));
    }
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
    getHtmlTable() {
        let cad = '<cite style="font-size:x-large;">REPORTE DE TABLA DE SIMBOLOS XQUERY</cite><br/>'
            + '<table border="1">'
            + '<tr>'
            + '<th>NOMBRE</th><th>TIPO</th><th>VALOR</th><th>POSICION</th><th>ENTORNO</th><th>TAMAÑO</th> '
            + '</tr>';
        if (this._listaSimbolos != undefined && this._listaSimbolos != null && this._listaSimbolos.length != 0) {
            for (let simbolo of this.listaSimbolos) {
                cad += simbolo.toString();
            }
        }
        cad += '</table>';
        return cad;
    }
}
