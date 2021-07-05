import { TipoInstruccion3D } from "./Instruccion3D";
export class Asignacion3D {
    constructor(tipo, identificador, expresion, codigo3d, fila, columna) {
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.codigo3D = codigo3d;
        this.expresion = expresion;
        this.identificador = identificador;
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
    setCodigo3D(codigo) {
        this.codigo3D = codigo;
    }
    getCodigo3D() {
        if (this.tipo === TipoInstruccion3D.ASIGNORMAL) {
            this.codigo3D = this.identificador + " = " + this.expresion.getCodigo3D() + ";";
        }
        return this.codigo3D;
    }
}
