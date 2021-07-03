import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
const { parse } = require('../../analizadorXPath/Xpath')
const grammar = require('../../analizadorXML/grammar')

export class Path implements Expresion {
    linea: number;
    columna: number;
    valor: any;
    identificador: string;

    constructor(valor: any, identificador: string, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
        this.identificador = identificador;
    }

    getTipo(ent: Entorno): Tipo {        
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

    getValorImplicito(ent: Entorno):any {
        var output = [];
        if (ent.existeEnActual(this.identificador)) {
            //se analiza el path
            var parserXPath = new parse(this.valor+'/node()');
            //valor de la tabla de simbolos
            var data = ent.getSimbolo(this.identificador).valor;
            //recorrer objetos
            data.forEach(dato => {
                //se ejecuta el path
                var resultado_xpath = parserXPath.Ejecutar(dato);
                output.push(resultado_xpath);
            });

        } else {
            console.log('La variable '+this.valor+' no existe, error semantico..')
        }
        return output;
    }

    isInt(n: number) {
        return Number(n) === n && n % 1 === 0;
    }

}