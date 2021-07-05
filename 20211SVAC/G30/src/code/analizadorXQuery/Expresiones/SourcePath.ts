import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
const { parse } = require('../../analizadorXPath/Xpath')
const grammar = require('../../analizadorXML/grammar')

export class SourcePath implements Expresion {
    linea: number;
    columna: number;
    path: string;

    constructor(path: string, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.path = path;
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

    getValorImplicito(ent: Entorno): any {
        let path = this.path+'/node()';

        //se analiza el path
        var parserXPath = new parse(path);
        //obteniendo xml
        var data = JSON.parse(localStorage.getItem('XML'));
        //se ejecuta el path
        var resultado_xpath = parserXPath.Ejecutar(data);
      
        return resultado_xpath;

    }

    isInt(n: number) {
        return Number(n) === n && n % 1 === 0;
    }

}