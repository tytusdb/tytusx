"use strict";

var XOperacion = /** @class */ (function () {
    function XOperacion(op_izquierda, op_derecha, operacion, linea, columna, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
        this.tipo = tipo;
        this.entorno = null;
    }
    XOperacion.prototype.getTipo = function () {
        return this.tipo;
    };
    XOperacion.prototype.getValorImplicito = function (entorno) {

        function isNumeric(str) {
            if (typeof str != "string") return false
            return !isNaN(str) && !isNaN(parseFloat(str)) 
          }

        this.entorno = entorno;

        var valor1 = this.op_izquierda.getValorImplicito(entorno);
        var valor2 = this.op_derecha.getValorImplicito(entorno);

        if((valor1 != null) && (valor2 != null)){

            if(this.operador == Operador.SUMA){

                if((typeof (valor1) === 'number') && (typeof (valor2) === 'number')){
                    return valor1 + valor2 ;
                }

            } else if(this.operador == Operador.RESTA){

                if((typeof (valor1) === 'number') && (typeof (valor2) === 'number')){
                    return valor1 - valor2 ;
                }

            } else if(this.operador == Operador.MULTIPLICACION){

                if((typeof (valor1) === 'number') && (typeof (valor2) === 'number')){
                    return valor1 * valor2 ;
                }

            } else if(this.operador == Operador.DIVISION){

                if((typeof (valor1) === 'number') && (typeof (valor2) === 'number')){
                    return valor1 / valor2 ;
                }

            } else if(this.operador == Operador.MODULO){

                if((typeof (valor1) === 'number') && (typeof (valor2) === 'number')){
                    return valor1 % valor2 ;
                }

            } else if(this.operador == Operador.MAYOR_QUE){
          
                if(valor1 > valor2){
                    return true;
                } else {
                    return false;
                }
                            

            } else if(this.operador == Operador.MENOR_QUE){
              
                if(valor1 < valor2){
                    return true;
                } else {
                    return false;
                }
                   
               
            } else if(this.operador == Operador.IGUAL){
                
         
                if(valor1 == valor2){
                    return true;
                } else {
                    return false;
                }
                   
                
            } else if(this.operador == Operador.DIFERENTE_QUE){

                if(valor1 == valor2){
                    return false;
                } else {
                    return true;
                }
                   
                
            } else if(this.operador == Operador.MAYOR_IGUAL_QUE){
         
                if(valor1 >= valor2){
                    return true;
                } else {
                    return false;
                }
                   
                
            } else if(this.operador == Operador.MENOR_IGUAL_QUE){
         
                if(valor1 <= valor2){
                    return true;
                } else {
                    return false;
                }
                   
                
            } else if(this.operador == Operador.OR){
         
                return valor1 || valor2 ;
                
            } else if(this.operador == Operador.AND){
         
                return valor1 && valor2 ;
                
            } 



        } else {
            return null;
        }


    };
    return XOperacion;
}());

