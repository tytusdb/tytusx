export default class declaracion{
  public tipo: string
  public id: string

  constructor(tipo, id) {
      this.tipo = tipo;
      this.id = id;
  }

  getText(){
    return this.tipo + " " + this.id + ";";
  }

}
