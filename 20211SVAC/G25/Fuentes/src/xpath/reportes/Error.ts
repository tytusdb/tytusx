class Error {
    private tipo:String;
    private descripcion:String;
    private line:number;
    private column:number;

    constructor(tipo:String, descripcion:String, line:number, column:number) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.line = line;
        this.column = column; 
    }

    getTipo() {
        return this.tipo;
    }

    getDescripcion() {        
        return this.descripcion;
    }

    getLine() {
        return this.line;
    }

    getColumn() {
        return this.column;
    }

}