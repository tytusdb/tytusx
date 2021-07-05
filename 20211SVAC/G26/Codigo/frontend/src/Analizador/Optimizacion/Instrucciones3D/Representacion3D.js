/*
**  CLASE AUXILIAR PARA MEJORAR EL REPORTE DE OPTIMIZACION
** SERVIRA PARA ENVIAR REPRESENTACIONES DE TIPO '<instrucciones L2>'
** Para acortar el codigo eliminado y mejorado (asi no se incluye literalmente las instrucciones)
*/
export class Representacion3D {
    constructor(tipo, codigo3D, fila, columna) {
        this.codigo3D = codigo3D;
        this.tipo = tipo;
        this.fila = fila;
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
