export class Variable {
    constructor(tipo, codigo3D, fila, columna) {
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.codigo3Dir = codigo3D;
    }
    getCodigo3Dir() {
        return this.codigo3Dir;
    }
    setCodigo3Dir(codigo) {
        this.codigo3Dir = codigo;
    }
    optimizar() {
    }
}
