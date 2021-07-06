import { Instruccion } from "./Instruccion";

export class InstIf extends Instruccion {
  linea: string;
  codigo: string;
  op1: string;
  op: string;
  op2: string;

  constructor(linea: string, codigo: string, op1: string, op: string, op2: string) {
    super(linea, codigo);
    //Object.assign(this, {op1, op, op2});
    this.linea = linea;
    this.codigo = codigo;
    this.op1 = op1;
    this.op = op;
    this.op2 = op2;
  }

  optimizar(): string {
    return this.codigo;
  }

  public canOptimize(): boolean {
    if (this.isNumeric(this.op1) && this.isNumeric(this.op2)) {
      if (this.op == '==') {
        return this.op1 == this.op2;
      }
      else if (this.op == '!=') {
        return this.op1 != this.op2;
      }
    }
    return false;
  }

  private isNumeric(val: string): boolean {
    const temp = +val;
    return !isNaN(temp);
  }
}
