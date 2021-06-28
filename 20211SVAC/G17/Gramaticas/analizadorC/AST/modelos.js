export class Nodo {

}

export class Instruccion extends Nodo {
    linea = 1
    columna = 1
}

export class Expresion extends Nodo {

}

export class CTipo {
    constructor(tipo, esArray ){
        this.tipo = tipo
        this.esArray = esArray
    }
}

export const Tipo = {
    "INTEGER" : 0,
    "DECIMAL" : 1,
    "STRING"  : 2,
    "NODO"    : 3,
    "BOOLEAN" : 4,
    "ATRIB"   : 5,
    "ERROR"   : 6,
    "SIBLING" : 7
} 