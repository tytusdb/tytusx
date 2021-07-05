export class reporteOp {
  private Tipo_Optimizacion: String;
  private Regla: String;
  private eliminado: String;
  private agregado: String;
  private linea: String;
  private columna: String;
  constructor(
    tipo: String,
    regla: String,
    eliminado: String,
    agregado: String,
    linea: String,
    columna: String
  ) {
    this.eliminado = eliminado;
    this.Regla = regla;
    this.Tipo_Optimizacion = tipo;
    this.linea = linea;
    this.columna = columna;
    this.agregado = agregado;
  }
  public getTipoOptimizacion(): String {
    return this.Tipo_Optimizacion;
  }
  public getRegla(): String {
    return this.Regla;
  }
  public getEliminado(): String {
    return this.eliminado;
  }
  public getAgregado(): String {
    return this.agregado;
  }
  public getLinea(): String {
    return this.linea;
  }
  public getColumna(): String {
    return this.columna;
  }
  public setLinea(linea: String) {
    this.linea = linea;
  }
  public setColumna(col: String) {
    this.columna = col;
  }
}
