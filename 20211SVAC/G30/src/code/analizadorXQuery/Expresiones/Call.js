"use strict";
exports.__esModule = true;
exports.Call = void 0;
var Entorno_1 = require("../AST/Entorno");
var Simbolo_1 = require("../AST/Simbolo");
var Tipo_1 = require("../AST/Tipo");
var parse = require('../../analizadorXPath/Xpath').parse;
var grammar = require('../../analizadorXML/grammar');
var Call = /** @class */ (function () {
    function Call(identificador, valores, linea, columna) {
        this.valores = [];
        this.errores = [];
        this.linea = linea;
        this.columna = columna;
        this.valores = valores;
        this.identificador = identificador;
    }
    Call.prototype.getTipo = function (ent) {
        var valor = this.getValorImplicito(ent);
        if (typeof (valor) === 'boolean') {
            return Tipo_1.Tipo.BOOLEAN;
        }
        else if (typeof (valor) === 'string') {
            return Tipo_1.Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo_1.Tipo.INT;
            }
            return Tipo_1.Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo_1.Tipo.NULL;
        }
        return Tipo_1.Tipo.VOID;
    };
    //recibe globa al inicio
    Call.prototype.getValorImplicito = function (ent) {
        //1. buscar funcion en entorno
        if (ent.existe(this.identificador)) {
            var funcion = ent.getSimbolo(this.identificador);
            //2. se crea un entorno nuevo
            var entorno_nuevo = new Entorno_1.Entorno(this.identificador, null); //entorno nuevo llamado 'como se llama la llamada'
            //3. se crean los simbolos con ayuda de la funcion
            var variables = funcion.valor.getVariables();
            if (variables.length == this.valores.length) {
                //se agregan los simbolos al nuevo entorno
                for (var i = 0; i < variables.length; i++) {
                    var valor = this.valores[i].getValorImplicito(ent);
                    //verificando tipos de dato
                    if (variables[i][1] == 'integer')
                        valor = Number(valor);
                    else if (variables[i][1] == 'float')
                        valor = parseFloat(valor);
                    else if (variables[i][1] == 'double')
                        valor = parseFloat(valor);
                    else if (variables[i][1] == 'boolean') {
                        if (valor.toString().toLowerCase() == 'true')
                            valor = true;
                        else if (valor.toString().toLowerCase() == 'false')
                            valor = false;
                    }
                    else
                        valor = valor.toString();
                    var new_simbol = new Simbolo_1.Simbolo(variables[i][0], variables[i][1], this.linea, this.columna, valor);
                    var simb = [];
                    simb = simb.concat(this.GetTablaStorage());
                    simb.push(new_simbol);
                    this.SetTablaStorage(simb);
                    entorno_nuevo.agregar(new_simbol);
                }
                //se agrega la misma funcion al nuevo entorno
                entorno_nuevo.agregar(funcion);
                //se manda a ejecutar la funcion y se envia el nuevo entorno creado
                return funcion.getValorImplicito(entorno_nuevo).ejecutar(entorno_nuevo);
            }
            else {
                console.log('Faltan parametros en la funcion');
                this.errores.push({
                    Tipo: 'Sintáctico',
                    Fila: this.linea,
                    Columna: this.columna,
                    Description: 'Faltan parametros en la funcion ' + this.identificador
                });
                var err = this.GetErrorStorage();
                this.errores = this.errores.concat(err);
                this.SetStorage(this.errores);
            }
        }
        else {
            console.log('Error la funcion no existe..');
            this.errores.push({
                Tipo: 'Sintáctico',
                Fila: this.linea,
                Columna: this.columna,
                Description: 'La función  ' + this.identificador + ' no existe'
            });
            var err = this.GetErrorStorage();
            this.errores = this.errores.concat(err);
            this.SetStorage(this.errores);
        }
        return null;
    };
    Call.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };
    //obtener contador
    Call.prototype.GetErrorStorage = function () {
        var data = localStorage.getItem('errores_xquery');
        return JSON.parse(data);
    };
    //actualizar contador
    Call.prototype.SetStorage = function (error) {
        localStorage.setItem('errores_xquery', JSON.stringify(error));
    };
    //obtener tabla simbolos
    Call.prototype.GetTablaStorage = function () {
        var data = localStorage.getItem('tabla');
        return JSON.parse(data);
    };
    //actualizar contador
    Call.prototype.SetTablaStorage = function (tabla) {
        localStorage.setItem('tabla', JSON.stringify(tabla));
    };
    return Call;
}());
exports.Call = Call;
