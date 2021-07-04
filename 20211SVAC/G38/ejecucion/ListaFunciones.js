"use strict";
class ListaFunciones {
    constructor() {
        this.tabla = {};
    }
    static agregarFuncion(nombre, funcion) {
        if (this.listaFunciones == null || this.listaFunciones == undefined) {
            this.listaFunciones = new ListaFunciones();
        }
        this.listaFunciones.tabla[nombre] = funcion;
    }
    static existe(nombre) {
        if (this.listaFunciones == null || this.listaFunciones == undefined) {
            this.listaFunciones = new ListaFunciones();
        }
        const value = this.listaFunciones.tabla[nombre];
        if (value != undefined && value != null) {
            return true;
        }
        return false;
    }
    static getFuncion(nombre) {
        if (this.listaFunciones == null || this.listaFunciones == undefined) {
            this.listaFunciones = new ListaFunciones();
        }
        const value = this.listaFunciones.tabla[nombre];
        if (value != undefined && value != null) {
            return value;
        }
        return null;
    }
    static limipiarFunciones() {
        this.listaFunciones = new ListaFunciones();
    }
}
