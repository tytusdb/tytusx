import Tipo from './Tipo';

export default class Simbolo {
  private tipo: Tipo;
  private identificador: String;
  private atributo = new Map<String, String>();
  private linea: String;
  private columna: String;
  private valor: any; //este es el valor que va a recibir

  private cd3variable:any;
  private temporal
  private ambito:String
  private cdatributo:any;
  constructor(tipo: Tipo, identificador: String, linea: String, columna: String, ambito:String, valor?: any,cd3script?: string) {
    this.tipo = tipo;
    this.identificador = identificador.toLowerCase();
    this.valor = valor;
    this.linea = linea;
    this.columna = columna;
    this.cd3variable= cd3script;
    this.ambito=ambito;
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
  
  public agregarAtributo(par1: String, par2: String,linea:String, columna:String, cd3:String) {
    this.atributo.set(par1, par2);
    this.cdatributo=cd3;
    this.linea=linea;
    this.columna=columna;
  }

  public getAtributo(): Map<String, String> {
    return this.atributo;
  }

  public setAtributo(atributo: Map<String, String>) {
    this.atributo = atributo;
    
  }
  public getAtributoLinea(){
    return this.linea
  }
  public getAtributoColumna(){
    return this.columna
  }
  public get3DAtributo(){
    return this.cdatributo
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


  public getcd3Value(etiqueta:String){
    this.cd3variable=etiqueta
  }
  public setcd3Value():String{
    return this.cd3variable
  }
  public igualdadambito():String{
    this.temporal=this.ambito
    return this.ambito
  }
  public setanteriorEntorno(ent :String){
    this.temporal= ent
  }
  public getantriorEntorno():String{
    return this.temporal;
  }
  public getambito():String{
    return this.ambito
  }
}