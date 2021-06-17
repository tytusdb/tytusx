(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+QV2":
/*!**********************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Instrucciones/Predicados.ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Predicados; });
/* harmony import */ var _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Abstracto/Instruccion */ "ssiu");
/* harmony import */ var _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Abstracto/nodoAST */ "GvuX");
/* harmony import */ var _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Simbolos/Tipo */ "HVYh");



class Predicados extends _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__["Instruccion"] {
    constructor(select, lcorchetes, fila, columna) {
        super(new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipoDato"].CADENA), fila, columna);
        this.Identificador = select;
        this.Corchetes = lcorchetes;
    }
    interpretar(arbol, tabla) {
        throw new Error("Method not implemented.");
    }
    getNodosAST() {
        var nodo = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]('PREDICADO'); //PADRE SELECT
        /**TIPOS DE ATRIBUTOS
         * ATRIBUTOS EXPRESION (TIPO INSTRUCCION)
         * ATRIBUTOS SELECT
         * ATRIBUTOS MULTIPLICACION
         * ATRIBUTOS IDENTIFICADOR L_CORCHETES
         */
        if (this.Identificador != null) {
            nodo.agregarHijo(this.Identificador);
        }
        if (this.Corchetes != null) {
            nodo.agregarHijoAST(this.Corchetes.getNodosAST());
        }
        return nodo;
    }
}


/***/ }),

/***/ "/mHx":
/*!***********************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Expresiones/Identificador.ts ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Identificador; });
/* harmony import */ var _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Abstracto/Instruccion */ "ssiu");
/* harmony import */ var _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Abstracto/nodoAST */ "GvuX");
/* harmony import */ var src_app_Backend_XPATH_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Backend/XPATH/Analizador/Simbolos/Tipo */ "HVYh");



class Identificador extends _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__["Instruccion"] {
    constructor(identificador, fila, columna) {
        super(new src_app_Backend_XPATH_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["default"](src_app_Backend_XPATH_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipoDato"].CADENA), fila, columna);
        this.identificador = identificador.toLowerCase();
    }
    getNodosAST() {
        let nodo = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"](this.identificador);
        return nodo;
    }
    interpretar(arbol, tabla) {
        return this.identificador;
    }
}


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\jacks\OneDrive\Desktop\VACAS JUNIO 2021\tytusx\20211SVAC\G24\Frontend\src\main.ts */"zUnb");


/***/ }),

/***/ "0NkC":
/*!********************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Expresiones/Aritmetica.ts ***!
  \********************************************************************/
/*! exports provided: default, Operadores */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Aritmetica; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Operadores", function() { return Operadores; });
/* harmony import */ var _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Abstracto/Instruccion */ "ssiu");
/* harmony import */ var _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Abstracto/nodoAST */ "GvuX");
/* harmony import */ var _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Excepciones/NodoErrores */ "E7Rf");
/* harmony import */ var _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Simbolos/Tipo */ "HVYh");




class Aritmetica extends _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__["Instruccion"] {
    constructor(operador, fila, columna, op1, op2) {
        super(new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO), fila, columna);
        this.operador = operador;
        if (!op2)
            this.operandoUnico = op1;
        else {
            this.operando1 = op1;
            this.operando2 = op2;
        }
    }
    getNodosAST() {
        var _a, _b;
        let nodo = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]('ARITMETICA');
        if (this.operandoUnico != null) {
            nodo.agregarHijo(this.operador + '');
            nodo.agregarHijoAST(this.operandoUnico.getNodosAST());
        }
        else {
            nodo.agregarHijoAST((_a = this.operando1) === null || _a === void 0 ? void 0 : _a.getNodosAST());
            nodo.agregarHijo(this.operador + '', 'ar', this.operador);
            nodo.agregarHijoAST((_b = this.operando2) === null || _b === void 0 ? void 0 : _b.getNodosAST());
        }
        return nodo;
    }
    interpretar(arbol, tabla) {
        var _a, _b;
        let izq, der, uno;
        izq = der = uno = null;
        if (this.operandoUnico != null) {
            uno = this.operandoUnico.interpretar(arbol, tabla);
            if (uno instanceof _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"])
                return uno;
        }
        else {
            izq = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.interpretar(arbol, tabla);
            if (izq instanceof _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"])
                return izq;
            der = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.interpretar(arbol, tabla);
            if (der instanceof _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"])
                return der;
        }
        switch (this.operador) {
            case Operadores.SUMA:
                return this.operador1Suma(izq, der);
            case Operadores.RESTA:
                return this.operador1Resta(izq, der);
            case Operadores.MULTIPLICACION:
                return this.operador1Multi(izq, der);
            case Operadores.DIVISION:
                return this.operador1Division(izq, der);
            case Operadores.MODULADOR:
                return this.operador1Mod(izq, der);
            case Operadores.MENOSNUM:
                return this.opMenosUnario(uno);
            default:
                return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('ERROR SEMANTICO', 'OPERADOR INVALIDO', this.fila, this.columna);
        }
    }
    /*----------------------------------------------------------MENOSUNARIO------------------------------------------------- */
    opMenosUnario(izq) {
        var _a;
        let opUn = (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        switch (opUn) {
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO:
                this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO);
                return parseInt(izq) * -1;
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL:
                this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                return parseFloat(izq) * -1.0;
        }
    }
    /*----------------------------------------------------------SUMA------------------------------------------------- */
    operador1Suma(izq, der) {
        var _a, _b;
        let op1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let op2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (op1 //operador 1
        ) {
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO:
                return this.op2Suma(1, op2, izq, der);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL:
                return this.op2Suma(2, op2, izq, der);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].BOOLEANO:
                return this.op2Suma(3, op2, izq, der);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA:
                return this.op2Suma(4, op2, izq, der);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CARACTER:
                return this.op2Suma(5, op2, izq, der);
        }
    }
    op2Suma(numero, op2, izq, der) {
        if (numero == 1) {
            //entero
            switch (op2 //OPERADOR 2
            ) {
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO: //retorna entero
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO);
                    return parseInt(izq) + parseInt(der);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    return parseFloat(izq) + parseFloat(der);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].BOOLEANO: //retorna entero
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO);
                    let dats = der + '';
                    let otr = dats.toLowerCase();
                    return otr == 'true' ? parseInt(izq) + 1 : parseInt(izq);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA: //retorna cadena
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA);
                    return izq + '' + der;
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CARACTER: //retorna entero
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO);
                    var da = der + '';
                    var res = da.charCodeAt(0);
                    return parseInt(izq) + res;
            }
        }
        else if (numero == 2) {
            //decimal
            switch (op2 //OPERADOR 2
            ) {
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    return parseFloat(izq) + parseFloat(der);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    return parseFloat(izq) + parseFloat(der);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].BOOLEANO: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    let dats = der + '';
                    let otr = dats.toLowerCase();
                    return otr == 'true' ? parseFloat(izq) + 1 : parseFloat(izq);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA: //retorna cadena
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA);
                    return izq + '' + der;
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CARACTER: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    var da = der + '';
                    var res = da.charCodeAt(0);
                    return parseFloat(izq) + res;
            }
        }
        else if (numero == 3) {
            //boolean
            switch (op2 //OPERADOR 2
            ) {
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO: //retorna entero
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO);
                    let dats = izq + '';
                    let otr = dats.toLowerCase();
                    if (otr == 'true')
                        return parseInt(der) + 1;
                    return parseInt(der);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    let dats1 = izq + '';
                    let otr1 = dats1.toLowerCase();
                    return otr1 == 'true' ? parseFloat(der) + 1 : parseFloat(der);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA: //retorna cadena
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA);
                    return izq + '' + der;
                default:
                    //error
                    return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 4) {
            //cadena
            switch (op2 //OPERADOR 2
            ) {
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO: //retorna cadena
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA);
                    return izq + '' + der;
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL: //retorna cadena
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA);
                    return izq + '' + der;
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].BOOLEANO: //retorna cadena
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA);
                    return izq + '' + der;
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA: //retorna cadena
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA);
                    return izq + '' + der;
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CARACTER: //retorna cadena
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA);
                    var dato = der;
                    return izq + '' + dato;
            }
        }
        else if (numero == 5) {
            //caracter
            switch (op2 //OPERADOR 2
            ) {
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO: //retorna entero
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO);
                    var da1 = izq + '';
                    var res1 = da1.charCodeAt(0);
                    return res1 + parseInt(der);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    var da1 = izq + '';
                    var res1 = da1.charCodeAt(0);
                    return res1 + parseFloat(der);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA: //retorna cadena
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA);
                    var otro11 = izq;
                    return otro11 + '' + der;
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CARACTER: //retorna cadena
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA);
                    var otro = der;
                    var otro1 = izq;
                    return otro1 + '' + otro;
                default:
                    //error semantico
                    return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
    }
    /*----------------------------------------------------------RESTA------------------------------------------------- */
    operador1Resta(izq, der) {
        var _a, _b;
        let op1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let op2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (op1 //operador 1
        ) {
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO:
                return this.op2Resta(1, op2, izq, der);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL:
                return this.op2Resta(2, op2, izq, der);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].BOOLEANO:
                return this.op2Resta(3, op2, izq, der);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA:
                return this.op2Resta(4, op2, izq, der);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CARACTER:
                return this.op2Resta(5, op2, izq, der);
        }
    }
    op2Resta(numero, op2, izq, der) {
        if (numero == 1) {
            //entero
            switch (op2 //OPERADOR 2
            ) {
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO: //retorna entero
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO);
                    return parseInt(izq) - parseInt(der);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    return parseFloat(izq) - parseFloat(der);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].BOOLEANO: //retorna entero
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO);
                    let dats = der + '';
                    let otr = dats.toLowerCase();
                    return otr == 'true' ? parseInt(izq) - 1 : parseInt(izq);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CARACTER: //retorna entero
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO);
                    var da = der + '';
                    var res = da.charCodeAt(0);
                    return parseInt(izq) - res;
                default:
                    //error
                    return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 2) {
            //decimal
            switch (op2 //OPERADOR 2
            ) {
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    return parseFloat(izq) - parseFloat(der);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    return parseFloat(izq) - parseFloat(der);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].BOOLEANO: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    let dats = der + '';
                    let otr = dats.toLowerCase();
                    return otr == 'true' ? parseFloat(izq) - 1 : parseFloat(izq);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CARACTER: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    var da = der + '';
                    var res = da.charCodeAt(0);
                    return parseFloat(izq) - res;
                default:
                    //error
                    return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 3) {
            //boolean
            switch (op2 //OPERADOR 2
            ) {
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO: //retorna entero
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO);
                    let dats = izq + '';
                    let otr = dats.toLowerCase();
                    return otr == 'true' ? parseInt(der) - 1 : parseInt(der);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    let dats1 = izq + '';
                    let otr1 = dats1.toLowerCase();
                    return otr1 == 'true' ? parseFloat(der) - 1 : parseFloat(der);
                default:
                    //error
                    return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 4) {
            //cadena
            return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
        }
        else if (numero == 5) {
            //caracter
            switch (op2 //OPERADOR 2
            ) {
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO: //retorna entero
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO);
                    var da1 = izq + '';
                    var res1 = da1.charCodeAt(0);
                    return res1 - parseInt(der);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    var da1 = izq + '';
                    var res1 = da1.charCodeAt(0);
                    return res1 - parseFloat(der);
                default:
                    //error semantico
                    return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
    }
    /*----------------------------------------------------------MULTIPLICACION------------------------------------------------- */
    operador1Multi(izq, der) {
        var _a, _b;
        let op1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let op2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (op1 //operador 1
        ) {
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO:
                return this.op2Multi(1, op2, izq, der);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL:
                return this.op2Multi(2, op2, izq, der);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].BOOLEANO:
                return this.op2Multi(3, op2, izq, der);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA:
                return this.op2Multi(4, op2, izq, der);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CARACTER:
                return this.op2Multi(5, op2, izq, der);
        }
    }
    op2Multi(numero, op2, izq, der) {
        if (numero == 1) {
            //entero
            switch (op2 //OPERADOR 2
            ) {
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO: //retorna entero
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO);
                    return parseInt(izq) * parseInt(der);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    return parseFloat(izq) * parseFloat(der);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CARACTER: //retorna entero
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO);
                    var da = der + '';
                    var res = da.charCodeAt(0);
                    return parseInt(izq) * res;
                default:
                    //error
                    return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 2) {
            //decimal
            switch (op2 //OPERADOR 2
            ) {
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    return parseFloat(izq) * parseFloat(der);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    return parseFloat(izq) * parseFloat(der);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CARACTER: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    var da = der + '';
                    var res = da.charCodeAt(0);
                    return parseFloat(izq) * res;
                default:
                    //error
                    return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 3) {
            //boolean
            //error
            return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
        }
        else if (numero == 4) {
            //cadena
            //error
            return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
        }
        else if (numero == 5) {
            //caracter
            switch (op2 //OPERADOR 2
            ) {
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO: //retorna entero
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO);
                    var da1 = izq + '';
                    var res1 = da1.charCodeAt(0);
                    return res1 * parseInt(der);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    var da1 = izq + '';
                    var res1 = da1.charCodeAt(0);
                    return res1 * parseFloat(der);
                default:
                    //error semantico
                    return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
    }
    /*----------------------------------------------------------DIVISION------------------------------------------------- */
    operador1Division(izq, der) {
        var _a, _b;
        let op1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let op2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (op1 //operador 1
        ) {
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO:
                return this.op2Division(1, op2, izq, der);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL:
                return this.op2Division(2, op2, izq, der);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].BOOLEANO:
                return this.op2Division(3, op2, izq, der);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA:
                return this.op2Division(4, op2, izq, der);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CARACTER:
                return this.op2Division(5, op2, izq, der);
        }
    }
    op2Division(numero, op2, izq, der) {
        if (numero == 1) {
            //entero
            switch (op2 //OPERADOR 2
            ) {
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO: //retorna entero
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    return der != 0
                        ? parseInt(izq) / parseInt(der)
                        : 'NO SE PUEDE DIVIDIR SOBRE CERO';
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    return der != 0
                        ? parseFloat(izq) / parseFloat(der)
                        : 'NO SE PUEDE DIVIDIR SOBRE CERO';
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CARACTER: //retorna entero
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    var da = der + '';
                    var res = da.charCodeAt(0);
                    return res != 0
                        ? parseInt(izq) / res
                        : 'NO SE PUEDE DIVIDIR SOBRE CERO';
                default:
                    //error
                    return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 2) {
            //decimal
            switch (op2 //OPERADOR 2
            ) {
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    return der != 0
                        ? parseFloat(izq) / parseFloat(der)
                        : 'NO SE PUEDE DIVIDIR SOBRE CERO';
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    return der != 0
                        ? parseFloat(izq) / parseFloat(der)
                        : 'NO SE PUEDE DIVIDIR SOBRE CERO';
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CARACTER: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    var da = der + '';
                    var res = da.charCodeAt(0);
                    return der != 0
                        ? parseFloat(izq) / res
                        : 'NO SE PUEDE DIVIDIR SOBRE CERO';
                default:
                    //error
                    return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 3) {
            //boolean
            //error
            return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
        }
        else if (numero == 4) {
            //cadena
            //error
            return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
        }
        else if (numero == 5) {
            //caracter
            switch (op2 //OPERADOR 2
            ) {
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO: //retorna entero
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    var da1 = izq + '';
                    var res1 = da1.charCodeAt(0);
                    return der != 0
                        ? res1 / parseInt(der)
                        : 'NO SE PUEDE DIVIDIR SOBRE CERO';
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    var da1 = izq + '';
                    var res1 = da1.charCodeAt(0);
                    return der != 0
                        ? res1 / parseFloat(der)
                        : 'NO SE PUEDE DIVIDIR SOBRE CERO';
                default:
                    //error semantico
                    return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
    }
    /*----------------------------------------------------------MODULACION------------------------------------------------- */
    operador1Mod(izq, der) {
        var _a, _b;
        let op1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let op2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (op1 //operador 1
        ) {
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO:
                return this.op2Mod(1, op2, izq, der);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL:
                return this.op2Mod(2, op2, izq, der);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].BOOLEANO:
                return this.op2Mod(3, op2, izq, der);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA:
                return this.op2Mod(4, op2, izq, der);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CARACTER:
                return this.op2Mod(5, op2, izq, der);
        }
    }
    op2Mod(numero, op2, izq, der) {
        if (numero == 1) {
            //entero
            switch (op2 //OPERADOR 2
            ) {
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO: //retorna entero
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO);
                    return parseInt(izq) % parseInt(der);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    return parseFloat(izq) % parseFloat(der);
                default:
                    //error
                    return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 2) {
            //decimal
            switch (op2 //OPERADOR 2
            ) {
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    return parseFloat(izq) % parseFloat(der);
                case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL: //retorna decimal
                    this.tipoDato = new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL);
                    return parseFloat(izq) % parseFloat(der);
                default:
                    //error
                    return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 3) {
            //boolean
            //error
            return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
        }
        else if (numero == 4) {
            //cadena
            //error
            return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
        }
        else if (numero == 5) {
            //caracter
            //error
            return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
        }
    }
}
var Operadores;
(function (Operadores) {
    Operadores[Operadores["SUMA"] = 0] = "SUMA";
    Operadores[Operadores["RESTA"] = 1] = "RESTA";
    Operadores[Operadores["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    Operadores[Operadores["DIVISION"] = 3] = "DIVISION";
    Operadores[Operadores["POTENCIA"] = 4] = "POTENCIA";
    Operadores[Operadores["MODULADOR"] = 5] = "MODULADOR";
    Operadores[Operadores["MENOSNUM"] = 6] = "MENOSNUM";
})(Operadores || (Operadores = {}));


/***/ }),

/***/ "0PyG":
/*!**********************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Simbolos/Arbol.ts ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Arbol; });
/* harmony import */ var _tablaSimbolos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tablaSimbolos */ "TD3t");

class Arbol {
    constructor(instrucciones) {
        this.consola = '';
        this.instrucciones = instrucciones;
        this.consola = '';
        this.tablaGlobal = new _tablaSimbolos__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.NodoErrores = new Array();
        this.listaSimbolos = new Array();
        this.dot = "";
        this.c = 0;
    }
    getEncoding() {
        return this.encoding;
    }
    setEncoding(encoding) {
        this.encoding = encoding;
    }
    getSimbolos() {
        return this.listaSimbolos;
    }
    actualizarTabla(identificador, linea, columna) {
        for (var elemento of this.listaSimbolos) {
            if (elemento.getIdentificador().toString() == identificador) {
                elemento.setLinea(linea);
                elemento.setColumna(linea);
                return true;
            }
        }
        return false;
    } /*
  public BuscarTipo(identificador: string): string {
      for (var elemento of this.listaSimbolos) {
        if (elemento.getIdentificador() == identificador.toLowerCase()) {
          return elemento.getForma().toString();
        }
      }
      return 'as';
    }*/
    /* public getFuncion(identificador: String) {
       for (let f of this.instrucciones) {
         if (f instanceof Objeto) {
           if (
             identificador.toLowerCase() ==
             (<Objeto>f).identificador.toLowerCase()
           ) {
             if (
               !this.actualizarTabla(
                 f.identificador.toString(),
                 '',
                 f.fila.toString(),
                 '',
                 f.columna.toString()
               )
             ) {
               let nuevoSimbolo = new reporteTabla(
                 f.identificador,
                 '',
                 'MetodoCreacion',
                 'void',
                 '',
                 f.fila.toString(),
                 f.columna.toString()
               );
               this.listaSimbolos.push(nuevoSimbolo);
             }
   
             return f;
           }
         }
       }
     }*/
    getNodoErrores() {
        return this.NodoErrores;
    }
    setNodoErrores(value) {
        this.NodoErrores = value;
    }
    getinstrucciones() {
        return this.instrucciones;
    }
    setinstrucciones(value) {
        this.instrucciones = value;
    }
    getconsola() {
        return this.consola;
    }
    setconsola(value) {
        this.consola = value;
    }
    actualizaConsola(uptodate) {
        this.consola = `${this.consola}${uptodate}\n`;
    }
    gettablaGlobal() {
        return this.tablaGlobal;
    }
    settablaGlobal(value) {
        this.tablaGlobal = value;
    }
    getDot(raiz) {
        this.dot = "";
        this.dot += "digraph {\n";
        this.dot += "n0[label=\"" + raiz.getValor().replace("\"", "\\\"") + "\"];\n";
        this.c = 1;
        this.recorrerAST("n0", raiz);
        this.dot += "}";
        return this.dot;
    }
    recorrerAST(padre, nPadre) {
        for (let hijo of nPadre.getHijos()) {
            var nombreHijo = "n" + this.c;
            this.dot += nombreHijo + "[label=\"" + hijo.getValor().replace("\"", "\\\"") + "\"];\n";
            this.dot += padre + "->" + nombreHijo + ";\n";
            this.c++;
            this.recorrerAST(nombreHijo, hijo);
        }
    }
}


/***/ }),

/***/ "0iGS":
/*!**********************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Instrucciones/SelectRoot.ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SelectRoot; });
/* harmony import */ var _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Abstracto/Instruccion */ "ssiu");
/* harmony import */ var _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Abstracto/nodoAST */ "GvuX");
/* harmony import */ var _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Simbolos/Tipo */ "HVYh");



class SelectRoot extends _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__["Instruccion"] {
    constructor(select, fila, columna, select2) {
        super(new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipoDato"].CADENA), fila, columna);
        this.Operacion = select;
        this.Operacion2 = select2;
    }
    interpretar(arbol, tabla) {
        throw new Error("Method not implemented.");
    }
    getNodosAST() {
        var nodo = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]("ALL"); //PADRE SELECT
        var nodoselect = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"](this.Operacion);
        nodo.agregarHijoAST(nodoselect);
        if (this.Operacion2 != null) {
            var nodohijo2 = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"](this.Operacion2); //PADRE SELECT
            nodo.agregarHijoAST(nodohijo2);
        }
        return nodo;
    }
}


/***/ }),

/***/ 1:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "2/nI":
/*!*********************************************!*\
  !*** ./src/app/servicios/inicio.service.ts ***!
  \*********************************************/
