export default class mierror{
    private tipoError: string;
    private descripcion:string;
    private linea: number;
    private columna: number;

    constructor(tipoError:string, descripcion:string, linea: number, columna:number){
        this.tipoError = tipoError;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(){
        return this.tipoError;
    }

    getDescripcion(){
        return this.descripcion;
    }

    getLinea(){
        return this.linea;
    }

    getColumna(){
        return this.columna;
    }
    
    getMensaje(){
        return ('Error ' + this.tipoError + ': ' + 
                this.descripcion + 
                ' en la linea ' + this.linea + 
                ' y columna ' + this.columna);
    }
}