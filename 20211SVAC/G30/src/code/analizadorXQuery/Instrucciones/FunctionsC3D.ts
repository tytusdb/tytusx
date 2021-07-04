import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Instruccion } from "../Interfaces/Instruccion";
import { Tipo } from "../AST/Tipo"
const { parse } = require('../../analizadorXPath/Xpath')
const grammar = require('../../analizadorXML/grammar')

export class FunctionsC3D implements Instruccion {
    linea: number;
    columna: number;
    public salida: string;
    public identificador: string;

    constructor(linea: number, columna: number, salida: any, identificador: string) {
        this.linea = linea;
        this.columna = columna;
        this.salida = salida;
        this.identificador = identificador;
    }

    ejecutar(ent: Entorno): any {

        this.salida += ''

    }
    //obtener contador
    GetCountStorage(): number {
        var data = localStorage.getItem('contador');
        return Number(JSON.parse(data));
    }
    //actualizar contador
    SetStorage(contador: number) {
        localStorage.setItem('contador', JSON.stringify(contador));
    }


}