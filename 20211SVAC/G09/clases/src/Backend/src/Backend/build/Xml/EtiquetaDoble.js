"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Graficas_1 = require("../Graficas/Graficas");
const Fila_1 = require("./Fila");
const Tabla_1 = require("./Tabla");
const Tipos_1 = require("./Tipos");
const ControlError_1 = require("../Xpath/ControlError");
const TipoSeleccion_1 = require("../Xpath/TipoSeleccion");
class EtiquetaDoble {
    constructor(nombreTagAbre, nombreTagCierre, listaAtributos, cadenaValores, listaHijos, linea, columna, idSent) {
        this.padre = null;
        this.nombreTagAbre = nombreTagAbre;
        this.nombreTagCierre = nombreTagCierre;
        this.listaAtributos = listaAtributos;
        this.tineHijos = listaHijos.length > 0;
        this.cadenaValores = (listaHijos.length == 0) ? cadenaValores : "";
        this.listaHijos = (listaHijos.length > 0) ? listaHijos : [];
        this.linea = linea;
        this.columna = columna;
        this.idSent = idSent;
        this.listaAtributos.forEach(atributo => {
            atributo.etiquetaContendora = this;
        });
        this.listaHijos.forEach(hijo => {
            hijo.padre = this;
        });
    }
    imprimir() {
        let texto = "";
        texto += "<" + this.nombreTagAbre;
        this.listaAtributos.forEach(atributo => {
            texto += " " + atributo.imprimir();
        });
        texto += ">";
        if (this.listaHijos.length > 0) {
            texto += "\n";
        }
        texto += this.cadenaValores;
        this.listaHijos.forEach(hijo => {
            texto += hijo.imprimir();
        });
        texto += "</" + this.nombreTagCierre + "> \n";
        return texto;
    }
    getName() {
        return this.nombreTagAbre;
    }
    getAmbito() {
        let listaAmbito = [];
        for (let etiqueta = this.padre; etiqueta != null; etiqueta = etiqueta.padre) {
            listaAmbito.push(etiqueta.getName());
        }
        listaAmbito.push("GLOBAL");
        return listaAmbito;
    }
    getAsTable() {
        let tabla = new Tabla_1.Tabla();
        tabla.addFila(new Fila_1.Fila(this.nombreTagAbre, Tipos_1.Tipos.ETIQUETA_DOBLE, this.getAmbito(), this.linea, this.columna, this.imprimir()));
        this.listaAtributos.forEach(atributo => {
            tabla.addFila(atributo.getAsRowTable());
        });
        this.listaHijos.forEach(etiqueta => {
            etiqueta.getAsTable().filas.forEach(fila => {
                tabla.addFila(fila);
            });
        });
        if (!this.tineHijos) {
            if (this.cadenaValores != "") {
                tabla.addFila(new Fila_1.Fila("-", Tipos_1.Tipos.VALOR, [this.getName()].concat(this.getAmbito()), this.linea, this.columna + this.nombreTagAbre.length + 2, this.cadenaValores));
            }
        }
        return tabla;
    }
    getErroresSemanticos() {
        let texto = "";
        if (this.nombreTagAbre != this.nombreTagCierre) {
            console.log("error arribaa-----------");
            /*
            
            constructor(simbolo: string, tipo: TipoSeleccion, linea: any, columna: any, entorno: string) {
            */
            texto += `Error(Linea: ${this.linea}, Columna: ${this.columna}): El nombre del tag de apertura no es igual al de cierre.\n`;
            ControlError_1.ControlError.Agregar(this.nombreTagAbre, TipoSeleccion_1.TipoSeleccion.ERROR_SEMANTICO, this.linea, this.columna, this.padre.getName());
        }
        this.listaAtributos.forEach(atributo => {
            let apariciones = 0;
            for (let atr2 of this.listaAtributos) {
                if (atributo.nombre == atr2.nombre) {
                    apariciones += 1;
                }
                if (apariciones > 1) {
                    console.log("error abajo");
                    texto += `Error(Linea: ${atributo.linea}, Columna: ${atributo.columna}): El atributo '${atributo.nombre}' se encuentra repetido.\n`;
                    ControlError_1.ControlError.Agregar(atributo.nombre, TipoSeleccion_1.TipoSeleccion.ERROR_SEMANTICO, this.linea, this.columna, this.padre.getName());
                    break;
                }
            }
        });
        this.listaHijos.forEach(hijo => {
            texto += hijo.getErroresSemanticos();
        });
        return texto;
    }
    getCstDotA(idPadre) {
        let texto = "";
        texto += Graficas_1.Graficas.getElement(this.idSent, "ETIQUETA", idPadre);
        texto += Graficas_1.Graficas.getElement(this.idSent + 1, "TAG_APERTURA", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 2, "AbreTagApertura", this.idSent + 1);
        texto += Graficas_1.Graficas.getElement(this.idSent + 3, "<" + this.nombreTagAbre, this.idSent + 2);
        if (this.listaAtributos.length > 0) {
            let cont = 4;
            for (let atributo of this.listaAtributos) {
                if (cont - 4 != this.listaAtributos.length - 1) {
                    texto += Graficas_1.Graficas.getElement(this.idSent + cont, "LISTA_ATRIBUTOS", this.idSent + cont + 1);
                    texto += atributo.getCstDotA(this.idSent + cont);
                }
                else {
                    texto += Graficas_1.Graficas.getElement(this.idSent + cont, "LISTA_ATRIBUTOS", this.idSent + 1);
                    texto += atributo.getCstDotA(this.idSent + cont);
                }
                cont += 1;
            }
        }
        let idSent2 = this.idSent + 4 + this.listaAtributos.length;
        texto += Graficas_1.Graficas.getElement(idSent2 + 1, "CierreTagApertura", this.idSent + 1);
        texto += Graficas_1.Graficas.getElement(idSent2 + 2, ">", idSent2 + 1);
        if (this.listaHijos.length > 0) {
            let cont = 3;
            for (let hijo of this.listaHijos) {
                if (cont - 3 != this.listaHijos.length - 1) {
                    texto += Graficas_1.Graficas.getElement(idSent2 + cont, "LISTA_ETIQUETAS", idSent2 + cont + 1);
                    texto += hijo.getCstDotA(idSent2 + cont);
                }
                else {
                    texto += Graficas_1.Graficas.getElement(idSent2 + cont, "LISTA_ETIQUETAS", this.idSent);
                    texto += hijo.getCstDotA(idSent2 + cont);
                }
                cont += 1;
            }
        }
        else if (this.cadenaValores != "") {
            texto += Graficas_1.Graficas.getElement(idSent2 + 3, "CadenaValores", this.idSent);
            texto += Graficas_1.Graficas.getElement(idSent2 + 4, this.cadenaValores, idSent2 + 3);
        }
        let idSent3 = idSent2 + 4 + this.listaHijos.length;
        texto += Graficas_1.Graficas.getElement(idSent3 + 1, "TAG_CIERRE", this.idSent);
        texto += Graficas_1.Graficas.getElement(idSent3 + 2, "AbreTagCierre", idSent3 + 1);
        texto += Graficas_1.Graficas.getElement(idSent3 + 3, "</" + this.nombreTagCierre, idSent3 + 2);
        texto += Graficas_1.Graficas.getElement(idSent3 + 4, "CierreTagCierre", idSent3 + 1);
        texto += Graficas_1.Graficas.getElement(idSent3 + 5, ">", idSent3 + 4);
        return texto;
    }
    getCstDotD(idPadre) {
        let texto = "";
        texto += Graficas_1.Graficas.getElement(this.idSent, "ETIQUETA", idPadre);
        texto += Graficas_1.Graficas.getElement(this.idSent + 1, "TAG_APERTURA", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 2, "AbreTagApertura", this.idSent + 1);
        texto += Graficas_1.Graficas.getElement(this.idSent + 3, "<" + this.nombreTagAbre, this.idSent + 2);
        if (this.listaAtributos.length > 0) {
            let cont = 4;
            for (let atributo of this.listaAtributos) {
                if (cont === 4) {
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
        let idSent2 = this.idSent + 4 + this.listaAtributos.length;
        texto += Graficas_1.Graficas.getElement(idSent2 + 1, "CierreTagApertura", this.idSent + 1);
        texto += Graficas_1.Graficas.getElement(idSent2 + 2, ">", idSent2 + 1);
        if (this.listaHijos.length > 0) {
            let cont = 3;
            for (let hijo of this.listaHijos) {
                if (cont === 3) {
                    texto += Graficas_1.Graficas.getElement(idSent2 + cont, "LISTA_ETIQUETAS", this.idSent);
                    texto += hijo.getCstDotD(idSent2 + cont);
                }
                else {
                    texto += Graficas_1.Graficas.getElement(idSent2 + cont, "LISTA_ETIQUETAS", idSent2 + cont - 1);
                    texto += hijo.getCstDotD(idSent2 + cont);
                }
                cont += 1;
            }
        }
        else if (this.cadenaValores != "") {
            texto += Graficas_1.Graficas.getElement(idSent2 + 3, "CadenaValores", this.idSent);
            texto += Graficas_1.Graficas.getElement(idSent2 + 4, this.cadenaValores, idSent2 + 3);
        }
        let idSent3 = idSent2 + 4 + this.listaHijos.length;
        texto += Graficas_1.Graficas.getElement(idSent3 + 1, "TAG_CIERRE", this.idSent);
        texto += Graficas_1.Graficas.getElement(idSent3 + 2, "AbreTagCierre", idSent3 + 1);
        texto += Graficas_1.Graficas.getElement(idSent3 + 3, "</" + this.nombreTagCierre, idSent3 + 2);
        texto += Graficas_1.Graficas.getElement(idSent3 + 4, "CierreTagCierre", idSent3 + 1);
        texto += Graficas_1.Graficas.getElement(idSent3 + 5, ">", idSent3 + 4);
        return texto;
    }
}
exports.EtiquetaDoble = EtiquetaDoble;
