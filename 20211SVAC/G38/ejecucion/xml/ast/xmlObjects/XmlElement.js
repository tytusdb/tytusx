"use strict";
class XmlElement extends XmlObjectAncestor {
    constructor(id, name, parent, line, column, childs, attributes) {
        super(id, name, parent, line, column);
        this._childs = (childs == undefined || childs == null) ? [] : childs;
        this._attributes = (attributes == undefined || attributes == null) ? [] : attributes;
    }
    get childs() {
        return this._childs;
    }
    set childs(value) {
        this._childs = value;
    }
    get attributes() {
        return this._attributes;
    }
    set attributes(value) {
        this._attributes = value;
    }
    getChildsTs(entornoRow) {
        var rows;
        var index = 1;
        if (this._childs == undefined || this._childs == null) {
            return [];
        }
        rows = [];
        for (let child of this._childs) {
            if (child == undefined || child == null) {
                continue;
            }
            rows = rows.concat(child.getTsScope(entornoRow, index));
            index = index + 1;
        }
        //entornoRow.sub_entorno = entornoRow.sub_entorno.concat(rows);
        return rows;
    }
    getAttributesTs(entornoRow) {
        var rows;
        var index = 1;
        if (this._attributes == undefined || this._attributes == null) {
            return [];
        }
        rows = [];
        for (let attribute of this._attributes) {
            if (attribute == undefined || attribute == null) {
                continue;
            }
            rows.push(new TsRow(attribute.name, index, attribute.name, attribute, new Tipo(TipoDato.atributo), this.name, entornoRow));
            index = index + 1;
        }
        //entornoRow.sub_entorno = entornoRow.sub_entorno.concat(rows);
        return rows;
    }
    /*
    OVERRIDE METHODS
     */
    getTsScope(scope, index) {
        var list = [];
        var attributes;
        var childs;
        var row = new TsRow(index == null ? this.name : this.name + '_' + index, index, this.name, this, new Tipo(TipoDato.objeto), (scope == null) ? "Global" : this.parent.getNameObject(), scope);
        attributes = this.getAttributesTs(row);
        childs = this.getChildsTs(row);
        list = list.concat(attributes);
        list = list.concat(childs);
        row.sub_entorno = list;
        return [row];
    }
    getStrAttributes() {
        let cad = '';
        for (let attribute of this._attributes) {
            cad += attribute.name + '="' + attribute.getValueString() + '"';
        }
        return cad;
    }
    getStrAst(nodoPadre) {
        var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
        var cadenaRoot = nombreRoot + "[" + 'label="Element:' + this.name + '",' + 'color="black",' + "];\n ";
        var cad = cadenaRoot + nodoPadre + "->" + nombreRoot + ";\n";
        if (this._childs != null) {
            for (let child of this._childs) {
                cad += child.getStrAst(nombreRoot);
            }
        }
        if (this._attributes != null) {
            for (let attribute of this._attributes) {
                cad += attribute.getStrAst(nombreRoot);
            }
        }
        return cad;
    }
    generateString_3d() {
        CodeUtil.printComment("Guardamos la etiqueta del tag ");
        var tmp = CodeUtil.generarTemporal();
        CodeUtil.printWithComment(tmp + " = RP + 0 ;", "Obtenemos inicio de cadena");
        for (let caracter of this.name) {
            CodeUtil.printWithComment("Repository[RP] = " + caracter.charCodeAt(0) + " ;", caracter);
            CodeUtil.print("RP = RP + 1 ;");
        }
        CodeUtil.printWithComment("Repository[RP] = -1 ;", "EOF");
        CodeUtil.print("RP = RP + 1 ;");
        return tmp;
    }
}
