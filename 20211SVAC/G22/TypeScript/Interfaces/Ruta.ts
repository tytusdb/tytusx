import { ArbolXpath } from "../Arboles/ArbolXpath";
import { TiposXpath } from "../ClasesXpath/TiposXpath";
import { NodoRutaXpath } from "./NodoRutaXpath";

export interface Ruta{
    linea:number;
    columna: number;
    ruta: Array<NodoRutaXpath>;
     
     getTipo(arbol:ArbolXpath):TiposXpath ;
     getValorImplicito(arbol:ArbolXpath):any;

}