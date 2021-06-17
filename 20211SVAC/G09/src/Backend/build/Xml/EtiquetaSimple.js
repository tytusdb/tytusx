"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Fila_1 = require("./Fila");
const Tipos_1 = require("./Tipos");
const Tabla_1 = require("./Tabla");
const Graficas_1 = require("../Graficas/Graficas");
class EtiquetaSimple {
    constructor(nombreTag, listaAtributos, linea, columna, idSent) {
        this.nombreTag = nombreTag;
        this.padre = null;
        this.listaAtributos = listaAtributos;
        this.linea = linea;
        this.columna = columna;
        this.idSent = idSent;
        this.listaAtributos.forEach(atributo => {
            atributo.etiquetaContendora = this;
        });
    }
    getName() {
        return this.nombreTag;
    }
    getAmbito() {
        let listaAmbito = [];
        for (let etiqueta = this.padre; etiqueta != null; etiqueta = etiqueta.padre) {
            listaAmbito.push(etiqueta.getName());
        }
        listaAmbito.push("GLOBAL");
        return listaAmbito;
    }
    imprimir() {
        let texto = "";
        texto += "<" + this.nombreTag;
        this.listaAtributos.forEach(atributo => {
            texto += " " + atributo.imprimir();
        });
        texto += "/> \n";
        return texto;
    }
    getAsTable() {
        let tabla = new Tabla_1.Tabla();
        tabla.addFila(new Fila_1.Fila(this.getName(), Tipos_1.Tipos.ETIQUETA_SIMPLE, this.getAmbito(), this.linea, this.columna, this.imprimir()));
        this.listaAtributos.forEach(atributo => {
            tabla.addFila(atributo.getAsRowTable());
        });
        return tabla;
    }
    getErroresSemanticos() {
        let texto = "";
        this.listaAtributos.forEach(atributo => {
            let apariciones = 0;
            for (let atr2 of this.listaAtributos) {
                if (atributo.nombre == atr2.nombre) {
                    apariciones += 1;
                }
                if (apariciones > 1) {
                    texto += `Error(Linea: ${atributo.linea}, Columna: ${atributo.columna}): El atributo '${atributo.nombre}' se encuentra repetido.\n`;
                    break;
                }
            }
        });
        return texto;
    }
    getCstDotA(idPadre) {
        let texto = "";
        texto += Graficas_1.Graficas.getElement(this.idSent, "TAG_UNICO", idPadre);
        texto += Graficas_1.Graficas.getElement(this.idSent + 1, "AbreTagCierre", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 2, "<" + this.nombreTag, this.idSent + 1);
        if (this.listaAtributos.length > 0) {
            let cont = 3;
            for (let atributo of this.listaAtributos) {
                if (cont - 3 != this.listaAtributos.length - 1) {
                    texto += Graficas_1.Graficas.getElement(this.idSent + cont, "LISTA_ATRIBUTOS", this.idSent + cont + 1);
                    texto += atributo.getCstDotA(this.idSent + cont);
                }
                else {
                    texto += Graficas_1.Graficas.getElement(this.idSent + cont, "LISTA_ATRIBUTOS", this.idSent);
                    texto += atributo.getCstDotA(this.idSent + cont);
                }
                cont += 1;
            }
        }
        texto += Graficas_1.Graficas.getElement(this.idSent + 3 + this.listaAtributos.length, "CierreTagCierre", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 4 + this.listaAtributos.length, "\\>", this.idSent + 3 + this.listaAtributos.length);
        return texto;
    }
    getCstDotD(idPadre) {
        let texto = "";
        texto += Graficas_1.Graficas.getElement(this.idSent, "TAG_UNICO", idPadre);
        texto += Graficas_1.Graficas.getElement(this.idSent + 1, "AbreTagCierre", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 2, "<" + this.nombreTag, this.idSent + 1);
        if (this.listaAtributos.length > 0) {
            let cont = 3;
            for (let atributo of this.listaAtributos) {
                let cont = 3;
                for (let atributo of this.listaAtributos) {
                    if (cont === 3) {
                        texto += Graficas_1.Graficas.getElement(this.idSent + cont, "LISTA_ATRIBUTOS", this.idSent + 1);
                        texto += atributo.getCstDotA(this.idSent + cont);
                    }
                    else {
                        texto += Graficas_1.Graficas.getElement(this.idSent + cont, "LISTA_ATRIBUTOS", this.idSent + cont - 1);
                        texto += atributo.getCstDotA(this.idSent + cont);
                    }
                    cont += 1;
                }
            }
        }
        texto += Graficas_1.Graficas.getElement(this.idSent + 3 + this.listaAtributos.length, "CierreTagCierre", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 4 + this.listaAtributos.length, "\\>", this.idSent + 3 + this.listaAtributos.length);
        return texto;
    }
}
exports.EtiquetaSimple = EtiquetaSimple;
