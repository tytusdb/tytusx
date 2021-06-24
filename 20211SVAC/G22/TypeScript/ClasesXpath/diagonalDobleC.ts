import { ArbolXpath } from "../Arboles/ArbolXpath";
import { NodoRutaXpath } from "../Interfaces/NodoRutaXpath";
import { TiposXpath } from "./TiposXpath";

export class diagonalDobleC implements NodoRutaXpath{
    tipo: TiposXpath;
    valorSiguienteDiagonalD: any; //puede venir cualquier cosa dentro del valor del predicado, desde ruta, funcion, etc
    linea: number;
    columna: number;

    constructor(valorCompaniaDiagonalDoble: any, linea: number, columna: number) {
        this.tipo = TiposXpath.DIAGONAL_DOBLE;
        this.valorSiguienteDiagonalD = valorCompaniaDiagonalDoble;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo( arbol: ArbolXpath): TiposXpath {
        return this.tipo;
    }
    getValorImplicito( arbol: ArbolXpath) {
        return this.valorSiguienteDiagonalD;
    }

}