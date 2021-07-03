import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Instruccion } from "../Interfaces/Instruccion";
import { Tipo } from "../AST/Tipo"
const { parse } = require('../../analizadorXPath/Xpath')
const grammar = require('../../analizadorXML/grammar')
 
export class Let implements Instruccion {
    linea: number;
    columna: number;
    public valor: any;
    public identificador: string;

    constructor(linea: number, columna: number, valor: any, identificador: string) {
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
        this.identificador = identificador;
    }

    ejecutar(ent: Entorno) {

        //creamos una variable en la tabla de simbolos del entorno FLWOR y le mandamos el objeto como valor  
        var new_simbol = new Simbolo(this.identificador, this.valor.getTipo(ent), this.linea, this.columna, this.valor.getValorImplicito(ent))
        //se agrega el simbolo al entorno
        ent.agregar(new_simbol);

    }

}