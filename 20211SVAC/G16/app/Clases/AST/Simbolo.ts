import Valor from "./Valor";

export default class Simbolo {

  Nombre: string;
  Valor: Valor;
  Padre: string;
  Linea: number;
  Columna: number;
  Posicion: number;

  constructor(Nombre: string, Valor: Valor, Padre: string, Linea: number, Columna: number, Posicion: number) {
    this.Nombre = Nombre;
    this.Valor = Valor;
    this.Padre = Padre;
    this.Linea = Linea;
    this.Columna = Columna;
    this.Posicion = Posicion;
  }

}
