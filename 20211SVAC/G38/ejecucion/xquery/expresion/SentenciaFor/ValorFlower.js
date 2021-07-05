"use strict";
class ValorFlower {
    constructor(idVariable, listaNumeros, valorInicial, valorFinal, linea, columna) {
        this.idVariable = idVariable;
        this.listaNumeros = listaNumeros;
        this._valorInicial = valorInicial;
        this._valorFinal = valorFinal;
        this.linea = linea;
        this.columna = columna;
    }
    declaracionInicial(ent, tabla) {
        if (this.listaNumeros != null && this.listaNumeros != undefined) {
            let valor = this.listaNumeros[0];
            let primitiva = new Primitive(valor, new Tipo(TipoDato.numero), this.linea, this.columna);
            let declaracion = new Declaracion(this.idVariable, primitiva, this.linea, this.columna);
            declaracion.ejecutar(ent, tabla);
            this.valorActual = 0;
        }
        else {
            let valor = this.valorInicial;
            let primitiva = new Primitive(valor, new Tipo(TipoDato.numero), this.linea, this.columna);
            let declaracion = new Declaracion(this.idVariable, primitiva, this.linea, this.columna);
            declaracion.ejecutar(ent, tabla);
            this.valorActual = valor;
        }
    }
    actualizarValor(ent, tabla, valor) {
        let primitiva = new Primitive(valor, new Tipo(TipoDato.numero), this.linea, this.columna);
        let asignacion = new Asignacion(this.idVariable, primitiva, this.linea, this.columna);
        asignacion.ejecutar(ent, tabla);
    }
    esValorInicial(ent, tabla) {
        if (this.listaNumeros != null && this.listaNumeros != undefined) {
            if (this.valorActual == 0) {
                return true;
            }
        }
        else {
            if (this.valorActual == this.valorInicial) {
                return true;
            }
        }
        return false;
    }
    aumentarValor(ent, tabla) {
        if (this.listaNumeros != null && this.listaNumeros != undefined) {
            this.valorActual++;
            if (this.valorActual < this.listaNumeros.length - 1) {
                this.actualizarValor(ent, tabla, this.listaNumeros[this.valorActual]);
            }
            else if (this.valorActual == this.listaNumeros.length - 1) {
                this.actualizarValor(ent, tabla, this.listaNumeros[this.valorActual]);
            }
            else {
                this.valorActual = 0;
                this.actualizarValor(ent, tabla, this.listaNumeros[this.valorActual]);
                return true;
            }
        }
        else {
            this.valorActual++;
            if (this.valorActual < this.valorFinal) {
                this.actualizarValor(ent, tabla, this.valorActual);
            }
            else if (this.valorActual == this.valorFinal) {
                this.actualizarValor(ent, tabla, this.valorActual);
            }
            else {
                this.valorActual = this.valorInicial;
                this.actualizarValor(ent, tabla, this.valorActual);
                return true;
            }
        }
        return false;
    }
    set valorInicial(value) {
        this._valorInicial = value;
    }
    set valorFinal(value) {
        this._valorFinal = value;
    }
    get valorInicial() {
        return this._valorInicial;
    }
    get valorFinal() {
        return this._valorFinal;
    }
}
