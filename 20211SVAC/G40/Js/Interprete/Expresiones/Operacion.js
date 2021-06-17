"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.Operacion = void 0;

var Operacion = /** @class */ (function () {
    function Operacion(tipo_op, op_izquierda, op_derecha, operacion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
        this.operadores = tipo_op;
        this.tipo = 666;
    }
    Operacion.prototype.getTipo = function (ent, arbol) {     
        return this.tipo;
    };

    Operacion.prototype.getOperador = function(){
        return this.operador;
    };

    Operacion.prototype.getValorImplicito = function (objetos, entornos) {

        var objetosAux = [];
        var entornosAux = [];
        
        if (this.operador==Operador.IGUAL){

            
            if(this.operadores==TipoOperadores.ATRIBUTOS){

                

                var idAux = this.op_izquierda.getValorImplicito(objetos, entornos);
                var valorAux = this.op_derecha.getValorImplicito(objetos,entornos);

                objetos.forEach(function (objeto){

                    objeto.getAtributos().forEach(function (atributo){
        
                        if(atributo.getID()==idAux && atributo.getValor()==valorAux){
        
                            if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                                objetosAux.push(objeto);
                                if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                                    entornosAux.push(objeto.getEntorno());
                                } 
                            }  
        
                        }
                                                 
                    });
                    });            
                
                objetosGlobal = objetosAux;
                entornosGlobal = entornosAux;                                         
                return [entornosAux, objetosAux];
           } else if (this.operadores==TipoOperadores.ELEMENTOS) {

            var idAux = this.op_izquierda.getValorImplicito(objetos, entornos).toString();
            var valorAux = this.op_derecha.getValorImplicito(objetos,entornos).toString();

                objetos.forEach(function (objeto){

                    objeto.getObjetos().forEach(function (obj){
        
                        if(obj.getID()==idAux && obj.getTexto()==valorAux){
        
                            if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                                objetosAux.push(objeto);
                                if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                                    entornosAux.push(objeto.getEntorno());
                                } 
                            }  
        
                        }
                                                 
                    });
                    });            
                
                objetosGlobal = objetosAux;
                entornosGlobal = entornosAux;                                         
                return [entornosAux, objetosAux];
           }

        } else if  (this.operador==Operador.SUMA) {

            var valor1 = this.op_izquierda.getValorImplicito(objetos, entornos);
            var valor2 = this.op_derecha.getValorImplicito(objetos,entornos);

            if (typeof (valor1 === "number") && typeof (valor2 === "number")) {
                return valor1+valor2;
            } else {
                objetosGlobal = objetos;
                entornosGlobal = entornos;                                         
                return [entornos, objetos];
            }



        } else if  (this.operador==Operador.RESTA) {

            var valor1 = this.op_izquierda.getValorImplicito(objetos, entornos);
            var valor2 = this.op_derecha.getValorImplicito(objetos,entornos);

            if (typeof (valor1 === "number") && typeof (valor2 === "number")) {
                return valor1-valor2;
            } else {
                objetosGlobal = objetos;
                entornosGlobal = entornos;                                         
                return [entornos, objetos];
            }



        }   else if  (this.operador==Operador.MULTIPLICACION) {

            var valor1 = this.op_izquierda.getValorImplicito(objetos, entornos);
            var valor2 = this.op_derecha.getValorImplicito(objetos,entornos);

            if (typeof (valor1 === "number") && typeof (valor2 === "number")) {
                return valor1*valor2;
            } else {
                objetosGlobal = objetos;
                entornosGlobal = entornos;                                         
                return [entornos, objetos];
            }



        } else if  (this.operador==Operador.DIVISION) {

            var valor1 = this.op_izquierda.getValorImplicito(objetos, entornos);
            var valor2 = this.op_derecha.getValorImplicito(objetos,entornos);

            if (typeof (valor1 === "number") && typeof (valor2 === "number")) {
                return valor1/valor2;
            } else {
                objetosGlobal = objetos;
                entornosGlobal = entornos;                                         
                return [entornos, objetos];
            }



        } else if  (this.operador==Operador.MODULO) {

            var valor1 = this.op_izquierda.getValorImplicito(objetos, entornos);
            var valor2 = this.op_derecha.getValorImplicito(objetos,entornos);

            if (typeof (valor1 === "number") && typeof (valor2 === "number")) {
                return valor1%valor2;
            } else {
                objetosGlobal = objetos;
                entornosGlobal = entornos;                                         
                return [entornos, objetos];
            }



        }else{
            objetosGlobal = objetos;
            entornosGlobal = entornos;                                         
            return [entornos, objetos];
        }

     
    };
    Operacion.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };

    Operacion.prototype.setOperadorIzquierda = function (opIzquierda) {
        this.op_izquierda = opIzquierda;
    };

    Operacion.prototype.setOperadorDerecha = function (opDerecha) {
        this.op_derecha = opDerecha;
    };

    return Operacion;
}());
//exports.Operacion = Operacion;
