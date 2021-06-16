"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Objeto = void 0;
//var Nodo_1 = require("../Abstractas/Nodo");
//var Simbolo_1 = require("../Abstractas/Simbolo");
//var Tipo_1 = require("../Abstractas/Tipo");
//var NodoAST_1 = require("../AST/NodoAST");
var Objeto = /** @class */ (function (_super) {
    __extends(Objeto, _super);
    function Objeto(tipo, Eabre, Ecierra, texto, atributos, hijos, fila, columna) {
        var _this = _super.call(this, fila, columna) || this;
        _this.tipo = tipo;
        _this.Eabre = Eabre;
        _this.Ecierra = Ecierra;
        _this.texto = texto;
        _this.atributos = atributos;
        _this.hijos = hijos;
        return _this;
    }
    Objeto.prototype.ejecutar = function (entorno, errores) {
        var _this = this;
        if (this.Eabre != this.Ecierra) {
            errores.push({ lexema: "EtiqAbre: " + this.Eabre + "\nEtiqCierra: " + this.Ecierra, fila: this.getFila(), columna: this.getColumna(), tipo: "Semantico", desc: "Las etiquetas de apertura y cierre no coinciden" });
            return;
        }
        if (this.tipo == Tipo.OBJETO) {
            var nuevo = new Simbolo(this.Eabre, "", Tipo.OBJETO, this.getFila(), this.getColumna(), entorno);
            if (this.atributos.length > 0) {
                this.atributos.forEach(function (element) {
                    nuevo.entorno.insertarObjeto(new Simbolo(element.nombre, element.valor, Tipo.ATRIBUTO, _this.getFila(), _this.getColumna()));
                });
            }
            if (this.hijos.length > 0) {
                this.hijos.forEach(function (element) {
                    element.ejecutar(nuevo.entorno, errores);
                });
            }
            entorno.insertarObjeto(nuevo);
        }
        else if (this.tipo == Tipo.TEXTO) {
            if (this.atributos.length > 0) {
                var nuevo = new Simbolo(this.Eabre, this.texto, Tipo.TEXTO, this.getFila(), this.getColumna(), entorno);
                this.atributos.forEach(function (element) {
                    nuevo.entorno.insertarObjeto(new Simbolo(element.nombre, element.valor, Tipo.ATRIBUTO, _this.getFila(), _this.getColumna()));
                });
                entorno.insertarObjeto(nuevo);
            }
            else {
                entorno.insertarObjeto(new Simbolo(this.Eabre, this.texto, Tipo.TEXTO, this.getFila(), this.getColumna()));
            }
        }
        else if (this.tipo == Tipo.UNITARIA) {
            if (this.atributos.length > 0) {
                var nuevo = new Simbolo(this.Eabre, this.texto, Tipo.UNITARIA, this.getFila(), this.getColumna(), entorno);
                this.atributos.forEach(function (element) {
                    nuevo.entorno.insertarObjeto(new Simbolo(element.nombre, element.valor, Tipo.ATRIBUTO, _this.getFila(), _this.getColumna()));
                });
                entorno.insertarObjeto(nuevo);
            }
            else {
                entorno.insertarObjeto(new Simbolo(this.Eabre, this.texto, Tipo.UNITARIA, this.getFila(), this.getColumna()));
            }
        }
    };
    Objeto.prototype.getAST = function () {
        var nodo = new NodoAST(this.Eabre);
        if (this.atributos.length > 0) {
            var atr = new NodoAST("Atributos");
            this.atributos.forEach(function (element) {
                atr.addHijo(new NodoAST(element.nombre + " = " + element.valor));
            });
            nodo.addHijo(atr);
        }
        if (this.tipo == 0) {
            nodo.addHijo(new NodoAST(this.texto));
        }
        if (this.hijos.length > 0) {
            var lh = new NodoAST("Objetos");
            this.hijos.forEach(function (element) {
                lh.addHijo(element.getAST());
            });
            nodo.addHijo(lh);
        }
        return nodo;
    };
    Objeto.prototype.getCST = function () {
        var nodo = new NodoAST("OB");
        nodo.addHijo(new NodoAST("<"));
        nodo.addHijo(new NodoAST(this.Eabre));
        if (this.atributos.length > 0) {
            var lta = new NodoAST("LISTATR");
            this.atributos.forEach(function (element) {
                var aux = new NodoAST("ATRIBUTO");
                aux.addHijo(new NodoAST(element.nombre + " = " + element.valor));
                lta.addHijo(aux);
            });
            nodo.addHijo(lta);
        }
        nodo.addHijo(new NodoAST(">"));
        if (this.tipo == 0) {
            nodo.addHijo(new NodoAST(this.texto));
        }
        if (this.hijos.length > 0) {
            var lh = new NodoAST("LOBJETO");
            this.hijos.forEach(function (element) {
                lh.addHijo(element.getCST());
            });
            nodo.addHijo(lh);
        }
        if (this.tipo == 1) {
            nodo.addHijo(new NodoAST("/"));
            nodo.addHijo(new NodoAST(">"));
        }
        else {
            nodo.addHijo(new NodoAST("<"));
            nodo.addHijo(new NodoAST("/"));
            nodo.addHijo(new NodoAST(this.Ecierra));
            nodo.addHijo(new NodoAST(">"));
        }
        return nodo;
    };
    return Objeto;
}(Nodo));
exports.Objeto = Objeto;
