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

        function isNumeric(str) {
            if (typeof str != "string") return false
            return !isNaN(str) && !isNaN(parseFloat(str)) 
          }
        
        if (this.operador==Operador.IGUAL){

            if(this.operadores==TipoOperadores.ATRIBUTOS){

                

                var idAux = this.op_izquierda.getValorImplicito(objetos, entornos);
                var valorAux = this.op_derecha.getValorImplicito(objetos,entornos);

                objetos.forEach(function (objeto){

                    objeto.getAtributos().forEach(function (atributo){
        
                        if(atributo.getID().toString().toLowerCase()==idAux.toString().toLowerCase() 
                        && atributo.getValor().toString()==valorAux.toString()){
        
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

            var valor1 = this.op_izquierda.getValorImplicito(objetos, entornos);
            var valor2 = this.op_derecha.getValorImplicito(objetos,entornos);

                if ((typeof (valor1) === "string") && (typeof (valor2) === "number")){
                    
                    var errorS = false;

                    objetos.forEach(function (objeto){

                        objeto.getObjetos().forEach(function (obj){
                            
            
                            if(obj.getID().toString().toLowerCase()==valor1.toString().toLowerCase()){

                                if(isNumeric(obj.getTexto())==true){
                                    
                                    if(Number(obj.getTexto())==valor2) {

                                        if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                                            objetosAux.push(objeto);
                                            if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                                                entornosAux.push(objeto.getEntorno());
                                            } 
                                        }  
                                    }
                                } else{
                                    errorS = true;
                                }                                  
                            }                                                 
                        });
                        });  
                    
                    if(errorS==true){
                        ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                        valor1 + ` debe compararse con un valor numerico.`,"XPATH")); NumeroE++;
                    }
                    
                    objetosGlobal = objetosAux;
                    entornosGlobal = entornosAux;                                         
                    return [entornosAux, objetosAux];

                } else if ((typeof (valor1) === "number") && (typeof (valor2) === "string")){
                    
                    var errorS = false;

                    objetos.forEach(function (objeto){

                        objeto.getObjetos().forEach(function (obj){
                            
                            if(obj.getID().toString().toLowerCase()==valor2.toString().toLowerCase()){
                                
                                if(isNumeric(obj.getTexto())==true){
                                    
                                    if(Number(obj.getTexto())==valor1) {

                                        if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                                            objetosAux.push(objeto);
                                            if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                                                entornosAux.push(objeto.getEntorno());
                                            } 
                                        }  
                                    }
                                } else{
                                    errorS = true;
                                }                                  
                            }                                                 
                        });
                        });   
                        
                    if(errorS==true){
                        ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                                valor2 + ` debe compararse con un valor numerico.`,"XPATH")); NumeroE++;
                    }
                    
                    objetosGlobal = objetosAux;
                    entornosGlobal = entornosAux;                                         
                    return [entornosAux, objetosAux];

                } else if ((typeof (valor1) === "string") && (typeof (valor2) === "string")) {

                    if(this.op_derecha.esCadena()==true){

                        var idAux = this.op_izquierda.getValorImplicito(objetos, entornos).toString();
                        var valorAux = this.op_derecha.getValorImplicito(objetos,entornos).toString();
        
                        objetos.forEach(function (objeto){
        
                            objeto.getObjetos().forEach(function (obj){
                
                                if(obj.getID().toString().toLowerCase()==idAux.toLowerCase() && obj.getTexto().toString()==valorAux){
                
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
        
                    } else {
                        
                        var errorS = false;

                        objetos.forEach(function (objeto){

                        var id1 = BuscarObjeto(objeto.getObjetos(), valor1);
                        var id2 = BuscarObjeto(objeto.getObjetos(), valor2);

                        if((id1 != null && id2 != null)){

                            if(id1.getTexto().toString() == id2.getTexto().toString()) {

                                if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                                    objetosAux.push(objeto);
                                    if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                                        entornosAux.push(objeto.getEntorno());
                                    } 
                                }  
                            }

                        } else {
                            errorS = true;
                        }
                        
                        });    
                        
                    if(errorS==true){
                        ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                        `Ningun identificador apunta a un valor numérico para ser comparado`,"XPATH")); NumeroE++;
                    }
                    
                        objetosGlobal = objetosAux;
                        entornosGlobal = entornosAux;                                         
                        return [entornosAux, objetosAux];

                    }
                }
           }

        } else if (this.operador==Operador.MAYOR_QUE){

            var valor1 = this.op_izquierda.getValorImplicito(objetos, entornos);
            var valor2 = this.op_derecha.getValorImplicito(objetos,entornos);

            if ((typeof (valor1) === "string") && (typeof (valor2) === "number")){
                
                var errorS = false;

                objetos.forEach(function (objeto){

                    objeto.getObjetos().forEach(function (obj){
                        
        
                        if(obj.getID().toString().toLowerCase()==valor1.toString().toLowerCase()){

                            if(isNumeric(obj.getTexto())==true){
                                
                                if(Number(obj.getTexto())>valor2) {

                                    if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                                        objetosAux.push(objeto);
                                        if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                                            entornosAux.push(objeto.getEntorno());
                                        } 
                                    }  
                                }
                            } else{
                                errorS = true;
                            }                                  
                        }                                                 
                    });
                    });  
                
                if(errorS==true){
                    ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                    valor1 + ` debe compararse con un valor numerico.`,"XPATH")); NumeroE++;
                }
                
                objetosGlobal = objetosAux;
                entornosGlobal = entornosAux;                                         
                return [entornosAux, objetosAux];

            } else if ((typeof (valor1) === "number") && (typeof (valor2) === "string")){
                
                var errorS = false;

                objetos.forEach(function (objeto){

                    objeto.getObjetos().forEach(function (obj){
                        
                        if(obj.getID().toString().toLowerCase()==valor2.toString().toLowerCase()){
                            
                            if(isNumeric(obj.getTexto())==true){
                                
                                if(Number(obj.getTexto())<valor1) {

                                    if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                                        objetosAux.push(objeto);
                                        if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                                            entornosAux.push(objeto.getEntorno());
                                        } 
                                    }  
                                }
                            } else{
                                errorS = true;
                            }                                  
                        }                                                 
                    });
                    });   
                    
                if(errorS==true){
                    ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                            valor2 + ` debe compararse con un valor numerico.`,"XPATH")); NumeroE++;
                }
                
                objetosGlobal = objetosAux;
                entornosGlobal = entornosAux;                                         
                return [entornosAux, objetosAux];

            } else if ((typeof (valor1) === "string") && (typeof (valor2) === "string")) {

                var errorS = false;

                objetos.forEach(function (objeto){

                    var id1 = BuscarObjeto(objeto.getObjetos(), valor1);
                    var id2 = BuscarObjeto(objeto.getObjetos(), valor2);

                    if((id1 != null && id2 != null) && (isNumeric(id1.getTexto())==true && isNumeric(id2.getTexto())==true)){

                        if(Number(id1.getTexto())>Number(id2.getTexto())) {

                            if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                                objetosAux.push(objeto);
                                if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                                    entornosAux.push(objeto.getEntorno());
                                } 
                            }  
                        }

                    } else {
                        errorS = true;
                    }
                    
                    });    
                    
                if(errorS==true){
                    ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                    `Ningun identificador apunta a un valor numérico para ser comparado`,"XPATH")); NumeroE++;
                }
                
                objetosGlobal = objetosAux;
                entornosGlobal = entornosAux;                                         
                return [entornosAux, objetosAux];

            }



        } else if (this.operador==Operador.MENOR_QUE){

            var valor1 = this.op_izquierda.getValorImplicito(objetos, entornos);
            var valor2 = this.op_derecha.getValorImplicito(objetos,entornos);

            if ((typeof (valor1) === "string") && (typeof (valor2) === "number")){
                
               var errorS = false;

                objetos.forEach(function (objeto){

                    objeto.getObjetos().forEach(function (obj){
                            
                        if(obj.getID().toString().toLowerCase()==valor1.toString().toLowerCase()){

                            if(isNumeric(obj.getTexto())==true){
                                
                                if(Number(obj.getTexto())<valor2) {

                                    if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                                        objetosAux.push(objeto);
                                        if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                                            entornosAux.push(objeto.getEntorno());
                                        } 
                                    }  
                                }
                            }  else {
                                errorS = true;
                            }                                 
                        }                                                 
                    });
                    });  
                    
                    if(errorS==true){
                        ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                    valor1 + ` debe compararse con un valor numerico.`,"XPATH")); NumeroE++;
                    } 
                
                objetosGlobal = objetosAux;
                entornosGlobal = entornosAux;                                         
                return [entornosAux, objetosAux];

            } else if ((typeof (valor1) === "number") && (typeof (valor2) === "string")){
                
                var errorS = false;

                objetos.forEach(function (objeto){

                    objeto.getObjetos().forEach(function (obj){
                        
                        if(obj.getID().toString().toLowerCase()==valor2.toString().toLowerCase()){
                            
                            if(isNumeric(obj.getTexto())==true){
                                
                                if(Number(obj.getTexto())>valor1) {

                                    if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                                        objetosAux.push(objeto);
                                        if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                                            entornosAux.push(objeto.getEntorno());
                                        } 
                                    }  
                                }
                            } else{
                                errorS = true;
                            }                                  
                        }                                                 
                    });
                    });    
                    
                if(errorS==true){
                    ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                    valor2 + ` debe compararse con un valor numerico.`,"XPATH")); NumeroE++;
                }
                
                objetosGlobal = objetosAux;
                entornosGlobal = entornosAux;                                         
                return [entornosAux, objetosAux];

            } else if ((typeof (valor1) === "string") && (typeof (valor2) === "string")) {

                var errorS = true;

                objetos.forEach(function (objeto){

                    var id1 = BuscarObjeto(objeto.getObjetos(), valor1);
                    var id2 = BuscarObjeto(objeto.getObjetos(), valor2);

                    if((id1 != null && id2 != null) && (isNumeric(id1.getTexto())==true && isNumeric(id2.getTexto())==true)){

                        if(Number(id1.getTexto())<Number(id2.getTexto())) {

                            if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                                objetosAux.push(objeto);
                                if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                                    entornosAux.push(objeto.getEntorno());
                                } 
                            }  
                        }

                    } else {
                        errorS = true;
                    }
                    
                    });   
                    
                if(errorS==true){
                    ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                    `Ningun identificador apunta a un valor numérico para ser comparado`,"XPATH")); NumeroE++;
                }
                
                objetosGlobal = objetosAux;
                entornosGlobal = entornosAux;                                         
                return [entornosAux, objetosAux];

            }



        } else if (this.operador==Operador.MAYOR_IGUAL_QUE){

            var valor1 = this.op_izquierda.getValorImplicito(objetos, entornos);
            var valor2 = this.op_derecha.getValorImplicito(objetos,entornos);

            if ((typeof (valor1) === "string") && (typeof (valor2) === "number")){
                
               var errorS = false;

                objetos.forEach(function (objeto){

                    objeto.getObjetos().forEach(function (obj){
                            
                        if(obj.getID().toString().toLowerCase()==valor1.toString().toLowerCase()){

                            if(isNumeric(obj.getTexto())==true){
                                
                                if(Number(obj.getTexto())>=valor2) {

                                    if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                                        objetosAux.push(objeto);
                                        if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                                            entornosAux.push(objeto.getEntorno());
                                        } 
                                    }  
                                }
                            }  else {
                                errorS = true;
                            }                                 
                        }                                                 
                    });
                    });  
                    
                    if(errorS==true){
                        ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                    valor1 + ` debe compararse con un valor numerico.`,"XPATH")); NumeroE++;
                    } 
                
                objetosGlobal = objetosAux;
                entornosGlobal = entornosAux;                                         
                return [entornosAux, objetosAux];

            } else if ((typeof (valor1) === "number") && (typeof (valor2) === "string")){
                
                var errorS = false;

                objetos.forEach(function (objeto){

                    objeto.getObjetos().forEach(function (obj){
                        
                        if(obj.getID().toString().toLowerCase()==valor2.toString().toLowerCase()){
                            
                            if(isNumeric(obj.getTexto())==true){
                                
                                if(Number(obj.getTexto())<=valor1) {

                                    if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                                        objetosAux.push(objeto);
                                        if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                                            entornosAux.push(objeto.getEntorno());
                                        } 
                                    }  
                                }
                            } else{
                                errorS = true;
                            }                                  
                        }                                                 
                    });
                    });    
                    
                if(errorS==true){
                    ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                    valor2 + ` debe compararse con un valor numerico.`,"XPATH")); NumeroE++;
                }
                
                objetosGlobal = objetosAux;
                entornosGlobal = entornosAux;                                         
                return [entornosAux, objetosAux];

            } else if ((typeof (valor1) === "string") && (typeof (valor2) === "string")) {

                var errorS = true;

                objetos.forEach(function (objeto){

                    var id1 = BuscarObjeto(objeto.getObjetos(), valor1);
                    var id2 = BuscarObjeto(objeto.getObjetos(), valor2);

                    if((id1 != null && id2 != null) && (isNumeric(id1.getTexto())==true && isNumeric(id2.getTexto())==true)){

                        if(Number(id1.getTexto())>=Number(id2.getTexto())) {

                            if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                                objetosAux.push(objeto);
                                if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                                    entornosAux.push(objeto.getEntorno());
                                } 
                            }  
                        }

                    } else {
                        errorS = true;
                    }
                    
                    });   
                    
                if(errorS==true){
                    ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                    `Ningun identificador apunta a un valor numérico para ser comparado`,"XPATH")); NumeroE++;
                }
                
                objetosGlobal = objetosAux;
                entornosGlobal = entornosAux;                                         
                return [entornosAux, objetosAux];

            }



        } else if (this.operador==Operador.MENOR_IGUAL_QUE){

            var valor1 = this.op_izquierda.getValorImplicito(objetos, entornos);
            var valor2 = this.op_derecha.getValorImplicito(objetos,entornos);

            if ((typeof (valor1) === "string") && (typeof (valor2) === "number")){
                
               var errorS = false;

                objetos.forEach(function (objeto){

                    objeto.getObjetos().forEach(function (obj){
                            
                        if(obj.getID().toString().toLowerCase()==valor1.toString().toLowerCase()){

                            if(isNumeric(obj.getTexto())==true){
                                
                                if(Number(obj.getTexto())<=valor2) {

                                    if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                                        objetosAux.push(objeto);
                                        if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                                            entornosAux.push(objeto.getEntorno());
                                        } 
                                    }  
                                }
                            }  else {
                                errorS = true;
                            }                                 
                        }                                                 
                    });
                    });  
                    
                    if(errorS==true){
                        ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                    valor1 + ` debe compararse con un valor numerico.`,"XPATH")); NumeroE++;
                    } 
                
                objetosGlobal = objetosAux;
                entornosGlobal = entornosAux;                                         
                return [entornosAux, objetosAux];

            } else if ((typeof (valor1) === "number") && (typeof (valor2) === "string")){
                
                var errorS = false;

                objetos.forEach(function (objeto){

                    objeto.getObjetos().forEach(function (obj){
                        
                        if(obj.getID().toString().toLowerCase()==valor2.toString().toLowerCase()){
                            
                            if(isNumeric(obj.getTexto())==true){
                                
                                if(Number(obj.getTexto())<=valor1) {

                                    if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                                        objetosAux.push(objeto);
                                        if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                                            entornosAux.push(objeto.getEntorno());
                                        } 
                                    }  
                                }
                            } else{
                                errorS = true;
                            }                                  
                        }                                                 
                    });
                    });    
                    
                if(errorS==true){
                    ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                    valor2 + ` debe compararse con un valor numerico.`,"XPATH")); NumeroE++;
                }
                
                objetosGlobal = objetosAux;
                entornosGlobal = entornosAux;                                         
                return [entornosAux, objetosAux];

            } else if ((typeof (valor1) === "string") && (typeof (valor2) === "string")) {

                var errorS = true;

                objetos.forEach(function (objeto){

                    var id1 = BuscarObjeto(objeto.getObjetos(), valor1);
                    var id2 = BuscarObjeto(objeto.getObjetos(), valor2);

                    if((id1 != null && id2 != null) && (isNumeric(id1.getTexto())==true && isNumeric(id2.getTexto())==true)){

                        if(Number(id1.getTexto())<=Number(id2.getTexto())) {

                            if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                                objetosAux.push(objeto);
                                if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                                    entornosAux.push(objeto.getEntorno());
                                } 
                            }  
                        }

                    } else {
                        errorS = true;
                    }
                    
                    });   
                    
                if(errorS==true){
                    ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                    `Ningun identificador apunta a un valor numérico para ser comparado`,"XPATH")); NumeroE++;
                }
                
                objetosGlobal = objetosAux;
                entornosGlobal = entornosAux;                                         
                return [entornosAux, objetosAux];

            }



        } else if (this.operador==Operador.SUMA) {

            var valor1 = this.op_izquierda.getValorImplicito(objetos, entornos);
            var valor2 = this.op_derecha.getValorImplicito(objetos,entornos);

            if (typeof (valor1 === "number") && typeof (valor2 === "number")) {
                return valor1+valor2;
            } else {
                objetosGlobal = objetos;
                entornosGlobal = entornos;                                         
                return [entornos, objetos];
            }



        } else if (this.operador==Operador.RESTA) {

            var valor1 = this.op_izquierda.getValorImplicito(objetos, entornos);
            var valor2 = this.op_derecha.getValorImplicito(objetos,entornos);

            if (typeof (valor1 === "number") && typeof (valor2 === "number")) {
                return valor1-valor2;
            } else {
                objetosGlobal = objetos;
                entornosGlobal = entornos;                                         
                return [entornos, objetos];
            }



        } else if (this.operador==Operador.MULTIPLICACION) {

            var valor1 = this.op_izquierda.getValorImplicito(objetos, entornos);
            var valor2 = this.op_derecha.getValorImplicito(objetos,entornos);

            if (typeof (valor1 === "number") && typeof (valor2 === "number")) {
                return valor1*valor2;
            } else {
                objetosGlobal = objetos;
                entornosGlobal = entornos;                                         
                return [entornos, objetos];
            }



        } else if (this.operador==Operador.DIVISION) {

            var valor1 = this.op_izquierda.getValorImplicito(objetos, entornos);
            var valor2 = this.op_derecha.getValorImplicito(objetos,entornos);

            if (typeof (valor1 === "number") && typeof (valor2 === "number")) {
                return valor1/valor2;
            } else {
                objetosGlobal = objetos;
                entornosGlobal = entornos;                                         
                return [entornos, objetos];
            }



        } else if (this.operador==Operador.MODULO) {

            var valor1 = this.op_izquierda.getValorImplicito(objetos, entornos);
            var valor2 = this.op_derecha.getValorImplicito(objetos,entornos);

            if (typeof (valor1 === "number") && typeof (valor2 === "number")) {
                return valor1%valor2;
            } else {
                objetosGlobal = objetos;
                entornosGlobal = entornos;                                         
                return [entornos, objetos];
            }



        } else if (this.operador==Operador.DIFERENTE_QUE){

            if(this.operadores==TipoOperadores.ATRIBUTOS){

                

                var idAux = this.op_izquierda.getValorImplicito(objetos, entornos);
                var valorAux = this.op_derecha.getValorImplicito(objetos,entornos);

                objetos.forEach(function (objeto){

                    objeto.getAtributos().forEach(function (atributo){
        
                        if(atributo.getID().toString().toLowerCase()==idAux.toString().toLowerCase() 
                        && atributo.getValor().toString()!=valorAux.toString()){
        
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

            var valor1 = this.op_izquierda.getValorImplicito(objetos, entornos);
            var valor2 = this.op_derecha.getValorImplicito(objetos,entornos);

                if ((typeof (valor1) === "string") && (typeof (valor2) === "number")){
                    
                    var errorS = false;

                    objetos.forEach(function (objeto){

                        objeto.getObjetos().forEach(function (obj){
                            
            
                            if(obj.getID().toString().toLowerCase()==valor1.toString().toLowerCase()){

                                if(isNumeric(obj.getTexto())==true){
                                    
                                    if(Number(obj.getTexto())!=valor2) {

                                        if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                                            objetosAux.push(objeto);
                                            if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                                                entornosAux.push(objeto.getEntorno());
                                            } 
                                        }  
                                    }
                                } else{
                                    errorS = true;
                                }                                  
                            }                                                 
                        });
                        });  
                    
                    if(errorS==true){
                        ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                        valor1 + ` debe compararse con un valor numerico.`,"XPATH")); NumeroE++;
                    }
                    
                    objetosGlobal = objetosAux;
                    entornosGlobal = entornosAux;                                         
                    return [entornosAux, objetosAux];

                } else if ((typeof (valor1) === "number") && (typeof (valor2) === "string")){
                    
                    var errorS = false;

                    objetos.forEach(function (objeto){

                        objeto.getObjetos().forEach(function (obj){
                            
                            if(obj.getID().toString().toLowerCase()==valor2.toString().toLowerCase()){
                                
                                if(isNumeric(obj.getTexto())==true){
                                    
                                    if(Number(obj.getTexto())!=valor1) {

                                        if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                                            objetosAux.push(objeto);
                                            if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                                                entornosAux.push(objeto.getEntorno());
                                            } 
                                        }  
                                    }
                                } else{
                                    errorS = true;
                                }                                  
                            }                                                 
                        });
                        });   
                        
                    if(errorS==true){
                        ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                                valor2 + ` debe compararse con un valor numerico.`,"XPATH")); NumeroE++;
                    }
                    
                    objetosGlobal = objetosAux;
                    entornosGlobal = entornosAux;                                         
                    return [entornosAux, objetosAux];

                } else if ((typeof (valor1) === "string") && (typeof (valor2) === "string")) {

                    if(this.op_derecha.esCadena()==true){

                        var idAux = this.op_izquierda.getValorImplicito(objetos, entornos).toString();
                        var valorAux = this.op_derecha.getValorImplicito(objetos,entornos).toString();
        
                        objetos.forEach(function (objeto){
        
                            objeto.getObjetos().forEach(function (obj){
                
                                if(obj.getID().toString().toLowerCase()==idAux.toLowerCase() && obj.getTexto().toString()!=valorAux){
                
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
        
                    } else {
                        
                        var errorS = false;

                        objetos.forEach(function (objeto){

                        var id1 = BuscarObjeto(objeto.getObjetos(), valor1);
                        var id2 = BuscarObjeto(objeto.getObjetos(), valor2);

                        if((id1 != null && id2 != null)){

                            if(id1.getTexto().toString() == id2.getTexto().toString()) {

                                if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                                    objetosAux.push(objeto);
                                    if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                                        entornosAux.push(objeto.getEntorno());
                                    } 
                                }  
                            }

                        } else {
                            errorS = true;
                        }
                        
                        });    
                        
                    if(errorS==true){
                        ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                        `Ningun identificador apunta a un valor numérico para ser comparado`,"XPATH")); NumeroE++;
                    }
                    
                        objetosGlobal = objetosAux;
                        entornosGlobal = entornosAux;                                         
                        return [entornosAux, objetosAux];

                    }
                }
           }

        } else if (this.operador==Operador.OR){

            var objetosop1 = [];
            var entornosop1 = [];
            var objetosop2 = [];
            var entornosop2 = [];

            var resultadoOperacion1 = this.op_izquierda.getValorImplicito(objetos, entornos);

            if (typeof(resultadoOperacion1) === 'number'){

                if (this.isInt(Number(resultadoOperacion1))) {

                    var indice = resultadoOperacion1;
        
                    if(indice>0){
        
                        if(objetos.length>0){       
                            indice = indice - 1;
                            objetosop1.push(objetos[indice]);
                            entornosop1.push(objetos[indice].getEntorno());
                        }  
                    } 
                                                                            
                } else {
                    ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                    `La expresion del predicado no puede ser solamente un decimal`,"XPATH")); NumeroE++;
                    objetosGlobal = objetosAux;
                    entornosGlobal = entornosAux;                                         
                    return [entornosAux, objetosAux];
                }                                                        
            } else {
                objetosop1 = resultadoOperacion1[1];
                entornosop1 = resultadoOperacion1[0];
            }

            var resultadoOperacion2 = this.op_derecha.getValorImplicito(objetos, entornos);

            if (typeof(resultadoOperacion2) === 'number'){

                if (this.isInt(Number(resultadoOperacion2))) {

                    var indice = resultadoOperacion2;
        
                    if(indice>0){
        
                        if(objetos.length>0){       
                            indice = indice - 1;
                            objetosop2.push(objetos[indice]);
                            entornosop2.push(objetos[indice].getEntorno());
                        }  
                    } 
                                                                            
                } else {
                    ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                    `La expresion del predicado no puede ser solamente un decimal`,"XPATH")); NumeroE++;
                    objetosGlobal = objetosAux;
                    entornosGlobal = entornosAux;                                         
                    return [entornosAux, objetosAux];
                }                                                        
            } else {
                objetosop2 = resultadoOperacion2[1];
                entornosop2= resultadoOperacion2[0];
            }


            objetosop1.forEach(function (objeto){

                if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                    objetosAux.push(objeto);
                    if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                        entornosAux.push(objeto.getEntorno());
                    } 
                }                               
            });  
        
            objetosop2.forEach(function (objeto){

                if(ObjetoYaExiste(objetosAux,objeto.LeerID())==false){
                    objetosAux.push(objeto);
                    if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                        entornosAux.push(objeto.getEntorno());
                    } 
                }                               
            }); 

            objetosGlobal = objetosAux;
            entornosGlobal = entornosAux;                                         
            return [entornosAux, objetosAux]
            

        } else if (this.operador==Operador.AND){

            var objetosop1 = [];
            var entornosop1 = [];
            var objetosop2 = [];
            var entornosop2 = [];

            var resultadoOperacion1 = this.op_izquierda.getValorImplicito(objetos, entornos);

            if (typeof(resultadoOperacion1) === 'number'){

                if (this.isInt(Number(resultadoOperacion1))) {

                    var indice = resultadoOperacion1;
        
                    if(indice>0){
        
                        if(objetos.length>0){       
                            indice = indice - 1;
                            objetosop1.push(objetos[indice]);
                            entornosop1.push(objetos[indice].getEntorno());
                        }  
                    } 
                                                                            
                } else {
                    ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                    `La expresion del predicado no puede ser solamente un decimal`,"XPATH")); NumeroE++;
                    objetosGlobal = objetosAux;
                    entornosGlobal = entornosAux;                                         
                    return [entornosAux, objetosAux];
                }                                                        
            } else {
                objetosop1 = resultadoOperacion1[1];
                entornosop1 = resultadoOperacion1[0];
            }

            var resultadoOperacion2 = this.op_derecha.getValorImplicito(objetos, entornos);

            if (typeof(resultadoOperacion2) === 'number'){

                if (this.isInt(Number(resultadoOperacion2))) {

                    var indice = resultadoOperacion2;
        
                    if(indice>0){
        
                        if(objetos.length>0){       
                            indice = indice - 1;
                            objetosop2.push(objetos[indice]);
                            entornosop2.push(objetos[indice].getEntorno());
                        }  
                    } 
                                                                            
                } else {
                    ListaErr.agregarError(new Error(NumeroE, 1,1, "Semántico",
                    `La expresion del predicado no puede ser solamente un decimal`,"XPATH")); NumeroE++;
                    objetosGlobal = objetosAux;
                    entornosGlobal = entornosAux;                                         
                    return [entornosAux, objetosAux];
                }                                                        
            } else {
                objetosop2 = resultadoOperacion2[1];
                entornosop2= resultadoOperacion2[0];
            }


            objetosop1.forEach(function (objeto){

                if(ObjetoYaExiste(objetosop2,objeto.LeerID())==true){
                    objetosAux.push(objeto);
                    if(EntornoYaExiste(entornosAux,objeto.getEntorno().getID())==false){
                        entornosAux.push(objeto.getEntorno());
                    } 
                }                               
            });  
        

            objetosGlobal = objetosAux;
            entornosGlobal = entornosAux;                                         
            return [entornosAux, objetosAux]

        } else { 
            objetosGlobal = objetos;
            entornosGlobal = entornos;                                         
            return [entornos, objetos];
        }

     
    };
    Operacion.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };

    Operacion.prototype.isNumeric = function (str) {
        if (typeof str != "string") return false 
        return !isNaN(str) && !isNaN(parseFloat(str)) 
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
