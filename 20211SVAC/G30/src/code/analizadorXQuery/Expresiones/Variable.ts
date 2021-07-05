import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
const { parse } = require('../../analizadorXPath/Xpath')
const grammar = require('../../analizadorXML/grammar')

export class Variable implements Expresion {
    linea: number;
    columna: number;
    identificador: string;
    public errores = [];

    constructor(identificador: string, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
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

    getValorImplicito(ent: Entorno): any { 
        console.log(ent)
        if (ent.existeEnActual(this.identificador)) {
            var output = '';
            let simbolo = ent.getSimbolo(this.identificador);
            if (simbolo.tipo == Tipo.OBJETO) {

                if (typeof (simbolo.valor[0]) == 'number') {
                    return simbolo.valor;
                }
                else {
                    //se analiza el path
                    var parserXPath = new parse('/*');
                    //recorrer objetos
                    simbolo.valor.forEach(dato => {
                        //se ejecuta el path
                        var resultado_xpath = parserXPath.Ejecutar(dato);
                        output += resultado_xpath;
                    });
                    return output;
                }
            }
            else {

                if(typeof(simbolo.valor) == 'object'){
                    return simbolo.valor.getValorImplicito(ent);
                }
                return simbolo.valor;
            }
        }
        else {
            console.log('No existe la variable en el entorno actual')
            this.errores.push({
                Tipo:'Sintáctico', 
                Fila: this.linea, 
                Columna: this.columna, 
                Description: 'No existe la variable'+this.identificador+'en el entorno actual'
            });
            var err = this.GetErrorStorage();
            this.errores = this.errores.concat(err);
            this.SetStorage(this.errores);
            return null;
        }
    }

    isInt(n: number) {
        return Number(n) === n && n % 1 === 0;
    }
    //obtener contador
    GetErrorStorage(): any {
        var data = localStorage.getItem('errores_xquery');
        return JSON.parse(data);
    }
    //actualizar contador
    SetStorage(error: any) {
        localStorage.setItem('errores_xquery', JSON.stringify(error));
    }

}