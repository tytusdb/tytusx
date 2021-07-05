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
exports.AsignacionXQ = void 0;
var InstruccionXQ_1 = require("../Arbol/InstruccionXQ");
var TipoXQ_1 = require("../Entorno/TipoXQ");
var AsignacionXQ = /** @class */ (function (_super) {
    __extends(AsignacionXQ, _super);
    function AsignacionXQ(id, l, c, v) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.linea = l;
        _this.columna = c;
        _this.valor = v;
        return _this;
    }
    AsignacionXQ.prototype.ejecutar = function (ent) {
        var sim = ent.buscar(this.id, this.linea, this.columna, 'La variable');
        if (sim != null && sim != undefined) {
            var res = this.valor.getValor(ent);
            switch (sim.tipo.tipo) {
                case TipoXQ_1.EnumTipo.defecto:
                    if (res.tipo.tipo != TipoXQ_1.EnumTipo.error && res.tipo.tipo != TipoXQ_1.EnumTipo.tvoid &&
                        res.tipo.tipo != TipoXQ_1.EnumTipo.nulo && res.tipo.tipo != TipoXQ_1.EnumTipo.defecto &&
                        res.tipo.tipo != TipoXQ_1.EnumTipo.funcion) {
                        sim.tipo = res.tipo;
                        sim.valor = res.valor;
                        return null;
                    }
                    break;
                case TipoXQ_1.EnumTipo.entero:
                    if (res.tipo.tipo == TipoXQ_1.EnumTipo.entero) {
                        sim.valor = res.valor;
                        return null;
                    }
                    break;
                case TipoXQ_1.EnumTipo.doble:
                    if (res.tipo.tipo == TipoXQ_1.EnumTipo.doble) {
                        sim.valor = res.valor;
                        return null;
                    }
                    break;
                case TipoXQ_1.EnumTipo.caracter:
                    if (res.tipo.tipo == TipoXQ_1.EnumTipo.caracter) {
                        sim.valor = res.valor;
                        return null;
                    }
                    break;
                case TipoXQ_1.EnumTipo.cadena:
                    if (res.tipo.tipo == TipoXQ_1.EnumTipo.cadena) {
                        sim.valor = res.valor;
                        return null;
                    }
                    break;
                case TipoXQ_1.EnumTipo.booleano:
                    if (res.tipo.tipo == TipoXQ_1.EnumTipo.booleano) {
                        sim.valor = res.valor;
                        return null;
                    }
                    break;
                case TipoXQ_1.EnumTipo.XPath:
                    if (res.tipo.tipo == TipoXQ_1.EnumTipo.XPath) {
                        //let xmlG = ent.buscar("#XML#", this.linea, this.columna, 'El objeto XML');
                        //var retXP = res.valor.Ejecutar(xmlG.valor);
                        //var st = Entorno.conInicial(retXP);
                        sim.valor = res.valor;
                        return null;
                    }
                    break;
            }
            console.log('Error al asignar tipos a la variable \'' + this.id + '\'');
            //ERRORES
        }
        return null;
    };
    return AsignacionXQ;
}(InstruccionXQ_1.InstruccionXQ));
exports.AsignacionXQ = AsignacionXQ;
