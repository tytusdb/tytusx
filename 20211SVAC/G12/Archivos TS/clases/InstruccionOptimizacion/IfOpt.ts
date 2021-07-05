import {Nodo} from '../InstruccionOptOtros/Nodo';

export  class IfOpt extends Nodo {
  operandoIzq: string;
  operadorRel: string;
  operandoDer: string;
  saltoV: string;

  constructor(operandoIzq: string, operadorRel: string, operandoDer: string, saltoV: string, linea: number) {
    super(linea);
    this.operandoIzq = operandoIzq;
    this.operadorRel = operadorRel;
    this.operandoDer = operandoDer;
    this.saltoV = saltoV;
  }

  optimizar(): any {
    return `if(${this.operandoIzq} ${this.operadorRel} ${this.operandoDer}) goto ${this.saltoV};\n`;
  }
}
