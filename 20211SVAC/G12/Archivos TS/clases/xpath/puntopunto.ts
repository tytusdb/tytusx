import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces.ts/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import informacion from "./informacion";

export default class puntopunto implements Instruccion {
  public exprecion: informacion;
  public sig;
  public contador;

  constructor(exprecion: informacion, sig) {
    this.exprecion = exprecion;
    this.sig = sig;
    this.contador = 0;
  }

  ejecutar(controlador: Controlador, ts: TablaSimbolos) {
    if (this.sig != null) {
      if (this.contador == 0) {
        this.sig.ejecutar(controlador, ts.ant);
      }
      this.contador = 1;
    } else {
      if (this.contador == 0) {
        ts = ts.ant;
        for (let informacion of ts.tabla) {
          if (informacion.sim.simbolo == 1) {
            controlador.append(informacion.sim.objeto.gethtml("", controlador));
          }
        }
      }
      this.contador = 1;
    }
  }
  recorrer(): Nodo {
    let padre = new Nodo("/..", "");
    if (this.sig != null) {
      padre.AddHijo(this.sig.recorrer());
    }
    return padre;
  }
}
