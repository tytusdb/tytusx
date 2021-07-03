"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Objeto = void 0;
var Enum_1 = require("./Enum");
var Objeto = /** @class */ (function () {
    function Objeto() {
    }
    Objeto.prototype.newValue = function (_valor, _tipo, _linea, _columna) {
        return {
            valor: _valor,
            tipo: _tipo,
            linea: _linea,
            columna: _columna
        };
    };
    Objeto.prototype.newOperation = function (_opIzq, _opDer, _tipo, _linea, _columna) {
        return {
            opIzq: _opIzq,
            opDer: _opDer,
            tipo: _tipo,
            linea: _linea,
            columna: _columna
        };
    };
    Objeto.prototype.newNodename = function (_nodename, _linea, _columna) {
        return {
            nodename: _nodename,
            tipo: Enum_1.Tipos.NODENAME,
            linea: _linea,
            columna: _columna
        };
    };
    Objeto.prototype.newAxis = function (_expresion, _linea, _columna) {
        return {
            expresion: _expresion,
            tipo: Enum_1.Tipos.SELECT_FROM_ROOT,
            linea: _linea,
            columna: _columna
        };
    };
    Objeto.prototype.newDoubleAxis = function (_expresion, _linea, _columna) {
        return {
            expresion: _expresion,
            tipo: Enum_1.Tipos.SELECT_FROM_CURRENT,
            linea: _linea,
            columna: _columna
        };
    };
    Objeto.prototype.newCurrent = function (_expresion, _linea, _columna) {
        return {
            expresion: _expresion,
            tipo: Enum_1.Tipos.SELECT_CURRENT,
            linea: _linea,
            columna: _columna
        };
    };
    Objeto.prototype.newParent = function (_expresion, _linea, _columna) {
        return {
            expresion: _expresion,
            tipo: Enum_1.Tipos.SELECT_PARENT,
            linea: _linea,
            columna: _columna
        };
    };
    Objeto.prototype.newAttribute = function (_expresion, _linea, _columna) {
        return {
            expresion: _expresion,
            tipo: Enum_1.Tipos.SELECT_ATTRIBUTES,
            linea: _linea,
            columna: _columna
        };
    };
    Objeto.prototype.newAxisObject = function (_axisname, _nodetest, _linea, _columna) {
        return {
            axisname: _axisname,
            nodetest: _nodetest,
            tipo: Enum_1.Tipos.SELECT_AXIS,
            linea: _linea,
            columna: _columna
        };
    };
    Objeto.prototype.newPredicate = function (_condicion, _linea, _columna) {
        return {
            condicion: _condicion,
            tipo: Enum_1.Tipos.PREDICATE,
            linea: _linea,
            columna: _columna
        };
    };
    Objeto.prototype.newExpression = function (_expresion, _predicate, _linea, _columna) {
        return {
            expresion: _expresion,
            predicate: _predicate,
            tipo: Enum_1.Tipos.EXPRESION,
            linea: _linea,
            columna: _columna
        };
    };
    return Objeto;
}());
exports.Objeto = Objeto;
