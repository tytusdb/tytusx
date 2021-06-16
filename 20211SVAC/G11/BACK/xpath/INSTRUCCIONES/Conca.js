"use strict";
exports.__esModule = true;
exports.Conca = void 0;
var Consulta_1 = require("../CONSULTAS/Consulta");
var Conca = /** @class */ (function () {
    function Conca(sep, bar, id, exp, linea, columna) {
        this.separador = sep;
        this.barritas = bar;
        this.identificador = id;
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
    }
    Conca.prototype.ejecutar = function (ent, arbol) {
        // console.log("Si es: "+this.expresion);
        var valor;
        //valor = this.expresion.getValorImplicito(ent, arbol);
        if (this.expresion.getTipo == undefined) {
            for (var val in this.expresion) {
                valor = this.expresion[val].barras + this.expresion[val].puntos;
                this.Consultas(valor);
            }
        }
        else {
            valor = this.expresion.getValorImplicito(ent, arbol);
            this.Consultas(valor);
        }
    };
    Conca.prototype.Consultas = function (valor) {
        //ID CON VALOR->EXP
        console.log('');
        switch (this.separador) {
            /* CONSULTAS IDENTIFICADORES */
            case '&':
                console.log("SOY UN ID");
                if (valor !== '') {
                    Consulta_1.Consulta.agregar(this.identificador, '2', this.identificador);
                    if (typeof (valor) === 'number') {
                        Consulta_1.Consulta.agregar(this.identificador, '3', Number(valor - 1)); //DEVUELVO LA POSICION REAL DE LA CONSULTA
                        //VALIDAR LOS ATRIS Y PR DENTRO DE [] AUN NO TENGO MUY CLARO ESO JAJA
                    }
                }
                break;
            case '.':
                if (this.barritas === '//') {
                    Consulta_1.Consulta.agregar(this.identificador, '0', this.identificador);
                }
                else {
                    Consulta_1.Consulta.agregar(this.identificador, '1', this.identificador);
                }
                break;
            /**-------------------------------------------------------------------- */
            /*CONSULTAS CON ASTERISCO */
            case '#': //SOLO VIENE ASTERISCO Y EXP
                console.log("SOY UN ASTERISCO");
                Consulta_1.Consulta.agregar(this.identificador, '0', this.identificador);
                Consulta_1.Consulta.agregar(this.identificador, '0', valor);
                break;
            case 'por': // SOLO VIENE ASTERISCO
                Consulta_1.Consulta.agregar(this.identificador, '0', this.identificador);
                break;
            /**------------------------------------------------------------- */
            /*CONSULTAS PR */
            case '!':
                console.log("SOY UNA PR");
                switch (this.identificador) {
                    case 'ancestor':
                        Consulta_1.Consulta.agregar(this.identificador, '7', this.identificador);
                        if (valor === 'last') {
                            Consulta_1.Consulta.agregar(this.identificador, '20', this.identificador);
                        }
                        else if (valor === 'position') {
                            Consulta_1.Consulta.agregar(this.identificador, '21', this.identificador);
                        }
                        else if (valor === 'node') {
                            Consulta_1.Consulta.agregar(this.identificador, '22', this.identificador);
                        }
                        else if (valor === 'text') {
                            Consulta_1.Consulta.agregar(this.identificador, '23', this.identificador);
                        }
                        else {
                            Consulta_1.Consulta.agregar(this.identificador, '24', this.identificador);
                        }
                        break;
                    case 'ancestor-or-self':
                        Consulta_1.Consulta.agregar(this.identificador, '8', this.identificador);
                        if (valor === 'last') {
                            Consulta_1.Consulta.agregar(this.identificador, '20', this.identificador);
                        }
                        else if (valor === 'position') {
                            Consulta_1.Consulta.agregar(this.identificador, '21', this.identificador);
                        }
                        else if (valor === 'node') {
                            Consulta_1.Consulta.agregar(this.identificador, '22', this.identificador);
                        }
                        else if (valor === 'text') {
                            Consulta_1.Consulta.agregar(this.identificador, '23', this.identificador);
                        }
                        else {
                            Consulta_1.Consulta.agregar(this.identificador, '24', this.identificador);
                        }
                        break;
                    case 'attribute':
                        Consulta_1.Consulta.agregar(this.identificador, '9', this.identificador);
                        if (valor === 'last') {
                            Consulta_1.Consulta.agregar(this.identificador, '20', this.identificador);
                        }
                        else if (valor === 'position') {
                            Consulta_1.Consulta.agregar(this.identificador, '21', this.identificador);
                        }
                        else if (valor === 'node') {
                            Consulta_1.Consulta.agregar(this.identificador, '22', this.identificador);
                        }
                        else if (valor === 'text') {
                            Consulta_1.Consulta.agregar(this.identificador, '23', this.identificador);
                        }
                        else {
                            Consulta_1.Consulta.agregar(this.identificador, '24', this.identificador);
                        }
                        break;
                    case 'child':
                        Consulta_1.Consulta.agregar(this.identificador, '10', this.identificador);
                        if (valor === 'last') {
                            Consulta_1.Consulta.agregar(this.identificador, '20', this.identificador);
                        }
                        else if (valor === 'position') {
                            Consulta_1.Consulta.agregar(this.identificador, '21', this.identificador);
                        }
                        else if (valor === 'node') {
                            Consulta_1.Consulta.agregar(this.identificador, '22', this.identificador);
                        }
                        else if (valor === 'text') {
                            Consulta_1.Consulta.agregar(this.identificador, '23', this.identificador);
                        }
                        else {
                            Consulta_1.Consulta.agregar(this.identificador, '24', this.identificador);
                        }
                        break;
                    case 'descendant':
                        Consulta_1.Consulta.agregar(this.identificador, '11', this.identificador);
                        if (valor === 'last') {
                            Consulta_1.Consulta.agregar(this.identificador, '20', this.identificador);
                        }
                        else if (valor === 'position') {
                            Consulta_1.Consulta.agregar(this.identificador, '21', this.identificador);
                        }
                        else if (valor === 'node') {
                            Consulta_1.Consulta.agregar(this.identificador, '22', this.identificador);
                        }
                        else if (valor === 'text') {
                            Consulta_1.Consulta.agregar(this.identificador, '23', this.identificador);
                        }
                        else {
                            Consulta_1.Consulta.agregar(this.identificador, '24', this.identificador);
                        }
                        break;
                    case 'descendant-or-self':
                        Consulta_1.Consulta.agregar(this.identificador, '12', this.identificador);
                        if (valor === 'last') {
                            Consulta_1.Consulta.agregar(this.identificador, '20', this.identificador);
                        }
                        else if (valor === 'position') {
                            Consulta_1.Consulta.agregar(this.identificador, '21', this.identificador);
                        }
                        else if (valor === 'node') {
                            Consulta_1.Consulta.agregar(this.identificador, '22', this.identificador);
                        }
                        else if (valor === 'text') {
                            Consulta_1.Consulta.agregar(this.identificador, '23', this.identificador);
                        }
                        else {
                            Consulta_1.Consulta.agregar(this.identificador, '24', this.identificador);
                        }
                        break;
                    case 'following':
                        Consulta_1.Consulta.agregar(this.identificador, '13', this.identificador);
                        if (valor === 'last') {
                            Consulta_1.Consulta.agregar(this.identificador, '20', this.identificador);
                        }
                        else if (valor === 'position') {
                            Consulta_1.Consulta.agregar(this.identificador, '21', this.identificador);
                        }
                        else if (valor === 'node') {
                            Consulta_1.Consulta.agregar(this.identificador, '22', this.identificador);
                        }
                        else if (valor === 'text') {
                            Consulta_1.Consulta.agregar(this.identificador, '23', this.identificador);
                        }
                        else {
                            Consulta_1.Consulta.agregar(this.identificador, '24', this.identificador);
                        }
                        break;
                    case 'following-sibling':
                        Consulta_1.Consulta.agregar(this.identificador, '14', this.identificador);
                        if (valor === 'last') {
                            Consulta_1.Consulta.agregar(this.identificador, '20', this.identificador);
                        }
                        else if (valor === 'position') {
                            Consulta_1.Consulta.agregar(this.identificador, '21', this.identificador);
                        }
                        else if (valor === 'node') {
                            Consulta_1.Consulta.agregar(this.identificador, '22', this.identificador);
                        }
                        else if (valor === 'text') {
                            Consulta_1.Consulta.agregar(this.identificador, '23', this.identificador);
                        }
                        else {
                            Consulta_1.Consulta.agregar(this.identificador, '24', this.identificador);
                        }
                        break;
                    case 'namespace':
                        Consulta_1.Consulta.agregar(this.identificador, '15', this.identificador);
                        if (valor === 'last') {
                            Consulta_1.Consulta.agregar(this.identificador, '20', this.identificador);
                        }
                        else if (valor === 'position') {
                            Consulta_1.Consulta.agregar(this.identificador, '21', this.identificador);
                        }
                        else if (valor === 'node') {
                            Consulta_1.Consulta.agregar(this.identificador, '22', this.identificador);
                        }
                        else if (valor === 'text') {
                            Consulta_1.Consulta.agregar(this.identificador, '23', this.identificador);
                        }
                        else {
                            Consulta_1.Consulta.agregar(this.identificador, '24', this.identificador);
                        }
                        break;
                    case 'parent':
                        Consulta_1.Consulta.agregar(this.identificador, '16', this.identificador);
                        if (valor === 'last') {
                            Consulta_1.Consulta.agregar(this.identificador, '20', this.identificador);
                        }
                        else if (valor === 'position') {
                            Consulta_1.Consulta.agregar(this.identificador, '21', this.identificador);
                        }
                        else if (valor === 'node') {
                            Consulta_1.Consulta.agregar(this.identificador, '22', this.identificador);
                        }
                        else if (valor === 'text') {
                            Consulta_1.Consulta.agregar(this.identificador, '23', this.identificador);
                        }
                        else {
                            Consulta_1.Consulta.agregar(this.identificador, '24', this.identificador);
                        }
                        break;
                    case 'preceding':
                        Consulta_1.Consulta.agregar(this.identificador, '17', this.identificador);
                        if (valor === 'last') {
                            Consulta_1.Consulta.agregar(this.identificador, '20', this.identificador);
                        }
                        else if (valor === 'position') {
                            Consulta_1.Consulta.agregar(this.identificador, '21', this.identificador);
                        }
                        else if (valor === 'node') {
                            Consulta_1.Consulta.agregar(this.identificador, '22', this.identificador);
                        }
                        else if (valor === 'text') {
                            Consulta_1.Consulta.agregar(this.identificador, '23', this.identificador);
                        }
                        else {
                            Consulta_1.Consulta.agregar(this.identificador, '24', this.identificador);
                        }
                        break;
                    case 'preceding-sibling':
                        Consulta_1.Consulta.agregar(this.identificador, '18', this.identificador);
                        if (valor === 'last') {
                            Consulta_1.Consulta.agregar(this.identificador, '20', this.identificador);
                        }
                        else if (valor === 'position') {
                            Consulta_1.Consulta.agregar(this.identificador, '21', this.identificador);
                        }
                        else if (valor === 'node') {
                            Consulta_1.Consulta.agregar(this.identificador, '22', this.identificador);
                        }
                        else if (valor === 'text') {
                            Consulta_1.Consulta.agregar(this.identificador, '23', this.identificador);
                        }
                        else {
                            Consulta_1.Consulta.agregar(this.identificador, '24', this.identificador);
                        }
                        break;
                    case 'self':
                        Consulta_1.Consulta.agregar(this.identificador, '19', this.identificador);
                        if (valor === 'last') {
                            Consulta_1.Consulta.agregar(this.identificador, '20', this.identificador);
                        }
                        else if (valor === 'position') {
                            Consulta_1.Consulta.agregar(this.identificador, '21', this.identificador);
                        }
                        else if (valor === 'node') {
                            Consulta_1.Consulta.agregar(this.identificador, '22', this.identificador);
                        }
                        else if (valor === 'text') {
                            Consulta_1.Consulta.agregar(this.identificador, '23', this.identificador);
                        }
                        else {
                            Consulta_1.Consulta.agregar(this.identificador, '24', this.identificador);
                        }
                        break;
                }
                break;
            /**--------------------------------------------------------------------- */
            /*CONSULTAS ATRIBUTOS */
            case '?':
                console.log("SOY UN ATRIBUTO");
                if (valor !== '') {
                    if (valor === '//..') {
                        Consulta_1.Consulta.agregar(this.identificador, '6', valor);
                    }
                    else if (valor === '//.') {
                        Consulta_1.Consulta.agregar(this.identificador, '5', valor);
                    }
                    else if (valor === '/..') {
                        Consulta_1.Consulta.agregar(this.identificador, '6', valor);
                    }
                    else if (valor === '/.') {
                        Consulta_1.Consulta.agregar(this.identificador, '5', valor);
                    }
                }
                else {
                    Consulta_1.Consulta.agregar(this.identificador, '4', valor);
                }
                break;
        }
        /**--------------------------------------------------------------------------- */
        if (valor !== null) {
            console.log('>>>', this.barritas + this.identificador + '[' + valor + ']');
        }
        else {
            console.log('>> Error, no se pueden imprimir valores nulos');
        }
    };
    return Conca;
}());
exports.Conca = Conca;
