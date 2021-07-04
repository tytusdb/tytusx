"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.If3D = void 0;
const Expresion3D_1 = require("../Expresiones3D/Expresion3D");
const Operacion3D_1 = require("../Expresiones3D/Operacion3D");
class If3D {
    constructor(tipo, condicion, gotoEtiqueta, codigo3d, fila, columna) {
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.codigo3D = codigo3d;
        this.condicion = condicion;
        this.gotoEtiqueta = gotoEtiqueta;
        this.eliminada = false;
        this.optimizada = false;
    }
    isOptimizada() {
        return this.optimizada;
    }
    setOptimizada(optimizada) {
        this.optimizada = optimizada;
    }
    isEliminada() {
        return this.eliminada;
    }
    setEliminada(eliminada) {
        this.eliminada = eliminada;
    }
    getTipoInstruccion() {
        return this.tipo;
    }
    negarCondicion() {
        if (this.condicion instanceof Operacion3D_1.Operacion3D) {
            let negada = this.condicion.negarCondicion();
            if (negada) {
                let x = new Operacion3D_1.Operacion3D(Expresion3D_1.TipoExpresion3D.OPERACION, negada, this.condicion.op_izq, this.condicion.op_der, this.condicion.codigo3D, -1, -1);
                let y = Object.create(x);
                this.condicion = Object.create(y);
                return y;
            }
        }
    }
    setCodigo3D(codigo) {
        this.codigo3D = codigo;
    }
    getCodigo3D() {
        this.codigo3D = "if (" + this.condicion.getCodigo3D() + ")";
        this.codigo3D += " " + this.gotoEtiqueta.getCodigo3D();
        return this.codigo3D;
    }
}
exports.If3D = If3D;
