import {instruccion_3d} from "./instruccion_3d";

export default class return_expresion implements instruccion_3d{
  public _return : string;

  etiqueta : string;
  intrucciones_3d: Array<instruccion_3d>;

  constructor(_return : string ) {
    this.intrucciones_3d = new Array<instruccion_3d>();
    this._return = _return;
  }

  getText(){
    return 'return ' + this._return + ';';
  }

  getLogica(): string {
    return '';
  }

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