/*! exports provided: InicioService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InicioService", function() { return InicioService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");


class InicioService {
    constructor(http) {
        this.http = http;
        this.path = 'http://localhost:3000';
    }
    obtenerAlgo() {
        return this.http.get(this.path + '/obtenerAlgo', {});
    }
    compilarCodigo(codigo) {
        return this.http.post(this.path + '/interpretar', {
            entrada: codigo,
        });
    }
    graficarAst() {
        return this.http.get(`${this.path}/graficar`, {});
    }
}
InicioService.ɵfac = function InicioService_Factory(t) { return new (t || InicioService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
InicioService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: InicioService, factory: InicioService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "27sk":
/*!************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/GramaticaXPath.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var GramaticaXPath = (function () {
    var o = function (k, v, o, l) { for (o = o || {}, l = k.length; l--; o[k[l]] = v)
        ; return o; }, $V0 = [1, 4], $V1 = [1, 22], $V2 = [1, 23], $V3 = [1, 8], $V4 = [1, 9], $V5 = [1, 10], $V6 = [1, 11], $V7 = [1, 12], $V8 = [1, 13], $V9 = [1, 14], $Va = [1, 15], $Vb = [1, 16], $Vc = [1, 17], $Vd = [1, 18], $Ve = [1, 19], $Vf = [1, 20], $Vg = [1, 21], $Vh = [5, 7, 8, 16, 17, 18, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58], $Vi = [1, 27], $Vj = [1, 38], $Vk = [1, 45], $Vl = [1, 46], $Vm = [1, 29], $Vn = [1, 30], $Vo = [1, 31], $Vp = [1, 33], $Vq = [1, 34], $Vr = [1, 40], $Vs = [1, 41], $Vt = [1, 42], $Vu = [1, 43], $Vv = [1, 44], $Vw = [5, 7, 8, 17, 18, 20, 22, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58], $Vx = [1, 65], $Vy = [5, 7, 8, 16, 17, 18, 20, 22, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58], $Vz = [5, 7, 8, 16, 18, 20, 22, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58], $VA = [1, 70], $VB = [1, 68], $VC = [1, 69], $VD = [1, 71], $VE = [1, 72], $VF = [1, 73], $VG = [1, 74], $VH = [1, 75], $VI = [1, 76], $VJ = [1, 77], $VK = [1, 78], $VL = [1, 79], $VM = [1, 80], $VN = [1, 81], $VO = [2, 32], $VP = [5, 7, 8, 16, 18, 20, 22, 29, 30, 32, 33, 34, 35, 36, 37, 38, 39, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58], $VQ = [5, 7, 8, 16, 18, 20, 22, 32, 33, 38, 39, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58], $VR = [5, 7, 8, 16, 18, 20, 22, 32, 33, 34, 35, 36, 37, 38, 39, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58], $VS = [5, 7, 8, 16, 17, 18, 19, 20, 22, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58];
    var parser = { trace: function trace() { },
        yy: {},
        symbols_: { "error": 2, "START": 3, "INSTRUCCIONES": 4, "EOF": 5, "INSTRUCCION": 6, "OPTION": 7, "BARRA": 8, "EXPRESION": 9, "ATRIBUTO": 10, "AXES": 11, "ALL": 12, "PREDICADOS": 13, "IDENTIFICADOR": 14, "L_CORCHETES": 15, "SELECT": 16, "MULTIPLICACION": 17, "ATRIBUTOS": 18, "CORCHETEIZQ": 19, "CORCHETEDER": 20, "PARIZQ": 21, "PARDER": 22, "COMA": 23, "CADENA": 24, "entero": 25, "NUMBER": 26, "CARACTER_LITERAL": 27, "STRING_LITERAL": 28, "MENOS": 29, "MAS": 30, "DIVISION": 31, "IGUAL": 32, "NOIGUAL": 33, "MENORQUE": 34, "MENORIGUAL": 35, "MAYORQUE": 36, "MAYORIGUAL": 37, "OR": 38, "AND": 39, "MODULO": 40, "LAST": 41, "POSITION": 42, "NODE": 43, "TEXT": 44, "ANCESTOR": 45, "DOSPUNTOS": 46, "ANCESTORSELF": 47, "ATTRIBUTE": 48, "CHILD": 49, "DESCENDENT": 50, "DESCENDENTSELF": 51, "FOLLOWING": 52, "FOLLOWINGSIBLI": 53, "NAMESPACE": 54, "PARENT": 55, "PRECEDING": 56, "PRECEDINGSIBLI": 57, "SELF": 58, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 7: "OPTION", 8: "BARRA", 14: "IDENTIFICADOR", 16: "SELECT", 17: "MULTIPLICACION", 18: "ATRIBUTOS", 19: "CORCHETEIZQ", 20: "CORCHETEDER", 21: "PARIZQ", 22: "PARDER", 23: "COMA", 24: "CADENA", 25: "entero", 26: "NUMBER", 27: "CARACTER_LITERAL", 28: "STRING_LITERAL", 29: "MENOS", 30: "MAS", 31: "DIVISION", 32: "IGUAL", 33: "NOIGUAL", 34: "MENORQUE", 35: "MENORIGUAL", 36: "MAYORQUE", 37: "MAYORIGUAL", 38: "OR", 39: "AND", 40: "MODULO", 41: "LAST", 42: "POSITION", 43: "NODE", 44: "TEXT", 45: "ANCESTOR", 46: "DOSPUNTOS", 47: "ANCESTORSELF", 48: "ATTRIBUTE", 49: "CHILD", 50: "DESCENDENT", 51: "DESCENDENTSELF", 52: "FOLLOWING", 53: "FOLLOWINGSIBLI", 54: "NAMESPACE", 55: "PARENT", 56: "PRECEDING", 57: "PRECEDINGSIBLI", 58: "SELF" },
        productions_: [0, [3, 2], [4, 2], [4, 1], [4, 3], [6, 3], [6, 2], [6, 1], [6, 1], [6, 1], [13, 1], [13, 2], [12, 2], [12, 1], [12, 1], [10, 2], [10, 2], [10, 2], [10, 3], [15, 4], [15, 3], [15, 4], [15, 3], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 3], [9, 3], [9, 3], [9, 3], [9, 3], [9, 3], [9, 3], [9, 3], [9, 3], [9, 3], [9, 3], [9, 3], [9, 3], [9, 2], [9, 3], [9, 3], [9, 3], [9, 3], [11, 4], [11, 4], [11, 4], [11, 4], [11, 4], [11, 4], [11, 4], [11, 4], [11, 4], [11, 4], [11, 4], [11, 4], [11, 4]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */
            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    return $$[$0 - 1];
                    break;
                case 2:
                    if ($$[$0] != false)
                        $$[$0 - 1].push($$[$0]);
                    this.$ = $$[$0 - 1];
                    break;
                case 3:
                case 10:
                    this.$ = ($$[$0] != false) ? [$$[$0]] : [];
                    break;
                case 4:
                    if ($$[$0] != false)
                        $$[$0 - 2].push($$[$0]);
                    this.$ = $$[$0 - 2];
                    break;
                case 5:
                    this.$ = new barrasnodo.default($$[$0 - 2], $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 1]);
                    break;
                case 6:
                    this.$ = new barrasnodo.default($$[$0 - 1], $$[$0], _$[$0 - 1].first_line, _$[$0 - 1].first_column, null);
                    break;
                case 7:
                case 8:
                case 9:
                case 26:
                case 29:
                case 30:
                case 31:
                case 33:
                    this.$ = $$[$0];
                    break;
                case 11:
                    this.$ = new predicado.default($$[$0 - 1], $$[$0], _$[$0 - 1].first_line, _$[$0 - 1].first_column);
                    break;
                case 12:
                    this.$ = new selectroot.default($$[$0 - 1], _$[$0 - 1].first_line, _$[$0 - 1].first_column, $$[$0]);
                    break;
                case 13:
                    this.$ = new selectroot.default($$[$0], _$[$0].first_line, _$[$0].first_column, null);
                    break;
                case 14:
                    this.$ = new todo.default($$[$0], _$[$0].first_line, _$[$0].first_column);
                    break;
                case 15:
                    this.$ = new atributosexpresion.default($$[$0 - 1], $$[$0], _$[$0 - 1].first_line, _$[$0 - 1].first_column);
                    break;
                case 16:
                case 17:
                    this.$ = new atributosimple.default($$[$0 - 1], $$[$0], _$[$0 - 1].first_line, _$[$0 - 1].first_column);
                    break;
                case 18:
                    this.$ = new atributospredicado.default($$[$0 - 1], $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                    break;
                case 19:
                    this.$ = new arreglos.default($$[$0 - 3], _$[$0 - 3].first_line, _$[$0 - 3].first_column, $$[$0 - 1]);
                    break;
                case 20:
                    this.$ = new arreglos.default(null, _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 1]);
                    break;
                case 21:
                    this.$ = new parentesis.default($$[$0 - 2], _$[$0 - 3].first_line, _$[$0 - 3].first_column, $$[$0]);
                    break;
                case 22:
                    this.$ = new parentesis.default($$[$0 - 1], _$[$0 - 2].first_line, _$[$0 - 2].first_column, null);
                    break;
                case 23:
                case 28:
                    this.$ = new nativo.default(new Tipo.default(Tipo.tipoDato.CADENA), $$[$0], _$[$0].first_line, _$[$0].first_column);
                    break;
                case 24:
                    this.$ = new nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO), $$[$0], _$[$0].first_line, _$[$0].first_column);
                    break;
                case 25:
                    this.$ = new nativo.default(new Tipo.default(Tipo.tipoDato.DECIMAL), $$[$0], _$[$0].first_line, _$[$0].first_column);
                    break;
                case 27:
                    this.$ = new nativo.default(new Tipo.default(Tipo.tipoDato.CARACTER), $$[$0], _$[$0].first_line, _$[$0].first_column);
                    break;
                case 32:
                    this.$ = new identificador.default($$[$0], _$[$0].first_line, _$[$0].first_column);
                    break;
                case 34:
                    this.$ = new aritmetica.default(aritmetica.Operadores.RESTA, _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 2], $$[$0]);
                    break;
                case 35:
                    this.$ = new aritmetica.default(aritmetica.Operadores.SUMA, _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 2], $$[$0]);
                    break;
                case 36:
                    this.$ = new aritmetica.default(aritmetica.Operadores.MULTIPLICACION, _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 2], $$[$0]);
                    break;
                case 37:
                    this.$ = new aritmetica.default(aritmetica.Operadores.DIVISION, _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 2], $$[$0]);
                    break;
                case 38:
                    this.$ = new relacional.default(relacional.Relacionales.IGUAL, _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 2], $$[$0]);
                    break;
                case 39:
                    this.$ = new relacional.default(relacional.Relacionales.NOIGUAL, _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 2], $$[$0]);
                    break;
                case 40:
                    this.$ = new relacional.default(relacional.Relacionales.MENOR, _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 2], $$[$0]);
                    break;
                case 41:
                    this.$ = new relacional.default(relacional.Relacionales.MENORIGUAL, _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 2], $$[$0]);
                    break;
                case 42:
                    this.$ = new relacional.default(relacional.Relacionales.MAYOR, _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 2], $$[$0]);
                    break;
                case 43:
                    this.$ = new relacional.default(relacional.Relacionales.MAYORIGUAL, _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 2], $$[$0]);
                    break;
                case 44:
                    this.$ = new logica.default(logica.Logicas.OR, _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 2], $$[$0]);
                    break;
                case 45:
                    this.$ = new logica.default(logica.Logicas.AND, _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 2], $$[$0]);
                    break;
                case 46:
                    this.$ = new aritmetica.default(aritmetica.Operadores.MODULADOR, _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 2], $$[$0]);
                    break;
                case 47:
                    this.$ = new aritmetica.default(aritmetica.Operadores.MENOSNUM, _$[$0 - 1].first_line, _$[$0 - 1].first_column, $$[$0], null);
                    break;
                case 48:
                case 49:
                case 50:
                case 51:
                    this.$ = new especiales.default($$[$0 - 2], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                    break;
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                case 58:
                case 59:
                case 60:
                case 61:
                case 62:
                case 63:
                case 64:
                    this.$ = new axes.default($$[$0 - 3], $$[$0], _$[$0 - 3].first_line, _$[$0 - 3].first_column);
                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 6: 3, 8: $V0, 10: 5, 11: 6, 12: 7, 16: $V1, 17: $V2, 18: $V3, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 1: [3] }, { 5: [1, 24], 6: 25, 7: [1, 26], 8: $V0, 10: 5, 11: 6, 12: 7, 16: $V1, 17: $V2, 18: $V3, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, o($Vh, [2, 3]), { 6: 47, 8: $Vi, 9: 28, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, o($Vh, [2, 7]), o($Vh, [2, 8]), o($Vh, [2, 9]), { 6: 47, 8: $V0, 9: 48, 10: 37, 11: 36, 12: 35, 13: 39, 14: [1, 51], 15: 32, 16: [1, 49], 17: [1, 50], 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 46: [1, 52] }, { 46: [1, 53] }, { 46: [1, 54] }, { 46: [1, 55] }, { 46: [1, 56] }, { 46: [1, 57] }, { 46: [1, 58] }, { 46: [1, 59] }, { 46: [1, 60] }, { 46: [1, 61] }, { 46: [1, 62] }, { 46: [1, 63] }, { 46: [1, 64] }, o($Vw, [2, 13], { 16: $Vx }), o($Vy, [2, 14]), { 1: [2, 1] }, o($Vh, [2, 2]), { 6: 66, 8: $V0, 10: 5, 11: 6, 12: 7, 16: $V1, 17: $V2, 18: $V3, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $Vi, 9: 67, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, o($Vz, [2, 6], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 32: $VE, 33: $VF, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 38: $VK, 39: $VL, 40: $VM }), o($Vy, [2, 23]), o($Vy, [2, 24]), o($Vy, [2, 25]), o($Vy, [2, 26], { 19: $VN }), o($Vy, [2, 27]), o($Vy, [2, 28]), o($Vy, [2, 29]), o($Vy, [2, 30]), o($Vy, [2, 31]), o($Vy, $VO, { 15: 82, 19: $Vk, 21: $Vl }), o($Vy, [2, 33]), { 6: 47, 8: $V0, 9: 83, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 21: [1, 84] }, { 21: [1, 85] }, { 21: [1, 86] }, { 21: [1, 87] }, { 6: 47, 8: $V0, 9: 88, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 89, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, o($Vy, [2, 10]), o($Vz, [2, 15], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 32: $VE, 33: $VF, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 38: $VK, 39: $VL, 40: $VM }), o($Vw, [2, 16], { 16: $Vx }), o($Vy, [2, 17]), o($Vy, $VO, { 15: 90, 19: $Vk, 21: $Vl }), { 46: [1, 91] }, { 46: [1, 92] }, { 46: [1, 93] }, { 46: [1, 94] }, { 46: [1, 95] }, { 46: [1, 96] }, { 46: [1, 97] }, { 46: [1, 98] }, { 46: [1, 99] }, { 46: [1, 100] }, { 46: [1, 101] }, { 46: [1, 102] }, { 46: [1, 103] }, o($Vy, [2, 12]), o($Vh, [2, 4]), o($Vz, [2, 5], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 32: $VE, 33: $VF, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 38: $VK, 39: $VL, 40: $VM }), { 6: 47, 8: $V0, 9: 104, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 105, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 106, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 107, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 108, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 109, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 110, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 111, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 112, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 113, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 114, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 115, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 116, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 117, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, o($Vy, [2, 11], { 19: $VN }), o($Vy, [2, 47]), { 22: [1, 118] }, { 22: [1, 119] }, { 22: [1, 120] }, { 22: [1, 121] }, { 17: $VA, 20: [1, 122], 29: $VB, 30: $VC, 31: $VD, 32: $VE, 33: $VF, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 38: $VK, 39: $VL, 40: $VM }, { 17: $VA, 22: [1, 123], 29: $VB, 30: $VC, 31: $VD, 32: $VE, 33: $VF, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 38: $VK, 39: $VL, 40: $VM }, o($Vy, [2, 18], { 19: $VN }), { 6: 47, 8: $V0, 9: 124, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 125, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 126, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 127, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 128, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 129, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 130, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 131, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 132, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 133, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 134, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 135, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, { 6: 47, 8: $V0, 9: 136, 10: 37, 11: 36, 12: 35, 13: 39, 14: $Vj, 15: 32, 16: $V1, 17: $V2, 18: $V3, 19: $Vk, 21: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: $Vq, 29: $Vr, 41: $Vs, 42: $Vt, 43: $Vu, 44: $Vv, 45: $V4, 47: $V5, 48: $V6, 49: $V7, 50: $V8, 51: $V9, 52: $Va, 53: $Vb, 54: $Vc, 55: $Vd, 56: $Ve, 57: $Vf, 58: $Vg }, o($VP, [2, 34], { 17: $VA, 31: $VD, 40: $VM }), o($VP, [2, 35], { 17: $VA, 31: $VD, 40: $VM }), o($Vy, [2, 36]), o($Vy, [2, 37]), o($VQ, [2, 38], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 40: $VM }), o($VQ, [2, 39], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 40: $VM }), o($VR, [2, 40], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 40: $VM }), o($VR, [2, 41], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 40: $VM }), o($VR, [2, 42], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 40: $VM }), o($VR, [2, 43], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 40: $VM }), o([5, 7, 8, 16, 18, 20, 22, 38, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58], [2, 44], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 32: $VE, 33: $VF, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 39: $VL, 40: $VM }), o([5, 7, 8, 16, 18, 20, 22, 38, 39, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58], [2, 45], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 32: $VE, 33: $VF, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 40: $VM }), o($Vy, [2, 46]), { 17: $VA, 20: [1, 137], 29: $VB, 30: $VC, 31: $VD, 32: $VE, 33: $VF, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 38: $VK, 39: $VL, 40: $VM }, o($Vy, [2, 48]), o($Vy, [2, 49]), o($Vy, [2, 50]), o($Vy, [2, 51]), o($VS, [2, 20]), o($VS, [2, 22], { 23: [1, 138] }), o($Vz, [2, 52], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 32: $VE, 33: $VF, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 38: $VK, 39: $VL, 40: $VM }), o($Vz, [2, 53], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 32: $VE, 33: $VF, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 38: $VK, 39: $VL, 40: $VM }), o($Vz, [2, 54], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 32: $VE, 33: $VF, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 38: $VK, 39: $VL, 40: $VM }), o($Vz, [2, 55], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 32: $VE, 33: $VF, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 38: $VK, 39: $VL, 40: $VM }), o($Vz, [2, 56], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 32: $VE, 33: $VF, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 38: $VK, 39: $VL, 40: $VM }), o($Vz, [2, 57], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 32: $VE, 33: $VF, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 38: $VK, 39: $VL, 40: $VM }), o($Vz, [2, 58], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 32: $VE, 33: $VF, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 38: $VK, 39: $VL, 40: $VM }), o($Vz, [2, 59], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 32: $VE, 33: $VF, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 38: $VK, 39: $VL, 40: $VM }), o($Vz, [2, 60], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 32: $VE, 33: $VF, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 38: $VK, 39: $VL, 40: $VM }), o($Vz, [2, 61], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 32: $VE, 33: $VF, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 38: $VK, 39: $VL, 40: $VM }), o($Vz, [2, 62], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 32: $VE, 33: $VF, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 38: $VK, 39: $VL, 40: $VM }), o($Vz, [2, 63], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 32: $VE, 33: $VF, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 38: $VK, 39: $VL, 40: $VM }), o($Vz, [2, 64], { 17: $VA, 29: $VB, 30: $VC, 31: $VD, 32: $VE, 33: $VF, 34: $VG, 35: $VH, 36: $VI, 37: $VJ, 38: $VK, 39: $VL, 40: $VM }), o($VS, [2, 19]), o($VS, [2, 21])],
        defaultActions: { 24: [2, 1] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            }
            else {
                var error = new Error(str);
                error.hash = hash;
                throw error;
            }
        },
        parse: function parse(input) {
            var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = { yy: {} };
            for (var k in this.yy) {
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState.yy[k] = this.yy[k];
                }
            }
            lexer.setInput(input, sharedState.yy);
            sharedState.yy.lexer = lexer;
            sharedState.yy.parser = this;
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            }
            else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            _token_stack: var lex = function () {
                var token;
                token = lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token;
            };
            var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                }
                else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    }
                    else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(lexer.yytext);
                        lstack.push(lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        }
                        else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [
                                lstack[lstack.length - (len || 1)].range[0],
                                lstack[lstack.length - 1].range[1]
                            ];
                        }
                        r = this.performAction.apply(yyval, [
                            yytext,
                            yyleng,
                            yylineno,
                            sharedState.yy,
                            action[1],
                            vstack,
                            lstack
                        ].concat(args));
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        } };
    const barrasnodo = __webpack_require__(/*! ./Instrucciones/BarrasNodo */ "jtD6");
    const identificador = __webpack_require__(/*! ./Expresiones/Identificador */ "/mHx");
    const CErrores = __webpack_require__(/*! ./Excepciones/Errores */ "5Y53");
    const CNodoErrores = __webpack_require__(/*! ./Excepciones/NodoErrores */ "E7Rf");
    const inicio = __webpack_require__(/*! ../../../componentes/contenido-inicio/contenido-inicio.component */ "CbqC");
    const selectroot = __webpack_require__(/*! ./Instrucciones/SelectRoot */ "0iGS");
    const todo = __webpack_require__(/*! ./Instrucciones/todo */ "avIU");
    const atributosimple = __webpack_require__(/*! ./Instrucciones/AtributosSimples */ "6clo");
    const atributosexpresion = __webpack_require__(/*! ./Instrucciones/AtributosExpresion */ "iolQ");
    const atributospredicado = __webpack_require__(/*! ./Instrucciones/AtributosPredicado */ "v19a");
    const predicado = __webpack_require__(/*! ./Instrucciones/Predicados */ "+QV2");
    const arreglos = __webpack_require__(/*! ./Instrucciones/Arreglos */ "C7AR");
    const parentesis = __webpack_require__(/*! ./Expresiones/ParentesisExpresion */ "DdrW");
    const axes = __webpack_require__(/*! ./Funciones/Axes */ "x2tA");
    const especiales = __webpack_require__(/*! ./Funciones/Especiales */ "VOP4");
    const nativo = __webpack_require__(/*! ./Expresiones/Nativo */ "5beR");
    const Tipo = __webpack_require__(/*! ./Simbolos/Tipo */ "HVYh");
    const aritmetica = __webpack_require__(/*! ./Expresiones/Aritmetica */ "0NkC");
    const logica = __webpack_require__(/*! ./Expresiones/Logica */ "j/FN");
    const relacional = __webpack_require__(/*! ./Expresiones/Relacional */ "mh+0");
    /* generated by jison-lex 0.3.4 */
    var lexer = (function () {
        var lexer = ({
            EOF: 1,
            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                }
                else {
                    throw new Error(str);
                }
            },
            // resets the lexer, sets new input
            setInput: function (input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },
            // consumes and returns one char from the input
            input: function () {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                }
                else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }
                this._input = this._input.slice(1);
                return ch;
            },
            // unshifts one char (or a string) into the input
            unput: function (ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);
                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);
                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;
                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ?
                        (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                            + oldLines[oldLines.length - lines.length].length - lines[0].length :
                        this.yylloc.first_column - len
                };
                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },
            // When called from action, caches matched text and appends it on next action
            more: function () {
                this._more = true;
                return this;
            },
            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function () {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },
            // retain first n characters of the match
            less: function (n) {
                this.unput(this.match.slice(n));
            },
            // displays already matched input, i.e. for error messages
            pastInput: function () {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },
            // displays upcoming input, i.e. for error messages
            upcomingInput: function () {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },
            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function () {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },
            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function (match, indexed_rule) {
                var token, lines, backup;
                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }
                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ?
                        lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                        this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                }
                else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },
            // return next match in input
            next: function () {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }
                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            }
                            else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            }
                            else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        }
                        else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },
            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                }
                else {
                    return this.lex();
                }
            },
            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },
            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                }
                else {
                    return this.conditionStack[0];
                }
            },
            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                }
                else {
                    return this.conditions["INITIAL"].rules;
                }
            },
            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                }
                else {
                    return "INITIAL";
                }
            },
            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },
            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: { "case-insensitive": true },
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0: /* skip whitespace */
                        break;
                    case 1: // comentario simple línea
                        break;
                    case 2: // comentario multiple líneas
                        break;
                    case 3:
                        return 47;
                        break;
                    case 4:
                        return 51;
                        break;
                    case 5:
                        return 53;
                        break;
                    case 6:
                        return 57;
                        break;
                    case 7:
                        return 25;
                        break;
                    case 8:
                        return 28;
                        break;
                    case 9:
                        return 27;
                        break;
                    case 10:
                        return 45;
                        break;
                    case 11:
                        return 48;
                        break;
                    case 12:
                        return 49;
                        break;
                    case 13:
                        return 50;
                        break;
                    case 14:
                        return 52;
                        break;
                    case 15:
                        return 54;
                        break;
                    case 16:
                        return 55;
                        break;
                    case 17:
                        return 56;
                        break;
                    case 18:
                        return 58;
                        break;
                    case 19:
                        return 41;
                        break;
                    case 20:
                        return 42;
                        break;
                    case 21:
                        return 43;
                        break;
                    case 22:
                        return 44;
                        break;
                    case 23:
                        return 38;
                        break;
                    case 24:
                        return 39;
                        break;
                    case 25:
                        return 40;
                        break;
                    case 26:
                        return 31;
                        break;
                    case 27:
                        return 18;
                        break;
                    case 28:
                        return 14;
                        break;
                    case 29:
                        return 24;
                        break;
                    case 30:
                        return 'DECIMAL';
                        break;
                    case 31:
                        return 26;
                        break;
                    case 32:
                        return 8;
                        break;
                    case 33:
                        return 35;
                        break;
                    case 34:
                        return 37;
                        break;
                    case 35:
                        return 34;
                        break;
                    case 36:
                        return 36;
                        break;
                    case 37:
                        return 'INTERROGACION';
                        break;
                    case 38:
                        return 32;
                        break;
                    case 39:
                        return 21;
                        break;
                    case 40:
                        return 22;
                        break;
                    case 41:
                        return 19;
                        break;
                    case 42:
                        return 20;
                        break;
                    case 43:
                        return 23;
                        break;
                    case 44:
                        return 7;
                        break;
                    case 45:
                        return 30;
                        break;
                    case 46:
                        return 29;
                        break;
                    case 47:
                        return 17; /* SELECTALL TAMBIEN*/
                        break;
                    case 48:
                        return 32;
                        break;
                    case 49:
                        return 33;
                        break;
                    case 50:
                        return 46;
                        break;
                    case 51:
                        return 16;
                        break;
                    case 52:
                        return 5;
                        break;
                    case 53:
                        inicio.listaErrores.push(new CNodoErrores.default("Lexico", "No se esperaba el caracter: " + yy_.yytext, yy_.yylloc.first_line, yy_.yylloc.first_column));
                        console.log("Lexico, No se esperaba el caracter: " + yy_.yytext + " Linea: " + yy_.yylloc.first_line + "Columna: " + yy_.yylloc.first_column);
                        break;
                }
            },
            rules: [/^(?:\s+)/i, /^(?:\/\/.*)/i, /^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/i, /^(?:ancestor-or-self\b)/i, /^(?:descendant-or-self\b)/i, /^(?:following-sibling\b)/i, /^(?:preceding-sibling\b)/i, /^(?:([0-9]+(\.[0-9]+)?))/i, /^(?:(("(\\"|[^"]|\n)*")))/i, /^(?:(('[^']*')))/i, /^(?:ancestor\b)/i, /^(?:attribute\b)/i, /^(?:child\b)/i, /^(?:descendant\b)/i, /^(?:following\b)/i, /^(?:namespace\b)/i, /^(?:parent\b)/i, /^(?:preceding\b)/i, /^(?:self\b)/i, /^(?:last\b)/i, /^(?:position\b)/i, /^(?:node\b)/i, /^(?:text\b)/i, /^(?:or\b)/i, /^(?:and\b)/i, /^(?:mod\b)/i, /^(?:div\b)/i, /^(?:@)/i, /^(?:([a-zA-Z])[a-zA-Z0-9_!#$%&(),.\*\^Ññáéíúó]*)/i, /^(?:"[^\"]*")/i, /^(?:[0-9]+(\.[0-9]+)\b)/i, /^(?:[0-9]+(\.[0-9]+)?\b)/i, /^(?:\/)/i, /^(?:<=)/i, /^(?:>=)/i, /^(?:<)/i, /^(?:>)/i, /^(?:\?)/i, /^(?:=)/i, /^(?:\()/i, /^(?:\))/i, /^(?:\[)/i, /^(?:\])/i, /^(?:,)/i, /^(?:\|)/i, /^(?:\+)/i, /^(?:-)/i, /^(?:\*)/i, /^(?:=)/i, /^(?:!=)/i, /^(?::)/i, /^(?:\.)/i, /^(?:$)/i, /^(?:.)/i],
            conditions: { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53], "inclusive": true } }
        });
        return lexer;
    })();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;
    parser.Parser = Parser;
    return new Parser;
})();
if (true) {
    exports.parser = GramaticaXPath;
    exports.Parser = GramaticaXPath.Parser;
    exports.parse = function () { return GramaticaXPath.parse.apply(GramaticaXPath, arguments); };
    exports.main = function commonjsMain(args) {
        if (!args[1]) {
            console.log('Usage: ' + args[0] + ' FILE');
            process.exit(1);
        }
        var source = __webpack_require__(/*! fs */ 3).readFileSync(__webpack_require__(/*! path */ 4).normalize(args[1]), "utf8");
        return exports.parser.parse(source);
    };
    if ( true && __webpack_require__.c[__webpack_require__.s] === module) {
        exports.main(process.argv.slice(1));
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "YuTi")(module)))

/***/ }),

/***/ "2sLK":
/*!*************************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Abstracto/nodoAST.ts ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return nodoAST; });
class nodoAST {
    constructor(valor) {
        this.listaNodos = new Array();
        this.valor = valor;
    }
    agregarHijo(val, ambito, operador) {
        if (ambito != undefined) {
            switch (ambito) {
                case 'ar':
                    switch (operador) {
                        case 0:
                            val = '+';
                            break;
                        case 1:
                            val = '-';
                            break;
                        case 2:
                            val = '*';
                            break;
                        case 3:
                            val = '/';
                            break;
                        case 4:
                            val = '^';
                            break;
                        case 5:
                            val = '%';
                            break;
                    }
                    break;
                case 'log':
                    switch (operador) {
                        case 0:
                            val = '||';
                            break;
                        case 1:
                            val = '&&';
                            break;
                        case 2:
                            val = '!';
                            break;
                    }
                    break;
                case 'rel':
                    switch (operador) {
                        case 0:
                            val = '==';
                            break;
                        case 1:
                            val = '!=';
                            break;
                        case 2:
                            val = '>';
                            break;
                        case 3:
                            val = '<';
                            break;
                        case 4:
                            val = '>=';
                            break;
                        case 5:
                            val = '<=';
                            break;
                    }
                    break;
            }
            this.listaNodos.push(new nodoAST(val));
        }
        else
            this.listaNodos.push(new nodoAST(val));
    }
    agregarHijoAST(hijo) {
        if (hijo != undefined)
            this.listaNodos.push(hijo);
    }
    getValor() {
        return this.valor;
    }
    getHijos() {
        return this.listaNodos;
    }
}


/***/ }),

/***/ 3:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "5Y53":
/*!*****************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Excepciones/Errores.ts ***!
  \*****************************************************************/
/*! exports provided: Errores */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Errores", function() { return Errores; });
class Errores extends Array {
    constructor(err) {
        super();
        this.push(err);
    }
    static add(err) {
        this.prototype.push(err);
    }
    static verificarerror() {
        if (this.prototype.length > 0) {
            return "Se Detectaron Errores de Compilacion";
        }
        return "Compilacion Sin Errores";
    }
    static geterror() {
        var cad = "";
        cad += "<html>\n";
        cad += "<header>\n";
        cad += "<title>Reporte Errores</title>\n";
        cad += "</header>\n";
        cad += "<body background=\"gray\">\n";
        cad += "<div align=\"center\">\n";
        cad += "<h1>Reporte de Errores de Compilacion</h1>\n";
        cad += "<table border=\"2\" align=\"center\">\n";
        cad += "<tr>\n";
        cad += "<th>TIPO DE ERROR</th><th>DESCRIPCION</th><th>LINEA</th>\n";
        cad += "</tr>\n";
        for (var i = 0; i < this.prototype.length; i++) {
            cad += "<tr>\n";
            cad += "<td>" + this.prototype[i].getTipoError() + "</td><td>" +
                this.prototype[i].getDesc() + "</td><td>" +
                this.prototype[i].getFila() + "</td><td>" +
                this.prototype[i].getcolumna() + "</td>\n";
            cad += "</tr>\n";
        }
        cad += "</table>\n";
        cad += "</div>\n";
        cad += "</body>\n";
        cad += "</html>\n";
        return cad;
    }
    static clear() {
        while (this.prototype.length > 0) {
            this.prototype.pop();
        }
    }
}



/***/ }),

/***/ "5beR":
/*!****************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Expresiones/Nativo.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Nativo; });
/* harmony import */ var _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Abstracto/Instruccion */ "ssiu");
/* harmony import */ var _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Abstracto/nodoAST */ "GvuX");
/* harmony import */ var _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Simbolos/Tipo */ "HVYh");



class Nativo extends _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__["Instruccion"] {
    constructor(tipo, valor, fila, columna) {
        super(tipo, fila, columna);
        this.valor = valor;
        if (tipo.getTipo() == _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipoDato"].CADENA) {
            let val = this.valor.toString();
            this.valor = val
                .replace('\\n', '\n')
                .replace('\\t', '\t')
                .replace('\\r', '\r')
                .replace('\\\\', '\\')
                .replace("\\'", "'")
                .replace('\\"', '"');
        }
    }
    getNodosAST() {
        let nodo = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]('NATIVO');
        nodo.agregarHijo(this.valor + '');
        return nodo;
    }
    interpretar(arbol, tabla) {
        if (this.tipoDato.getTipo() == _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipoDato"].BOOLEANO) {
            return this.valor == 'true' ? true : false;
        }
        return this.valor;
    }
}


/***/ }),

/***/ "6clo":
/*!****************************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Instrucciones/AtributosSimples.ts ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AtributoSimple; });
/* harmony import */ var _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Abstracto/Instruccion */ "ssiu");
/* harmony import */ var _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Abstracto/nodoAST */ "GvuX");
/* harmony import */ var _XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../XML/Analizador/Simbolos/tablaSimbolos */ "TD3t");
/* harmony import */ var _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Simbolos/Tipo */ "HVYh");




class AtributoSimple extends _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__["Instruccion"] {
    constructor(select, tipo, fila, columna) {
        super(new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA), fila, columna);
        this.Operacion = select;
        this.tipoAtributo = tipo;
    }
    interpretar(arbol, tabla) {
        let salidas = new _XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_2__["default"]();
        if (this.tipoAtributo === "*") {
            for (var key of tabla.getTabla()) {
                if (key.getidentificador() == this.Operacion) {
                    if (key.getvalor() instanceof _XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_2__["default"]) {
                        for (let sim of key.getvalor().getTabla()) {
                            salidas.setVariable(sim);
                        }
                    }
                    else {
                    }
                }
            }
        }
        else if (this.tipoAtributo === ".") {
        }
    }
    getNodosAST() {
        var nodo = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]("ATRIBUTO"); //PADRE SELECT
        if (this.tipoAtributo === ".") {
            var nodoselect = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"](this.Operacion);
            nodo.agregarHijoAST(nodoselect);
            nodo.agregarHijo(this.tipoAtributo);
        }
        else if (this.tipoAtributo === "*") {
            var nodoselect = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"](this.Operacion);
            nodo.agregarHijoAST(nodoselect);
            nodo.agregarHijo(this.tipoAtributo);
        }
        return nodo;
    }
}


/***/ }),

/***/ "8hwP":
/*!************************************************************!*\
  !*** ./src/app/componentes/side-bar/side-bar.component.ts ***!
  \************************************************************/
/*! exports provided: SideBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideBarComponent", function() { return SideBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/layout */ "0MNC");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");








