"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoOperacion = exports.Operacion = void 0;
var Primitiva_1 = require("./Primitiva");
var ListaError_1 = __importDefault(require("../Global/ListaError"));
var Operacion = /** @class */ (function () {
    function Operacion(operacion, op_izq, op_der, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.op_izq = op_izq;
        this.op_der = op_der;
        this.operacion = operacion;
    }
    Operacion.prototype.getTipo = function (ent) {
        return this.tipo;
    };
    Operacion.prototype.getValor = function (entorno) {
        var opIzq;
        var opDer;
        var resultado;
        //console.log('IZQ: ' + (this.izq === operador)?'operador':'primitivo');
        //console.log('DER: ' + (this.der === operador)?'operador':'primitivo');
        var aux;
        var valIzq;
        var typeIzq;
        var valDer;
        var typeDer;
        valIzq = this.op_izq.getValor(entorno);
        typeIzq = this.op_izq.getTipo(entorno);
        valDer = this.op_der.getValor(entorno);
        typeDer = this.op_der.getTipo(entorno);
        switch (this.operacion) {
            case TipoOperacion.SUMA:
                this.tipo = this.tipoDominanteAritmetica(typeIzq, typeDer);
                if (this.tipo === Primitiva_1.TipoPrim.ERROR)
                    return resultado;
                switch (typeIzq) {
                    case Primitiva_1.TipoPrim.INTEGER:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                                opIzq = parseInt(valIzq);
                                opDer = parseInt(valDer);
                                resultado = opIzq + opDer;
                                return resultado;
                            case Primitiva_1.TipoPrim.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq + opDer;
                                return resultado;
                            default:
                                ListaError_1.default.agregarError('semantico', 'No se puede sumar ' + this.getStringTipo(typeIzq) + ' con '
                                    + this.getStringTipo(typeDer), this.linea, this.columna);
                                return ('Error semantico: No se puede sumar ' + this.getStringTipo(typeIzq) + ' con '
                                    + this.getStringTipo(typeDer)
                                    + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case Primitiva_1.TipoPrim.DOUBLE:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq + opDer;
                                return resultado;
                            case Primitiva_1.TipoPrim.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq + opDer;
                                return resultado;
                            default:
                                ListaError_1.default.agregarError('semantico', 'No se puede sumar ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                                return ('Error semantico: No se puede sumar ' + this.getStringTipo(typeIzq) + ' con '
                                    + this.getStringTipo(typeDer)
                                    + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default:
                        ListaError_1.default.agregarError('semantico', 'No se puede sumar ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                        return ('Error semantico: No se puede sumar ' + this.getStringTipo(typeIzq) + ' con '
                            + this.getStringTipo(typeDer)
                            + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case TipoOperacion.RESTA:
                this.tipo = this.tipoDominanteAritmetica(typeIzq, typeDer);
                if (this.tipo === Primitiva_1.TipoPrim.ERROR)
                    return resultado;
                switch (typeIzq) {
                    case Primitiva_1.TipoPrim.INTEGER:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                                opIzq = parseInt(valIzq);
                                opDer = parseInt(valDer);
                                resultado = opIzq - opDer;
                                return resultado;
                            case Primitiva_1.TipoPrim.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq - opDer;
                                return resultado;
                            default:
                                ListaError_1.default.agregarError('semantico', 'No se puede restar ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                                return ('Error semantico: No se puede restar ' + this.getStringTipo(typeIzq) + ' con '
                                    + this.getStringTipo(typeDer)
                                    + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case Primitiva_1.TipoPrim.DOUBLE:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq - opDer;
                                return resultado;
                            case Primitiva_1.TipoPrim.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq - opDer;
                                return resultado;
                            default:
                                ListaError_1.default.agregarError('semantico', 'No se puede restar ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                                return ('Error semantico: No se puede restar ' + this.getStringTipo(typeIzq) + ' con '
                                    + this.getStringTipo(typeDer)
                                    + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default:
                        ListaError_1.default.agregarError('semantico', 'No se puede restar ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                        return ('Error semantico: No se puede restar ' + this.getStringTipo(typeIzq) + ' con '
                            + this.getStringTipo(typeDer)
                            + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case TipoOperacion.MULTIPLICACION:
                this.tipo = this.tipoDominanteAritmetica(typeIzq, typeDer);
                if (this.tipo === Primitiva_1.TipoPrim.ERROR)
                    return resultado;
                switch (typeIzq) {
                    case Primitiva_1.TipoPrim.INTEGER:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                                opIzq = parseInt(valIzq);
                                opDer = parseInt(valDer);
                                resultado = opIzq * opDer;
                                return resultado;
                            case Primitiva_1.TipoPrim.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq * opDer;
                                return resultado;
                            default:
                                ListaError_1.default.agregarError('semantico', 'No se puede multiplicar ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                                return ('Error semantico: No se puede multiplicar ' + this.getStringTipo(typeIzq) + ' con '
                                    + this.getStringTipo(typeDer)
                                    + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case Primitiva_1.TipoPrim.DOUBLE:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq * opDer;
                                return resultado;
                            case Primitiva_1.TipoPrim.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq * opDer;
                                return resultado;
                            default:
                                ListaError_1.default.agregarError('semantico', 'No se puede multiplicar ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                                return ('Error semantico: No se puede multiplicar ' + this.getStringTipo(typeIzq) + ' con '
                                    + this.getStringTipo(typeDer)
                                    + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default:
                        ListaError_1.default.agregarError('semantico', 'No se puede multiplicar ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                        return ('Error semantico: No se puede multiplicar ' + this.getStringTipo(typeIzq) + ' con '
                            + this.getStringTipo(typeDer)
                            + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case TipoOperacion.DIVISION:
                this.tipo = this.tipoDominanteAritmetica(typeIzq, typeDer);
                if (this.tipo === Primitiva_1.TipoPrim.ERROR)
                    return resultado;
                switch (typeIzq) {
                    case Primitiva_1.TipoPrim.INTEGER:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                                opIzq = parseInt(valIzq);
                                opDer = parseInt(valDer);
                                if (opDer != 0) {
                                    resultado = opIzq / opDer;
                                    return resultado;
                                }
                                ListaError_1.default.agregarError('semantico', 'El denominador debe ser diferente de 0', this.linea, this.columna);
                                return ('Error semantico: El denominador debe ser diferente de 0 en la linea '
                                    + this.linea + ' y columna ' + this.columna);
                            case Primitiva_1.TipoPrim.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                if (opDer != 0) {
                                    resultado = opIzq / opDer;
                                    return resultado;
                                }
                                ListaError_1.default.agregarError('semantico', 'El denominador debe ser diferente de 0', this.linea, this.columna);
                                return ('Error semantico: El denominador debe ser diferente de 0 en la linea '
                                    + this.linea + ' y columna ' + this.columna);
                            default:
                                ListaError_1.default.agregarError('semantico', 'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                                return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con '
                                    + this.getStringTipo(typeDer)
                                    + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case Primitiva_1.TipoPrim.DOUBLE:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                if (opDer != 0) {
                                    resultado = opIzq / opDer;
                                    return resultado;
                                }
                                ListaError_1.default.agregarError('semantico', 'El denominador debe ser diferente de 0', this.linea, this.columna);
                                return ('Error semantico: El denominador debe ser diferente de 0 en la linea '
                                    + this.linea + ' y columna ' + this.columna);
                            case Primitiva_1.TipoPrim.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                if (opDer != 0) {
                                    resultado = opIzq / opDer;
                                    return resultado;
                                }
                                ListaError_1.default.agregarError('semantico', 'El denominador debe ser diferente de 0', this.linea, this.columna);
                                return ('Error semantico: El denominador debe ser diferente de 0 en la linea '
                                    + this.linea + ' y columna ' + this.columna);
                            default:
                                ListaError_1.default.agregarError('semantico', 'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                                return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con '
                                    + this.getStringTipo(typeDer)
                                    + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default:
                        ListaError_1.default.agregarError('semantico', 'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                        return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con '
                            + this.getStringTipo(typeDer)
                            + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case TipoOperacion.MOD:
                this.tipo = this.tipoDominanteAritmetica(typeIzq, typeDer);
                if (this.tipo === Primitiva_1.TipoPrim.ERROR)
                    return resultado;
                switch (typeIzq) {
                    case Primitiva_1.TipoPrim.INTEGER:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                                opIzq = parseInt(valIzq);
                                opDer = parseInt(valDer);
                                if (opDer != 0) {
                                    resultado = opIzq % opDer;
                                    return resultado;
                                }
                                ListaError_1.default.agregarError('semantico', 'El denominador debe ser diferente de 0', this.linea, this.columna);
                                return ('Error semantico: El denominador debe ser diferente de 0 en la linea '
                                    + this.linea + ' y columna ' + this.columna);
                            case Primitiva_1.TipoPrim.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                if (opDer != 0) {
                                    resultado = opIzq % opDer;
                                    return resultado;
                                }
                                ListaError_1.default.agregarError('semantico', 'El denominador debe ser diferente de 0', this.linea, this.columna);
                                return ('Error semantico: El denominador debe ser diferente de 0 en la linea '
                                    + this.linea + ' y columna ' + this.columna);
                            default:
                                ListaError_1.default.agregarError('semantico', 'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                                return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con '
                                    + this.getStringTipo(typeDer)
                                    + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case Primitiva_1.TipoPrim.DOUBLE:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq + opDer;
                                return resultado;
                            case Primitiva_1.TipoPrim.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq + opDer;
                                return resultado;
                            default:
                                ListaError_1.default.agregarError('semantico', 'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                                return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con '
                                    + this.getStringTipo(typeDer)
                                    + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default:
                        ListaError_1.default.agregarError('semantico', 'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                        return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con '
                            + this.getStringTipo(typeDer)
                            + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case TipoOperacion.MAYORQUE:
                switch (typeIzq) {
                    case Primitiva_1.TipoPrim.INTEGER:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                            case Primitiva_1.TipoPrim.DOUBLE:
                        }
                    case Primitiva_1.TipoPrim.DOUBLE:
                    case Primitiva_1.TipoPrim.CADENA:
                    case Primitiva_1.TipoPrim.ATRIBUTO:
                    case Primitiva_1.TipoPrim.FUNCION:
                    case Primitiva_1.TipoPrim.IDENTIFIER:
                    default:
                }
            case TipoOperacion.MENORQUE:
            case TipoOperacion.MAYORIGUALQUE:
            case TipoOperacion.MENORIGUALQUE:
            case TipoOperacion.IGUALQUE:
            case TipoOperacion.DIFERENTEQUE:
            case TipoOperacion.AND:
            case TipoOperacion.OR:
        }
    };
    Operacion.prototype.getStringTipo = function (operadorTipo) {
        switch (operadorTipo) {
            case Primitiva_1.TipoPrim.INTEGER:
                return 'entero';
            case Primitiva_1.TipoPrim.DOUBLE:
                return 'doble';
            case Primitiva_1.TipoPrim.CADENA:
                return 'cadena';
            case Primitiva_1.TipoPrim.IDENTIFIER:
                return 'id';
            case Primitiva_1.TipoPrim.ATRIBUTO:
                return 'atributo';
            case Primitiva_1.TipoPrim.DOT:
                return 'dot';
        }
        return '';
    };
    Operacion.prototype.tipoDominanteAritmetica = function (ex1, ex2) {
        if (ex1 == Primitiva_1.TipoPrim.ERROR || ex2 == Primitiva_1.TipoPrim.ERROR)
            return Primitiva_1.TipoPrim.ERROR;
        if (ex1 == Primitiva_1.TipoPrim.DOUBLE || ex2 == Primitiva_1.TipoPrim.DOUBLE)
            return Primitiva_1.TipoPrim.DOUBLE;
        else if (ex1 == Primitiva_1.TipoPrim.INTEGER || ex2 == Primitiva_1.TipoPrim.INTEGER)
            return Primitiva_1.TipoPrim.INTEGER;
        return Primitiva_1.TipoPrim.ERROR;
    };
    Operacion.prototype.tipoDominanteOperacion = function (ex1, ex2) {
        if (ex1 == Primitiva_1.TipoPrim.ERROR || ex2 == Primitiva_1.TipoPrim.ERROR)
            return Primitiva_1.TipoPrim.ERROR;
        if (ex1 == Primitiva_1.TipoPrim.DOUBLE || ex2 == Primitiva_1.TipoPrim.DOUBLE)
            return Primitiva_1.TipoPrim.DOUBLE;
        else if (ex1 == Primitiva_1.TipoPrim.INTEGER || ex2 == Primitiva_1.TipoPrim.INTEGER)
            return Primitiva_1.TipoPrim.INTEGER;
        return Primitiva_1.TipoPrim.ERROR;
    };
    return Operacion;
}());
exports.Operacion = Operacion;
var TipoOperacion;
(function (TipoOperacion) {
    TipoOperacion[TipoOperacion["SUMA"] = 0] = "SUMA";
    TipoOperacion[TipoOperacion["RESTA"] = 1] = "RESTA";
    TipoOperacion[TipoOperacion["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    TipoOperacion[TipoOperacion["DIVISION"] = 3] = "DIVISION";
    TipoOperacion[TipoOperacion["MAYORQUE"] = 4] = "MAYORQUE";
    TipoOperacion[TipoOperacion["MENORQUE"] = 5] = "MENORQUE";
    TipoOperacion[TipoOperacion["MAYORIGUALQUE"] = 6] = "MAYORIGUALQUE";
    TipoOperacion[TipoOperacion["MENORIGUALQUE"] = 7] = "MENORIGUALQUE";
    TipoOperacion[TipoOperacion["IGUALQUE"] = 8] = "IGUALQUE";
    TipoOperacion[TipoOperacion["DIFERENTEQUE"] = 9] = "DIFERENTEQUE";
    TipoOperacion[TipoOperacion["OR"] = 10] = "OR";
    TipoOperacion[TipoOperacion["AND"] = 11] = "AND";
    TipoOperacion[TipoOperacion["NOT"] = 12] = "NOT";
    TipoOperacion[TipoOperacion["MOD"] = 13] = "MOD";
    TipoOperacion[TipoOperacion["PAR"] = 14] = "PAR";
})(TipoOperacion = exports.TipoOperacion || (exports.TipoOperacion = {}));
