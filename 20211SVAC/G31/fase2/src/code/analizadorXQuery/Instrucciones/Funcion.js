import { Error } from '../Tabla/Error'
import { Entorno } from '../Tabla/TablaSimbolos';


export class Funcion {
    id = ""
    declaraciones = []; 
    parametros = []
    instrucciones = []
    entorno =  null; 
    tipo = null; 

    constructor(id,  parametros, instrucciones,  tipo){
        this.id = id  
        this.parametros = parametros; 
        this.instrucciones = instrucciones; 
        this.tipo = tipo; 
    }

    getValor(entorno){
        if(entorno instanceof Entorno){
            entorno.guardarFuncion(this); 
            return ""
        }
    }

    setEntorno(entorno){
        this.entorno = entorno; 
    }

    isEntorno(){
        if(this.entorno == null){
            return true
        }
        return false
    }

}

export class CallFuncion{
    linea = 0; 
    columna = 0; 
    parametros = []; 
    idFuncion = ""

    constructor(idFuncion, parametros, linea, columna){
        this.idFuncion = idFuncion; 
        this.parametros = parametros;
        this.linea = linea; 
        this.columna = columna
    }

    getValor(entorno, xml){
        if(entorno.buscar(this.idFuncion)){
            let funcion = entorno.getFuncion(this.idFuncion)
            if(funcion instanceof Funcion){
               if(funcion.parametros.length == this.parametros.length){   // Ejecucion de la funcion
                    
                        let entornoFuncion = new Entorno(entorno, funcion.id)
                        if(funcion.isEntorno()){
                            funcion.setEntorno(entornoFuncion); 
                        }

                        // agregar los parametros 
                        for(let i = 0; i < this.parametros.length; i++){
                            if(funcion.entorno instanceof Entorno){
                                let parametro = funcion.parametros[i]
                                let expresion = this.parametros[i]
                                console.log('ewxpresion para variable', this.parametros[i])
                                let valor = expresion.getValor(entorno, xml); 
                                console.log('VALOR', valor)
                                entornoFuncion.declarar(parametro.id, valor, parametro.linea, parametro.columna, parametro.tipo)
                                console.log('ENTORNO DE FUNCION', funcion, entornoFuncion)
                            }
                        }
                   

                    // Ejecutar instrucciones
                        let retorno; 
                        if(Array.isArray(funcion.instrucciones)){
                            for(let instruccion of funcion.instrucciones){
                                console.log('Ejecutando las instrucciones de la consulta')
                                retorno = instruccion.getValor(entornoFuncion, xml)
                                console.log(`Retorno de la funcion ${funcion.id}`, retorno)
                            }
                        }else{
                            if(funcion.instrucciones != undefined){
                                retorno = funcion.instrucciones
                            }
                        }
                    

                    return retorno
               }else{
                   let newError = new Error('Semantico', 'No se recibieron los parámetros correctos', this.linea, this.columna)
                   return newError
               }
            }
        }else{
            let newError = new Error('Semantico', `No se encontro el nombre de la funcion ${this.idFuncion}`, this.linea, this.columna)
            return newError
        }
    }
}