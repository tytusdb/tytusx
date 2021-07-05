import {InstruccionOptimizada} from './InstruccionOptimizada';

export class ListaRepoOptimizacion extends Array<InstruccionOptimizada>{
  private static lista: ListaRepoOptimizacion = new ListaRepoOptimizacion();

  private constructor() {
    super();
  }
  public static getLista(): ListaRepoOptimizacion{
    return this.lista;
  }
}
