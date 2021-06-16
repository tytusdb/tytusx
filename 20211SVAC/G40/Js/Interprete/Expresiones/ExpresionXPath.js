"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.ExpresionXPath = void 0;
var ExpresionXPath = /** @class */ (function () {
    function ExpresionXPath(linea, columna, identificador, tipo, predicado) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.identificador = identificador;
        this.predicado = predicado;
        this.resultado = null;
    }
    ExpresionXPath.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };
    ExpresionXPath.prototype.getValorImplicito = function (ent, busqueda) {

        var entornoActual = ent;
        var tipoBusqueda = busqueda;

        if (this.getTipo()== TipoExpresionXPath.IDENTIFICADOR){
            this.resultado = this.buscarIDs(entornoActual,tipoBusqueda, this.identificador);
            return this.resultado;
        } else if (this.getTipo()== TipoExpresionXPath.ASTERISCO){
            this.resultado = this.buscarAsterisco(entornoActual,tipoBusqueda);
            return this.resultado;
        } else if (this.getTipo()== TipoExpresionXPath.NODE){
            this.resultado = this.buscarNodos(entornoActual,tipoBusqueda);
            return this.resultado;
        } else if (this.getTipo()== TipoExpresionXPath.TEXT){
            this.resultado = this.buscarTextos(entornoActual,tipoBusqueda);
            return this.resultado;
        } else if (this.getTipo()== TipoExpresionXPath.PUNTO){
            this.resultado = this.buscarPunto(entornoActual,tipoBusqueda);
            return this.resultado;
        } else if (this.getTipo()== TipoExpresionXPath.DOBLEPUNTO){
            this.resultado = this.buscarDoblePunto(entornoActual,tipoBusqueda);
            return this.resultado;
        } else if (this.getTipo()== TipoExpresionXPath.ARROBA){
            this.resultado = this.buscarArrobaAsterisco(entornoActual,tipoBusqueda);
            return this.resultado;
        } else if (this.getTipo()== TipoExpresionXPath.ARROBA_ID){
            this.resultado = this.buscarArrobaID(entornoActual,tipoBusqueda,this.identificador);
            return this.resultado;
        }

    };

    ExpresionXPath.prototype.buscarIDs = function (ent, busqueda, id) { 

        var entornoActual = ent;
        var objetos = [];
        var entornos = [];

        if (busqueda==13){


            entornoActual.forEach(function (entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                if(objeto.getID().toLowerCase() == id.toLowerCase()){
                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }  
                      
                } 
                });            
            });
            objetosGlobal = objetos;
            entornosGlobal = entornos;                                         
            return [entornos, objetos];

        } else if (busqueda==14){
         
            function LlamadaRecursiva(id, entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                if(objeto.getID().toLowerCase() == id.toLowerCase()){
                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }   
                } else {
                    LlamadaRecursiva(id,objeto.getEntorno());
                } 
                }); 
            }
                      
            entornoActual.forEach(function (entorno){
                LlamadaRecursiva(id,entorno);
            });            
            
            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];
            
        } else if (busqueda==15){
    
            function LlamadaRecursiva(id, entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                if(objeto.getID().toLowerCase() == id.toLowerCase()){
                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }   
                } else {
                    LlamadaRecursiva(id,objeto.getEntorno());
                } 
                }); 
            }
                      
            entornoActual.forEach(function (entorno){
                LlamadaRecursiva(id,entorno);
            });      
            
            //eliminamos la primera coincidencia
            if (objetos.length>0){
                objetos.shift();
                entornos.shift();
                if(objetos.length>0){
                    //verificamos que todos los entornos de los objetos restantes
                    //esten en el arreglo entornos
                    objetos.forEach(function (objeto){
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    });                  
                }

            }
            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];

        } else if (busqueda==16){
            
            entornoActual.forEach(function (entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                if(objeto.getID().toLowerCase() == id.toLowerCase()){
                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }  
                      
                } 
                });            
            });

            //eliminamos la primera coincidencia
            if (objetos.length>0){
                objetos.shift();
                entornos.shift();
                if(objetos.length>0){
                    //verificamos que todos los entornos de los objetos restantes
                    //esten en el arreglo entornos
                    objetos.forEach(function (objeto){
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    });                  
                }

            }
            objetosGlobal = objetos;
            entornosGlobal = entornos;                                             
            return [entornos, objetos];

        } else if (busqueda==17){
            
            entornoActual.forEach(function (entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                if(objeto.getID().toLowerCase() == id.toLowerCase()){
                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }  
                      
                } 
                });            
            });
            objetosGlobal = objetos;   
            entornosGlobal = entornos;                                           
            return [entornos, objetos];

        } else if (busqueda==18){
            
            entornoActual.forEach(function (entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                if(objeto.getID().toLowerCase() == id.toLowerCase()){
                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }  
                      
                } 
                });            
            });

            //eliminamos la primera coincidencia
            if (objetos.length>0){
                objetos.shift();
                entornos.shift();
                if(objetos.length>0){
                    //verificamos que todos los entornos de los objetos restantes
                    //esten en el arreglo entornos
                    objetos.forEach(function (objeto){
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    });                  
                }

            }
            objetosGlobal = objetos;      
            entornosGlobal = entornos;                                       
            return [entornos, objetos];

        } else if (busqueda==19){
            entornoActual.forEach(function (entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                if(objeto.getID().toLowerCase() == id.toLowerCase()){
                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }  
                      
                } 
                });            
            });

            objetosGlobal = objetos;     
            entornosGlobal = entornos;                                        
            return [entornos, objetos];
        }

    }; 

    ExpresionXPath.prototype.buscarAsterisco = function (ent, busqueda) {
        
        var entornoActual = ent;
        var objetos = [];
        var entornos = [];

        if (busqueda==13){


            entornoActual.forEach(function (entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                
                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }  
                      
                 
                });            
            });
            objetosGlobal = objetos;   
            entornosGlobal = entornos;                                          
            return [entornos, objetos];

        } else if (busqueda==14){
         
            function LlamadaRecursiva(id, entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                
                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }   
                
                }); 
            }
                      
            entornoActual.forEach(function (entorno){
                LlamadaRecursiva(id,entorno);
            });            
            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];
            
        } else if (busqueda==15){
    
            function LlamadaRecursiva(id, entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }                  
                }); 
            }
                      
            entornoActual.forEach(function (entorno){
                LlamadaRecursiva(id,entorno);
            });      
            
            //eliminamos la primera coincidencia
            if (objetos.length>0){
                objetos.shift();
                entornos.shift();
                if(objetos.length>0){
                    //verificamos que todos los entornos de los objetos restantes
                    //esten en el arreglo entornos
                    objetos.forEach(function (objeto){
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    });                  
                }

            }
            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];

        } else if (busqueda==16){
            
            entornoActual.forEach(function (entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }                      
                });            
            });

            //eliminamos la primera coincidencia
            if (objetos.length>0){
                objetos.shift();
                entornos.shift();
                if(objetos.length>0){
                    //verificamos que todos los entornos de los objetos restantes
                    //esten en el arreglo entornos
                    objetos.forEach(function (objeto){
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    });                  
                }

            }
            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];

        } else if (busqueda==17){
            
            entornoActual.forEach(function (entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }                    
                 
                });            
            });
            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];

        } else if (busqueda==18){
            
            entornoActual.forEach(function (entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        }                                        
                } 
                });            
            });

            //eliminamos la primera coincidencia
            if (objetos.length>0){
                objetos.shift();
                entornos.shift();
                if(objetos.length>0){
                    //verificamos que todos los entornos de los objetos restantes
                    //esten en el arreglo entornos
                    objetos.forEach(function (objeto){
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    });                  
                }

            }
            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];

        } else if (busqueda==19){
            entornoActual.forEach(function (entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }  

                });            
            });

            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];
        }
    }; 

    ExpresionXPath.prototype.buscarNodos = function (ent, busqueda) {
        
        var entornoActual = ent;
        var objetos = [];
        var entornos = [];

        if (busqueda==13){


            entornoActual.forEach(function (entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                
                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }  
                      
                 
                });            
            });
            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];

        } else if (busqueda==14){
         
            function LlamadaRecursiva(id, entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                
                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }   
                
                }); 
            }
                      
            entornoActual.forEach(function (entorno){
                LlamadaRecursiva(id,entorno);
            });            
            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];
            
        } else if (busqueda==15){
    
            function LlamadaRecursiva(id, entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }                  
                }); 
            }
                      
            entornoActual.forEach(function (entorno){
                LlamadaRecursiva(id,entorno);
            });      
            
            //eliminamos la primera coincidencia
            if (objetos.length>0){
                objetos.shift();
                entornos.shift();
                if(objetos.length>0){
                    //verificamos que todos los entornos de los objetos restantes
                    //esten en el arreglo entornos
                    objetos.forEach(function (objeto){
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    });                  
                }

            }
            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];

        } else if (busqueda==16){
            
            entornoActual.forEach(function (entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }                      
                });            
            });

            //eliminamos la primera coincidencia
            if (objetos.length>0){
                objetos.shift();
                entornos.shift();
                if(objetos.length>0){
                    //verificamos que todos los entornos de los objetos restantes
                    //esten en el arreglo entornos
                    objetos.forEach(function (objeto){
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    });                  
                }

            }
            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];

        } else if (busqueda==17){
            
            entornoActual.forEach(function (entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }                    
                 
                });            
            });
            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];

        } else if (busqueda==18){
            
            entornoActual.forEach(function (entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        }                                        
                } 
                });            
            });

            //eliminamos la primera coincidencia
            if (objetos.length>0){
                objetos.shift();
                entornos.shift();
                if(objetos.length>0){
                    //verificamos que todos los entornos de los objetos restantes
                    //esten en el arreglo entornos
                    objetos.forEach(function (objeto){
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    });                  
                }

            }
            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];

        } else if (busqueda==19){
            entornoActual.forEach(function (entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }  

                });            
            });

            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];
        }


    };

    ExpresionXPath.prototype.buscarTextos = function (ent, busqueda) {
        
        var entornoActual = ent;
        var objetos = [];
        var entornos = [];

        if (busqueda==13){


            entornoActual.forEach(function (entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                if(objeto.getTexto() != ""){
                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }  
                      
                } 
                });            
            });
            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];

        } else if (busqueda==14){
         
            function LlamadaRecursiva(id, entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                if(objeto.getTexto() != ""){
                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }   
                } else {
                    LlamadaRecursiva(id,objeto.getEntorno());
                } 
                }); 
            }
                      
            entornoActual.forEach(function (entorno){
                LlamadaRecursiva(id,entorno);
            });            
            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];
            
        } else if (busqueda==15){
    
            function LlamadaRecursiva(id, entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                if(objeto.getTexto() != ""){
                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }   
                } else {
                    LlamadaRecursiva(id,objeto.getEntorno());
                } 
                }); 
            }
                      
            entornoActual.forEach(function (entorno){
                LlamadaRecursiva(id,entorno);
            });      
            
            //eliminamos la primera coincidencia
            if (objetos.length>0){
                objetos.shift();
                entornos.shift();
                if(objetos.length>0){
                    //verificamos que todos los entornos de los objetos restantes
                    //esten en el arreglo entornos
                    objetos.forEach(function (objeto){
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    });                  
                }

            }
            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];

        } else if (busqueda==16){
            
            entornoActual.forEach(function (entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                if(objeto.getTexto() != ""){
                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }  
                      
                } 
                });            
            });

            //eliminamos la primera coincidencia
            if (objetos.length>0){
                objetos.shift();
                entornos.shift();
                if(objetos.length>0){
                    //verificamos que todos los entornos de los objetos restantes
                    //esten en el arreglo entornos
                    objetos.forEach(function (objeto){
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    });                  
                }

            }
            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];

        } else if (busqueda==17){
            
            entornoActual.forEach(function (entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                if(objeto.getTexto() != ""){
                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }  
                      
                } 
                });            
            });
            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];

        } else if (busqueda==18){
            
            entornoActual.forEach(function (entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                if(objeto.getTexto() != ""){
                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }  
                      
                } 
                });            
            });

            //eliminamos la primera coincidencia
            if (objetos.length>0){
                objetos.shift();
                entornos.shift();
                if(objetos.length>0){
                    //verificamos que todos los entornos de los objetos restantes
                    //esten en el arreglo entornos
                    objetos.forEach(function (objeto){
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    });                  
                }

            }
            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];

        } else if (busqueda==19){

            entornoActual.forEach(function (entorno){

                var objetosAux = ObtenerObjetos(entorno);

                objetosAux.forEach(function (objeto){

                if(objeto.getTexto() != ""){
                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }  
                      
                } 
                });            
            });

            objetosGlobal = objetos;
            entornosGlobal = entornos; 
            return [entornos, objetos];
        }

    };

    ExpresionXPath.prototype.buscarPunto = function (ent, busqueda) {
        return [entornosGlobal, objetosGlobal];
    };

    ExpresionXPath.prototype.buscarArrobaAsterisco = function (ent, busqueda) {
        //return [entornosGlobal, objetosGlobal];
        var entornoActual = ent;
        var objetos = [];
        var entornos = [];

        

            objetosGlobal.forEach(function (objeto){

            if(objeto.getAtributos().length>0){
                if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                    objetos.push(objeto);
                    if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                        entornos.push(objeto.getEntorno());
                    } 
                }  
                  
            } 
            });            
        
        objetosGlobal = objetos;
        entornosGlobal = entornos;                                         
        return [entornos, objetos];

    };

    ExpresionXPath.prototype.buscarArrobaID = function (ent, busqueda, idAux) {
        //return [entornosGlobal, objetosGlobal];
        var entornoActual = ent;
        var objetos = [];
        var entornos = [];
        var idAux = idAux;        

            objetosGlobal.forEach(function (objeto){

            if(objeto.getAtributos().length>0){

                if(AtributoYaExiste(objeto.getAtributos(),idAux)==true){

                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }  

                }
                                         
            } 
            });            
        
        objetosGlobal = objetos;
        entornosGlobal = entornos;                                         
        return [entornos, objetos];

    };

    ExpresionXPath.prototype.buscarDoblePunto = function (ent, busqueda) {
        
        var entornoActual = ent;
        var objetos = [];
        var entornos = [];
         
        var entornoAux = [];

        entornoActual.forEach(function (entorno){

            if(entorno.getAnterior().getAnterior()!=null){

                if(EntornoYaExiste(entornoAux,entorno.getAnterior().getAnterior().getID())==false){
                    entornoAux.push(entorno.getAnterior().getAnterior());
                }
            }
           
        });

        if (entornoAux.length > 0){

                entornoActual = entornoAux;

                entornoActual.forEach(function (entorno){

                    var objetosAux = ObtenerObjetos(entorno);
    
                    objetosAux.forEach(function (objeto){
    
                    
                        if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                            objetos.push(objeto);
                            if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                                entornos.push(objeto.getEntorno());
                            } 
                        }  
                          
                     
                    });            
                });
                objetosGlobal = objetos;
                entornosGlobal = entornos; 
                return [entornos, objetos];
                        
            

        } else {
            //si llegamos a esta parte significa que ningun elemento tenia una raiz padre
            //por lo tanto el selector ..// no devuelve nada 
            return [[],[]];
        } 

        //-------------------------------
    };

    ExpresionXPath.prototype.getIdentificador = function () {
        return this.identificador;
    };

    return ExpresionXPath;
}());
//exports.ExpresionXPath = ExpresionXPath;