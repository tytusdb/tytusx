class Simbolo {
    constructor(nombre, type, linea, columna) {
        this.nombre = nombre;
        this.type = type;
        this.linea = linea;
        this.columna = columna;
    }
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    getType() {
        return this.type;
    }
    setType(type) {
        this.type = type;
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
    getAmbito() {
        return this.ambito;
    }
    setAmbito(ambito) {
        this.ambito = ambito;
    }
}
