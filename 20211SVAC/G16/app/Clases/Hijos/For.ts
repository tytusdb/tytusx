import { StringLiteralType } from 'typescript';
import Entorno from '../AST/Entorno';
import Simbolo from '../AST/Simbolo';
import Valor from '../AST/Valor';
import { Instruccion } from './../Interfaces/Instruccion';
import { Return } from './Return';
export class For implements Instruccion{

  variable:string;
  variable2:string;
  condiciones:any;
  contenido:any;
  linea:number;
  columna:number;
  t: string;
  retorno:Return;
  cont:Array<any>=new Array<any>();
  constructor(variable:string,variable2:string,condiciones:any,contenido:any,linea:number,columna:number,retorno:Return, t:string){
    this.variable=variable;
    this.variable2=variable2;
    this.condiciones=condiciones;
    this.contenido=contenido;
    this.linea=linea;
    this.columna=columna;
    this.retorno=retorno;
    this.t=t;
  }
  ejecutar(entorno: Entorno, node:any) {
    console.log("pasó por el for")
    let nuevo=new Entorno("For",entorno);
    if(this.variable=="" && this.variable2==""){
      if(this.condiciones!=null){
        //en esta sección retorna el valor de la condición
       let retorno=this.condiciones.ejecutar(nuevo,this.condiciones);
       // si el valor de la condición es diferente de nulo e indefinido
       if(retorno!=null && retorno!=undefined){
           this.retorno.ejecutar(nuevo,this.retorno);
        }else{

        }
      }
    }else if(this.variable!="" && this.variable2==""){

      if(this.condiciones!=null){
        let retorno=this.condiciones.ejecutar(nuevo,this.condiciones);
        //SE CREA INSERTA UNA NUEVA VARIABLE EN EL FOR
        let valor=new Valor("Variable",{xpath:retorno.array},"");
        let simbolo=new Simbolo(this.variable,valor,nuevo.nombre,node.linea,node.columna,-1);
        nuevo.AddVariables(simbolo);
        if (this.contenido!=null){

          this.contenido.ejecutar(nuevo,retorno.xpath);
        }
      }
    }

  }
  newEntorno(Contenido: any, nombre: string) {

    if (Contenido.length != undefined && Contenido!=null) {
        Contenido.forEach(element => {
            if(element.nombreInit!=undefined){
              if (element.nombreInit == nombre) {

                if (element.elementos !=null) {

                  this.cont.push(element)
                }else{

                  this.cont.push(element)
                }
              }else{
                let array=[]
                if(element.elementos!=null){
                  array.push(element.elementos)
                  this.newEntorno(array,nombre)
                }
              }
            }else if(element.lista!=undefined){

              if(element!=null){
                element.lista.forEach(elemento2 => {
                  let array=[]
                  array.push(elemento2)
                  this.newEntorno(array,nombre);
              });
              }
            }
        });
      }else{
        if(Contenido.Nombre!=undefined){
          if (Contenido.Nombre == nombre) {

            if (Contenido.elementos !=null) {

              this.cont.push(Contenido)
            }else{

              this.cont.push(Contenido)
            }
          }else{
            let array=[]
            if(Contenido.elementos!=null){
              array.push(Contenido.elementos)
              this.newEntorno(array,nombre)
            }
          }
        }else if(Contenido.lista!=undefined){

            if(Contenido!=null){
                Contenido.lista.forEach(elemento2 => {
                let array=[]
                array.push(elemento2)
                this.newEntorno(array,nombre);
            });
            }
        }else if(Contenido.nombreInit!=undefined){
            if (Contenido.nombreInit == nombre) {
              if (Contenido.elementos !=null) {

                this.cont.push(Contenido)
              }else{

                this.cont.push(Contenido)
              }
            }else{
              let array=[]
              if(Contenido.elementos!=null){
                array.push(Contenido.elementos)
                this.newEntorno(array,nombre)
              }
            }
        }

        }
        return this.cont
  }
}
