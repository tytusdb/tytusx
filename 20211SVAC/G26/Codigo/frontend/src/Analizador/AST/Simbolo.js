export class Simbolo {
    constructor(tipo, nombre, valor, linea, columna, parametros, instrucciones) {
        this.tipo = tipo;
        this.nombre = nombre;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
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
    setParametros(params) {
        this.parametros = params;
    }
    getParametros() {
        return this.parametros;
    }
    setInstrucciones(inst) {
        this.instrucciones = inst;
    }
    getInstrucciones() {
        return this.instrucciones;
    }
}
