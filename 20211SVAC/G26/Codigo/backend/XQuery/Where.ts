import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Operacion } from "../Expresiones/Operacion";
import { Primitiva } from "../Expresiones/Primitiva";
import { Expresion } from "../Interfaz/expresion";
import { Instruccion } from "../Interfaz/instruccion";
import { InstruccionXQuery } from "../Interfaz/instruccionXQuery";
import { TranslateXPath } from "../Traduccion/TranslateXPath";
import { TranslateXQuery } from "../Traduccion/TranslateXQuery";
import { Consulta } from "../XPath/Consulta";
import { Nodo, TipoNodo } from "../XPath/Nodo";


export class Where implements InstruccionXQuery{
    linea: number;
    columna: number;
    identificador: string;
    condicion: Expresion;
    fromRoot: boolean;
    constructor(identificador: string, condicion: Expresion, fromRoot: boolean, linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.condicion = condicion;
        this.fromRoot = fromRoot;
    }

    getCodigo3Dir(XQueryEnt: Entorno, xmlEnt: Entorno, traductorXPath: TranslateXPath, traductorXQuery: TranslateXQuery){
        let code = "";
        return code;
    }    

    public isFromRoot(): boolean{
        //SI el nodo es // devuelve false, si el nodo es de tipo / devuelve true.
        return this.fromRoot
    }

    ejecutar(XQEnt: Entorno, xmlEnt: Entorno){
        let listaRedefinida: Array<any> = [];
        //ej: where $x/price>30   <-- id: $x , condicion = price > 30, fromRoot = / o //
        //1. Obtener $x
        let simb = XQEnt.obtenerSimbolo(this.identificador);
        //2. Sobre $x buscar quienes cumplen con la condicion.
        if(simb != null){
            if(this.isFromRoot()){
                //simb.valor es la respuesta a la consulta del for ( Array<any> )
                simb.valor.forEach((s : any) => {
                    //s.valor es un entorno donde se debe validar la condicion
                    let auxEnt = s.valor;
                    let respuesta = this.condicion.getValor(auxEnt);
                    //Si la respuesta tiene algun valor, agregar S
                    if(respuesta != null){
                        if(respuesta.tsimbolos != undefined && respuesta.tsimbolos.length > 0){
                            listaRedefinida = listaRedefinida.concat(s);
                        }else if(respuesta.tsimbolos === undefined && respuesta){
                            listaRedefinida = listaRedefinida.concat(s);
                        }
                    }   
                })
            }
            if(listaRedefinida.length == 0 && !this.isFromRoot()){
                //Si es // buscar en este entorno y en los hijos a ver si se encuentra la condicion.
                //Obtener operador izquierdo.
                let izq: any =  null;
                if(this.condicion instanceof Operacion){
                    izq = this.condicion.op_izq;
                    let auxLista: Array<any> = [];
                    simb.valor.forEach((s: any) => {
                        let newNodo = new Nodo(izq.getValorInicial(xmlEnt), TipoNodo.IDENTIFIER, this.linea, this.columna);
                        newNodo.fromRoot = false;
                        let auxCons: Consulta = new Consulta([newNodo], this.linea, this.columna);
                        let newEnt = auxCons.ejecutar(s.valor);
                        if(newEnt.length > 0){
                            auxLista.push(s);
                        }
                    })
                    if(auxLista.length > 0){
                        //Para cada elemento aca realizar la operacion
                        auxLista.forEach((s: any) => {
                            let respuesta = this.condicion.getValor(s.getValor());
                            if(respuesta != null){
                                if(respuesta.tsimbolos != undefined && respuesta.tsimbolos.length > 0){
                                    listaRedefinida = listaRedefinida.concat(s);
                                }else if(respuesta.tsimbolos === undefined && respuesta){
                                    listaRedefinida = listaRedefinida.concat(s);
                                }
                            }   
                        })
                    }
                }
            }

            //Sobreescribir la variable con la lista redefinida
            let nuevoSimbolo: Simbolo = new Simbolo(Tipo.XQ_VAR, this.identificador, listaRedefinida, this.linea, this.columna);
            if(XQEnt.sobreEscribirSimbolo(this.identificador, nuevoSimbolo)){
            }else{
               console.log("Error, no se pudo sobreescribir simbolo: $", this.identificador);
            }
        }else{
            console.log("ERROR WHERE, SIMBOLO NO ENCONTRADO: ", simb);
        }


    }
}