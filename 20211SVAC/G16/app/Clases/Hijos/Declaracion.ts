import Entorno from '../AST/Entorno';
import Simbolo from '../AST/Simbolo';
import Valor from '../AST/Valor';
import { Instruccion } from './../Interfaces/Instruccion';
import { Tipo } from './Tipo';
const TableSimbols=require("../AST/TSXQuery.js");
export class Declaracion implements Instruccion{

  nombre:string;
  tipo:Tipo;
  t:string;
  valor:any;
  linea:number;
  columna:number;
  array=[]
  constructor(nombre:string,valor:any,linea:number,columna:number,t:string) {
    this.nombre=nombre;
    this.valor=valor;
    this.linea=linea;
    this.columna=columna;
    this.t=t;
  }

  ejecutar(entorno: Entorno,node:any) {
    if(entorno.buscarVariableEntorno(this.nombre,entorno)!=null){
      console.log("Ya existe una variable con este nombre")
    }else{
      let val=this.funcion(entorno,node,this.valor);

      let arreglito=[]
      if(val=="Arreglito"){
        this.array.forEach(el=>{
          let valorcito=el.ejecutar(entorno,el);
          if(valorcito!=null){
            arreglito.push(valorcito);
          }
        });
        if(arreglito.length!=0){
          let valor=new Valor("Let",arreglito,"");
          let simbolo=new Simbolo(this.nombre,valor,entorno.nombre,this.linea,this.columna,-1);
          TableSimbols.TableSimbols.add(simbolo);
          entorno.AddVariables(simbolo);
        }
        return
      }else if(val==null){
        console.log("F")
        return
      }
      let valor=new Valor("Let",val,"");
      let simbolo=new Simbolo(this.nombre,valor,entorno.nombre,this.linea,this.columna,-1);
      TableSimbols.TableSimbols.add(simbolo);
      entorno.AddVariables(simbolo);
    }

  }

  funcion(entorno:Entorno,node:any,array):any{
    if(this.valor.length==undefined){
      return this.valor.ejecutar(entorno,node);
    }else{
      array.forEach(element => {
        if(element.length!=undefined){
          this.funcion(entorno,node,element);
        }else{
          this.array.push(element)
        }
      });
      return "Arreglito"
    }
  }


}
