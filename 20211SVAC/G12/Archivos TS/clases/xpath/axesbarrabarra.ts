import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import Relaciones from "../Expreciones/Operaciones/Relaciones";
import Primitivo from "../Expreciones/Primitivo";
import { Instruccion } from "../Interfaces.ts/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import informacion from "./informacion";

export default class axesbarrabarra implements Instruccion {
  public tipo: string;
  public exprecion: informacion;
  public sig;

  constructor(tipo: string, exprecion: informacion, sig) {
    this.tipo = tipo;
    this.exprecion = exprecion;
    this.sig = sig;
  }

  ejecutar(controlador: Controlador, ts: TablaSimbolos) {
    if (this.tipo == "child") {
      this.child(controlador, ts);
    } else {
      if (this.tipo == "") {
      }
    }
  }

  child(controlador: Controlador, ts: TablaSimbolos){
    if (this.exprecion.exprecion != null) {
      this.isxprecion(controlador, ts);
    } else {
      if (this.sig != null) {
        this.siguiente(controlador, ts);
      } else {
        this.obtenerall(controlador, ts);
      }
    }
  }

  obtenerall(controlador: Controlador, ts: TablaSimbolos) {
    if (ts != null) {
      for (let informacion of ts.tabla) {
        if (this.exprecion.tipo == 1) {
          if (this.exprecion.id == "*" && informacion.sim.simbolo == 1) {
            this.generador3D(informacion, controlador);
          } else {
            if (
              informacion.identificador == this.exprecion.id &&
              informacion.sim.simbolo == 1
            ) {
              this.generador3D(informacion, controlador);
            }
          }
        } else {
          if (
            informacion.identificador == this.exprecion.id &&
            informacion.sim.simbolo == 2
          ) {
            this.generador3DV(informacion, controlador);
          } else {
            if (this.exprecion.id == "*" && informacion.sim.simbolo == 2) {
              this.generador3DV(informacion, controlador);
            }
          }
        }
      }
      for (let tssig of ts.sig) {
        this.obtenerall(controlador, tssig.sig);
      }
    }
  }

  siguiente(controlador: Controlador, ts: TablaSimbolos) {
    if (ts != null) {
      for (let tssig of ts.sig) {
        if (
          this.exprecion.id == tssig.identificador ||
          this.exprecion.id == "*"
        ) {
          this.sig.ejecutar(controlador, tssig.sig);
        } else {
          this.siguiente(controlador, tssig.sig);
        }
      }
    }
  }

  isxprecion(controlador: Controlador, ts: TablaSimbolos) {
    controlador.idlast = this.exprecion.id;
    let valor = this.exprecion.exprecion.getValor(controlador, ts);
    if (typeof valor == "number") {
      this.isNumero(controlador, ts, valor);
    } else {
      this.esbool(controlador, ts);
    }
  }

  isNumero(controlador: Controlador, ts: TablaSimbolos, valor) {
    if (this.sig != null) {
      this.siguienteNumero(controlador, ts, valor);
    } else {
      this.obtenerallNumero(controlador, ts, valor);
    }
  }

  esbool(controlador: Controlador, ts: TablaSimbolos) {
    if (this.sig != null) {
      this.siguienteBool(controlador, ts);
    } else {
      this.obtenerBool(controlador, ts);
    }
  }

  siguienteNumero(controlador: Controlador, ts: TablaSimbolos, valor) {
    let cont = 1;
    if (ts != null) {
      for (let tssig of ts.sig) {
        if (this.exprecion.id == tssig.identificador) {
          valor = this.exprecion.exprecion.getValor(controlador, ts);
          if (cont == valor) {
            let val1 = new Primitivo(cont, 1, 1, -1);
            let val2 = this.exprecion.exprecion;
            let igual = new Relaciones(val1, "==", val2, 1, 1, false);
            controlador.exprecion = igual;
            controlador.ts = ts;
            this.sig.ejecutar(controlador, tssig.sig);
          }
          cont++;
        } else {
          this.siguienteNumero(controlador, tssig.sig, valor);
        }
      }
    }
  }

