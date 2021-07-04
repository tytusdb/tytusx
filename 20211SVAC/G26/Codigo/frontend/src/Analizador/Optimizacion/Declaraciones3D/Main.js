"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
class Main {
    constructor(tipo, listaInstrucciones, codigo3D, fila, columna) {
        this.fila = fila;
        this.codigo3Dir = codigo3D;
        this.columna = columna;
        this.tipo = tipo;
        this.listaInstrucciones = listaInstrucciones;
    }
    getCodigo3Dir() {
        let auxCode = "void main() {\n";
        this.listaInstrucciones.forEach((instruccion) => {
            auxCode += "    " + instruccion.getCodigo3D() + "\n";
        });
        auxCode += "}";
        return auxCode;
    }
    setCodigo3Dir(codigo) {
        this.codigo3Dir = codigo;
    }
    optimizar() {
        return "";
    }
}
exports.Main = Main;
