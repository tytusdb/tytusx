export class Simbolo {
    constructor(tipo, nombre, valor, linea, columna) {
        this.tipo = tipo;
        this.nombre = nombre;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.posicion = 0;
    }
    getTipo() {
        return this.tipo;
    }
    getNombre() {
        return this.nombre;
    }
    getValor() {
        return this.valor;
    }
    getLinea() {
        return this.linea;
    }
    getColumna() {
        return this.columna;
    }
    getPosicion() {
        return this.posicion;
    }
    setPosicion(posicion) {
        this.posicion = posicion;
    }
}
