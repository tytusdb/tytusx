"use strict";
exports.__esModule = true;
exports.TypeDeclaration = exports.ParametroXquery = exports.FunctionName = exports.FuncionXquery = exports.VariableXquery = exports.DeclaracionXquery = void 0;
//Clases para declaraciones de variables
var DeclaracionXquery = /** @class */ (function () {
    function DeclaracionXquery(Tipo, Valor) {
        this.Tipo = Tipo;
        this.Valor = Valor;
    }
    return DeclaracionXquery;
}());
exports.DeclaracionXquery = DeclaracionXquery;
var VariableXquery = /** @class */ (function () {
    function VariableXquery(Varname, Sentencia) {
        this.Varname = Varname;
        this.Sentencia = Sentencia;
    }
    return VariableXquery;
}());
exports.VariableXquery = VariableXquery;
//Clases para Funciones definidas por el usuario
var FuncionXquery = /** @class */ (function () {
    function FuncionXquery(FunctionName, ListaParametros, Tipo, Body) {
        this.FunctionName = FunctionName;
        this.ListaParametros = ListaParametros;
        this.Tipo = Tipo;
        this.Body = Body;
    }
    return FuncionXquery;
}());
exports.FuncionXquery = FuncionXquery;
var FunctionName = /** @class */ (function () {
    function FunctionName(Name, Ambiente) {
        this.Ambiente = Ambiente;
        this.Name = Name;
    }
    return FunctionName;
}());
exports.FunctionName = FunctionName;
var ParametroXquery = /** @class */ (function () {
    function ParametroXquery(Name, TipoParam) {
        this.Name = Name;
        this.TipoParam = TipoParam;
    }
    return ParametroXquery;
}());
exports.ParametroXquery = ParametroXquery;
var TypeDeclaration = /** @class */ (function () {
    function TypeDeclaration(Tipo, OccurrenceIndicator) {
        this.Tipo = Tipo;
        this.OccurrenceIndicator = OccurrenceIndicator;
    }
    return TypeDeclaration;
}());
exports.TypeDeclaration = TypeDeclaration;
