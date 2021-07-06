import { Instruccion } from "./Instruccion";
import { Optimizacion } from "./optimizacion";
import { Optimizaciones } from "./optimizaciones";

export class Optimizador {

  instrucciones: Instruccion[];
  codigo: string;

  constructor(instrucciones: Instruccion[]) {
    //Object.assign(this, {instrucciones, codigo: ''});
    this.instrucciones = instrucciones;
    this.codigo = '';
  }

  optimizar(): void {
    Optimizaciones.clear();
    let salida = '';
    for (const inst of this.instrucciones) {
      salida += inst.optimizar();
    }
    this.codigo = salida;
  }

  getCodigo(): string {
    return this.codigo;
  }

  getOptimizaciones(): Optimizacion[] {
    return Optimizaciones.getOptimizaciones();
  }

}
