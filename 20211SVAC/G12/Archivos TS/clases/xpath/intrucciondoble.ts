import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces.ts/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";

export default class instrucciondoble implements Instruccion {
  public i1;
  public i2;
  public temp;
  constructor(i1, i2) {
    this.i1 = i1;
    this.i2 = i2;
  }
  ejecutar(controlador: Controlador, ts: TablaSimbolos) {
    this.i1.ejecutar(controlador, ts);
    this.temp = controlador.consola;
    controlador.consola = "";
    this.i2.ejecutar(controlador, ts);
    if (this.temp != controlador.consola) {
      controlador.consola = this.temp + controlador.consola;
    }
  }
  recorrer(): Nodo {
    let padre = new Nodo("|", "");
    padre.AddHijo(this.i1.recorrer());
    padre.AddHijo(this.i2.recorrer());
    return padre;
  }
}
