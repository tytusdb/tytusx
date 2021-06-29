import {Entorno} from '../AST/Entorno';
import { Simbolo } from '../AST/Simbolo';
import analizador from '../indexAnalizador';

class TraduceXML {
    private static _instance:TraduceXML;
    contS:number;
    contH:number;
    heap:Array<number>;
    stack:Array<number>;
    indice:number;
    strTraduccion:string;

    constructor() {
        this.contS = 0;
        this.contH = 0;
        this.indice = 0;    
        this.heap = new Array();
        this.stack = new Array();
        this.strTraduccion = '';

        if (typeof TraduceXML._instance === "object"){
          return TraduceXML._instance;
        }
        TraduceXML._instance = this;
        return this;
    }
  
    getHeap(){
      return this.heap;
    }

    getStack(){
      return this.stack;
    }

    getContS():number{
        return this.contS;
    }

    getContH():number{
        return this.contS;
    }

    getStrTraduccion():string{
      return this.strTraduccion;
    }

    public getEncabezado():string{
        let encabezado = '/*------HEADER------*/ \n'
                            +'#include <stdio.h> \n'
                            +'#include <math.h> \n'
                            +'\n'
                            +'double heap[30101999]; \n'
                            +'double stack[30101999]; \n'
                            +'double S; \n'
                            +'double H; \n';
        return encabezado;
    }
    
    public getMain(cuerpo:string):string{
        let main:string;
        main = '/*------MAIN------*/ \n'
                +'int main() { \n'
                +'    S = 0; \n'
                +'    H = 0; \n' 
                + cuerpo +'\n'
                +'    return 0; \n'
                +'} \n';
        return main;
    }

    public getCodeC():string{
        var codigo3d;
        codigo3d = this.getEncabezado();
        codigo3d = codigo3d + this.getDeclaraTemps();
        codigo3d = codigo3d + this.getMain(this.strTraduccion);
        return codigo3d;
    }

    private getDeclaraTemps():string{
      let temps:string = 'double ';
      for (let c = 0; c < this.stack.length; c++) {
        temps = temps + 't'+ c.toString();
        temps = temps + ((c == this.stack.length-1)? ';' : ', ');
        if((c % 100)==0){
          temps = temps + '\n';
        }
      }
      temps = temps + '\n';
      temps = temps + '\n';
      return temps;
    }

    public traducirXML():string{
        console.log('/* Inicio Traduccion */');
        this.traducir(analizador.global);
        this.strTraduccion = this.getCodeC();
        console.log('/* Fin Traduccion */');
        return this.strTraduccion;
    }

    private traducir(entrada:Entorno){
      let tabla:Array<any> = entrada.tsimbolos;
      tabla.forEach((elem: any) => {
        if(elem.valor.pade !== null || elem.valor.pade == undefined){
          if(elem.valor.valor instanceof Entorno){
            this.strTraduccion = this.strTraduccion + '\n /*--- SE AGREGA NUEVO NODO ---*/';
            elem.valor.setPosicion(this.contS);
            this.strTraduccion = this.strTraduccion + this.getIDAsignacionHeap(elem.valor.nombre.toString());
            this.traducir(elem.valor.valor);
          } else {
            if(elem.valor.valor !== false && elem.valor.valor !== false){
              this.strTraduccion = this.strTraduccion + '\n /*--- SE AGREGA NUEVO SIMBOLO ---*/';
              elem.valor.setPosicion(this.contS);
              //this.strTraduccion = this.strTraduccion + this.getIDAsignacionHeap(elem.valor.nombre.toString());
              this.strTraduccion = this.strTraduccion + this.getVALAsignacionHeap(elem.valor.valor.toString());
            }
          }
        }
      });
    }

    getIDAsignacionHeap(palabra:string):string{
      let asignacion:string = '\n\t /* IDENTIFICADOR "'+palabra+'" EN HEAP*/ \n';
      asignacion = asignacion + '\t t'+this.contS+' = H;\n';
      /* Descompone la palabra en caracteres y los asigna al Heap */
      palabra.split('').forEach((element:any) => {
        asignacion = asignacion 
                      +'\t heap[(int)H] = '+element.charCodeAt(0)+'; \n'
                      +'\t H = H + 1; \n';
        this.heap.push(element.charCodeAt(0));
        this.contH++;
      });
      /* Coloca un -1 para indicar que el valor es una cadena*/
      asignacion = asignacion
                    + '\t heap[(int)H] = -1; \n'
                    + '\t H = H + 1; \n';
      asignacion = asignacion
                    + '\t stack[(int)'+this.contS+'] = t'+this.contS+'; \n';
      this.stack.push(this.contS);
      this.contS++;
      return asignacion;
    }

    getVALAsignacionHeap(palabra:string):string{
      let asignacion:string = '\n\t /* VALOR "'+palabra+'" EN HEAP*/ \n';
      asignacion = asignacion + '\t t'+this.contS+' = H;\n';
      /* Descompone la palabra en caracteres y los asigna al Heap */
      palabra.split('').forEach((element:any) => {
        asignacion = asignacion 
                      +'\t heap[(int)H] = '+element.charCodeAt(0)+'; \n'
                      +'\t H = H + 1; \n';
        this.heap.push(element.charCodeAt(0));
        this.contH++;
      });
      /* Coloca un -1 para indicar que el valor es una cadena*/
      asignacion = asignacion
                    + '\t heap[(int)H] = -1; \n'
                    + '\t H = H + 1; \n';
      asignacion = asignacion
                    + '\t stack[(int)'+this.contS+'] = t'+this.contS+'; \n';
      this.stack.push(this.contS);
      this.contS++;
      return asignacion;
    }
}

const traductorXML = new TraduceXML();

export default traductorXML;