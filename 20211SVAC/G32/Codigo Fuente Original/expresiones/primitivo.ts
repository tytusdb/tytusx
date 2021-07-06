import { Tipo } from "./Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Entorno } from "../interfaces/entorno";

export class Primitivo implements Expresion {
    linea: number;
    columna: number;
    valor: any;

    constructor(valor: any, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
    }

    getTipo(arbol: any): Tipo {
        const valor = this.getValorImplicito(arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo.BOOL;
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

    getValorImplicito(arbol: any) {
        return this.valor;
    }

    isInt(n: number) {
        return Number(n) === n && n % 1 === 0;
    }

    ejecutar(e: Entorno) {
        return this.valor;
    }
}