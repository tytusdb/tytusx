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
exports.__esModule = true;
exports.LlamadaF = void 0;
var ExpresionXQ_1 = require("../Arbol/ExpresionXQ");
var Entorno_1 = require("../Entorno/Entorno");
var SimboloXQ_1 = require("../Entorno/SimboloXQ");
var TipoXQ_1 = require("../Entorno/TipoXQ");
var LiteralXQ_1 = require("../Expresiones/LiteralXQ");
var ReturnXQ_1 = require("./ReturnXQ");
var localStorage = require('localStorage');
var LlamadaF = /** @class */ (function (_super) {
    __extends(LlamadaF, _super);
    function LlamadaF(n, lp, l, c) {
        var _this = _super.call(this) || this;
        _this.nombre = n;
        _this.listaP = lp;
        _this.linea = l;
        _this.columna = c;
        return _this;
    }
    LlamadaF.prototype.getValor = function (ent) {
        var retorno = new LiteralXQ_1.LiteralXQ(new TipoXQ_1.TipoXQ(TipoXQ_1.EnumTipo.error), "@Error@", this.linea, this.columna);
        var lpar = [];
        this.listaP.forEach(function (par) {
            var pr = par.getValor(ent);
            lpar.push(pr);
        });
        var auxN = "$" + this.nombre;
        lpar.forEach(function (ex) {
            auxN += "_" + ex.tipo.tipo;
        });
        var b = ent.buscar(auxN, this.linea, this.columna, 'La funcion');
        if (b != null) {
            var func = b.valor;
            //Insertar una acceso a la pila
            var cn = parseInt(localStorage.getItem('contador')) + 1;
            localStorage.setItem('contador', cn);
            //console.log('Pila.length = ' + localStorage.getItem('contador'));
            var nuevo = new Entorno_1.EntornoXQ(ent.global);
            for (var i = 0; i < lpar.length; i++) {
                var sim = new SimboloXQ_1.SimboloXQ(lpar[i].tipo, lpar[i].valor);
                nuevo.insertar(func.listaP[i].nombre, sim, this.linea, this.columna, "La variable");
            }
            var reti = func.listaI.ejecutar(nuevo);
            //Se remueve un acceso
            var cn = parseInt(localStorage.getItem('contador')) - 1;
            localStorage.setItem('contador', cn);
            //console.log('Pila.length = ' + localStorage.getItem('contador'));
            if (reti != null) {
                //Existe un return
                if (reti instanceof ReturnXQ_1.ReturnXQ) {
                    var devolver = reti.retorno;
                    if (devolver != null && devolver != undefined) {
                        if (func.tipo.tipo == TipoXQ_1.EnumTipo.tvoid) {
                            console.log('La funcion de tipo void no debe de tener una expresion de retorno');
                            return new LiteralXQ_1.LiteralXQ(new TipoXQ_1.TipoXQ(TipoXQ_1.EnumTipo.tvoid), 'void', this.linea, this.columna);
                        }
                        else {
                            //Aqui se mira lo de los objetos... pero no hay en este lenguaje
                            if (func.tipo.tipo == devolver.tipo.tipo) {
                                console.log('Los retornos estan bien');
                                return devolver;
                            }
                            else {
                                console.log('El tipo de retorno no coincide con el esperado por la funcion' + this.nombre);
                                return retorno;
                            }
                        }
                    }
                    else {
                        if (func.tipo.tipo == TipoXQ_1.EnumTipo.tvoid) {
                            //Esta bien que tenga return pero que no devuelva nada
                            console.log('Esta bien que tenga return pero que no devuelva nada ya que la funcion es de tipo void');
                            return new LiteralXQ_1.LiteralXQ(new TipoXQ_1.TipoXQ(TipoXQ_1.EnumTipo.tvoid), 'void', this.linea, this.columna);
                        }
                        else {
                            console.log('La funcion esperaba un retorno vacio ya que es de tipo void');
                            return retorno;
                        }
                    }
                }
                else {
                    console.log('Se encontro un problema con el retorno de la funcion, lo obtenido no es de tipo retorno');
                    return retorno;
                }
            }
            else {
                //No habia instruccion return
                if (func.tipo.tipo == TipoXQ_1.EnumTipo.tvoid) {
                    //Esta bien que no tenga return
                    console.log('Esta bien que no tenga return ya que la funcion es de tipo void');
                    return new LiteralXQ_1.LiteralXQ(new TipoXQ_1.TipoXQ(TipoXQ_1.EnumTipo.tvoid), 'void', this.linea, this.columna);
                }
                else {
                    console.log('La funcion esperaba una expresion de retorno ya que dicha funcion no es void');
                    return retorno;
                }
            }
        }
        else {
            console.log('No se encotro la funcion :v con ese nombre y parametros');
        }
        return retorno;
    };
    LlamadaF.prototype.copiar = function () {
        return new LlamadaF(this.nombre, this.listaP, this.linea, this.columna);
    };
    return LlamadaF;
}(ExpresionXQ_1.ExpresionXQ));
exports.LlamadaF = LlamadaF;
