"use strict";
exports.__esModule = true;
exports.IteradorFor = void 0;
var ExpresionXQ_1 = require("../Arbol/ExpresionXQ");
var TipoXQ_1 = require("../Entorno/TipoXQ");
var LiteralXQ_1 = require("../Expresiones/LiteralXQ");
var IteradorFor = /** @class */ (function () {
    function IteradorFor(v, n, o) {
        this.variable = v;
        this.numerico = n;
        this.objetivo = o;
    }
    IteradorFor.prototype.validar = function (ent) {
        if (this.objetivo != null && this.variable != null) {
            if (this.objetivo instanceof LiteralXQ_1.LiteralXQ && this.objetivo.valor.errores.length == 0) {
                return true;
            }
            else if (Array.isArray(this.objetivo)) {
                if (this.objetivo[0] == '@TO@') {
                    this.objetivo.shift();
                    //Es del tipo to y se debe de hacer la secuencia :v
                    var salida = [];
                    var inicio = this.objetivo[0].getValor(ent);
                    var fin = this.objetivo[1].getValor(ent);
                    if ((inicio.tipo.tipo == fin.tipo.tipo) && inicio.tipo.tipo == TipoXQ_1.EnumTipo.entero) {
                        for (var ind = parseInt(inicio.valor); ind <= parseInt(fin.valor); ind++) {
                            salida.push(new LiteralXQ_1.LiteralXQ(inicio.tipo, ind.toString(), inicio.linea, inicio.columna));
                        }
                    }
                    else {
                        return false;
                    }
                    this.objetivo = new LiteralXQ_1.LiteralXQ(new TipoXQ_1.TipoXQ(TipoXQ_1.EnumTipo.sequence), salida, -1, -1);
                    return true;
                }
                else {
                    var salida2 = [];
                    var tipoInicial = null;
                    for (var _i = 0, _a = this.objetivo; _i < _a.length; _i++) {
                        var ele = _a[_i];
                        if (ele instanceof ExpresionXQ_1.ExpresionXQ) {
                            var res = ele.getValor(ent);
                            if (tipoInicial == null) {
                                //Solo verificar que no sea error
                                if (res.tipo.tipo != TipoXQ_1.EnumTipo.error) {
                                    tipoInicial = res.tipo.tipo;
                                    salida2.push(res);
                                    continue;
                                }
                                else {
                                    return false;
                                }
                            }
                            else {
                                if (res.tipo.tipo == tipoInicial) {
                                    salida2.push(res);
                                }
                                else {
                                    return false;
                                }
                            }
                        }
                        else {
                            return false;
                        }
                    }
                    this.objetivo = new LiteralXQ_1.LiteralXQ(new TipoXQ_1.TipoXQ(TipoXQ_1.EnumTipo.sequence), salida2, -1, -1);
                    return true;
                }
            }
        }
        else {
            return false;
        }
    };
    return IteradorFor;
}());
exports.IteradorFor = IteradorFor;
