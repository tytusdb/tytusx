export class Excepcion{
    tipo: String;
    descripcion: String;
    line: Number;
    column: Number;

    constructor(tipo: String, descripcion: String, line: Number, column: Number) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.line = line;
        this.column = column;
    }

    toString(){
        return `Error ${this.tipo} en la linea ${this.line} y columna ${this.column}, ${this.descripcion}`;
    }
}