function SideBarComponent_a_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const nav_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", nav_r2.route);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](nav_r2.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", nav_r2.name, "");
} }
class SideBarComponent {
    constructor(changeDetectorRef, media) {
        this.fillerNav = [
            { name: 'Principal', route: 'inicio', icon: 'home' },
            { name: 'Arbol CST Ascendente', route: 'ast', icon: 'share' },
            { name: 'Arbol CST Descendente', route: 'ast-desc', icon: 'gesture' },
            {
                name: 'Tabla Simbolos',
                route: 'simbolos',
                icon: 'view_quilt',
            },
            { name: 'Reporte gramatical', route: 'gramatical', icon: 'list_alt' },
            /*device_hub*/
            { name: 'Arbol AST', route: 'xpath-ast', icon: 'device_hub' },
            { name: 'Reporte Errores', route: 'errores', icon: 'coronavirus' },
        ];
        this.shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some((h) => h.test(window.location.host));
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    ngOnDestroy() {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
SideBarComponent.ɵfac = function SideBarComponent_Factory(t) { return new (t || SideBarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__["MediaMatcher"])); };
SideBarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SideBarComponent, selectors: [["app-sidebar"]], decls: 12, vars: 7, consts: [[1, "example-container"], ["color", "", 1, "example-toolbar"], ["id", "btn", "mat-icon-button", "", 3, "click"], [1, "example-app-name"], [1, "example-sidenav-container"], ["fixedTopGap", "56", 1, "matsnv", 3, "mode", "fixedInViewport"], ["snav", ""], ["mat-list-item", "", 3, "routerLink", 4, "ngFor", "ngForOf"], ["mat-list-item", "", 3, "routerLink"], [1, "icono"]], template: function SideBarComponent_Template(rf, ctx) { if (rf & 1) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SideBarComponent_Template_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](7); return _r0.toggle(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h1", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "TYTUSX");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-sidenav-container", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-sidenav", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-nav-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, SideBarComponent_a_9_Template, 4, 3, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-sidenav-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("example-is-mobile", ctx.mobileQuery.matches);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("margin-top", ctx.mobileQuery.matches ? 56 : 0, "px");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mode", ctx.mobileQuery.matches ? "over" : "side")("fixedInViewport", ctx.mobileQuery.matches);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.fillerNav);
    } }, directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_2__["MatToolbar"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__["MatSidenavContainer"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__["MatSidenav"], _angular_material_list__WEBPACK_IMPORTED_MODULE_4__["MatNavList"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__["MatSidenavContent"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterOutlet"], _angular_material_list__WEBPACK_IMPORTED_MODULE_4__["MatListItem"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterLinkWithHref"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__["MatIcon"]], styles: [".example-container[_ngcontent-%COMP%] {\r\n  display:flex;\r\n  flex-direction: column;\r\n  position:absolute;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n  font-family: \"Century Gothic\";\r\n}\r\n\r\n.example-is-mobile[_ngcontent-%COMP%]   .example-toolbar[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  \r\n  z-index: 2;\r\n}\r\n\r\n.example-toolbar[_ngcontent-%COMP%] {\r\n  background-color: #000057; \r\n}\r\n\r\nh1.example-app-name[_ngcontent-%COMP%] {\r\n  margin-left: 30%;\r\n  color: #c5e3f5;\r\n  font-size: 65px;\r\n  font-family:\"Century Gothic\"; \r\n  font-weight: bold;\r\n}\r\n\r\n.matsnv[_ngcontent-%COMP%] {\r\n  background-color: #109e8b;\r\n  color: #f9faf7;\r\n}\r\n\r\n#btn[_ngcontent-%COMP%] {\r\n  background-color: #000057;\r\n  border: none;\r\n  text-decoration: none;\r\n  width: 100px;\r\n  height: 100%;\r\n  background-image: url('mnwhit.svg');\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n}\r\n\r\n.example-sidenav-container[_ngcontent-%COMP%] {\r\n  \r\n  flex: 1;\r\n  background: #5d5dbb;\r\n  background: linear-gradient(to right, #59daeb, #5ff16b);\r\n}\r\n\r\n.example-is-mobile[_ngcontent-%COMP%]   .example-sidenav-container[_ngcontent-%COMP%] {\r\n  \r\n  flex: 1 0 auto;\r\n}\r\n\r\n.icono[_ngcontent-%COMP%] {\r\n  margin-right: 10%;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZGUtYmFyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFZO0VBQ1osc0JBQXNCO0VBQ3RCLGlCQUFpQjtFQUNqQixNQUFNO0VBQ04sU0FBUztFQUNULE9BQU87RUFDUCxRQUFRO0VBQ1IsNkJBQTZCO0FBQy9COztBQUVBO0VBQ0UsZUFBZTtFQUNmLDhFQUE4RTtFQUM5RSxVQUFVO0FBQ1o7O0FBQ0E7RUFDRSx5QkFBeUIsRUFBRSxPQUFPO0FBQ3BDOztBQUNBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxlQUFlO0VBQ2YsNEJBQTRCO0VBQzVCLGlCQUFpQjtBQUNuQjs7QUFDRTtFQUNBLHlCQUF5QjtFQUN6QixjQUFjO0FBQ2hCOztBQUNBO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixxQkFBcUI7RUFDckIsWUFBWTtFQUNaLFlBQVk7RUFDWixtQ0FBbUQ7RUFDbkQsNEJBQTRCO0VBQzVCLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFOzhGQUM0RjtFQUM1RixPQUFPO0VBQ1AsbUJBQW1CO0VBQ25CLHVEQUF1RDtBQUN6RDs7QUFFQTtFQUNFO21FQUNpRTtFQUNqRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25CIiwiZmlsZSI6InNpZGUtYmFyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZXhhbXBsZS1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6ZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gIHRvcDogMDtcclxuICBib3R0b206IDA7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxuICBmb250LWZhbWlseTogXCJDZW50dXJ5IEdvdGhpY1wiO1xyXG59XHJcblxyXG4uZXhhbXBsZS1pcy1tb2JpbGUgLmV4YW1wbGUtdG9vbGJhciB7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIC8qIE1ha2Ugc3VyZSB0aGUgdG9vbGJhciB3aWxsIHN0YXkgb24gdG9wIG9mIHRoZSBjb250ZW50IGFzIGl0IHNjcm9sbHMgcGFzdC4gKi9cclxuICB6LWluZGV4OiAyO1xyXG59XHJcbi5leGFtcGxlLXRvb2xiYXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwNTc7IC8qYmFyYSovXHJcbn1cclxuaDEuZXhhbXBsZS1hcHAtbmFtZSB7XHJcbiAgbWFyZ2luLWxlZnQ6IDMwJTtcclxuICBjb2xvcjogI2M1ZTNmNTtcclxuICBmb250LXNpemU6IDY1cHg7XHJcbiAgZm9udC1mYW1pbHk6XCJDZW50dXJ5IEdvdGhpY1wiOyBcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG4gIC5tYXRzbnYge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMxMDllOGI7XHJcbiAgY29sb3I6ICNmOWZhZjc7XHJcbn1cclxuI2J0biB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDA1NztcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIHdpZHRoOiAxMDBweDtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiLi4vLi4vLi4vYXNzZXRzL21ud2hpdC5zdmdcIik7XHJcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5leGFtcGxlLXNpZGVuYXYtY29udGFpbmVyIHtcclxuICAvKiBXaGVuIHRoZSBzaWRlbmF2IGlzIG5vdCBmaXhlZCwgc3RyZXRjaCB0aGUgc2lkZW5hdiBjb250YWluZXIgdG8gZmlsbCB0aGUgYXZhaWxhYmxlIHNwYWNlLiBUaGlzXHJcbiAgICAgICAgIGNhdXNlcyBgPG1hdC1zaWRlbmF2LWNvbnRlbnQ+YCB0byBhY3QgYXMgb3VyIHNjcm9sbGluZyBlbGVtZW50IGZvciBkZXNrdG9wIGxheW91dHMuICovXHJcbiAgZmxleDogMTtcclxuICBiYWNrZ3JvdW5kOiAjNWQ1ZGJiO1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgIzU5ZGFlYiwgIzVmZjE2Yik7XHJcbn1cclxuXHJcbi5leGFtcGxlLWlzLW1vYmlsZSAuZXhhbXBsZS1zaWRlbmF2LWNvbnRhaW5lciB7XHJcbiAgLyogV2hlbiB0aGUgc2lkZW5hdiBpcyBmaXhlZCwgZG9uJ3QgY29uc3RyYWluIHRoZSBoZWlnaHQgb2YgdGhlIHNpZGVuYXYgY29udGFpbmVyLiBUaGlzIGFsbG93cyB0aGVcclxuICAgICAgICAgYDxib2R5PmAgdG8gYmUgb3VyIHNjcm9sbGluZyBlbGVtZW50IGZvciBtb2JpbGUgbGF5b3V0cy4gKi9cclxuICBmbGV4OiAxIDAgYXV0bztcclxufVxyXG5cclxuLmljb25vIHtcclxuICBtYXJnaW4tcmlnaHQ6IDEwJTtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "9iyb":
/*!*****************************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Abstracto/Instruccion.ts ***!
  \*****************************************************************/
/*! exports provided: Instruccion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Instruccion", function() { return Instruccion; });
class Instruccion {
    constructor(tipo, fila, columna) {
        this.tipoDato = tipo;
        this.fila = fila;
        this.columna = columna;
    }
}


/***/ }),

/***/ "Agoi":
/*!****************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/GramaticaXPathDesc.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var GramaticaXPathDesc = (function () {
    var o = function (k, v, o, l) { for (o = o || {}, l = k.length; l--; o[k[l]] = v)
        ; return o; }, $V0 = [5, 7], $V1 = [2, 10], $V2 = [1, 4], $V3 = [1, 22], $V4 = [1, 23], $V5 = [1, 8], $V6 = [1, 9], $V7 = [1, 10], $V8 = [1, 11], $V9 = [1, 12], $Va = [1, 13], $Vb = [1, 14], $Vc = [1, 15], $Vd = [1, 16], $Ve = [1, 17], $Vf = [1, 18], $Vg = [1, 19], $Vh = [1, 20], $Vi = [1, 21], $Vj = [5, 7, 20, 22, 38, 39, 40, 41, 42, 43, 45, 46, 47, 48, 49], $Vk = [1, 27], $Vl = [1, 41], $Vm = [1, 47], $Vn = [1, 48], $Vo = [1, 36], $Vp = [1, 37], $Vq = [1, 38], $Vr = [1, 39], $Vs = [1, 40], $Vt = [1, 42], $Vu = [1, 43], $Vv = [1, 44], $Vw = [1, 45], $Vx = [1, 46], $Vy = [5, 7, 8, 13, 14, 15, 50, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63], $Vz = [5, 7, 8, 14, 15, 20, 22, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63], $VA = [1, 67], $VB = [5, 7, 8, 13, 14, 15, 20, 22, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63], $VC = [5, 7, 8, 13, 15, 20, 22, 50, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63], $VD = [1, 81], $VE = [1, 73], $VF = [1, 74], $VG = [1, 75], $VH = [1, 76], $VI = [1, 77], $VJ = [1, 78], $VK = [1, 79], $VL = [1, 80], $VM = [1, 82], $VN = [1, 83], $VO = [1, 84], $VP = [1, 85], $VQ = [2, 39], $VR = [5, 7, 8, 13, 14, 15, 16, 19, 20, 21, 22, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63], $VS = [2, 44], $VT = [14, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49];
    var parser = { trace: function trace() { },
        yy: {},
        symbols_: { "error": 2, "START": 3, "INSTRUCCIONES": 4, "EOF": 5, "INSTRUCCION": 6, "OPTION": 7, "BARRA": 8, "EXPRESION": 9, "ATRIBUTO": 10, "AXES": 11, "ALL": 12, "SELECT": 13, "MULTIPLICACION": 14, "ATRIBUTOS": 15, "IDENTIFICADOR": 16, "L_CORCHETES": 17, "PREDICADOS": 18, "CORCHETEIZQ": 19, "CORCHETEDER": 20, "PARIZQ": 21, "PARDER": 22, "COMA": 23, "TERMINO": 24, "OPLOGICAS": 25, "OPARITMETICAS": 26, "OPRELACIONAL": 27, "UNARIO": 28, "CADENA": 29, "entero": 30, "NUMBER": 31, "CARACTER_LITERAL": 32, "STRING_LITERAL": 33, "LAST": 34, "POSITION": 35, "NODE": 36, "TEXT": 37, "IGUAL": 38, "NOIGUAL": 39, "MENORQUE": 40, "MENORIGUAL": 41, "MAYORQUE": 42, "MAYORIGUAL": 43, "MENOS": 44, "MAS": 45, "DIVISION": 46, "MODULO": 47, "OR": 48, "AND": 49, "ANCESTOR": 50, "DOSPUNTOS": 51, "ANCESTORSELF": 52, "ATTRIBUTE": 53, "CHILD": 54, "DESCENDENT": 55, "DESCENDENTSELF": 56, "FOLLOWING": 57, "FOLLOWINGSIBLI": 58, "NAMESPACE": 59, "PARENT": 60, "PRECEDING": 61, "PRECEDINGSIBLI": 62, "SELF": 63, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 7: "OPTION", 8: "BARRA", 13: "SELECT", 14: "MULTIPLICACION", 15: "ATRIBUTOS", 16: "IDENTIFICADOR", 19: "CORCHETEIZQ", 20: "CORCHETEDER", 21: "PARIZQ", 22: "PARDER", 23: "COMA", 29: "CADENA", 30: "entero", 31: "NUMBER", 32: "CARACTER_LITERAL", 33: "STRING_LITERAL", 34: "LAST", 35: "POSITION", 36: "NODE", 37: "TEXT", 38: "IGUAL", 39: "NOIGUAL", 40: "MENORQUE", 41: "MENORIGUAL", 42: "MAYORQUE", 43: "MAYORIGUAL", 44: "MENOS", 45: "MAS", 46: "DIVISION", 47: "MODULO", 48: "OR", 49: "AND", 50: "ANCESTOR", 51: "DOSPUNTOS", 52: "ANCESTORSELF", 53: "ATTRIBUTE", 54: "CHILD", 55: "DESCENDENT", 56: "DESCENDENTSELF", 57: "FOLLOWING", 58: "FOLLOWINGSIBLI", 59: "NAMESPACE", 60: "PARENT", 61: "PRECEDING", 62: "PRECEDINGSIBLI", 63: "SELF" },
        productions_: [0, [3, 2], [4, 2], [4, 1], [4, 3], [6, 3], [6, 2], [6, 1], [6, 1], [6, 1], [6, 0], [12, 2], [12, 1], [12, 1], [10, 2], [10, 2], [10, 2], [10, 3], [18, 1], [18, 2], [17, 4], [17, 3], [17, 4], [17, 3], [9, 3], [9, 3], [9, 3], [9, 2], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [24, 1], [24, 1], [24, 1], [24, 1], [24, 1], [24, 1], [24, 3], [24, 3], [24, 3], [24, 3], [24, 1], [25, 1], [25, 1], [25, 1], [25, 1], [25, 1], [25, 1], [26, 1], [26, 1], [26, 1], [26, 1], [26, 1], [27, 1], [27, 1], [28, 1], [11, 4], [11, 4], [11, 4], [11, 4], [11, 4], [11, 4], [11, 4], [11, 4], [11, 4], [11, 4], [11, 4], [11, 4], [11, 4]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */
            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    return $$[$0 - 1];
                    break;
                case 2:
                    if ($$[$0 - 1] != false)
                        $$[$0].push($$[$0 - 1]);
                    this.$ = $$[$0];
                    break;
                case 3:
                case 18:
                    this.$ = ($$[$0] != false) ? [$$[$0]] : [];
                    break;
                case 4:
                    if ($$[$0 - 2] != false)
                        $$[$0].push($$[$0 - 2]);
                    this.$ = $$[$0];
                    break;
                case 5:
                    this.$ = new barrasnodo.default($$[$0 - 2], $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 1]);
                    break;
                case 6:
                    this.$ = new barrasnodo.default($$[$0 - 1], $$[$0], _$[$0 - 1].first_line, _$[$0 - 1].first_column, null);
                    break;
                case 7:
                case 8:
                case 9:
                case 28:
                case 29:
                case 30:
                case 31:
                case 32:
                case 33:
                case 44:
                    this.$ = $$[$0];
                    break;
                case 11:
                    this.$ = new selectroot.default($$[$0 - 1], _$[$0 - 1].first_line, _$[$0 - 1].first_column, $$[$0]);
                    break;
                case 12:
                    this.$ = new selectroot.default($$[$0], _$[$0].first_line, _$[$0].first_column, null);
                    break;
                case 13:
                    this.$ = new todo.default($$[$0], _$[$0].first_line, _$[$0].first_column);
                    break;
                case 14:
                    this.$ = new atributosexpresion.default($$[$0 - 1], $$[$0], _$[$0 - 1].first_line, _$[$0 - 1].first_column);
                    break;
                case 15:
                case 16:
                    this.$ = new atributosimple.default($$[$0 - 1], $$[$0], _$[$0 - 1].first_line, _$[$0 - 1].first_column);
                    break;
                case 17:
                    this.$ = new atributospredicado.default($$[$0 - 1], $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                    break;
                case 19:
                    this.$ = new predicado.default($$[$0 - 1], $$[$0], _$[$0 - 1].first_line, _$[$0 - 1].first_column);
                    break;
                case 20:
                    this.$ = new arreglos.default($$[$0], _$[$0 - 3].first_line, _$[$0 - 3].first_column, $$[$0 - 2]);
                    break;
                case 21:
                    this.$ = new arreglos.default(null, _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 1]);
                    break;
                case 22:
                    this.$ = new parentesis.default($$[$0 - 2], _$[$0 - 3].first_line, _$[$0 - 3].first_column, $$[$0]);
                    break;
                case 23:
                    this.$ = new parentesis.default($$[$0 - 1], _$[$0 - 2].first_line, _$[$0 - 2].first_column, null);
                    break;
                case 24:
                    this.$ = new logica.default($$[$0 - 1], _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 2], $$[$0]);
                    break;
                case 25:
                    this.$ = new aritmetica.default($$[$0 - 1], _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 2], $$[$0]);
                    break;
                case 26:
                    new relacional.default($$[$0 - 1], _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 2], $$[$0]);
                    break;
                case 27:
                    this.$ = new aritmetica.default($$[$0 - 1], _$[$0 - 1].first_line, _$[$0 - 1].first_column, $$[$0], null);
                    break;
                case 34:
                case 38:
                    this.$ = new nativo.default(new Tipo.default(Tipo.tipoDato.CADENA), $$[$0], _$[$0].first_line, _$[$0].first_column);
                    break;
                case 35:
                    this.$ = new nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO), $$[$0], _$[$0].first_line, _$[$0].first_column);
                    break;
                case 36:
                    this.$ = new nativo.default(new Tipo.default(Tipo.tipoDato.DECIMAL), $$[$0], _$[$0].first_line, _$[$0].first_column);
                    break;
                case 37:
                    this.$ = new nativo.default(new Tipo.default(Tipo.tipoDato.CARACTER), $$[$0], _$[$0].first_line, _$[$0].first_column);
                    break;
                case 39:
                    this.$ = new identificador.default($$[$0], _$[$0].first_line, _$[$0].first_column);
                    break;
                case 40:
                case 41:
                case 42:
                case 43:
                    this.$ = new especiales.default($$[$0 - 2], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                    break;
                case 45:
                    this.$ = relacional.Relacionales.IGUAL;
                    break;
                case 46:
                    this.$ = relacional.Relacionales.NOIGUAL;
                    break;
                case 47:
                    this.$ = relacional.Relacionales.MENOR;
                    break;
                case 48:
                    this.$ = relacional.Relacionales.MENORIGUAL;
                    break;
                case 49:
                    this.$ = relacional.Relacionales.MAYOR;
                    break;
                case 50:
                    this.$ = relacional.Relacionales.MAYORIGUAL;
                    break;
                case 51:
                    this.$ = aritmetica.Operadores.RESTA;
                    break;
                case 52:
                    this.$ = aritmetica.Operadores.SUMA;
                    break;
                case 53:
                    this.$ = aritmetica.Operadores.MULTIPLICACION;
                    break;
                case 54:
                    this.$ = aritmetica.Operadores.DIVISION;
                    break;
                case 55:
                    this.$ = aritmetica.Operadores.MODULADOR;
                    break;
                case 56:
                    this.$ = logica.Logicas.OR;
                    break;
                case 57:
                    this.$ = logica.Logicas.AND;
                    break;
                case 58:
                    this.$ = aritmetica.Operadores.MENOSNUM;
                    break;
                case 59:
                case 60:
                case 61:
                case 62:
                case 63:
                case 64:
                case 65:
                case 66:
                case 67:
                case 68:
                case 69:
                case 70:
                case 71:
                    this.$ = new axes.default($$[$0 - 3], $$[$0], _$[$0 - 3].first_line, _$[$0 - 3].first_column);
                    break;
            }
        },
        table: [o($V0, $V1, { 3: 1, 4: 2, 6: 3, 10: 5, 11: 6, 12: 7, 8: $V2, 13: $V3, 14: $V4, 15: $V5, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), { 1: [3] }, { 5: [1, 24] }, { 4: 25, 5: [2, 3], 6: 3, 7: [1, 26], 8: $V2, 10: 5, 11: 6, 12: 7, 13: $V3, 14: $V4, 15: $V5, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }, o($Vj, $V1, { 9: 28, 24: 29, 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 8: $Vk, 13: $V3, 14: $V4, 15: $V5, 16: $Vl, 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o($Vy, [2, 7]), o($Vy, [2, 8]), o($Vy, [2, 9]), o($Vj, $V1, { 24: 29, 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 9: 50, 8: $V2, 13: [1, 51], 14: [1, 52], 15: $V5, 16: [1, 53], 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), { 51: [1, 54] }, { 51: [1, 55] }, { 51: [1, 56] }, { 51: [1, 57] }, { 51: [1, 58] }, { 51: [1, 59] }, { 51: [1, 60] }, { 51: [1, 61] }, { 51: [1, 62] }, { 51: [1, 63] }, { 51: [1, 64] }, { 51: [1, 65] }, { 51: [1, 66] }, o($Vz, [2, 12], { 13: $VA }), o($VB, [2, 13]), { 1: [2, 1] }, { 5: [2, 2] }, o($V0, $V1, { 6: 3, 10: 5, 11: 6, 12: 7, 4: 68, 8: $V2, 13: $V3, 14: $V4, 15: $V5, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o($Vj, $V1, { 24: 29, 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 9: 69, 8: $Vk, 13: $V3, 14: $V4, 15: $V5, 16: $Vl, 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o($VB, [2, 6]), o($VC, [2, 28], { 25: 70, 26: 71, 27: 72, 14: $VD, 38: $VE, 39: $VF, 40: $VG, 41: $VH, 42: $VI, 43: $VJ, 44: $VK, 45: $VL, 46: $VM, 47: $VN, 48: $VO, 49: $VP }), o($Vj, $V1, { 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 24: 86, 9: 87, 8: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $Vl, 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o($VB, [2, 29]), o($VB, [2, 30]), o($VB, [2, 31]), o($VB, [2, 32]), o($VB, [2, 33]), o($VB, [2, 34]), o($VB, [2, 35]), o($VB, [2, 36]), o($VB, [2, 37]), o($VB, [2, 38]), o($VB, $VQ, { 17: 88, 19: $Vm, 21: $Vn }), { 21: [1, 89] }, { 21: [1, 90] }, { 21: [1, 91] }, { 21: [1, 92] }, o($VR, [2, 58]), o([20, 38, 39, 40, 41, 42, 43, 45, 46, 47, 48, 49], $V1, { 24: 29, 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 9: 93, 8: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $Vl, 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o([22, 38, 39, 40, 41, 42, 43, 45, 46, 47, 48, 49], $V1, { 24: 29, 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 9: 94, 8: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $Vl, 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o($VB, [2, 18]), o($VB, [2, 14]), o($Vz, [2, 15], { 13: $VA }), o($VB, [2, 16]), o($VB, $VQ, { 17: 95, 19: $Vm, 21: $Vn }), { 51: [1, 96] }, { 51: [1, 97] }, { 51: [1, 98] }, { 51: [1, 99] }, { 51: [1, 100] }, { 51: [1, 101] }, { 51: [1, 102] }, { 51: [1, 103] }, { 51: [1, 104] }, { 51: [1, 105] }, { 51: [1, 106] }, { 51: [1, 107] }, { 51: [1, 108] }, o($VB, [2, 11]), { 5: [2, 4] }, o($VB, [2, 5]), o($Vj, $V1, { 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 9: 87, 24: 109, 8: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $Vl, 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o($Vj, $V1, { 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 9: 87, 24: 110, 8: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $Vl, 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o($Vj, $V1, { 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 9: 87, 24: 111, 8: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $Vl, 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o($VR, [2, 45]), o($VR, [2, 46]), o($VR, [2, 47]), o($VR, [2, 48]), o($VR, [2, 49]), o($VR, [2, 50]), o($VR, [2, 51]), o($VR, [2, 52]), o($VR, [2, 53]), o($VR, [2, 54]), o($VR, [2, 55]), o($VR, [2, 56]), o($VR, [2, 57]), o($VC, [2, 27], { 25: 70, 26: 71, 27: 72, 14: $VD, 38: $VE, 39: $VF, 40: $VG, 41: $VH, 42: $VI, 43: $VJ, 44: $VK, 45: $VL, 46: $VM, 47: $VN, 48: $VO, 49: $VP }), o($VB, $VS), o($VB, [2, 19]), { 22: [1, 112] }, { 22: [1, 113] }, { 22: [1, 114] }, { 22: [1, 115] }, o($VT, $VS, { 20: [1, 116] }), o($VT, $VS, { 22: [1, 117] }), o($VB, [2, 17]), o($Vj, $V1, { 24: 29, 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 9: 118, 8: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $Vl, 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o($Vj, $V1, { 24: 29, 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 9: 119, 8: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $Vl, 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o($Vj, $V1, { 24: 29, 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 9: 120, 8: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $Vl, 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o($Vj, $V1, { 24: 29, 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 9: 121, 8: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $Vl, 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o($Vj, $V1, { 24: 29, 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 9: 122, 8: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $Vl, 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o($Vj, $V1, { 24: 29, 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 9: 123, 8: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $Vl, 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o($Vj, $V1, { 24: 29, 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 9: 124, 8: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $Vl, 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o($Vj, $V1, { 24: 29, 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 9: 125, 8: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $Vl, 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o($Vj, $V1, { 24: 29, 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 9: 126, 8: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $Vl, 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o($Vj, $V1, { 24: 29, 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 9: 127, 8: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $Vl, 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o($Vj, $V1, { 24: 29, 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 9: 128, 8: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $Vl, 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o($Vj, $V1, { 24: 29, 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 9: 129, 8: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $Vl, 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o($Vj, $V1, { 24: 29, 28: 30, 17: 31, 12: 32, 11: 33, 10: 34, 18: 35, 6: 49, 9: 130, 8: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $Vl, 19: $Vm, 21: $Vn, 29: $Vo, 30: $Vp, 31: $Vq, 32: $Vr, 33: $Vs, 34: $Vt, 35: $Vu, 36: $Vv, 37: $Vw, 44: $Vx, 50: $V6, 52: $V7, 53: $V8, 54: $V9, 55: $Va, 56: $Vb, 57: $Vc, 58: $Vd, 59: $Ve, 60: $Vf, 61: $Vg, 62: $Vh, 63: $Vi }), o($VC, [2, 24], { 25: 70, 26: 71, 27: 72, 14: $VD, 38: $VE, 39: $VF, 40: $VG, 41: $VH, 42: $VI, 43: $VJ, 44: $VK, 45: $VL, 46: $VM, 47: $VN, 48: $VO, 49: $VP }), o($VC, [2, 25], { 25: 70, 26: 71, 27: 72, 14: $VD, 38: $VE, 39: $VF, 40: $VG, 41: $VH, 42: $VI, 43: $VJ, 44: $VK, 45: $VL, 46: $VM, 47: $VN, 48: $VO, 49: $VP }), o($VC, [2, 26], { 25: 70, 26: 71, 27: 72, 14: $VD, 38: $VE, 39: $VF, 40: $VG, 41: $VH, 42: $VI, 43: $VJ, 44: $VK, 45: $VL, 46: $VM, 47: $VN, 48: $VO, 49: $VP }), o($VB, [2, 40]), o($VB, [2, 41]), o($VB, [2, 42]), o($VB, [2, 43]), o($VB, [2, 21], { 17: 131, 19: $Vm, 21: $Vn }), o($VB, [2, 23], { 23: [1, 132] }), o($VB, [2, 59]), o($VB, [2, 60]), o($VB, [2, 61]), o($VB, [2, 62]), o($VB, [2, 63]), o($VB, [2, 64]), o($VB, [2, 65]), o($VB, [2, 66]), o($VB, [2, 67]), o($VB, [2, 68]), o($VB, [2, 69]), o($VB, [2, 70]), o($VB, [2, 71]), o($VB, [2, 20]), o($VB, [2, 22])],
        defaultActions: { 24: [2, 1], 25: [2, 2], 68: [2, 4] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            }
            else {
                var error = new Error(str);
                error.hash = hash;
                throw error;
            }
        },
        parse: function parse(input) {
            var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = { yy: {} };
            for (var k in this.yy) {
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState.yy[k] = this.yy[k];
                }
            }
            lexer.setInput(input, sharedState.yy);
            sharedState.yy.lexer = lexer;
            sharedState.yy.parser = this;
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            }
            else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            _token_stack: var lex = function () {
                var token;
                token = lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token;
            };
            var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                }
                else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    }
                    else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(lexer.yytext);
                        lstack.push(lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        }
                        else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [
                                lstack[lstack.length - (len || 1)].range[0],
                                lstack[lstack.length - 1].range[1]
                            ];
                        }
                        r = this.performAction.apply(yyval, [
                            yytext,
                            yyleng,
                            yylineno,
                            sharedState.yy,
                            action[1],
                            vstack,
                            lstack
                        ].concat(args));
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        } };
    const barrasnodo = __webpack_require__(/*! ./Instrucciones/BarrasNodo */ "jtD6");
    const identificador = __webpack_require__(/*! ./Expresiones/Identificador */ "/mHx");
    const CErrores = __webpack_require__(/*! ./Excepciones/Errores */ "5Y53");
    const CNodoErrores = __webpack_require__(/*! ./Excepciones/NodoErrores */ "E7Rf");
    const inicio = __webpack_require__(/*! ../../../componentes/contenido-inicio/contenido-inicio.component */ "CbqC");
    const selectroot = __webpack_require__(/*! ./Instrucciones/SelectRoot */ "0iGS");
    const todo = __webpack_require__(/*! ./Instrucciones/todo */ "avIU");
    const atributosimple = __webpack_require__(/*! ./Instrucciones/AtributosSimples */ "6clo");
    const atributosexpresion = __webpack_require__(/*! ./Instrucciones/AtributosExpresion */ "iolQ");
    const atributospredicado = __webpack_require__(/*! ./Instrucciones/AtributosPredicado */ "v19a");
    const predicado = __webpack_require__(/*! ./Instrucciones/Predicados */ "+QV2");
    const arreglos = __webpack_require__(/*! ./Instrucciones/Arreglos */ "C7AR");
    const parentesis = __webpack_require__(/*! ./Expresiones/ParentesisExpresion */ "DdrW");
    const axes = __webpack_require__(/*! ./Funciones/Axes */ "x2tA");
    const especiales = __webpack_require__(/*! ./Funciones/Especiales */ "VOP4");
    const nativo = __webpack_require__(/*! ./Expresiones/Nativo */ "5beR");
    const Tipo = __webpack_require__(/*! ./Simbolos/Tipo */ "HVYh");
    const aritmetica = __webpack_require__(/*! ./Expresiones/Aritmetica */ "0NkC");
    const logica = __webpack_require__(/*! ./Expresiones/Logica */ "j/FN");
    const relacional = __webpack_require__(/*! ./Expresiones/Relacional */ "mh+0");
    /* generated by jison-lex 0.3.4 */
    var lexer = (function () {
        var lexer = ({
            EOF: 1,
            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                }
                else {
                    throw new Error(str);
                }
            },
            // resets the lexer, sets new input
            setInput: function (input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },
            // consumes and returns one char from the input
            input: function () {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                }
                else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }
                this._input = this._input.slice(1);
                return ch;
            },
            // unshifts one char (or a string) into the input
            unput: function (ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);
                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);
                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;
                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ?
                        (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                            + oldLines[oldLines.length - lines.length].length - lines[0].length :
                        this.yylloc.first_column - len
                };
                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },
            // When called from action, caches matched text and appends it on next action
            more: function () {
                this._more = true;
                return this;
            },
            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function () {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },
            // retain first n characters of the match
            less: function (n) {
                this.unput(this.match.slice(n));
            },
            // displays already matched input, i.e. for error messages
            pastInput: function () {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },
            // displays upcoming input, i.e. for error messages
            upcomingInput: function () {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },
            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function () {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },
            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function (match, indexed_rule) {
                var token, lines, backup;
                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }
                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ?
                        lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                        this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                }
                else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },
            // return next match in input
            next: function () {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }
                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            }
                            else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            }
                            else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        }
                        else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },
            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                }
                else {
                    return this.lex();
                }
            },
            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },
            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                }
                else {
                    return this.conditionStack[0];
                }
            },
            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                }
                else {
                    return this.conditions["INITIAL"].rules;
                }
            },
            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                }
                else {
                    return "INITIAL";
                }
            },
            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },
            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: { "case-insensitive": true },
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0: /* skip whitespace */
                        break;
                    case 1: // comentario simple línea
                        break;
                    case 2: // comentario multiple líneas
                        break;
                    case 3:
                        return 52;
                        break;
                    case 4:
                        return 56;
                        break;
                    case 5:
                        return 58;
                        break;
                    case 6:
                        return 62;
                        break;
                    case 7:
                        return 30;
                        break;
                    case 8:
                        return 33;
                        break;
                    case 9:
                        return 32;
                        break;
                    case 10:
                        return 50;
                        break;
                    case 11:
                        return 53;
                        break;
                    case 12:
                        return 54;
                        break;
                    case 13:
                        return 55;
                        break;
                    case 14:
                        return 57;
                        break;
                    case 15:
                        return 59;
                        break;
                    case 16:
                        return 60;
                        break;
                    case 17:
                        return 61;
                        break;
                    case 18:
                        return 63;
                        break;
                    case 19:
                        return 34;
                        break;
                    case 20:
                        return 35;
                        break;
                    case 21:
                        return 36;
                        break;
                    case 22:
                        return 37;
                        break;
                    case 23:
                        return 48;
                        break;
                    case 24:
                        return 49;
                        break;
                    case 25:
                        return 47;
                        break;
                    case 26:
                        return 46;
                        break;
                    case 27:
                        return 15;
                        break;
                    case 28:
                        return 16;
                        break;
                    case 29:
                        return 29;
                        break;
                    case 30:
                        return 'DECIMAL';
                        break;
                    case 31:
                        return 31;
                        break;
                    case 32:
                        return 8;
                        break;
                    case 33:
                        return 41;
                        break;
                    case 34:
                        return 43;
                        break;
                    case 35:
                        return 40;
                        break;
                    case 36:
                        return 42;
                        break;
                    case 37:
                        return 'INTERROGACION';
                        break;
                    case 38:
                        return 38;
                        break;
                    case 39:
                        return 21;
                        break;
                    case 40:
                        return 22;
                        break;
                    case 41:
                        return 19;
                        break;
                    case 42:
                        return 20;
                        break;
                    case 43:
                        return 23;
                        break;
                    case 44:
                        return 7;
                        break;
                    case 45:
                        return 45;
                        break;
                    case 46:
                        return 44;
                        break;
                    case 47:
                        return 14; /* SELECTALL TAMBIEN*/
                        break;
                    case 48:
                        return 38;
                        break;
                    case 49:
                        return 39;
                        break;
                    case 50:
                        return 51;
                        break;
                    case 51:
                        return 13;
                        break;
                    case 52:
                        return 5;
                        break;
                    case 53:
                        return 'INVALID';
                        break;
                }
            },
            rules: [/^(?:\s+)/i, /^(?:\/\/.*)/i, /^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/i, /^(?:ancestor-or-self\b)/i, /^(?:descendant-or-self\b)/i, /^(?:following-sibling\b)/i, /^(?:preceding-sibling\b)/i, /^(?:([0-9]+(\.[0-9]+)?))/i, /^(?:(("(\\"|[^"]|\n)*")))/i, /^(?:(('[^']*')))/i, /^(?:ancestor\b)/i, /^(?:attribute\b)/i, /^(?:child\b)/i, /^(?:descendant\b)/i, /^(?:following\b)/i, /^(?:namespace\b)/i, /^(?:parent\b)/i, /^(?:preceding\b)/i, /^(?:self\b)/i, /^(?:last\b)/i, /^(?:position\b)/i, /^(?:node\b)/i, /^(?:text\b)/i, /^(?:or\b)/i, /^(?:and\b)/i, /^(?:mod\b)/i, /^(?:div\b)/i, /^(?:@)/i, /^(?:([a-zA-Z])[a-zA-Z0-9_!#$%&(),.\*\^Ññáéíúó]*)/i, /^(?:"[^\"]*")/i, /^(?:[0-9]+(\.[0-9]+)\b)/i, /^(?:[0-9]+(\.[0-9]+)?\b)/i, /^(?:\/)/i, /^(?:<=)/i, /^(?:>=)/i, /^(?:<)/i, /^(?:>)/i, /^(?:\?)/i, /^(?:=)/i, /^(?:\()/i, /^(?:\))/i, /^(?:\[)/i, /^(?:\])/i, /^(?:,)/i, /^(?:\|)/i, /^(?:\+)/i, /^(?:-)/i, /^(?:\*)/i, /^(?:=)/i, /^(?:!=)/i, /^(?::)/i, /^(?:\.)/i, /^(?:$)/i, /^(?:.)/i],
            conditions: { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53], "inclusive": true } }
        });
        return lexer;
    })();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;
    parser.Parser = Parser;
    return new Parser;
})();
if (true) {
    exports.parser = GramaticaXPathDesc;
    exports.Parser = GramaticaXPathDesc.Parser;
    exports.parse = function () { return GramaticaXPathDesc.parse.apply(GramaticaXPathDesc, arguments); };
    exports.main = function commonjsMain(args) {
        if (!args[1]) {
            console.log('Usage: ' + args[0] + ' FILE');
            process.exit(1);
        }
        var source = __webpack_require__(/*! fs */ 3).readFileSync(__webpack_require__(/*! path */ 4).normalize(args[1]), "utf8");
        return exports.parser.parse(source);
    };
    if ( true && __webpack_require__.c[__webpack_require__.s] === module) {
        exports.main(process.argv.slice(1));
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "YuTi")(module)))

/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "C7AR":
/*!********************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Instrucciones/Arreglos.ts ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Arreglos; });
/* harmony import */ var _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Abstracto/Instruccion */ "ssiu");
/* harmony import */ var _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Abstracto/nodoAST */ "GvuX");
/* harmony import */ var _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Simbolos/Tipo */ "HVYh");



class Arreglos extends _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__["Instruccion"] {
    constructor(objetos, fila, columna, instruccion) {
        super(new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipoDato"].ENTERO), fila, columna);
        this.l_corchetes = instruccion;
        this.expresion = objetos;
    }
    getNodosAST() {
        let nodo = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]('L_CORCHETES');
        /*
         *ESTE SE USARÁ PARA LOS CASOS
         * CORCHETEIZQ EXPRESION CORCHETEDER
         * L_CORCHETES CORCHETEIZQ EXPRESION CORCHETEDER
         */
        if (this.l_corchetes != null) {
            nodo.agregarHijoAST(this.l_corchetes.getNodosAST());
        }
        if (this.expresion != null) {
            nodo.agregarHijoAST(this.expresion.getNodosAST());
        }
        return nodo;
    }
    interpretar(arbol, tabla) {
        //let variable = tabla.getVariable(this.identificador);
        /*if (variable != null) {
          this.tipoDato = variable.gettipo();
          return variable.getvalor();
        } else {
          return new Errores(
            'SEMANTICO',
            'VARIABLE ' + this.identificador + ' NO EXISTE',
            this.fila,
            this.columna
          );
        }*/
    }
}


/***/ }),

/***/ "CbqC":
/*!****************************************************************************!*\
  !*** ./src/app/componentes/contenido-inicio/contenido-inicio.component.ts ***!
  \****************************************************************************/
/*! exports provided: listaErrores, ContenidoInicioComponent, Pruebas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listaErrores", function() { return listaErrores; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContenidoInicioComponent", function() { return ContenidoInicioComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pruebas", function() { return Pruebas; });
/* harmony import */ var src_app_Backend_XML_Analizador_Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Excepciones/NodoErrores */ "cikY");
/* harmony import */ var src_app_Backend_XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos */ "TD3t");
/* harmony import */ var src_app_Backend_XML_Analizador_GramaticaXML__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/GramaticaXML */ "EHLN");
/* harmony import */ var src_app_Backend_XML_Analizador_GramaticaXML__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(src_app_Backend_XML_Analizador_GramaticaXML__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var src_app_Backend_XML_Analizador_GramaticaXMLDescPRUEBA__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/GramaticaXMLDescPRUEBA */ "pcrZ");
/* harmony import */ var src_app_Backend_XML_Analizador_GramaticaXMLDescPRUEBA__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(src_app_Backend_XML_Analizador_GramaticaXMLDescPRUEBA__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var src_app_Backend_XPATH_Analizador_GramaticaXPath__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Backend/XPATH/Analizador/GramaticaXPath */ "27sk");
/* harmony import */ var src_app_Backend_XPATH_Analizador_GramaticaXPath__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(src_app_Backend_XPATH_Analizador_GramaticaXPath__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_Backend_XPATH_Analizador_GramaticaXPathDesc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Backend/XPATH/Analizador/GramaticaXPathDesc */ "Agoi");
/* harmony import */ var src_app_Backend_XPATH_Analizador_GramaticaXPathDesc__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(src_app_Backend_XPATH_Analizador_GramaticaXPathDesc__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var src_app_Backend_XML_Analizador_XMLgraph__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/XMLgraph */ "kaQ3");
/* harmony import */ var src_app_Backend_XML_Analizador_XMLgraph__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(src_app_Backend_XML_Analizador_XMLgraph__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var src_app_Backend_XML_Analizador_Simbolos_Arbol__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Simbolos/Arbol */ "0PyG");
/* harmony import */ var src_app_Backend_XPATH_Analizador_Simbolos_Arbol__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Backend/XPATH/Analizador/Simbolos/Arbol */ "T4Rd");
/* harmony import */ var src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Abstracto/nodoAST */ "2sLK");
/* harmony import */ var src_app_Backend_XPATH_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Backend/XPATH/Analizador/Abstracto/nodoAST */ "GvuX");
/* harmony import */ var src_app_Backend_XML_Analizador_Expresiones_Objeto__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Expresiones/Objeto */ "xzWR");
/* harmony import */ var src_app_Backend_XML_Analizador_Reportes_reporteTabla__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Reportes/reporteTabla */ "Mc8n");
/* harmony import */ var src_app_Backend_XPATH_Analizador_Instrucciones_BarrasNodo__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/Backend/XPATH/Analizador/Instrucciones/BarrasNodo */ "jtD6");
/* harmony import */ var src_app_Backend_XPATH_Analizador_Funciones_Axes__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/Backend/XPATH/Analizador/Funciones/Axes */ "x2tA");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_servicios_inicio_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/servicios/inicio.service */ "2/nI");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");



















