import { SingleExpresion } from "./SingleExpresion";

export class IfExpresion { 
    Parametros: SingleExpresion[];
    AccionVerdadera:SingleExpresion;
    AccionFalsa:SingleExpresion;
    constructor(Parametros: SingleExpresion[], AccionVerdadera:SingleExpresion, AccionFalsa:SingleExpresion){
        this.Parametros = Parametros;
        this.AccionVerdadera = AccionVerdadera;
        this.AccionFalsa = AccionFalsa;
    }
}