import {instruccion_3d} from "./instruccion_3d";

export default class metodo implements instruccion_3d{
  public metodo : string;

  constructor(metodo : string ) {
    this.metodo = metodo;
  }

  getText(){
    return  + this.metodo + '{';
  }

  intrucciones_3d: Array<instruccion_3d>;

  ejecutar() {
  }

  insertar(instruccion: instruccion_3d) {
    this.intrucciones_3d.push(instruccion);
  }

}