let listaErrores;
class ContenidoInicioComponent {
    constructor(inicioSrv, dialog) {
        this.inicioSrv = inicioSrv;
        this.dialog = dialog;
        this.tablaGlobal = new src_app_Backend_XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.code = '';
        this.contenido = '';
        /****************************************************************************************************************/
        this.textoEsperado = '';
        this.code = 'asd';
    }
    ngOnInit() { }
    ngAfterViewInit() {
        this.data = JSON.parse(localStorage.getItem('contenido'));
        if (this.data != '' || this.data != undefined) {
            this.mostrarContenido(this.data.console, 'consolas');
        }
    }
    colocarConsola(res, texto) {
        const dataObject = {
            text: 'asd',
            console: 'res',
        };
        localStorage.setItem('consulta', JSON.stringify(dataObject));
    }
    getConsola() {
        this.data = JSON.parse(localStorage.getItem('contenido'));
        if (this.data != '' || this.data != undefined) {
            this.mostrarContenido(this.data.text, 'contenido');
        }
    }
    /*A R B O L  A S C E N D E N T E */
    interpretarContenido(texto) {
        listaErrores = new Array();
        if (texto == null)
            return document.write('Error');
        try {
            const analizador = src_app_Backend_XML_Analizador_GramaticaXML__WEBPACK_IMPORTED_MODULE_2__;
            const objetos = analizador.parse(texto);
            var Tree = new src_app_Backend_XML_Analizador_Simbolos_Arbol__WEBPACK_IMPORTED_MODULE_7__["default"]([objetos]);
            Tree.settablaGlobal(this.tablaGlobal);
            //  PARA GUARDAR DATOS
            // TODO FOR INTERPRETAR
            for (let i of Tree.getinstrucciones()) {
                if (i instanceof src_app_Backend_XML_Analizador_Expresiones_Objeto__WEBPACK_IMPORTED_MODULE_11__["default"]) {
                    var objetito = i.interpretar(Tree, this.tablaGlobal); //retorna simbolo
                    this.tablaGlobal.setVariable(objetito);
                }
            }
            console.log(this.tablaGlobal);
            for (var key of this.tablaGlobal.tablaActual) {
                //alert(key + " = " + value);
                var atributos = "";
                var listaobjetitos = "";
                var contenido = "";
                var linea = key.getLinea();
                var columna = key.getColumna();
                var nombre = key.getidentificador();
                for (var [key2, value2] of key.getAtributo()) {
                    //alert(key + " = " + value);
                    atributos += `${key2}=>${value2}, `;
                }
                let objetos = key.getvalor();
                if (objetos instanceof src_app_Backend_XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_1__["default"]) {
                    for (var key3 of objetos.tablaActual) {
                        //alert(key + " = " + value);
                        listaobjetitos += `${key3.getidentificador()}, `;
                        //linea=`${key3.getLinea()} `
                        // columna=`${key3.getColumna()} `
                    }
                    this.llenarTablaSimbolos(objetos, Tree);
                }
                else {
                    contenido = objetos.replaceAll("%20", " ").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&apos;", "'").replaceAll("&quot;", "\"");
                    //Tree.actualizarTabla(contenido,linea,columna);
                }
                var Reporte = new src_app_Backend_XML_Analizador_Reportes_reporteTabla__WEBPACK_IMPORTED_MODULE_12__["reporteTabla"](nombre, contenido, atributos, listaobjetitos, linea, columna);
                //Tree.listaSimbolos.push(Reporte);
            }
            // TERMINA FOR 
            var init = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_9__["default"]("RAIZ");
            var instrucciones = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_9__["default"]("HIJOS");
            for (let i of Tree.getinstrucciones()) {
                instrucciones.agregarHijoAST(i.getNodo());
            }
            for (let i of Tree.getinstrucciones()) {
                if (i instanceof src_app_Backend_XML_Analizador_Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_0__["default"]) {
                    listaErrores.push(i);
                }
            }
            init.agregarHijoAST(instrucciones);
            let sim_string = JSON.stringify(init);
            localStorage.setItem("simbolos", sim_string);
            const gramat = src_app_Backend_XML_Analizador_XMLgraph__WEBPACK_IMPORTED_MODULE_6__;
            const gramar = gramat.parse(texto);
            localStorage.setItem("gramatica", gramar);
            console.log(listaErrores);
            let errores = JSON.stringify(listaErrores);
            localStorage.setItem("errores", errores);
            var reco = Tree.getSimbolos();
            let tabla = JSON.stringify(reco);
            localStorage.setItem("symbol", tabla);
            /**M A N E J O   E R R O R  S I N T A C T I C O */
            let errorsito = src_app_Backend_XML_Analizador_GramaticaXML__WEBPACK_IMPORTED_MODULE_2__;
            let errorts = errorsito.parse(texto);
            //console.log(listaErrores);
        }
        catch (error) {
            if (error instanceof ReferenceError) {
                let errores = JSON.stringify(listaErrores);
                localStorage.setItem("errores", errores);
            }
        }
        finally {
            let errores = JSON.stringify(listaErrores);
            localStorage.setItem("errores", errores);
        }
        //console.log(gramar);
    }
    llenarTablaSimbolos(t, tri) {
        for (var key of t.tablaActual) {
            //alert(key + " = " + value);
            var atributos = "";
            var listaobjetitos = "";
            var contenido = "";
            var linea = key.getLinea();
            var columna = key.getColumna();
            var nombre = key.getidentificador();
            for (var [key2, value2,] of key.getAtributo()) {
                //alert(key + " = " + value);
                atributos += `${key2}=>${value2}, `;
            }
            let objetos = key.getvalor();
            if (objetos instanceof src_app_Backend_XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_1__["default"]) {
                for (var key3 of objetos.tablaActual) {
                    //alert(key + " = " + value);
                    listaobjetitos += `${key3.getidentificador()}, `;
                }
                this.llenarTablaSimbolos(objetos, tri);
            }
            else {
                contenido = objetos.replaceAll("%20", " ").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&apos;", "'").replaceAll("&quot;", "\"");
                tri.actualizarTabla(contenido, linea.toString(), columna.toString());
            }
            var Reporte = new src_app_Backend_XML_Analizador_Reportes_reporteTabla__WEBPACK_IMPORTED_MODULE_12__["reporteTabla"](nombre, contenido, atributos, listaobjetitos, linea, columna);
            tri.listaSimbolos.push(Reporte);
        }
    }
    /*A R B O L  D E S C E N D E N T E */
    interpretarContenidoDesc(texto) {
        listaErrores = new Array();
        if (texto == null)
            return document.write('Error');
        const analizador = src_app_Backend_XML_Analizador_GramaticaXMLDescPRUEBA__WEBPACK_IMPORTED_MODULE_3__;
        const objetos = analizador.parse(texto);
        const tablaGlobal = new src_app_Backend_XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_1__["default"]();
        var Tree = new src_app_Backend_XML_Analizador_Simbolos_Arbol__WEBPACK_IMPORTED_MODULE_7__["default"]([objetos]);
        Tree.settablaGlobal(tablaGlobal);
        console.log(tablaGlobal);
        //  PARA GUARDAR DATOS
        // TODO FOR INTERPRETAR
        var init2 = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_9__["default"]("RAIZ");
        var instrucciones = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_9__["default"]("HIJOS");
        for (let i of Tree.getinstrucciones()) {
            instrucciones.agregarHijoAST(i.getNodo());
        }
        for (let i of Tree.getinstrucciones()) {
            /*if (i instanceof Errores) {
              listaErrores.push(i);
            }*/
        }
        init2.agregarHijoAST(instrucciones);
        let sim_string = JSON.stringify(init2);
        localStorage.setItem("simbolos1", sim_string);
        const gramat = src_app_Backend_XML_Analizador_XMLgraph__WEBPACK_IMPORTED_MODULE_6__;
        const gramar = gramat.parse(texto);
        localStorage.setItem("gramatica1", gramar);
        //console.log(gramar);
    }
    /*********************************************************************************************************/
    /***********************************************XPATH ASCENDENTE******************************************/
    /*********************************************************************************************************/
    EjecutarAsc(texto) {
        // if (texto == null) return document.write('Error');
        const analizador = src_app_Backend_XPATH_Analizador_GramaticaXPath__WEBPACK_IMPORTED_MODULE_4__;
        let objetos = analizador.parse(texto);
        let ast = new src_app_Backend_XPATH_Analizador_Simbolos_Arbol__WEBPACK_IMPORTED_MODULE_8__["default"](analizador.parse(texto)); //ejecucion
        var Tree = new src_app_Backend_XPATH_Analizador_Simbolos_Arbol__WEBPACK_IMPORTED_MODULE_8__["default"]([objetos]);
        var tabla = new src_app_Backend_XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_1__["default"](); //ejecucion
        ast.settablaGlobal(tabla); //ejecucion
        var tablita = this.tablaGlobal;
        var c = 0;
        var consolita = '';
        for (var key of tablita.getTabla()) { //SIMBOLOS
            if (key.getidentificador() == 'xml') {
                tablita = key.getvalor();
            }
        }
        for (let i of ast.getinstrucciones()) { //ejecucion  
            c++;
            if (i instanceof src_app_Backend_XPATH_Analizador_Instrucciones_BarrasNodo__WEBPACK_IMPORTED_MODULE_13__["default"]) {
                var resultador = i.interpretar(Tree, tablita);
                if (resultador instanceof src_app_Backend_XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_1__["default"]) {
                    tablita = resultador;
                    if (c == ast.getinstrucciones().length) {
                        consolita = this.recorrerTabla(tablita);
                    }
                }
                else { //VIENE STRING
                    consolita = resultador;
                }
                //var consolita = localStorage.getItem('consulta');
            }
        }
        this.mostrarContenido(consolita, 'resultado');
    }
    ArbolAscAST(texto) {
        if (texto == null)
            return document.write('Error');
        const analizador = src_app_Backend_XPATH_Analizador_GramaticaXPathDesc__WEBPACK_IMPORTED_MODULE_5__;
        const objetos = analizador.parse(texto);
        var Tree = new src_app_Backend_XPATH_Analizador_Simbolos_Arbol__WEBPACK_IMPORTED_MODULE_8__["default"]([objetos]);
        //GRAFICAS
        var instrucciones = new src_app_Backend_XPATH_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_10__["default"]("INSTRUCCIONES");
        var contador = 0;
        for (let i of Tree.getinstrucciones()) {
            this.ciclo(i, contador, instrucciones);
        }
        let sim_string = JSON.stringify(instrucciones);
        localStorage.setItem("astpath", sim_string);
        //TERMINA GRAFICAS
    }
    /*ESTE MUESTRA LOS CICLOS PARA COLOCAR EL ARBOL AST CON GETNODO*/
    ciclo(i, numero, instruc) {
        if (i[numero] != null) {
            if (i[numero] instanceof src_app_Backend_XPATH_Analizador_Instrucciones_BarrasNodo__WEBPACK_IMPORTED_MODULE_13__["default"]) {
                let temp = i[numero];
                instruc.agregarHijoAST(temp.getNodosAST());
            }
            if (i[numero] instanceof src_app_Backend_XPATH_Analizador_Funciones_Axes__WEBPACK_IMPORTED_MODULE_14__["default"]) {
                let temp = i[numero];
                instruc.agregarHijoAST(temp.getNodosAST());
            }
            numero++;
            this.ciclo(i, numero, instruc);
        }
    }
    /*********************************************************************************************************/
    /***********************************************XPATH DESCENDENTE*****************************************/
    /*********************************************************************************************************/
    EjecutarDesc(texto) {
        if (texto == null)
            return document.write('Error');
        const analizador = src_app_Backend_XPATH_Analizador_GramaticaXPathDesc__WEBPACK_IMPORTED_MODULE_5__;
        const objetos = analizador.parse(texto);
        var Tree = new src_app_Backend_XPATH_Analizador_Simbolos_Arbol__WEBPACK_IMPORTED_MODULE_8__["default"]([objetos]);
        var instrucciones = new src_app_Backend_XPATH_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_10__["default"]("INSTRUCCIONES");
        var contador = 0;
        for (let i of Tree.getinstrucciones()) {
            this.ciclo(i, contador, instrucciones);
        }
        let sim_string = JSON.stringify(instrucciones);
        localStorage.setItem("astpath", sim_string);
    }
    textInputChange(fileInputEvent) {
        var archivo = fileInputEvent.target.files[0];
        if (!archivo) {
            return;
        }
        var lector = new FileReader();
        lector.onload = (e) => {
            var contenido = e.target.result;
            this.mostrarContenido(contenido, 'contenido');
        };
        lector.readAsText(archivo);
    }
    mostrarContenido(contenido, identificador) {
        var elemento = document.getElementById(identificador);
        elemento.innerHTML = contenido;
    }
    generarAst() {
        this.inicioSrv.graficarAst().subscribe((res) => {
            if (res.msg == false) {
                alert('ALGO FALLO EN EL GRAFICO');
            }
            else {
                this.presentAlert();
            }
        });
    }
    presentAlert() {
        // #docregion focus-restoration
        this.dialog.open(Pruebas, {});
    }
    recorrerTabla(t) {
        var salida = '';
        for (var key of t.tablaActual) {
            var listaobjetitos = "";
            let objetos = key.getvalor();
            if (objetos instanceof src_app_Backend_XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_1__["default"]) {
                for (var key3 of objetos.tablaActual) {
                    listaobjetitos += `${key3.getidentificador()}, `;
                }
                salida += this.recorrerTabla(objetos);
            }
            else {
                salida += objetos.replaceAll("%20", " ").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&apos;", "'").replaceAll("&quot;", "\"").replaceAll("   ", "\n");
            }
        }
        return salida;
    }
}
ContenidoInicioComponent.ɵfac = function ContenidoInicioComponent_Factory(t) { return new (t || ContenidoInicioComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](src_app_servicios_inicio_service__WEBPACK_IMPORTED_MODULE_16__["InicioService"]), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_17__["MatDialog"])); };
ContenidoInicioComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineComponent"]({ type: ContenidoInicioComponent, selectors: [["app-contenido-inicio"]], decls: 38, vars: 0, consts: [[1, "contenedor"], [1, "consolaContainer"], ["name", "fontStyle"], ["value", "Interpretar", 3, "click"], ["value", "Interpretar2", 3, "click"], ["id", "consolas", 1, "consola"], ["consolas", ""], [1, "editores"], ["id", "ediT"], ["name", "fontStyle", "aria-label", "Font Style"], ["value", "InterpretarDesc", 3, "click"], ["value", "Abrir Archivo", 3, "click"], ["type", "file", "hidden", "true", "onclick", "this.value=null", "accept", ".ty", 3, "change"], ["textInput", ""], ["value", "Guardar"], ["id", "contenido", 1, "forma", 3, "this.onload"], ["contenido", ""], ["id", "resultado", 1, "forma"], ["resultado", ""]], template: function ContenidoInicioComponent_Template(rf, ctx) { if (rf & 1) {
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](1, "h6");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](2, "AMDG");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](4, " EDITOR XPATH ");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](5, "mat-button-toggle-group", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](6, "mat-button-toggle", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function ContenidoInicioComponent_Template_mat_button_toggle_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r4); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](13); return ctx.EjecutarDesc(_r0.value); });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](7, "AST Desc ");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](8, "mat-button-toggle", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function ContenidoInicioComponent_Template_mat_button_toggle_click_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r4); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](13); return ctx.ArbolAscAST(_r0.value); });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](9, "AST Asc ");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](10, "mat-button-toggle", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function ContenidoInicioComponent_Template_mat_button_toggle_click_10_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r4); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](13); return ctx.EjecutarAsc(_r0.value); });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](11, "Consulta ");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](12, "textarea", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](14, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](15, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](16, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](17, "Editor XML");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](18, "mat-button-toggle-group", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](19, "mat-button-toggle", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function ContenidoInicioComponent_Template_mat_button_toggle_click_19_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r4); const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](30); return ctx.interpretarContenido(_r2.value); });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](20, "Interpretar XML Asc ");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](21, "mat-button-toggle", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function ContenidoInicioComponent_Template_mat_button_toggle_click_21_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r4); const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](30); return ctx.interpretarContenidoDesc(_r2.value); });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](22, "Interpretar XML Desc");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](23, "mat-button-toggle", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function ContenidoInicioComponent_Template_mat_button_toggle_click_23_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r4); const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](26); return _r1.click(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](24, "Abrir Archivo XML");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](25, "input", 12, 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("change", function ContenidoInicioComponent_Template_input_change_25_listener($event) { return ctx.textInputChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](27, "mat-button-toggle", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](28, "Guardar XML");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](29, "textarea", 15, 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("this.onload", function ContenidoInicioComponent_Template_textarea_this_onload_29_listener() { return ctx.getConsola(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](31, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](32, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](33, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](34, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](35, "RESULTADO XPATH");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](36, "textarea", 17, 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    } }, directives: [_angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_18__["MatButtonToggleGroup"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_18__["MatButtonToggle"]], styles: ["mat-button-toggle-group[_ngcontent-%COMP%] {\r\n  margin-top: 10px;\r\n  margin-right: auto;\r\n  margin-left: auto;\r\n  background-color: #fafafa;\r\n}\r\n\r\nmat-button-toggle[_ngcontent-%COMP%] {\r\n  height: 50px;\r\n  width: 150px;\r\n  background-color: #262c7c;\r\n  color: #f9faf7;\r\n  font-family: \"Century Gothic\";\r\n}\r\n\r\n.contenedor[_ngcontent-%COMP%] {\r\n  background: #6666e2;\r\n  background: linear-gradient(to right, #4adff3, #5ff16b);\r\n  height: auto;\r\n  width: 97%;\r\n  margin-left: 1.5%;\r\n  font-family: \"Century Gothic\";\r\n\r\n}\r\n\r\n.editores[_ngcontent-%COMP%] {\r\n  display: flex;\r\n}\r\n\r\n#ediT[_ngcontent-%COMP%] {\r\n  margin-top: 2%;\r\n  width: 50%;\r\n}\r\n\r\n.forma[_ngcontent-%COMP%] {\r\n  padding-top: 13px;\r\n  margin-top: 10px;\r\n  margin-bottom: 10px;\r\n  height: 1000px;\r\n  border-style: solid;\r\n  width: 80%;\r\n  margin-left: 10%;\r\n  font-family: \"Courier New\", \"Lucida Console\", \"Century Gothic\";\r\n  font-size: 96%;\r\n  resize: none;\r\n  white-space: nowrap;\r\n}\r\n\r\n.consola[_ngcontent-%COMP%] {\r\n  padding-top: 13px;\r\n  margin-top: 10px;\r\n  height: 50px;\r\n  border-style: solid;\r\n  width: 80%;\r\n  margin-left: 2%;\r\n  background-color: #686869;\r\n  color: #f9faf7;\r\n  font-family: \"Courier New\", \"Century Gothic\", monospace;\r\n  font-size: 20px;\r\n  resize: vertical;\r\n  white-space: nowrap;\r\n}\r\n\r\n.consolaContainer[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: row;\r\n  align-items: center;\r\n}\r\n\r\n#ediT[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n  margin-left: 10%;\r\n  font-size: 20px;\r\n}\r\n\r\n.consolaContainer[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n  font-size: 20px;\r\n  margin-right: 20px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRlbmlkby1pbmljaW8uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLGNBQWM7RUFDZCw2QkFBNkI7QUFDL0I7O0FBQ0E7RUFDRSxtQkFBbUI7RUFDbkIsdURBQXVEO0VBQ3ZELFlBQVk7RUFDWixVQUFVO0VBQ1YsaUJBQWlCO0VBQ2pCLDZCQUE2Qjs7QUFFL0I7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBQ0E7RUFDRSxjQUFjO0VBQ2QsVUFBVTtBQUNaOztBQUNBO0VBQ0UsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsY0FBYztFQUNkLG1CQUFtQjtFQUNuQixVQUFVO0VBQ1YsZ0JBQWdCO0VBQ2hCLDhEQUE4RDtFQUM5RCxjQUFjO0VBQ2QsWUFBWTtFQUNaLG1CQUFtQjtBQUNyQjs7QUFDQTtFQUNFLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixVQUFVO0VBQ1YsZUFBZTtFQUNmLHlCQUF5QjtFQUN6QixjQUFjO0VBQ2QsdURBQXVEO0VBQ3ZELGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsbUJBQW1CO0FBQ3JCOztBQUNBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixtQkFBbUI7QUFDckI7O0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsZUFBZTtBQUNqQjs7QUFDQTtFQUNFLGVBQWU7RUFDZixrQkFBa0I7QUFDcEIiLCJmaWxlIjoiY29udGVuaWRvLWluaWNpby5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsibWF0LWJ1dHRvbi10b2dnbGUtZ3JvdXAge1xyXG4gIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xyXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7XHJcbn1cclxuXHJcbm1hdC1idXR0b24tdG9nZ2xlIHtcclxuICBoZWlnaHQ6IDUwcHg7XHJcbiAgd2lkdGg6IDE1MHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMyNjJjN2M7XHJcbiAgY29sb3I6ICNmOWZhZjc7XHJcbiAgZm9udC1mYW1pbHk6IFwiQ2VudHVyeSBHb3RoaWNcIjtcclxufVxyXG4uY29udGVuZWRvciB7XHJcbiAgYmFja2dyb3VuZDogIzY2NjZlMjtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICM0YWRmZjMsICM1ZmYxNmIpO1xyXG4gIGhlaWdodDogYXV0bztcclxuICB3aWR0aDogOTclO1xyXG4gIG1hcmdpbi1sZWZ0OiAxLjUlO1xyXG4gIGZvbnQtZmFtaWx5OiBcIkNlbnR1cnkgR290aGljXCI7XHJcblxyXG59XHJcblxyXG4uZWRpdG9yZXMge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbn1cclxuI2VkaVQge1xyXG4gIG1hcmdpbi10b3A6IDIlO1xyXG4gIHdpZHRoOiA1MCU7XHJcbn1cclxuLmZvcm1hIHtcclxuICBwYWRkaW5nLXRvcDogMTNweDtcclxuICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgaGVpZ2h0OiAxMDAwcHg7XHJcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcclxuICB3aWR0aDogODAlO1xyXG4gIG1hcmdpbi1sZWZ0OiAxMCU7XHJcbiAgZm9udC1mYW1pbHk6IFwiQ291cmllciBOZXdcIiwgXCJMdWNpZGEgQ29uc29sZVwiLCBcIkNlbnR1cnkgR290aGljXCI7XHJcbiAgZm9udC1zaXplOiA5NiU7XHJcbiAgcmVzaXplOiBub25lO1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbn1cclxuLmNvbnNvbGEge1xyXG4gIHBhZGRpbmctdG9wOiAxM3B4O1xyXG4gIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XHJcbiAgd2lkdGg6IDgwJTtcclxuICBtYXJnaW4tbGVmdDogMiU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzY4Njg2OTtcclxuICBjb2xvcjogI2Y5ZmFmNztcclxuICBmb250LWZhbWlseTogXCJDb3VyaWVyIE5ld1wiLCBcIkNlbnR1cnkgR290aGljXCIsIG1vbm9zcGFjZTtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgcmVzaXplOiB2ZXJ0aWNhbDtcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcbi5jb25zb2xhQ29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG4jZWRpVCBsYWJlbCB7XHJcbiAgbWFyZ2luLWxlZnQ6IDEwJTtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbn1cclxuLmNvbnNvbGFDb250YWluZXIgbGFiZWwge1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XHJcbn1cclxuIl19 */"] });
class Pruebas {
}
Pruebas.ɵfac = function Pruebas_Factory(t) { return new (t || Pruebas)(); };
Pruebas.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineComponent"]({ type: Pruebas, selectors: [["contenido-dialog"]], decls: 5, vars: 0, consts: [["mat-dialog-title", ""], ["mat-dialog-content", ""], ["mat-dialog-actions", ""]], template: function Pruebas_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1, "ARBOL AST");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](3, "Se creo de forma exitosa el arbol AST");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](4, "div", 2);
    } }, encapsulation: 2 });


