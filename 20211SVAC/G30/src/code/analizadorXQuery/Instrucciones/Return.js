"use strict";
exports.__esModule = true;
exports.Return = void 0;
var parse = require('../../analizadorXPath/Xpath').parse;
var grammar = require('../../analizadorXML/grammar');
var Return = /** @class */ (function () {
    function Return(linea, columna, valor, path) {
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
        this.path = path;
    }
    Return.prototype.ejecutar = function (ent) {
        var resultado = '';
        //se hace la consulta a la tabla de simbolos
        if (this.path == '') {
            return this.valor.getValorImplicito(ent);
        }
        else {
            var id_temp = this.path.split('/')[1];
            if (ent.existeEnActual(id_temp)) {
                //se analiza el where_path
                var parserXPath = new parse(this.path);
                //valor de la tabla de simbolos
                var simbolo = ent.getSimbolo(id_temp);
                var data = simbolo.valor;
                //VERIFICAMOS EL TIPO DE VARIABLE
                if (simbolo.tipo == 'OBJETO') {
                    //SI ES UN ARREGLO DE NUMEROS ITERA VALORES
                    if (typeof (data[0]) == 'number') {
                        data.forEach(function (dato) {
                            resultado += dato + ' ';
                        });
                        //SI ES UN ARREGLO DE OBJETOS EJECUTA XPATH    
                    }
                    else {
                        //recorrer objetos
                        data.forEach(function (dato) {
                            //se ejecuta el path
                            var resultado_xpath = parserXPath.Ejecutar(dato);
                            //se concatenan los resultados obtenidos
                            resultado += resultado_xpath;
                        });
                    }
                }
                else {
                    resultado += data;
                }
            }
            else {
                console.log('La variable en cuestion no existe, error semantico..');
            }
        }
        return resultado;
    };
    return Return;
}());
exports.Return = Return;
