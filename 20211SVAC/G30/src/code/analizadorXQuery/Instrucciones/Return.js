"use strict";
exports.__esModule = true;
exports.Return = void 0;
var parse = require('../../analizadorXPath/Xpath').parse;
var grammar = require('../../analizadorXML/grammar');
var Return = /** @class */ (function () {
    function Return(linea, columna, valor, path) {
        this.errores = [];
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
        this.path = path;
    }
    Return.prototype.ejecutar = function (ent) {
        var resultado = '';
        //se hace la consulta a la tabla de simbolos
        if (this.path == '') {
            var valor = this.valor.getValorImplicito(ent);
            return valor;
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
                this.errores.push({
                    Tipo: 'Sintáctico',
                    Fila: this.linea,
                    Columna: this.columna,
                    Description: 'No existe la variable ' + this.path + ' en el entorno actual'
                });
                var err = this.GetErrorStorage();
                this.errores = this.errores.concat(err);
                this.SetStorage(this.errores);
            }
        }
        this.valor = resultado;
        return resultado;
    };
    Return.prototype.VariableC3D = function (ent) {
        try {
            var variable;
            var valor = this.valor.getValorImplicito(ent);
            if (typeof (valor) == 'object')
                valor = String(valor);
            if (typeof (valor) == 'number') {
                variable = [valor];
            }
            else if (typeof (valor) == 'string') {
                var val_temp = [];
                /*  for (let val of valor) {
                     val_temp.push(val.charCodeAt(0));
                 } */
                for (var i = 0; i < valor.length; i++) {
                    val_temp.push(valor[i].charCodeAt(0));
                }
                variable = val_temp;
            }
            return variable;
        }
        catch (error) {
            var variable;
            var valor = this.valor;
            if (typeof (valor) == 'object')
                valor = String(valor);
            if (typeof (valor) == 'number') {
                variable = [valor];
            }
            else if (typeof (valor) == 'string') {
                var val_temp = [];
                for (var i = 0; i < valor.length; i++) {
                    val_temp.push(valor[i].charCodeAt(0));
                }
                variable = val_temp;
            }
            return variable;
        }
    };
    //obtener contador
    Return.prototype.GetErrorStorage = function () {
        var data = localStorage.getItem('errores_xquery');
        return JSON.parse(data);
    };
    //actualizar contador
    Return.prototype.SetStorage = function (error) {
        localStorage.setItem('errores_xquery', JSON.stringify(error));
    };
    return Return;
}());
exports.Return = Return;