/***/ }),

/***/ "DJ5/":
/*!******************************************************************!*\
  !*** ./src/app/paginas/xpath-asc-ast/xpath-asc-ast.component.ts ***!
  \******************************************************************/
/*! exports provided: XpathAscAstComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XpathAscAstComponent", function() { return XpathAscAstComponent; });
/* harmony import */ var vis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vis */ "TycK");
/* harmony import */ var vis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vis__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class XpathAscAstComponent {
    constructor() {
        this.contador = 1;
        this.cuerpo = '';
        this.dataSource = '';
        this.nodes = null;
        this.edges = null;
        this.network = null;
        this.cadena = "";
        this.directionInput = document.getElementById("direction");
        this.c = 0;
    }
    ngOnInit() {
        this.nodes = [];
        this.edges = [];
        let info = window.localStorage.getItem('astpath');
        let contenido = JSON.parse(info);
        /*this.cadena+=this.getValor(contenido)+"--"
        this.graficaAST(contenido)
        console.log(this.cadena)*/
        var nivel = 0;
        this.nodes.push({ id: this.c, label: this.getValor(contenido), nivel: nivel });
        this.nodes[this.c]["level"] = nivel;
        var hijos = this.recorrerAST(this.c, contenido, nivel);
        console.log(hijos);
        for (let nodo of hijos.nodos) {
            this.nodes.push({ id: nodo.id, label: nodo.label });
        }
        for (let enlace of hijos.enlaces) {
            this.edges.push({ from: enlace.id1, to: enlace.id2 });
        }
        for (let nodo of hijos.nodos) {
            this.nodes[nodo.id]["level"] = nodo.nivel;
        }
        var container = document.getElementById("mynetwork");
        var data = {
            nodes: this.nodes,
            edges: this.edges,
        };
        var options = {
            nodes: {
                borderWidth: 2,
                size: 30,
                color: {
                    border: '#A72168',
                    background: '#F695BB',
                },
                font: {
                    color: "#000000",
                    face: 'Century Gothic'
                }
            },
            edges: {
                smooth: {
                    type: "cubicBezier",
                    forceDirection: "vertical",
                    roundness: 0.4,
                }
            },
            layout: {
                randomSeed: undefined,
                improvedLayout: true,
                hierarchical: {
                    direction: "UD",
                    sortMethod: "hubsize"
                },
            },
            physics: false,
        };
        this.network = new vis__WEBPACK_IMPORTED_MODULE_0__["Network"](container, data, options);
        this.network.on("select", function (params) {
            document.getElementById("selection").innerText =
                "Selection: " + params.nodes;
        });
    }
    destroy() {
        if (this.network !== null) {
            this.network.destroy();
            this.network = null;
        }
    }
    recorrerAST(padre, nPadre, nivel) {
        var arr = { nodos: [], enlaces: [] };
        for (let hijo of this.getHijos(nPadre)) {
            nivel++;
            this.c++;
            arr.enlaces.push({ id1: padre, id2: this.c });
            arr.nodos.push({ id: this.c, label: this.getValor(hijo), nivel: nivel });
            var resultado = this.recorrerAST(this.c, hijo, nivel);
            arr.enlaces = arr.enlaces.concat(resultado.enlaces);
            arr.nodos = arr.nodos.concat(resultado.nodos);
        }
        return arr;
    }
    getValor(nodo) {
        return nodo.valor;
    }
    getHijos(nodo) {
        return nodo.listaNodos;
    }
    graficaAST(nodo) {
        for (let hijo of this.getHijos(nodo)) {
            this.cadena += this.getValor(hijo) + "->";
            this.graficaAST(hijo);
        }
    }
}
XpathAscAstComponent.ɵfac = function XpathAscAstComponent_Factory(t) { return new (t || XpathAscAstComponent)(); };
XpathAscAstComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: XpathAscAstComponent, selectors: [["app-xpath-asc-ast"]], decls: 1, vars: 0, consts: [["id", "mynetwork"]], template: function XpathAscAstComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 0);
    } }, styles: ["#mynetwork[_ngcontent-%COMP%] {\r\n    width: 1362px;\r\n    height: 595px;\r\n    border: 1px solid rgb(221, 58, 58);\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInhwYXRoLWFzYy1hc3QuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGFBQWE7SUFDYixhQUFhO0lBQ2Isa0NBQWtDO0VBQ3BDIiwiZmlsZSI6InhwYXRoLWFzYy1hc3QuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiNteW5ldHdvcmsge1xyXG4gICAgd2lkdGg6IDEzNjJweDtcclxuICAgIGhlaWdodDogNTk1cHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMjIxLCA1OCwgNTgpO1xyXG4gIH0iXX0= */"] });


/***/ }),

/***/ "DdrW":
/*!*****************************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Expresiones/ParentesisExpresion.ts ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ParentesisExpresion; });
/* harmony import */ var _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Abstracto/Instruccion */ "ssiu");
/* harmony import */ var _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Abstracto/nodoAST */ "GvuX");
/* harmony import */ var _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Excepciones/NodoErrores */ "E7Rf");
/* harmony import */ var _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Simbolos/Tipo */ "HVYh");




class ParentesisExpresion extends _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__["Instruccion"] {
    constructor(expresion, fila, columna, coma) {
        super(new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO), fila, columna);
        this.coma = coma;
        this.Expresion = expresion;
    }
    getNodosAST() {
        var nodo = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]('PARENTESIS_EXPRESION'); //PADRE SELECT
        if (this.Expresion != null) {
            nodo.agregarHijoAST(this.Expresion.getNodosAST());
        }
        if (this.coma != null) {
            var nodsBarras2 = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"](this.coma);
            nodo.agregarHijoAST(nodsBarras2);
        }
        return nodo;
    }
    interpretar(arbol, tabla) {
        arbol.gettablaGlobal();
        let variable = tabla.getVariable(this.coma);
        if (variable != null) {
            /*SI NO ES NULA*/
        }
        else {
            return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('SEMANTICO', 'VARIABLE ' + this.Expresion + ' NO EXISTE', this.fila, this.columna);
        }
    }
}


/***/ }),

/***/ "E7Rf":
/*!*********************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Excepciones/NodoErrores.ts ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NodoErrores; });
class NodoErrores {
    constructor(tipo, desc, fila, columna) {
        this.tipoError = tipo;
        this.desc = desc;
        this.fila = fila;
        this.columna = columna;
    }
    getDesc() {
        return this.desc;
    }
    getTipoError() {
        return this.tipoError;
    }
    getcolumna() {
        return this.columna;
    }
    getFila() {
        return this.fila;
    }
    returnError() {
        return ('Se obtuvo: ' +
            this.tipoError +
            ' desc:{' +
            this.desc +
            '} en la fila: ' +
            this.fila +
            ' en la columna: ' +
            this.columna +
            '\n');
    }
}


/***/ }),

/***/ "EHLN":
/*!********************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/GramaticaXML.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var GramaticaXML = (function () {
    var o = function (k, v, o, l) { for (o = o || {}, l = k.length; l--; o[k[l]] = v)
        ; return o; }, $V0 = [1, 3], $V1 = [1, 4], $V2 = [1, 10], $V3 = [2, 13], $V4 = [10, 12, 14, 15], $V5 = [1, 20], $V6 = [1, 18], $V7 = [5, 9, 10, 13, 16];
    var parser = { trace: function trace() { },
        yy: {},
        symbols_: { "error": 2, "START": 3, "OBJETO": 4, "EOF": 5, "INSTRUCCION": 6, "CUERPO": 7, "OBJETOS": 8, "MENORQUEESPECIAL": 9, "IDENTIFICADOR": 10, "L_ATRIBUTOS": 11, "MAYORQUEESPECIAL": 12, "MENORQUE": 13, "SELFCLOSE": 14, "MAYORQUE": 15, "SALIDA": 16, "ATRIBUTO": 17, "IGUAL": 18, "CADENA": 19, "QUOTE": 20, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 7: "CUERPO", 9: "MENORQUEESPECIAL", 10: "IDENTIFICADOR", 12: "MAYORQUEESPECIAL", 13: "MENORQUE", 14: "SELFCLOSE", 15: "MAYORQUE", 16: "SALIDA", 18: "IGUAL", 19: "CADENA", 20: "QUOTE" },
        productions_: [0, [3, 2], [6, 1], [6, 1], [6, 1], [8, 2], [8, 1], [4, 5], [4, 5], [4, 8], [4, 7], [11, 2], [11, 1], [11, 0], [17, 3], [17, 3]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */
            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    return $$[$0 - 1];
                    break;
                case 2:
                case 3:
                    this.$ = $$[$0];
                    break;
                case 4:
                    inicio.listaErrores.push(new CNodoErrores.default("Error Sintactico", "Se esperaba un token, error en : " + yytext, _$[$0].first_line, _$[$0].first_column));
                    console.log("Error Sintactico, Se esperaba un token en esta linea " + "Linea: " + _$[$0].first_line + " Columna: " + _$[$0].first_column);
                    this.$ = false;
                    break;
                case 5:
                    $$[$0 - 1].push($$[$0]);
                    this.$ = $$[$0 - 1];
                    break;
                case 6:
                    this.$ = [$$[$0]];
                    break;
                case 7:
                case 8:
                    this.$ = new objeto.default($$[$0 - 3], null, $$[$0 - 2], $$[$0], _$[$0 - 4].first_line, _$[$0 - 4].first_column);
                    break;
                case 9:
                    this.$ = new objeto.default($$[$0 - 6], null, $$[$0 - 5], $$[$0 - 3], _$[$0 - 7].first_line, _$[$0 - 7].first_column);
                    break;
                case 10:
                    this.$ = new objeto.default($$[$0 - 5], $$[$0 - 2], $$[$0 - 4], null, _$[$0 - 6].first_line, _$[$0 - 6].first_column);
                    break;
                case 11:
                    $$[$0 - 1].push($$[$0]);
                    this.$ = $$[$0 - 1];
                    break;
                case 12:
                    this.$ = [$$[$0]];
                    break;
                case 13:
                    this.$ = [];
                    break;
                case 14:
                case 15:
                    this.$ = new atributo.default($$[$0 - 2], $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 9: $V0, 13: $V1 }, { 1: [3] }, { 5: [1, 5] }, { 10: [1, 6] }, { 10: [1, 7] }, { 1: [2, 1] }, { 10: $V2, 11: 8, 12: $V3, 17: 9 }, o([14, 15], $V3, { 17: 9, 11: 11, 10: $V2 }), { 10: $V2, 12: [1, 12], 17: 13 }, o($V4, [2, 12]), { 18: [1, 14] }, { 10: $V2, 14: [1, 15], 15: [1, 16], 17: 13 }, { 2: $V5, 4: 21, 6: 17, 7: $V6, 8: 19, 9: $V0, 13: $V1 }, o($V4, [2, 11]), { 19: [1, 22], 20: [1, 23] }, { 2: $V5, 4: 21, 6: 24, 7: $V6, 8: 19, 9: $V0, 13: $V1 }, { 2: $V5, 4: 21, 6: 25, 7: $V6, 8: 19, 9: $V0, 13: $V1 }, o($V7, [2, 7]), o($V7, [2, 2]), o([5, 10, 16], [2, 3], { 4: 26, 9: $V0, 13: $V1 }), o($V7, [2, 4]), o($V7, [2, 6]), o($V4, [2, 14]), o($V4, [2, 15]), o($V7, [2, 8]), { 10: [1, 28], 16: [1, 27] }, o($V7, [2, 5]), { 10: [1, 29] }, { 15: [1, 30] }, { 15: [1, 31] }, o($V7, [2, 10]), o($V7, [2, 9])],
        defaultActions: { 5: [2, 1] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            }
            else {
                var error = new Error(str);
                error.hash = hash;
                throw error;
            }
        },
        parse: function parse(input) {
            var self = this, stack = [0], tstack = [], // token stack
            vstack = [null], // semantic value stack
            lstack = [], // location stack
            table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            //this.reductionCount = this.shiftCount = 0;
            var lexer = Object.create(this.lexer);
            var sharedState = { yy: {} };
            // copy state
            for (var k in this.yy) {
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState.yy[k] = this.yy[k];
                }
            }
            lexer.setInput(input, sharedState.yy);
            sharedState.yy.lexer = lexer;
            sharedState.yy.parser = this;
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            }
            else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            _token_stack: var lex = function () {
                var token;
                token = lexer.lex() || EOF;
                // if token isn't its numeric value, convert
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token;
            };
            var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
            while (true) {
                // retreive state number from top of stack
                state = stack[stack.length - 1];
                // use default actions if available
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                }
                else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    // read action for current state and first input
                    action = table[state] && table[state][symbol];
                }
                _handle_error: 
                // handle parse error
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var error_rule_depth;
                    var errStr = '';
                    // Return the rule stack depth where the nearest error rule can be found.
                    // Return FALSE when no error recovery rule was found.
                    function locateNearestErrorRecoveryRule(state) {
                        var stack_probe = stack.length - 1;
                        var depth = 0;
                        // try to recover from error
                        for (;;) {
                            // check for error recovery rule in this state
                            if ((TERROR.toString()) in table[state]) {
                                return depth;
                            }
                            if (state === 0 || stack_probe < 2) {
                                return false; // No suitable error recovery rule available.
                            }
                            stack_probe -= 2; // popStack(1): [symbol, action]
                            state = stack[stack_probe];
                            ++depth;
                        }
                    }
                    if (!recovering) {
                        // first see if there's any chance at hitting an error recovery rule:
                        error_rule_depth = locateNearestErrorRecoveryRule(state);
                        // Report error
                        expected = [];
                        for (p in table[state]) {
                            if (this.terminals_[p] && p > TERROR) {
                                expected.push("'" + this.terminals_[p] + "'");
                            }
                        }
                        if (lexer.showPosition) {
                            errStr = 'Parse error on line ' + (yylineno + 1) + ":\n" + lexer.showPosition() + "\nExpecting " + expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                        }
                        else {
                            errStr = 'Parse error on line ' + (yylineno + 1) + ": Unexpected " +
                                (symbol == EOF ? "end of input" :
                                    ("'" + (this.terminals_[symbol] || symbol) + "'"));
                        }
                        this.parseError(errStr, {
                            text: lexer.match,
                            token: this.terminals_[symbol] || symbol,
                            line: lexer.yylineno,
                            loc: yyloc,
                            expected: expected,
                            recoverable: (error_rule_depth !== false)
                        });
                    }
                    else if (preErrorSymbol !== EOF) {
                        error_rule_depth = locateNearestErrorRecoveryRule(state);
                    }
                    // just recovered from another error
                    if (recovering == 3) {
                        if (symbol === EOF || preErrorSymbol === EOF) {
                            throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                        }
                        // discard current lookahead and grab another
                        yyleng = lexer.yyleng;
                        yytext = lexer.yytext;
                        yylineno = lexer.yylineno;
                        yyloc = lexer.yylloc;
                        symbol = lex();
                    }
                    // try to recover from error
                    if (error_rule_depth === false) {
                        throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
                    }
                    popStack(error_rule_depth);
                    preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
                    symbol = TERROR; // insert generic error symbol as new lookahead
                    state = stack[stack.length - 1];
                    action = table[state] && table[state][TERROR];
                    recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
                }
                // this shouldn't happen, unless resolve defaults are off
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1: // shift
                        //this.shiftCount++;
                        stack.push(symbol);
                        vstack.push(lexer.yytext);
                        lstack.push(lexer.yylloc);
                        stack.push(action[1]); // push state
                        symbol = null;
                        if (!preErrorSymbol) { // normal execution/no error
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        }
                        else {
                            // error just occurred, resume old lookahead f/ before error
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        // reduce
                        //this.reductionCount++;
                        len = this.productions_[action[1]][1];
                        // perform semantic action
                        yyval.$ = vstack[vstack.length - len]; // default to $$ = $1
                        // default location, uses first token for firsts, last for lasts
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                        }
                        r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        // pop off stack
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]); // push nonterminal (reduce)
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        // goto new state = table[STATE][NONTERMINAL]
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        // accept
                        return true;
                }
            }
            return true;
        } };
    const atributo = __webpack_require__(/*! ./Expresiones/Atributo */ "uvkm");
    const tipo = __webpack_require__(/*! ./Simbolos/Tipo */ "Oyrp");
    const objeto = __webpack_require__(/*! ./Expresiones/Objeto */ "xzWR");
    const CErrores = __webpack_require__(/*! ./Excepciones/Errores */ "Vgfr");
    const CNodoErrores = __webpack_require__(/*! ./Excepciones/NodoErrores */ "cikY");
    const inicio = __webpack_require__(/*! ../../../componentes/contenido-inicio/contenido-inicio.component */ "CbqC");
    var palabra = "";
    var palabra1 = "";
    /* generated by jison-lex 0.3.4 */
    var lexer = (function () {
        var lexer = ({
            EOF: 1,
            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                }
                else {
                    throw new Error(str);
                }
            },
            // resets the lexer, sets new input
            setInput: function (input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },
            // consumes and returns one char from the input
            input: function () {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                }
                else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }
                this._input = this._input.slice(1);
                return ch;
            },
            // unshifts one char (or a string) into the input
            unput: function (ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);
                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);
                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;
                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ?
                        (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                            + oldLines[oldLines.length - lines.length].length - lines[0].length :
                        this.yylloc.first_column - len
                };
                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },
            // When called from action, caches matched text and appends it on next action
            more: function () {
                this._more = true;
                return this;
            },
            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function () {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },
            // retain first n characters of the match
            less: function (n) {
                this.unput(this.match.slice(n));
            },
            // displays already matched input, i.e. for error messages
            pastInput: function () {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },
            // displays upcoming input, i.e. for error messages
            upcomingInput: function () {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },
            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function () {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },
            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function (match, indexed_rule) {
                var token, lines, backup;
                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }
                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ?
                        lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                        this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                }
                else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },
            // return next match in input
            next: function () {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }
                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            }
                            else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            }
                            else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        }
                        else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },
            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                }
                else {
                    return this.lex();
                }
            },
            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },
            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                }
                else {
                    return this.conditionStack[0];
                }
            },
            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                }
                else {
                    return this.conditions["INITIAL"].rules;
                }
            },
            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                }
                else {
                    return "INITIAL";
                }
            },
            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },
            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: { "case-insensitive": true },
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0:
                        break;
                    case 1:
                        this.begin('cuerpo');
                        return 15;
                        break;
                    case 2:
                        this.begin('INITIAL');
                        if (palabra.replaceAll(" ", "") == "")
                            return 16;
                        yy_.yytext = palabra;
                        palabra = "";
                        if (palabra == "<!--")
                            return 'COMENTARIOS';
                        if (palabra.replaceAll(" ", "") == "")
                            return 7;
                        break;
                    case 3:
                        this.begin('INITIAL');
                        return 13;
                        yy_.yytext = palabra;
                        palabra = "";
                        return 7;
                        break;
                    case 4:
                        this.begin('INITIAL');
                        return 14;
                        yy_.yytext = palabra;
                        palabra = "";
                        return 7;
                        break;
                    case 5:
                        palabra += yy_.yytext;
                        break;
                    case 6:
                        return 12;
                        break;
                    case 7:
                        return 16;
                        break;
                    case 8:
                        return 14;
                        break;
                    case 9:
                        return 9;
                        break;
                    case 10:
                        return 13;
                        break;
                    case 11:
                        return 18;
                        break;
                    case 12:
                        yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);
                        return 19;
                        break;
                    case 13:
                        yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);
                        return 20;
                        break;
                    case 14:
                        return 10;
                        break;
                    case 15:
                        return 5;
                        break;
                    case 16:
                        break;
                    case 17:
                        break;
                    case 18:
                        break;
                    case 19:
                        inicio.listaErrores.push(new CNodoErrores.default("Lexico", "No se esperaba el caracter: " + yy_.yytext, yy_.yylloc.first_line, yy_.yylloc.first_column));
                        console.log("Lexico, No se esperaba el caracter: " + yy_.yytext + " Linea: " + yy_.yylloc.first_line + "Columna: " + yy_.yylloc.first_column);
                        break;
                }
            },
            rules: [/^(?:[<][!][-][-][^>]*[-][-]+[>])/i, /^(?:>)/i, /^(?:<\/)/i, /^(?:<)/i, /^(?:<)/i, /^(?:.)/i, /^(?:\?>)/i, /^(?:<\/)/i, /^(?:\/>)/i, /^(?:<\?)/i, /^(?:<)/i, /^(?:=)/i, /^(?:"[^\"]*")/i, /^(?:'[^\']*')/i, /^(?:([a-zA-Z_À-ÿ])[a-zA-Z0-9_^ÑñÀ-ÿ]*)/i, /^(?:$)/i, /^(?:[ \r\t]+)/i, /^(?:\n+)/i, /^(?:\s+)/i, /^(?:.)/i],
            conditions: { "comment": { "rules": [], "inclusive": false }, "xml": { "rules": [0, 1, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], "inclusive": true }, "cuerpo": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], "inclusive": true }, "INITIAL": { "rules": [0, 1, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], "inclusive": true } }
        });
        return lexer;
    })();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;
    parser.Parser = Parser;
    return new Parser;
})();
if (true) {
    exports.parser = GramaticaXML;
    exports.Parser = GramaticaXML.Parser;
    exports.parse = function () { return GramaticaXML.parse.apply(GramaticaXML, arguments); };
    exports.main = function commonjsMain(args) {
        if (!args[1]) {
            console.log('Usage: ' + args[0] + ' FILE');
            process.exit(1);
        }
        var source = __webpack_require__(/*! fs */ 1).readFileSync(__webpack_require__(/*! path */ 2).normalize(args[1]), "utf8");
        return exports.parser.parse(source);
    };
    if ( true && __webpack_require__.c[__webpack_require__.s] === module) {
        exports.main(process.argv.slice(1));
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "YuTi")(module)))

/***/ }),

/***/ "Er68":
/*!******************************************************!*\
  !*** ./src/app/paginas/errores/errores.component.ts ***!
  \******************************************************/
/*! exports provided: ErroresComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErroresComponent", function() { return ErroresComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/table */ "+0xr");


