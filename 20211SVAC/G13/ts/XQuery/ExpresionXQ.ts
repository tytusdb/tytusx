import { EntornoXQ } from "../Entorno/Entorno";
import { NodoXQ } from "./NodoXQ";
import { TipoXQ } from "../Entorno/TipoXQ";

export abstract class ExpresionXQ extends NodoXQ {
    tipo:TipoXQ;
    valor:any;

    abstract getValor(ent:EntornoXQ): ExpresionXQ;
    abstract copiar(): ExpresionXQ;
}