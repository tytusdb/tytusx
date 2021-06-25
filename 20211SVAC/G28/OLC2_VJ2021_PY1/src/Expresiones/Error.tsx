export class Error {
    Tipo: string;
    Lexema: string;
    Descripcion: string;
    Fila: any
    Columna: any;

    constructor(Tipo:string, Lexema:string, Descripcion:string, Fila:any, Columna:any) {
        this.Tipo = Tipo;
        this.Lexema = Lexema;
        this.Descripcion = Descripcion;
        this.Fila = Fila;
        this.Columna = Columna;
    }
}