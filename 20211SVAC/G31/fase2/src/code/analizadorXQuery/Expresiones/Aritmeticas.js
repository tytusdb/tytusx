import { Objeto } from "../../analizadorXML/helpers";
import { parse } from "../../analizadorXPath/Xpath";
import { Error } from "../Tabla/Error";
const { ErroresGlobal } = require('../../analizadorXPath/AST/Global')

export class Suma {
    linea = 0; 
    columna = 0; 
    opeIzq = null; 
    tipo = null;
    opeDer = null; 

    constructor(linea, columna, tipo, opeIzq, opeDer){
        this.linea = linea; 
        this.columna = columna; 
        this.tipo = tipo; 
        this.opeIzq = opeIzq; 
        this.opeDer = opeDer; 
    }

    getValor(tabla, xml){
        
        let resultIzq = this.opeIzq.getValor(tabla, xml)
        if(resultIzq instanceof Error){
            return resultIzq
        }

        let resultDer = this.opeDer.getValor(tabla, xml)
        if(resultDer instanceof Error){
            return resultDer
        }
        console.log('SUMA', resultIzq, resultDer)
        let retorno = (Number(resultIzq) + Number(resultDer)).toString()
        
        if(retorno == undefined)return ""
        return retorno
    }

}

export class Resta {
    linea = 0; 
    columna = 0; 
    opeIzq = null; 
    tipo = null;
    opeDer = null; 

    constructor(linea, columna, tipo, opeIzq, opeDer){
        this.linea = linea; 
        this.columna = columna; 
        this.tipo = tipo; 
        this.opeIzq = opeIzq; 
        this.opeDer = opeDer; 
    }

    getValor(tabla, xml){
        let resultIzq = this.opeIzq.getValor(tabla, xml)
        if(resultIzq instanceof Error){
            return resultIzq
        }

        let resultDer = this.opeDer.getValor(tabla, xml)
        if(resultDer instanceof Error){
            return resultDer
        }

        return (Number(resultIzq) - Number(resultDer)).toString()
    }
}

export class Negativo {
    linea = 0; 
    columna = 0; 
    opeIzq = null; 
    tipo = null;

    constructor(linea, columna, tipo, opeIzq){
        this.linea = linea; 
        this.columna = columna; 
        this.tipo = tipo; 
        this.opeIzq = opeIzq; 
    }

    getValor(tabla, xml){
        let resultIzq = this.opeIzq.getValor(tabla, xml)
        if(resultIzq instanceof Error){
            return resultIzq
        }

        return (-Number(resultIzq)).toString()
    }
}

export class Positivo {
    linea = 0; 
    columna = 0; 
    opeIzq = null; 
    tipo = null;

    constructor(linea, columna, tipo, opeIzq){
        this.linea = linea; 
        this.columna = columna; 
        this.tipo = tipo; 
        this.opeIzq = opeIzq; 
    }

    getValor(tabla, xml){
        let resultIzq = this.opeIzq.getValor(tabla, xml)
        if(resultIzq instanceof Error){
            return resultIzq
        }

        return (+Number(resultIzq)).toString()
    }
}

export class Multiplicacion{
    linea = 0; 
    columna = 0; 
    opeIzq = null; 
    tipo = null;
    opeDer = null; 

    constructor(linea, columna, tipo, opeIzq, opeDer){
        this.linea = linea; 
        this.columna = columna; 
        this.tipo = tipo; 
        this.opeIzq = opeIzq; 
        this.opeDer = opeDer; 
    }

    getValor(tabla, xml){
        let resultIzq = this.opeIzq.getValor(tabla, xml)
        if(resultIzq instanceof Error){
            return resultIzq
        }

        let resultDer = this.opeDer.getValor(tabla, xml)
        if(resultDer instanceof Error){
            return resultDer
        }

        return (Number(resultIzq) * Number(resultDer)).toString()
    }
}

export class Division {
    linea = 0; 
    columna = 0; 
    opeIzq = null; 
    tipo = null;
    opeDer = null; 

    constructor(linea, columna, tipo, opeIzq, opeDer){
        this.linea = linea; 
        this.columna = columna; 
        this.tipo = tipo; 
        this.opeIzq = opeIzq; 
        this.opeDer = opeDer; 
    }

    getValor(tabla, xml){
        let resultIzq = this.opeIzq.getValor(tabla, xml)
        if(resultIzq instanceof Error){
            return resultIzq
        }

        let resultDer = this.opeDer.getValor(tabla, xml)
        if(resultDer instanceof Error){
            return resultDer
        }
        if(Number(resultDer) === 0){
            let nuevoError = new Error('Semantico', 'Division por cero', this.linea, this.columna)
            ErroresGlobal.push({Error:'Division por cero', tipo: 'Semántico', linea: this.linea, columna: this.columna})
            return nuevoError
        }

        return (Number(resultIzq) / Number(resultDer)).toString()
    }
}