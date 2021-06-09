class Atributo {
    constructor($nombre, $valor, $linea, $columna) {
        this.nombre = $nombre;
        this.valor = $valor;
        this.linea = $linea;
        this.columna = $columna;
    }
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    getValor() {
        return this.valor;
    }
    setValor(valor) {
        this.valor = valor;
    }
    getLinea() {
        return this.linea;
    }
    setLinea(linea) {
        this.linea = linea;
    }
    getColumna() {
        return this.columna;
    }
    setColumna(columna) {
        this.columna = columna;
    }
}
