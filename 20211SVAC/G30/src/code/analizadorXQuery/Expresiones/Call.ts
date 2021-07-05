import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Instruccion } from "../Interfaces/Instruccion";
import { Tipo } from "../AST/Tipo"
import { Expresion } from "../Interfaces/Expresion";
const { parse } = require('../../analizadorXPath/Xpath')
const grammar = require('../../analizadorXML/grammar')

export class Call implements Expresion {
    linea: number;
    columna: number;
    public valores: Array<any> = [];
    public identificador: string;
    public errores = [];

    constructor(identificador: string, valores: Array<any>, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.valores = valores;
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


    //recibe globa al inicio
    getValorImplicito(ent: Entorno): any {

        //1. buscar funcion en entorno
        if (ent.existe(this.identificador)) {
            var funcion = ent.getSimbolo(this.identificador);

            //2. se crea un entorno nuevo
            var entorno_nuevo = new Entorno(this.identificador, null); //entorno nuevo llamado 'como se llama la llamada'

            //3. se crean los simbolos con ayuda de la funcion
            var variables = funcion.valor.getVariables();

            if (variables.length == this.valores.length) {
                //se agregan los simbolos al nuevo entorno
                for (let i = 0; i < variables.length; i++) {
                    let valor: any = this.valores[i].getValorImplicito(ent);

                    //verificando tipos de dato
                    if (variables[i][1] == 'integer') valor = Number(valor);
                    else if (variables[i][1] == 'float') valor = parseFloat(valor);
                    else if (variables[i][1] == 'double') valor = parseFloat(valor);
                    else if (variables[i][1] == 'boolean') {
                        if (valor.toString().toLowerCase() == 'true') valor = true;
                        else if (valor.toString().toLowerCase() == 'false') valor = false;
                    }
                    else valor = valor.toString();


                    var new_simbol = new Simbolo(variables[i][0], variables[i][1], this.linea, this.columna, valor);
                    var simb = [];
                    simb = simb.concat(this.GetTablaStorage());
                    simb.push(new_simbol);
                    this.SetTablaStorage(simb); 
                    entorno_nuevo.agregar(new_simbol);
                }

                //se agrega la misma funcion al nuevo entorno
                entorno_nuevo.agregar(funcion);

                //se manda a ejecutar la funcion y se envia el nuevo entorno creado
                return funcion.getValorImplicito(entorno_nuevo).ejecutar(entorno_nuevo);
            }
            else {
                console.log('Faltan parametros en la funcion')
                this.errores.push({
                    Tipo: 'Sintáctico',
                    Fila: this.linea,
                    Columna: this.columna,
                    Description: 'Faltan parametros en la funcion ' + this.identificador
                });
                var err = this.GetErrorStorage();
                this.errores = this.errores.concat(err);
                this.SetStorage(this.errores);
            }
        }
        else {
            console.log('Error la funcion no existe..')
            this.errores.push({
                Tipo: 'Sintáctico',
                Fila: this.linea,
                Columna: this.columna,
                Description: 'La función  ' + this.identificador + ' no existe'
            });
            var err = this.GetErrorStorage();
            this.errores = this.errores.concat(err);
            this.SetStorage(this.errores);

        }
        return null;
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

    //obtener tabla simbolos
    GetTablaStorage(): any {
        var data = localStorage.getItem('tabla');
        return JSON.parse(data);
    }
    //actualizar contador
    SetTablaStorage(tabla: any) {
        localStorage.setItem('tabla', JSON.stringify(tabla));
    }



}