"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoOperacion = exports.Operacion = void 0;
const Entorno_1 = require("../AST/Entorno");
const Tipo_1 = require("../AST/Tipo");
const Primitiva_1 = require("./Primitiva");
const ListaError_1 = __importDefault(require("../Global/ListaError"));
class Operacion {
    constructor(operacion, op_izq, op_der, linea, columna, isXQuery) {
        this.linea = linea;
        this.isXQuery = isXQuery;
        this.columna = columna;
        this.op_izq = op_izq;
        this.op_der = op_der;
        this.operacion = operacion;
    }
    getTipo(ent) {
        return this.tipo;
    }
    getValorInicial(ent) {
        return "";
    }
    getValor(entorno) {
        if (this.operacion === TipoOperacion.PAR) {
            //Devolver la expresion del parentesis
            let res = this.op_izq.getValor(entorno);
            this.tipo = this.op_izq.getTipo(entorno);
            return res;
        }
        let opIzq;
        let opDer;
        let resultado;
        let valIzq;
        let typeIzq;
        let valDer;
        let typeDer;
        if (this.op_izq.getTipo(entorno) != Primitiva_1.TipoPrim.ATRIBUTO && this.op_izq.getTipo(entorno) != Primitiva_1.TipoPrim.CONSULTA) {
            valIzq = this.op_izq.getValor(entorno);
        }
        typeIzq = this.op_izq.getTipo(entorno);
        if (this.op_der.getTipo(entorno) != Primitiva_1.TipoPrim.ATRIBUTO) {
            valDer = this.op_der.getValor(entorno);
        }
        typeDer = this.op_der.getTipo(entorno);
        if (valIzq === null) {
            if (this.op_izq.getValorInicial(entorno) === entorno.nombre) {
                valIzq = entorno.obtenerSimbolo(this.op_izq.getValorInicial(entorno));
            }
            else {
                return;
            }
        }
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
                                break;
                            case Primitiva_1.TipoPrim.DOUBLE:
                                break;
                            case Primitiva_1.TipoPrim.FUNCION:
                                //Ver si es position()
                                this.tipo = Primitiva_1.TipoPrim.FUNCION;
                                if (valDer.toLowerCase() == "position()") {
                                    // ej: 3 > position()
                                    let izq = parseInt(valIzq);
                                    //Devolver los entornos que abarcan esto.
                                    let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;
                                    padre.tsimbolos.forEach((e) => {
                                        let elem = e.valor;
                                        if (izq > indice && elem.getNombre() === entorno.nombre) {
                                            //Si es mayor, meter al array de entornos.
                                            entTemporal.agregarSimbolo(elem.getNombre(), elem);
                                        }
                                        if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA && elem.getNombre() === entorno.nombre) {
                                            indice++;
                                        }
                                    });
                                    return entTemporal;
                                }
                                else {
                                    ListaError_1.default.agregarError('semantico', 'No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                                    return ('Error semantico: No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con '
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                                }
                            case Primitiva_1.TipoPrim.IDENTIFIER:
                                this.tipo = Primitiva_1.TipoPrim.FUNCION;
                                return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.MAYORQUE, Primitiva_1.TipoPrim.INTEGER);
                            default:
                                break;
                        }
                        break;
                    case Primitiva_1.TipoPrim.DOUBLE:
                        switch (typeIzq) {
                            case Primitiva_1.TipoPrim.IDENTIFIER:
                                this.tipo = Primitiva_1.TipoPrim.FUNCION;
                                return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.MAYORQUE, Primitiva_1.TipoPrim.DOUBLE);
                            default:
                                break;
                        }
                    case Primitiva_1.TipoPrim.CADENA:
                        break;
                    case Primitiva_1.TipoPrim.ATRIBUTO:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.CADENA:
                                return this.resolverOperacionAtributoCadena(entorno, TipoOperacion.MAYORQUE);
                        }
                        break;
                    case Primitiva_1.TipoPrim.FUNCION:
                        //Ver si es position()
                        this.tipo = Primitiva_1.TipoPrim.FUNCION;
                        if (valIzq.toLowerCase() == "position()") {
                            switch (typeDer) {
                                case Primitiva_1.TipoPrim.INTEGER:
                                    //position > 3
                                    let der = parseInt(valDer);
                                    //Devolver un entorno con los simbolos encontrados
                                    let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;
                                    padre.tsimbolos.forEach((e) => {
                                        let elem = e.valor;
                                        if (indice > der && elem.getNombre() == entorno.nombre) {
                                            //Si es mayor, meter al array de entornos.
                                            entTemporal.agregarSimbolo(elem.getNombre(), elem);
                                        }
                                        if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA && elem.getNombre() == entorno.nombre) {
                                            indice++;
                                        }
                                    });
                                    return entTemporal;
                                default:
                                    ListaError_1.default.agregarError('semantico', 'No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                                    return ('Error semantico: No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con '
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                            }
                        }
                        else {
                            ListaError_1.default.agregarError('semantico', 'No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                            return ('Error semantico: No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con '
                                + this.getStringTipo(typeDer)
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case Primitiva_1.TipoPrim.IDENTIFIER:
                        this.tipo = Primitiva_1.TipoPrim.FUNCION;
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.MAYORQUE, Primitiva_1.TipoPrim.INTEGER);
                            case Primitiva_1.TipoPrim.DOUBLE:
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.MAYORQUE, Primitiva_1.TipoPrim.DOUBLE);
                            case Primitiva_1.TipoPrim.CADENA:
                                return this.resolverOperacionIdCadena(valIzq, valDer, entorno, TipoOperacion.MAYORQUE);
                            case Primitiva_1.TipoPrim.IDENTIFIER:
                                break;
                        }
                        break;
                    default:
                        break;
                }
                break;
            case TipoOperacion.MENORQUE:
                switch (typeIzq) {
                    case Primitiva_1.TipoPrim.INTEGER:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                                break;
                            case Primitiva_1.TipoPrim.DOUBLE:
                                break;
                            case Primitiva_1.TipoPrim.FUNCION:
                                //Ver si es position()
                                this.tipo = Primitiva_1.TipoPrim.FUNCION;
                                if (valDer.toLowerCase() == "position()") {
                                    //Ejemplo: 3 < position()
                                    let izq = parseInt(valIzq);
                                    //Devolver los entornos que abarcan esto.
                                    let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;
                                    padre.tsimbolos.forEach((e) => {
                                        let elem = e.valor;
                                        if (izq < indice && elem.getNombre() == entorno.nombre) {
                                            //Si es menor, meter al array de entornos.
                                            entTemporal.agregarSimbolo(entorno.nombre, elem);
                                        }
                                        if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA && elem.getNombre() === entorno.nombre) {
                                            indice++;
                                        }
                                    });
                                    return entTemporal;
                                }
                                else {
                                    ListaError_1.default.agregarError('semantico', 'No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                                    return ('Error semantico: No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con '
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                                }
                            case Primitiva_1.TipoPrim.IDENTIFIER:
                                this.tipo = Primitiva_1.TipoPrim.FUNCION;
                                return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.MENORQUE, Primitiva_1.TipoPrim.INTEGER);
                            default:
                                break;
                        }
                        break;
                    case Primitiva_1.TipoPrim.DOUBLE:
                        switch (typeIzq) {
                            case Primitiva_1.TipoPrim.IDENTIFIER:
                                this.tipo = Primitiva_1.TipoPrim.FUNCION;
                                return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.MENORQUE, Primitiva_1.TipoPrim.DOUBLE);
                            default:
                                break;
                        }
                    case Primitiva_1.TipoPrim.CADENA:
                        break;
                    case Primitiva_1.TipoPrim.ATRIBUTO:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.CADENA:
                                return this.resolverOperacionAtributoCadena(entorno, TipoOperacion.MENORQUE);
                        }
                        break;
                    case Primitiva_1.TipoPrim.FUNCION:
                        //Ver si es position()
                        this.tipo = Primitiva_1.TipoPrim.FUNCION;
                        if (valIzq.toLowerCase() == "position()") {
                            switch (typeDer) {
                                case Primitiva_1.TipoPrim.INTEGER:
                                    //Ej: position() < 3
                                    let der = parseInt(valDer);
                                    //En un entorno temporal, devolver los que corresponden a la busqueda
                                    let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;
                                    padre.tsimbolos.forEach((e) => {
                                        let elem = e.valor;
                                        if (indice < der && elem.getNombre() === entorno.nombre) {
                                            //Si es menor, meter al array de entornos.
                                            entTemporal.agregarSimbolo(entorno.nombre, elem);
                                        }
                                        if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA && elem.getNombre() === entorno.nombre) {
                                            indice++;
                                        }
                                    });
                                    return entTemporal;
                                default:
                                    ListaError_1.default.agregarError('semantico', 'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                                    return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con '
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                            }
                        }
                        break;
                    case Primitiva_1.TipoPrim.IDENTIFIER:
                        this.tipo = Primitiva_1.TipoPrim.FUNCION;
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.MENORQUE, Primitiva_1.TipoPrim.INTEGER);
                            case Primitiva_1.TipoPrim.DOUBLE:
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.MENORQUE, Primitiva_1.TipoPrim.DOUBLE);
                            case Primitiva_1.TipoPrim.CADENA:
                                return this.resolverOperacionIdCadena(valIzq, valDer, entorno, TipoOperacion.MENORQUE);
                            case Primitiva_1.TipoPrim.IDENTIFIER:
                                break;
                        }
                    default:
                        break;
                }
                break;
            case TipoOperacion.MAYORIGUALQUE:
                switch (typeIzq) {
                    case Primitiva_1.TipoPrim.INTEGER:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                                break;
                            case Primitiva_1.TipoPrim.DOUBLE:
                                break;
                            case Primitiva_1.TipoPrim.FUNCION:
                                //Ver si es position()
                                this.tipo = Primitiva_1.TipoPrim.FUNCION;
                                if (valDer.toLowerCase() == "position()") {
                                    //Ejemplo: 3 >= position()
                                    let izq = parseInt(valIzq);
                                    //Devolver los entornos que abarcan esto.
                                    let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;
                                    padre.tsimbolos.forEach((e) => {
                                        let elem = e.valor;
                                        if (izq >= indice && elem.getNombre() == entorno.nombre) {
                                            //Si es menor, meter al array de entornos.
                                            entTemporal.agregarSimbolo(entorno.nombre, elem);
                                        }
                                        if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA && elem.getNombre() === entorno.nombre) {
                                            indice++;
                                        }
                                    });
                                    return entTemporal;
                                }
                                else {
                                    ListaError_1.default.agregarError('semantico', 'No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                                    return ('Error semantico: No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con '
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                                }
                            case Primitiva_1.TipoPrim.IDENTIFIER:
                                this.tipo = Primitiva_1.TipoPrim.FUNCION;
                                return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.MAYORIGUALQUE, Primitiva_1.TipoPrim.INTEGER);
                            default:
                                break;
                        }
                        break;
                    case Primitiva_1.TipoPrim.DOUBLE:
                        switch (typeIzq) {
                            case Primitiva_1.TipoPrim.IDENTIFIER:
                                this.tipo = Primitiva_1.TipoPrim.FUNCION;
                                return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.MAYORIGUALQUE, Primitiva_1.TipoPrim.DOUBLE);
                            default:
                                break;
                        }
                    case Primitiva_1.TipoPrim.CADENA:
                        break;
                    case Primitiva_1.TipoPrim.ATRIBUTO:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.CADENA:
                                return this.resolverOperacionAtributoCadena(entorno, TipoOperacion.MAYORIGUALQUE);
                        }
                        break;
                    case Primitiva_1.TipoPrim.FUNCION:
                        //Ver si es position()
                        this.tipo = Primitiva_1.TipoPrim.FUNCION;
                        if (valIzq.toLowerCase() == "position()") {
                            switch (typeDer) {
                                case Primitiva_1.TipoPrim.INTEGER:
                                    //Ej: position() >= 3
                                    let der = parseInt(valDer);
                                    //En un entorno temporal, devolver los que corresponden a la busqueda
                                    let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;
                                    padre.tsimbolos.forEach((e) => {
                                        let elem = e.valor;
                                        if (indice >= der && elem.getNombre() === entorno.nombre) {
                                            //Si es menor, meter al array de entornos.
                                            entTemporal.agregarSimbolo(entorno.nombre, elem);
                                        }
                                        if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA && elem.getNombre() === entorno.nombre) {
                                            indice++;
                                        }
                                    });
                                    return entTemporal;
                                default:
                                    ListaError_1.default.agregarError('semantico', 'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                                    return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con '
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                            }
                        }
                        break;
                    case Primitiva_1.TipoPrim.IDENTIFIER:
                        this.tipo = Primitiva_1.TipoPrim.FUNCION;
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.MAYORIGUALQUE, Primitiva_1.TipoPrim.INTEGER);
                            case Primitiva_1.TipoPrim.DOUBLE:
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.MAYORIGUALQUE, Primitiva_1.TipoPrim.DOUBLE);
                            case Primitiva_1.TipoPrim.CADENA:
                                return this.resolverOperacionIdCadena(valIzq, valDer, entorno, TipoOperacion.MAYORIGUALQUE);
                            case Primitiva_1.TipoPrim.IDENTIFIER:
                                break;
                        }
                    default:
                        break;
                }
                break;
            case TipoOperacion.MENORIGUALQUE:
                switch (typeIzq) {
                    case Primitiva_1.TipoPrim.INTEGER:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                                break;
                            case Primitiva_1.TipoPrim.DOUBLE:
                                break;
                            case Primitiva_1.TipoPrim.FUNCION:
                                //Ver si es position()
                                this.tipo = Primitiva_1.TipoPrim.FUNCION;
                                if (valDer.toLowerCase() == "position()") {
                                    //Ejemplo: 3 < position()
                                    let izq = parseInt(valIzq);
                                    //Devolver los entornos que abarcan esto.
                                    let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;
                                    padre.tsimbolos.forEach((e) => {
                                        let elem = e.valor;
                                        if (izq <= indice && elem.getNombre() == entorno.nombre) {
                                            //Si es menor, meter al array de entornos.
                                            entTemporal.agregarSimbolo(entorno.nombre, elem);
                                        }
                                        if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA && elem.getNombre() === entorno.nombre) {
                                            indice++;
                                        }
                                    });
                                    return entTemporal;
                                }
                                else {
                                    ListaError_1.default.agregarError('semantico', 'No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                                    return ('Error semantico: No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con '
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                                }
                            case Primitiva_1.TipoPrim.IDENTIFIER:
                                this.tipo = Primitiva_1.TipoPrim.FUNCION;
                                return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.MENORIGUALQUE, Primitiva_1.TipoPrim.INTEGER);
                            default:
                                break;
                        }
                        break;
                    case Primitiva_1.TipoPrim.DOUBLE:
                        switch (typeIzq) {
                            case Primitiva_1.TipoPrim.IDENTIFIER:
                                this.tipo = Primitiva_1.TipoPrim.FUNCION;
                                return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.MENORIGUALQUE, Primitiva_1.TipoPrim.DOUBLE);
                            default:
                                break;
                        }
                    case Primitiva_1.TipoPrim.CADENA:
                        break;
                    case Primitiva_1.TipoPrim.ATRIBUTO:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.CADENA:
                                return this.resolverOperacionAtributoCadena(entorno, TipoOperacion.MENORIGUALQUE);
                        }
                        break;
                    case Primitiva_1.TipoPrim.FUNCION:
                        //Ver si es position()
                        this.tipo = Primitiva_1.TipoPrim.FUNCION;
                        if (valIzq.toLowerCase() == "position()") {
                            switch (typeDer) {
                                case Primitiva_1.TipoPrim.INTEGER:
                                    //Ej: position() < 3
                                    let der = parseInt(valDer);
                                    //En un entorno temporal, devolver los que corresponden a la busqueda
                                    let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;
                                    padre.tsimbolos.forEach((e) => {
                                        let elem = e.valor;
                                        if (indice <= der && elem.getNombre() === entorno.nombre) {
                                            //Si es menor, meter al array de entornos.
                                            entTemporal.agregarSimbolo(entorno.nombre, elem);
                                        }
                                        if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA && elem.getNombre() === entorno.nombre) {
                                            indice++;
                                        }
                                    });
                                    return entTemporal;
                                default:
                                    ListaError_1.default.agregarError('semantico', 'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                                    return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con '
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                            }
                        }
                        break;
                    case Primitiva_1.TipoPrim.IDENTIFIER:
                        this.tipo = Primitiva_1.TipoPrim.FUNCION;
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.MENORIGUALQUE, Primitiva_1.TipoPrim.INTEGER);
                            case Primitiva_1.TipoPrim.DOUBLE:
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.MENORIGUALQUE, Primitiva_1.TipoPrim.DOUBLE);
                            case Primitiva_1.TipoPrim.IDENTIFIER:
                                break;
                        }
                    default:
                        break;
                }
                break;
            case TipoOperacion.IGUAL:
                switch (typeIzq) {
                    case Primitiva_1.TipoPrim.INTEGER:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                                break;
                            case Primitiva_1.TipoPrim.DOUBLE:
                                break;
                            case Primitiva_1.TipoPrim.FUNCION:
                                //Ver si es position()
                                this.tipo = Primitiva_1.TipoPrim.FUNCION;
                                if (valDer.toLowerCase() == "position()") {
                                    //Ejemplo: 3 = position()
                                    let izq = parseInt(valIzq);
                                    //Devolver los entornos que abarcan esto.
                                    let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;
                                    padre.tsimbolos.forEach((e) => {
                                        let elem = e.valor;
                                        if (izq === indice && elem.getNombre() == entorno.nombre) {
                                            //Si es menor, meter al array de entornos.
                                            entTemporal.agregarSimbolo(entorno.nombre, elem);
                                        }
                                        if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA && elem.getNombre() === entorno.nombre) {
                                            indice++;
                                        }
                                    });
                                    return entTemporal;
                                }
                                else {
                                    ListaError_1.default.agregarError('semantico', 'No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                                    return ('Error semantico: No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con '
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                                }
                            case Primitiva_1.TipoPrim.IDENTIFIER:
                                this.tipo = Primitiva_1.TipoPrim.FUNCION;
                                return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.IGUAL, Primitiva_1.TipoPrim.INTEGER);
                            default:
                                break;
                        }
                        break;
                    case Primitiva_1.TipoPrim.DOUBLE:
                        switch (typeIzq) {
                            case Primitiva_1.TipoPrim.IDENTIFIER:
                                this.tipo = Primitiva_1.TipoPrim.FUNCION;
                                return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.IGUAL, Primitiva_1.TipoPrim.DOUBLE);
                            default:
                                break;
                        }
                    case Primitiva_1.TipoPrim.CADENA:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.ATRIBUTO:
                                this.tipo = Primitiva_1.TipoPrim.FUNCION;
                                valIzq = this.op_izq.getValor(entorno);
                                valDer = this.op_der.getValorInicial(entorno);
                                //Esta operacion devuelve un entorno temporan con los elementos encontrados
                                let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
                                //Obtener entorno padre.
                                let padre = entorno.padre;
                                //Con el padre buscar todos las etiquetas que tengan nombre entorno.nombre
                                padre.tsimbolos.forEach((e) => {
                                    let elem = e.valor;
                                    if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA && elem.getNombre() === entorno.nombre) {
                                        //Se encontro, ver si este elemento tiene el atributo
                                        //  que se encuentre en valDer
                                        let flag = false;
                                        elem.valor.tsimbolos.forEach((c2) => {
                                            let tmp = c2.valor;
                                            if (tmp.getTipo() === Tipo_1.Tipo.ATRIBUTO && (valDer === "*" || tmp.getNombre() === valDer)) {
                                                //Por ultimo comparar, si el valor del atributo
                                                //Es igual a la cadena
                                                if (valIzq === tmp.getValor()) {
                                                    //Cadena === valoratributo
                                                    //Se agrega el simbolo. (elem)
                                                    if (!flag) {
                                                        entTemporal.agregarSimbolo(elem.getNombre(), elem);
                                                        flag = true;
                                                    }
                                                }
                                            }
                                        });
                                    }
                                });
                                return entTemporal;
                        }
                        break;
                    case Primitiva_1.TipoPrim.ATRIBUTO:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.CADENA:
                                return this.resolverOperacionAtributoCadena(entorno, TipoOperacion.IGUAL);
                            case Primitiva_1.TipoPrim.ATRIBUTO:
                                //Atributo con Atributo:
                                this.tipo = Primitiva_1.TipoPrim.FUNCION;
                                valDer = this.op_der.getValorInicial(entorno);
                                //ValIzq es el nombre del atributo que se quiere buscar.
                                valIzq = this.op_izq.getValorInicial(entorno);
                                //Esta operacion devuelve un entorno temporan con los elementos encontrados
                                let entTemporalAT = new Entorno_1.Entorno("Temporal", null, null);
                                //Obtener entorno padre.
                                let padreAT = entorno.padre;
                                //Con el padre buscar todos las etiquetas que tengan nombre entorno.nombre
                                padreAT.tsimbolos.forEach((e) => {
                                    let elem = e.valor;
                                    if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA && elem.getNombre() === entorno.nombre) {
                                        //Se encontro, ver si este elemento tiene el atributo
                                        //  que se encuentre en valDer
                                        let flag = false;
                                        elem.valor.tsimbolos.forEach((c2) => {
                                            let tmp = c2.valor;
                                            if (tmp.getTipo() === Tipo_1.Tipo.ATRIBUTO && (valIzq === "*" || tmp.getNombre() === valIzq)) {
                                                //Por ultimo comparar, si el valor del atributo
                                                //Es igual a la cadena
                                                if (valDer === valIzq) {
                                                    //Cadena === valoratributo
                                                    //Se agrega el simbolo. (elem)
                                                    if (!flag) {
                                                        entTemporalAT.agregarSimbolo(elem.getNombre(), elem);
                                                        flag = true;
                                                    }
                                                }
                                            }
                                        });
                                    }
                                });
                                return entTemporalAT;
                        }
                        break;
                    case Primitiva_1.TipoPrim.FUNCION:
                        //Ver si es position()
                        this.tipo = Primitiva_1.TipoPrim.FUNCION;
                        if (valIzq.toLowerCase() == "position()") {
                            switch (typeDer) {
                                case Primitiva_1.TipoPrim.INTEGER:
                                    //Ej: position() < 3
                                    let der = parseInt(valDer);
                                    //En un entorno temporal, devolver los que corresponden a la busqueda
                                    let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;
                                    padre.tsimbolos.forEach((e) => {
                                        let elem = e.valor;
                                        if (indice === der && elem.getNombre() === entorno.nombre) {
                                            //Si son iguales, meter al array de entornos.
                                            entTemporal.agregarSimbolo(entorno.nombre, elem);
                                        }
                                        if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA && elem.getNombre() === entorno.nombre) {
                                            indice++;
                                        }
                                    });
                                    return entTemporal;
                                default:
                                    ListaError_1.default.agregarError('semantico', 'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                                    return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con '
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                            }
                        }
                        break;
                    case Primitiva_1.TipoPrim.IDENTIFIER:
                        this.tipo = Primitiva_1.TipoPrim.FUNCION;
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.IGUAL, Primitiva_1.TipoPrim.INTEGER);
                            case Primitiva_1.TipoPrim.DOUBLE:
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.IGUAL, Primitiva_1.TipoPrim.DOUBLE);
                            case Primitiva_1.TipoPrim.CADENA:
                                return this.resolverOperacionIdCadena(valIzq, valDer, entorno, TipoOperacion.IGUAL);
                            case Primitiva_1.TipoPrim.IDENTIFIER:
                                break;
                        }
                        break;
                    case Primitiva_1.TipoPrim.CONSULTA:
                        //Merge /hola/@hola = "asd" <-- 
                        this.tipo = Primitiva_1.TipoPrim.FUNCION;
                        let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.CADENA:
                                let l = this.op_izq.getValorInicial(entorno);
                                let fromR = l[l.length - 1].isFromRoot();
                                let lastNodeName = l[l.length - 1].getNombre();
                                let entConsultaTemp = this.op_izq.getValor(entorno);
                                entTemporal = this.resolverConsultaRecursiva(entConsultaTemp, valDer, lastNodeName, fromR, TipoOperacion.IGUAL);
                                return entTemporal;
                            default:
                                return null;
                        }
                    default:
                        break;
                }
                break;
            case TipoOperacion.DIFERENTEQUE:
                switch (typeIzq) {
                    case Primitiva_1.TipoPrim.INTEGER:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                                break;
                            case Primitiva_1.TipoPrim.DOUBLE:
                                break;
                            case Primitiva_1.TipoPrim.FUNCION:
                                //Ver si es position()
                                this.tipo = Primitiva_1.TipoPrim.FUNCION;
                                if (valDer.toLowerCase() == "position()") {
                                    //Ejemplo: 3 != position()
                                    let izq = parseInt(valIzq);
                                    //Devolver los entornos que abarcan esto.
                                    let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;
                                    padre.tsimbolos.forEach((e) => {
                                        let elem = e.valor;
                                        if (izq != indice && elem.getNombre() == entorno.nombre) {
                                            //Si es diferente de !=, meter al array de entornos.
                                            entTemporal.agregarSimbolo(entorno.nombre, elem);
                                        }
                                        if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA && elem.getNombre() === entorno.nombre) {
                                            indice++;
                                        }
                                    });
                                    return entTemporal;
                                }
                                else {
                                    ListaError_1.default.agregarError('semantico', 'No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                                    return ('Error semantico: No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con '
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                                }
                            case Primitiva_1.TipoPrim.IDENTIFIER:
                                this.tipo = Primitiva_1.TipoPrim.FUNCION;
                                return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.DIFERENTEQUE, Primitiva_1.TipoPrim.INTEGER);
                            default:
                                break;
                        }
                        break;
                    case Primitiva_1.TipoPrim.DOUBLE:
                        switch (typeIzq) {
                            case Primitiva_1.TipoPrim.IDENTIFIER:
                                this.tipo = Primitiva_1.TipoPrim.FUNCION;
                                return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.DIFERENTEQUE, Primitiva_1.TipoPrim.DOUBLE);
                            default:
                                break;
                        }
                    case Primitiva_1.TipoPrim.CADENA:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.ATRIBUTO:
                                this.tipo = Primitiva_1.TipoPrim.FUNCION;
                                valIzq = this.op_izq.getValor(entorno);
                                valDer = this.op_der.getValorInicial(entorno);
                                //Esta operacion devuelve un entorno temporan con los elementos encontrados
                                let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
                                //Obtener entorno padre.
                                let padre = entorno.padre;
                                //Con el padre buscar todos las etiquetas que tengan nombre entorno.nombre
                                padre.tsimbolos.forEach((e) => {
                                    let elem = e.valor;
                                    if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA && elem.getNombre() === entorno.nombre) {
                                        //Se encontro, ver si este elemento tiene el atributo
                                        //  que se encuentre en valDer
                                        elem.valor.tsimbolos.forEach((c2) => {
                                            let tmp = c2.valor;
                                            if (tmp.getTipo() === Tipo_1.Tipo.ATRIBUTO && (valDer === "*" || tmp.getNombre() === valDer)) {
                                                //Por ultimo comparar, si el valor del atributo
                                                //Es igual a la cadena
                                                if (valIzq != tmp.getValor()) {
                                                    //Cadena === valoratributo
                                                    //Se agrega el simbolo. (elem)
                                                    entTemporal.agregarSimbolo(elem.getNombre(), elem);
                                                }
                                            }
                                        });
                                    }
                                });
                                return entTemporal;
                        }
                        break;
                    case Primitiva_1.TipoPrim.ATRIBUTO:
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.CADENA:
                                return this.resolverOperacionAtributoCadena(entorno, TipoOperacion.DIFERENTEQUE);
                        }
                        break;
                    case Primitiva_1.TipoPrim.FUNCION:
                        //Ver si es position()
                        this.tipo = Primitiva_1.TipoPrim.FUNCION;
                        if (valIzq.toLowerCase() == "position()") {
                            switch (typeDer) {
                                case Primitiva_1.TipoPrim.INTEGER:
                                    //Ej: position() < 3
                                    let der = parseInt(valDer);
                                    //En un entorno temporal, devolver los que corresponden a la busqueda
                                    let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;
                                    padre.tsimbolos.forEach((e) => {
                                        let elem = e.valor;
                                        if (indice != der && elem.getNombre() === entorno.nombre) {
                                            //Si es diferente de , meter al array de entornos.
                                            entTemporal.agregarSimbolo(entorno.nombre, elem);
                                        }
                                        if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA && elem.getNombre() === entorno.nombre) {
                                            indice++;
                                        }
                                    });
                                    return entTemporal;
                                default:
                                    ListaError_1.default.agregarError('semantico', 'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), this.linea, this.columna);
                                    return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con '
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                            }
                        }
                        break;
                    case Primitiva_1.TipoPrim.IDENTIFIER:
                        this.tipo = Primitiva_1.TipoPrim.FUNCION;
                        switch (typeDer) {
                            case Primitiva_1.TipoPrim.INTEGER:
                                if (this.isXQuery != undefined && this.isXQuery) {
                                    return this.XQresolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.DIFERENTEQUE, Primitiva_1.TipoPrim.INTEGER);
                                }
                                else {
                                    return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.DIFERENTEQUE, Primitiva_1.TipoPrim.INTEGER);
                                }
                            case Primitiva_1.TipoPrim.DOUBLE:
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.DIFERENTEQUE, Primitiva_1.TipoPrim.DOUBLE);
                            case Primitiva_1.TipoPrim.CADENA:
                                return this.resolverOperacionIdCadena(valIzq, valDer, entorno, TipoOperacion.DIFERENTEQUE);
                            case Primitiva_1.TipoPrim.IDENTIFIER:
                                break;
                        }
                    default:
                        break;
                }
                break;
            case TipoOperacion.AND:
                break;
            case TipoOperacion.OR:
                break;
        }
    }
    getStringTipo(operadorTipo) {
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
            case Primitiva_1.TipoPrim.BOOLEAN:
                return 'boolean';
            case Primitiva_1.TipoPrim.FUNCION:
                return "Funcion mae";
            case Primitiva_1.TipoPrim.CONSULTA:
                return "Consulta";
            default:
                return "ERROR";
        }
    }
    buscarTexto(elem) {
        for (let i = 0; i < elem.valor.tsimbolos.length; i++) {
            let xd = elem.valor.tsimbolos[i].valor;
            if (xd.getTipo() === Tipo_1.Tipo.STRING) {
                return xd.getValor();
            }
        }
        return null;
    }
    tipoDominanteAritmetica(ex1, ex2) {
        if (ex1 == Primitiva_1.TipoPrim.ERROR || ex2 == Primitiva_1.TipoPrim.ERROR)
            return Primitiva_1.TipoPrim.ERROR;
        if (ex1 == Primitiva_1.TipoPrim.DOUBLE || ex2 == Primitiva_1.TipoPrim.DOUBLE)
            return Primitiva_1.TipoPrim.DOUBLE;
        else if (ex1 == Primitiva_1.TipoPrim.INTEGER || ex2 == Primitiva_1.TipoPrim.INTEGER)
            return Primitiva_1.TipoPrim.INTEGER;
        return Primitiva_1.TipoPrim.ERROR;
    }
    tipoDominanteOperacion(ex1, ex2) {
        if (ex1 == Primitiva_1.TipoPrim.ERROR || ex2 == Primitiva_1.TipoPrim.ERROR)
            return Primitiva_1.TipoPrim.ERROR;
        if (ex1 == Primitiva_1.TipoPrim.DOUBLE || ex2 == Primitiva_1.TipoPrim.DOUBLE)
            return Primitiva_1.TipoPrim.DOUBLE;
        else if (ex1 == Primitiva_1.TipoPrim.INTEGER || ex2 == Primitiva_1.TipoPrim.INTEGER)
            return Primitiva_1.TipoPrim.INTEGER;
        return Primitiva_1.TipoPrim.ERROR;
    }
    XQresolverOperacionIdNumero(valIzq, valDer, entorno, relacional, TipoNumero) {
        let der;
        if (TipoNumero === Primitiva_1.TipoPrim.INTEGER) {
            der = parseInt(valDer);
        }
        else {
            der = parseFloat(valDer);
        }
        let izq = valIzq.getNombre();
        //Devolver un entorno con los simbolos encontrados
        let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
        //1. Obtener entorno padre.
        //2. Sobre el padre, buscar el que tenga nombre entorno.nombre
        entorno.tsimbolos.forEach((e) => {
            let elem = e.valor;
            if (elem.getNombre() === izq) {
                //Buscar el texto de este elemento.
                let texto = this.buscarTexto(elem);
                //Ver si el texto se puede castear a NUMERO
                if (texto != null) {
                    let numCompare = +texto;
                    //Comparar los numeros
                    switch (relacional) {
                        case TipoOperacion.MAYORQUE:
                            if (numCompare > der) {
                                //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }
                            break;
                        case TipoOperacion.MENORQUE:
                            if (numCompare < der) {
                                //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }
                            break;
                        case TipoOperacion.MAYORIGUALQUE:
                            if (numCompare >= der) {
                                //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }
                            break;
                        case TipoOperacion.MENORIGUALQUE:
                            if (numCompare <= der) {
                                //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }
                            break;
                        case TipoOperacion.IGUAL:
                            if (numCompare === der) {
                                //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }
                            break;
                        case TipoOperacion.DIFERENTEQUE:
                            if (numCompare != der) {
                                //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }
                            break;
                    }
                }
            }
        });
        return entTemporal;
    }
    resolverOperacionIdNumero(valIzq, valDer, entorno, relacional, TipoNumero) {
        if (this.isXQuery != undefined && this.isXQuery) {
            return this.XQresolverOperacionIdNumero(valIzq, valDer, entorno, relacional, TipoNumero);
        }
        let der;
        if (TipoNumero === Primitiva_1.TipoPrim.INTEGER) {
            der = parseInt(valDer);
        }
        else {
            der = parseFloat(valDer);
        }
        let izq = valIzq.getNombre();
        //Devolver un entorno con los simbolos encontrados
        let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
        //1. Obtener entorno padre.
        let padre = entorno.padre;
        //2. Sobre el padre, buscar el que tenga nombre entorno.nombre
        padre.tsimbolos.forEach((e) => {
            let elem = e.valor;
            if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA && elem.getNombre() === entorno.nombre) {
                //Se encontro, ahora buscar en los simbolos de este elem
                //si se encuentra el identificador (valIzq)
                elem.valor.tsimbolos.forEach((insd) => {
                    let elin = insd.valor;
                    if (elin.getNombre() === izq) {
                        //Buscar el texto de este elemento.
                        let texto = this.buscarTexto(elin);
                        //Ver si el texto se puede castear a NUMERO
                        if (texto != null) {
                            let numCompare = +texto;
                            //Comparar los numeros
                            switch (relacional) {
                                case TipoOperacion.MAYORQUE:
                                    if (numCompare > der) {
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }
                                    break;
                                case TipoOperacion.MENORQUE:
                                    if (numCompare < der) {
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }
                                    break;
                                case TipoOperacion.MAYORIGUALQUE:
                                    if (numCompare >= der) {
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }
                                    break;
                                case TipoOperacion.MENORIGUALQUE:
                                    if (numCompare <= der) {
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }
                                    break;
                                case TipoOperacion.IGUAL:
                                    if (numCompare === der) {
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }
                                    break;
                                case TipoOperacion.DIFERENTEQUE:
                                    if (numCompare != der) {
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }
                                    break;
                            }
                        }
                    }
                });
            }
        });
        return entTemporal;
    }
    resolverOperacionIdCadena(valIzq, valDer, entorno, relacional) {
        if (this.isXQuery != undefined && this.isXQuery) {
            return this.XQresolverOperacionIdCadena(valIzq, valDer, entorno, relacional);
        }
        let der = valDer;
        let izq = valIzq.getNombre();
        //Devolver un entorno con los simbolos encontrados
        let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
        //1. Obtener entorno padre.
        let padre = entorno.padre;
        //2. Sobre el padre, buscar el que tenga nombre entorno.nombre
        padre.tsimbolos.forEach((e) => {
            let elem = e.valor;
            if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA && elem.getNombre() === entorno.nombre) {
                //Se encontro, ahora buscar en los simbolos de este elem
                //si se encuentra el identificador (valIzq)
                elem.valor.tsimbolos.forEach((insd) => {
                    let elin = insd.valor;
                    if (elin.getNombre() === izq) {
                        //Buscar el texto de este elemento.
                        let texto = this.buscarTexto(elin);
                        der = der.replace("\"", "");
                        if (texto != null) {
                            //Comparar los textos
                            switch (relacional) {
                                case TipoOperacion.MAYORQUE:
                                    if (texto > der) {
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }
                                    break;
                                case TipoOperacion.MENORQUE:
                                    if (texto < der) {
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }
                                    break;
                                case TipoOperacion.MAYORIGUALQUE:
                                    if (texto >= der) {
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }
                                    break;
                                case TipoOperacion.MENORIGUALQUE:
                                    if (texto <= der) {
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }
                                    break;
                                case TipoOperacion.IGUAL:
                                    if (texto === der) {
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }
                                    break;
                                case TipoOperacion.DIFERENTEQUE:
                                    if (texto != der) {
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }
                                    break;
                            }
                        }
                    }
                });
            }
        });
        return entTemporal;
    }
    XQresolverOperacionIdCadena(valIzq, valDer, entorno, relacional) {
        let der = valDer;
        let izq = valIzq.getNombre();
        //Devolver un entorno con los simbolos encontrados
        let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
        entorno.tsimbolos.forEach((e) => {
            let elem = e.valor;
            //si se encuentra el identificador (valIzq)
            if (elem.getNombre() === izq) {
                //Buscar el texto de este elemento.
                let texto = this.buscarTexto(elem);
                der = der.replace("\"", "");
                der = der.replace("\"", "");
                der = der.replace("'", "");
                der = der.replace("\'", "");
                if (texto != null) {
                    //Comparar los textos
                    switch (relacional) {
                        case TipoOperacion.MAYORQUE:
                            if (texto > der) {
                                //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }
                            break;
                        case TipoOperacion.MENORQUE:
                            if (texto < der) {
                                //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }
                            break;
                        case TipoOperacion.MAYORIGUALQUE:
                            if (texto >= der) {
                                //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }
                            break;
                        case TipoOperacion.MENORIGUALQUE:
                            if (texto <= der) {
                                //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }
                            break;
                        case TipoOperacion.IGUAL:
                            if (texto == der) {
                                //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }
                            break;
                        case TipoOperacion.DIFERENTEQUE:
                            if (texto != der) {
                                //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }
                            break;
                    }
                }
            }
        });
        return entTemporal;
    }
    resolverOperacionAtributoCadena(entorno, relacional) {
        this.tipo = Primitiva_1.TipoPrim.FUNCION;
        if (this.isXQuery != undefined && this.isXQuery) {
            return this.XQresolverOperacionAtributoCadena(entorno, relacional);
        }
        let valDer = this.op_der.getValor(entorno);
        //ValIzq es el nombre del atributo que se quiere buscar.
        let valIzq = this.op_izq.getValorInicial(entorno);
        //Esta operacion devuelve un entorno temporan con los elementos encontrados
        let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
        //Obtener entorno padre.
        let padre = entorno.padre;
        //Con el padre buscar todos las etiquetas que tengan nombre entorno.nombre
        padre.tsimbolos.forEach((e) => {
            let elem = e.valor;
            if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA && elem.getNombre() === entorno.nombre) {
                //Se encontro, ver si este elemento tiene el atributo
                //  que se encuentre en valDer
                let flag = false;
                elem.valor.tsimbolos.forEach((c2) => {
                    let tmp = c2.valor;
                    if (tmp.getTipo() === Tipo_1.Tipo.ATRIBUTO && (valIzq === "*" || tmp.getNombre() === valIzq)) {
                        //Por ultimo comparar, si el valor del atributo
                        //Es igual a la cadena
                        switch (relacional) {
                            case TipoOperacion.MAYORQUE:
                                if (valDer > tmp.getValor()) {
                                    //Cadena === valoratributo
                                    //Se agrega el simbolo. (elem)
                                    if (!flag) {
                                        entTemporal.agregarSimbolo(elem.getNombre(), elem);
                                        flag = true;
                                    }
                                }
                                break;
                            case TipoOperacion.MENORQUE:
                                if (valDer < tmp.getValor()) {
                                    //Cadena === valoratributo
                                    //Se agrega el simbolo. (elem)
                                    if (!flag) {
                                        entTemporal.agregarSimbolo(elem.getNombre(), elem);
                                        flag = true;
                                    }
                                }
                                break;
                            case TipoOperacion.MAYORIGUALQUE:
                                if (valDer >= tmp.getValor()) {
                                    //Cadena === valoratributo
                                    //Se agrega el simbolo. (elem)
                                    if (!flag) {
                                        entTemporal.agregarSimbolo(elem.getNombre(), elem);
                                        flag = true;
                                    }
                                }
                                break;
                            case TipoOperacion.MENORIGUALQUE:
                                if (valDer <= tmp.getValor()) {
                                    //Cadena === valoratributo
                                    //Se agrega el simbolo. (elem)
                                    if (!flag) {
                                        entTemporal.agregarSimbolo(elem.getNombre(), elem);
                                        flag = true;
                                    }
                                }
                                break;
                            case TipoOperacion.IGUAL:
                                if (valDer === tmp.getValor()) {
                                    //Cadena === valoratributo
                                    //Se agrega el simbolo. (elem)
                                    if (!flag) {
                                        entTemporal.agregarSimbolo(elem.getNombre(), elem);
                                        flag = true;
                                    }
                                }
                                break;
                            case TipoOperacion.DIFERENTEQUE:
                                if (valDer != tmp.getValor()) {
                                    //Cadena === valoratributo
                                    //Se agrega el simbolo. (elem)
                                    if (!flag) {
                                        entTemporal.agregarSimbolo(elem.getNombre(), elem);
                                        flag = true;
                                    }
                                }
                                break;
                        }
                    }
                });
            }
        });
        return entTemporal;
    }
    XQresolverOperacionAtributoCadena(entorno, relacional) {
        this.tipo = Primitiva_1.TipoPrim.FUNCION;
        //let der: string = valDer;
        let der = this.op_der.getValor(entorno);
        //let izq = valIzq.getNombre()
        let izq = this.op_izq.getValorInicial(entorno);
        //Devolver un entorno con los simbolos encontrados
        let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
        entorno.tsimbolos.forEach((e) => {
            let elem = e.valor;
            //si se encuentra el identificador (valIzq)
            if (elem.getNombre() === izq) {
                //Buscar el texto de este elemento.
                let texto = elem.valor;
                der = der.replace("\"", "");
                der = der.replace("\"", "");
                der = der.replace("'", "");
                der = der.replace("\'", "");
                texto = texto.replace("\"", "");
                texto = texto.replace("\"", "");
                texto = texto.replace("\"", "");
                texto = texto.replace("\"", "");
                switch (relacional) {
                    case TipoOperacion.MAYORQUE:
                        if (texto > der) {
                            //Si lo es, meter al entorno temporal.
                            entTemporal.agregarSimbolo(elem.nombre, elem);
                        }
                        break;
                    case TipoOperacion.MENORQUE:
                        if (texto < der) {
                            //Si lo es, meter al entorno temporal.
                            entTemporal.agregarSimbolo(elem.nombre, elem);
                        }
                        break;
                    case TipoOperacion.MAYORIGUALQUE:
                        if (texto >= der) {
                            //Si lo es, meter al entorno temporal.
                            entTemporal.agregarSimbolo(elem.nombre, elem);
                        }
                        break;
                    case TipoOperacion.MENORIGUALQUE:
                        if (texto <= der) {
                            //Si lo es, meter al entorno temporal.
                            entTemporal.agregarSimbolo(elem.nombre, elem);
                        }
                        break;
                    case TipoOperacion.IGUAL:
                        if (texto === der) {
                            //Si lo es, meter al entorno temporal.
                            entTemporal.agregarSimbolo(elem.nombre, elem);
                        }
                        break;
                    case TipoOperacion.DIFERENTEQUE:
                        if (texto != der) {
                            //Si lo es, meter al entorno temporal.
                            entTemporal.agregarSimbolo(elem.nombre, elem);
                        }
                        break;
                }
            }
        });
        return entTemporal;
    }
    resolverConsultaRecursiva(entConsultaTemp, valDer, lastNodeName, isFromRoot, op) {
        let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
        //Sobre estos ver quienes tienen valDer
        let flag = false;
        entConsultaTemp.tsimbolos.forEach((e) => {
            let elemEnt = e.valor;
            flag = false;
            elemEnt.valor.tsimbolos.forEach((c1) => {
                let elem = c1.valor;
                if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA) {
                    elem.valor.tsimbolos.forEach((c2) => {
                        let elemfinal = c2.valor;
                        if (op === TipoOperacion.IGUAL) {
                            if (elemfinal.getTipo() === Tipo_1.Tipo.ATRIBUTO && (lastNodeName === "*" || elemfinal.getNombre() === lastNodeName) && elemfinal.getValor() === valDer) {
                                if (!flag) {
                                    entTemporal.agregarSimbolo(elemEnt.nombre, elemEnt);
                                    flag = true;
                                }
                            }
                            else if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA && !isFromRoot) {
                                //Buscar recursivamente atributos.
                                let found = this.buscarAtributosRecursivamente(elem, valDer, lastNodeName, op);
                                if (found) {
                                    if (!flag) {
                                        entTemporal.agregarSimbolo(elemEnt.nombre, elemEnt);
                                        flag = true;
                                    }
                                }
                            }
                        }
                        else if (op === TipoOperacion.DIFERENTEQUE) {
                            if (elemfinal.getTipo() === Tipo_1.Tipo.ATRIBUTO && (lastNodeName === "*" || elemfinal.getNombre() === lastNodeName) && elemfinal.getValor() !== valDer) {
                                if (!flag) {
                                    entTemporal.agregarSimbolo(elemEnt.nombre, elemEnt);
                                }
                            }
                            else if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA && !isFromRoot) {
                                //Buscar recursivamente atributos.
                                let found = this.buscarAtributosRecursivamente(elem, valDer, lastNodeName, op);
                                if (found) {
                                    if (!flag) {
                                        entTemporal.agregarSimbolo(elemEnt.nombre, elemEnt);
                                        flag = true;
                                    }
                                }
                            }
                        }
                    });
                }
            });
        });
        return entTemporal;
    }
    buscarAtributosRecursivamente(elem, valDer, lastNodeName, op) {
        for (let i = 0; i < elem.valor.tsimbolos.length; i++) {
            let at = elem.valor.tsimbolos[i].valor;
            if (op === TipoOperacion.IGUAL) {
                if (at.getTipo() === Tipo_1.Tipo.ATRIBUTO && (lastNodeName === "*" || at.getNombre() === lastNodeName) && at.getValor() === valDer) {
                    return true;
                }
                else if (at.getTipo() === Tipo_1.Tipo.ETIQUETA) {
                    //Buscar recursivamente atributos.
                    let found = this.buscarAtributosRecursivamente(at, valDer, lastNodeName, op);
                    if (found) {
                        return true;
                    }
                }
            }
            else if (op === TipoOperacion.DIFERENTEQUE) {
                if (at.getTipo() === Tipo_1.Tipo.ATRIBUTO && (lastNodeName === "*" || at.getNombre() === lastNodeName) && at.getValor() !== valDer) {
                    return true;
                }
                else if (at.getTipo() === Tipo_1.Tipo.ETIQUETA) {
                    //Buscar recursivamente atributos.
                    let found = this.buscarAtributosRecursivamente(at, valDer, lastNodeName, op);
                    if (found) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    resolverOperacionNumeroId(valIzq, valDer, entorno, relacional, TipoNumero) {
        let izq;
        if (TipoNumero === Primitiva_1.TipoPrim.INTEGER) {
            izq = parseInt(valIzq);
        }
        else {
            izq = parseFloat(valIzq);
        }
        let der = valDer.getNombre();
        //Devolver un entorno con los simbolos encontrados
        let entTemporal = new Entorno_1.Entorno("Temporal", null, null);
        //1. Obtener entorno padre.
        let padre = entorno.padre;
        //2. Sobre el padre, buscar el que tenga nombre entorno.nombre
        padre.tsimbolos.forEach((e) => {
            let elem = e.valor;
            if (elem.getTipo() === Tipo_1.Tipo.ETIQUETA && elem.getNombre() === entorno.nombre) {
                //Se encontro, ahora buscar en los simbolos de este elem
                //si se encuentra el identificador (valIzq)
                elem.valor.tsimbolos.forEach((insd) => {
                    let elin = insd.valor;
                    if (elin.getNombre() === der) {
                        //Buscar el texto de este elemento.
                        let texto = this.buscarTexto(elin);
                        //Ver si el texto se puede castear a NUMERO
                        if (texto != null) {
                            let numCompare = +texto;
                            //Comparar los numeros
                            switch (relacional) {
                                case TipoOperacion.MAYORQUE:
                                    if (izq > numCompare) {
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }
                                    break;
                                case TipoOperacion.MENORQUE:
                                    if (izq < numCompare) {
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }
                                    break;
                                case TipoOperacion.MAYORIGUALQUE:
                                    if (izq >= numCompare) {
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }
                                    break;
                                case TipoOperacion.MENORIGUALQUE:
                                    if (izq <= numCompare) {
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }
                                    break;
                                case TipoOperacion.IGUAL:
                                    if (izq === numCompare) {
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }
                                    break;
                                case TipoOperacion.DIFERENTEQUE:
                                    if (izq != numCompare) {
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }
                                    break;
                            }
                        }
                    }
                });
            }
        });
        return entTemporal;
    }
}
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
    TipoOperacion[TipoOperacion["IGUAL"] = 8] = "IGUAL";
    TipoOperacion[TipoOperacion["DIFERENTEQUE"] = 9] = "DIFERENTEQUE";
    TipoOperacion[TipoOperacion["OR"] = 10] = "OR";
    TipoOperacion[TipoOperacion["AND"] = 11] = "AND";
    TipoOperacion[TipoOperacion["NOT"] = 12] = "NOT";
    TipoOperacion[TipoOperacion["MOD"] = 13] = "MOD";
    TipoOperacion[TipoOperacion["PAR"] = 14] = "PAR";
    TipoOperacion[TipoOperacion["XQEQ"] = 15] = "XQEQ";
    TipoOperacion[TipoOperacion["XQGT"] = 16] = "XQGT";
    TipoOperacion[TipoOperacion["XQLT"] = 17] = "XQLT";
    TipoOperacion[TipoOperacion["XQNE"] = 18] = "XQNE";
    TipoOperacion[TipoOperacion["XQLE"] = 19] = "XQLE";
    TipoOperacion[TipoOperacion["XQGE"] = 20] = "XQGE"; // Greather equal then
})(TipoOperacion = exports.TipoOperacion || (exports.TipoOperacion = {}));
