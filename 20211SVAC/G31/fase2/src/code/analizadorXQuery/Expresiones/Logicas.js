import { findLastIndex, sortedLastIndexOf } from "lodash";
import { Objeto } from "../../analizadorXML/helpers";
import { Error } from "../Tabla/Error";
import { Consulta } from "./Consulta";


export class And {
    linea = 0; 
    columna = 0; 
    tipo =  null;
    tipoObj = null; 
    izq = null; 
    der =  null; 

    constructor(linea, columna, tipoObj, tipo, izq, der){
        this.linea =  linea; 
        this.columna = columna; 
        this.tipoObj = tipoObj; 
        this.tipo = tipo; 
        this.izq = izq; 
        this.der = der; 
    }

    getValor(tabla){
        let resultIzq = this.izq.getValor(tabla)
        if(resultIzq instanceof Error){
            return resultIzq
        }

        let resultDer =  this.der.getValor(tabla)
        if(resultDer instanceof Error){
            return resultDer
        }

        console.log('AND', resultIzq, resultDer); 

        let retorno = new Objeto('/', [], [], this.linea, this.columna, ''); 

        if(resultIzq instanceof Objeto){
            if(resultDer instanceof Objeto){
                for(let hijoIzq of resultIzq.hijos){
                    for(let hijoDer of resultDer.hijos){
                        if(this.comprobarObjetos(hijoIzq, hijoDer)){
                            retorno.hijos.push(hijoDer)
                        }
                    }
                }
            }
        }else{
            if(resultDer == true && resultIzq == true){
                return true
            }else{
                return false
            }
        }    
        

        return retorno
    }

    comprobarObjetos(objeto1, objeto2){
        if(objeto1 instanceof Objeto && objeto2 instanceof Objeto){
            if(objeto1.atributos.length === objeto2.atributos.length){
                for (let index = 0; index < objeto1.atributos.length; index++) {
                    let atributo1 = objeto1.atributos[index]
                    let atributo2 = objeto2.atributos[index]
                    if(atributo1.nombre == atributo2.nombre && atributo1.valor == atributo2.valor){

                    }else{
                        //console.log('false en atributo nombre y valor ')
                        return false
                    }
                }

                if(objeto1.hijos.length === objeto2.hijos.length){
                    for (let index = 0; index < objeto2.hijos.length; index++) {
                        let hijo1 =  objeto1.hijos[index]; 
                        let hijo2 = objeto2.hijos[index]; 
                        if(hijo1.texto == hijo2.texto && hijo1.tipo == hijo2.tipo){

                        }else{
                           // console.log('false en hijos texto y tipo')
                            return false
                        }
                    }
                }else{
                    //console.log('false en hijos length')
                    return false
                }

            }else{
                //console.log('false en atributos lenght')
                return false
            }
        }else{
            //console.log('false en Objeto')
            return false
        }

        return true
    }

    
}



export class Or {
    linea = 0; 
    columna = 0; 
    tipo =  null;
    tipoObj = null; 
    izq = null; 
    der =  null; 

    constructor(linea, columna, tipoObj, tipo, izq, der){
        this.linea =  linea; 
        this.columna = columna; 
        this.tipoObj = tipoObj; 
        this.tipo = tipo; 
        this.izq = izq; 
        this.der = der; 
    }

    getValor(tabla, xml){
        console.log('OR', this)
        let resultIzq = this.izq.getValor(tabla, xml)
        if(resultIzq instanceof Error){
            return resultIzq
        }

        let resultDer =  this.der.getValor(tabla, xml)
        if(resultDer instanceof Error){
            return resultDer
        }

    }
}