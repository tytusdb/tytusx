export class Etiqueta3D {
    constructor(tipo, identificador, codigo3d, fila, columna) {
        this.tipo = tipo;
        this.fila = fila;
        this.identificador = identificador;
        this.codigo3D = codigo3d;
        this.columna = columna;
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
    getCodigo3D() {
        return this.codigo3D;
    }
    setCodigo3D(codigo) {
        this.codigo3D = codigo;
    }
    getTipoInstruccion() {
        return this.tipo;
    }
}
