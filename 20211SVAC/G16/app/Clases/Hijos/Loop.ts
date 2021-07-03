import Entorno from '../AST/Entorno';
import Simbolo from '../AST/Simbolo';
import Valor from '../AST/Valor';
import { Instruccion } from './../Interfaces/Instruccion';
const TableSimbols=require("../AST/TSXQuery.js");
export class Loop implements Instruccion{
  variable:string;
  condiciones:any;
  contenido:any;
  linea:number;
  columna:number;
  loop:Loop;
  t:string;
  arreglito=[]
  global=[]
  constructor(variable:string,condiciones:any,linea:number,columna:number,loop:Loop,t:string){
    this.variable=variable;
    this.condiciones=condiciones;
    this.linea=linea;
    this.columna=columna;
    this.loop=loop;
    this.t=t;
  }
  ejecutar(entorno: Entorno, node: any) {
    if(this.condiciones!=null){
      if(this.condiciones.length!=undefined){
        this.verificar(this.condiciones,entorno);
        if(this.arreglito.length!=0){
          this.global.push(this.arreglito)
          let valor=new Valor("Variable",this.arreglito,"");
          let simbolo=new Simbolo(this.variable,valor,entorno.nombre,this.linea,this.columna,-1);
          entorno.AddVariables(simbolo);
          entorno.arreglo.push({variable:this.variable,array:this.arreglito});
          TableSimbols.TableSimbols.add(simbolo);
        }
        if(this.loop!=null){
          this.loop.ejecutar(entorno,this.loop);
        }else{
          this.combinaciones(entorno.arreglo,0,-1,entorno);
        }
        return entorno
      }else{
        let retorno=this.condiciones.ejecutar(entorno,this.condiciones);
        if(retorno!=undefined && retorno!=null){
         if(this.variable!=""){
          let resultado=entorno.buscarVariable(this.variable,entorno);
          if (resultado==null){
              let valor=new Valor("Variable",retorno,"");
              let simbolo=new Simbolo(this.variable,valor,entorno.nombre,this.linea,this.columna,-1);
              entorno.AddVariables(simbolo)
              TableSimbols.TableSimbols.add(simbolo);
              return retorno;
          }else{
            //error, ya hay una variable con el mismo nombre
          }
         }
        }
      }
    }

  }

  verificar(condiciones:any,entorno:Entorno){
     condiciones.forEach(element => {
        if(element.length==undefined){
          let ver=element.ejecutar(entorno,element);
          if(ver!=null && ver!=undefined){
            this.arreglito.push(ver)
          }
        }else{
          this.verificar(element,entorno)
        }
    });
  }
  combinaciones(arreglo,aux,cant,entorno:Entorno){
    let cantidad:Number=1;
    let bandera=false;
    let nuevo=[]
    for (let index = 0; index < arreglo.length; index++) {
      const element = arreglo[index].array;
      if(index!=aux){
        cantidad=Number(cantidad)*Number(element.length)
        nuevo.push(arreglo[index])
      }
      if(arreglo.length==1){
        cantidad=1
        nuevo.push(arreglo[index])
        bandera=true;
      }
    }
    if(nuevo.length!=0){
      let auxi=[]
      if(cant==-1){
        let arreglito=arreglo[0].array
        for (let index = 0; index < arreglito.length; index++) {
          let contador=cantidad
          while(contador>0){
          const element = arreglito[index];
          auxi.push(element)
          contador=Number(contador)-1;
          }

        }
        cant=cantidad;
        let simbolo=entorno.setVariable(arreglo[0].variable,auxi);
        if(simbolo!=null){
         // TableSimbols.TableSimbols.add(simbolo);
        }else{
          console.log("F")
        }

      }else{
        let contador=cant;
        let arreglito=arreglo[0].array
        while(auxi.length<contador){
          for (let index = 0; index < arreglito.length; index++) {
            let cont=cantidad
            while(cont>0){
              auxi.push(arreglito[index])
              cont=Number(cont)-1;
            }
          }
        }
        let simbolo=entorno.setVariable(arreglo[0].variable,auxi);
        if(simbolo!=null){
         // TableSimbols.TableSimbols.add(simbolo);
        }else{
          console.log("F")
        }
      }
      if(!bandera){
        this.combinaciones(nuevo,aux,auxi.length,entorno)
      }
    }
  }
}
