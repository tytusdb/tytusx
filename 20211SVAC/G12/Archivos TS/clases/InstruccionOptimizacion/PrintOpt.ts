import {Nodo} from '../InstruccionOptOtros/Nodo';

export  class PrintOpt extends Nodo {
  argumento1: string;
  argumento2: string;

  constructor(argumento1: string, argumento2: string, linea: number) {
    super(linea);
    this.argumento1 = argumento1;
    this.argumento2 = argumento2;
  }

  optimizar(): any {
    if (this.argumento2 == null){
      return `printf(\"${this.argumento1}\");\n`;
    }
    else {
      return `printf(\"${this.argumento1}\", ${this.argumento2});\n`;
    }
  }
}
