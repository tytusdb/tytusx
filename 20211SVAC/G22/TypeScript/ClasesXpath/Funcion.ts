import { ArbolXpath } from "../Arboles/ArbolXpath";
import { NodoRutaXpath } from "../Interfaces/NodoRutaXpath";
import { TiposXpath } from "./TiposXpath";

export class Funcion implements NodoRutaXpath {
    tipo: TiposXpath;
    linea: number;
    columna: number;

    constructor(tipo: TiposXpath,  linea: number, columna: number) {
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(arbol: ArbolXpath): TiposXpath {
        //dependiendo del nombre entonces asignamos su tipo

        return this.tipo;

    }
    getValorImplicito(arbol: ArbolXpath) {
        //buscamos del nodo que tenemos lo que nos pide como last(), text(), node(), position() y eso retornamos
        return this.tipo; 
    }

}