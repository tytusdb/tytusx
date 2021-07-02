
export class reporteTabla {
  public identificador: String;
  public tipo: String;
  public entorno:String;
  public contenido: String;
  public linea:String;
  public columna:String;
  public posicion: String;

  constructor(identificador: String, tipo:String, entorno: String, contenido: String,linea:String,columna:String,posicion:String) {
    this.identificador = identificador;
    this.tipo=tipo;
    this.entorno=entorno;
    this.contenido = contenido;
    this.linea=linea;
    this.columna=columna;
    this.posicion=posicion;
  }
  public getIdentificador(): String {
    return this.identificador;
  }

  public setIdentificador(identificador:string){
    this.identificador=identificador;
  }

  public getContenido(): String {
    return this.identificador;
  }

  public setContenido(contenido:string){
    this.contenido=contenido;
  }

  public getTipo():String{
    return this.tipo;
  }

  public setTipo(tipo:String) {
    this.tipo = tipo;
  }

  public getEntorno():String{
    return this.entorno;
  }

  public setEntorno(ent: String) {
    this.entorno = ent;
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
  public getPosicion():String{
    return this.posicion;
  }

  public setPosicion(posicion:String){
    this.posicion=posicion;
  }


}
