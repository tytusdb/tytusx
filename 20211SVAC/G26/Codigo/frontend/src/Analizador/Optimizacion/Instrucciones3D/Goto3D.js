export class Goto3D {
    constructor(tipo, identificador, codigo3d, fila, columna) {
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.codigo3D = codigo3d;
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
    changeReferencia(nuevoId) {
        this.identificador = nuevoId;
    }
    getReferencia() {
        return this.identificador;
    }
    setCodigo3D(codigo) {
        this.codigo3D = codigo;
    }
    getCodigo3D() {
        this.codigo3D = "goto " + this.identificador + ";";
        return this.codigo3D;
    }
}
