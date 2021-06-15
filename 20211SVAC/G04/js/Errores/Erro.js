class Erro {
    constructor(tipo, descripcion, linea, columna) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
    }
    get getTipo() {
        return this.tipo;
    }
    get getDescripcion() {
        return this.descripcion;
    }
    get getLinea() {
        return this.linea;
    }
    get getColumna() {
        return this.columna;
    }
    get getLexema() {
        return this.lexema;
    }
    setColumna(pos) {
        this.columna = pos;
    }
    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }
    setLexema(lexema) {
        this.lexema = lexema;
    }
}
