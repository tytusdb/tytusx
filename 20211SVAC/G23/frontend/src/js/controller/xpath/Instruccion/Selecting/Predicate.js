"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Predicate = void 0;
var Enum_1 = require("../../../../model/xpath/Enum");
var Expresion_1 = __importDefault(require("../../Expresion/Expresion"));
var Predicate = /** @class */ (function () {
    function Predicate(_predicado, _ambito, _contexto) {
        this.predicado = _predicado;
        this.contexto = _contexto;
        this.ambito = _ambito;
    }
    Object.defineProperty(Predicate.prototype, "setContext", {
        set: function (v) {
            this.contexto = v;
        },
        enumerable: false,
        configurable: true
    });
    Predicate.prototype.filterElements = function (_resultado) {
        var _this = this;
        var expresion;
        var _loop_1 = function (i) {
            var e = this_1.predicado[i]; // En caso de tener varios predicados seguidos
            console.log(e, "Predicado");
            expresion = Expresion_1.default(e.condicion, this_1.ambito, this_1.contexto);
            console.log(expresion, "Expresion predicado");
            if (expresion.error)
                return { value: expresion };
            if (expresion.tipo === Enum_1.Tipos.NUMBER) {
                var index = parseInt(expresion.valor) - 1;
                if (index < 0 || index >= _resultado.length)
                    _resultado = [];
                else
                    _resultado = [_resultado[index]];
            }
            else if (expresion.tipo === Enum_1.Tipos.ATRIBUTOS) {
                var tmp_1 = [];
                this_1.contexto = [];
                _resultado.forEach(function (element) {
                    if (element.attributes)
                        for (var i_1 = 0; i_1 < element.attributes.length; i_1++) {
                            var attribute = element.attributes[i_1];
                            if (expresion.atributo) { // Es una comparación
                                if (expresion.desigualdad) { // (<,<=,>,>=)
                                    if (expresion.atributo == attribute.id && _this.operarDesigualdad(expresion.desigualdad, expresion.condicion, attribute.value)) {
                                        tmp_1.push(element);
                                        _this.contexto.push(element);
                                        break;
                                    }
                                }
                                else if (expresion.exclude) { // (!=)
                                    if (expresion.atributo == attribute.id && expresion.condicion != attribute.value) {
                                        tmp_1.push(element);
                                        _this.contexto.push(element);
                                        break;
                                    }
                                }
                                else if (expresion.atributo == attribute.id && expresion.condicion == attribute.value) { // (==)
                                    tmp_1.push(element);
                                    _this.contexto.push(element);
                                    break;
                                }
                            }
                            else if (expresion.valor == attribute.id || expresion.valor == "*") { // No compara valor, sólo apila
                                tmp_1.push(element);
                                _this.contexto.push(element);
                                break;
                            }
                        }
                });
                _resultado = tmp_1;
                return { value: _resultado };
            }
            else if (expresion.tipo === Enum_1.Tipos.FUNCION_TEXT) {
                this_1.contexto = [];
                for (var i_2 = 0; i_2 < _resultado.length; i_2++) {
                    var element = _resultado[i_2];
                    var text = element.value;
                    if (text) {
                        if (expresion.exclude) {
                            if (text != expresion.condicion) // text() != 'x'
                                this_1.contexto.push(element);
                        }
                        else if (text == expresion.condicion) // text() == 'x'
                            this_1.contexto.push(element);
                    }
                }
                return { value: this_1.contexto };
            }
            else if (expresion.tipo === Enum_1.Tipos.FUNCION_LAST) {
                var index = _resultado.length - 1;
                _resultado = [_resultado[index]];
            }
            else if (expresion.tipo === Enum_1.Tipos.FUNCION_POSITION) {
                return { value: _resultado };
            }
            else if (expresion.tipo === Enum_1.Tipos.RELACIONAL_MENORIGUAL || expresion.tipo === Enum_1.Tipos.RELACIONAL_MENOR) {
                var index = parseInt(expresion.valor) - 1;
                if (index >= _resultado.length)
                    index = _resultado.length - 1;
                var tmp = [];
                for (var i_3 = index; i_3 <= _resultado.length && i_3 >= 0; i_3--) {
                    var element = _resultado[i_3];
                    tmp.push(element);
                }
                _resultado = tmp;
            }
            else if (expresion.tipo === Enum_1.Tipos.RELACIONAL_MAYORIGUAL || expresion.tipo === Enum_1.Tipos.RELACIONAL_MAYOR) {
                var index = parseInt(expresion.valor) - 1;
                if (index >= _resultado.length) {
                    _resultado = [];
                    return { value: _resultado };
                }
                if (index <= 0)
                    index = 0;
                var tmp = [];
                for (var i_4 = index; i_4 < _resultado.length; i_4++) {
                    var element = _resultado[i_4];
                    tmp.push(element);
                }
                _resultado = tmp;
            }
            else if (expresion.tipo === Enum_1.Tipos.ELEMENTOS && expresion.e1 && expresion.e2) {
                var e1 = expresion.e1;
                var e2 = expresion.e2;
                var condition = false;
                var tmp = [];
                for (var i_5 = 0; i_5 < this_1.contexto.length; i_5++) {
                    var element = this_1.contexto[i_5];
                    if (element.attributes) { // Hace match con un atributo
                        for (var j = 0; j < element.attributes.length; j++) {
                            var attribute = element.attributes[j];
                            condition = this_1.verificarDesigualdad(expresion.desigualdad, attribute.id, e1, attribute.value, e2);
                            if (condition) {
                                tmp.push(element);
                                break; // Sale del ciclo de atributos para pasar al siguiente elemento
                            }
                        }
                    }
                    if (element.childs) { // Hace match con algún hijo
                        for (var j = 0; j < element.childs.length; j++) {
                            var child = element.childs[j];
                            condition = this_1.verificarDesigualdad(expresion.desigualdad, child.id_open, e1, child.value, e2);
                            if (condition) {
                                tmp.push(element);
                                break;
                            }
                        }
                    }
                    // Hace match con el elemento
                    condition = this_1.verificarDesigualdad(expresion.desigualdad, element.id_open, e1, element.value, e2);
                    if (condition)
                        tmp.push(element);
                }
                _resultado = tmp;
            }
            else if (expresion.tipo === Enum_1.Tipos.LOGICA_OR || expresion.tipo === Enum_1.Tipos.LOGICA_AND) {
                _resultado = expresion.elementos;
            }
            else if (expresion.tipo === Enum_1.Tipos.EXCLUDE) {
                var index = parseInt(expresion.valor) - 1;
                if (index >= 0 && index < _resultado.length) {
                    var tmp = [];
                    for (var i_6 = 0; i_6 < _resultado.length; i_6++) {
                        var element = _resultado[i_6];
                        if (i_6 != index)
                            tmp.push(element);
                    }
                    _resultado = tmp;
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.predicado.length; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        this.contexto = _resultado;
        return this.contexto;
    };
    Predicate.prototype.filterAttributes = function (_resultado) {
        var _this = this;
        var expresion;
        var _loop_2 = function (i) {
            var e = this_2.predicado[i]; // En caso de tener varios predicados seguidos
            console.log(e, "Predicado");
            expresion = Expresion_1.default(e.condicion, this_2.ambito, this_2.contexto);
            console.log(expresion, "Expresion predicado");
            if (expresion.error)
                return { value: expresion };
            if (expresion.tipo === Enum_1.Tipos.NUMBER) {
                var index = parseInt(expresion.valor) - 1;
                if (index < 0 || index >= _resultado.length)
                    _resultado = [];
                else
                    _resultado = [_resultado[index]];
            }
            else if (expresion.tipo === Enum_1.Tipos.ATRIBUTOS) {
                var tmp_2 = [];
                this_2.contexto = [];
                _resultado.forEach(function (attribute) {
                    if (expresion.atributo) { // Es una comparación
                        if (expresion.desigualdad) { // (<,<=,>,>=)
                            if (expresion.atributo == attribute.id && _this.operarDesigualdad(expresion.desigualdad, expresion.condicion, attribute.value)) {
                                tmp_2.push(attribute);
                            }
                        }
                        else if (expresion.exclude) { // (!=)
                            if (expresion.atributo == attribute.id && expresion.condicion != attribute.value) {
                                tmp_2.push(attribute);
                            }
                        }
                        else if (expresion.atributo == attribute.id && expresion.condicion == attribute.value) { // (==)
                            tmp_2.push(attribute);
                        }
                    }
                    else if (expresion.valor == attribute.id || expresion.valor == "*") { // No compara valor, sólo apila
                        tmp_2.push(attribute);
                    }
                });
                _resultado = tmp_2;
                return { value: _resultado };
            }
            else if (expresion.tipo === Enum_1.Tipos.FUNCION_TEXT) {
                var tmp = [];
                for (var i_7 = 0; i_7 < _resultado.length; i_7++) {
                    var attribute = _resultado[i_7];
                    var text = attribute.value;
                    if (expresion.exclude) {
                        if (text != expresion.condicion) // text() != 'x'
                            tmp.push(attribute);
                    }
                    else if (text == expresion.condicion) // text() == 'x'
                        tmp.push(attribute);
                }
                return { value: tmp };
            }
            else if (expresion.tipo === Enum_1.Tipos.FUNCION_LAST) {
                var index = _resultado.length - 1;
                _resultado = [_resultado[index]];
            }
            else if (expresion.tipo === Enum_1.Tipos.RELACIONAL_MENORIGUAL || expresion.tipo === Enum_1.Tipos.RELACIONAL_MENOR) {
                var index = parseInt(expresion.valor) - 1;
                if (index >= _resultado.length)
                    index = _resultado.length - 1;
                var tmp = [];
                for (var i_8 = index; i_8 <= _resultado.length && i_8 >= 0; i_8--) {
                    var attribute = _resultado[i_8];
                    tmp.push(attribute);
                }
                _resultado = tmp;
            }
            else if (expresion.tipo === Enum_1.Tipos.RELACIONAL_MAYORIGUAL || expresion.tipo === Enum_1.Tipos.RELACIONAL_MAYOR) {
                var index = parseInt(expresion.valor) - 1;
                if (index >= _resultado.length) {
                    _resultado = [];
                    return { value: _resultado };
                }
                if (index <= 0)
                    index = 0;
                var tmp = [];
                for (var i_9 = index; i_9 < _resultado.length; i_9++) {
                    var attribute = _resultado[i_9];
                    tmp.push(attribute);
                }
                _resultado = tmp;
            }
            else if (expresion.tipo === Enum_1.Tipos.ELEMENTOS && expresion.e1 && expresion.e2) {
                var e1 = expresion.e1;
                var e2 = expresion.e2;
                var condition = false;
                var tmp = [];
                for (var i_10 = 0; i_10 < _resultado.length; i_10++) {
                    var attribute = _resultado[i_10]; // Hace match con un atributo
                    condition = this_2.verificarDesigualdad(expresion.desigualdad, attribute.id, e1, attribute.value, e2);
                    if (condition) {
                        tmp.push(attribute);
                    }
                }
                _resultado = tmp;
            }
            else if (expresion.tipo === Enum_1.Tipos.LOGICA_OR || expresion.tipo === Enum_1.Tipos.LOGICA_AND) {
                _resultado = expresion.elementos;
            }
            else if (expresion.tipo === Enum_1.Tipos.EXCLUDE) {
                var index = parseInt(expresion.valor) - 1;
                if (index >= 0 && index < _resultado.length) {
                    var tmp = [];
                    for (var i_11 = 0; i_11 < _resultado.length; i_11++) {
                        var attribute = _resultado[i_11];
                        if (i_11 != index)
                            tmp.push(attribute);
                    }
                    _resultado = tmp;
                }
            }
        };
        var this_2 = this;
        for (var i = 0; i < this.predicado.length; i++) {
            var state_2 = _loop_2(i);
            if (typeof state_2 === "object")
                return state_2.value;
        }
        return _resultado;
    };
    Predicate.prototype.operarDesigualdad = function (_tipo, _condicion, _valor) {
        switch (_tipo) {
            case Enum_1.Tipos.RELACIONAL_MAYOR:
                return _valor > _condicion;
            case Enum_1.Tipos.RELACIONAL_MAYORIGUAL:
                return _valor >= _condicion;
            case Enum_1.Tipos.RELACIONAL_MENOR:
                return _valor < _condicion;
            case Enum_1.Tipos.RELACIONAL_MENORIGUAL:
                return _valor <= _condicion;
            default:
                return false;
        }
    };
    Predicate.prototype.verificarDesigualdad = function (_tipo, v1, e1, v2, e2) {
        switch (_tipo) {
            case Enum_1.Tipos.RELACIONAL_MAYOR:
                return (v1 == e1 && v2 > e2);
            case Enum_1.Tipos.RELACIONAL_MAYORIGUAL:
                return (v1 == e1 && v2 >= e2);
            case Enum_1.Tipos.RELACIONAL_MENOR:
                return (v1 == e1 && v2 < e2);
            case Enum_1.Tipos.RELACIONAL_MENORIGUAL:
                return (v1 == e1 && v2 <= e2);
            case Enum_1.Tipos.RELACIONAL_IGUAL:
                return (v1 == e1 && v2 == e2);
            case Enum_1.Tipos.RELACIONAL_DIFERENTE:
                return (v1 == e1 && v2 != e2);
            default:
                return false;
        }
    };
    return Predicate;
}());
exports.Predicate = Predicate;
