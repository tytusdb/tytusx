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

    getValor(entorno, xml){
        let valor = this.instruccion.getValor(entorno, xml); 
        if(valor instanceof Error) return valor 

        console.log('Esto se esta tratando de adignar a una declaracion', valor)
        if(entorno instanceof Entorno){
            return entorno.declarar(this.id, valor, this.linea, this.columna);             
        }else{
            let errorNuevo = new Error('Semantico', 'No se pudo realizar la declaracion en xQuery',this.linea, this.columna); 
            return errorNuevo
        }        
    }

}

export class Asignacion{
    id = ""; 
    tipo = null; 
    linea = 0; 
    columna = 0; 
    expresion = null; 

    constructor(id, expresion, tipo, linea, columna){
        this.id = id; 
        this.expresion = expresion; 
        this.tipo = tipo; 
        this.linea = linea; 
        this.columna = columna; 
    }

    getValor(entorno, xml){
        let valor = this.expresion.getValor(entorno, xml); 
        if(valor instanceof Error)
            return valor

        if(entorno instanceof Entorno){
            if(!entorno.buscar(this.id)){
                entorno.declarar(this.id, valor, this.linea, this.columna)
            }else{
                entorno.asignar(this.id, valor, this.linea, this.columna)
            }
        }
        return entorno
    }
}