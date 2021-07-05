import { Instruccion } from "./Instruccion";

export abstract class InstruccionConOptimizacion extends Instruccion{
  constructor(linea: string, codigo: string){
    super(linea, codigo);
  }
}
