export class InstruccionOptimizada{
    tipoOptimizacion: string;
    reglaAplicada: string;
    codigoEliminado: string;
    codigoAgregado: string;
    fila: number;
  
    constructor(tipoOptimizacion: string, reglaAplicada: string, codigoEliminado: string, codigoAgregado: string, fila: number){
      this.tipoOptimizacion = tipoOptimizacion;
      this.reglaAplicada = reglaAplicada;
      this.codigoEliminado = codigoEliminado;
      this.codigoAgregado = codigoAgregado;
      this.fila = fila;
    }
  }
  