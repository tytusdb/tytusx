import { Entorno } from "../AST/Entorno";
import { Instruccion } from "../Interfaz/instruccion";
import { Consulta } from "../XPath/Consulta";


export class Let implements Instruccion{
    linea: number;
    columna: number;
    consultas: Array<Consulta> | null;
    identifier: string;
    desde: number | undefined;
    hasta: number | undefined;
    constructor(identifier: string, consultas: Array<Consulta> | null, linea: number, columna: number, desde?:string, hasta?:string){
        this.linea = linea;
        this.columna = columna;
        this.consultas = consultas;
        this.identifier = identifier;
        if(desde != undefined && hasta != undefined){
            this.desde = +desde;
            this.hasta = +hasta;
        }

    }

    ejecutar(ent: Entorno){

    }
}