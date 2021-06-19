class Error {
    constructor(Tipo, Descripcion, linea, columna) {
        this.Tipo = Tipo;
        this.Descripcion = Descripcion;
        this.linea = linea;
        this.columna = columna;
    }
}