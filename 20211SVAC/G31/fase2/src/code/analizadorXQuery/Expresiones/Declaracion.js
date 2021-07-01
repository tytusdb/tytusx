import { Error } from "../Tabla/Error";
import { Entorno } from "../Tabla/TablaSimbolos";

export class Declaracion {
    id = ""; 
    tipo =  null; 
    linea = 0; 
    columna = 0; 
    instruccion = null; 


    constructor(id, tipo, instruccion, linea, columna){
        this.linea = linea; 
        this.columna = columna; 
        this.id = id; 
        this.tipo = tipo; 
        this.instruccion = instruccion; 
    }

    getValor(entorno){
        let valor = this.instruccion.getValor(entorno); 
        if(valor instanceof Error) return valor 

        if(entorno instanceof Entorno){
            return entorno.declarar(this.id, valor, this.linea, this.columna);             
        }else{
            let errorNuevo = new Error('Semantico', 'No se pudo realizar la declaracion en xQuery',this.linea, this.columna); 
            return errorNuevo
        }        
    }

}