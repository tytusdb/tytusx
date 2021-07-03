import { Expresion } from './Expresion';

export class Literal extends Expresion {
    tipo: any;
    valor: any;
    //linea: number; //Desbloquear si implementa interfaz
    //columna: number;  //Desbloquear si implementa interfaz

    constructor(t: any, v: any, l: any, c: any) {
        super();    //Bloquear si implementa interfaz
        this.tipo = t;
        this.valor = v;
        this.linea = l;
        this.columna = c;
    }
    
    getValor(entorno: any): Expresion {
        if(this.valor == 'last()' && this.tipo == 6) {
            return new Literal(0, entorno.lista_objetos.length, this.linea, this.columna);
        } else {
            return new Literal(this.tipo, this.valor, this.linea, this.columna);
        }
    }

    copiarValor(): Expresion {
        return new Literal(this.tipo, this.valor, this.linea, this.columna);
    }
}