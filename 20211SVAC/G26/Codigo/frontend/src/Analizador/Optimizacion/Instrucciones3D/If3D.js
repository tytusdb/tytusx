import { TipoExpresion3D } from "../Expresiones3D/Expresion3D";
import { Operacion3D } from "../Expresiones3D/Operacion3D";
export class If3D {
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
        if (this.condicion instanceof Operacion3D) {
            let negada = this.condicion.negarCondicion();
            if (negada) {
                let x = new Operacion3D(TipoExpresion3D.OPERACION, negada, this.condicion.op_izq, this.condicion.op_der, this.condicion.codigo3D, -1, -1);
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
