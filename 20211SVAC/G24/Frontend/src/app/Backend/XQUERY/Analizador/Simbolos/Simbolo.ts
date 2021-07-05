import Tipo from './Tipo';

export default class Simbolo {
  private tipo: Tipo;
  private identificador: String;
  private valor: any; //este es el valor que va a recibir

  constructor(tipo: Tipo, identificador: String, valor?: any) {
    this.tipo = tipo;
    this.identificador = identificador.toLowerCase();
    this.valor = valor;
  }
  //getters y setters
  public gettipo(): Tipo {
    return this.tipo;
  }
  public settipo(value: Tipo) {
    this.tipo = value;
  }
  public getidentificador(): String {
    return this.identificador;
  }
  public setidentificador(value: String) {
    this.identificador = value;
  }
  public getvalor(): any {
    return this.valor;
  }
  public setvalor(value: any) {
    this.valor = value;
  }
}
