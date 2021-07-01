"use strict";
exports.__esModule = true;
exports.Formato = void 0;
var buffer_1 = require("buffer");
var Formato = /** @class */ (function () {
    function Formato(contenido, toastr, encoding) {
        this.toastr = toastr;
        this.contenido = [];
        this.cadenita = "";
        this.encoding = "";
        this.contenido = contenido;
        this.encoding = encoding;
    }
    Formato.prototype.darFormato = function () {
        var _this = this;
        var cadena = "";
        //recorre el contenido del arreglo
        if (this.contenido.length != 0) {
            this.contenido.forEach(function (element) {
                if (element.valor != undefined) {
                    if (element.valor.nombreInit != "") {
                        if (element.Tipo == "Texto" || element.Tipo == "Vacio") {
                            cadena += "<" + element.valor.nombreInit;
                            if (element.valor.atributos != null) {
                                console.log("hay una lista");
                                var array = [];
                                array.push(element.valor.atributos);
                                _this.armar(array);
                                cadena += " " + _this.cadenita;
                                _this.cadenita = "";
                            }
                            if (element.valor.nombreFin != "") {
                                if (element.valor.texto != "") {
                                    var cad = _this.convertir(element.valor.texto);
                                    console.log(cad);
                                    if (cad != "error") {
                                        cadena += ">" + cad;
                                    }
                                    cadena += "</" + element.valor.nombreFin + ">\n";
                                }
                                else {
                                    cadena += "></" + element.valor.nombreFin + ">\n";
                                }
                            }
                            else {
                                cadena += "/>";
                            }
                        }
                        else if (element.Tipo == "Elementos") {
                            //console.log(element.valor)
                            var array = [];
                            array.push(element.valor);
                            _this.armar(array);
                            cadena += _this.cadenita;
                            _this.cadenita = "";
                        }
                    }
                }
                else {
                    if (element.nombreInit != "") {
                        cadena += "<" + element.nombreInit;
                        if (element.atributos != null) {
                            console.log("hay una lista");
                            var array = [];
                            array.push(element.atributos);
                            _this.armar(array);
                            cadena += " " + _this.cadenita;
                            _this.cadenita = "";
                        }
                        if (element.elementos != null) {
                            //console.log(element.valor)
                            console.log("está en formato");
                            var array = [];
                            array.push(element.elementos);
                            _this.armar(array);
                            cadena += ">" + _this.cadenita;
                            _this.cadenita = "";
                        }
                        else {
                            if (element.nombreFin != "") {
                                if (element.texto != "") {
                                    var cad = _this.convertir(element.texto);
                                    if (cad != "error") {
                                        cadena += ">" + cad;
                                    }
                                    cadena += "</" + element.nombreFin + ">\n";
                                }
                                else {
                                    cadena += "></" + element.nombreFin + ">\n";
                                }
                            }
                            else {
                                cadena += "/>";
                            }
                        }
                    }
                }
            });
        }
        else {
            this.toastr.warning("El elemento que busca no se ha encontrado en este archivo XML");
        }
        return cadena;
    };
    Formato.prototype.armar = function (Elemento) {
        var _this = this;
        if (Elemento != undefined) {
            Elemento.forEach(function (element) {
                if (element.lista != undefined) {
                    _this.armar(element.lista);
                }
                else {
                    if (element.texto != undefined) {
                        var elementos = element;
                        _this.cadenita += "<" + elementos.nombreInit;
                        if (elementos.atributos != undefined && elementos.atributos != null) {
                            if (elementos.atributos.lista != undefined) {
                                // console.log(this.cadenita)
                                _this.armar(elementos.atributos.lista);
                            }
                            else {
                                var el = elementos.atributos[0];
                                _this.cadenita += " " + el.identificador + "=" + el.valor;
                            }
                        }
                        else {
                            //  this.cadenita+=">";
                        }
                        if (elementos.texto != "") {
                            var cad = _this.convertir(elementos.texto);
                            if (cad != "error") {
                                //habia un >
                                _this.cadenita += ">" + cad + "</" + elementos.nombreFin + ">\n";
                            }
                        }
                        else if (elementos.elementos != null) {
                            _this.cadenita += ">" + "\n";
                            _this.armar(elementos.elementos.lista);
                            _this.cadenita += "</" + elementos.nombreFin + ">\n";
                        }
                        else {
                            if (elementos.nombreFin != "") {
                                _this.cadenita += "</" + elementos.nombreFin + ">\n";
                            }
                            else {
                                _this.cadenita += "/>\n";
                            }
                        }
                    }
                    if (element.identificador != undefined) {
                        var elementos = element;
                        _this.cadenita += " " + elementos.identificador + "=" + elementos.valor + " ";
                    }
                }
            });
        }
    };
    Formato.prototype.convertir = function (cadena) {
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
    Formato.prototype.utf8_encode = function (argString) {
        //  discuss at: https://locutus.io/php/utf8_encode/
        // original by: Webtoolkit.info (https://www.webtoolkit.info/)
        // improved by: Kevin van Zonneveld (https://kvz.io)
        // improved by: sowberry
        // improved by: Jack
        // improved by: Yves Sucaet
        // improved by: kirilloid
        // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
        // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
        // bugfixed by: Ulrich
        // bugfixed by: Rafał Kukawski (https://blog.kukawski.pl)
        // bugfixed by: kirilloid
        //   example 1: utf8_encode('Kevin van Zonneveld')
        //   returns 1: 'Kevin van Zonneveld'
        if (argString === null || typeof argString === 'undefined') {
            return '';
        }
        // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
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
                // surrogate pairs
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
    return Formato;
}());
exports.Formato = Formato;
