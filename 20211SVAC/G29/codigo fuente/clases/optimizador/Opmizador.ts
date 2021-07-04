import { ast } from "../ast/ast";
import { entorno } from "../ast/entorno";
import { expresion } from "../interfaces/expresion";
import { instruccion } from "../interfaces/instruccion";
import {instruccion_3d} from "./instruccion_3d";

export default class print implements instruccion_3d{
  public exp: expresion
  public linea: number
  public columna: number
  constructor(exp,linea,columna){
    this.exp = exp
    this.linea = linea
    this.columna = columna
  }
  ejecutar() {
  }

  intrucciones_3d: Array<instruccion_3d>;

  insertar(instruccion: instruccion_3d) {
    this.intrucciones_3d.push(instruccion);
  }

}
