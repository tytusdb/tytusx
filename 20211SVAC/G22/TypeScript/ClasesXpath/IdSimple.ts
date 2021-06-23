
import { ArbolXpath } from "../Arboles/ArbolXpath";
import { NodoRutaXpath } from "../Interfaces/NodoRutaXpath";
import { TiposXpath } from "./TiposXpath";


export class IdSimple implements NodoRutaXpath {
    valorId: String;
    tipo: TiposXpath;
    linea: number;
    columna: number;


    constructor(nombreId: String, linea: number, columna: number,) {
        this.valorId = nombreId;
        this.tipo = TiposXpath.ID_SIMPLE;
        this.linea = linea;
        this.columna = columna;

    }

    getTipo(arbol: ArbolXpath): TiposXpath {
        return this.tipo;
    }
    getValorImplicito(arbol: ArbolXpath) {
        return this.valorId;
    }


}