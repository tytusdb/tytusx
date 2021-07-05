"use strict";
class SaltoC3D extends Codigo3d {
    constructor(etiquetaSalto, linea, columna) {
        super(linea, columna);
        this._etiquetaSalto = etiquetaSalto;
    }
    set etiquetaSalto(value) {
        this._etiquetaSalto = value;
    }
    get etiquetaSalto() {
        return this._etiquetaSalto;
    }
    regla1() {
        return this._etiquetaSalto;
    }
    toString() {
        return "goto " + this._etiquetaSalto + ";\n";
    }
}
