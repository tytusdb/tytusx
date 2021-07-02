import {instruccion_3d} from "./instruccion_3d";

export default class etiqueta implements instruccion_3d{
  public tag: string
  etiqueta : string;

  constructor(tag : string) {
    this.intrucciones_3d = new Array<instruccion_3d>();
    this.tag = tag;
  }

  getText(){
    return this.tag + ":";
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
