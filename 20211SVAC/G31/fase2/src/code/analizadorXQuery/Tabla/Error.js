export class Error {
    tipo = ''
    linea = 0; 
    columna = 0; 
    descripcion = 'Error Desconocido'


    constructor(tipo, descripcion, linea , columna){
        this.tipo = tipo; 
        this.descripcion = descripcion; 
        this.linea = linea; 
        this.columna = columna; 
    }

    toString(){
        return `Error de tipo: ${this.tipo} en la linea ${this.linea} y columna ${this.columna}. Descripcion: ${this.descripcion} \n`
    }
}