export class Simbolo{
    identificador:string;
    valor:string;
    linea: number;
    columna: number;
    pos: number;

    constructor(id:string, valor:string, linea:number, columna:number){
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.pos = -1;
    }

    public setPos(pos :number){
        this.pos = pos;
    }

}