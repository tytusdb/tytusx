"use strict";
exports.__esModule = true;
exports.For = void 0;
var Entorno_1 = require("../AST/Entorno");
var Simbolo_1 = require("../AST/Simbolo");
var Valor_1 = require("../AST/Valor");
var For = /** @class */ (function () {
    function For(variable, variable2, condiciones, contenido, linea, columna, retorno, t) {
        this.cont = new Array();
        this.variable = variable;
        this.variable2 = variable2;
        this.condiciones = condiciones;
        this.contenido = contenido;
        this.linea = linea;
        this.columna = columna;
        this.retorno = retorno;
        this.t = t;
    }
    For.prototype.ejecutar = function (entorno, node) {
        console.log("pasó por el for");
        var nuevo = new Entorno_1["default"]("For", entorno);
        if (this.variable == "" && this.variable2 == "") {
            if (this.condiciones != null) {
                //en esta sección retorna el valor de la condición
                var retorno = this.condiciones.ejecutar(nuevo, this.condiciones);
                // si el valor de la condición es diferente de nulo e indefinido
                if (retorno != null && retorno != undefined) {
                    this.retorno.ejecutar(nuevo, this.retorno);
                }
                else {
                }
            }
        }
        else if (this.variable != "" && this.variable2 == "") {
            if (this.condiciones != null) {
                var retorno = this.condiciones.ejecutar(nuevo, this.condiciones);
                //SE CREA INSERTA UNA NUEVA VARIABLE EN EL FOR
                var valor = new Valor_1["default"]("Variable", { xpath: retorno.array }, "");
                var simbolo = new Simbolo_1["default"](this.variable, valor, nuevo.nombre, node.linea, node.columna, -1);
                nuevo.AddVariables(simbolo);
                if (this.contenido != null) {
                    this.contenido.ejecutar(nuevo, retorno.xpath);
                }
            }
        }
    };
    For.prototype.newEntorno = function (Contenido, nombre) {
        var _this = this;
        if (Contenido.length != undefined && Contenido != null) {
            Contenido.forEach(function (element) {
                if (element.nombreInit != undefined) {
                    if (element.nombreInit == nombre) {
                        if (element.elementos != null) {
                            _this.cont.push(element);
                        }
                        else {
                            _this.cont.push(element);
                        }
                    }
                    else {
                        var array = [];
                        if (element.elementos != null) {
                            array.push(element.elementos);
                            _this.newEntorno(array, nombre);
                        }
                    }
                }
                else if (element.lista != undefined) {
                    if (element != null) {
                        element.lista.forEach(function (elemento2) {
                            var array = [];
                            array.push(elemento2);
                            _this.newEntorno(array, nombre);
                        });
                    }
                }
            });
        }
        else {
            if (Contenido.Nombre != undefined) {
                if (Contenido.Nombre == nombre) {
                    if (Contenido.elementos != null) {
                        this.cont.push(Contenido);
                    }
                    else {
                        this.cont.push(Contenido);
                    }
                }
                else {
                    var array = [];
                    if (Contenido.elementos != null) {
                        array.push(Contenido.elementos);
                        this.newEntorno(array, nombre);
                    }
                }
            }
            else if (Contenido.lista != undefined) {
                if (Contenido != null) {
                    Contenido.lista.forEach(function (elemento2) {
                        var array = [];
                        array.push(elemento2);
                        _this.newEntorno(array, nombre);
                    });
                }
            }
            else if (Contenido.nombreInit != undefined) {
                if (Contenido.nombreInit == nombre) {
                    if (Contenido.elementos != null) {
                        this.cont.push(Contenido);
                    }
                    else {
                        this.cont.push(Contenido);
                    }
                }
                else {
                    var array = [];
                    if (Contenido.elementos != null) {
                        array.push(Contenido.elementos);
                        this.newEntorno(array, nombre);
                    }
                }
            }
        }
        return this.cont;
    };
    return For;
}());
exports.For = For;
