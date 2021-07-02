import { Tipo } from "../Expresiones/Expresion";
import { Funcion } from "../Instrucciones/Funcion";
import { Error } from "./Error";
import { SimboloXQuery } from "./SimboloXQuery";

export class TablaSimbolos {
    tabla = []; 

    constructor(){
        this.tabla = []
    }

    addSimbolo(simbolo){
        this.tabla.push(simbolo)
    }


    buscar(variable){
        for(let simbolo of this.tabla){
            if(simbolo.id == variable){
                return simbolo; 
            }
        }
        return null; 
    }


}

export class Entorno{
    variables = []; 
    procesos = [];  
    padre = null; 
    nombre = ''

    constructor(padre, nombre){
        this.padre = padre; 
        this.nombre =  nombre; 
        this.variables = []; 
        this.funciones = []; 
    }

    buscarVariable(id){
        for(let variable of this.variables){
            if(variable instanceof SimboloXQuery){
                if(variable.id == id){
                    return true
                }
            }
        }
        return false
    }

    buscar(id){
        let entornoActual = this; 
        while(entornoActual != null){
            if(entornoActual.buscarVariable(id)){
                return true 
            }else if(entornoActual.buscarFuncion(id)){
                return true 
            }
            entornoActual = entornoActual.padre
        }
        return false
    }

    buscarFuncion(funcionID){
        for(let funcion of this.funciones){
            if(funcion instanceof Funcion){
                if(funcion.id == funcionID){
                    return true 
                }
            }
        }
        return false
    }

    getVariable(id){
        let entornoActual = this; 
        while(entornoActual != null){
            if(entornoActual.buscarVariable(id)){
                for(let variable of entornoActual.variables){
                    if(variable instanceof SimboloXQuery){
                        if(variable.id == id){
                            return variable
                        }
                    }
                }
            }
            entornoActual = entornoActual.padre
        }
        return null
    }

    getFuncion(funcionID){
        let entornoActual = this;         
        while(entornoActual != null){
            if(entornoActual.buscarFuncion(funcionID)){
                for(let funcion of entornoActual.funciones){
                    if(funcion instanceof Funcion){
                        if(funcion.id == funcionID){
                            return funcion
                        }
                    }
                }
            }

            entornoActual = entornoActual.padre
        }
        
        return null
    }

    declarar(id, valor, linea, columna, tipo){
        if(!this.buscarVariable(id)){
            this.variables.push(new SimboloXQuery(linea, columna, id, valor, null, tipo)); 
            return ""
        }else{
            let nuevoError = new Error('Semantico', `La variable ${id} ya existe en el entorno`, linea, columna)
            return nuevoError
        }       
    }

    asignar(id, valor, linea, columna){
        let simbolo = this.getVariable(id)
        if(simbolo instanceof SimboloXQuery){
            simbolo.valor = valor
        }else{
            let nuevoError = new Error('Semantico', 'La variable '+id+ 'no se pudo asignar su nuevo valor', linea, columna)
            return nuevoError
        }
    }

    guardarFuncion(funcion){
        if(funcion instanceof Funcion){
            this.funciones.push(funcion)
        }
    }

    setValorVariable(id, valor, entorno){ // entorno si es una consulta        
      for(let variable of this.variables){
          if(variable instanceof SimboloXQuery){
              if(variable.id == id){
                  this.valor = valor; 
                  variable.setEntorno(entorno)
                  return
              }
          }
      }
    }
}