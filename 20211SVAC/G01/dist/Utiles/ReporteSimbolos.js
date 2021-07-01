"use strict";
exports.__esModule = true;
exports.ReporteSimbolos = void 0;
var Entorno_1 = require("../ArbolST/Entorno");
var TablaSimbolos_1 = require("../ArbolST/TablaSimbolos");
var Tipos_1 = require("../ArbolST/Tipos");
var ReporteSimbolos = /** @class */ (function () {
    function ReporteSimbolos(linea, columna) {
    }
    ReporteSimbolos.prototype.ejecutar = function (entorno) {
        var ent = entorno;
        //console.log("entro a graficar");
        console.log('entorno', ent);
        var a = 0;
        TablaSimbolos_1.tabla_simbolos.push();
        while (ent != null) {
            for (var _i = 0, _a = Entorno_1.Entorno[a]; _i < _a.length; _i++) {
                var _b = _a[_i], llave_variable = _b[0], valor_variable = _b[1];
                var elemento = {
                    ambito: "",
                    nombre: "",
                    tipo: "",
                    fila: 0,
                    columna: 0
                };
                elemento.nombre = llave_variable;
                if (ent.comprobar == null) {
                    elemento.ambito = "global";
                }
                else {
                    elemento.ambito = "local";
                }
                if (valor_variable.tipo == Tipos_1.Tipos.INT) {
                    elemento.tipo = "number";
                }
                else if (valor_variable.tipo == Tipos_1.Tipos.STRING) {
                    elemento.tipo = "string";
                }
                else if (valor_variable.tipo == Tipos_1.Tipos.VOID) {
                    elemento.tipo = "undefined";
                }
                else {
                    elemento.tipo = (valor_variable.tipo);
                }
                elemento.fila = (valor_variable.linea);
                elemento.columna = (valor_variable.columna);
                TablaSimbolos_1.tabla_simbolos.push(new TablaSimbolos_1.Elemento_tabla(elemento.nombre, elemento.ambito, elemento.tipo, elemento.fila, elemento.columna));
            }
            console.log('paso');
            for (var _c = 0, _d = Entorno_1.Entorno[a]; _c < _d.length; _c++) {
                var _e = _d[_c], llave_funcion = _e[0], valor_funcion = _e[1];
                var elemento = {
                    ambito: "",
                    nombre: "",
                    tipo: "",
                    fila: 0,
                    columna: 0
                };
                elemento.nombre = llave_funcion;
                if (ent.getSimbolo == null) {
                    elemento.ambito = "global";
                }
                else {
                    elemento.ambito = "local";
                }
                elemento.fila = (valor_funcion.linea);
                elemento.columna = (valor_funcion.columna);
                TablaSimbolos_1.tabla_simbolos.push(new TablaSimbolos_1.Elemento_tabla(elemento.nombre, elemento.ambito, elemento.tipo, elemento.fila, elemento.columna));
            }
        }
    };
    return ReporteSimbolos;
}());
exports.ReporteSimbolos = ReporteSimbolos;
