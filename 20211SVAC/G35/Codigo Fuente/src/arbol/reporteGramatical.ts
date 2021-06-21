import { reglaGramatical } from './reglaGramatical';

export class ReporteGramatical {
  private static instance: ReporteGramatical;
  lista: reglaGramatical[];
  lista2: reglaGramatical[];
  

  private constructor() {
    this.lista = [];
    this.lista2 = [];
  }

  public static getInstance(): ReporteGramatical {
    if (!ReporteGramatical.instance) {
      ReporteGramatical.instance = new ReporteGramatical();
    }
    return ReporteGramatical.instance;
  }

  public push(regla: reglaGramatical): void {
    this.lista.unshift(regla);
  }

  public push2(regla: reglaGramatical): void {    
    this.lista2.unshift(regla);
  }

  public clear(): void{
    this.lista = [];
    this.lista2 = [];
  }

  public hasRules() : boolean{
    return this.lista.length > 0;
  }

  public hasRules2() : boolean{
    return this.lista2.length > 0;
  }
  
  public getRules(): reglaGramatical[]{
    return this.lista;
  }

  public getRules2(): reglaGramatical[]{
    return this.lista2;
  }

}