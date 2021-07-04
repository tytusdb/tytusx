"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Graficas_1 = require("../Graficas/Graficas");
const Fila_1 = require("./Fila");
const Tipos_1 = require("./Tipos");
class Atributo {
    constructor(nombre, valor, linea, columna, idSent) {
        this.etiquetaContendora = null;
        this.nombre = nombre;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.idSent = idSent;
    }
    getAmbito() {
        let listaAmbito = [];
        for (let etiqueta = this.etiquetaContendora; etiqueta != null; etiqueta = etiqueta.padre) {
            listaAmbito.push(etiqueta.getName());
        }
        listaAmbito.push("GLOBAL");
        return listaAmbito;
    }
    getAsRowTable() {
        return (new Fila_1.Fila(this.nombre, Tipos_1.Tipos.ATRIBUTO, this.getAmbito(), this.linea, this.columna, this.imprimir()));
    }
    imprimir() {
        let texto = "";
        texto = this.nombre + "=" + this.valor;
        return texto;
    }
    getCstDotA(idPadre) {
        let texto = "";
        texto += Graficas_1.Graficas.getElement(this.idSent, "ATRIBUTO", idPadre);
        texto += Graficas_1.Graficas.getElement(this.idSent + 1, "NombreAtributo", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 2, this.nombre, this.idSent + 1);
        texto += Graficas_1.Graficas.getElement(this.idSent + 4, "IgualAtributo", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 5, "=", this.idSent + 4);
        texto += Graficas_1.Graficas.getElement(this.idSent + 6, "ValorAtributo", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 7, this.valor.split("\"").join(""), this.idSent + 6);
        return texto;
    }
}
exports.Atributo = Atributo;
