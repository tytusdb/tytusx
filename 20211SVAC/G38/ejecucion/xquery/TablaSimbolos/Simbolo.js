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
    existe(simbolo) {
        if (this.identificador != null && simbolo.identificador != null &&
            this.identificador == simbolo.identificador) {
            return true;
        }
        return false;
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
    get offset() {
        return this._offset;
    }
    set offset(value) {
        this._offset = value;
    }
    toString() {
        let valor = this.valorPrimitvo == null ? " " : this.valorPrimitvo;
        return "<tr>\n" +
            "<td style=\"font-size: 15px;  ;\"  align=rigth><p>" + this.identificador + "</p></td>\n" +
            "<td style=\"font-size: 15px;  ;\"  align=left><p>" + this.tipo.toString() + "</p></td>\n" +
            "<td style=\"font-size: 15px;  ;\"  align=left><p>" + valor + "</p></td>\n" +
            "<td style=\"font-size: 15px;  ;\"  align=left><p>" + this.offset + "</p></td>\n" +
            "<td style=\"font-size: 15px;  ;\"  align=left><p> GLOBAL </p></td>\n" +
            "<td style=\"font-size: 15px;  ;\"  align=left><p> 1 </p></td>\n" +
            "</tr>";
    }
}
