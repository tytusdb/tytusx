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
    getStrAst(nodoPadre) {
        var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
        var cadenaRoot = nombreRoot + "[" + 'label="Attribute:' + this.name + "=" + this._value + '",' + 'color="lightblue3",' + "];\n ";
        var cad = cadenaRoot + nodoPadre + "->" + nombreRoot + ";\n";
        return cad;
    }
    generateString_3d() {
        CodeUtil.printComment("Guardamos el nombre del atributo ");
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
    generateValueString_3d() {
        CodeUtil.printComment("Guardamos el valor del atributo ");
        var tmp = CodeUtil.generarTemporal();
        CodeUtil.printWithComment(tmp + " = RP + 0 ;", "Obtenemos inicio de cadena");
        for (let caracter of this._value) {
            CodeUtil.printWithComment("Repository[RP] = " + caracter.charCodeAt(0) + " ;", caracter);
            CodeUtil.print("RP = RP + 1 ;");
        }
        CodeUtil.printWithComment("Repository[RP] = -1 ;", "EOF");
        CodeUtil.print("RP = RP + 1 ;");
        return tmp;
    }
}
