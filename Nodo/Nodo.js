class Nodo {
    constructor($nombre, $atributos, $nodos, type, $texto, $linea, $columna) {
        this.nombre = $nombre;
        this.atributos = $atributos;
        this.nodos = $nodos;
        this.type = type;
        this.texto = $texto;
        this.linea = $linea;
        this.columna = $columna;
    }
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    getAtributos() {
        return this.atributos;
    }
    setAtributos(atributos) {
        this.atributos = atributos;
    }
    getNodos() {
        return this.nodos;
    }
    setNodos(nodos) {
        this.nodos = nodos;
    }
    getType() {
        return this.type;
    }
    setType(type) {
        this.type = type;
    }
    getTexto() {
        return this.texto;
    }
    setTexto(texto) {
        this.texto = texto;
    }
    getColumna() {
        return this.columna;
    }
    setColumna(columna) {
        this.columna = columna;
    }
    getLinea() {
        return this.linea;
    }
    setLinea(linea) {
        this.linea = linea;
    }
}
