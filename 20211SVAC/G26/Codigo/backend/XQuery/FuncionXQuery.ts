import { Entorno } from "../AST/Entorno";
import { Instruccion } from "../Interfaz/instruccion";
import { Nodo } from "../XPath/Nodo";


export class FuncionXQuery implements Instruccion{
    linea: number;
    columna: number;
    tipo: TipoFuncionXQ;
    identificador: string;
    listaNodos: Array<Nodo>;
    desde: number | undefined;
    hasta: number | undefined;
    constructor(tipoFuncion: TipoFuncionXQ, identificador: string, listaNodos: Array<Nodo>, linea: number, columna: number, desde?: number, hasta?: number){
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipoFuncion;
        this.identificador = identificador;
        this.listaNodos = listaNodos;
        this.desde = desde;
        this.hasta = hasta;
    }

    public getTipo(){
        return this.tipo;
    }
    ejecutar(ent: Entorno){

    }
}

export enum TipoFuncionXQ{
    UPPERCASE,
    SUBSTRING,
    DATA
}