"use strict";
class SentenciaForNumerica {
    constructor(listaValoresFlower, retorno, linea, columna) {
        this.listaValoresFlower = listaValoresFlower;
        this.retorno = retorno;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, xmlData) {
        let entornoFor = new TablaSimbolosXquery(ent, "entorno flower");
        for (let valorFlower of this.listaValoresFlower) {
            valorFlower.declaracionInicial(entornoFor, xmlData);
        }
        this.ejecutarRetorno(entornoFor, xmlData);
        this.recorrerValores2(entornoFor, xmlData);
    }
    recorrerValores2(entornoFor, xmlData) {
        let tamano = this.listaValoresFlower.length - 1;
        for (let valorFlower = tamano; valorFlower >= 0; valorFlower--) {
            if (this.listaValoresFlower[valorFlower].esValorInicial(entornoFor, xmlData)) {
                this.ejecutarRetorno(entornoFor, xmlData);
            }
            while (!this.listaValoresFlower[valorFlower].aumentarValor(entornoFor, xmlData)) {
                if (tamano == valorFlower) {
                    this.ejecutarRetorno(entornoFor, xmlData);
                }
                else {
                    for (let profundidad = tamano; valorFlower < profundidad; profundidad--) {
                        if (this.listaValoresFlower[valorFlower].esValorInicial(entornoFor, xmlData)) {
                            this.ejecutarRetorno(entornoFor, xmlData);
                        }
                        while (!this.listaValoresFlower[profundidad].aumentarValor(entornoFor, xmlData)) {
                            this.ejecutarRetorno(entornoFor, xmlData);
                        }
                    }
                }
            }
        }
    }
    recorrerValores(entornoFor, xmlData) {
        for (let actual = this.listaValoresFlower.length - 1; actual >= 0; actual--) {
            while (!this.listaValoresFlower[actual].aumentarValor(entornoFor, xmlData)) {
                for (let profundidad = actual + 1; profundidad < this.listaValoresFlower.length; profundidad++) {
                    while (!this.listaValoresFlower[profundidad].aumentarValor(entornoFor, xmlData)) {
                        this.ejecutarRetorno(entornoFor, xmlData);
                    }
                }
                this.ejecutarRetorno(entornoFor, xmlData);
            }
            // this.ejecutarRetorno(entornoFor,xmlData);
            for (let profundidad = actual + 1; profundidad < this.listaValoresFlower.length; profundidad++) {
                while (!this.listaValoresFlower[profundidad].aumentarValor(entornoFor, xmlData)) {
                    this.ejecutarRetorno(entornoFor, xmlData);
                }
            }
        }
    }
    ejecutarRetorno(entornoFor, xmlData) {
        try {
            this.retorno.ejecutar(entornoFor, xmlData);
        }
        catch (exception) {
            if (exception instanceof ReturnException) {
                InterfazGrafica.print(XpathUtil.convertirXqueryAString(exception.valor));
            }
        }
    }
}
