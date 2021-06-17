export enum Tipo{
    ACCESO,
    ATRIBUTO,
    TEST,
    SIGNO
}

export class Acceso{
    valor : string;
    tipo: Tipo;
    linea : number;
    columna : number;

    constructor(valor:string, tipo:Tipo,linea:number,columna:number){
        this.valor=valor;
        this.tipo=tipo;
        this.linea=linea;
        this.columna=columna;
    }
}