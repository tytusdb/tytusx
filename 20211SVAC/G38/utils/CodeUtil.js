"use strict";
class CodeUtil {
    constructor() {
    }
    static init() {
        this._cadSalida = "";
        this._sp = 0;
        this._hp = 0;
        this._rp = 0;
        this._temporal = 0;
        this.initCad();
    }
    static printWithComment(cadena, comentario) {
        CodeUtil._cadSalida += cadena + ((comentario == null) ? "" : "\t\t\t//" + comentario) + "\n";
    }
    static print(cadena) {
        CodeUtil._cadSalida += cadena + "\n";
    }
    static printComment(comentario) {
        CodeUtil._cadSalida += "//" + comentario + "\n";
    }
    static initCad() {
        this._cadSalida = "";
        this._cadSalida += "float Heap[1000000]; //estructura heap\n";
        this._cadSalida += "float Stack[1000000]; //estructura stack\n";
        this._cadSalida += "float Repository[2000000]; //estructura repository\n";
        this._cadSalida += "int SP=0;\n";
        this._cadSalida += "int HP=0;\n";
        this._cadSalida += "int RP=0;\n";
        CodeUtil.print("");
    }
    static getDefinitionTemps() {
        var cadFinal = "";
        var cad = "float ";
        for (var _i = 0; _i <= this._temporal; _i++) {
            cad += (cad == "float ") ? "" : ",";
            cad += " t" + _i;
            if (cad.length > 150) {
                cadFinal += cad + ";\n";
                cad = "float ";
            }
        }
        cad += ";";
        cadFinal += cad;
        return cadFinal;
    }
    static generarTemporal() {
        var temporal = "t" + this._temporal;
        this._temporal += 1;
        return temporal;
    }
    static crearMain() {
        CodeUtil.print("int main()");
        CodeUtil.print("{");
        CodeUtil.print(CodeUtil.METHOD_CARGARXML + ";");
        CodeUtil.print("}");
    }
    static createTemps() {
        this._cadSalida = this.getDefinitionTemps() + "\n" + this._cadSalida;
    }
    static createLibs() {
        this._cadSalida = "#include <stdio.h>\n\n" + this._cadSalida;
    }
    static finalizeCad() {
        CodeUtil.crearMain();
        CodeUtil.createTemps();
        CodeUtil.createLibs();
    }
}
CodeUtil.METHOD_CARGARXML = "cargarXml()";
CodeUtil._cadSalida = "";
