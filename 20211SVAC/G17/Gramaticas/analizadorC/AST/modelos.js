export class Nodo {

}

export class Instruccion extends Nodo {
    linea = 1
    columna = 1
    constructor(){
        super()
        //this.tieneLabel = false // indica si existen labels en una instrucción
        this.esFuncional  = true // cuando ésta variable es false, no se retorna código tres direcciones
        this.etiquetasInternas  = []
        this.esSaltoConstante = false
    }
}

export class Expresion extends Nodo {
    constructor(){
        super()
        this.esCero = false
        this.esSiempreTrue = false
        this.esSiempreFalse = false
    }
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
    "ID"      : 3,
    "BOOLEAN" : 4,
    "ATRIB"   : 5,
    "ERROR"   : 6,
    "SIBLING" : 7
} 