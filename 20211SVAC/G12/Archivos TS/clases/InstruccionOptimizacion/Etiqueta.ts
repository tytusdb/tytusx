import {Nodo} from '../InstruccionOptOtros/Nodo';

export  class Etiqueta extends Nodo {
  etiqueta: string;

  constructor(etiqueta: string, linea: number) {
    super(linea);
    this.etiqueta = etiqueta;
  }

  optimizar(): any {
    return `${this.etiqueta}:\n`;
  }
}
