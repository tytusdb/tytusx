"use strict";
class Nodo {
    constructor(fila, columna, nombre, valor) {
        this.fila = fila;
        this.columna = columna;
        this.nombre = nombre;
        this.valor = valor;
        this.hijos = [];
    }
    setFila(fila) {
        this.fila = fila;
    }
    getFila() {
        return this.fila;
    }
    setColumna(columna) {
        this.columna = columna;
    }
    getColumna() {
        return this.columna;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    getNombre() {
        return this.nombre;
    }
    setValor(valor) {
        this.valor = valor;
    }
    getValor() {
        return this.valor;
    }
    setHijos(hijos) {
        this.hijos = hijos;
    }
    getHijos() {
        return this.hijos;
    }
}
