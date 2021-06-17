import Atributo from "../Expresiones/Atributo";
import Objeto from "../Expresiones/Objeto";

export class reporteTabla {
  public identificador: String;
  public contenido: string;
  public listaAtributos: String;
  public listaObjetos: String;


  constructor(identificador: String, contenido:string, listaAtributos: String,  listaObjetos: String) {
    this.identificador = identificador;
    this.contenido = contenido;
    this.listaAtributos = listaAtributos;
    this.listaObjetos = listaObjetos;
  
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



}