  obtenerallNumero(controlador: Controlador, ts: TablaSimbolos, valor) {
    let cont = 1;
    if (ts != null) {
      for (let informacion of ts.tabla) {
        if (informacion.identificador == this.exprecion.id) {
          valor = this.exprecion.exprecion.getValor(controlador, ts);
          if (cont == valor) {
            let val1 = new Primitivo(cont, 1, 1, -1);
            let val2 = this.exprecion.exprecion;
            let igual = new Relaciones(val1, "==", val2, 1, 1, false);
            let salida = igual.getvalor3d(controlador, ts);
            controlador.generador.genLabel(salida.lblTrue);
            controlador.append(informacion.sim.objeto.gethtml("", controlador));
            controlador.generador.genPrint("c", "10");
            controlador.generador.genLabel(salida.lblFalse);
            igual.limpiar();
          }
          cont++;
        }
      }
      for (let tssig of ts.sig) {
        this.obtenerallNumero(controlador, tssig.sig, valor);
      }
    }
  }

  siguienteBool(controlador: Controlador, ts: TablaSimbolos) {
    let cont = 1;
    let posicion = 1;
    if (ts != null) {
      for (let tssig of ts.sig) {
        if (this.exprecion.id == tssig.identificador) {
          controlador.position = cont;
          controlador.posicionid = posicion;
          if (this.exprecion.exprecion.getValor(controlador, ts)) {
            controlador.exprecion = this.exprecion.exprecion;
            controlador.ts = ts;
            this.sig.ejecutar(controlador, tssig.sig);
          }
          cont++;
        } else {
          this.siguienteBool(controlador, tssig.sig);
        }
        posicion++;
      }
    }
  }

  obtenerBool(controlador: Controlador, ts: TablaSimbolos) {
    let cont = 1;
    let posicion = 1;
    if (ts != null) {
      for (let informacion of ts.tabla) {
        if (informacion.identificador == this.exprecion.id) {
          controlador.position = cont;
          controlador.posicionid = posicion;
          if (this.exprecion.exprecion.getValor(controlador, ts)) {
            let salida = this.exprecion.exprecion.getvalor3d(controlador, ts);
            controlador.generador.genLabel(salida.lblTrue);
            controlador.append(informacion.sim.objeto.gethtml("", controlador));
            controlador.generador.genPrint("c", "10");
            controlador.generador.genLabel(salida.lblFalse);
            this.exprecion.exprecion.limpiar();
          }
          cont++;
        }
        posicion++;
      }
      for (let tssig of ts.sig) {
        this.obtenerBool(controlador, tssig.sig);
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
      controlador.append(informacion.sim.objeto.gethtml("", controlador));
      controlador.generador.genPrint("c", "10");
      controlador.generador.genLabel(salida.lblFalse);
      controlador.exprecion.limpiar();
    } else {
      controlador.append(informacion.sim.objeto.gethtml("", controlador));
      controlador.generador.genPrint("c", "10");
    }
  }

  generador3DV(informacion, controlador: Controlador) {
    if (controlador.exprecion != null) {
      let salida = controlador.exprecion.getvalor3d(
        controlador,
        controlador.ts
      );
      controlador.generador.genLabel(salida.lblTrue);
      controlador.generador.genSetStack("p", informacion.sim.objeto.posicion3d);
      controlador.generador.genCall("nativa_print_str");
      controlador.generador.genPrint("c", "10");
      controlador.generador.genLabel(salida.lblFalse);
      controlador.exprecion.limpiar();
      controlador.append(informacion.sim.valor + "\n");
    } else {
      controlador.generador.genSetStack("p", informacion.sim.objeto.posicion3d);
      controlador.generador.genCall("nativa_print_str");
      controlador.generador.genPrint("c", "10");
      controlador.append(informacion.sim.valor);
    }
  }


  recorrer(): Nodo {
    let padre = new Nodo("//", "");
    padre.AddHijo(new Nodo("Child::" + this.exprecion.id, ""));
    if (this.exprecion.exprecion != null) {
      padre.AddHijo(new Nodo("[", ""));
      padre.AddHijo(this.exprecion.exprecion.recorrer());
      padre.AddHijo(new Nodo("]", ""));
    }
    if (this.sig != null) {
      padre.AddHijo(this.sig.recorrer());
    }
    return padre;
  }
}
