import { TipoDato } from "./TipoDato";

export class Simbolo {
    public id: string;
    private tipo: TipoDato;
    private valor: any;
    fila: number;
    columna: number;
    entorno: Array<Simbolo>;
    indice: String;

    constructor( id:string,tipo:TipoDato, valor:any, fila:number, columna:number, indice?: Number){
        this.id = id;
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
        this.entorno = [];
        if ('undefined' === typeof indice) {
            this.indice = '';
        } else {
            this.indice = indice.toString();
        }
    }

    getTipo(): TipoDato {
        return this.tipo;
    }
    getValorImplicito() {
        return this.valor;
    }
    
}
