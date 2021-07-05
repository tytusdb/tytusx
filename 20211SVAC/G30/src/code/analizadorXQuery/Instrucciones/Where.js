"use strict";
exports.__esModule = true;
exports.Where = void 0;
var Simbolo_1 = require("../AST/Simbolo");
var Tipo_1 = require("../AST/Tipo");
var parse = require('../../analizadorXPath/Xpath').parse;
var grammar = require('../../analizadorXML/grammar');
var Where = /** @class */ (function () {
    function Where(linea, columna, arreglo, identificador) {
        this.errores = [];
        this.linea = linea;
        this.columna = columna;
        this.arreglo = arreglo; //['biblioteca','price>30']
        this.identificador = identificador; //libreria
        this.consulta = ''; //' '
    }
    Where.prototype.ejecutar = function (ent) {
        if (ent.existeEnActual(this.identificador)) {
            var output = [];
            //creando la consulta
            this.consulta = this.CrearConsulta();
            //se analiza el where_path
            var parserXPath = new parse(this.consulta);
            //valor de la tabla de simbolos
            var data = ent.getSimbolo(this.identificador).valor;
            //recorrer objetos
            data.forEach(function (dato) {
                //se ejecuta el path
                var resultado_xpath = parserXPath.Ejecutar(dato);
                //se analiza y se ejecuta la nueva salida
                var resultado_xml = grammar.parse(resultado_xpath);
                if (resultado_xml.datos.hijos.length > 0) {
                    var root = {
                        atributos: data.atributos,
                        columna: data.columna,
                        hijos: [resultado_xml.datos.hijos[0]],
                        linea: data.linea,
                        posicionStack: data.posicionStack,
                        texto: '',
                        tipo: '/'
                    };
                    output.push(root);
                }
            });
            //creando nuevo simbolo
            var new_simbol = new Simbolo_1.Simbolo(this.identificador, Tipo_1.Tipo.OBJETO, this.linea, this.columna, output);
            //se agrega el simbolo al entorno
            ent.reemplazar(this.identificador, new_simbol);
        }
        else {
            console.log('La variable en cuestion no existe, error semantico..');
            this.errores.push({
                Tipo: 'Sintáctico',
                Fila: this.linea,
                Columna: this.columna,
                Description: 'No existe la variable ' + this.identificador + ' en el entorno actual'
            });
            var err = this.GetErrorStorage();
            this.errores = this.errores.concat(err);
            this.SetStorage(this.errores);
        }
    };
    Where.prototype.CrearConsulta = function () {
        var consulta = '/' + this.identificador;
        var predicate = this.arreglo.pop();
        this.arreglo.forEach(function (arr) {
            consulta += '/' + arr;
        });
        consulta += '[' + predicate + ']';
        return consulta;
    };
    //obtener contador
    Where.prototype.GetErrorStorage = function () {
        var data = localStorage.getItem('errores_xquery');
        return JSON.parse(data);
    };
    //actualizar contador
    Where.prototype.SetStorage = function (error) {
        localStorage.setItem('errores_xquery', JSON.stringify(error));
    };
    return Where;
}());
exports.Where = Where;
