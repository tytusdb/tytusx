import declaracion from "./declaracion";
import {instruccion_3d} from "./instruccion_3d";

export default class declaraciones implements instruccion_3d{
  public ld: Array<declaracion>;
  etiqueta : string;

  constructor(ld : Array<declaracion>){
    this.intrucciones_3d = new Array<instruccion_3d>();
    this.ld = ld;
  }

  getText(){
    let temp : string = "#include <stdio.h>\n" +
      "#include <math.h> \n";
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

  insertar_lista(lista: Array<instruccion_3d>) {
    for(let x of lista){
      this.intrucciones_3d.push(x);
    }
  }

  getLogica(): string {
    return '';
  }

}
