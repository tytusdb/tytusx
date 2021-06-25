import {instruccion_3d} from "./instruccion_3d";

export default class asignacion implements instruccion_3d{
  public variable: string;
  public izq : string;
  public operador: string;
  public der : string;

  constructor(variable, izq, operador, der) {
    this.variable = variable;
    this.izq = izq;
    this.operador = operador;
    this.der = der;

  }

  getText(){
    return this.variable + "=" + this.izq + this.operador + this.der + ";";
  }

  intrucciones_3d: Array<instruccion_3d>;

  ejecutar() {
  }

  insertar(instruccion: instruccion_3d) {
    this.intrucciones_3d.push(instruccion);
  }

}
