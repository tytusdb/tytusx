import Objeto from "./Objeto";

export default class Raiz{

  nombre:string;

  public lista=new Array<Objeto>();

  constructor(nombre:string){
      this.nombre=nombre;

  }

  public agregarHijo(elemento:Objeto){
      this.lista.push(elemento);
  }

  public getLista():Array<Objeto>{
      return this.lista;
  }
  public getNombre():string{
      return this.nombre;
  }

}
