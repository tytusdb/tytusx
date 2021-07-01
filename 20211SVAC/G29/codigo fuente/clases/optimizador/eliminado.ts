import {instruccion_3d} from "./instruccion_3d";

export default class eliminado implements instruccion_3d{
  public tag: string
  etiqueta : string;

  constructor() {
    this.intrucciones_3d = new Array<instruccion_3d>();
  }

  getText(){
    return "";
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

  getLogica(): string {
    return '';
  }

}
