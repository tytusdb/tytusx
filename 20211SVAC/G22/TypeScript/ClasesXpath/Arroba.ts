import { ArbolXpath } from "../Arboles/ArbolXpath";
import { NodoRutaXpath } from "../Interfaces/NodoRutaXpath";
import { TiposXpath } from "./TiposXpath";

//en simbolos puede ser .   ..  *
export class Arroba implements NodoRutaXpath {
    valorArroba: any ; //puede ser id o *  (dato , simboloxpath)
    linea: number;
    columna: number;

    constructor(  valorArroba: any, linea: number, columna: number) {
        this.valorArroba =valorArroba;
        this.linea = linea;
        this.columna = columna;
    }
    getValorImplicito(arbol: ArbolXpath) {
        return this.valorArroba;
    }
    getTipo( arbol: ArbolXpath): TiposXpath {
        //dependiendo si es asterisco o arroba se da el tipo de la arroba
        return 0;
    }
    
}