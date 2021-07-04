import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Instruccion } from "../Interfaces/Instruccion";
import { Tipo } from "../AST/Tipo"
const { parse } = require('../../analizadorXPath/Xpath')
const grammar = require('../../analizadorXML/grammar')

export class Return implements Instruccion {
    linea: number;
    columna: number;
    public valor: any;
    public path: string;

    constructor(linea: number, columna: number, valor: any, path: string) {
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
        this.path = path;
    }

    ejecutar(ent: Entorno): any {
        var resultado = '';
        //se hace la consulta a la tabla de simbolos
        if (this.path == '') {
            return this.valor.getValorImplicito(ent);
        } else {
            var id_temp = this.path.split('/')[1];
            if (ent.existeEnActual(id_temp)) {
                //se analiza el where_path
                var parserXPath = new parse(this.path);
                //valor de la tabla de simbolos
                var simbolo = ent.getSimbolo(id_temp) 
                var data = simbolo.valor;
                //VERIFICAMOS EL TIPO DE VARIABLE
                if (simbolo.tipo == 'OBJETO') {
                    //SI ES UN ARREGLO DE NUMEROS ITERA VALORES
                    if (typeof (data[0]) == 'number') {
                        data.forEach(dato => {
                            resultado += dato + ' ';
                        });
                    //SI ES UN ARREGLO DE OBJETOS EJECUTA XPATH    
                    } else {
                        //recorrer objetos
                        data.forEach(dato => {
                            //se ejecuta el path
                            var resultado_xpath = parserXPath.Ejecutar(dato);
                            //se concatenan los resultados obtenidos
                            resultado += resultado_xpath;
                        });
                    }
                } else{
                    resultado += data;
                }
            } else {
                console.log('La variable en cuestion no existe, error semantico..')
            }
        }
        return resultado;
    }

}