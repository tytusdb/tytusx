"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodoCST = void 0;
class nodoCST {
    //mierda:[] = [];
    constructor(id, label) {
        this.idPadre = id;
        this.label = label.replace(/"/g, ''); // eliminar "
        this.hijos = []; // inicializamos el arreglo en vacio
    }
    generarDotString() {
        var _a;
        let stringDot = `${this.idPadre}[label = "${this.label}"]\n`;
        (_a = this.hijos) === null || _a === void 0 ? void 0 : _a.forEach(e => {
            console.log("INGRESO?", this.idPadre);
            stringDot += e.generarDotString();
            stringDot += `${this.idPadre}->${e.idPadre}; `;
        });
        return stringDot;
    }
}
exports.nodoCST = nodoCST;
