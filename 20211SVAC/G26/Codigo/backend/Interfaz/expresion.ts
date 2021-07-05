import { Entorno } from "../AST/Entorno";

export interface Expresion{
    linea: number;
    columna: number;
    
    getTipo(entorno:Entorno):any;
    getValorInicial(entorno:Entorno):any;
    getValor(entorno:Entorno):any;
    get3Dir(entorno:Entorno):any;
}