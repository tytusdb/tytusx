import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Instruccion } from "../Interfaces/Instruccion";
import { Tipo } from "../AST/Tipo"
import { Expresion } from "../Interfaces/Expresion";
const { parse } = require('../../analizadorXPath/Xpath')
const grammar = require('../../analizadorXML/grammar')

export class ToNumber implements Expresion {
    linea: number;
    columna: number;
    public valor: any;

    constructor(linea: number, columna: number, valor: any) {
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
    }
    getTipo(ent: Entorno) {

        const valor = this.getValorImplicito(ent);
        if (typeof (valor) === 'boolean') {
            return Tipo.BOOLEAN;
        }
        else if (typeof (valor) === 'string') {
            return Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo.INT;
            }
            return Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo.NULL;
        }

        return Tipo.VOID;

    }
    getValorImplicito(ent: Entorno) {
        var texto = this.valor.getValorImplicito(ent);
        return Number(texto)
    }

    isInt(n: number) {
        return Number(n) === n && n % 1 === 0;
    }

}