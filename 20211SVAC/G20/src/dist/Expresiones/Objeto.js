"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Objeto = exports.Etiqueta = void 0;
var Etiqueta;
(function (Etiqueta) {
    Etiqueta[Etiqueta["UNICA"] = 0] = "UNICA";
    Etiqueta[Etiqueta["DOBLE"] = 1] = "DOBLE";
    Etiqueta[Etiqueta["HEADER"] = 2] = "HEADER";
})(Etiqueta = exports.Etiqueta || (exports.Etiqueta = {}));
class Objeto {
    constructor(id, texto, linea, columna, listaAtributos, listaO, etiqueta) {
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaO;
        this.etiqueta = etiqueta;
        this.textWithoutSpecial = this.setCaracteresEspeciales(texto);
    }
    setCaracteresEspeciales(valor) {
        let value = valor.split("&lt;").join("<");
        value = value.split("&gt;").join(">");
        value = value.split("&amp;").join("&");
        value = value.split("&apos;").join("'");
        value = value.split("&quot;").join('"');
        return value;
    }
}
exports.Objeto = Objeto;
