import { NodoGrafico } from "../utils/reports/nodoGrafico";
import { Excepcion } from "./excepcion.model";
import { Nodo } from "./nodo.model";

export class Arbol {
  public instrucciones: Array<Nodo>;
  public excepciones: Array<Excepcion>;
  public consola: Array<string>;

  public graficaAST: NodoGrafico;
  public graficaCST: NodoGrafico;
  public gramatica: string;

  constructor(instrucciones: Array<Nodo>) {
    this.instrucciones = instrucciones;
    this.excepciones = new Array<Excepcion>();
    this.consola = new Array<string>();

    this.graficaAST = new NodoGrafico('RAIZ', []);
    this.graficaCST = new NodoGrafico('RAIZ', []);
    this.gramatica = '';
  }

  public getAST(): Object {
    return JSON.parse(JSON.stringify(this.graficaAST));
  }

  public getCST(): Object {
    return JSON.parse(JSON.stringify(this.graficaCST));
  }
}
