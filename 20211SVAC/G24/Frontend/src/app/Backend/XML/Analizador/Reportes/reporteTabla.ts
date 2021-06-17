import Atributo from "../Expresiones/Atributo";
import Objeto from "../Expresiones/Objeto";

export class reporteTabla {
  public identificador: String;
  public contenido: string;
  public listaAtributos: String;
  public listaObjetos: String;
  public linea:String;
  public columna:String;


  constructor(identificador: String, contenido:string, listaAtributos: String,  listaObjetos: String,linea:String,columna:String) {
    this.identificador = identificador;
    this.contenido = contenido;
    this.listaAtributos = listaAtributos;
    this.listaObjetos = listaObjetos;
    this.linea=linea;
    this.columna=columna;
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

  public getListaAtributos():String{
    return this.listaAtributos;
  }

  public setListaAtributos(listaAtributos:String) {
    this.listaAtributos = listaAtributos;
  }

  public getListaObjetos():String{
    return this.listaObjetos;
  }

  public setListaObjetos(listaObjetos:String) {
    this.listaObjetos = listaObjetos;
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
