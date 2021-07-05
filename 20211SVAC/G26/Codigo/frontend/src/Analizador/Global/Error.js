export default class mierror {
    constructor(tipoError, descripcion, linea, columna) {
        this.tipoError = tipoError;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo() {
        return this.tipoError;
    }
    getDescripcion() {
        return this.descripcion;
    }
    getLinea() {
        return this.linea;
    }
    getColumna() {
        return this.columna;
    }
    getMensaje() {
        return ('Error ' + this.tipoError + ': ' +
            this.descripcion +
            ' en la linea ' + this.linea +
            ' y columna ' + this.columna);
    }
}
