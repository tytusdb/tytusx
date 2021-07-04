import { ArbolXpath } from "../Arboles/ArbolXpath";
import { NodoRutaXpath } from "../Interfaces/NodoRutaXpath";
import { TiposXpath } from "./TiposXpath";

//en simbolos puede ser .   ..  *
export class SimbolosXpath implements NodoRutaXpath {
    tipo: TiposXpath;
    linea: number;
    columna: number;

    constructor(tipo:TiposXpath,  linea: number, columna: number) {
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo( arbol: ArbolXpath): TiposXpath {
        return this.tipo;
    }
    getValorImplicito( arbol: ArbolXpath) {
        return this.tipo;
    }
}