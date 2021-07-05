import { templateJitUrl } from "@angular/compiler";
import Nodo from "src/clases/AST/Nodo";
import Controlador from "src/clases/Controlador";
import { Instruccion } from "src/clases/Interfaces.ts/Instruccion";
import { TablaSimbolos } from "src/clases/TablaSimbolos/TablaSimbolos";
import returnXquery from "./returnXquery";
import whereXquery from "./whereXquery";

export default class ForXquery implements Instruccion {
  public id: string;
  public parametro;
  public lista_instrucciones: Array<Instruccion>;
  public linea: number;
  public columna: number;

  constructor(id, parametro, linea, columan, lista_instrucciones?) {
    this.id = id;
    this.parametro = parametro;
    this.linea = linea;
    this.columna = columan;
    this.lista_instrucciones = lista_instrucciones;
  }

  ejecutar(controlador: Controlador, ts: TablaSimbolos) {
    let where;
    let ret;
    for (let instruccion of this.lista_instrucciones) {
      if (instruccion instanceof whereXquery) {
        where = instruccion;
      } else {
        if (instruccion instanceof returnXquery) {
          ret = instruccion;
        }
      }
    }
    this.acceso(this.parametro, where, ret);
    this.parametro.ejecutar(controlador, ts);
  }

  acceso(exprecion, where, ret) {
    let temp=exprecion;
    let acces;
    console.log(temp);
    while(temp!=null){
        acces=temp;
        temp=temp.sig;
    }   
    console.log("salida 1");
    console.log(acces);
    console.log(ret);
    if(where !=null){
        acces.exprecion.exprecion=where.expreciones;
    }
    if(ret!=null){
        acces.sig=ret.expreciones;
    }
    exprecion.sig=acces;
    console.log("final");
    console.log(exprecion);
  }

  recorrer(): Nodo {
    return null;
  }
}
