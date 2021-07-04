"use strict";
exports.__esModule = true;
exports.LlamadoFuncion = exports.SentenciaXquery = void 0;
var SentenciaXquery = /** @class */ (function () {
    function SentenciaXquery(FlworExpresion, AnnotatedDecl, Llamado) {
        this.FlworExpresion = FlworExpresion;
        this.AnnotatedDecl = AnnotatedDecl;
        this.Llamado = Llamado;
    }
    return SentenciaXquery;
}());
exports.SentenciaXquery = SentenciaXquery;
var LlamadoFuncion = /** @class */ (function () {
    function LlamadoFuncion(Parametros, Name) {
        this.Parametros = Parametros;
        this.Name = Name;
    }
    return LlamadoFuncion;
}());
exports.LlamadoFuncion = LlamadoFuncion;
