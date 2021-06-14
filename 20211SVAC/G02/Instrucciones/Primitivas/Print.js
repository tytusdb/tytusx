"use strict";
class Print {
    constructor(exp, linea, columna) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.salidaConsola = "";
    }
    ejecutar(ent, arbol) {
        this.salidaConsola = "";
        var mensaje = "";
        const valor = this.expresion.getValorImplicito(ent, arbol);
        if (valor !== null) {
            mensaje = '>', valor;
            console.log(mensaje);
            this.salidaConsola;
        }
        else {
            console.log('>> Error, no se pueden imprimir valores nulos');
        }
    }
}
