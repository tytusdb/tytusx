"use strict";
class XmlObjectAncestor {
    constructor(id, name, parent, line, column) {
        this._id = XpathUtil.generarIdUnicoXmlNode();
        this._name = name;
        this._parent = parent;
        this._line = line;
        this._column = column;
    }
    /*
    GETTERS AND SETTERS
     */
    get line() {
        return this._line;
    }
    set line(value) {
        this._line = value;
    }
    get column() {
        return this._column;
    }
    set column(value) {
        this._column = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get parent() {
        return this._parent;
    }
    set parent(value) {
        this._parent = value;
    }
    /*
    OVERRIDE METHODS
     */
    getTsScope(scope, index) {
        throw new Error("Method not implemented.");
    }
    getNameObject() {
        return this._name;
    }
    getValueString() {
        return "";
    }
    isContent() {
        return false;
    }
    getStrAttributes() {
        return "";
    }
    isAttribute() {
        return false;
    }
}
