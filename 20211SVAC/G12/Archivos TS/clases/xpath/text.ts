import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces.ts/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";

export default class text implements Instruccion {
  constructor() {}

  ejecutar(controlador: Controlador, ts: TablaSimbolos) {
    for (let informacion of ts.tabla) {
      if (controlador.extxt.tipo == 1) {
        if (controlador.extxt.id == "*") {
          this.generador3D(informacion, controlador);
        } else {
          if (
            informacion.identificador == controlador.extxt.id &&
            informacion.sim.simbolo == 1
          ) {
            this.generador3D(informacion, controlador);
          }
        }
      } else {
        if (
          informacion.identificador == controlador.extxt.id &&
          informacion.sim.simbolo == 2
        ) {
          controlador.append(informacion.sim.valor + "\n");
        } else {
          if (controlador.extxt.id == "*" && informacion.sim.simbolo == 2) {
            controlador.append(informacion.sim.valor);
          }
        }
      }
    }
  }

  generador3D(informacion, controlador: Controlador) {
    if (controlador.exprecion != null) {
      let salida = controlador.exprecion.getvalor3d(
        controlador,
        controlador.ts
      );
      controlador.generador.genLabel(salida.lblTrue);
      controlador.append(informacion.sim.objeto.gettxt("", controlador));
      controlador.generador.genPrint("c", "10");
      controlador.generador.genLabel(salida.lblFalse);
      controlador.exprecion.limpiar();
    } else {
      controlador.append(informacion.sim.objeto.gettxt("", controlador));
      controlador.generador.genPrint("c", "10");
    }
  }

  recorrer(): Nodo {
    let padre = new Nodo("text()", "");
    return padre;
  }
}
