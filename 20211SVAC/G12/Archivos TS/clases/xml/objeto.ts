import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces.ts/Instruccion";
import Simbolos from "../TablaSimbolos/Simbolos";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../TablaSimbolos/Tipo";
import Atributo from "./atributo";

export default class Objeto implements Instruccion {
  public identificador: string;
  public texto: string;
  public listaAtributos: Array<Atributo>;
  public listaObjetos: Array<Objeto>;
  public linea: number;
  public columna: number;
  public tipoetiqueta: number;
  public posicionid3d: string;
  public posiciontext3d: string;
  public etiquetaF: string;

  constructor(
    id: string,
    texto: string,
    linea: number,
    columna: number,
    listaAtributos: Array<Atributo>,
    listaO: Array<Objeto>,
    tipoetiqueta: number,
    etiquetaF?
  ) {
    this.identificador = id;
    this.texto = texto;
    this.linea = linea;
    this.columna = columna;
    this.listaAtributos = listaAtributos;
    this.listaObjetos = listaO;
    this.tipoetiqueta = tipoetiqueta;
    this.etiquetaF = etiquetaF;
  }

  ejecutar(controlador: Controlador, ts: TablaSimbolos) {
    if (this.tipoetiqueta == 2) {
      if (this.identificador != this.etiquetaF) {
        controlador.append(
          "Error: La etiqueta de inicio y fin no coinciden:: inicio: " +
            this.identificador +
            " final: " +
            this.etiquetaF
        );
      }
    }

    this.posicionid3d = this.generar3d(this.identificador, controlador);
    let ts_local = new TablaSimbolos(ts, this.identificador);
    if (this.texto.length > 0) {
      this.posiciontext3d = this.generar3d(this.texto, controlador);
    }
    for (let at of this.listaAtributos) {
      let tipo = new Tipo("IDENTIFICADOR");
      let sim = new Simbolos(2, tipo, at.identificador, at.valor,at);
      at.posicion3d = this.generar3d(at.valor, controlador);
      at.posicionId3d = this.generar3d(at.identificador, controlador);
      ts_local.agregar(at.identificador, sim);
    }
    for (let at of this.listaObjetos) {
      let tipo = new Tipo("OBJETO");
      const regex = /^[0-9]+("."[0-9]+)?$/;
      let sim: Simbolos;
      if (isNaN(Number(at.texto))) {
        console.log("no numero:" + at.texto);
        sim = new Simbolos(1, tipo, at.identificador, at.texto, at);
      } else {
        console.log("numero: " + at.texto);
        sim = new Simbolos(1, tipo, at.identificador, Number(at.texto), at);
      }
      ts_local.agregar(at.identificador, sim);
      ts_local.agregarSiguiente(
        at.identificador,
        at.ejecutar(controlador, ts_local)
      );
    }
    return ts_local;
  }

  gethtml(tab: string, controlador: Controlador) {
    const generator = controlador.generador;
    generator.genPrint("c", "60");

    generator.genSetStack("p", this.posicionid3d);
    generator.genCall("nativa_print_str");

    let xml = tab + "<" + this.identificador;
    for (let at of this.listaAtributos) {
      generator.genPrint("c", "32");

      generator.genSetStack("p", at.posicionId3d);
      generator.genCall("nativa_print_str");

      generator.genPrint("c", "61");
      generator.genPrint("c", "34");

      generator.genSetStack("p", at.posicion3d);
      generator.genCall("nativa_print_str");

      generator.genPrint("c", "34");

      xml += " " + at.identificador + '="' + at.valor + '" ';
    }
    if (this.tipoetiqueta == 1) {
      generator.genPrint("c", "47");
      generator.genPrint("c", "62");
      xml += "/>";
    } else {
      if (this.texto.length > 0) {
        generator.genPrint("c", "62");

        generator.genSetStack("p", this.posiciontext3d);
        generator.genCall("nativa_print_str");

        generator.genPrint("c", "60");

        generator.genSetStack("p", this.posicionid3d);
        generator.genCall("nativa_print_str");

        generator.genPrint("c", "47");
        generator.genPrint("c", "62");

        xml += ">" + this.texto + "<" + this.identificador + "/>";
      } else {
        tab = tab + "   ";
        generator.genPrint("c", "62");
        xml += ">";
        for (let at of this.listaObjetos) {
          xml += "\n";
          generator.genPrint("c", "10");
          xml += at.gethtml(tab, controlador);
        }
        generator.genPrint("c", "10");
        generator.genPrint("c", "60");

        generator.genSetStack("p", this.posicionid3d);
        generator.genCall("nativa_print_str");

        generator.genPrint("c", "47");
        generator.genPrint("c", "62");

        xml += tab + "\n<" + this.identificador + "/>";
      }
    }

    return xml;
  }

  gettxt(tab: string, controlador: Controlador) {
    const generator = controlador.generador;
    let xml = "";
    if (this.texto.length > 0) {
      generator.genSetStack("p", this.posiciontext3d);
      generator.genCall("nativa_print_str");
      xml += this.texto;
    } else {
      for (let at of this.listaObjetos) {
        xml += "\n";
        generator.genPrint("c", "10");
        xml += at.gethtml(tab, controlador);
      }
    }

    return xml;
  }

  recorrer(): Nodo {
    let padre = new Nodo("objeto", "");

    let hijo = new Nodo(this.identificador, "");
    if (this.texto.length > 0) {
      hijo.AddHijo(new Nodo(this.texto, ""));
    }
    for (let at of this.listaAtributos) {
      hijo.AddHijo(new Nodo(at.identificador, ""));
    }
    for (let at of this.listaObjetos) {
      hijo.AddHijo(at.recorrer());
    }
    padre.AddHijo(hijo);
    return padre;
  }

  generar3d(entrada: string, controlador: Controlador): string {
    const generator = controlador.generador;
    const temp = generator.newTemporal();
    generator.genAsignacion(temp, "h");
    for (let i = 0; i < entrada.length; i++) {
      generator.genSetHeap("h", entrada.charCodeAt(i));
      generator.avanzarHeap();
    }
    generator.genSetHeap("h", "-1");
    generator.avanzarHeap();
    return temp;
  }
}
