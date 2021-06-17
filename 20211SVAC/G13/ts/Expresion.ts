import { NodoXPath } from './NodoXPath';

export abstract class Expresion extends NodoXPath {
    tipo: any;
    valor: any;

    abstract getValor(entorno: any): Expresion;
    abstract copiarValor(): Expresion;
}