import _ = require("lodash");
import { Entorno } from "../interfaces/entorno";
import { Instruccion } from "../interfaces/instruccion";
import { Retorno as recuperarRetorno } from './ejeReturn';

export class Retorno extends Instruccion {
  has_value: boolean;
  value: any;
  linea: string;

  constructor(linea: string, has_value: boolean, value: any) {
    super(linea)
    Object.assign(this, { has_value, value });
  }

  ejecutar(e: Entorno) {
    if(this.has_value && this.value != null){
      const valor = this.value.ejecutar(e);
      return new recuperarRetorno(this.has_value, valor);
    }
  }
}