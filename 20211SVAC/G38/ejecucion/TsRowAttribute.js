"use strict";
class TsRowAttribute extends TsRow {
    constructor(tsRow) {
        super(tsRow.identificador, tsRow.indice, tsRow.nombreElemento, tsRow.nodo, tsRow.tipo, tsRow.entorno, tsRow.entorno_row);
        this._valueAttribute = (this.nodo == undefined || this.nodo == null) ? "" : this.nodo.getValueString();
    }
    toStr(tab) {
        return tab + "\t" + this._valueAttribute + "\n";
    }
    get valueAttribute() {
        return this._valueAttribute;
    }
    set valueAttribute(value) {
        this._valueAttribute = value;
    }
}
