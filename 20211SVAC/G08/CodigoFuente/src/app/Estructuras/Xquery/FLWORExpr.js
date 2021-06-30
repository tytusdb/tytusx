"use strict";
exports.__esModule = true;
exports.FLWORBinding = exports.FLWORVariables = exports.OrderSpec = exports.IntermediteClause = exports.FLWORExpr = void 0;
var FLWORExpr = /** @class */ (function () {
    function FLWORExpr(binding, IntermediteClauses, returnClause) {
        this.Binding = binding;
        this.IntermediteClauses = IntermediteClauses;
        this.ReturnClause = returnClause;
    }
    return FLWORExpr;
}());
exports.FLWORExpr = FLWORExpr;
var IntermediteClause = /** @class */ (function () {
    function IntermediteClause(Tipo, Clausula) {
        this.Tipo = Tipo;
        this.Clausula = Clausula;
    }
    return IntermediteClause;
}());
exports.IntermediteClause = IntermediteClause;
var OrderSpec = /** @class */ (function () {
    function OrderSpec(SingleExpresion, OrderModifierType) {
        this.SingleExpresion = SingleExpresion;
        this.OrderModifierType = OrderModifierType;
    }
    return OrderSpec;
}());
exports.OrderSpec = OrderSpec;
var FLWORVariables = /** @class */ (function () {
    function FLWORVariables(varName, sentencia, SEValue) {
        this.VarName = varName;
        this.Sentencia = sentencia;
        this.SEValue = SEValue;
    }
    return FLWORVariables;
}());
exports.FLWORVariables = FLWORVariables;
var FLWORBinding = /** @class */ (function () {
    function FLWORBinding(tipo, Variable) {
        this.Tipo = tipo;
        this.Variables = [];
        this.Variables.push(Variable);
    }
    return FLWORBinding;
}());
exports.FLWORBinding = FLWORBinding;
