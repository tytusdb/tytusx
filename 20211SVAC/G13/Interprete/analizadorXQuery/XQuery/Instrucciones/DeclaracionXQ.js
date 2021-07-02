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
exports.DeclaracionXQ = void 0;
var InstruccionXQ_1 = require("../Arbol/InstruccionXQ");
var SimboloXQ_1 = require("../Entorno/SimboloXQ");
var TipoXQ_1 = require("../Entorno/TipoXQ");
var DeclaracionXQ = /** @class */ (function (_super) {
    __extends(DeclaracionXQ, _super);
    function DeclaracionXQ(id, v, l, c) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.valor = v;
        _this.linea = l;
        _this.columna = c;
        _this.tipo = v.tipo;
        return _this;
    }
    DeclaracionXQ.prototype.agregarValor = function (v) {
        this.valor = v;
    };
    DeclaracionXQ.prototype.ejecutar = function (ent) {
        if (this.valor != null && this.valor != undefined) {
            var res = this.valor.getValor(ent);
            var sim = void 0;
            switch (this.tipo.tipo) {
                case TipoXQ_1.EnumTipo.entero:
                    if (res.tipo.tipo == TipoXQ_1.EnumTipo.entero) {
                        sim = new SimboloXQ_1.SimboloXQ(this.tipo, res.valor);
                        ent.insertar(this.id, sim, this.linea, this.columna, "La variable");
                    }
                    break;
                case TipoXQ_1.EnumTipo.caracter:
                    if (res.tipo.tipo == TipoXQ_1.EnumTipo.caracter) {
                        sim = new SimboloXQ_1.SimboloXQ(this.tipo, res.valor);
                        ent.insertar(this.id, sim, this.linea, this.columna, "La variable");
                    }
                    break;
                case TipoXQ_1.EnumTipo.booleano:
                    if (res.tipo.tipo == TipoXQ_1.EnumTipo.booleano) {
                        sim = new SimboloXQ_1.SimboloXQ(this.tipo, res.valor);
                        ent.insertar(this.id, sim, this.linea, this.columna, "La variable");
                    }
                    break;
                case TipoXQ_1.EnumTipo.doble:
                    if (res.tipo.tipo == TipoXQ_1.EnumTipo.doble) {
                        sim = new SimboloXQ_1.SimboloXQ(this.tipo, res.valor);
                        ent.insertar(this.id, sim, this.linea, this.columna, "La variable");
                    }
                    break;
                case TipoXQ_1.EnumTipo.cadena:
                    if (res.tipo.tipo == TipoXQ_1.EnumTipo.cadena) {
                        sim = new SimboloXQ_1.SimboloXQ(this.tipo, res.valor);
                        ent.insertar(this.id, sim, this.linea, this.columna, "La variable");
                    }
                    break;
                case TipoXQ_1.EnumTipo.XPath:
                    if (res.tipo.tipo == TipoXQ_1.EnumTipo.XPath) {
                        sim = new SimboloXQ_1.SimboloXQ(this.tipo, res.valor);
                        ent.insertar(this.id, sim, this.linea, this.columna, "La variable");
                    }
                    break;
            }
        }
        else {
            switch (this.tipo.tipo) {
                case TipoXQ_1.EnumTipo.entero:
                    ent.insertar(this.id, new SimboloXQ_1.SimboloXQ(this.tipo, 0), this.linea, this.columna, 'La variable');
                    break;
                case TipoXQ_1.EnumTipo.caracter:
                    ent.insertar(this.id, new SimboloXQ_1.SimboloXQ(this.tipo, '\0'), this.linea, this.columna, 'La variable');
                    break;
                case TipoXQ_1.EnumTipo.booleano:
                    ent.insertar(this.id, new SimboloXQ_1.SimboloXQ(this.tipo, false), this.linea, this.columna, 'La variable');
                    break;
                case TipoXQ_1.EnumTipo.doble:
                    ent.insertar(this.id, new SimboloXQ_1.SimboloXQ(this.tipo, 0.0), this.linea, this.columna, 'La variable');
                    break;
                case TipoXQ_1.EnumTipo.cadena:
                    ent.insertar(this.id, new SimboloXQ_1.SimboloXQ(this.tipo, ""), this.linea, this.columna, 'La variable');
                    break;
                case TipoXQ_1.EnumTipo.XPath:
                    ent.insertar(this.id, new SimboloXQ_1.SimboloXQ(this.tipo, ""), this.linea, this.columna, 'La variable');
                    break;
            }
        }
        return null;
    };
    return DeclaracionXQ;
}(InstruccionXQ_1.InstruccionXQ));
exports.DeclaracionXQ = DeclaracionXQ;
