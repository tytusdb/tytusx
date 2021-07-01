"use strict";
exports.__esModule = true;
var Entorno = /** @class */ (function () {
    function Entorno(nombre, padre) {
        this.variables = new Array();
        this.instrucciones = new Array();
        this.entornos = new Array();
        this.funciones = new Array();
        this.nombre = nombre;
        this.padre = padre;
    }
    Entorno.prototype.AddVariables = function (Simbolo) {
        this.variables.push(Simbolo);
    };
    Entorno.prototype.AddInstruccion = function (Simbolo) {
        this.instrucciones.push(Simbolo);
    };
    Entorno.prototype.Add = function (Simbolo) {
        this.entornos.push(Simbolo);
    };
    Entorno.prototype.AddFuncion = function (Simbolo) {
        this.funciones.push(Simbolo);
    };
    Entorno.prototype.Get = function () {
        return this.entornos;
    };
    Entorno.prototype.ExisteFuncion = function (identificador) {
        var actual = this;
        for (var i = 0; i < actual.funciones.length; i++) {
            var funcion = actual.funciones[i];
            if (funcion.Nombre == identificador) {
                return funcion;
            }
        }
        return null;
    };
    Entorno.prototype.buscarVariable = function (varia, actual) {
        console.log(actual);
        console.log(varia);
        while (actual != null) {
            for (var i = 0; i < this.variables.length; i++) {
                var variable = this.variables[i];
                if (variable.Nombre == varia) {
                    return variable;
                }
            }
            actual = actual.padre;
        }
        return null;
    };
    return Entorno;
}());
exports["default"] = Entorno;
