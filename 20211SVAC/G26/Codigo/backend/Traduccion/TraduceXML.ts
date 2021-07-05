import {Entorno} from '../AST/Entorno';
import { Simbolo } from '../AST/Simbolo';
import { Tipo } from '../AST/Tipo';
import analizador from '../indexAnalizador';
import { InstruccionXQuery } from '../Interfaz/instruccionXQuery';
import { Consulta } from '../XPath/Consulta';
import { Nodo } from '../XPath/Nodo';
import { TranslateXPath } from './TranslateXPath';
import { TranslateXQuery } from './TranslateXQuery';

export class TraduceXML {
    contS:number;
    contH:number;
    heap:Array<number>;
    stack:Array<number>;
    indice:number;
    strTraduccion:string;
    listaConsultas: Array<Consulta>;
    instruccionXQuery: InstruccionXQuery | null
    strXPathTraduccion: string;
    strXQueryTraduccion: string
    xqEntorno: Entorno;
    constructor(listaConsultas:Array<Consulta>, instruccionXQuery: InstruccionXQuery | null, xqEntorno: Entorno) {
        this.contS = 0;
        this.contH = 0;
        this.indice = 0;    
        this.heap = new Array();
        this.stack = new Array();
        this.listaConsultas = listaConsultas;
        this.instruccionXQuery = instruccionXQuery;
        this.strXPathTraduccion = "";
        this.strTraduccion = '';
        this.xqEntorno = xqEntorno;
        this.strXQueryTraduccion = "";
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
                            +'double XPStack[30101999];\n'
                            +'double XPHeap[30101999];\n'
                            +'double XQStack[30101999];\n'
                            +'double XQHeap[30101999];\n'                            
                            +'double HP;\n'
                            +'double SP;\n'
                            +'double S; \n'
                            +'double H; \n'
                            +'double HQ; \n'
                            +'double SQ; \n'
        return encabezado;
    }
    
    public getMain(cuerpo:string):string{
        let main:string;
        main = '/*------MAIN------*/ \n'
                +'int main() { \n'
                +'    S = 0; \n'
                +'    H = 0; \n' 
                +'\n/********* INICIA TRADUCCION XML **********/ \n'
                + cuerpo +'\n'
                +'\n/********* TERMINA TRADUCCION XML **********/ \n'
                +'\n/********* INICIA TRADUCCION XPATH **********/ \n'
                +'\t HP = 0;\n\t SP = 0;\n'
                + this.strXPathTraduccion+'\n'
                +'\n/********* TERMINA TRADUCCION XPATH **********/ \n'
                +'\n/********* INICIA TRADUCCION XQUERY **********/ \n'
                +'\t HQ = 0;\n\t SQ = 0;\n'
                + this.strXQueryTraduccion+'\n'
                +'\n/********* TERMINA TRADUCCION XQUERY **********/ \n'
                +'    return 0; \n'
                +'} \n';
        return main;
    }

    public getCodeC():string{
        var codigo3d;
        codigo3d = this.getEncabezado();
        codigo3d = codigo3d + this.getDeclaraTemps();
        //Hacer traduccion de xpath
        if(this.listaConsultas.length > 0){
          console.log("lc: ",this.listaConsultas)
          let traductorXPath = new TranslateXPath(this.listaConsultas, analizador.global, this.heap, this.stack);
          this.strXPathTraduccion = traductorXPath.traducirXPath();
          let strFuncs = traductorXPath.getFuncionesUtilizadas();
          codigo3d += traductorXPath.getDeclaraTempsXPATH()+"\n";
          //Ahora obtener las funciones que se utilizaron para la traduccion.
          codigo3d += strFuncs;
          console.log("cod3", codigo3d);
        }
      
        if(this.instruccionXQuery != null){
          let traductorXPath = new TranslateXPath(this.listaConsultas, analizador.global, this.heap, this.stack);
          let traductorXQuery = new TranslateXQuery(this.instruccionXQuery, this.xqEntorno, analizador.global, traductorXPath);
          this.strXQueryTraduccion = traductorXQuery.iniciarTraduccion();
          let strFuncs = traductorXQuery.getFuncionesUtilizadas();
          codigo3d += traductorXQuery.getDeclaraTempsXQuery()+"\n";
          codigo3d += strFuncs;
        }
        //Obtener el main
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
        this.traducir(analizador.global, -5);
        this.strTraduccion = this.getCodeC();
        console.log('/* Fin Traduccion */');
        return this.strTraduccion;
    }

