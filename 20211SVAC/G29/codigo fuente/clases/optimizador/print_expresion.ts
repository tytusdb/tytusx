import {instruccion_3d} from "./instruccion_3d";

export default class print_expresion implements instruccion_3d{
  public imprimir: string;

  constructor(imprimir : string ) {
    this.intrucciones_3d = new Array<instruccion_3d>();
    this.imprimir = imprimir;
  }

  getText(){
    return this.imprimir + ";";
  }

  intrucciones_3d: Array<instruccion_3d>;

  ejecutar() {
  }

  getLogica(): string {
    return '';
  }

  insertar(instruccion: instruccion_3d) {
    this.intrucciones_3d.push(instruccion);
  }

  insertar_lista(lista: Array<instruccion_3d>) {
    for(let x of lista){
      this.intrucciones_3d.push(x);
    }
  }

  etiqueta : string;

}
