"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.If = void 0;
var If = /** @class */ (function () {
    function If(op1, op2, operador, goto, linea, columna, codigo, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.codigo = codigo;
        this.tipo = tipo;
        this.operando1 = op1;
        this.operando2 = op2;
        this.operador = operador;
        this.goto = goto;
    }

    If.prototype.getLinea = function () {
        return this.linea;
    };

    If.prototype.getColumna = function () {
        return this.columna;
    };

    If.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    If.prototype.getTipo = function () {
        return this.tipo;
    };

    If.prototype.setOperando1 = function (op1) {
        this.operando1 = op1;
    };
    If.prototype.getOperando1 = function () {
        return this.operando1;
    };

    If.prototype.setOperando2 = function (op2) {
        this.operando1 = op2;
    };
    If.prototype.getOperando2 = function () {
        return this.operando2;
    };

    If.prototype.setGOTO = function (goto) {
        this.goto = goto;
    };
    If.prototype.getGOTO = function () {
        return this.goto;
    };

    If.prototype.setOperador = function (op) {
        this.operador = op;
    };
    If.prototype.getOperador = function () {
        return this.operador;
    };

    If.prototype.getCodigo3D = function () {
        return this.codigo;
    };

    If.prototype.OperadorString = function () {
        
        var operadorActual = this.operador;
        var operadorSalida = "";

        switch (operadorActual) {
            case Operador.IGUAL:
              operadorSalida = "==";
              break;
            case Operador.DIFERENTE_QUE:
                operadorSalida = "!=";
              break;
            case Operador.MAYOR_IGUAL_QUE:
                operadorSalida = ">=";
                break;
            case Operador.MENOR_IGUAL_QUE:
                operadorSalida = "<=";
                break;
            case Operador.MAYOR_QUE:
                operadorSalida = ">";
                break;
            case Operador.MENOR_QUE:
                operadorSalida = "<";
                break;
          }

          return operadorSalida;
    };

    If.prototype.GenerarC3D = function () {
        
        this.codigo = "if (" + this.getOperando1() + " " + this.OperadorString() + " " + this.getOperando2() + ") goto " + this.getGOTO() + ";\n";

    };

    If.prototype.InvertirOperador = function () {
        
        var operadorActual = this.operador;

        switch (operadorActual) {
            case Operador.IGUAL:
              this.operador = Operador.DIFERENTE_QUE;
              break;
            case Operador.DIFERENTE_QUE:
              this.operador = Operador.IGUAL;
              break;
            case Operador.MAYOR_IGUAL_QUE:
                this.operador = Operador.MENOR_QUE;
                break;
            case Operador.MENOR_IGUAL_QUE:
                this.operador = Operador.MAYOR_QUE;
                break;
            case Operador.MAYOR_QUE:
                this.operador = Operador.MENOR_IGUAL_QUE;
                break;
            case Operador.MENOR_QUE:
                this.operador = Operador.MAYOR_IGUAL_QUE;
                break;
          }
    };

    If.prototype.esConstantePositiva = function () {

        if((this.isNumeric(this.getOperando1())==true && this.isNumeric(this.getOperando2())==true) &&
        (Number(this.getOperando1()) == Number(this.getOperando2())) && 
        this.getOperador() == Operador.IGUAL){
            return true;
        } else if((this.isNumeric(this.getOperando1())==true && this.isNumeric(this.getOperando2())==true) &&
        (Number(this.getOperando1()) > Number(this.getOperando2())) && 
        this.getOperador() == Operador.MAYOR_QUE){
            return true;
        } else if((this.isNumeric(this.getOperando1())==true && this.isNumeric(this.getOperando2())==true) &&
        (Number(this.getOperando1()) < Number(this.getOperando2())) && 
        this.getOperador() == Operador.MENOR_QUE){
            return true;
        } else if((this.isNumeric(this.getOperando1())==true && this.isNumeric(this.getOperando2())==true) &&
        (Number(this.getOperando1()) != Number(this.getOperando2())) && 
        this.getOperador() == Operador.DIFERENTE_QUE){
            return true;
        } else if((this.isNumeric(this.getOperando1())==true && this.isNumeric(this.getOperando2())==true) &&
        (Number(this.getOperando1()) >= Number(this.getOperando2())) && 
        this.getOperador() == Operador.MAYOR_IGUAL_QUE){
            return true;
        } else if((this.isNumeric(this.getOperando1())==true && this.isNumeric(this.getOperando2())==true) &&
        (Number(this.getOperando1()) <= Number(this.getOperando2())) && 
        this.getOperador() == Operador.MENOR_IGUAL_QUE){
            return true;
        } else if ((this.getOperando1() == this.getOperando2()) && 
        (this.getOperador() == Operador.IGUAL)){
            return true;
        } else {
            return false;
        }

    };

    If.prototype.isNumeric = function (str) {
        if (typeof str != "string") return false 
        return !isNaN(str) && !isNaN(parseFloat(str)) 
    };

    return If;
}());
//exports.If = If;
