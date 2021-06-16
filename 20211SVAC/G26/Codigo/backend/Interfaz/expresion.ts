import { Entorno } from "../AST/Entorno";

export interface Expresion{
    linea: number;
    columna: number;
    
    getTipo(entorno:Entorno):any;
    getValor(entorno:Entorno):any;
}