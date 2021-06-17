import {TipoNodo} from './tipificacion';

export class NodoXpath{
    Valor:string;
    Tipo:TipoNodo;
    AxisNodo:NodoXpath;
    constructor(tipo:TipoNodo, valor:string, axisNodo:NodoXpath){
        this.Tipo = tipo;
        this.Valor = valor;
        this.AxisNodo = axisNodo;
    }
}