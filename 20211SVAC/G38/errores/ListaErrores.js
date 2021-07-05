"use strict";
class ListaErrores {
    constructor() {
        this.lista = [];
    }
    static hayErroresXml() {
        if (this._erroresXML.lista == null || this._erroresXML.lista.length == 0) {
            return false;
        }
        return true;
    }
    static hayErroresXpath() {
        if (this._erroresXpath.lista == null || this._erroresXpath.lista.length == 0) {
            return false;
        }
        return true;
    }
    static hayErroresXquery() {
        if (this._erroresXquery.lista == null || this._erroresXquery.lista.length == 0) {
            return false;
        }
        return true;
    }
    static hayErroresC3D() {
        if (this._erroresC3D.lista == null || this._erroresC3D.lista.length == 0) {
            return false;
        }
        return true;
    }
    static InicializarXpath() {
        this._erroresXpath = new ListaErrores();
    }
    static InicializarXML() {
        this._erroresXpath = new ListaErrores();
    }
    static InicializarXquery() {
        this._erroresXquery = new ListaErrores();
    }
    static InicializarC3D() {
        this._erroresC3D = new ListaErrores();
    }
    static AgregarErrorXML(error) {
        if (this._erroresXML == undefined || Object.keys(this._erroresXML).length === 0) {
            this.InicializarXML();
        }
        this._erroresXML.lista.push(error);
    }
    static AgregarErrorXPATH(error) {
        if (this._erroresXpath == undefined || Object.keys(this._erroresXpath).length === 0) {
            this.InicializarXpath();
        }
        this._erroresXpath.lista.push(error);
    }
    static AgregarErrorXQUERY(error) {
        if (this._erroresXquery == undefined || Object.keys(this._erroresXquery).length === 0) {
            this.InicializarXquery();
        }
        this._erroresXquery.lista.push(error);
    }
    static AgregarErrorC3D(error) {
        if (this._erroresC3D == undefined || Object.keys(this._erroresC3D).length === 0) {
            this.InicializarC3D();
        }
        this._erroresC3D.lista.push(error);
    }
    static ValidarEtiquetas(idApertura, idCierre, linea, columna) {
        if (idApertura == undefined || idApertura == null
            || idCierre == undefined || idCierre == null) {
            return;
        }
        if (idApertura != idCierre) {
            ListaErrores.AgregarErrorXML(new TokenError(TipoError.Semantico, "Tag de cierre ''" + idCierre + "' no coresponde al tag de apertura ''" + idApertura + "'.", linea, columna));
        }
    }
    static getHtmlTableXml() {
        return this.getCadHtmlFromReprote(ListaErrores._erroresXML, "Errores XML");
    }
    static getHtmlTableXPath() {
        return this.getCadHtmlFromReprote(ListaErrores._erroresXpath, "Errores XPath");
    }
    static getHtmlTableXQuery() {
        return this.getCadHtmlFromReprote(ListaErrores._erroresXquery, "Errores XQuery");
    }
    static getHtmlTableC3D() {
        return this.getCadHtmlFromReprote(ListaErrores._erroresC3D, "Errores C3D");
    }
    static getCadHtmlFromReprote(listaErrores, encabezado) {
        let cad;
        var index = 1;
        cad = '<cite style="font-size:x-large;">' + encabezado + '</cite><br/>' +
            '<table border="1">'
            + '<tr>'
            + '<th>LINEA</th><th>COLUMNA</th><th>TIPO</th><th>DESCRIPCION</th>'
            + '</tr>';
        for (let e of listaErrores.lista) {
            let linea = e.linea;
            let columna = e.columna;
            let tipo = e.tipoError;
            let descripcion = e.mensaje;
            let row;
            row = '<tr>';
            row += '<td>' + linea + '</td>' + '<td>' + columna + '</td>' + '<td>' + tipo + '</td>' + '<td>' + descripcion + '</td>';
            row += '</tr>';
            cad += row;
        }
        return cad;
    }
}
ListaErrores._erroresXpath = new ListaErrores();
ListaErrores._erroresXML = new ListaErrores();
ListaErrores._erroresXquery = new ListaErrores();
ListaErrores._erroresC3D = new ListaErrores();
