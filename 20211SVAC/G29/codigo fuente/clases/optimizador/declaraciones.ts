import declaracion from "./declaracion";
import {instruccion_3d} from "./instruccion_3d";

export default class declaraciones implements instruccion_3d{
  public ld: Array<declaracion>;

  constructor(ld : Array<declaracion>){
    this.ld = ld;
  }

  getText(){
    let temp : string = "";
    for(let x of  this.ld){
      temp += x.getText() + '\n';
    }
    return temp;
  }

  intrucciones_3d: Array<instruccion_3d>;

  ejecutar() {
  }

  insertar(instruccion: instruccion_3d) {
    this.intrucciones_3d.push(instruccion);
  }

}
