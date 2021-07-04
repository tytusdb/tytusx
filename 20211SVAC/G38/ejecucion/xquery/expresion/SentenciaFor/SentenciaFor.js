"use strict";
class SentenciaFor extends ExpresionAncestor {
    constructor(identifier, senteciaXpath, filtro, ordenamiento, retorno, linea, columna) {
        super();
        this.identifier = identifier;
        this.senteciaXpath = senteciaXpath;
        this.filtro = filtro;
        this.ordenamiento = ordenamiento;
        this.retorno = retorno;
        this.indiceVariable = null;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, xmlData) {
        let entornoFor = new TablaSimbolosXquery(ent, "entorno for");
        let valorXpath = this.senteciaXpath.getValor(ent, xmlData);
        if (!(valorXpath instanceof TablaSimbolos)) {
            ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("La consulta xpath en el for no devolvio un resultado de tipo xpath", this.linea, this.columna));
            return;
        }
        if (!this.isXqueryExpresionValid(valorXpath)) {
            return;
        }
        let simbolo = new Simbolo(this.identifier, new Tipo(TipoDato.xpathValue), null, valorXpath);
        entornoFor.agregarSimbolo(simbolo);
        if (this.filtro != null) {
            valorXpath = this.filtro.ejecutar(entornoFor, xmlData);
            if (!this.isXqueryExpresionValid(valorXpath)) {
                return;
            }
            simbolo.valorXpath = valorXpath;
            entornoFor.modificarSimbolo(simbolo);
        }
        if (this.ordenamiento != null) {
            valorXpath = this.ordenamiento.ejecutar(entornoFor, xmlData);
            if (!this.isXqueryExpresionValid(valorXpath)) {
                return;
            }
            simbolo.valorXpath = valorXpath;
            entornoFor.modificarSimbolo(simbolo);
        }
        this.retorno.ejecutar(entornoFor, valorXpath);
        return;
    }
    isXqueryExpresionValid(valorXpath) {
        if (valorXpath == null || valorXpath.esVacia()) {
            ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("La consulta xpath en el for no devolvio ningun resultado", this.linea, this.columna));
            return false;
        }
        return true;
    }
    getTipo(ent, xmlData) {
        return undefined;
    }
    getValor(ent, xmlData) {
        this.ejecutar(ent, xmlData);
    }
}