function ErroresComponent_th_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Error de Tipo. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ErroresComponent_td_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r10.tipoError, " ");
} }
function ErroresComponent_th_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Descripcion ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ErroresComponent_td_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r11.desc, " ");
} }
function ErroresComponent_th_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Linea ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ErroresComponent_td_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r12.fila, " ");
} }
function ErroresComponent_th_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Columna ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ErroresComponent_td_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r13.columna, " ");
} }
function ErroresComponent_tr_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 12);
} }
function ErroresComponent_tr_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 13);
} }
class ErroresComponent {
    constructor() {
        this.displayedColumns = ['tipoError', 'Descripcion', 'Linea', 'Columna'];
        this.dataSource = '';
    }
    ngOnInit() {
        let info = window.localStorage.getItem('errores');
        let otro = JSON.parse(info);
        this.dataSource = otro;
        console.log(otro);
    }
}
ErroresComponent.ɵfac = function ErroresComponent_Factory(t) { return new (t || ErroresComponent)(); };
ErroresComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ErroresComponent, selectors: [["app-errores"]], decls: 18, vars: 3, consts: [[1, "tabla"], ["mat-table", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "tipoError"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "Descripcion"], ["matColumnDef", "Linea"], ["matColumnDef", "Columna"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", ""]], template: function ErroresComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "TABLA DE ERRORES");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "table", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](4, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, ErroresComponent_th_5_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, ErroresComponent_td_6_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](7, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, ErroresComponent_th_8_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, ErroresComponent_td_9_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](10, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, ErroresComponent_th_11_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, ErroresComponent_td_12_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](13, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, ErroresComponent_th_14_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, ErroresComponent_td_15_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, ErroresComponent_tr_16_Template, 1, 0, "tr", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, ErroresComponent_tr_17_Template, 1, 0, "tr", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dataSource", ctx.dataSource);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
    } }, directives: [_angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatTable"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatColumnDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatRow"]], styles: ["table[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  width: 98%;\r\n  margin-top: 1%;\r\n  margin-bottom: 1%;\r\n  margin-left: 1%;\r\n  background-color: #0c7c6d;\r\n}\r\nh1[_ngcontent-%COMP%] {\r\n  margin-left: 35%;\r\n  margin-top: 5%;\r\n  margin-bottom: 5%;\r\n  font-size: 50px;\r\n  font-family: \"Franklin Gothic Medium\", \"Arial Narrow\", Arial, sans-serif;\r\n  background-color: transparent;\r\n}\r\n.tabla[_ngcontent-%COMP%] {\r\n  border: 2px solid #67676f;\r\n  margin: auto;\r\n  width: 90%;\r\n  height: auto;\r\n  overflow: hidden;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9yZXMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsY0FBYztFQUNkLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2YseUJBQXlCO0FBQzNCO0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2Ysd0VBQXdFO0VBQ3hFLDZCQUE2QjtBQUMvQjtBQUNBO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixVQUFVO0VBQ1YsWUFBWTtFQUNaLGdCQUFnQjtBQUNsQiIsImZpbGUiOiJlcnJvcmVzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHdpZHRoOiA5OCU7XHJcbiAgbWFyZ2luLXRvcDogMSU7XHJcbiAgbWFyZ2luLWJvdHRvbTogMSU7XHJcbiAgbWFyZ2luLWxlZnQ6IDElO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwYzdjNmQ7XHJcbn1cclxuaDEge1xyXG4gIG1hcmdpbi1sZWZ0OiAzNSU7XHJcbiAgbWFyZ2luLXRvcDogNSU7XHJcbiAgbWFyZ2luLWJvdHRvbTogNSU7XHJcbiAgZm9udC1zaXplOiA1MHB4O1xyXG4gIGZvbnQtZmFtaWx5OiBcIkZyYW5rbGluIEdvdGhpYyBNZWRpdW1cIiwgXCJBcmlhbCBOYXJyb3dcIiwgQXJpYWwsIHNhbnMtc2VyaWY7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbn1cclxuLnRhYmxhIHtcclxuICBib3JkZXI6IDJweCBzb2xpZCAjNjc2NzZmO1xyXG4gIG1hcmdpbjogYXV0bztcclxuICB3aWR0aDogOTAlO1xyXG4gIGhlaWdodDogYXV0bztcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ "GvuX":
/*!***************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Abstracto/nodoAST.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return nodoAST; });
class nodoAST {
    constructor(valor) {
        this.listaNodos = new Array();
        this.valor = valor;
    }
    agregarHijo(val, ambito, operador) {
        if (ambito != undefined) {
            switch (ambito) {
                case 'ar':
                    switch (operador) {
                        case 0:
                            val = '+';
                            break;
                        case 1:
                            val = '-';
                            break;
                        case 2:
                            val = '*';
                            break;
                        case 3:
                            val = 'div';
                            break;
                        case 4:
                            val = '^';
                            break;
                        case 5:
                            val = 'mod';
                            break;
                    }
                    break;
                case 'log':
                    switch (operador) {
                        case 0:
                            val = 'or';
                            break;
                        case 1:
                            val = 'and';
                            break;
                    }
                    break;
                case 'rel':
                    switch (operador) {
                        case 0:
                            val = '=';
                            break;
                        case 1:
                            val = '!=';
                            break;
                        case 2:
                            val = '>';
                            break;
                        case 3:
                            val = '<';
                            break;
                        case 4:
                            val = '>=';
                            break;
                        case 5:
                            val = '<=';
                            break;
                    }
                    break;
            }
            this.listaNodos.push(new nodoAST(val));
        }
        else
            this.listaNodos.push(new nodoAST(val));
    }
    agregarHijoAST(hijo) {
        if (hijo != undefined)
            this.listaNodos.push(hijo);
    }
    getValor() {
        return this.valor;
    }
    getHijos() {
        return this.listaNodos;
    }
}


/***/ }),

/***/ "HVYh":
/*!***********************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Simbolos/Tipo.ts ***!
  \***********************************************************/
/*! exports provided: default, tipoDato */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tipo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tipoDato", function() { return tipoDato; });
class Tipo {
    constructor(tipos) {
        this.tipos = tipos;
    }
    getTipo() {
        return this.tipos;
    }
    setTipo(tipo) {
        this.tipos = tipo;
    }
    igual(compara) {
        return (this.tipos = compara.tipos);
    }
}
var tipoDato;
(function (tipoDato) {
    tipoDato[tipoDato["CADENA"] = 0] = "CADENA";
    tipoDato[tipoDato["OBJETO"] = 1] = "OBJETO";
    tipoDato[tipoDato["ENTERO"] = 2] = "ENTERO";
    tipoDato[tipoDato["DECIMAL"] = 3] = "DECIMAL";
    tipoDato[tipoDato["BOOLEANO"] = 4] = "BOOLEANO";
    tipoDato[tipoDato["CARACTER"] = 5] = "CARACTER";
    tipoDato[tipoDato["SELECT"] = 6] = "SELECT";
    tipoDato[tipoDato["ATRIBUTO"] = 7] = "ATRIBUTO";
})(tipoDato || (tipoDato = {}));


/***/ }),

/***/ "LdXe":
/*!**************************************************************************!*\
  !*** ./src/app/paginas/gramatical-report/gramatical-report.component.ts ***!
  \**************************************************************************/
/*! exports provided: GramaticalReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GramaticalReportComponent", function() { return GramaticalReportComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class GramaticalReportComponent {
    constructor() { }
    ngOnInit() {
        let info = window.localStorage.getItem('gramatica');
        let texto = document.getElementById("text2");
        if (texto != null) {
            texto.innerHTML += info;
        }
    }
}
GramaticalReportComponent.ɵfac = function GramaticalReportComponent_Factory(t) { return new (t || GramaticalReportComponent)(); };
GramaticalReportComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GramaticalReportComponent, selectors: [["app-gramatical-report"]], decls: 3, vars: 0, consts: [["name", "Estruct", "id", "text2", "cols", "125", "rows", "35"]], template: function GramaticalReportComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "textarea", 0);
    } }, styles: ["textarea[_ngcontent-%COMP%]{\r\n    background: url(http://i.imgur.com/2cOaJ.png);\r\nbackground-attachment: local;\r\nbackground-repeat: no-repeat;\r\npadding-left: 40px;\r\nfont-size: 95%;\r\ncolor: white;\r\nposition: relative;\r\nleft: 100px;\r\n    border-color:rgb(126, 123, 123);\r\n    background-color: rgb(58, 56, 56);\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyYW1hdGljYWwtcmVwb3J0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSw2Q0FBNkM7QUFDakQsNEJBQTRCO0FBQzVCLDRCQUE0QjtBQUM1QixrQkFBa0I7QUFDbEIsY0FBYztBQUNkLFlBQVk7QUFDWixrQkFBa0I7QUFDbEIsV0FBVztJQUNQLCtCQUErQjtJQUMvQixpQ0FBaUM7QUFDckMiLCJmaWxlIjoiZ3JhbWF0aWNhbC1yZXBvcnQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInRleHRhcmVhe1xyXG4gICAgYmFja2dyb3VuZDogdXJsKGh0dHA6Ly9pLmltZ3VyLmNvbS8yY09hSi5wbmcpO1xyXG5iYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IGxvY2FsO1xyXG5iYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG5wYWRkaW5nLWxlZnQ6IDQwcHg7XHJcbmZvbnQtc2l6ZTogOTUlO1xyXG5jb2xvcjogd2hpdGU7XHJcbnBvc2l0aW9uOiByZWxhdGl2ZTtcclxubGVmdDogMTAwcHg7XHJcbiAgICBib3JkZXItY29sb3I6cmdiKDEyNiwgMTIzLCAxMjMpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU4LCA1NiwgNTYpO1xyXG59Il19 */"] });


/***/ }),

/***/ "Mc8n":
/*!*****************************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Reportes/reporteTabla.ts ***!
  \*****************************************************************/
/*! exports provided: reporteTabla */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reporteTabla", function() { return reporteTabla; });
class reporteTabla {
    constructor(identificador, contenido, listaAtributos, listaObjetos, linea, columna) {
        this.identificador = identificador;
        this.contenido = contenido;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaObjetos;
        this.linea = linea;
        this.columna = columna;
    }
    getIdentificador() {
        return this.identificador;
    }
    setIdentificador(identificador) {
        this.identificador = identificador;
    }
    getContenido() {
        return this.identificador;
    }
    setContenido(contenido) {
        this.contenido = contenido;
    }
    getListaAtributos() {
        return this.listaAtributos;
    }
    setListaAtributos(listaAtributos) {
        this.listaAtributos = listaAtributos;
    }
    getListaObjetos() {
        return this.listaObjetos;
    }
    setListaObjetos(listaObjetos) {
        this.listaObjetos = listaObjetos;
    }
    getLinea() {
        return this.linea;
    }
    getColumna() {
        return this.columna;
    }
    setLinea(linea) {
        this.linea = linea;
    }
    setColumna(col) {
        this.columna = col;
    }
}


/***/ }),

/***/ "OBp0":
/*!**********************************************************!*\
  !*** ./src/app/paginas/arbol-ast/arbol-ast.component.ts ***!
  \**********************************************************/
/*! exports provided: ArbolASTComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArbolASTComponent", function() { return ArbolASTComponent; });
/* harmony import */ var vis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vis */ "TycK");
/* harmony import */ var vis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vis__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
//import Simbolo from 'src/app/Backend/XPATH/Analizador/Simbolos/Simbolo';
//import tablaSimbolos from 'src/app/Backend/XPATH/Analizador/Simbolos/tablaSimbolos';


class ArbolASTComponent {
    constructor() {
        //**desde aqui vro */
        this.contador = 1;
        this.cuerpo = '';
        this.dataSource = '';
        this.nodes = null;
        this.edges = null;
        this.network = null;
        this.directionInput = document.getElementById("direction");
        this.c = 0;
    }
    ngOnInit() {
        this.destroy();
        this.nodes = [];
        this.edges = [];
        var connectionCount = [];
        let info = window.localStorage.getItem('simbolos');
        let contenido = JSON.parse(info);
        console.log(contenido);
        var nivel = 0;
        this.nodes.push({ id: this.c, label: this.getValor(contenido), nivel: nivel });
        this.nodes[this.c]["level"] = nivel;
        var hijos = this.recorrerAST(this.c, contenido, nivel);
        console.log(hijos);
        for (let nodo of hijos.nodos) {
            this.nodes.push({ id: nodo.id, label: nodo.label });
        }
        for (let enlace of hijos.enlaces) {
            this.edges.push({ from: enlace.id1, to: enlace.id2 });
        }
        for (let nodo of hijos.nodos) {
            this.nodes[nodo.id]["level"] = nodo.nivel;
        }
        var container = document.getElementById("mynetwork");
        var data = {
            nodes: this.nodes,
            edges: this.edges,
        };
        var options = {
            nodes: {
                borderWidth: 2,
                size: 30,
                color: {
                    border: '#46304E',
                    background: '#D297E9',
                },
                font: {
                    color: "#000000",
                    face: 'Century Gothic'
                }
            },
            edges: {
                smooth: {
                    type: "cubicBezier",
                    forceDirection: "vertical",
                    roundness: 0.4,
                }
            },
            layout: {
                randomSeed: undefined,
                improvedLayout: true,
                hierarchical: {
                    direction: "UD",
                    sortMethod: "hubsize"
                },
            },
            physics: false,
        };
        this.network = new vis__WEBPACK_IMPORTED_MODULE_0__["Network"](container, data, options);
        this.network.on("select", function (params) {
            document.getElementById("selection").innerText =
                "Selection: " + params.nodes;
        });
        let registros = [];
    }
    destroy() {
        if (this.network !== null) {
            this.network.destroy();
            this.network = null;
        }
    }
    recorrerAST(padre, nPadre, nivel) {
        var arr = { nodos: [], enlaces: [] };
        for (let hijo of this.getHijos(nPadre)) {
            nivel++;
            this.c++;
            arr.enlaces.push({ id1: padre, id2: this.c });
            arr.nodos.push({ id: this.c, label: this.getValor(hijo), nivel: nivel });
            var resultado = this.recorrerAST(this.c, hijo, nivel);
            arr.enlaces = arr.enlaces.concat(resultado.enlaces);
            arr.nodos = arr.nodos.concat(resultado.nodos);
        }
        return arr;
    }
    getValor(nodo) {
        return nodo.valor;
    }
    getHijos(nodo) {
        return nodo.listaNodos;
    }
}
ArbolASTComponent.ɵfac = function ArbolASTComponent_Factory(t) { return new (t || ArbolASTComponent)(); };
ArbolASTComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ArbolASTComponent, selectors: [["app-arbol-ast"]], decls: 1, vars: 0, consts: [["id", "mynetwork"]], template: function ArbolASTComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 0);
    } }, styles: ["#mynetwork[_ngcontent-%COMP%] {\r\n    width: 1362px;\r\n    height: 595px;\r\n    border: 1px solid rgb(221, 58, 58);\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFyYm9sLWFzdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksYUFBYTtJQUNiLGFBQWE7SUFDYixrQ0FBa0M7RUFDcEMiLCJmaWxlIjoiYXJib2wtYXN0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjbXluZXR3b3JrIHtcclxuICAgIHdpZHRoOiAxMzYycHg7XHJcbiAgICBoZWlnaHQ6IDU5NXB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDIyMSwgNTgsIDU4KTtcclxuICB9Il19 */"] });


/***/ }),

/***/ "Oyrp":
/*!*********************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Simbolos/Tipo.ts ***!
  \*********************************************************/
/*! exports provided: default, tipoDato */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tipo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tipoDato", function() { return tipoDato; });
class Tipo {
    constructor(tipos) {
        this.tipos = tipos;
    }
    getTipo() {
        return this.tipos;
    }
    setTipo(tipo) {
        this.tipos = tipo;
    }
    igual(compara) {
        return (this.tipos = compara.tipos);
    }
}
var tipoDato;
(function (tipoDato) {
    tipoDato[tipoDato["CADENA"] = 0] = "CADENA";
    tipoDato[tipoDato["OBJETO"] = 1] = "OBJETO";
    tipoDato[tipoDato["QUOTE"] = 2] = "QUOTE";
})(tipoDato || (tipoDato = {}));


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _componentes_side_bar_side_bar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./componentes/side-bar/side-bar.component */ "8hwP");


class AppComponent {
    constructor() {
        this.title = 'Frontend';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-sidebar");
    } }, directives: [_componentes_side_bar_side_bar_component__WEBPACK_IMPORTED_MODULE_1__["SideBarComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "T4Rd":
/*!************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Simbolos/Arbol.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Arbol; });
/* harmony import */ var _XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../XML/Analizador/Simbolos/tablaSimbolos */ "TD3t");

class Arbol {
    constructor(instrucciones) {
        this.consola = '';
        this.instrucciones = instrucciones;
        this.consola = '';
        this.tablaGlobal = new _XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.NodoErrores = new Array();
        this.funciones = new Array();
        this.listaSimbolos = new Array();
    }
    getSimbolos() {
        return this.listaSimbolos;
    }
    actualizarTabla(identificador, valor, linea, entorno, columna) {
        for (var elemento of this.listaSimbolos) {
            if (elemento.getIdentificador().toString() == identificador.toLowerCase() &&
                elemento.getEntorno().toString() == entorno.toString()) {
                elemento.setValor(valor);
                elemento.setLinea(linea);
                elemento.setColumna(columna);
                return true;
            }
        }
        return false;
    }
    BuscarTipo(identificador) {
        for (var elemento of this.listaSimbolos) {
            if (elemento.getIdentificador() == identificador.toLowerCase()) {
                return elemento.getForma().toString();
            }
        }
        return 'as';
    }
    getfunciones() {
        return this.funciones;
    }
    setfunciones(value) {
        this.funciones = value;
    }
    getNodoErrores() {
        return this.NodoErrores;
    }
    setNodoErrores(value) {
        this.NodoErrores = value;
    }
    getinstrucciones() {
        return this.instrucciones;
    }
    setinstrucciones(value) {
        this.instrucciones = value;
    }
    getconsola() {
        return this.consola;
    }
    setconsola(value) {
        this.consola = value;
    }
    actualizaConsola(uptodate) {
        this.consola = `${this.consola}${uptodate}\n`;
    }
    gettablaGlobal() {
        return this.tablaGlobal;
    }
    settablaGlobal(value) {
        this.tablaGlobal = value;
    }
}


/***/ }),

/***/ "TD3t":
/*!******************************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return tablaSimbolos; });
/* harmony import */ var _Tipo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tipo */ "Oyrp");

class tablaSimbolos {
    constructor(anterior) {
        this.tablaAnterior = anterior;
        this.tablaActual = new Array();
        this.tipoDato = new _Tipo__WEBPACK_IMPORTED_MODULE_0__["default"](_Tipo__WEBPACK_IMPORTED_MODULE_0__["tipoDato"].CADENA);
        this.nombreDato = '';
    }
    getAnterior() {
        return this.tablaAnterior;
    }
    setAnterior(anterior) {
        this.tablaAnterior = anterior;
    }
    getTabla() {
        return this.tablaActual;
    }
    setTabla(Tabla) {
        this.tablaActual = Tabla;
    }
    setVariable(simbolo) {
        /*
        for (let e: tablaSimbolos = this; e != null; e = e.getAnterior()) {
          let encontrado: Simbolo = null;
          for(let h of e.getTabla()){
            if(h.getidentificador()==simbolo.getidentificador()){
              encontrado=h;
              break;
            }
          }
               
          if (encontrado != null) {
            return `La variable existe actualmente`;
          }
          break;
        }
        */
        this.tablaActual.push(simbolo);
        return `creada con exito`;
    }
    getVariable(id) {
        for (let e = this; e != null; e = e.getAnterior()) {
            let encontrado = null;
            for (let h of e.getTabla()) {
                if (h.getidentificador() == id) {
                    encontrado = h;
                    break;
                }
            }
            if (encontrado != null) {
                return encontrado;
            }
        }
        return null;
    }
    getNombre() {
        return this.nombreDato;
    }
    setNombre(nombre) {
        this.nombreDato = nombre;
    }
}
//ARREGLO DE SOLO ID DE METODOS


/***/ }),

/***/ "U3hP":
/*!****************************************************!*\
  !*** ./src/app/paginas/inicio/inicio.component.ts ***!
  \****************************************************/
/*! exports provided: InicioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InicioComponent", function() { return InicioComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _componentes_tabsinicio_tabsinicio_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../componentes/tabsinicio/tabsinicio.component */ "nUj/");


class InicioComponent {
    ngOnInit() { }
}
InicioComponent.ɵfac = function InicioComponent_Factory(t) { return new (t || InicioComponent)(); };
InicioComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: InicioComponent, selectors: [["app-inicio"]], decls: 1, vars: 0, template: function InicioComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-tabsinicio");
    } }, directives: [_componentes_tabsinicio_tabsinicio_component__WEBPACK_IMPORTED_MODULE_1__["TabsinicioComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpbmljaW8uY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "VOP4":
/*!******************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Funciones/Especiales.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Axes; });
/* harmony import */ var _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Abstracto/Instruccion */ "ssiu");
/* harmony import */ var _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Abstracto/nodoAST */ "GvuX");
/* harmony import */ var _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Simbolos/Tipo */ "HVYh");



class Axes extends _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__["Instruccion"] {
    constructor(funcion, fila, columna) {
        super(new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipoDato"].ENTERO), fila, columna);
        this.Funcion = funcion;
    }
    getNodosAST() {
        var nodo = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]('FUNCION ESPECIAL'); //PADRE SELECT
        var nodsBarras = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"](this.Funcion);
        nodo.agregarHijoAST(nodsBarras);
        return nodo;
    }
    interpretar(arbol, tabla) {
        throw new Error('Method not implemented.');
    }
}


/***/ }),

/***/ "Vgfr":
/*!***************************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Excepciones/Errores.ts ***!
  \***************************************************************/
/*! exports provided: Errores */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Errores", function() { return Errores; });
class Errores extends Array {
    constructor(err) {
        super();
        this.push(err);
    }
    static add(err) {
        this.prototype.push(err);
    }
    static verificarerror() {
        if (this.prototype.length > 0) {
            return "Se Detectaron Errores de Compilacion";
        }
        return "Compilacion Sin Errores";
    }
    static geterror() {
        var cad = "";
        cad += "<html>\n";
        cad += "<header>\n";
        cad += "<title>Reporte Errores</title>\n";
        cad += "</header>\n";
        cad += "<body background=\"gray\">\n";
        cad += "<div align=\"center\">\n";
        cad += "<h1>Reporte de Errores de Compilacion</h1>\n";
        cad += "<table border=\"2\" align=\"center\">\n";
        cad += "<tr>\n";
        cad += "<th>TIPO DE ERROR</th><th>DESCRIPCION</th><th>LINEA</th>\n";
        cad += "</tr>\n";
        for (var i = 0; i < this.prototype.length; i++) {
            cad += "<tr>\n";
            cad += "<td>" + this.prototype[i].getTipoError() + "</td><td>" +
                this.prototype[i].getDesc() + "</td><td>" +
                this.prototype[i].getFila() + "</td><td>" +
                this.prototype[i].getcolumna() + "</td>\n";
            cad += "</tr>\n";
        }
        cad += "</table>\n";
        cad += "</div>\n";
        cad += "</body>\n";
        cad += "</html>\n";
        return cad;
    }
    static clear() {
        while (this.prototype.length > 0) {
            this.prototype.pop();
        }
    }
}



/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _paginas_inicio_inicio_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./paginas/inicio/inicio.component */ "U3hP");
/* harmony import */ var _paginas_errores_errores_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./paginas/errores/errores.component */ "Er68");
/* harmony import */ var _paginas_tabla_simbolos_tabla_simbolos_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./paginas/tabla-simbolos/tabla-simbolos.component */ "g7AS");
/* harmony import */ var _paginas_arbol_ast_arbol_ast_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./paginas/arbol-ast/arbol-ast.component */ "OBp0");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _componentes_side_bar_side_bar_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./componentes/side-bar/side-bar.component */ "8hwP");
/* harmony import */ var _componentes_tabsinicio_tabsinicio_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./componentes/tabsinicio/tabsinicio.component */ "nUj/");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/tabs */ "wZkO");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _componentes_contenido_inicio_contenido_inicio_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./componentes/contenido-inicio/contenido-inicio.component */ "CbqC");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
/* harmony import */ var ng2_codemirror__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ng2-codemirror */ "Hzbz");
/* harmony import */ var ng2_codemirror__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(ng2_codemirror__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _paginas_gramatical_report_gramatical_report_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./paginas/gramatical-report/gramatical-report.component */ "LdXe");
/* harmony import */ var _paginas_ast_desc_ast_desc_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./paginas/ast-desc/ast-desc.component */ "gX41");
/* harmony import */ var _paginas_xpath_asc_ast_xpath_asc_ast_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./paginas/xpath-asc-ast/xpath-asc-ast.component */ "DJ5/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/core */ "fXoL");


























class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__["MatToolbarModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"],
            ng2_codemirror__WEBPACK_IMPORTED_MODULE_20__["CodemirrorModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["BrowserAnimationsModule"],
            _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__["MatSidenavModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_12__["MatListModule"],
            _angular_material_tabs__WEBPACK_IMPORTED_MODULE_15__["MatTabsModule"],
            _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_16__["MatButtonToggleModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_18__["MatInputModule"],
            _angular_material_table__WEBPACK_IMPORTED_MODULE_19__["MatTableModule"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_21__["MatDialogModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _paginas_inicio_inicio_component__WEBPACK_IMPORTED_MODULE_4__["InicioComponent"],
        _paginas_errores_errores_component__WEBPACK_IMPORTED_MODULE_5__["ErroresComponent"],
        _paginas_tabla_simbolos_tabla_simbolos_component__WEBPACK_IMPORTED_MODULE_6__["TablaSimbolosComponent"],
        _paginas_arbol_ast_arbol_ast_component__WEBPACK_IMPORTED_MODULE_7__["ArbolASTComponent"],
        _componentes_side_bar_side_bar_component__WEBPACK_IMPORTED_MODULE_13__["SideBarComponent"],
        _componentes_tabsinicio_tabsinicio_component__WEBPACK_IMPORTED_MODULE_14__["TabsinicioComponent"],
        _componentes_contenido_inicio_contenido_inicio_component__WEBPACK_IMPORTED_MODULE_17__["ContenidoInicioComponent"],
        _paginas_gramatical_report_gramatical_report_component__WEBPACK_IMPORTED_MODULE_22__["GramaticalReportComponent"],
        _paginas_ast_desc_ast_desc_component__WEBPACK_IMPORTED_MODULE_23__["AstDescComponent"],
        _paginas_xpath_asc_ast_xpath_asc_ast_component__WEBPACK_IMPORTED_MODULE_24__["XpathAscAstComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__["MatToolbarModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"],
        ng2_codemirror__WEBPACK_IMPORTED_MODULE_20__["CodemirrorModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["BrowserAnimationsModule"],
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__["MatSidenavModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_12__["MatListModule"],
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_15__["MatTabsModule"],
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_16__["MatButtonToggleModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_18__["MatInputModule"],
        _angular_material_table__WEBPACK_IMPORTED_MODULE_19__["MatTableModule"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_21__["MatDialogModule"]] }); })();


/***/ }),

/***/ "avIU":
/*!****************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Instrucciones/todo.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Todo; });
/* harmony import */ var _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Abstracto/Instruccion */ "ssiu");
/* harmony import */ var _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Abstracto/nodoAST */ "GvuX");
/* harmony import */ var _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Simbolos/Tipo */ "HVYh");



class Todo extends _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__["Instruccion"] {
    constructor(select, fila, columna) {
        super(new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipoDato"].CADENA), fila, columna);
        this.Operacion = select;
    }
    interpretar(arbol, tabla) {
        throw new Error("Method not implemented.");
    }
    getNodosAST() {
        var nodo = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"](this.Operacion); //PADRE SELECT    
        return nodo;
    }
}


/***/ }),

/***/ "cikY":
/*!*******************************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Excepciones/NodoErrores.ts ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NodoErrores; });
class NodoErrores {
    constructor(tipo, desc, fila, columna) {
        this.tipoError = tipo;
        this.desc = desc;
        this.fila = fila;
        this.columna = columna;
    }
    getDesc() {
        return this.desc;
    }
    getTipoError() {
        return this.tipoError;
    }
    getcolumna() {
        return this.columna;
    }
    getFila() {
        return this.fila;
    }
    returnError() {
        return ('Se obtuvo: ' +
            this.tipoError +
            ' desc:{' +
            this.desc +
            '} en la fila: ' +
            this.fila +
            ' en la columna: ' +
            this.columna +
            '\n');
    }
}


/***/ }),

/***/ "g7AS":
/*!********************************************************************!*\
  !*** ./src/app/paginas/tabla-simbolos/tabla-simbolos.component.ts ***!
  \********************************************************************/
/*! exports provided: TablaSimbolosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TablaSimbolosComponent", function() { return TablaSimbolosComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/table */ "+0xr");


