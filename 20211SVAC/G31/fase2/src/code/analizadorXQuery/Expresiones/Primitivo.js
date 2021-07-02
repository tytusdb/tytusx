export class Primitivo {
    linea = 0; 
    columna = 0; 
    tipoObj = null; 
    tipo = null; 
    valor = null; 

    constructor(linea, columna, tipoObj, tipo, valor){
        this.linea = linea; 
        this.columna = columna; 
        this.tipoObj = tipoObj; 
        this.tipo = tipo; 
        this.valor = valor; 
    }

    getValor(entorno, xml){
        return this.valor; 
    }
    
}