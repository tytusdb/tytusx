export class Parametro {
    id = ""; 
    tipo = ""; 
    simbolo = null; 
    linea = 0; 
    columna = 0; 
    
    constructor(id, tipo, linea, columna){
        this.id = id; 
        this.tipo = tipo; 
        this.linea = linea; 
        this.columna = columna; 
    }

    getId(){
        return this.id
    }

    getTipo(){
        return this.tipo
    }

    getSimbolo(){
        return this.simbolo
    }

    setSimbolo(simbolo){
        this.simbolo = simbolo; 
    }

}