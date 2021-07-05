"use strict";
class ConsolaUtil {
    constructor() {
    }
    static print(cadena, comentario) {
        ConsolaUtil._cadSalida + cadena + (comentario == null) ? "" : "\t\t\t//" + comentario + "\n";
    }
    static printComment(comentario) {
        ConsolaUtil._cadSalida + "//" + comentario + "\n";
    }
    static initCad() {
        this._cadSalida = "";
        this._cadSalida += "#include <stdio.h>\n\n";
        this._cadSalida += "Float Heap[1000000]; //estructura heap\n";
        this._cadSalida += "Float Stack[1000000]; //estructura stack\n";
        this._cadSalida += "Float SP;\n";
        this._cadSalida += "Float HP;\n";
    }
}
ConsolaUtil._cadSalida = "";
