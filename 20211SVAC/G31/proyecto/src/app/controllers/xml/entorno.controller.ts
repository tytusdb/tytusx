import { Simbolo } from "./simbolo.controller";

export class Entorno {
  anterior: Entorno;
  tabla: {[id:number]: Simbolo}
  public contador: number;

  constructor(anterior: any){
    this.tabla = {};
    this.anterior = anterior;
    this.contador = 1;
  }

  agregar(simbolo: Simbolo){
    this.tabla[this.contador++]=simbolo;
  }

  buscar(){

  }

  getSimbolos(id: string): Array<Simbolo> {
    const listaSimbolos: Array<Simbolo> = new Array<Simbolo>();
    for (let i = 1; i < this.contador; i++) {
      if(this.tabla[i] != undefined){
        if(this.tabla[i].id == id){
          listaSimbolos.push(this.tabla[i])
        }
      }
    }
    return listaSimbolos
  }

  getSimbolo(id: string):Simbolo | any {
    for (let i = 1; i < this.contador; i++) {
      if(this.tabla[i] != undefined){
        if(this.tabla[i].id == id){
          return this.tabla[i]
        }
      }
    }
    return null
  }
}
