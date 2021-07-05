import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Expreciones } from "../Interfaces.ts/Expreciones";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Errores from "../AST/Errores";
import { retorno } from "./retorno";
import Tipo from "../TablaSimbolos/Tipo";

export default class Identificador implements Expreciones {
  public identificador: string;
  public linea: number;
  public columna: number;
  public valor: number;
  lblTrue: string;
  lblFalse: string;
  public condicion: number;

  constructor(identifador, linea, columna, t, condicion) {
    this.identificador = identifador;
    this.linea = linea;
    this.columna = columna;
    this.valor = t;
    this.condicion = condicion;
  }
  getvalor3d(controlador: Controlador, ts: TablaSimbolos) {
    if (this.condicion == 1) {
      console.log("getValor3D");
      let existe_id;
      let contador = 1;
      for (let tssig of ts.sig) {
        if (contador == controlador.posicionid) {
          existe_id = tssig.sig.getSimbolo(this.identificador, this.valor);
        }
        contador++;
      }
      console.log(existe_id);

      if (existe_id != null) {
        const generator = controlador.generador;
        if (typeof existe_id.valor == "number") {
          return new retorno(existe_id.valor + "", false, new Tipo("DOBLE"));
        } else if (typeof existe_id.valor == "string") {
          console.log("entre****");
          console.log(existe_id);
          const temp = generator.newTemporal();
          generator.genAsignacion(temp, "h");
          for (let i = 0; i < existe_id.valor.length; i++) {
            generator.genSetHeap("h", existe_id.valor.charCodeAt(i));
            generator.avanzarHeap();
          }
          generator.genSetHeap("h", "-1");
          generator.avanzarHeap();
          return new retorno(temp, true, new Tipo("STRING"));
        } else {
          console.log("no entre");
        }
      }
    } else {
      /*let existe_id = ts.getSimbolo2(this.identificador);

        if(existe_id != null){
            return existe_id.valor; 
        }else{
            let error = new Errores('Semantico', `No existe la variable ${this.identificador} en la tabla de simbolos.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`Error Semantico : No existe la variable ${this.identificador} en la tabla de simbolos. En la linea ${this.linea} y columan ${this.columna}`);
            return null;
        }*/
    }
  }
  limpiar() {}

  getTipo(controlador: Controlador, ts: TablaSimbolos) {
    /* let existe_id = ts.getSimbolo(this.identificador);
        if(existe_id != null ){
            return existe_id.tipo.type;
        }*/
  }
  getValor(controlador: Controlador, ts: TablaSimbolos) {
    if (this.condicion == 1) {
      console.log("getValor");
      let existe_id;
      let contador = 1;
      for (let tssig of ts.sig) {
        if (contador == controlador.posicionid) {
          existe_id = tssig.sig.getSimbolo(this.identificador, this.valor);
        }
        contador++;
      }

      if (existe_id != null) {
        return existe_id.valor;
      } else {
        /* let error = new Errores('Semantico', `No existe la variable ${this.identificador} en la tabla de simbolos.`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`Error Semantico : No existe la variable ${this.identificador} en la tabla de simbolos. En la linea ${this.linea} y columan ${this.columna}`);*/
        return null;
      }
    }else{
        let existe_id = ts.getSimbolo2(this.identificador);

        if(existe_id != null){
            return existe_id.valor; 
        }else{
            let error = new Errores('Semantico', `No existe la variable ${this.identificador} en la tabla de simbolos.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`Error Semantico : No existe la variable ${this.identificador} en la tabla de simbolos. En la linea ${this.linea} y columan ${this.columna}`);
            return null;
        }
    }
  }
  recorrer(): Nodo {
    let padre = new Nodo("Identificador", "");
    padre.AddHijo(new Nodo(this.identificador, ""));
    return padre;
  }
}
