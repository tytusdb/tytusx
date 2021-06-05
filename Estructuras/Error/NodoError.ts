class NodoError
{
    lexema : string;
    tipoerror : string;
    descripcion : string;
    linea : number;
    columna : number;
    lenguaje : string;
    constructor(lexema:string, tipoerror:string, descripcion:string, lenguaje:string, linea:number, columna:number){
        this.lenguaje = lenguaje;
        this.lexema = lexema;
        this.tipoerror = tipoerror;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;        
    }
}