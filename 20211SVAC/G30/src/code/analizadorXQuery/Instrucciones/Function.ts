import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Instruccion } from "../Interfaces/Instruccion";
import { Tipo } from "../AST/Tipo"
const { parse } = require('../../analizadorXPath/Xpath')
const grammar = require('../../analizadorXML/grammar')
 
export class Function implements Instruccion {
    linea: number;
    columna: number;
    public variables: Array<any>;
    public identificador: string;
    public valor: any;
    public tipo: string;

    constructor(variables: Array<any>, identificador: string, valor: any, tipo: string, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.variables = variables;
        this.identificador = identificador;
        this.valor = valor;
        this.tipo = tipo;
    }

    ejecutar(ent: Entorno):any {
        return this.valor.getValorImplicito(ent);
    }

    getVariables(){
        return this.variables;
    }

}