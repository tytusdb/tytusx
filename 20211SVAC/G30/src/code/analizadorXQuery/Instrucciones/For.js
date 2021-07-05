"use strict";
exports.__esModule = true;
exports.For = void 0;
var Simbolo_1 = require("../AST/Simbolo");
var Tipo_1 = require("../AST/Tipo");
var parse = require('../../analizadorXPath/Xpath').parse;
var grammar = require('../../analizadorXML/grammar');
var For = /** @class */ (function () {
    function For(linea, columna, path, identificador) {
        this.errores = [];
        this.linea = linea;
        this.columna = columna;
        this.path = path;
        this.identificador = identificador;
    }
    For.prototype.ejecutar = function (ent) {
        if (typeof this.path == 'string') {
            var output = [];
            //se analiza el path
            var parserXPath = new parse(this.path);
            var data = JSON.parse(localStorage.getItem('XML'));
            //se ejecuta el path
            var resultado_xpath = parserXPath.Ejecutar(data);
            //se analiza y se ejecuta la nueva salida
            var resultado_xml = grammar.parse(resultado_xpath);
            //guardando los hijos como variables
            var hijos = resultado_xml.datos.hijos;
            //seteando el nombre de cada objeto
            for (var _i = 0, hijos_1 = hijos; _i < hijos_1.length; _i++) {
                var hijo = hijos_1[_i];
                hijo.tipo = this.identificador;
                //creando objeto raiz
                var root = {
                    atributos: data.atributos,
                    columna: data.columna,
                    hijos: [hijo],
                    linea: data.linea,
                    posicionStack: data.posicionStack,
                    texto: '',
                    tipo: '/'
                };
                //agregando a la salida
                output.push(root);
            }
            //creamos una variable en la tabla de simbolos del entorno global y le mandamos el objeto como valor  
            var new_simbol = new Simbolo_1.Simbolo(this.identificador, Tipo_1.Tipo.OBJETO, this.linea, this.columna, output);
            var simb = [];
            simb = simb.concat(this.GetTablaStorage());
            simb.push(new_simbol);
            this.SetTablaStorage(simb);
            //se agrega el simbolo al entorno
            ent.agregar(new_simbol);
            //agregando datos al storage
            this.SetStorage(this.path, 'path');
            this.SetStorage(resultado_xml, 'new_xml');
        }
        else {
            var arreglo = [];
            var num1 = this.path[0];
            var num2 = this.path[1];
            if (num1 > num2) {
                this.errores.push({
                    Tipo: 'Sintáctico',
                    Fila: this.linea,
                    Columna: this.columna,
                    Description: 'Los datos de la cadena son invalidos'
                });
                var err = this.GetErrorStorage();
                this.errores = this.errores.concat(err);
                this.SetErrorStorage(this.errores);
                console.log('Cadena invalida');
                return;
            }
            for (var index = num1; index <= num2; index++) {
                arreglo.push(index);
            }
            //creamos una variable en la tabla de simbolos del entorno FLWOR y le mandamos el objeto como valor  
            var new_simbol = new Simbolo_1.Simbolo(this.identificador, Tipo_1.Tipo.OBJETO, this.linea, this.columna, arreglo);
            this.SetTablaStorage(new_simbol);
            //se agrega el simbolo al entorno
            ent.agregar(new_simbol);
        }
    };
    For.prototype.SetStorage = function (data, id) {
        localStorage.setItem(id, JSON.stringify(data));
    };
    For.prototype.GetStorage = function (id) {
        var data = localStorage.getItem(id);
        return JSON.parse(data);
    };
    //obtener contador
    For.prototype.GetErrorStorage = function () {
        var data = localStorage.getItem('errores_xquery');
        return JSON.parse(data);
    };
    //actualizar contador
    For.prototype.SetErrorStorage = function (error) {
        localStorage.setItem('errores_xquery', JSON.stringify(error));
    };
    //actualizar contador
    For.prototype.SetTablaStorage = function (tabla) {
        localStorage.setItem('tabla', JSON.stringify(tabla));
    };
    //obtener tabla simbolos
    For.prototype.GetTablaStorage = function () {
        var data = localStorage.getItem('tabla');
        return JSON.parse(data);
    };
    return For;
}());
exports.For = For;
