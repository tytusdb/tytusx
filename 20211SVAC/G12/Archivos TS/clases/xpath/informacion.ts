export default class informacion {
  public id: string;
  public exprecion;
  public tipo;

  constructor(id: string, exprecion, tipo) {
    this.id = id;
    this.exprecion = exprecion;
    this.tipo = tipo;
  }
}
