import { ArbolXpath } from "../Arboles/ArbolXpath";
import { TiposXpath } from "../ClasesXpath/TiposXpath";

export interface NodoRutaXpath{
     linea:number;
     columna: number;
    
     getTipo(arbol:ArbolXpath):TiposXpath ;
     getValorImplicito(arbol:ArbolXpath):any;
}