import { isEnumDeclaration } from "typescript";
import { Atributo } from "../controllers/xml/atributo.controller";
import { Entorno } from "../controllers/xml/entorno.controller";
import { Objeto } from "../controllers/xml/objeto.controller";
import { Simbolo } from "../controllers/xml/simbolo.controller";
import { NodoGrafico } from "../utils/reports/nodoGrafico";
import { Excepcion } from "./excepcion.model";
import { Nodo } from "./nodo.model";
import { Tipo } from "./tipo.model";

export class ArbolXML {
  public objetos: Array<Objeto>;
  public excepciones: Array<Excepcion>;
  public grafica: NodoGrafico;
  public gramatica: string;
  public simbolos: Array<Simbolo>;
  public tabla: Entorno;
  public encoding: string;
  private contadorT: number;

  constructor(objetos: Array<Objeto>, grafica: NodoGrafico, gramatica: string, excepciones: Array<Excepcion>, encoding: string) {
    this.objetos = objetos;
    this.grafica = grafica;
    this.excepciones = excepciones
    this.gramatica = gramatica;
    this.simbolos = new Array<Simbolo>();
    this.tabla = new Entorno(null);
    this.encoding = encoding;
    this.contadorT = 0;

  }

  public inicializarTabla(lista: Array<Objeto>, anterior: Entorno, arbol: ArbolXML, ambito:string): Entorno | any {
    if(lista.length > 0){
      lista.forEach((element: Objeto)=>{
        let entornoObjeto: Entorno = new Entorno(anterior);
        const simboloObjeto: Simbolo = new Simbolo(element.identificador, element.linea, element.columna, Tipo.OBJETO, element.valor, ambito, element.valorObj)
        this.simbolos.push(simboloObjeto)

        element.listaAtributos.forEach((atributo: Atributo) => {
          const simboloAtributo: Simbolo = new Simbolo(atributo.identificador, atributo.linea, atributo.columna, Tipo.ATRIBUTO, atributo.valor, element.identificador, '')
          simboloAtributo.entorno = undefined;
          entornoObjeto.agregar(simboloAtributo)
          this.simbolos.push(simboloAtributo)
        });

        entornoObjeto = this.inicializarTabla(element.listaObjetos, entornoObjeto, arbol, element.identificador)
        simboloObjeto.entorno = entornoObjeto;
        anterior.agregar(simboloObjeto)
        entornoObjeto.anterior = anterior;
      })
    }
    return anterior
  }

  public getCST(): Object{
    return JSON.parse(JSON.stringify(this.grafica))
  }

  public getTraduccion():string{   // El heap informacion detallada - el stack los identificadores
    let sp = 0;
    let hp = 0;
    let traduccion = `/* --- MAIN --- */
    void main() {
      P = 0; H = 0; `


    this.simbolos.forEach((simbolo: Simbolo) => {
      if(simbolo.tipo ==Tipo.ATRIBUTO){

      }else{
        if(simbolo.valor == ''){  // Tiene mas objetos dentro - NO  tiene texto

        }
      }
    });

    traduccion += `return ; \n }\n`
    return traduccion
  }

  public getEncabezado(): string {
    let encabezado = `/* --- --- --- ENCABEZADO --- --- --- */
    #include <stdio.h>
    #include <math.h>

    double heap[301620999];
    double stack[301620999];
    double P;
    double H;
    double t0`;

    for (let index = 1; index < this.contadorT; index++) {
      encabezado += ', t'+index
    }

    encabezado += '; \n'
    return encabezado;
  }
}

