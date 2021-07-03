import { exception } from "console";

export class Error  {
    public linea:number;
    public columna:number;
    public mensaje:string;
    private tipo:string;

    constructor(linea:number, columna:number, mensaje:string, tipo:string){

        this.linea = linea;
        this.columna = columna;
        this.mensaje = mensaje;
        this.tipo = tipo;
    }

    public ToString():string{
        return ""
    }
}