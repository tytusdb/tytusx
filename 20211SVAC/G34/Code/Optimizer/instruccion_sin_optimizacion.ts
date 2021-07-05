import { Instruccion } from "./Instruccion";

export class InstruccionSinOptimizacion extends Instruccion{
  constructor(linea: string, codigo: string){
    super(linea, codigo);
  }

  optimizar(): string{
    return this.codigo;
  }
}
