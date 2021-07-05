import {Nodo} from '../InstruccionOptOtros/Nodo';

export  class Llamada extends Nodo {
  identificador: string;

  constructor(identificador: string, linea: number) {
    super(linea);
    this.identificador = identificador;
  }

  optimizar(): any {
    return `${this.identificador}();\n`;
  }
}
