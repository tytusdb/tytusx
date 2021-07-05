
export abstract class Nodo{
    linea: number;
  
    abstract optimizar(): any;
  
    protected constructor(linea: number) {
      this.linea = linea;
    }
  }
  