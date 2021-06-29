import { Entorno } from "../AST/Entorno";
import { Instruccion } from "../Interfaz/instruccion";
import { Consulta } from "../XPath/Consulta";

export class DeclaracionFor implements Instruccion{
    linea: number;
    columna: number;
    tipo: TipoFor;
    identificador: string;
    consultas: Array<Consulta> | null;
    desde: number | undefined; 
    hasta: number  | undefined;
    at: string | undefined;
    constructor(tipo: TipoFor, identificador: string, consultas: Array<Consulta>, linea: number, columna: number, at?: string|undefined, desde?:number, hasta?:number){
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.identificador = identificador;
        this.consultas = consultas;
        this.desde = desde;
        this.hasta = hasta;
        this.at = at;
    }

    getTipo(): TipoFor{
        return this.tipo;
    }

    TipoToString(): String{
        switch(this.tipo){
            case TipoFor.NORMAL:
                return "Normal";
            case TipoFor.ITERATIVO:
                return "Iterativo";
            case TipoFor.AT:
                return "At";
        }
    }

    ejecutar(ent: Entorno){
        switch(this.tipo){
            case TipoFor.NORMAL:
                
                break;
            case TipoFor.ITERATIVO:
                break;
            case TipoFor.AT:
                break;
        }
    }
}

export enum TipoFor{
    NORMAL,
    ITERATIVO,
    AT
}