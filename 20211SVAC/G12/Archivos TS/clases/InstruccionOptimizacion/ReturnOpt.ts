import {Nodo} from '../InstruccionOptOtros/Nodo';

export  class ReturnOpt extends Nodo {

  constructor(linea: number) {
    super(linea);
  }

  optimizar(): any {
    return 'return;\n';
  }
}
