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
        var indice;
        var tope;
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
                indice = this.operadori.execute(padre);
                tope = this.operadord.execute(padre);
                datos = {
                    id: { indice: indice, tope: tope },
                    pred: "menor"
                };
                return datos;
            case "menori":
                indice = this.operadori.execute(padre);
                tope = this.operadord.execute(padre);
                datos = {
                    id: { indice: indice, tope: tope },
                    pred: "menori"
                };
                return datos;
            case "mayor":
                indice = this.operadori.execute(padre); //este creo que no va a importar
                tope = this.operadord.execute(padre); //en este caso en este es donde comienza
                datos = {
                    id: { indice: indice, tope: tope },
                    pred: "mayor"
                };
                return datos;
            case "mayori":
                indice = this.operadori.execute(padre); //este creo que no va a importar
                tope = this.operadord.execute(padre); //en este caso en este es donde comienza
                datos = {
                    id: { indice: indice, tope: tope },
                    pred: "mayori"
                };
                return datos;
            case "igual":
                indice = this.operadori.execute(padre); //este creo que no va a importar
                tope = this.operadord.execute(padre); //en este caso en este es donde comienza
                datos = {
                    id: { indice: indice, tope: tope },
                    pred: "igual"
                };
                return datos;
            case "noigual":
                indice = this.operadori.execute(padre); //este creo que no va a importar
                tope = this.operadord.execute(padre); //en este caso en este es donde comienza
                datos = {
                    id: { indice: indice, tope: tope },
                    pred: "noigual"
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
