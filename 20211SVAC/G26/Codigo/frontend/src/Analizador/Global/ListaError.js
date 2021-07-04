import mierror from './Error';
class ListaError {
    constructor() {
        this.listaError = new Array();
        if (typeof ListaError._instance === "object") {
            return ListaError._instance;
        }
        ListaError._instance = this;
        return this;
    }
    static getInstance() {
        return this._instance;
    }
    agregarError(tipo, descripcion, linea, columna) {
        this.listaError.push(new mierror(tipo, descripcion, linea, columna));
    }
    getSize() {
        return this.listaError.length;
    }
    getError(indice) {
        return this.listaError[indice];
    }
    limpiar() {
        this.listaError = [];
    }
}
const errores = new ListaError();
export default errores;
