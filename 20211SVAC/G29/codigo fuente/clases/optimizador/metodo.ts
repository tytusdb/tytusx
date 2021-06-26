import {instruccion_3d} from "./instruccion_3d";

export default class metodo implements instruccion_3d{
  public met : string;
  intrucciones_3d : Array<instruccion_3d>;

  constructor(met : string ) {
    this.intrucciones_3d = new Array<instruccion_3d>();
    this.met = met;
  }

  getText(){
    return "void "+ this.met + '(){' + this.recolectar_string() + '}';
  }

  ejecutar() {
  }

  insertar(instruccion: any) {
    this.intrucciones_3d.push(instruccion);
  }

  insertar_lista(lista: Array<any>) {
    for(let x of lista){
      this.intrucciones_3d.push(x);
    }
  }

  recolectar_string(): string{
    let r : string = "";
    for(let t of this.intrucciones_3d){
       r+= t.getText() + "\n";
    }
    return r;
  }

}
