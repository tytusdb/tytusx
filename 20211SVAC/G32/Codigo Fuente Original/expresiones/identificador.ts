import { Error } from "../arbol/error";
import { Errores } from "../arbol/errores";
import { Entorno } from "../interfaces/entorno";
import { Instruccion } from "../interfaces/instruccion";
import * as _ from 'lodash';

export class identificador extends Instruccion {
  id: string;

  constructor(linea: string, id: string) {
    super(linea);
    Object.assign(this, { id, linea });
  }

  ejecutar(e: Entorno) {
    const variable = e.getVariable(this.id);
      //console.log('identif\n',this.id,variable, e)
    if (variable) {
      return variable.getValor();
    }
    Errores.getInstance().push(new Error({ tipo: 'Sémantico', linea: this.linea, descripcion: `No se encontró la variable ${this.id}` }));
    return null;
  }
}