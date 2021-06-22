import { ArbolXpath } from "../Arboles/ArbolXpath";
import { NodoRutaXpath } from "../Interfaces/NodoRutaXpath";
import { TiposXpath } from "./TiposXpath";

export class diagonalSimpleS implements NodoRutaXpath {
    tipo: TiposXpath;
    valorSiguienteDiagonalS: any; //puede venir cualquier cosa dentro del valor del predicado, desde ruta, funcion, etc
    linea: number;
    columna: number;

    constructor(valorCompaniaDiagonal: any, linea: number, columna: number) {
        this.tipo = TiposXpath.DIAGONAL_SIMPLE
        this.valorSiguienteDiagonalS = valorCompaniaDiagonal;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(arbol: ArbolXpath): TiposXpath {
        return this.tipo;
    }
    getValorImplicito( arbol: ArbolXpath) {
        return this.valorSiguienteDiagonalS;
    }

}