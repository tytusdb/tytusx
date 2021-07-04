"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Graficas_1 = require("../Graficas/Graficas");
class EtiquetaInicio {
    constructor(listaAtributos, linea, columna, idSent) {
        this.linea = linea;
        this.columna = columna;
        this.idSent = idSent;
        listaAtributos.forEach(atributo => {
            if (atributo.nombre == "version") {
                this.version = atributo.valor;
            }
            else if (atributo.nombre == "encoding") {
                this.encoding = atributo.valor;
            }
        });
    }
    getCstDotA(idPadre) {
        let texto = "";
        texto += Graficas_1.Graficas.getElement(this.idSent, "TAG_CONFIGURACION", idPadre);
        texto += Graficas_1.Graficas.getElement(this.idSent + 1, "AbreTagConf", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 2, "<?", this.idSent + 1);
        texto += Graficas_1.Graficas.getElement(this.idSent + 3, "version", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 4, this.version.split("\"").join(""), this.idSent + 3);
        texto += Graficas_1.Graficas.getElement(this.idSent + 5, "encoding", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 6, this.encoding.split("\"").join(""), this.idSent + 5);
        texto += Graficas_1.Graficas.getElement(this.idSent + 7, "CierreTagConf", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 8, "?>", this.idSent + 7);
        return texto;
    }
}
exports.EtiquetaInicio = EtiquetaInicio;
