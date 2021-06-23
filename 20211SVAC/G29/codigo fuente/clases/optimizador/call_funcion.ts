import {instruccion_3d} from "./instruccion_3d";

export default class call_funcion implements instruccion_3d{
  public funcion: string

  constructor(funcion : string) {
    this.funcion = funcion;
  }

  getText(){
    return this.funcion + ";";
  }

  intrucciones_3d: Array<instruccion_3d>;

  ejecutar() {
  }

  insertar(instruccion: instruccion_3d) {
    this.intrucciones_3d.push(instruccion);
  }

}
