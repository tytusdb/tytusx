"use strict";
exports.__esModule = true;
exports.ConsultasTS = void 0;
var ConsultasTS = /** @class */ (function () {
    function ConsultasTS() {
        //ESTA CLASE VA A TENER TODAS LAS TIPOS DE CONSULTAS QUE SE PUEDEN REALIZAR 
        //A LA TABLA QUE CONTIENE LA INFORMACIÓN DEL XML, PARA PODER SER USADAS
        //EN TODAS LAS CLASES ABSTRACTAS QUE SE NECESITEN.
        this.contenido = [];
        this.hijos = [];
        this.texto = "";
        this.hayatributo = "";
        this.tablasimbolos = JSON.parse(localStorage.getItem("tablaSimbolo"));
        this.encoding = localStorage.getItem("encoding");
    }
    ConsultasTS.prototype.getEntornoActual = function (etiqueta, padre) {
        this.contenido = [];
        // Busca en la tabla de simbolos
        for (var i = 0; i < this.tablasimbolos.length; i++) {
            var elemento = this.tablasimbolos[i];
            if (elemento.Nombre == etiqueta && elemento.Padre == padre) {
                this.contenido.push(elemento.Valor);
            }
            else if (elemento.Tipo == etiqueta && elemento.Padre == padre) {
                this.contenido.push(elemento.Valor.valor);
            }
            else if (etiqueta == "Texto" && elemento.Padre == padre) {
                this.contenido.push(elemento.Valor);
            }
        }
        return this.contenido;
    };
    ConsultasTS.prototype.getEntornoLibre = function (etiqueta) {
        for (var i = 0; i < this.tablasimbolos.length; i++) {
            var elemento = this.tablasimbolos[i];
            if (elemento.Nombre == etiqueta) {
                this.contenido.push(elemento.Valor);
            }
            else if (elemento.Tipo == "Texto") {
                this.contenido.push(elemento.Valor);
            }
        }
    };
    ConsultasTS.prototype.getPredicado = function (padre, indice) {
        this.contenido = JSON.parse(padre);
        for (var i = 0; i < this.contenido.length; i++) {
            if (i == (indice - 1)) {
                this.hijos.push(this.contenido[i]);
            }
        }
        this.contenido = [];
        this.contenido = this.hijos;
        return this.contenido;
    };
    ConsultasTS.prototype.getAtributo = function (padre, atributo) {
        this.hijos = [];
        try {
            this.contenido = JSON.parse(padre);
        }
        catch (_a) {
            this.contenido = padre;
        }
        for (var i = 0; i < this.contenido.length; i++) {
            this.RecorrerAtributo(this.contenido[i].atributos, atributo);
            if (this.hayatributo != "F") {
                this.hijos.push(this.contenido[i]);
            }
        }
        return this.hijos;
    };
    ConsultasTS.prototype.RecorrerAtributo = function (contenido, atributo) {
        var _this = this;
        if (contenido.lista != undefined) {
            contenido.lista.forEach(function (element) {
                if (element.lista != undefined) {
                    _this.RecorrerAtributo(element.lista, atributo);
                }
            });
        }
        else {
            if (atributo != "all") {
                if (contenido[0].identificador == atributo) {
                    var c = contenido[0].valor;
                    this.hayatributo = c.replace("\"", "");
                }
                else {
                    this.hayatributo = "F";
                }
            }
            else {
                var c = contenido[0].valor;
                this.hayatributo = c.replace("\"", "");
            }
        }
    };
    ConsultasTS.prototype.getOnlyAtributo = function (padre, atributo) {
        var texto = "";
        try {
            this.contenido = JSON.parse(padre);
        }
        catch (_a) {
            this.contenido = padre;
        }
        for (var i = 0; i < this.contenido.length; i++) {
            this.RecorrerAtributo(this.contenido[i].atributos, atributo);
            if (this.hayatributo != "F") {
                texto += "\n" + this.hayatributo.replace("\"", "");
            }
        }
        return texto;
    };
    ConsultasTS.prototype.Menor = function (indice, tope, padre) {
        this.contenido = JSON.parse(padre);
        this.hijos = [];
        if (indice.id == undefined) {
            for (var i = indice; i < tope; i++) {
                for (var j = 0; j < this.contenido.length; j++) {
                    if (j == (i - 1)) {
                        this.hijos.push(this.contenido[j]);
                    }
                }
            }
        }
        else {
            for (var i = 0; i < this.contenido.length; i++) {
                this.getEtiqueta(this.contenido[i], indice.id);
                if (this.etiqueta < tope) {
                    this.hijos.push(this.contenido[i]);
                }
            }
        }
        return this.hijos;
    };
    ConsultasTS.prototype.Menori = function (indice, tope, padre) {
        this.contenido = JSON.parse(padre);
        this.hijos = [];
        if (indice.id == undefined) {
            for (var i = indice; i <= tope; i++) {
                for (var j = 0; j < this.contenido.length; j++) {
                    if (j == (i - 1)) {
                        this.hijos.push(this.contenido[j]);
                    }
                }
            }
        }
        else {
            for (var i = 0; i < this.contenido.length; i++) {
                this.getEtiqueta(this.contenido[i], indice.id);
                if (this.etiqueta <= tope) {
                    this.hijos.push(this.contenido[i]);
                }
            }
        }
        return this.hijos;
    };
    ConsultasTS.prototype.Mayor = function (indice, tope, padre) {
        this.contenido = JSON.parse(padre);
        this.hijos = [];
        if (indice.id == undefined) {
            for (var i = tope + 1; i < this.contenido.length + 1; i++) {
                for (var j = 0; j < this.contenido.length; j++) {
                    if (j == (i - 1)) {
                        this.hijos.push(this.contenido[j]);
                    }
                }
            }
        }
        else { //QUIERE DECIR QUE PUEDE VENIR UNA ETIQUETA
            for (var i = 0; i < this.contenido.length; i++) {
                this.getEtiqueta(this.contenido[i], indice.id);
                if (this.etiqueta > tope) {
                    this.hijos.push(this.contenido[i]);
                }
            }
        }
        return this.hijos;
    };
    ConsultasTS.prototype.Mayori = function (indice, tope, padre) {
        this.contenido = JSON.parse(padre);
        this.hijos = [];
        if (indice.id == undefined) {
            for (var i = tope; i < this.contenido.length + 1; i++) {
                for (var j = 0; j < this.contenido.length; j++) {
                    if (j == (i - 1)) {
                        this.hijos.push(this.contenido[j]);
                    }
                }
            }
        }
        else {
            for (var i = 0; i < this.contenido.length; i++) {
                this.getEtiqueta(this.contenido[i], indice.id);
                if (this.etiqueta >= tope) {
                    this.hijos.push(this.contenido[i]);
                }
            }
        }
        return this.hijos;
    };
    ConsultasTS.prototype.Igual = function (indice, tope, padre) {
        this.contenido = JSON.parse(padre);
        this.hijos = [];
        if (indice.id != undefined) {
            if (indice.pred == "atributoid") {
                for (var i = 0; i < this.contenido.length; i++) {
                    this.RecorrerAtributo(this.contenido[i].atributos, indice.id.indice);
                    if (this.hayatributo != "F") {
                        var atr = this.hayatributo.replace("\"", "");
                        var atr2 = tope;
                        var x = atr2.replace("\"", "");
                        console.log(atr + "-" + x);
                        if (atr == x) {
                            this.hijos.push(this.contenido[i]);
                        }
                    }
                    else {
                        console.log(this.hayatributo);
                    }
                }
            }
            else {
                for (var i = 0; i < this.contenido.length; i++) {
                    this.getEtiqueta(this.contenido[i], indice.id);
                    if (this.etiqueta == tope) {
                        this.hijos.push(this.contenido[i]);
                    }
                }
            }
        }
        return this.hijos;
    };
    ConsultasTS.prototype.Diferente = function (indice, tope, padre) {
        this.contenido = JSON.parse(padre);
        this.hijos = [];
        if (indice.id != undefined) {
            if (indice.pred == "atributoid") {
                for (var i = 0; i < this.contenido.length; i++) {
                    this.RecorrerAtributo(this.contenido[i].atributos, indice.id.indice);
                    if (this.hayatributo != "F") {
                        var atr = this.hayatributo.replace("\"", "");
                        var atr2 = tope;
                        var x = atr2.replace("\"", "");
                        console.log(atr + "-" + x);
                        if (atr != x) {
                            this.hijos.push(this.contenido[i]);
                        }
                    }
                    else {
                        console.log(this.hayatributo);
                    }
                }
            }
            else {
                for (var i = 0; i < this.contenido.length; i++) {
                    this.getEtiqueta(this.contenido[i], indice.id);
                    if (this.etiqueta != tope) {
                        this.hijos.push(this.contenido[i]);
                    }
                }
            }
        }
        return this.hijos;
    };
    ConsultasTS.prototype.newEntorno = function (Contenido, nombre) {
        var _this = this;
        if (Contenido.length != undefined && Contenido != null) {
            Contenido.forEach(function (element) {
                if (element.nombreInit != undefined) {
                    if (element.nombreInit == nombre) {
                        if (element.elementos != null) {
                            _this.contenido.push(element);
                        }
                        else {
                            _this.contenido.push(element);
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
                        this.contenido.push(Contenido);
                    }
                    else {
                        this.contenido.push(Contenido);
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
                        this.contenido.push(Contenido);
                    }
                    else {
                        this.contenido.push(Contenido);
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
        return this.contenido;
    };
    ConsultasTS.prototype.getText = function (padre) {
        var texto = "";
        padre.forEach(function (element) {
            texto += "\n" + element.texto;
        });
        return texto;
    };
    ConsultasTS.prototype.recorrerElementos = function (Contenido) {
        if (Contenido.lista != undefined) {
            for (var i = 0; i < Contenido.lista.length; i++) {
                this.recorrerElementos(Contenido.lista[i]);
            }
        }
        else {
            this.texto += "\n" + Contenido.texto;
        }
    };
    ConsultasTS.prototype.getNode = function (padre) {
        var _this = this;
        this.texto = "";
        padre.forEach(function (element) {
            _this.recorrerElementos(element.elementos);
        });
        return this.texto;
    };
    ConsultasTS.prototype.getEtiqueta = function (padre, etiqueta) {
        if (padre.lista != undefined) {
            for (var i = 0; i < padre.lista.length; i++) {
                this.getEtiqueta(padre.lista[i], etiqueta);
            }
        }
        else {
            if (padre.elementos != undefined) {
                this.getEtiqueta(padre.elementos, etiqueta);
            }
            else {
                if (padre.nombreInit == etiqueta) {
                    var n = String(padre.texto);
                    var numero = n.replace(" ", "");
                    this.etiqueta = Number(numero);
                }
            }
        }
    };
    return ConsultasTS;
}());
exports.ConsultasTS = ConsultasTS;
