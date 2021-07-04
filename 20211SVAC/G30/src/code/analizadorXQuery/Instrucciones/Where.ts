import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Instruccion } from "../Interfaces/Instruccion";
import { Tipo } from "../AST/Tipo"
const { parse } = require('../../analizadorXPath/Xpath')
const grammar = require('../../analizadorXML/grammar')

export class Where implements Instruccion {
    linea: number;
    columna: number;
    public arreglo: any;
    public identificador: string;
    public consulta: string;

    constructor(linea: number, columna: number, arreglo: any, identificador: string) {
        this.linea = linea;
        this.columna = columna;
        this.arreglo = arreglo; //['biblioteca','price>30']
        this.identificador = identificador; //libreria
        this.consulta = ''; //' '
    }

    ejecutar(ent: Entorno) {

        if (ent.existeEnActual(this.identificador)) {

            var output = [];
            //creando la consulta
            this.consulta = this.CrearConsulta();
            //se analiza el where_path
            var parserXPath = new parse(this.consulta);
            //valor de la tabla de simbolos
            var data = ent.getSimbolo(this.identificador).valor;
            
            //recorrer objetos
            data.forEach(dato => {
                //se ejecuta el path
                var resultado_xpath = parserXPath.Ejecutar(dato);
                //se analiza y se ejecuta la nueva salida
                var resultado_xml = grammar.parse(resultado_xpath);

                if (resultado_xml.datos.hijos.length > 0) {

                    

                    //guardando los hijos como variables
                    //output.push(resultado_xml.datos.hijos[0])



                    let root = {
                        atributos: data.atributos,
                        columna: data.columna,
                        hijos: [resultado_xml.datos.hijos[0]],
                        linea: data.linea,
                        posicionStack: data.posicionStack,
                        texto: '',
                        tipo: '/' 
                    }
                    output.push(root)
                }
            });

            //creando nuevo simbolo
            var new_simbol = new Simbolo(this.identificador,Tipo.OBJETO, this.linea, this.columna, output)
            //se agrega el simbolo al entorno
            ent.reemplazar(this.identificador, new_simbol);

        } else {
            console.log('La variable en cuestion no existe, error semantico..')
        }


    }

    CrearConsulta(): string {
        let consulta = '/' + this.identificador;
        let predicate = this.arreglo.pop();
        this.arreglo.forEach(arr => {
            consulta += '/' + arr;
        });
        consulta += '[' + predicate + ']'
        return consulta;
    }

}