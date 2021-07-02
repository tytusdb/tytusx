import { ErroresGlobal } from '../../analizadorXPath/AST/Global'
import { Error } from "../Tabla/Error";

export class If{
    linea = 0; 
    columna = 0; 
    condicion = null; 
    instruccionesV = []
    instruccionesF = []

    constructor(linea, columna, condicion, instruccionesV, instruccionesF ){
        this.linea = linea; 
        this.columna = columna; 
        this.condicion = condicion; 
        this.instruccionesF = instruccionesF; 
        this.instruccionesV = instruccionesV; 
    }

    getValor(entorno){
        console.log('Ejecutando el if', this) 

        let condicion; 
        
        if(Array.isArray(this.condicion)){
            for(let cond of this.condicion){
                condicion = cond.getValor(entorno); 
                if(condicion instanceof Error){
                    return condicion
                }
            }
        }


        if(condicion){ // fue verdadera 
            console.log('Ejecutando las instrucciones Verdaderas del If', this)
            if(Array.isArray(this.instruccionesV)){
                for(let instruccioF of this.instruccionesV){

                }
            }else{
                return this.instruccionesV.getValor(entorno)
            }
        }else{ // fue falsa
            console.log('Ejecutando las instrucciones Falsas del If', this)
            if(Array.isArray(this.instruccionesF)){
                for(let instruccioF of this.instruccionesF){

                }
            }else{
                return this.instruccionesF.getValor(entorno)
            }
            
        }

        return condicion

    }
    
}