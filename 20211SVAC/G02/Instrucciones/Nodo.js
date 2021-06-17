"use strict";
class Nodo {
    constructor(listapredicados, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.salidaConsola = "";
        this.ListaPredicados = listapredicados;
    }
    ejecutar(ent, arbol) {
        this.salidaConsola = "";
        var mensaje = "";
        let valor;
        this.ListaPredicados.forEach(element => {
            valor = element.getValorImplicito(ent, arbol);
        });
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
