"use strict";
class Funcion {
    constructor(nombreFuncion, listaParametros, tipo, listaIntrucciones, linea, columna) {
        this.nombreFuncion = nombreFuncion;
        this.listaParametros = listaParametros;
        this.tipo = tipo;
        this.listaIntrucciones = listaIntrucciones;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, xmlData) {
        if (ListaFunciones.existe(this.nombreFuncion)) {
            ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("Ya existe una funcion declarada con el nombre " + this.nombreFuncion, this.linea, this.columna));
            return;
        }
        ListaFunciones.agregarFuncion(this.nombreFuncion, this);
    }
    traducirXQ(sizeScope, otro) {
        throw new Error("Method not implemented.");
    }
}
