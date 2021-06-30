import { Entorno } from "../AST/Entorno";

export interface InstruccionXQuery{
    linea: number;
    columna: number;
    
    ejecutar(entornoXQuery:Entorno, entornoXML: Entorno):any;
}