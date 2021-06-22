export class Simbolo{
    identificador:string;
    valor:string;
    linea: number;
    columna: number;
    pos: number;
    last: number;
    SP_ID:number;
    SP_VAL:number;

    constructor(id:string, valor:string, linea:number, columna:number){
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.pos = -1;
        this.last = -1;
        this.SP_ID = -1;
        this.SP_VAL = -1;
    }




}