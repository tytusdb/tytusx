export class reporteTabla {
  private identificador: String;
  private forma: String;
  private tipo: String;
  private entorno: String;
  private linea: String;
  private columna: String;
  private valor: String;
  constructor(
    identificador: String,
    valor: String,
    forma: String,
    tipo: String,
    entorno: String,
    linea: String,
    columna: String
  ) {
    this.identificador = identificador.toLowerCase();
    this.forma = forma;
    this.tipo = tipo;
    this.entorno = entorno;
    this.linea = linea;
    this.columna = columna;
    this.valor = valor;
  }
  public getIdentificador(): String {
    return this.identificador;
  }
  public getForma(): String {
    return this.forma;
  }
  public getTipo(): String {
    return this.tipo;
  }
  public getEntorno(): String {
    return this.entorno;
  }
  public getLinea(): String {
    return this.linea;
  }
  public getColumna(): String {
    return this.columna;
  }
  public getValor(): String {
    return this.valor;
  }
  public setLinea(linea: String) {
    this.linea = linea;
  }
  public setColumna(col: String) {
    this.columna = col;
  }
  public setValor(val: String) {
    this.valor = val;
  }
  public setEntorno(ent: String) {
    this.entorno = ent;
  }
}
