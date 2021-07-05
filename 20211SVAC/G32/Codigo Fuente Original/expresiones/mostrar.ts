import * as _ from 'lodash';
import { Objeto } from '../abstractas/objeto';
import { Entorno } from '../interfaces/entorno';
import { Instruccion } from '../interfaces/instruccion';
import { Arreglo } from './ejeArreglo';
import { Retorno } from './ejeReturn';
import { If_Else } from './if_else';

export class Mostrar extends Instruccion {

  impresion: Instruccion;

  constructor(linea: string, impresion: Instruccion) {
    super(linea);
    Object.assign(this, { impresion });
  }

  ejecutar(e: Entorno): any {
    if (!this.impresion) {
      return null;
    }
    let res
    if (this.impresion[0] instanceof If_Else) {
      res = this.impresion[0].ejecutar(e);
    }
    else
      res = this.impresion.ejecutar(e);
    res = _.cloneDeep(res);
    if (res instanceof Arreglo) {
      res = res.toString();
    }
    if(res instanceof Retorno){
      res = res.value
    }
    const salida = res ?? 'null';
    return salida;
  }

}