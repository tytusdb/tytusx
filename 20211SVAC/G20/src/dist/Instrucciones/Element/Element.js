"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Element = exports.Filter = exports.Operation = exports.TypeElement = exports.TypeOperation = void 0;
var TypeOperation;
(function (TypeOperation) {
    TypeOperation[TypeOperation["SUMA"] = 0] = "SUMA";
    TypeOperation[TypeOperation["RESTA"] = 1] = "RESTA";
    TypeOperation[TypeOperation["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    TypeOperation[TypeOperation["DIVISION"] = 3] = "DIVISION";
    TypeOperation[TypeOperation["IGUAL"] = 4] = "IGUAL";
    TypeOperation[TypeOperation["DIFERENTE"] = 5] = "DIFERENTE";
    TypeOperation[TypeOperation["MENOR"] = 6] = "MENOR";
    TypeOperation[TypeOperation["MAYOR"] = 7] = "MAYOR";
    TypeOperation[TypeOperation["MENOR_IGUAL"] = 8] = "MENOR_IGUAL";
    TypeOperation[TypeOperation["MAYOR_IGUAL"] = 9] = "MAYOR_IGUAL";
    TypeOperation[TypeOperation["OR"] = 10] = "OR";
    TypeOperation[TypeOperation["AND"] = 11] = "AND";
    TypeOperation[TypeOperation["MOD"] = 12] = "MOD";
    TypeOperation[TypeOperation["DOUBLE"] = 13] = "DOUBLE";
    TypeOperation[TypeOperation["INTEGER"] = 14] = "INTEGER";
    TypeOperation[TypeOperation["STRING"] = 15] = "STRING";
    TypeOperation[TypeOperation["ID"] = 16] = "ID";
    TypeOperation[TypeOperation["LAST"] = 17] = "LAST";
    TypeOperation[TypeOperation["POSITION"] = 18] = "POSITION";
    TypeOperation[TypeOperation["TEXT"] = 19] = "TEXT";
    TypeOperation[TypeOperation["ATRIBUTO"] = 20] = "ATRIBUTO";
})(TypeOperation = exports.TypeOperation || (exports.TypeOperation = {}));
var TypeElement;
(function (TypeElement) {
    TypeElement[TypeElement["ATRIBUTO"] = 0] = "ATRIBUTO";
    TypeElement[TypeElement["NODO"] = 1] = "NODO";
    TypeElement[TypeElement["ALL"] = 2] = "ALL";
    TypeElement[TypeElement["CURRENT"] = 3] = "CURRENT";
    TypeElement[TypeElement["PARENT"] = 4] = "PARENT";
    TypeElement[TypeElement["ALL_ATRIBTO"] = 5] = "ALL_ATRIBTO";
})(TypeElement = exports.TypeElement || (exports.TypeElement = {}));
class Operation {
    constructor(line, column, type) {
        this.linea = line;
        this.columna = column;
        this.typeOp = type;
    }
    /* OPERACION BINARIA */
    saveBinaryOp(left, right) {
        this.leftOp = left;
        this.rightOp = right;
    }
    /* OPERACION UNARIA */
    saveUnaryOp(left) {
        this.leftOp = left;
    }
    /* OPERACION PRIMITIVA */
    savePrimitiveOp(value) {
        this.value = value;
    }
    ejecutar(ent, arbol) {
        throw new Error('Method not implemented.');
    }
}
exports.Operation = Operation;
class Filter {
    constructor(line, column, name, operation) {
        this.linea = line;
        this.columna = column;
        this.name = name;
        this.operation = operation;
    }
    ejecutar(ent, arbol) {
        throw new Error('Method not implemented.');
    }
}
exports.Filter = Filter;
class Element {
    constructor(name, type, filters, line, column) {
        this.linea = line;
        this.columna = column;
        this.name = name;
        this.type = type;
        this.slashes = 0;
        this.filters = filters;
    }
    ejecutar(ent, arbol) {
        throw new Error('Method not implemented.');
    }
}
exports.Element = Element;