    private traducir(entrada:Entorno, finalPadre: number){
      let tabla:Array<any> = entrada.tsimbolos;
      tabla.forEach((elem: any) => {
        if(elem.valor.padre !== null || elem.valor.padre == undefined){
          if(elem.valor.valor instanceof Entorno){
            this.strTraduccion = this.strTraduccion + '\n /*--- SE AGREGA NUEVO NODO ---*/';
            elem.valor.setPosicion(this.contS);

            //Al iniciar una etiqueta nueva, se coloca el num de Finalizacion que tendra este padre (-5, -10, etcc..)
            this.strTraduccion = this.strTraduccion + '\n /*--- EL AMBITO DE "'+elem.valor.nombre+'" TERMINA CON: '+finalPadre+' ---*/';
            this.strTraduccion = this.strTraduccion+'\n\t heap[(int)H] = '+finalPadre+' ; \n'
            this.strTraduccion = this.strTraduccion+'\t H = H + 1; \n'
            this.heap.push(finalPadre);
            this.contH++;
            //Iniciar con la traduccion de la etiqueta
            this.strTraduccion = this.strTraduccion + this.getIDAsignacionHeap(elem.valor.nombre.toString(), "ETIQUETA");
            this.traducir(elem.valor.valor, finalPadre - 5);
            //Al finalizar una etiqueta colocar finalizacion del ambito ( -5, -10, -15, etc.. )
            this.strTraduccion = this.strTraduccion + '\n /*--- FINALIZACION DE NODO "'+elem.valor.nombre+'" ---*/';
            this.strTraduccion = this.strTraduccion+'\n\t heap[(int)H] = '+finalPadre+' ; \n'
            this.strTraduccion = this.strTraduccion+'\t H = H + 1; \n'
            this.heap.push(finalPadre);
            this.contH++;

          } else {
            if(elem.valor.valor !== false && elem.valor.valor !== false){
              this.strTraduccion = this.strTraduccion + '\n /*--- SE AGREGA NUEVO SIMBOLO ---*/';
              elem.valor.setPosicion(this.contS);
              if(elem.valor.getTipo() === Tipo.ATRIBUTO){              
                this.strTraduccion = this.strTraduccion + this.getIDAsignacionHeap(elem.valor.nombre.toString(), "ATRIBUTO");
              }
              this.strTraduccion = this.strTraduccion + this.getVALAsignacionHeap(elem.valor.valor.toString());
            }
          }
        }
      });
    }
    getIDAsignacionHeap(palabra:string, tipo: string):string{
      let asignacion:string = '\n\t /* '+tipo+' "'+palabra+'" EN HEAP*/ \n';
      asignacion = asignacion + '\t t'+this.contS+' = H-1;\n';
      /* Coloca un -1 para indicar que el valor es un nodo(etiqueta) o un -2 si es atributo*/
      let numFinalizacion = -1;
      if(tipo === "ATRIBUTO"){
        numFinalizacion = -2;
        asignacion = asignacion
                 + '\t heap[(int)H] = '+numFinalizacion+'; \n'
                 + '\t H = H + 1; \n';
        this.heap.push(numFinalizacion);
        this.contH++;          
      }            
    
      /* Descompone la palabra en caracteres y los asigna al Heap */
      palabra.split('').forEach((element:any) => {
        asignacion = asignacion 
                      +'\t heap[(int)H] = '+element.charCodeAt(0)+'; \n'
                      +'\t H = H + 1; \n';
        this.heap.push(element.charCodeAt(0));
        this.contH++;
      });
      /* Coloca un -1 para indicar que el valor es un nodo(etiqueta) o un -2 si es atributo y ya termino*/

      asignacion = asignacion
                    + '\t heap[(int)H] = '+numFinalizacion+'; \n'
                    + '\t H = H + 1; \n';
      this.heap.push(numFinalizacion);
      this.contH++;                    
      asignacion = asignacion
                    + '\t stack[(int)'+this.contS+'] = t'+this.contS+'; \n';
      this.stack.push(this.contS);
      this.contS++;
      return asignacion;
    }

    getVALAsignacionHeap(palabra:string):string{
      let asignacion:string = '\n\t /* VALOR "'+palabra+'" EN HEAP*/ \n';
      asignacion = asignacion + '\t t'+this.contS+' = H;\n';
      asignacion = asignacion
                    + '\t heap[(int)H] = -3; \n'
                    + '\t H = H + 1; \n';
        this.heap.push(-3);
        this.contH++;      
      /* Descompone la palabra en caracteres y los asigna al Heap */
      palabra.split('').forEach((element:any) => {
        asignacion = asignacion 
                      +'\t heap[(int)H] = '+element.charCodeAt(0)+'; \n'
                      +'\t H = H + 1; \n';
        this.heap.push(element.charCodeAt(0));
        this.contH++;
      });
      /* Coloca un -3 para indicar que el valor es una cadena y ya termino*/
      asignacion = asignacion
                    + '\t heap[(int)H] = -3; \n'
                    + '\t H = H + 1; \n';
        this.heap.push(-3);
        this.contH++;                    
      asignacion = asignacion
                    + '\t stack[(int)'+this.contS+'] = t'+this.contS+'; \n';
      this.stack.push(this.contS);
      this.contS++;
      return asignacion;
    }
}