"use strict";
class XmlAttribute extends XmlObjectAncestor {
    constructor(nombre, valor, parent, line, column) {
        super("", nombre, parent, line, column);
        this._value = valor.substr(1, valor.length - 2);
        this._value = XpathUtil.procesarCaracteresEspeciales(this._value);
        this._type = (this.isNumber(this._value)) ? new Tipo(TipoDato.numero) :
            (this.isBoolean(this._value)) ? new Tipo(TipoDato.booleano) :
                new Tipo(TipoDato.cadena);
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
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    getValueString() {
        return this._value;
    }
    isAttribute() {
        return true;
    }
}
