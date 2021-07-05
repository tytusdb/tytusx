"use strict";
exports.__esModule = true;
var buffer_1 = require("buffer");
var TraducirConsulta = /** @class */ (function () {
    function TraducirConsulta(stack, heap, consulta, simbolos, encoding, t) {
        this.encoding = "";
        this.stack = [];
        this.heap = [];
        this.consulta = [];
        this.simbolos = [];
        this.padre = "";
        this.cadenita = "";
        this.imprimir = "";
        this.igual = "=".charCodeAt(0);
        this.menor = "<".charCodeAt(0);
        this.mayor = ">".charCodeAt(0);
        this.barra = "/".charCodeAt(0);
        this.t = 0;
        this.l = 0;
        this.stack = stack;
        this.heap = heap;
        this.consulta = consulta;
        this.simbolos = simbolos;
        this.encoding = encoding;
        this.t = t;
        console.log(this.stack);
        console.log(this.heap);
        console.log(this.consulta);
        console.log(this.simbolos);
        console.log(this.encoding);
        console.log(this.t);
        console.log("Igual: " + this.igual);
        console.log("Menor: " + this.menor);
        console.log("Mayor: " + this.mayor);
        console.log("Barra: " + this.barra);
    }
    TraducirConsulta.prototype.darFormato = function () {
        var cadena = "";
        var t2 = 0;
        var l2 = 0;
        var posi = "";
        cadena += "/*------NATIVES------*/\n";
        cadena += "void imprimirConsulta() {\n";
        cadena += this.imprimir + "\n";
        cadena += "}\n\n";
        cadena += "void consulta() {\n";
        cadena += "}";
        return { string: cadena, number: this.t };
    };
    TraducirConsulta.prototype.armar = function () {
    };
    TraducirConsulta.prototype.convertir = function (cadena) {
        if (this.encoding == "utf") {
            var bufer = new buffer_1.Buffer(cadena, "utf-8");
            return bufer.toString("utf8");
        }
        else if (this.encoding == "iso") {
            return this.utf8_encode(cadena);
        }
        else if (this.encoding == "ascii") {
            var bufer = new buffer_1.Buffer(cadena, "ascii");
            return bufer.toString("ascii");
        }
        return "error";
    };
    TraducirConsulta.prototype.utf8_encode = function (argString) {
        if (argString === null || typeof argString === 'undefined') {
            return '';
        }
        var string = (argString + '');
        var utftext = '';
        var start;
        var end;
        var stringl = 0;
        start = end = 0;
        stringl = string.length;
        for (var n = 0; n < stringl; n++) {
            var c1 = string.charCodeAt(n);
            var enc = null;
            if (c1 < 128) {
                end++;
            }
            else if (c1 > 127 && c1 < 2048) {
                enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
            }
            else if ((c1 & 0xF800) !== 0xD800) {
                enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
            }
            else {
                if ((c1 & 0xFC00) !== 0xD800) {
                    throw new RangeError('Unmatched trail surrogate at ' + n);
                }
                var c2 = string.charCodeAt(++n);
                if ((c2 & 0xFC00) !== 0xDC00) {
                    throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
                }
                c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
                enc = String.fromCharCode((c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
            }
            if (enc !== null) {
                if (end > start) {
                    utftext += string.slice(start, end);
                }
                utftext += enc;
                start = end = n + 1;
            }
        }
        if (end > start) {
            utftext += string.slice(start, stringl);
        }
        return utftext;
    };
    return TraducirConsulta;
}());
exports["default"] = TraducirConsulta;
