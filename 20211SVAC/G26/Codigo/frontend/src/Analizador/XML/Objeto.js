"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Objeto = void 0;
const Entorno_1 = require("../AST/Entorno");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
class Objeto {
    constructor(id, texto, linea, columna, listaAtributos, listaO, isUnica) {
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaO;
        this.isUnica = isUnica;
    }
    ejecutar(entorno) {
        let local = new Entorno_1.Entorno(this.identificador, entorno, entorno.global);
        local.agregarSimbolo('Etiqueta unica', new Simbolo_1.Simbolo(Tipo_1.Tipo.ETIQUETA_UNIQUE, 'Etiqueta unica', this.isUnica, this.linea, this.columna));
        this.listaAtributos.forEach((elem) => {
            elem.ejecutar(local);
        });
        this.listaObjetos.forEach((obj) => {
            obj.ejecutar(local);
        });
        if (this.texto !== '')
            local.agregarSimbolo('Texto', new Simbolo_1.Simbolo(Tipo_1.Tipo.STRING, 'Texto', this.texto, this.linea, this.columna));
        entorno.agregarSimbolo(this.identificador, new Simbolo_1.Simbolo(this.isUnica ? Tipo_1.Tipo.ETIQUETA_UNIQUE : Tipo_1.Tipo.ETIQUETA, this.identificador, local, this.linea, this.columna));
    }
}
exports.Objeto = Objeto;
