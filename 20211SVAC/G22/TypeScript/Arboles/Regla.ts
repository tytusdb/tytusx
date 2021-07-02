export class Regla{
  tipo: String;
  produccion: string;
  reglaSemantica: string;

  constructor(tipo: String, produccion: string, reglaSemantica:string) {
    this.tipo = tipo;
    this.produccion = produccion;
    this.reglaSemantica = reglaSemantica;
  }

  public getProduccion():string {
    return this.produccion;
  }

  public getReglaSemantica():string {
    return this.reglaSemantica;
  }

}

