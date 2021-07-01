import { Instruccion } from "../Interfaces/Instruccion";

export class DatoFuncion implements Instruccion{
  t: string;
  ejecutar(entorno: any, node: any) {
    throw new Error("Method not implemented.");
  }

}
