import {Nodo} from '../InstruccionOptOtros/Nodo';

export  class Salto extends Nodo {
  salto: string;

  constructor(salto: string, linea: number) {
    super(linea);
    this.salto = salto;
  }

  optimizar(): any {
    return `goto ${this.salto};\n`;
  }
}
