"use strict";
class XmlAttribute extends XmlObjectAncestor {
    constructor(nombre, valor, parent, line, column) {
        super("", nombre, parent, line, column);
        this._value = valor.substr(1, valor.length - 2);
        this._value = XpathUtil.procesarCaracteresEspeciales(this._value);
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    getValueString() {
        return this._value;
    }
    isAttribute() {
        return true;
    }
}
