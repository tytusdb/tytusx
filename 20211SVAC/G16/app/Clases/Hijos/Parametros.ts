import Entorno from '../AST/Entorno';
import Simbolo from '../AST/Simbolo';
import Valor from '../AST/Valor';
import { Instruccion } from './../Interfaces/Instruccion';
import { Tipo } from './Tipo';
const TableSimbols=require("../AST/TSXQuery.js");
export class Parametros implements Instruccion{
  variable:string;
  tipo:Tipo;
  linea:number;
  columna:number;
  params:Parametros;
  t:string;
  constructor(variable:string,tipo:Tipo,linea:number,columna:number, params:Parametros){
    this.variable=variable;
    this.tipo=tipo;
    this.linea=linea;
    this.columna=columna;
    this.params=params;
  }
  ejecutar(entorno: Entorno,node:any) {
   entorno.variables.forEach(variable=>{
    if(variable.Nombre==this.variable){
      console.log("LA VARIABLE YA EXISTE")
      return null
    }
   });
   let valor=new Valor("Parámetro",null,"");
   let simbolo=new Simbolo(this.getVariable(),valor,entorno.nombre,node.linea,node.columna,-1);
   entorno.AddVariables(simbolo);
   TableSimbols.TableSimbols.add(simbolo);
   if(this.params!=null){
     this.params.ejecutar(entorno,this.params)
   }
  }


  getTipo():Tipo{
    return this.tipo;
  }

  getVariable():string{
    return this.variable;
  }
}
