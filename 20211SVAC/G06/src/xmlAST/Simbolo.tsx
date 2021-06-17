export class Simbolo{
    identificador:string;
    valor:string;
    linea: number;
    columna: number;
    pos: number;
    last: number;

    constructor(id:string, valor:string, linea:number, columna:number){
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.pos = -1;
        this.last = -1; 
    }

}