import { NodoGrafico } from "../utils/reports/nodoGrafico";
import { Excepcion } from "./excepcion.model";
import { Nodo } from "./nodo.model";
import { NodoC3D } from "./nodoC3D.model";

export class Arbol {
  public instrucciones: Array<Nodo>;
  public excepciones: Array<Excepcion>;
  public consola: Array<string>;

  public graficaAST: NodoGrafico;
  public graficaCST: NodoGrafico;
  public gramatica: string;

  public contadorTemporal: number;
  public contadorEtiqueta: number;
  public heap: number;
  public stack: number;
  public codigo: Array<string>;
  public ultimaEtiquetaSalida: string;

  public c3d: Array<string>;

  constructor(instrucciones: Array<Nodo>) {
    this.instrucciones = instrucciones;
    this.excepciones = new Array<Excepcion>();
    this.consola = new Array<string>();

    this.graficaAST = new NodoGrafico('RAIZ', []);
    this.graficaCST = new NodoGrafico('RAIZ', []);
    this.gramatica = '';

    this.contadorTemporal = 0;
    this.contadorEtiqueta = 0;
    this.heap = 0;
    this.stack = 0;
    this.codigo = new Array<string>();
    this.ultimaEtiquetaSalida = "";
    this.c3d = new Array<string>();
  }

  public getAST(): Object {
    return JSON.parse(JSON.stringify(this.graficaAST));
  }

  public getCST(): Object {
    return JSON.parse(JSON.stringify(this.graficaCST));
  }

  public agregarCodigo(codigo: string): void {
    this.codigo.concat(codigo);
  }

  public crearTemporal(): string {
      this.contadorTemporal++;
      return `t${this.contadorTemporal}`;
  }

  public crearEtiqueta(): string{
      this.contadorEtiqueta++;
      return `L${this.contadorEtiqueta}`;
  }

  public getHP(): string{
      return `HP = HP + 1;\r\n`;
  }

  public generarEncabezado(nodos: Array<NodoC3D>): void{
      this.c3d.concat("#include <stdio.h> //importar para el uso de printf");
      this.c3d.concat("float Heap[100000]; //estructura heap");
      this.c3d.concat("float Stack[100000]; //estructura stack");

      this.c3d.concat("\nfloat SP; //puntero Stack pointer");
      this.c3d.concat("float HP; //puntero Heap pointer");

      var temporales: string =  `float `;
      const contadorTemp: number = this.contadorTemporal;

      for (let i = 1; i < contadorTemp; i++){
          temporales += `t${i}, `;
      }
      temporales += `t${contadorTemp}; //declaración de temporales`;
      this.c3d.concat(temporales);

      nodos.forEach(element => {
          this.c3d.concat(element.cadena);
      });
  }

}
