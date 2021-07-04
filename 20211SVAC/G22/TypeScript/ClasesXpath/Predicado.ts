import { ArbolXpath } from "../Arboles/ArbolXpath";
import {  NodoRutaXpath } from "../Interfaces/NodoRutaXpath";
import { TiposXpath } from "./TiposXpath";

export class Predicado implements NodoRutaXpath {
    tipo: TiposXpath;
    valorPredicado: any; //puede venir cualquier cosa dentro del valor del predicado, desde ruta, funcion, etc
    linea: number;
    columna: number;

    constructor(valorPredicado: any,linea: number, columna: number) {
        this.tipo = TiposXpath.PREDICADO;
        this.valorPredicado = valorPredicado;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo( arbol: ArbolXpath): TiposXpath {
        return this.tipo;
    }
    getValorImplicito(arbol: ArbolXpath) {
        return this.valorPredicado;
    }

}