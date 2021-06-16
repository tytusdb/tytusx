import mierror from './Error';

class ListaError{
    private static _instance: ListaError;
    listaError: Array<mierror>;

    constructor(){
        this.listaError = new Array<mierror>();

        if (typeof ListaError._instance === "object"){
            return ListaError._instance;
        }
        ListaError._instance = this;
        return this;
    }

    public static getInstance() {
        return this._instance;
    }

    agregarError(tipo:string, descripcion:string, linea:number, columna:number){
        this.listaError.push(new mierror(tipo, descripcion, linea, columna));
    }

    getSize(){
        return this.listaError.length;
    }

    getError(indice:number){
        return this.listaError[indice];
    }

    limpiar(){
        this.listaError = [];
    }
}

const errores = new ListaError();

export default errores;