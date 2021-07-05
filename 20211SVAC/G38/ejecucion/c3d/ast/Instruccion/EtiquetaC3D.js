"use strict";
class EtiquetaC3D extends Codigo3d {
    constructor(etiqueta, linea, columna) {
        super(linea, columna);
        this._etiqueta = etiqueta;
    }
    get etiqueta() {
        return this._etiqueta;
    }
    toString() {
        return this._etiqueta + ":\n";
    }
}
