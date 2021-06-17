export class RError{
    columna:number;
    fila:number;
    descripcion:string;
    tipo:string;

    constructor(columna:number, fila:number, tipo:string, descripcion:string) {
        this.columna = columna;
        this.fila = fila;
        this.tipo = tipo;
        this.descripcion = descripcion;
    }
}