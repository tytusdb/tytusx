import { ErroresGlobal } from "../../analizadorXPath/AST/Global";
import { Error } from "../Tabla/Error";

export class UpperFuncion {
    linea = 0; 
    columna = 0; 
    expresion = null; 

    constructor(expresion, linea, columna){
        this.linea = linea; 
        this.columna = columna; 
        this.expresion = expresion; 
    }

    getValor(entorno, xml){
        let valor = this.expresion.getValor(entorno, xml)
        if(valor instanceof Error) 
            return valor 

        if(typeof valor === 'string'){
            return valor.toUpperCase()
        }else{
            let nuevoError = new Error('Semántico', 'No se puede realizar la conversion, no es un string', this.linea, this.columna)
            ErroresGlobal.push({Error: 'No se pudo realizar la conversion', tipo: 'Semámtico', linea: this.linea, columna: this.columna})
            return nuevoError
        }
            
    }
}

export class LowerFuncion {
    linea = 0; 
    columna = 0; 
    expresion = null; 

    constructor(expresion, linea, columna){
        this.linea = linea; 
        this.columna = columna; 
        this.expresion = expresion; 
    }

    getValor(entorno, xml){
        let valor = this.expresion.getValor(entorno, xml)
        if(valor instanceof Error) 
            return valor 

        if(typeof valor === 'string'){
            return valor.toLowerCase()
        }else{
            let nuevoError = new Error('Semántico', 'No se puede realizar la conversion, no es un string', this.linea, this.columna)
            ErroresGlobal.push({Error: 'No se pudo realizar la conversion', tipo: 'Semámtico', linea: this.linea, columna: this.columna})
            return nuevoError
        }
            
    }
}

export class SubstringFuncion {
    linea = 0; 
    columna = 0; 
    expresion = null; 
    inicio = 0; 
    fin = 0; 

    constructor(expresion, inicio, fin, linea, columna ){
        this.linea = linea; 
        this.columna = columna; 
        this.inicio = inicio; 
        this.expresion = expresion; 
        this.fin = fin; 
    }

    getValor(entorno, xml){

        let valor
        if(Array.isArray(this.expresion)){
            for(let exp of this.expresion){
                valor = exp.getValor(entorno, xml)
            }
        }else{
            valor = this.expresion.getValor(entorno, xml)
        }
       
        if(valor instanceof Error)
            return valor
        

        let rfinal
        let rinicio = this.inicio.getValor(entorno, xml)
        if(this.final != null){
            rfinal = this.inicio.getValor(entorno, xml )
        }else{
            rfinal = null; 
        }
       
        if(rinicio instanceof Error) 
            return rinicio

        if(rfinal instanceof Error)
            return rfinal

        let resultInicio = parseInt(rinicio)
        let resultFinal = 0
        if(rfinal != null){
            resultFinal = parseInt(rfinal)
        }
        if(isNaN(resultFinal) || isNaN(resultInicio)){
            let nuevoError = new Error('Semántico', 'No se puede realizar la conversion, Error en argumentos de inicio y fin - Función substring', this.linea, this.columna)
            ErroresGlobal.push({Error: 'No se pudo realizar la conversion', tipo: 'Semántico', linea: this.linea, columna: this.columna})
            return nuevoError
        }

        if(typeof valor === 'string'){
            if(this.fin ==  null){
                let retorno = valor.substr(resultInicio)
                return retorno
            }else{
                let retorno = valor.substr(resultInicio, resultFinal)
                return retorno
            }
        }else{
            let nuevoError = new Error('Semántico', 'No se puede realizar la conversion, no es un string', this.linea, this.columna)
            ErroresGlobal.push({Error: 'No se pudo realizar la conversion', tipo: 'Semántico', linea: this.linea, columna: this.columna})
            return nuevoError
        }
    }
}



export class Astring{
    linea = 0; 
    columna = 0; 
    expresion = null

    constructor(expresion, linea, columna){
        this.linea = linea; 
        this.columna = columna; 
        this.expresion = expresion; 
    }

    getValor(entorno, xml){
        let valor = this.expresion.getValor(entorno, xml)
        if(valor instanceof Error)
            return valor

        return valor.toString()
    }


}

export class Anumber{
    linea = 0; 
    columna = 0; 
    expresion = null

    constructor(expresion, linea, columna){
        this.linea = linea; 
        this.columna = columna; 
        this.expresion = expresion; 
    }

    getValor(entorno, xml){
        let valor = this.expresion.getValor(entorno, xml)
        if(valor instanceof Error)
            return valor
        
        let result = parseFloat(valor)
        if(isNaN(result)){            
            let nuevoError = new Error('Semántico', 'No se puede realizar la conversion, no es un string', this.linea, this.columna)
            ErroresGlobal.push({Error: 'No se pudo realizar la conversion', tipo: 'Semántico', linea: this.linea, columna: this.columna})
            return nuevoError
        }
            
        return result
    }

}