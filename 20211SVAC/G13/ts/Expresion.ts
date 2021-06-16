import { NodoXPath } from './NodoXPath';

export abstract class Expresion extends NodoXPath {
    tipo: any;
    valor: any;

    abstract getValor(): Expresion;
    abstract copiarValor(): Expresion;
}