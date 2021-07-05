import {Tipo} from './Tipo';

class Simbolo{
    tipo: Tipo;
    id: string;
    tmp: string;
    linea: number;
    columna: number;
    valor: Object;
    ambito: string;
    tipo_dec: string;
    
    constructor(tipo: Tipo, id: string, valor: Object, linea: number, columna: number) {
        this.tipo = tipo;
        this.id = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }
}

export {Simbolo};