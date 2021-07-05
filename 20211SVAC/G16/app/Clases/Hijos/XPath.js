"use strict";
exports.__esModule = true;
exports.XPath = void 0;
var TablaSim = require("../XPath/TablaSimbolosXP.js");
var parserXpathAsc = require('../../../Gramaticas/XPathA.js');
var XPath = /** @class */ (function () {
    function XPath(xpath) {
        this.padre = [];
        this.lista = [];
        this.xpath = xpath;
    }
    XPath.prototype.ejecutar = function (entorno, node) {
        TablaSim.TablaSimbolosXP.clear();
        var x = parserXpathAsc.parse(this.xpath);
        this.RecorrerAbstractas();
        return { array: this.padre, xpath: this.xpath };
    };
    XPath.prototype.RecorrerAbstractas = function () {
        var _this = this;
        this.encoding = localStorage.getItem("encoding");
        this.padre = [];
        this.lista = [];
        if (TablaSim.TablaSimbolosXP.getSimbolos().length > 0) {
            for (var i = 0; i < TablaSim.TablaSimbolosXP.getSimbolos().length; i++) {
                this.lista.push(TablaSim.TablaSimbolosXP.getSimbolos()[i]);
            }
        }
        this.padre = JSON.parse(localStorage.getItem("tablaSimbolo"));
        this.padre = this.padre[0];
        localStorage.setItem("dad", JSON.stringify(this.padre));
        this.lista.forEach(function (element) {
            _this.padre = JSON.parse(localStorage.getItem("dad"));
            element.execute(_this.padre);
        });
        try {
            this.padre = JSON.parse(localStorage.getItem("dad"));
            return this.padre;
            /* const formato = new Formato(this.padre, this.encoding);
             var y = formato.darFormato()
             console.log(y)*/
        }
        catch (_a) {
            var textopadre = localStorage.getItem("dad");
            return textopadre;
        }
    };
    return XPath;
}());
exports.XPath = XPath;
