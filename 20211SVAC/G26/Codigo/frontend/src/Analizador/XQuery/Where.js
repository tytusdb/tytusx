"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Where = void 0;
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
const Operacion_1 = require("../Expresiones/Operacion");
const Consulta_1 = require("../XPath/Consulta");
const Nodo_1 = require("../XPath/Nodo");
class Where {
    constructor(identificador, condicion, fromRoot, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.condicion = condicion;
        this.fromRoot = fromRoot;
    }
    isFromRoot() {
        //SI el nodo es // devuelve false, si el nodo es de tipo / devuelve true.
        return this.fromRoot;
    }
    ejecutar(XQEnt, xmlEnt) {
        let listaRedefinida = [];
        //ej: where $x/price>30   <-- id: $x , condicion = price > 30, fromRoot = / o //
        //1. Obtener $x
        let simb = XQEnt.obtenerSimbolo(this.identificador);
        //2. Sobre $x buscar quienes cumplen con la condicion.
        if (simb != null) {
            if (this.isFromRoot()) {
                //simb.valor es la respuesta a la consulta del for ( Array<any> )
                simb.valor.forEach((s) => {
                    //s.valor es un entorno donde se debe validar la condicion
                    let auxEnt = s.valor;
                    let respuesta = this.condicion.getValor(auxEnt);
                    //Si la respuesta tiene algun valor, agregar S
                    if (respuesta != null) {
                        if (respuesta.tsimbolos != undefined && respuesta.tsimbolos.length > 0) {
                            listaRedefinida = listaRedefinida.concat(s);
                        }
                        else if (respuesta.tsimbolos === undefined && respuesta) {
                            listaRedefinida = listaRedefinida.concat(s);
                        }
                    }
                });
            }
            if (listaRedefinida.length == 0 && !this.isFromRoot()) {
                //Si es // buscar en este entorno y en los hijos a ver si se encuentra la condicion.
                //Obtener operador izquierdo.
                let izq = null;
                if (this.condicion instanceof Operacion_1.Operacion) {
                    izq = this.condicion.op_izq;
                    let auxLista = [];
                    simb.valor.forEach((s) => {
                        let newNodo = new Nodo_1.Nodo(izq.getValorInicial(xmlEnt), Nodo_1.TipoNodo.IDENTIFIER, this.linea, this.columna);
                        newNodo.fromRoot = false;
                        let auxCons = new Consulta_1.Consulta([newNodo], this.linea, this.columna);
                        let newEnt = auxCons.ejecutar(s.valor);
                        if (newEnt.length > 0) {
                            auxLista.push(s);
                        }
                    });
                    if (auxLista.length > 0) {
                        //Para cada elemento aca realizar la operacion
                        auxLista.forEach((s) => {
                            let respuesta = this.condicion.getValor(s.getValor());
                            if (respuesta != null) {
                                if (respuesta.tsimbolos != undefined && respuesta.tsimbolos.length > 0) {
                                    listaRedefinida = listaRedefinida.concat(s);
                                }
                                else if (respuesta.tsimbolos === undefined && respuesta) {
                                    listaRedefinida = listaRedefinida.concat(s);
                                }
                            }
                        });
                    }
                }
            }
            //Sobreescribir la variable con la lista redefinida
            let nuevoSimbolo = new Simbolo_1.Simbolo(Tipo_1.Tipo.XQ_VAR, this.identificador, listaRedefinida, this.linea, this.columna);
            if (XQEnt.sobreEscribirSimbolo(this.identificador, nuevoSimbolo)) {
            }
            else {
                console.log("Error, no se pudo sobreescribir simbolo: $", this.identificador);
            }
        }
        else {
            console.log("ERROR WHERE, SIMBOLO NO ENCONTRADO: ", simb);
        }
    }
}
exports.Where = Where;
