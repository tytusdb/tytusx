"use strict";
exports.__esModule = true;
exports.Operacion = exports.Operador = void 0;
var Tipo_1 = require("../AST/Tipo");
var Operador;
(function (Operador) {
    Operador[Operador["SUMA"] = 0] = "SUMA";
    Operador[Operador["RESTA"] = 1] = "RESTA";
    Operador[Operador["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    Operador[Operador["DIVISION"] = 3] = "DIVISION";
    Operador[Operador["MODULO"] = 4] = "MODULO";
    Operador[Operador["MAYOR_QUE"] = 5] = "MAYOR_QUE";
    Operador[Operador["MENOR_QUE"] = 6] = "MENOR_QUE";
    Operador[Operador["DIFERENTE_QUE"] = 7] = "DIFERENTE_QUE";
    Operador[Operador["IGUAL_QUE"] = 8] = "IGUAL_QUE";
    Operador[Operador["OR"] = 9] = "OR";
    Operador[Operador["AND"] = 10] = "AND";
    Operador[Operador["NOT"] = 11] = "NOT";
    Operador[Operador["MAYOR_IGUA_QUE"] = 12] = "MAYOR_IGUA_QUE";
    Operador[Operador["MENOR_IGUA_QUE"] = 13] = "MENOR_IGUA_QUE";
    Operador[Operador["DESCONOCIDO"] = 14] = "DESCONOCIDO";
})(Operador = exports.Operador || (exports.Operador = {}));
var Operacion = /** @class */ (function () {
    function Operacion(op_izquierda, op_derecha, operacion, linea, columna) {
        this.errores = [];
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
    }
    Operacion.prototype.getTipo = function (ent) {
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
    Operacion.prototype.getValorImplicito = function (ent) {
        if (this.operador !== Operador.NOT) {
            var op1 = this.op_izquierda.getValorImplicito(ent);
            var op2 = this.op_derecha.getValorImplicito(ent);
            var type1 = typeof (op1);
            var type2 = typeof (op2);
            //suma
            if (this.operador == Operador.SUMA) {
                if (type1 == "number" && type2 == "number") {
                    return op1 + op2;
                }
                else if (type1 == "string" || type2 == "string") {
                    if (op1 == null)
                        op1 = "null";
                    if (op2 == null)
                        op2 = "null";
                    return String(op1) + String(op2);
                }
                else if (type1 == "object" && type2 == "number") {
                    return Number(op1[0]) + op2;
                }
                else if (type1 == "number" && type2 == "object") {
                    return Number(op2[0]) + op1;
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    this.errores.push({
                        Tipo: 'Sintáctico',
                        Fila: this.linea,
                        Columna: this.columna,
                        Description: 'Tipos de dato ' + type1 + ' y ' + type2 + ' incorrectos'
                    });
                    var err = this.GetErrorStorage();
                    this.errores = this.errores.concat(err);
                    this.SetStorage(this.errores);
                    return null;
                }
            }
            //resta
            else if (this.operador == Operador.RESTA) {
                if (type1 == "number" && type2 == "number") {
                    return op1 - op2;
                }
                else if (type1 == "object" && type2 == "number") {
                    return Number(op1[0]) - op2;
                }
                else if (type1 == "number" && type2 == "object") {
                    return op1 - Number(op2[0]);
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    this.errores.push({
                        Tipo: 'Sintáctico',
                        Fila: this.linea,
                        Columna: this.columna,
                        Description: 'Tipos de dato ' + type1 + ' y ' + type2 + ' incorrectos'
                    });
                    var err = this.GetErrorStorage();
                    this.errores = this.errores.concat(err);
                    this.SetStorage(this.errores);
                    return null;
                }
            }
            //multiplicación
            else if (this.operador == Operador.MULTIPLICACION) {
                if (type1 == "number" && type2 == "number") {
                    return op1 * op2;
                }
                else if (type1 == "object" && type2 == "number") {
                    return Number(op1[0]) * op2;
                }
                else if (type1 == "number" && type2 == "object") {
                    return op1 - Number(op2[0]);
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    this.errores.push({
                        Tipo: 'Sintáctico',
                        Fila: this.linea,
                        Columna: this.columna,
                        Description: 'Tipos de dato ' + type1 + ' y ' + type2 + ' incorrectos'
                    });
                    var err = this.GetErrorStorage();
                    this.errores = this.errores.concat(err);
                    this.SetStorage(this.errores);
                    return null;
                }
            }
            //division
            else if (this.operador == Operador.DIVISION) {
                if (type1 == "number" && type2 == "number") {
                    if (op2 === 0) {
                        console.log("Resultado indefinido, no puede ejecutarse operación sobre cero.");
                        this.errores.push({
                            Tipo: 'Sintáctico',
                            Fila: this.linea,
                            Columna: this.columna,
                            Description: 'Valores incorrectos'
                        });
                        var err = this.GetErrorStorage();
                        this.errores = this.errores.concat(err);
                        this.SetStorage(this.errores);
                        return null;
                    }
                    return op1 / op2;
                }
                else if (type1 == "object" && type2 == "number") {
                    if (op2 === 0) {
                        console.log("Resultado indefinido, no puede ejecutarse operación sobre cero.");
                        this.errores.push({
                            Tipo: 'Sintáctico',
                            Fila: this.linea,
                            Columna: this.columna,
                            Description: 'Valores incorrectos'
                        });
                        var err = this.GetErrorStorage();
                        this.errores = this.errores.concat(err);
                        this.SetStorage(this.errores);
                        return null;
                    }
                    return Number(op1[0]) / op2;
                }
                else if (type1 == "number" && type2 == "object") {
                    if (Number(op2[0]) === 0) {
                        console.log("Resultado indefinido, no puede ejecutarse operación sobre cero.");
                        this.errores.push({
                            Tipo: 'Sintáctico',
                            Fila: this.linea,
                            Columna: this.columna,
                            Description: 'Valores incorrectos'
                        });
                        var err = this.GetErrorStorage();
                        this.errores = this.errores.concat(err);
                        this.SetStorage(this.errores);
                        return null;
                    }
                    return op1 / Number(op2[0]);
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    this.errores.push({
                        Tipo: 'Sintáctico',
                        Fila: this.linea,
                        Columna: this.columna,
                        Description: 'Tipos de dato ' + type1 + ' y ' + type2 + ' incorrectos'
                    });
                    var err = this.GetErrorStorage();
                    this.errores = this.errores.concat(err);
                    this.SetStorage(this.errores);
                    return null;
                }
            }
            //modulo
            else if (this.operador == Operador.MODULO) {
                if (type1 == "number" && type2 == "number") {
                    if (op2 === 0) {
                        console.log("Resultado indefinido, no puede ejecutarse operación sobre cero.");
                        this.errores.push({
                            Tipo: 'Sintáctico',
                            Fila: this.linea,
                            Columna: this.columna,
                            Description: 'Valores incorrectos'
                        });
                        var err = this.GetErrorStorage();
                        this.errores = this.errores.concat(err);
                        this.SetStorage(this.errores);
                        return null;
                    }
                    return op1 % op2;
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    this.errores.push({
                        Tipo: 'Sintáctico',
                        Fila: this.linea,
                        Columna: this.columna,
                        Description: 'Tipos de dato ' + type1 + ' y ' + type2 + ' incorrectos'
                    });
                    var err = this.GetErrorStorage();
                    this.errores = this.errores.concat(err);
                    this.SetStorage(this.errores);
                    return null;
                }
            }
            //menorque
            else if (this.operador == Operador.MENOR_QUE) {
                if (type1 === "number" && type2 === "number") {
                    if (op1 < op2)
                        return true;
                    return false;
                }
                else if (type1 == "object" && type2 == "number") {
                    var flag = false;
                    for (var _i = 0, op1_1 = op1; _i < op1_1.length; _i++) {
                        var op = op1_1[_i];
                        if (Number(op) < op2)
                            flag = true;
                    }
                    return flag;
                }
                else if (type1 == "number" && type2 == "object") {
                    var flag = false;
                    for (var _a = 0, op2_1 = op2; _a < op2_1.length; _a++) {
                        var op = op2_1[_a];
                        if (op1 < Number(op))
                            flag = true;
                    }
                    return flag;
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una comparación");
                    this.errores.push({
                        Tipo: 'Sintáctico',
                        Fila: this.linea,
                        Columna: this.columna,
                        Description: 'Tipos de dato ' + type1 + ' y ' + type2 + ' incorrectos'
                    });
                    var err = this.GetErrorStorage();
                    this.errores = this.errores.concat(err);
                    this.SetStorage(this.errores);
                    return null;
                }
            }
            //menoigualque
            else if (this.operador == Operador.MENOR_IGUA_QUE) {
                if (type1 == "number" && type2 == "number") {
                    if (op1 <= op2)
                        return true;
                    return false;
                }
                else if (type1 == "object" && type2 == "number") {
                    var flag = false;
                    for (var _b = 0, op1_2 = op1; _b < op1_2.length; _b++) {
                        var op = op1_2[_b];
                        if (Number(op) <= op2)
                            flag = true;
                    }
                    return flag;
                }
                else if (type1 == "number" && type2 == "object") {
                    var flag = false;
                    for (var _c = 0, op2_2 = op2; _c < op2_2.length; _c++) {
                        var op = op2_2[_c];
                        if (op1 <= Number(op))
                            flag = true;
                    }
                    return flag;
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una comparación");
                    this.errores.push({
                        Tipo: 'Sintáctico',
                        Fila: this.linea,
                        Columna: this.columna,
                        Description: 'Tipos de dato ' + type1 + ' y ' + type2 + ' incorrectos'
                    });
                    var err = this.GetErrorStorage();
                    this.errores = this.errores.concat(err);
                    this.SetStorage(this.errores);
                    return null;
                }
            }
            //mayorque
            else if (this.operador == Operador.MAYOR_QUE) {
                if (type1 == "number" && type2 == "number") {
                    if (op1 > op2)
                        return true;
                    return false;
                }
                else if (type1 == "object") {
                    console.log('op1 es objeto');
                    var flag = false;
                    for (var _d = 0, op1_3 = op1; _d < op1_3.length; _d++) {
                        var op = op1_3[_d];
                        if (Number(op) > op2)
                            flag = true;
                    }
                    console.log(flag);
                    return flag;
                }
                else if (type1 == "number" && type2 == "object") {
                    console.log('op2 es objeto');
                    var flag = false;
                    for (var _e = 0, op2_3 = op2; _e < op2_3.length; _e++) {
                        var op = op2_3[_e];
                        if (op1 > Number(op))
                            flag = true;
                    }
                    return flag;
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una comparación");
                    this.errores.push({
                        Tipo: 'Sintáctico',
                        Fila: this.linea,
                        Columna: this.columna,
                        Description: 'Tipos de dato ' + type1 + ' y ' + type2 + ' incorrectos'
                    });
                    var err = this.GetErrorStorage();
                    this.errores = this.errores.concat(err);
                    this.SetStorage(this.errores);
                    return null;
                }
            }
            //mayorigualque
            else if (this.operador == Operador.MAYOR_IGUA_QUE) {
                if (type1 == "number" && type2 == "number") {
                    if (op1 >= op2)
                        return true;
                    return false;
                }
                else if (type1 == "object" && type2 == "number") {
                    var flag = false;
                    for (var _f = 0, op1_4 = op1; _f < op1_4.length; _f++) {
                        var op = op1_4[_f];
                        if (Number(op) >= op2)
                            flag = true;
                    }
                    return flag;
                }
                else if (type1 == "number" && type2 == "object") {
                    var flag = false;
                    for (var _g = 0, op2_4 = op2; _g < op2_4.length; _g++) {
                        var op = op2_4[_g];
                        if (op1 >= Number(op))
                            flag = true;
                    }
                    return flag;
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una comparación");
                    this.errores.push({
                        Tipo: 'Sintáctico',
                        Fila: this.linea,
                        Columna: this.columna,
                        Description: 'Tipos de dato ' + type1 + ' y ' + type2 + ' incorrectos'
                    });
                    var err = this.GetErrorStorage();
                    this.errores = this.errores.concat(err);
                    this.SetStorage(this.errores);
                    return null;
                }
            }
            //IGUAL
            else if (this.operador == Operador.IGUAL_QUE) {
                if (op1 == op2) {
                    return true;
                }
                else if (type1 == "object" && type2 == "number") {
                    var flag = false;
                    for (var _h = 0, op1_5 = op1; _h < op1_5.length; _h++) {
                        var op = op1_5[_h];
                        if (Number(op) == op2)
                            flag = true;
                    }
                    return flag;
                }
                else if (type1 == "number" && type2 == "object") {
                    var flag = false;
                    for (var _j = 0, op2_5 = op2; _j < op2_5.length; _j++) {
                        var op = op2_5[_j];
                        if (op1 == Number(op))
                            flag = true;
                    }
                    return flag;
                }
                return false;
            }
            //DIFERENTE
            else if (this.operador == Operador.DIFERENTE_QUE) {
                if (op1 != op2) {
                    return true;
                }
                else if (type1 == "object" && type2 === "number") {
                    var flag = false;
                    for (var _k = 0, op1_6 = op1; _k < op1_6.length; _k++) {
                        var op = op1_6[_k];
                        if (Number(op) != op2)
                            flag = true;
                    }
                    return flag;
                }
                else if (type1 == "number" && type2 == "object") {
                    var flag = false;
                    for (var _l = 0, op2_6 = op2; _l < op2_6.length; _l++) {
                        var op = op2_6[_l];
                        if (op1 != Number(op))
                            flag = true;
                    }
                    return flag;
                }
                else {
                    return false;
                }
            }
            //AND
            else if (this.operador == Operador.AND) {
                if (op1 && op2) {
                    return true;
                }
                else {
                    return false;
                }
            }
            //OR
            else if (this.operador == Operador.OR) {
                if (op1 || op2) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        return null;
    };
    Operacion.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };
    //obtener contador
    Operacion.prototype.GetErrorStorage = function () {
        var data = localStorage.getItem('errores_xquery');
        return JSON.parse(data);
    };
    //actualizar contador
    Operacion.prototype.SetStorage = function (error) {
        localStorage.setItem('errores_xquery', JSON.stringify(error));
    };
    return Operacion;
}());
exports.Operacion = Operacion;
