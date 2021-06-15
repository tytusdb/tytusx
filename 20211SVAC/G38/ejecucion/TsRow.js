"use strict";
class TsRow {
    constructor(identificador, indice, nombreElemento, nodo, tipo, entorno, entorno_row) {
        this._identificador = identificador;
        this._indice = indice;
        this._nombreElemento = nombreElemento;
        this._nodo = nodo;
        this._tipo = (nodo instanceof XmlRoot) ? new Tipo(TipoDato.global) : tipo;
        this._entorno = entorno;
        this._entorno_row = entorno_row;
        this._sub_entorno = [];
    }
    contieneTexto() {
        let contieneTexto = false;
        if (this._sub_entorno !== undefined && this._sub_entorno !== null) {
            for (let row of this.sub_entorno) {
                if (row.tipo.esPrimitivo()) {
                    contieneTexto = true;
                    break;
                }
            }
        }
        return contieneTexto;
    }
    toStr(tab) {
        if (this._nodo.isContent()) {
            return tab + "\t" + this.nodo.getValueString();
        }
        else if (this._nodo.isAttribute()) {
            return "";
        }
        else {
            let cadena = tab + '<' + this._nombreElemento + " " + this.getStrAttributes() + ' > \n';
            for (let sub_rob of this._sub_entorno) {
                cadena += sub_rob.toStr(tab + "\t");
            }
            cadena += '\n' + tab + '</' + this._nombreElemento + '> \n';
            return cadena;
        }
    }
    getStrAttributes() {
        let cad = this._nodo.getStrAttributes();
        return cad;
    }
    toString() {
        return this._nombreElemento;
    }
    get identificador() {
        return this._identificador;
    }
    set identificador(value) {
        this._identificador = value;
    }
    get indice() {
        return this._indice;
    }
    set indice(value) {
        this._indice = value;
    }
    get nombreElemento() {
        return this._nombreElemento;
    }
    set nombreElemento(value) {
        this._nombreElemento = value;
    }
    get nodo() {
        return this._nodo;
    }
    set nodo(value) {
        this._nodo = value;
    }
    get tipo() {
        return this._tipo;
    }
    set tipo(value) {
        this._tipo = value;
    }
    get entorno() {
        return this._entorno;
    }
    set entorno(value) {
        this._entorno = value;
    }
    get entorno_row() {
        return this._entorno_row;
    }
    set entorno_row(value) {
        this._entorno_row = value;
    }
    get sub_entorno() {
        return this._sub_entorno;
    }
    set sub_entorno(value) {
        this._sub_entorno = value;
    }
    obtenerTablaSimbolos() {
        let ts = new TablaSimbolos(null);
        if (this._sub_entorno !== undefined && this._sub_entorno !== null)
            ts.listaSimbolos = this._sub_entorno;
        return ts;
    }
    getObjectsInRowByNombreElemento(nombreElemento) {
        let result = [];
        if (this._nodo instanceof XmlAttribute || this._nodo instanceof XmlContent) {
            return result;
        }
        if (this._nombreElemento == nombreElemento) {
            result.push(this);
        }
        if (this._sub_entorno == null || this._sub_entorno.length == 0) {
            return result;
        }
        for (let sub_row of this._sub_entorno) {
            result = result.concat(sub_row.getObjectsInRowByNombreElemento(nombreElemento));
        }
        return result;
    }
    getSubObjectsInRow() {
        let result = [];
        if (!(this._nodo instanceof XmlElement)) {
            return result;
        }
        if (this._sub_entorno == undefined || this._sub_entorno == null || this._sub_entorno.length == 0) {
            return result;
        }
        for (let sub_row of this._sub_entorno) {
            if (sub_row._nodo instanceof XmlContent || sub_row._nodo instanceof XmlAttribute) {
                return result;
            }
            result.push(sub_row);
            result = result.concat(sub_row.getSubObjectsInRow());
        }
        return result;
    }
    isEqual(tsRow) {
        if (tsRow == undefined || tsRow == null) {
            return false;
        }
        if (this._nombreElemento != tsRow._nombreElemento) {
            return false;
        }
        if (this._indice != tsRow._indice) {
            return false;
        }
        if (this._sub_entorno != null && tsRow.sub_entorno == null
            || this.sub_entorno == null && tsRow.sub_entorno != null) {
            return false;
        }
        if (this.sub_entorno == null || tsRow.sub_entorno == null) {
            return true;
        }
        if (this.sub_entorno.length != tsRow.sub_entorno.length) {
            return false;
        }
        for (let i in this._sub_entorno) {
            let thisSubRow = this._sub_entorno[i];
            let subRow = tsRow._sub_entorno[i];
            if (!thisSubRow.isEqual(subRow)) {
                return false;
            }
        }
        return true;
    }
}
