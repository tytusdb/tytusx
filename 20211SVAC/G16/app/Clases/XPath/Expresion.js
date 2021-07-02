"use strict";
exports.__esModule = true;
exports.Expresion = void 0;
var Expresion = /** @class */ (function () {
    function Expresion(opizq, opder, operador) {
        this.operadori = opizq;
        this.operadord = opder;
        this.operador = operador;
    }
    Expresion.prototype.execute = function (padre) {
        var datos = {};
        switch (this.operador) {
            case "id":
                datos = {
                    id: this.operadori,
                    pred: "false"
                };
                return datos;
            case "IdPredicado":
                datos = {
                    id: this.operadori,
                    pred: this.operadord
                };
                return datos;
            case "dospuntos":
                datos = {
                    id: "..",
                    pred: "false"
                };
                return datos;
            case "punto":
                datos = {
                    id: ".",
                    pred: "false"
                };
                return datos;
            case "aterisco":
                datos = {
                    id: "*",
                    pred: "false"
                };
                return datos;
            case "agributoT":
                datos = {
                    id: "@*",
                    pred: "false"
                };
                return datos;
            case "+":
                return this.operadori.execute(padre) + this.operadord.execute(padre);
            case "-":
                return this.operadori.execute(padre) - this.operadord.execute(padre);
            case "*":
                return this.operadori.execute(padre) * this.operadord.execute(padre);
            case "div":
                return this.operadori.execute(padre) / this.operadord.execute(padre);
            case "mod":
                return this.operadori.execute(padre) % this.operadord.execute(padre);
            case "decimal":
                return Number(this.operadori);
            case "menor":
                var indice = this.operadori.execute(padre);
                var tope = this.operadord.execute(padre);
                console.log("Entro " + indice + " < " + tope);
                datos = {
                    id: { indice: indice, tope: tope },
                    pred: "menor"
                };
                return datos;
            case "entero":
                return Number(this.operadori);
        }
        return datos;
    };
    return Expresion;
}());
exports.Expresion = Expresion;
