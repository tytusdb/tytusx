import { EntornoXQ } from "../Entorno/Entorno";
import { NodoXQ } from "./NodoXQ";

export abstract class InstruccionXQ extends NodoXQ {
    
    abstract ejecutar(ent:EntornoXQ):Object;
}