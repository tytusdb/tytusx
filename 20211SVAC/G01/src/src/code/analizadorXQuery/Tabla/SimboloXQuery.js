import { Tipo } from "../Expresiones/Expresion";

export class SimboloXQuery {
    linea = 0; 
    columna = 0; 
    id = "";       // nombre de la variable   
    entorno = null; // si es de tipo Consulta
    variable = "";  // nombre del nodo que resulto la variable 
    valor = "";    // la consulta si es consulta
    tipo = null; 
    posicion = 0; 
    ambito = ""

    constructor(linea, columna, id, valor, entorno, tipo){
        this.linea = linea; 
        this.columna = columna;
        this.id = id; 
        this.valor = valor; 
        this.entorno = entorno; 
        this.tipo = tipo; 
        this.getVariable()
    }

    getVariable(){
        if(typeof this.valor === 'string'){
            if(!this.valor.includes('/')) return
            let resultado = this.valor.split('/'); 
            this.variable = resultado[resultado.length-1]; 
        }
        
    }

    setEntorno(entornoXML){
        if(this.tipo == Tipo.CONSULTA){
            this.entorno = entornoXML
        }
    }

    setAmbito(ambito){
        this.ambito = ambito
    }
    
}