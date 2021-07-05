import errores from '../Global/ListaError';
import {Simbolo} from '../AST/Simbolo';
import { InstruccionXQuery } from '../Interfaz/instruccionXQuery';
import { Entorno } from '../AST/Entorno';

export class UserFunction implements InstruccionXQuery{
    tipo: any;
    nombre: string;
    parametros: any;
    instrucciones: any;
    linea: number;
    columna: number;

    constructor(tipo:any, nombre: string, parametros: any, instrucciones: any, linea:number, columna:number){
        this.tipo = tipo;
        this.nombre = nombre;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entornoXQuery: Entorno, entornoXML: Entorno) {
        throw new Error('Method not implemented.');
    }
    
}