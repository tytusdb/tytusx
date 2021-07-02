export class Atributo {
    nombre = ""; 
    predicado = null; 
    tipo = null; 
    linea = 0; 
    columna = 0; 

    constructor(nombre, predicado, tipo, linea, columna){
        this.nombre = nombre; 
        this.predicado = predicado; 
        this.tipo = tipo; 
        this.linea = linea; 
        this.columna = columna; 
    }

    getValor(tabla, xml){

    }

}