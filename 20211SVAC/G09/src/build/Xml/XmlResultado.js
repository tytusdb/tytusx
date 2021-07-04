"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Graficas_1 = require("../Graficas/Graficas");
const Tabla_1 = require("./Tabla");
class XmlResultado {
    constructor(etiquitaInicio, etiquetasCuerpo) {
        this.etiquitaInicio = etiquitaInicio;
        this.etiquetasCuerpo = etiquetasCuerpo;
    }
    imprimir() {
        let texto = "";
        this.etiquetasCuerpo.forEach(etiqueta => {
            texto += etiqueta.imprimir();
        });
        return texto;
    }
    getAsTable() {
        let tabla = new Tabla_1.Tabla();
        this.etiquetasCuerpo.forEach(etiqueta => {
            etiqueta.getAsTable().filas.forEach(fila => {
                tabla.addFila(fila);
            });
        });
        return tabla;
    }
    getErroresSemanticos() {
        let texto = "";
        this.etiquetasCuerpo.forEach(etiqueta => {
            texto += etiqueta.getErroresSemanticos();
        });
        return texto;
    }
    getCstDotA() {
        let texto = "";
        texto += "digraph {\n";
        texto += Graficas_1.Graficas.defNodo(0, "XML");
        texto += Graficas_1.Graficas.getElement(1, "TAG_CONFIGURACION", 0);
        texto += this.etiquitaInicio.getCstDotA(1);
        if (this.etiquetasCuerpo.length > 0) {
            let cont = 3;
            for (let etiqueta of this.etiquetasCuerpo) {
                if (cont - 3 != this.etiquetasCuerpo.length - 1) {
                    texto += Graficas_1.Graficas.getElement(cont, "LISTA_ETIQUETAS", cont + 1);
                    texto += etiqueta.getCstDotA(cont);
                }
                else {
                    texto += Graficas_1.Graficas.getElement(cont, "LISTA_ETIQUETAS", 0);
                    texto += etiqueta.getCstDotA(cont);
                }
                cont += 1;
            }
        }
        texto += "}";
        return texto;
    }
    getCstDotD() {
        let texto = "";
        texto += "digraph {\n";
        texto += Graficas_1.Graficas.defNodo(0, "XML");
        texto += Graficas_1.Graficas.getElement(1, "TAG_CONFIGURACION", 0);
        texto += this.etiquitaInicio.getCstDotA(1);
        if (this.etiquetasCuerpo.length > 0) {
            let cont = 3;
            for (let etiqueta of this.etiquetasCuerpo) {
                if (cont === 3) {
                    texto += Graficas_1.Graficas.getElement(cont, "LISTA_ETIQUETAS", 0);
                    texto += etiqueta.getCstDotD(cont);
                }
                else {
                    texto += Graficas_1.Graficas.getElement(cont, "LISTA_ETIQUETAS", cont - 1);
                    texto += etiqueta.getCstDotD(cont);
                }
                cont += 1;
            }
        }
        texto += "}";
        return texto;
    }
}
exports.XmlResultado = XmlResultado;
