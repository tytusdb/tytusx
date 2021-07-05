import { Retorno } from "../../Interfaces/ExpressionXquery";

export class SimboloXquery{
    identificador:string;
    valor:Retorno;
    linea: Number;
    columna: Number;

    constructor(id:string, valor:Retorno, linea:Number, columna:Number){
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }
}