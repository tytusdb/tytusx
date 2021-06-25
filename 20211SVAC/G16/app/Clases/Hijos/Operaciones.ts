import { Operador } from './TipoOperacion';
import Entorno from '../AST/Entorno';
import { Expresion } from './../Interfaces/Expresion';
export class Operacion implements Expresion{

  tipo:Operador;
  operador1:any;
  operador2:any;

  constructor(tipo:Operador,operador1:any,operador2:any) {
    this.tipo=tipo;
    this.operador1=operador1;
    this.operador2=operador2;
  }
  ejecutar(Entorno: Entorno) {
    throw new Error('Method not implemented.');
  }

}
