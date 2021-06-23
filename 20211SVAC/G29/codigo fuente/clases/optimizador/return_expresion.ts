import {instruccion_3d} from "./instruccion_3d";

export default class return_expresion implements instruccion_3d{
  public _return : string;

  constructor(_return : string ) {
    this._return = _return;
  }

  getText(){
    return 'return ' + this._return + ';';
  }

  intrucciones_3d: Array<instruccion_3d>;

  ejecutar() {
  }

  insertar(instruccion: instruccion_3d) {
    this.intrucciones_3d.push(instruccion);
  }


}
