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
  ejecutar(entorno: any) {
    throw new Error('Method not implemented.');
  }
  insertSimbolsTable(node: any, anterior: string, eEntorno:Entorno):Entorno {
    let repetido=false;
    let lista=TableSimbols.TableSimbols.getLista();
      lista.forEach(element => {
        if(element.Valor.Tipo=="Parámetro" && element.Nombre==node.variable && element.Padre==anterior){
          console.log("error semántico")
          repetido=true;
        }
      });
    if(!repetido){
      let valor=new Valor("Parámetro",node,"");
      let simbolo=new Simbolo(node.variable,valor,anterior,node.linea,node.columna,-1);
      eEntorno.Add(simbolo);
     // TableSimbols.TableSimbols.add(simbolo);
      if(node.params!=null){
        node.params.insertSimbolsTable(node.params,anterior,eEntorno);
      }
    }

    return eEntorno;
  }

  getTipo():Tipo{
    return this.tipo;
  }

  getVariable():string{
    return this.variable;
  }
}
