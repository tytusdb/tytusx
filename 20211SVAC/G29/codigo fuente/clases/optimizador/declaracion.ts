import {instruccion_3d} from "./instruccion_3d";

export default class declaracion implements instruccion_3d{
  public tipo: string
  public id: string

  constructor(tipo, id) {
      this.tipo = tipo;
      this.id = id;
  }

  getText(){
    return this.tipo + " " + this.id + ";";
  }

  intrucciones_3d: Array<instruccion_3d>;

  ejecutar() {
  }

  insertar(instruccion: instruccion_3d) {
    this.intrucciones_3d.push(instruccion);
  }

}
