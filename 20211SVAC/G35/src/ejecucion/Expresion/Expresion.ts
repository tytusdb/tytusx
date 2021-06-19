import { TIPO_DATO } from './Tipo';

export class Expresion {
    tipo: TIPO_DATO;
    valor: any;
  
    constructor({tipo_,valor_}:{tipo_: any, valor_: any}) {
      this.tipo=tipo_;
      this.valor=valor_;
    }
  }