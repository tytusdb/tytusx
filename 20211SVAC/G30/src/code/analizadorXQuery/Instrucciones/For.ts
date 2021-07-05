import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Instruccion } from "../Interfaces/Instruccion";
import { Tipo } from "../AST/Tipo"
const { parse } = require('../../analizadorXPath/Xpath')
const grammar = require('../../analizadorXML/grammar')

export class For implements Instruccion {
    linea: number;
    columna: number;
    public path: any;
    public identificador: string;
    public errores = [];

    constructor(linea: number, columna: number, path: any, identificador: string) {
        this.linea = linea;
        this.columna = columna;
        this.path = path;
        this.identificador = identificador;
    }

    ejecutar(ent: Entorno) {

        if (typeof this.path == 'string') {
            var output = []
            //se analiza el path
            var parserXPath = new parse(this.path);
            var data = JSON.parse(localStorage.getItem('XML'));

            //se ejecuta el path
            var resultado_xpath = parserXPath.Ejecutar(data);

            //se analiza y se ejecuta la nueva salida
            var resultado_xml = grammar.parse(resultado_xpath);

            //guardando los hijos como variables
            var hijos = resultado_xml.datos.hijos
            //seteando el nombre de cada objeto
            for (let hijo of hijos) {
                hijo.tipo = this.identificador;
                //creando objeto raiz
                let root = {
                    atributos: data.atributos,
                    columna: data.columna,
                    hijos: [hijo],
                    linea: data.linea,
                    posicionStack: data.posicionStack,
                    texto: '',
                    tipo: '/'
                };
                //agregando a la salida
                output.push(root);
            }
            //creamos una variable en la tabla de simbolos del entorno global y le mandamos el objeto como valor  
            var new_simbol = new Simbolo(this.identificador, Tipo.OBJETO, this.linea, this.columna, output)
            var simb = [];
            simb = simb.concat(this.GetTablaStorage());
            simb.push(new_simbol);
            this.SetTablaStorage(simb);
            //se agrega el simbolo al entorno
            ent.agregar(new_simbol);

            //agregando datos al storage
            this.SetStorage(this.path, 'path');
            this.SetStorage(resultado_xml, 'new_xml');


        }
        else {
            let arreglo = [];
            let num1 = this.path[0];
            let num2 = this.path[1];

            if (num1 > num2) {
                this.errores.push({
                    Tipo: 'Sintáctico',
                    Fila: this.linea,
                    Columna: this.columna,
                    Description: 'Los datos de la cadena son invalidos'
                });
                var err = this.GetErrorStorage();
                this.errores = this.errores.concat(err);
                this.SetErrorStorage(this.errores);
                console.log('Cadena invalida');
                return;
            }

            for (let index = num1; index <= num2; index++) {
                arreglo.push(index);
            }
            //creamos una variable en la tabla de simbolos del entorno FLWOR y le mandamos el objeto como valor  
            var new_simbol = new Simbolo(this.identificador, Tipo.OBJETO, this.linea, this.columna, arreglo)
            this.SetTablaStorage(new_simbol);
            //se agrega el simbolo al entorno
            ent.agregar(new_simbol);
        }
    }

    SetStorage(data: any, id: string) {
        localStorage.setItem(id, JSON.stringify(data));
    }

    GetStorage(id: string): any {
        var data = localStorage.getItem(id);
        return JSON.parse(data);
    }
    //obtener contador
    GetErrorStorage(): any {
        var data = localStorage.getItem('errores_xquery');
        return JSON.parse(data);
    }
    //actualizar contador
    SetErrorStorage(error: any) {
        localStorage.setItem('errores_xquery', JSON.stringify(error));
    }
    //actualizar contador
    SetTablaStorage(tabla: any) {
        localStorage.setItem('tabla', JSON.stringify(tabla));
    }
    //obtener tabla simbolos
    GetTablaStorage(): any {
        var data = localStorage.getItem('tabla');
        return JSON.parse(data);
    }

}