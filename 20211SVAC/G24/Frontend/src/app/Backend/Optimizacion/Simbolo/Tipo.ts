export default class Tipo {
    private tipos: tipoDato;
    constructor(tipos: tipoDato) {
      this.tipos = tipos;
    }
    public getTipo(): tipoDato {
      return this.tipos;
    }
    public setTipo(tipo: tipoDato): void {
      this.tipos = tipo;
    }
    public igual(compara: Tipo) {
      return (this.tipos = compara.tipos);
    }
  }
  
  export enum tipoDato {
    CADENA,
    OBJETO,
    ENTERO,
    PILA,
    STACK,
    HEAP,
    VALOR_RET,
    RA,
    PUNTERO,
    TERMPORAL,
    DECIMAL,
    BOOLEANO,
    CARACTER,
    SELECT,
    ATRIBUTO
  
  }
  