function TablaSimbolosComponent_th_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Id. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function TablaSimbolosComponent_td_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r14.identificador, " ");
} }
function TablaSimbolosComponent_th_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Contenido ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function TablaSimbolosComponent_td_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r15.contenido, " ");
} }
function TablaSimbolosComponent_th_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " ListaAtributo ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function TablaSimbolosComponent_td_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r16.listaAtributos, " ");
} }
function TablaSimbolosComponent_th_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " ListaObjeto ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function TablaSimbolosComponent_td_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r17.listaObjetos, " ");
} }
function TablaSimbolosComponent_th_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Linea ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function TablaSimbolosComponent_td_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r18 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r18.linea, " ");
} }
function TablaSimbolosComponent_th_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Columna ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function TablaSimbolosComponent_td_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r19 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r19.columna, " ");
} }
function TablaSimbolosComponent_tr_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 14);
} }
function TablaSimbolosComponent_tr_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 15);
} }
class TablaSimbolosComponent {
    constructor() {
        this.displayedColumns = [
            'ID',
            'CONTENIDO',
            'LISTA ATRIBUTO',
            'LISTA OBJETO',
            'LINEA',
            'COLUMNA'
        ];
        this.dataSource = '';
    }
    ngOnInit() {
        let info = window.localStorage.getItem('symbol');
        let otro = JSON.parse(info);
        this.dataSource = otro;
        console.log("Aqui abajo tabla simbolos");
        console.log(this.dataSource);
    }
}
TablaSimbolosComponent.ɵfac = function TablaSimbolosComponent_Factory(t) { return new (t || TablaSimbolosComponent)(); };
TablaSimbolosComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TablaSimbolosComponent, selectors: [["app-tabla-simbolos"]], decls: 24, vars: 3, consts: [[1, "tabla"], ["mat-table", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "ID"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "CONTENIDO"], ["matColumnDef", "LISTA ATRIBUTO"], ["matColumnDef", "LISTA OBJETO"], ["matColumnDef", "LINEA"], ["matColumnDef", "COLUMNA"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", ""]], template: function TablaSimbolosComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "TABLA DE SIMBOLOS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "table", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](4, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, TablaSimbolosComponent_th_5_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, TablaSimbolosComponent_td_6_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](7, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, TablaSimbolosComponent_th_8_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, TablaSimbolosComponent_td_9_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](10, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, TablaSimbolosComponent_th_11_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, TablaSimbolosComponent_td_12_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](13, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, TablaSimbolosComponent_th_14_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, TablaSimbolosComponent_td_15_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](16, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, TablaSimbolosComponent_th_17_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, TablaSimbolosComponent_td_18_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](19, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, TablaSimbolosComponent_th_20_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, TablaSimbolosComponent_td_21_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](22, TablaSimbolosComponent_tr_22_Template, 1, 0, "tr", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, TablaSimbolosComponent_tr_23_Template, 1, 0, "tr", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dataSource", ctx.dataSource);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
    } }, directives: [_angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatTable"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatColumnDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatRow"]], styles: ["table[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  width: 98%;\r\n  margin-top: 1%;\r\n  margin-bottom: 1%;\r\n  margin-left: 1%;\r\n  background-color: #0c7c6d;\r\n}\r\nh1[_ngcontent-%COMP%] {\r\n  margin-left: 35%;\r\n  margin-top: 5%;\r\n  margin-bottom: 5%;\r\n  font-size: 50px;\r\n  font-family: \"Franklin Gothic Medium\", \"Arial Narrow\", Arial, sans-serif;\r\n  background-color: transparent;\r\n}\r\n.tabla[_ngcontent-%COMP%] {\r\n  border: 2px solid #565658;\r\n  margin: auto;\r\n  width: 90%;\r\n  height: auto;\r\n  overflow: hidden;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYmxhLXNpbWJvbG9zLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsZUFBZTtFQUNmLHlCQUF5QjtBQUMzQjtBQUNBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsZUFBZTtFQUNmLHdFQUF3RTtFQUN4RSw2QkFBNkI7QUFDL0I7QUFDQTtFQUNFLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osVUFBVTtFQUNWLFlBQVk7RUFDWixnQkFBZ0I7QUFDbEIiLCJmaWxlIjoidGFibGEtc2ltYm9sb3MuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgd2lkdGg6IDk4JTtcclxuICBtYXJnaW4tdG9wOiAxJTtcclxuICBtYXJnaW4tYm90dG9tOiAxJTtcclxuICBtYXJnaW4tbGVmdDogMSU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBjN2M2ZDtcclxufVxyXG5oMSB7XHJcbiAgbWFyZ2luLWxlZnQ6IDM1JTtcclxuICBtYXJnaW4tdG9wOiA1JTtcclxuICBtYXJnaW4tYm90dG9tOiA1JTtcclxuICBmb250LXNpemU6IDUwcHg7XHJcbiAgZm9udC1mYW1pbHk6IFwiRnJhbmtsaW4gR290aGljIE1lZGl1bVwiLCBcIkFyaWFsIE5hcnJvd1wiLCBBcmlhbCwgc2Fucy1zZXJpZjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxufVxyXG4udGFibGEge1xyXG4gIGJvcmRlcjogMnB4IHNvbGlkICM1NjU2NTg7XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG4gIHdpZHRoOiA5MCU7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ "gX41":
/*!********************************************************!*\
  !*** ./src/app/paginas/ast-desc/ast-desc.component.ts ***!
  \********************************************************/
/*! exports provided: AstDescComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AstDescComponent", function() { return AstDescComponent; });
/* harmony import */ var vis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vis */ "TycK");
/* harmony import */ var vis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vis__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class AstDescComponent {
    constructor() {
        this.contador = 1;
        this.cuerpo = '';
        this.dataSource = '';
        this.nodes = null;
        this.edges = null;
        this.network = null;
        this.directionInput = document.getElementById("direction");
        this.c = 0;
    }
    ngOnInit() {
        this.nodes = [];
        this.edges = [];
        var connectionCount = [];
        let info = window.localStorage.getItem('simbolos1');
        let contenido = JSON.parse(info);
        console.log(contenido);
        var nivel = 0;
        this.nodes.push({ id: this.c, label: this.getValor(contenido), nivel: nivel });
        this.nodes[this.c]["level"] = nivel;
        var hijos = this.recorrerAST(this.c, contenido, nivel);
        console.log(hijos);
        for (let nodo of hijos.nodos) {
            this.nodes.push({ id: nodo.id, label: nodo.label });
        }
        for (let enlace of hijos.enlaces) {
            this.edges.push({ from: enlace.id1, to: enlace.id2 });
        }
        for (let nodo of hijos.nodos) {
            this.nodes[nodo.id]["level"] = nodo.nivel;
        }
        var container = document.getElementById("mynetwork");
        var data = {
            nodes: this.nodes,
            edges: this.edges,
        };
        var options = {
            nodes: {
                borderWidth: 2,
                size: 30,
                color: {
                    border: '#46304E',
                    background: '#D297E9',
                },
                font: {
                    color: "#000000",
                    face: 'Century Gothic'
                }
            },
            edges: {
                smooth: {
                    type: "cubicBezier",
                    forceDirection: "vertical",
                    roundness: 0.4,
                }
            },
            layout: {
                randomSeed: undefined,
                improvedLayout: true,
                hierarchical: {
                    direction: "UD",
                    sortMethod: "hubsize"
                },
            },
            physics: false,
        };
        this.network = new vis__WEBPACK_IMPORTED_MODULE_0__["Network"](container, data, options);
        this.network.on("select", function (params) {
            document.getElementById("selection").innerText =
                "Selection: " + params.nodes;
        });
        let registros = [];
    }
    destroy() {
        if (this.network !== null) {
            this.network.destroy();
            this.network = null;
        }
    }
    recorrerAST(padre, nPadre, nivel) {
        var arr = { nodos: [], enlaces: [] };
        for (let hijo of this.getHijos(nPadre)) {
            nivel++;
            this.c++;
            arr.enlaces.push({ id1: padre, id2: this.c });
            arr.nodos.push({ id: this.c, label: this.getValor(hijo), nivel: nivel });
            var resultado = this.recorrerAST(this.c, hijo, nivel);
            arr.enlaces = arr.enlaces.concat(resultado.enlaces);
            arr.nodos = arr.nodos.concat(resultado.nodos);
        }
        return arr;
    }
    getValor(nodo) {
        return nodo.valor;
    }
    getHijos(nodo) {
        return nodo.listaNodos;
    }
}
AstDescComponent.ɵfac = function AstDescComponent_Factory(t) { return new (t || AstDescComponent)(); };
AstDescComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AstDescComponent, selectors: [["app-ast-desc"]], decls: 1, vars: 0, consts: [["id", "mynetwork"]], template: function AstDescComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 0);
    } }, styles: ["#mynetwork[_ngcontent-%COMP%] {\r\n    width: 1362px;\r\n    height: 595px;\r\n    border: 1px solid rgb(255, 254, 254);\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzdC1kZXNjLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxhQUFhO0lBQ2IsYUFBYTtJQUNiLG9DQUFvQztFQUN0QyIsImZpbGUiOiJhc3QtZGVzYy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI215bmV0d29yayB7XHJcbiAgICB3aWR0aDogMTM2MnB4O1xyXG4gICAgaGVpZ2h0OiA1OTVweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYigyNTUsIDI1NCwgMjU0KTtcclxuICB9Il19 */"] });


/***/ }),

/***/ "iolQ":
/*!******************************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Instrucciones/AtributosExpresion.ts ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AtributoExpresion; });
/* harmony import */ var _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Abstracto/Instruccion */ "ssiu");
/* harmony import */ var _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Abstracto/nodoAST */ "GvuX");
/* harmony import */ var _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Simbolos/Tipo */ "HVYh");



class AtributoExpresion extends _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__["Instruccion"] {
    constructor(select, expresion, fila, columna) {
        super(new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipoDato"].CADENA), fila, columna);
        this.Operacion = select;
        this.expresion = expresion;
    }
    interpretar(arbol, tabla) {
        throw new Error("Method not implemented.");
    }
    getNodosAST() {
        var nodo = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]("ATRIBUTO"); //PADRE SELECT
        if (this.expresion != null) {
            nodo.agregarHijo(this.Operacion);
            nodo.agregarHijoAST(this.expresion.getNodosAST());
        }
        return nodo;
    }
}


/***/ }),

/***/ "j/FN":
/*!****************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Expresiones/Logica.ts ***!
  \****************************************************************/
/*! exports provided: default, Logicas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Logica; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logicas", function() { return Logicas; });
/* harmony import */ var _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Abstracto/Instruccion */ "ssiu");
/* harmony import */ var _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Abstracto/nodoAST */ "GvuX");
/* harmony import */ var _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Excepciones/NodoErrores */ "E7Rf");
/* harmony import */ var _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Simbolos/Tipo */ "HVYh");
//relacionales




class Logica extends _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__["Instruccion"] {
    constructor(relacion, fila, columna, cond1, cond2) {
        super(new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO), fila, columna);
        this.loogica = relacion;
        if (!cond2)
            this.condExcep = cond1;
        else {
            this.cond1 = cond1;
            this.cond2 = cond2;
        }
    }
    getNodosAST() {
        var _a, _b;
        let nodo = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]('LOGICO');
        if (this.condExcep != null) {
            nodo.agregarHijo(this.loogica + '', 'log', this.loogica);
            nodo.agregarHijoAST(this.condExcep.getNodosAST());
        }
        else {
            nodo.agregarHijoAST((_a = this.cond1) === null || _a === void 0 ? void 0 : _a.getNodosAST());
            nodo.agregarHijo(this.loogica + '', 'log', this.loogica);
            nodo.agregarHijoAST((_b = this.cond2) === null || _b === void 0 ? void 0 : _b.getNodosAST());
        }
        return nodo;
    }
    interpretar(arbol, tabla) {
        var _a, _b;
        let izq, der, unico;
        izq = der = unico = null;
        if (this.condExcep != null) {
            unico = this.condExcep.interpretar(arbol, tabla);
            if (unico instanceof _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"])
                return unico;
        }
        else {
            izq = (_a = this.cond1) === null || _a === void 0 ? void 0 : _a.interpretar(arbol, tabla);
            if (izq instanceof _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"])
                return izq;
            der = (_b = this.cond2) === null || _b === void 0 ? void 0 : _b.interpretar(arbol, tabla);
            if (der instanceof _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"])
                return der;
        }
        //inicio comparacion
        switch (this.loogica) {
            case Logicas.AND:
                this.tipoDato.setTipo(_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].BOOLEANO);
                return izq && der ? true : false;
            case Logicas.OR:
                this.tipoDato.setTipo(_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].BOOLEANO);
                return izq || der ? true : false;
            case Logicas.NOT:
                this.tipoDato.setTipo(_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].BOOLEANO);
                return !unico;
        }
    }
}
var Logicas;
(function (Logicas) {
    Logicas[Logicas["OR"] = 0] = "OR";
    Logicas[Logicas["AND"] = 1] = "AND";
    Logicas[Logicas["NOT"] = 2] = "NOT";
})(Logicas || (Logicas = {}));


/***/ }),

/***/ "jtD6":
/*!**********************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Instrucciones/BarrasNodo.ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BarrasNodo; });
/* harmony import */ var src_app_Backend_XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos */ "TD3t");
/* harmony import */ var _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Abstracto/Instruccion */ "ssiu");
/* harmony import */ var _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Abstracto/nodoAST */ "GvuX");
/* harmony import */ var _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Simbolos/Tipo */ "HVYh");




class BarrasNodo extends _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_1__["Instruccion"] {
    constructor(barra1, expresion, fila, columna, barra2) {
        super(new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO), fila, columna);
        this.contenido = "";
        this.Barra = barra1;
        this.Barra2 = barra2;
        this.Operacion = expresion;
    }
    getNodosAST() {
        var nodo = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_2__["default"]('INSTRUCCION'); //PADRE SELECT
        var nodsBarras = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_2__["default"](this.Barra);
        nodo.agregarHijoAST(nodsBarras);
        if (this.Barra2 != null) {
            /*nodo.agregarHijo(this.Barra2)*/
            var nodsBarras2 = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_2__["default"](this.Barra2);
            nodo.agregarHijoAST(nodsBarras2);
        }
        if (this.Operacion != null) {
            nodo.agregarHijoAST(this.Operacion.getNodosAST());
        }
        return nodo;
    }
    //BARRA: SELECCIONA DESDE EL NODO RAIZ
    //DOBLE BARRA: SELECCIONA LOS NODOS QUE HAGAN MATCH EN EL DOCUMENTO NO IMPORTANDO DONDE ESTEN DESDE EL NODO ACTUAL 
    interpretar(arbol, tabla) {
        //arbol.gettablaGlobal();
        //BARRA
        console.log('BARRA');
        console.log(tabla);
        let variable = this.Operacion.interpretar(arbol, tabla);
        console.log(this.Operacion);
        //if (variable != null) {
        if (this.Barra2 == null) {
            console.log("Aqui esta el arbol");
            let salidas = new src_app_Backend_XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_0__["default"]();
            let cadena = '';
            let error = '';
            for (var key of tabla.getTabla()) { //SIMBOLOS
                /*let objetos = key.getvalor();
                if (objetos instanceof tablaSimbolos) { // BUSCAR UNA RAMA HIJA
                  for(let key2 of objetos.getTabla())
                  {
                    if(key2.getidentificador() == variable){
                      salidas.push(key2)
                    }
                  }
        
                } else {
                  //this.contenido += objetos.replaceAll("%20", " ").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&apos;", "'").replaceAll("&quot;", "\"").replaceAll("   ","\n");
                  //MANDA ERROR
                }*/
                if (key.getidentificador() == variable) {
                    console.log(key.getidentificador());
                    if (key.getvalor() instanceof src_app_Backend_XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_0__["default"]) {
                        for (let sim of key.getvalor().getTabla()) {
                            salidas.setVariable(sim);
                        }
                    }
                    else {
                        cadena += key.getvalor().replaceAll("%20", " ").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&apos;", "'").replaceAll("&quot;", "\"").replaceAll("   ", "\n");
                    }
                }
                else {
                    error = "Nodo no encontrado ";
                    console.log(error);
                }
            }
            if (cadena != '') {
                return cadena;
            }
            else if (error != '') {
                return error;
            }
            console.log("OBJETOSSALIDA");
            console.log(salidas);
            return salidas;
        }
        else {
            console.log("entro doble barra");
            //DOBLE BARRA
            let salidas = new src_app_Backend_XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_0__["default"]();
            let cadena = '';
            for (var key of tabla.getTabla()) {
                if (key.getidentificador() == variable) {
                    console.log(key.getidentificador());
                    if (key.getvalor() instanceof src_app_Backend_XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_0__["default"]) {
                        for (let sim of key.getvalor().getTabla()) {
                            salidas.setVariable(sim);
                        }
                    }
                    else {
                        cadena += key.getvalor().replaceAll("%20", " ").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&apos;", "'").replaceAll("&quot;", "\"").replaceAll("   ", "\n");
                    }
                }
                if (cadena != '') {
                    return cadena;
                }
                console.log("OBJETOSSALIDA");
                console.log(salidas);
                return salidas;
            }
        }
    }
    //localStorage.setItem("consulta", this.contenido);
    /*} else {
      return new NodoErrores(
        'SEMANTICO',
        'VARIABLE ' + this.Operacion + ' NO EXISTE',
        this.fila,
        this.columna
      );
    }*/
    buscarTablaSimbolos(t, tri) {
        for (var key of t.tablaActual) {
            //alert(key + " = " + value);
            var listaobjetitos = "";
            var nombre = key.getidentificador();
            let objetos = key.getvalor();
            if (objetos instanceof src_app_Backend_XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_0__["default"]) {
                for (var key3 of objetos.tablaActual) {
                    listaobjetitos += `${key3.getidentificador()}, `;
                }
                this.buscarTablaSimbolos(objetos, tri);
            }
            else {
                this.contenido += objetos.replaceAll("%20", " ").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&apos;", "'").replaceAll("&quot;", "\"").replaceAll("   ", "\n");
            }
        }
        return this.contenido;
        console.log(this.contenido);
        localStorage.setItem("consulta", this.contenido);
    }
}


/***/ }),

/***/ "kaQ3":
/*!****************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/XMLgraph.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var XMLgraph = (function () {
    var o = function (k, v, o, l) { for (o = o || {}, l = k.length; l--; o[k[l]] = v)
        ; return o; }, $V0 = [2, 11], $V1 = [1, 3], $V2 = [1, 4], $V3 = [1, 5], $V4 = [5, 9, 10, 13, 16, 17], $V5 = [1, 11], $V6 = [2, 14], $V7 = [10, 12, 14, 15], $V8 = [5, 10, 16], $V9 = [1, 19];
    var parser = { trace: function trace() { },
        yy: {},
        symbols_: { "error": 2, "START": 3, "OBJETO": 4, "EOF": 5, "INSTRUCCION": 6, "CUERPO": 7, "OBJETOS": 8, "MENORQUEESPECIAL": 9, "IDENTIFICADOR": 10, "L_ATRIBUTOS": 11, "MAYORQUEESPECIAL": 12, "MENORQUE": 13, "SELFCLOSE": 14, "MAYORQUE": 15, "SALIDA": 16, "COMENTARIOS": 17, "ATRIBUTO": 18, "IGUAL": 19, "CADENA": 20, "QUOTE": 21, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 7: "CUERPO", 9: "MENORQUEESPECIAL", 10: "IDENTIFICADOR", 12: "MAYORQUEESPECIAL", 13: "MENORQUE", 14: "SELFCLOSE", 15: "MAYORQUE", 16: "SALIDA", 17: "COMENTARIOS", 19: "IGUAL", 20: "CADENA", 21: "QUOTE" },
        productions_: [0, [3, 2], [6, 1], [6, 1], [8, 2], [8, 1], [4, 5], [4, 5], [4, 8], [4, 7], [4, 1], [4, 0], [11, 2], [11, 1], [11, 0], [18, 3], [18, 3]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */
            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    return "<START> ::= <OBJETO> <EOF>\n" + $$[$0 - 1];
                    break;
                case 2:
                    this.$ = $$[$0] + "<INSTRUCCION> ::= <CUERPO>\n" + "<INSTRUCCION> ::= " + " \n";
                    break;
                case 3:
                    this.$ = $$[$0] + "<INSTRUCCION> ::= <OBJETOS>\n";
                    break;
                case 4:
                    this.$ = "<OBJETOS> ::= <OBJETOS><OBJETO>\n" + $$[$0 - 1] + $$[$0];
                    break;
                case 5:
                    this.$ = "<OBJETOS> ::= <OBJETO>\n" + $$[$0];
                    break;
                case 6:
                    this.$ = "<OBJETO> ::= <MENORQUEESPECIAL> <IDENTIFICADOR> <L_ATRIBUTOS> <MAYORQUEESPECIAL> <INSTRUCCION>\n<OBJETO> ::= <?" + $$[$0 - 3] + " " + $$[$0 - 2] + "?>\n" + $$[$0];
                    break;
                case 7:
                    this.$ = "<OBJETO> ::= <MENORQUE> <IDENTIFICADOR> <L_ATRIBUTOS> <SELFCLOSE> <INSTRUCCION>\n<OBJETO> ::= <" + $$[$0 - 3] + " " + $$[$0 - 2] + "/>\n" + $$[$0];
                    break;
                case 8:
                    this.$ = "<OBJETO> ::= <MENORQUE> <IDENTIFICADOR> <L_ATRIBUTOS> <MAYORQUE> <INSTRUCCION> <SALIDA> <IDENTIFICADOR> <MAYORQUE>\n<OBJETO> ::= <" + $$[$0 - 6] + $$[$0 - 5] + ">\n" + $$[$0 - 3] + "<" + $$[$0 - 1] + ">\n";
                    break;
                case 9:
                    this.$ = "<OBJETO> ::= <MENORQUE> <IDENTIFICADOR> <L_ATRIBUTOS> <MAYORQUE> <INSTRUCCION> <IDENTIFICADOR> <MAYORQUE>\n<OBJETO> ::= <" + $$[$0 - 5] + $$[$0 - 4] + ">\n" + $$[$0 - 2] + "<" + $$[$0 - 1] + ">\n";
                    break;
                case 10:
                    this.$ = "<OBJETO> ::= <COMENTARIOS>\n<OBJETO> ::= <!--" + $$[$0] + "-->\n";
                    break;
                case 11:
                case 14:
                    this.$ = "";
                    break;
                case 12:
                    this.$ = "<L_ATRIBUTOS> ::= <L_ATRIBUTOS><ATRIBUTO>\n" + $$[$0 - 1] + $$[$0] + "\n";
                    break;
                case 13:
                    this.$ = "<L_ATRIBUTOS> ::= <ATRIBUTO>\n" + $$[$0] + "\n";
                    break;
                case 15:
                case 16:
                    this.$ = "<ATRIBUTO> ::= <IDENTIFICADOR><IGUAL><CADENA>\n<ATRIBUTO> ::= " + $$[$0 - 2] + "= \"" + $$[$0] + "\"\n";
                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 5: $V0, 9: $V1, 13: $V2, 17: $V3 }, { 1: [3] }, { 5: [1, 6] }, { 10: [1, 7] }, { 10: [1, 8] }, o($V4, [2, 10]), { 1: [2, 1] }, { 10: $V5, 11: 9, 12: $V6, 18: 10 }, o([14, 15], $V6, { 18: 10, 11: 12, 10: $V5 }), { 10: $V5, 12: [1, 13], 18: 14 }, o($V7, [2, 13]), { 19: [1, 15] }, { 10: $V5, 14: [1, 16], 15: [1, 17], 18: 14 }, o($V8, $V0, { 6: 18, 8: 20, 4: 21, 7: $V9, 9: $V1, 13: $V2, 17: $V3 }), o($V7, [2, 12]), { 20: [1, 22], 21: [1, 23] }, o($V8, $V0, { 8: 20, 4: 21, 6: 24, 7: $V9, 9: $V1, 13: $V2, 17: $V3 }), o([10, 16], $V0, { 8: 20, 4: 21, 6: 25, 7: $V9, 9: $V1, 13: $V2, 17: $V3 }), o($V4, [2, 6]), o($V4, [2, 2]), o($V8, [2, 3], { 4: 26, 9: $V1, 13: $V2, 17: $V3 }), o($V4, [2, 5]), o($V7, [2, 15]), o($V7, [2, 16]), o($V4, [2, 7]), { 10: [1, 28], 16: [1, 27] }, o($V4, [2, 4]), { 10: [1, 29] }, { 15: [1, 30] }, { 15: [1, 31] }, o($V4, [2, 9]), o($V4, [2, 8])],
        defaultActions: { 6: [2, 1] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            }
            else {
                var error = new Error(str);
                error.hash = hash;
                throw error;
            }
        },
        parse: function parse(input) {
            var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = { yy: {} };
            for (var k in this.yy) {
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState.yy[k] = this.yy[k];
                }
            }
            lexer.setInput(input, sharedState.yy);
            sharedState.yy.lexer = lexer;
            sharedState.yy.parser = this;
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            }
            else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            _token_stack: var lex = function () {
                var token;
                token = lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token;
            };
            var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                }
                else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    }
                    else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(lexer.yytext);
                        lstack.push(lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        }
                        else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [
                                lstack[lstack.length - (len || 1)].range[0],
                                lstack[lstack.length - 1].range[1]
                            ];
                        }
                        r = this.performAction.apply(yyval, [
                            yytext,
                            yyleng,
                            yylineno,
                            sharedState.yy,
                            action[1],
                            vstack,
                            lstack
                        ].concat(args));
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        } };
    var palabra = "";
    var palabra1 = "";
    /* generated by jison-lex 0.3.4 */
    var lexer = (function () {
        var lexer = ({
            EOF: 1,
            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                }
                else {
                    throw new Error(str);
                }
            },
            // resets the lexer, sets new input
            setInput: function (input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },
            // consumes and returns one char from the input
            input: function () {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                }
                else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }
                this._input = this._input.slice(1);
                return ch;
            },
            // unshifts one char (or a string) into the input
            unput: function (ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);
                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);
                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;
                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ?
                        (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                            + oldLines[oldLines.length - lines.length].length - lines[0].length :
                        this.yylloc.first_column - len
                };
                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },
            // When called from action, caches matched text and appends it on next action
            more: function () {
                this._more = true;
                return this;
            },
            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function () {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },
            // retain first n characters of the match
            less: function (n) {
                this.unput(this.match.slice(n));
            },
            // displays already matched input, i.e. for error messages
            pastInput: function () {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },
            // displays upcoming input, i.e. for error messages
            upcomingInput: function () {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },
            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function () {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },
            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function (match, indexed_rule) {
                var token, lines, backup;
                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }
                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ?
                        lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                        this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                }
                else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },
            // return next match in input
            next: function () {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }
                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            }
                            else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            }
                            else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        }
                        else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },
            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                }
                else {
                    return this.lex();
                }
            },
            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },
            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                }
                else {
                    return this.conditionStack[0];
                }
            },
            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                }
                else {
                    return this.conditions["INITIAL"].rules;
                }
            },
            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                }
                else {
                    return "INITIAL";
                }
            },
            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },
            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: { "case-insensitive": true },
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0:
                        break;
                    case 1:
                        console.log("Comenzo el comentario");
                        this.begin("Comentario");
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        console.log("Termino el comentario");
                        this.popState();
                        break;
                    case 5:
                        console.log("Texto dentro del comentario: " + yy_.yytext + " :(");
                        return 17;
                        break;
                    case 6:
                        this.begin('cuerpo');
                        return 15;
                        break;
                    case 7:
                        this.begin('INITIAL');
                        if (palabra.replaceAll(" ", "") == "")
                            return 16;
                        yy_.yytext = palabra;
                        palabra = "";
                        if (palabra.replaceAll(" ", "") == "")
                            return 7;
                        break;
                    case 8:
                        this.begin('INITIAL');
                        return 13;
                        yy_.yytext = palabra;
                        palabra = "";
                        return 7;
                        break;
                    case 9:
                        this.begin('INITIAL');
                        return 14;
                        yy_.yytext = palabra;
                        palabra = "";
                        return 7;
                        break;
                    case 10:
                        palabra += yy_.yytext;
                        break;
                    case 11:
                        return 12;
                        break;
                    case 12:
                        return 16;
                        break;
                    case 13:
                        return 14;
                        break;
                    case 14:
                        return 9;
                        break;
                    case 15:
                        return 13;
                        break;
                    case 16:
                        return 19;
                        break;
                    case 17:
                        yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);
                        return 20;
                        break;
                    case 18:
                        yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);
                        return 21;
                        break;
                    case 19:
                        return 10;
                        break;
                    case 20:
                        return 5;
                        break;
                    case 21:
                        break;
                    case 22:
                        break;
                    case 23:
                        break;
                    case 24:
                        console.log("Error Lexico");
                        break;
                }
            },
            rules: [/^(?:\/\/.*)/i, /^(?:<!--)/i, /^(?:[ \r\t]+)/i, /^(?:\n)/i, /^(?:-->)/i, /^(?:[^"-->"]+)/i, /^(?:>)/i, /^(?:<\/)/i, /^(?:<)/i, /^(?:<)/i, /^(?:.)/i, /^(?:\?>)/i, /^(?:<\/)/i, /^(?:\/>)/i, /^(?:<\?)/i, /^(?:<)/i, /^(?:=)/i, /^(?:"[^\"]*")/i, /^(?:'[^\']*')/i, /^(?:([a-zA-Z])[a-zA-Z0-9_]*)/i, /^(?:$)/i, /^(?:[ \r\t]+)/i, /^(?:\n+)/i, /^(?:\s+)/i, /^(?:.)/i],
            conditions: { "Comentario": { "rules": [2, 3, 4, 5], "inclusive": false }, "xml": { "rules": [0, 1, 6, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], "inclusive": true }, "cuerpo": { "rules": [0, 1, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], "inclusive": true }, "INITIAL": { "rules": [0, 1, 6, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], "inclusive": true } }
        });
        return lexer;
    })();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;
    parser.Parser = Parser;
    return new Parser;
})();
if (true) {
    exports.parser = XMLgraph;
    exports.Parser = XMLgraph.Parser;
    exports.parse = function () { return XMLgraph.parse.apply(XMLgraph, arguments); };
    exports.main = function commonjsMain(args) {
        if (!args[1]) {
            console.log('Usage: ' + args[0] + ' FILE');
            process.exit(1);
        }
        var source = __webpack_require__(/*! fs */ 1).readFileSync(__webpack_require__(/*! path */ 2).normalize(args[1]), "utf8");
        return exports.parser.parse(source);
    };
    if ( true && __webpack_require__.c[__webpack_require__.s] === module) {
        exports.main(process.argv.slice(1));
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "YuTi")(module)))

/***/ }),

/***/ "mh+0":
/*!********************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Expresiones/Relacional.ts ***!
  \********************************************************************/
/*! exports provided: default, Relacionales */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Relacional; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Relacionales", function() { return Relacionales; });
/* harmony import */ var _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Abstracto/Instruccion */ "ssiu");
/* harmony import */ var _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Abstracto/nodoAST */ "GvuX");
/* harmony import */ var _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Excepciones/NodoErrores */ "E7Rf");
/* harmony import */ var _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Simbolos/Tipo */ "HVYh");
//aritmeticas




