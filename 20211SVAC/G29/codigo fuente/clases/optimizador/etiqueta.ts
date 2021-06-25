import {instruccion_3d} from "./instruccion_3d";

export default class entiqueta implements instruccion_3d{
  public etiqueta: string

  constructor(etiqueta : string) {
    this.etiqueta = etiqueta;
    this.intrucciones_3d = new Array<instruccion_3d>();
  }

  getText(){
    return this.etiqueta + ":";
  }

  intrucciones_3d: Array<instruccion_3d>;

  ejecutar() {
  }

  insertar(instruccion: instruccion_3d) {
    this.intrucciones_3d.push(instruccion);
  }

  insertar_lista(lista: Array<instruccion_3d>) {
    for(let x of lista){
      this.intrucciones_3d.push(x);
    }
  }

}
