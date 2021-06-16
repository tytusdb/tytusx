"use strict";
class XmlContent extends XmlObjectAncestor {
    constructor(id, name, parent, line, column, value) {
        super(id, "Contenido", parent, line, column);
        this._value = XpathUtil.procesarCaracteresEspeciales(value);
        this._type = (this.isNumber(value)) ? new Tipo(TipoDato.numero) :
            (this.isBoolean(value)) ? new Tipo(TipoDato.booleano) :
                new Tipo(TipoDato.cadena);
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    isNumber(value) {
        var number = parseInt(value);
        return !isNaN(number);
    }
    isBoolean(value) {
        if (value == undefined || value == null) {
            return false;
        }
        var boolean = value.toUpperCase().trim();
        return boolean == 'TRUE' || boolean == "FALSE";
    }
    /*
    OVERRIDE METHODS
     */
    getTsScope(scope, index) {
        var rows = [];
        rows.push(new TsRow(this.name, index, this.name, this, this._type, this.parent.getNameObject(), scope));
        return rows;
    }
    getValueString() {
        return this._value;
    }
    isContent() {
        return true;
    }
}
