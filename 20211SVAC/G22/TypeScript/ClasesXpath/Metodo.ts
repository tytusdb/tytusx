import { ArbolXpath } from "../Arboles/ArbolXpath";
import { NodoRutaXpath } from "../Interfaces/NodoRutaXpath";
import { TiposXpath } from "./TiposXpath";

export class Metodo implements NodoRutaXpath {
    tipo: TiposXpath;
    siguienteAlMetodo : any; //puede venir cualquier cosa despues de 'metodo::' desde ruta, funcion, etc
    linea: number;
    columna: number;

    constructor(tipo: TiposXpath,siguienteAlMetodo: any,  linea: number, columna: number) {
        this.tipo = tipo;
        this.siguienteAlMetodo = siguienteAlMetodo;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(arbol: ArbolXpath): TiposXpath {
        return this.tipo;
    }

    getValorImplicito(arbol: ArbolXpath) {
        return this.siguienteAlMetodo;
    }

}