class Relacional extends _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__["Instruccion"] {
    constructor(relacion, fila, columna, cond1, cond2) {
        super(new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO), fila, columna);
        this.relacion = relacion;
        this.cond1 = cond1;
        this.cond2 = cond2;
    }
    getNodosAST() {
        let nodo = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]('RELACIONAL');
        nodo.agregarHijoAST(this.cond1.getNodosAST());
        nodo.agregarHijo(this.relacion + '', 'rel', this.relacion);
        nodo.agregarHijoAST(this.cond2.getNodosAST());
        return nodo;
    }
    interpretar(arbol, tabla) {
        let izq, der;
        izq = this.obtieneValor(this.cond1, arbol, tabla);
        if (izq instanceof _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"])
            return izq;
        der = this.obtieneValor(this.cond2, arbol, tabla);
        if (der instanceof _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"])
            return der;
        if (this.cond1.tipoDato.getTipo() == _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA &&
            this.cond2.tipoDato.getTipo() != _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA) {
            return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('ERROR SEMANTICO', 'NO SE PUEDE COMPARAR UNA CADENA CON OTRO TIPO DE DATO QUE NO SEA CADENA', this.fila, this.columna);
        }
        else if (this.cond2.tipoDato.getTipo() == _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA &&
            this.cond1.tipoDato.getTipo() != _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA) {
            return new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_2__["default"]('ERROR SEMANTICO', 'NO SE PUEDE COMPARAR UNA CADENA CON OTRO TIPO DE DATO QUE NO SEA CADENA', this.fila, this.columna);
        }
        else {
            this.tipoDato.setTipo(_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].BOOLEANO);
            switch (this.relacion) {
                case Relacionales.IGUAL:
                    return izq == der;
                case Relacionales.DIFERENTE:
                    return izq != der;
                case Relacionales.MENOR:
                    return izq < der;
                case Relacionales.MENORIGUAL:
                    return izq <= der;
                case Relacionales.MAYOR:
                    return izq > der;
                case Relacionales.MAYORIGUAL:
                    return izq >= der;
                default:
                    return 'what';
            }
        }
    }
    obtieneValor(operando, arbol, tabla) {
        let valor = operando.interpretar(arbol, tabla);
        switch (operando.tipoDato.getTipo()) {
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].ENTERO:
                return parseInt(valor);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].DECIMAL:
                return parseFloat(valor);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CARACTER:
                var da = valor + '';
                var res = da.charCodeAt(0);
                return res;
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].BOOLEANO:
                let dats = valor + '';
                let otr = dats.toLowerCase();
                return parseInt(otr);
            case _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].CADENA:
                return '' + valor;
        }
    }
}
var Relacionales;
(function (Relacionales) {
    Relacionales[Relacionales["IGUAL"] = 0] = "IGUAL";
    Relacionales[Relacionales["DIFERENTE"] = 1] = "DIFERENTE";
    Relacionales[Relacionales["MAYOR"] = 2] = "MAYOR";
    Relacionales[Relacionales["MENOR"] = 3] = "MENOR";
    Relacionales[Relacionales["MAYORIGUAL"] = 4] = "MAYORIGUAL";
    Relacionales[Relacionales["MENORIGUAL"] = 5] = "MENORIGUAL";
    Relacionales[Relacionales["NOIGUAL"] = 6] = "NOIGUAL";
})(Relacionales || (Relacionales = {}));


/***/ }),

/***/ "nUj/":
/*!****************************************************************!*\
  !*** ./src/app/componentes/tabsinicio/tabsinicio.component.ts ***!
  \****************************************************************/
/*! exports provided: TabsinicioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsinicioComponent", function() { return TabsinicioComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/tabs */ "wZkO");
/* harmony import */ var _contenido_inicio_contenido_inicio_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../contenido-inicio/contenido-inicio.component */ "CbqC");



class TabsinicioComponent {
    constructor() { }
    ngOnInit() {
    }
}
TabsinicioComponent.ɵfac = function TabsinicioComponent_Factory(t) { return new (t || TabsinicioComponent)(); };
TabsinicioComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TabsinicioComponent, selectors: [["app-tabsinicio"]], decls: 7, vars: 0, consts: [["dynamicHeight", ""], ["label", "CONTENIDO 1"], ["label", "CONTENIDO 2"], ["label", "CONTENIDO 3"]], template: function TabsinicioComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-tab-group", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-tab", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-contenido-inicio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-tab", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "app-contenido-inicio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-tab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "app-contenido-inicio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_material_tabs__WEBPACK_IMPORTED_MODULE_1__["MatTabGroup"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_1__["MatTab"], _contenido_inicio_contenido_inicio_component__WEBPACK_IMPORTED_MODULE_2__["ContenidoInicioComponent"]], styles: [".example-small-box[_ngcontent-%COMP%], .example-large-box[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  margin: 16px;\r\n  padding: 16px;\r\n  border-radius: 8px;\r\n}\r\n\r\n.example-small-box[_ngcontent-%COMP%] {\r\n  height: 100px;\r\n  width: 100px;\r\n}\r\n\r\n.example-large-box[_ngcontent-%COMP%] {\r\n  height: 300px;\r\n  width: 300px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYnNpbmljaW8uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7RUFFRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osYUFBYTtFQUNiLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsWUFBWTtBQUNkIiwiZmlsZSI6InRhYnNpbmljaW8uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5leGFtcGxlLXNtYWxsLWJveCxcclxuLmV4YW1wbGUtbGFyZ2UtYm94IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgbWFyZ2luOiAxNnB4O1xyXG4gIHBhZGRpbmc6IDE2cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG59XHJcblxyXG4uZXhhbXBsZS1zbWFsbC1ib3gge1xyXG4gIGhlaWdodDogMTAwcHg7XHJcbiAgd2lkdGg6IDEwMHB4O1xyXG59XHJcblxyXG4uZXhhbXBsZS1sYXJnZS1ib3gge1xyXG4gIGhlaWdodDogMzAwcHg7XHJcbiAgd2lkdGg6IDMwMHB4O1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ "ob2c":
/*!************************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Simbolos/Simbolo.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Simbolo; });
class Simbolo {
    constructor(tipo, identificador, linea, columna, valor) {
        this.atributo = new Map();
        this.tipo = tipo;
        this.identificador = identificador.toLowerCase();
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }
    //getters y setters
    gettipo() {
        return this.tipo;
    }
    settipo(value) {
        this.tipo = value;
    }
    getidentificador() {
        return this.identificador;
    }
    setidentificador(value) {
        this.identificador = value;
    }
    getvalor() {
        return this.valor;
    }
    setvalor(value) {
        this.valor = value;
    }
    agregarAtributo(par1, par2) {
        this.atributo.set(par1, par2);
    }
    getAtributo() {
        return this.atributo;
    }
    setAtributo(atributo) {
        this.atributo = atributo;
    }
    getLinea() {
        return this.linea;
    }
    getColumna() {
        return this.columna;
    }
    setLinea(linea) {
        this.linea = linea;
    }
    setColumna(col) {
        this.columna = col;
    }
}


/***/ }),

/***/ "pcrZ":
/*!******************************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/GramaticaXMLDescPRUEBA.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var GramaticaXMLDescPRUEBA = (function () {
    var o = function (k, v, o, l) { for (o = o || {}, l = k.length; l--; o[k[l]] = v)
        ; return o; }, $V0 = [1, 3], $V1 = [1, 4], $V2 = [1, 10], $V3 = [2, 13], $V4 = [12, 14, 15], $V5 = [5, 10, 16], $V6 = [2, 6], $V7 = [1, 18], $V8 = [5, 9, 10, 13, 16], $V9 = [10, 12, 14, 15];
    var parser = { trace: function trace() { },
        yy: {},
        symbols_: { "error": 2, "START": 3, "OBJETO": 4, "EOF": 5, "INSTRUCCION": 6, "CUERPO": 7, "OBJETOS": 8, "MENORQUEESPECIAL": 9, "IDENTIFICADOR": 10, "L_ATRIBUTOS": 11, "MAYORQUEESPECIAL": 12, "MENORQUE": 13, "SELFCLOSE": 14, "MAYORQUE": 15, "SALIDA": 16, "ATRIBUTO": 17, "IGUAL": 18, "CADENA": 19, "QUOTE": 20, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 7: "CUERPO", 9: "MENORQUEESPECIAL", 10: "IDENTIFICADOR", 12: "MAYORQUEESPECIAL", 13: "MENORQUE", 14: "SELFCLOSE", 15: "MAYORQUE", 16: "SALIDA", 18: "IGUAL", 19: "CADENA", 20: "QUOTE" },
        productions_: [0, [3, 2], [6, 1], [6, 1], [8, 2], [8, 1], [8, 0], [4, 5], [4, 5], [4, 8], [4, 7], [11, 2], [11, 1], [11, 0], [17, 3], [17, 3]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */
            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    console.log($$[$0 - 1]);
                    return $$[$0 - 1];
                    break;
                case 2:
                case 3:
                    this.$ = $$[$0];
                    break;
                case 4:
                    $$[$0].push($$[$0 - 1]);
                    this.$ = $$[$0];
                    break;
                case 5:
                    this.$ = [$$[$0]];
                    break;
                case 7:
                case 8:
                    this.$ = new objeto.default($$[$0 - 3], null, $$[$0 - 2], $$[$0], _$[$0 - 4].first_line, _$[$0 - 4].first_column);
                    break;
                case 9:
                    this.$ = new objeto.default($$[$0 - 6], null, $$[$0 - 5], $$[$0 - 3], _$[$0 - 7].first_line, _$[$0 - 7].first_column);
                    break;
                case 10:
                    this.$ = new objeto.default($$[$0 - 5], $$[$0 - 2], $$[$0 - 4], null, _$[$0 - 6].first_line, _$[$0 - 6].first_column);
                    break;
                case 11:
                    $$[$0].push($$[$0 - 1]);
                    this.$ = $$[$0];
                    break;
                case 12:
                    this.$ = [$$[$0]];
                    break;
                case 14:
                case 15:
                    this.$ = new atributo.default($$[$0 - 2], $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 9: $V0, 13: $V1 }, { 1: [3] }, { 5: [1, 5] }, { 10: [1, 6] }, { 10: [1, 7] }, { 1: [2, 1] }, { 10: $V2, 11: 8, 12: $V3, 17: 9 }, o([14, 15], $V3, { 17: 9, 11: 11, 10: $V2 }), { 12: [1, 12] }, o($V4, [2, 12], { 17: 9, 11: 13, 10: $V2 }), { 18: [1, 14] }, { 14: [1, 15], 15: [1, 16] }, o($V5, $V6, { 6: 17, 8: 19, 4: 20, 7: $V7, 9: $V0, 13: $V1 }), o($V4, [2, 11]), { 19: [1, 21], 20: [1, 22] }, o($V5, $V6, { 8: 19, 4: 20, 6: 23, 7: $V7, 9: $V0, 13: $V1 }), o([10, 16], $V6, { 8: 19, 4: 20, 6: 24, 7: $V7, 9: $V0, 13: $V1 }), o($V8, [2, 7]), o($V8, [2, 2]), o($V8, [2, 3]), o($V5, [2, 5], { 4: 20, 8: 25, 9: $V0, 13: $V1 }), o($V9, [2, 14]), o($V9, [2, 15]), o($V8, [2, 8]), { 10: [1, 27], 16: [1, 26] }, o($V8, [2, 4]), { 10: [1, 28] }, { 15: [1, 29] }, { 15: [1, 30] }, o($V8, [2, 10]), o($V8, [2, 9])],
        defaultActions: { 5: [2, 1] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            }
            else {
                var error = new Error(str);
                error.hash = hash;
                throw error;
            }
        },
        parse: function parse(input) {
            var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = { yy: {} };
            for (var k in this.yy) {
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState.yy[k] = this.yy[k];
                }
            }
            lexer.setInput(input, sharedState.yy);
            sharedState.yy.lexer = lexer;
            sharedState.yy.parser = this;
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            }
            else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            _token_stack: var lex = function () {
                var token;
                token = lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token;
            };
            var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                }
                else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    }
                    else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(lexer.yytext);
                        lstack.push(lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        }
                        else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [
                                lstack[lstack.length - (len || 1)].range[0],
                                lstack[lstack.length - 1].range[1]
                            ];
                        }
                        r = this.performAction.apply(yyval, [
                            yytext,
                            yyleng,
                            yylineno,
                            sharedState.yy,
                            action[1],
                            vstack,
                            lstack
                        ].concat(args));
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        } };
    const atributo = __webpack_require__(/*! ./Expresiones/Atributo */ "uvkm");
    const tipo = __webpack_require__(/*! ./Simbolos/Tipo */ "Oyrp");
    const objeto = __webpack_require__(/*! ./Expresiones/Objeto */ "xzWR");
    const CErrores = __webpack_require__(/*! ./Excepciones/Errores */ "Vgfr");
    const CNodoErrores = __webpack_require__(/*! ./Excepciones/NodoErrores */ "cikY");
    const inicio = __webpack_require__(/*! ../../../componentes/contenido-inicio/contenido-inicio.component */ "CbqC");
    var palabra = "";
    var palabra1 = "";
    /* generated by jison-lex 0.3.4 */
    var lexer = (function () {
        var lexer = ({
            EOF: 1,
            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                }
                else {
                    throw new Error(str);
                }
            },
            // resets the lexer, sets new input
            setInput: function (input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },
            // consumes and returns one char from the input
            input: function () {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                }
                else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }
                this._input = this._input.slice(1);
                return ch;
            },
            // unshifts one char (or a string) into the input
            unput: function (ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);
                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);
                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;
                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ?
                        (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                            + oldLines[oldLines.length - lines.length].length - lines[0].length :
                        this.yylloc.first_column - len
                };
                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },
            // When called from action, caches matched text and appends it on next action
            more: function () {
                this._more = true;
                return this;
            },
            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function () {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },
            // retain first n characters of the match
            less: function (n) {
                this.unput(this.match.slice(n));
            },
            // displays already matched input, i.e. for error messages
            pastInput: function () {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },
            // displays upcoming input, i.e. for error messages
            upcomingInput: function () {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },
            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function () {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },
            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function (match, indexed_rule) {
                var token, lines, backup;
                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }
                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ?
                        lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                        this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                }
                else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },
            // return next match in input
            next: function () {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }
                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            }
                            else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            }
                            else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        }
                        else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },
            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                }
                else {
                    return this.lex();
                }
            },
            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },
            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                }
                else {
                    return this.conditionStack[0];
                }
            },
            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                }
                else {
                    return this.conditions["INITIAL"].rules;
                }
            },
            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                }
                else {
                    return "INITIAL";
                }
            },
            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },
            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: { "case-insensitive": true },
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0:
                        break;
                    case 1:
                        this.begin('cuerpo');
                        return 15;
                        break;
                    case 2:
                        this.begin('INITIAL');
                        if (palabra.replaceAll(" ", "") == "")
                            return 16;
                        yy_.yytext = palabra;
                        palabra = "";
                        if (palabra.replaceAll(" ", "") == "")
                            return 7;
                        break;
                    case 3:
                        this.begin('INITIAL');
                        return 13;
                        yy_.yytext = palabra;
                        palabra = "";
                        return 7;
                        break;
                    case 4:
                        this.begin('INITIAL');
                        return 14;
                        yy_.yytext = palabra;
                        palabra = "";
                        return 7;
                        break;
                    case 5:
                        palabra += yy_.yytext;
                        break;
                    case 6:
                        return 12;
                        break;
                    case 7:
                        return 16;
                        break;
                    case 8:
                        return 14;
                        break;
                    case 9:
                        return 9;
                        break;
                    case 10:
                        return 13;
                        break;
                    case 11:
                        return 18;
                        break;
                    case 12:
                        yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);
                        return 19;
                        break;
                    case 13:
                        yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);
                        return 20;
                        break;
                    case 14:
                        return 10;
                        break;
                    case 15:
                        return 5;
                        break;
                    case 16:
                        break;
                    case 17:
                        break;
                    case 18:
                        break;
                    case 19:
                        inicio.listaErrores.push(new CNodoErrores.default("Lexico", "No se esperaba el caracter: " + yy_.yytext, yy_.yylloc.first_line, yy_.yylloc.first_column));
                        console.log("Lexico, No se esperaba el caracter: " + yy_.yytext + " Linea: " + yy_.yylloc.first_line + "Columna: " + yy_.yylloc.first_column);
                        break;
                }
            },
            rules: [/^(?:[<][!][-][-][^>]*[-][-]+[>])/i, /^(?:>)/i, /^(?:<\/)/i, /^(?:<)/i, /^(?:<)/i, /^(?:.)/i, /^(?:\?>)/i, /^(?:<\/)/i, /^(?:\/>)/i, /^(?:<\?)/i, /^(?:<)/i, /^(?:=)/i, /^(?:"[^\"]*")/i, /^(?:'[^\']*')/i, /^(?:([a-zA-Z_À-ÿ])[a-zA-Z0-9_^ÑñÀ-ÿ]*)/i, /^(?:$)/i, /^(?:[ \r\t]+)/i, /^(?:\n+)/i, /^(?:\s+)/i, /^(?:.)/i],
            conditions: { "Comentario": { "rules": [], "inclusive": false }, "xml": { "rules": [0, 1, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], "inclusive": true }, "cuerpo": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], "inclusive": true }, "INITIAL": { "rules": [0, 1, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], "inclusive": true } }
        });
        return lexer;
    })();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;
    parser.Parser = Parser;
    return new Parser;
})();
if (true) {
    exports.parser = GramaticaXMLDescPRUEBA;
    exports.Parser = GramaticaXMLDescPRUEBA.Parser;
    exports.parse = function () { return GramaticaXMLDescPRUEBA.parse.apply(GramaticaXMLDescPRUEBA, arguments); };
    exports.main = function commonjsMain(args) {
        if (!args[1]) {
            console.log('Usage: ' + args[0] + ' FILE');
            process.exit(1);
        }
        var source = __webpack_require__(/*! fs */ 1).readFileSync(__webpack_require__(/*! path */ 2).normalize(args[1]), "utf8");
        return exports.parser.parse(source);
    };
    if ( true && __webpack_require__.c[__webpack_require__.s] === module) {
        exports.main(process.argv.slice(1));
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "YuTi")(module)))

/***/ }),

/***/ "ssiu":
/*!*******************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Abstracto/Instruccion.ts ***!
  \*******************************************************************/
/*! exports provided: Instruccion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Instruccion", function() { return Instruccion; });
class Instruccion {
    constructor(tipo, fila, columna) {
        this.tipoDato = tipo;
        this.fila = fila;
        this.columna = columna;
    }
}


/***/ }),

/***/ "uvkm":
/*!****************************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Expresiones/Atributo.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Atributo; });
/* harmony import */ var src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Abstracto/nodoAST */ "2sLK");
/* harmony import */ var src_app_Backend_XML_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Simbolos/Tipo */ "Oyrp");
/* harmony import */ var src_app_Backend_XML_Analizador_Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Abstracto/Instruccion */ "9iyb");




class Atributo extends src_app_Backend_XML_Analizador_Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_2__["Instruccion"] {
    constructor(identificador, valor, linea, columna) {
        super(new src_app_Backend_XML_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["default"](src_app_Backend_XML_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipoDato"].CADENA), linea, columna);
        this.identificador = identificador;
        this.valor = valor;
        linea = this.linea;
        columna = this.columna;
    }
    interpretar(arbol, tabla) {
        return { identificador: this.identificador, valor: this.valor, linea: this.fila, columna: this.columna };
    }
    getNodo() {
        let nodo = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_0__["default"]('ATRIBUTO'); //PADRE ATRIBUTO
        var padreidentificador = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_0__["default"]('IDENTIFICADOR'); //PADRE IDENTIFICADOR
        padreidentificador.agregarHijo(this.identificador);
        nodo.agregarHijoAST(padreidentificador);
        let igual = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_0__["default"]('=');
        nodo.agregarHijoAST(igual);
        var padre = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_0__["default"]("VALOR"); //PADRE IDENTIFICADOR
        padre.agregarHijo(this.valor);
        nodo.agregarHijoAST(padre);
        return nodo;
    }
}


/***/ }),

/***/ "v19a":
/*!******************************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Instrucciones/AtributosPredicado.ts ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AtributosPredicado; });
/* harmony import */ var _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Abstracto/Instruccion */ "ssiu");
/* harmony import */ var _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Abstracto/nodoAST */ "GvuX");
/* harmony import */ var _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Simbolos/Tipo */ "HVYh");



class AtributosPredicado extends _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__["Instruccion"] {
    constructor(select, lcorchetes, fila, columna) {
        super(new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipoDato"].CADENA), fila, columna);
        this.Identificador = select;
        this.Corchetes = lcorchetes;
    }
    interpretar(arbol, tabla) {
        throw new Error("Method not implemented.");
    }
    getNodosAST() {
        var nodo = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]('ATRIBUTOS'); //PADRE SELECT
        /**TIPOS DE ATRIBUTOS
         * ATRIBUTOS EXPRESION (TIPO INSTRUCCION)
         * ATRIBUTOS SELECT
         * ATRIBUTOS MULTIPLICACION
         * ATRIBUTOS IDENTIFICADOR L_CORCHETES
         * libro[][]
         * @año[]
         */
        if (this.Identificador != null) {
            nodo.agregarHijo("@");
            nodo.agregarHijo(this.Identificador);
        }
        if (this.Corchetes != null) {
            nodo.agregarHijoAST(this.Corchetes.getNodosAST());
        }
        return nodo;
    }
}


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _paginas_arbol_ast_arbol_ast_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./paginas/arbol-ast/arbol-ast.component */ "OBp0");
/* harmony import */ var _paginas_errores_errores_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./paginas/errores/errores.component */ "Er68");
/* harmony import */ var _paginas_inicio_inicio_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./paginas/inicio/inicio.component */ "U3hP");
/* harmony import */ var _paginas_tabla_simbolos_tabla_simbolos_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./paginas/tabla-simbolos/tabla-simbolos.component */ "g7AS");
/* harmony import */ var _paginas_gramatical_report_gramatical_report_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./paginas/gramatical-report/gramatical-report.component */ "LdXe");
/* harmony import */ var _paginas_ast_desc_ast_desc_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./paginas/ast-desc/ast-desc.component */ "gX41");
/* harmony import */ var _paginas_xpath_asc_ast_xpath_asc_ast_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./paginas/xpath-asc-ast/xpath-asc-ast.component */ "DJ5/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");










const routes = [
    { path: 'gramatical', component: _paginas_gramatical_report_gramatical_report_component__WEBPACK_IMPORTED_MODULE_5__["GramaticalReportComponent"] },
    // { path: 'gramatical', component: ErroresComponent },
    { path: 'ast', component: _paginas_arbol_ast_arbol_ast_component__WEBPACK_IMPORTED_MODULE_1__["ArbolASTComponent"] },
    { path: 'ast-desc', component: _paginas_ast_desc_ast_desc_component__WEBPACK_IMPORTED_MODULE_6__["AstDescComponent"] },
    { path: 'xpath-ast', component: _paginas_xpath_asc_ast_xpath_asc_ast_component__WEBPACK_IMPORTED_MODULE_7__["XpathAscAstComponent"] },
    { path: 'errores', component: _paginas_errores_errores_component__WEBPACK_IMPORTED_MODULE_2__["ErroresComponent"] },
    { path: 'inicio', component: _paginas_inicio_inicio_component__WEBPACK_IMPORTED_MODULE_3__["InicioComponent"] },
    // { path: 'cst', component: InicioComponent },
    { path: 'simbolos', component: _paginas_tabla_simbolos_tabla_simbolos_component__WEBPACK_IMPORTED_MODULE_4__["TablaSimbolosComponent"] },
    { path: '', component: _paginas_inicio_inicio_component__WEBPACK_IMPORTED_MODULE_3__["InicioComponent"] },
    { path: '**', redirectTo: '' },
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "x2tA":
/*!************************************************************!*\
  !*** ./src/app/Backend/XPATH/Analizador/Funciones/Axes.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Axes; });
/* harmony import */ var _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Abstracto/Instruccion */ "ssiu");
/* harmony import */ var _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Abstracto/nodoAST */ "GvuX");
/* harmony import */ var _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Simbolos/Tipo */ "HVYh");



class Axes extends _Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__["Instruccion"] {
    constructor(barra1, expresion, fila, columna) {
        super(new _Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["default"](_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipoDato"].ENTERO), fila, columna);
        this.Axes = barra1;
        this.Expresion = expresion;
    }
    getNodosAST() {
        var nodo = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]('AXES'); //PADRE SELECT
        var nodsBarras = new _Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"](this.Axes);
        nodo.agregarHijoAST(nodsBarras);
        if (this.Expresion != null) {
            nodo.agregarHijoAST(this.Expresion.getNodosAST());
        }
        return nodo;
    }
    interpretar(arbol, tabla) {
        throw new Error('Method not implemented.');
    }
}


/***/ }),

/***/ "xzWR":
/*!**************************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Expresiones/Objeto.ts ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Objeto; });
/* harmony import */ var src_app_Backend_XML_Analizador_Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Abstracto/Instruccion */ "9iyb");
/* harmony import */ var src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Abstracto/nodoAST */ "2sLK");
/* harmony import */ var src_app_Backend_XML_Analizador_Simbolos_Simbolo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Simbolos/Simbolo */ "ob2c");
/* harmony import */ var src_app_Backend_XML_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Simbolos/Tipo */ "Oyrp");
/* harmony import */ var _Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Simbolos/tablaSimbolos */ "TD3t");
/* harmony import */ var _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Excepciones/NodoErrores */ "cikY");
/* harmony import */ var src_app_componentes_contenido_inicio_contenido_inicio_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/componentes/contenido-inicio/contenido-inicio.component */ "CbqC");







class Objeto extends src_app_Backend_XML_Analizador_Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__["Instruccion"] {
    constructor(identificador, contenido, listaAtributos = [], listaObjetos, linea, columna) {
        super(new src_app_Backend_XML_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](src_app_Backend_XML_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].OBJETO), linea, columna);
        this.identificador = identificador;
        this.contenido = contenido;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaObjetos;
        this.linea = linea;
        this.columna = columna;
    }
    interpretar(arbol, tabla) {
        var simbolo;
        if (this.listaAtributos != null) {
            for (let i of this.listaAtributos) {
                var s = i.interpretar(arbol, tabla);
                if (s.identificador == "encoding") {
                    arbol.setEncoding(s.valor);
                }
            }
        }
        if (this.listaObjetos != null) {
            var ts = new _Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_4__["default"](); /*entorno hijo */
            for (let i of this.listaObjetos) {
                var r = i.interpretar(arbol, tabla); /* Obtiene el objeto hijo */
                ts.setVariable(r);
            }
            simbolo = new src_app_Backend_XML_Analizador_Simbolos_Simbolo__WEBPACK_IMPORTED_MODULE_2__["default"](new src_app_Backend_XML_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](src_app_Backend_XML_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].OBJETO), this.identificador, this.linea.toString(), this.columna.toString(), ts);
            arbol.actualizarTabla(simbolo, this.linea.toString(), this.columna.toString());
        }
        else if (this.contenido != null) {
            //if o switch buscando codificacion
            if (arbol.getEncoding() == "UTF-8") {
                this.contenido = (this.contenido);
            }
            else if (arbol.getEncoding() == "ISO-8859-1") {
                this.contenido = unescape(encodeURIComponent(this.contenido));
            }
            else if (arbol.getEncoding() == "ASCII") {
                this.contenido = (this.contenido);
                //
                /*console.log(this.getCharCodes(this.contenido));
                this.contenido = this.getCharCodes(this.contenido) + "";*/
            }
            else {
                this.contenido = this.contenido;
            }
            simbolo = new src_app_Backend_XML_Analizador_Simbolos_Simbolo__WEBPACK_IMPORTED_MODULE_2__["default"](new src_app_Backend_XML_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](src_app_Backend_XML_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].OBJETO), this.identificador, this.linea.toString(), this.columna.toString(), this.contenido);
        }
        else {
            src_app_componentes_contenido_inicio_contenido_inicio_component__WEBPACK_IMPORTED_MODULE_6__["listaErrores"].push(new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_5__["default"]('SEMANTICO', this.identificador + ' Datos nulos', this.fila, this.columna));
        }
        if (this.listaAtributos != null) {
            for (let i of this.listaAtributos) {
                var s = i.interpretar(arbol, tabla);
                simbolo.agregarAtributo(s.identificador, s.valor);
            }
        }
        return simbolo;
    }
    getCharCodes(s) {
        let charCodeArr = [];
        for (let i = 0; i < s.length; i++) {
            let code = s.charCodeAt(i);
            charCodeArr.push(code);
        }
        return charCodeArr;
    }
    getNodo() {
        let nodo = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]('OBJETOS');
        let objectos = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]('OBJETO');
        let mayor = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]("<");
        objectos.agregarHijoAST(mayor);
        var padreidentificador = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]('IDENTIFICADOR');
        padreidentificador.agregarHijo(this.identificador);
        objectos.agregarHijoAST(padreidentificador);
        let menor = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"](">");
        objectos.agregarHijoAST(menor);
        nodo.agregarHijoAST(objectos);
        if (this.contenido != null) {
            var padre = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]("INSTRUCCION");
            padre.agregarHijo(this.contenido);
            nodo.agregarHijoAST(padre);
        }
        if (this.listaAtributos != null) {
            var lista = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]("LISTA ATRIBUTOS");
            for (let i of this.listaAtributos) {
                lista.agregarHijoAST(i.getNodo());
            }
            nodo.agregarHijoAST(lista);
        }
        if (this.listaObjetos != null) {
            var lista = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]("LISTA OBJETOS");
            for (let i of this.listaObjetos) {
                lista.agregarHijoAST(i.getNodo());
            }
            nodo.agregarHijoAST(lista);
        }
        return nodo;
    }
}


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map