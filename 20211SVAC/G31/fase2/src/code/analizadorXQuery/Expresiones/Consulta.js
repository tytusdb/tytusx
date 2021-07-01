import { Entorno, TablaSimbolos } from '../Tabla/TablaSimbolos'
import { NodoXQuery } from "./Expresion";
import { parse } from "../../analizadorXPath/Xpath";
import { parse as grammar } from "../../analizadorXML/grammar";
import { Error } from '../Tabla/Error';

export class Consulta extends NodoXQuery{
    consulta = ""; 
    linea = 0; 
    columna = 0; 
    variable = ""; 
    instrucciones = []

    constructor(tipo, valor, consulta, instrucciones, linea, columna){
        super(tipo, valor)
        this.consulta = consulta; 
        this.variable = ""
        this.instrucciones = [instrucciones]
        if(this.valor.includes('$') || this.valor.includes('/')){
            this.getVariable(); 
        }
        this.linea = linea; 
        this.columna = columna
    }

    getValor(entorno){
        try {
            if(this.valor.includes('$') || this.valor.includes('/')){
                this.getVariable(); 
                if(entorno instanceof Entorno){ 
                    if(entorno.buscar(this.variable)){      
                        let simbolo = entorno.getVariable(this.variable); 
                        console.log('Se encontro este simbolo', simbolo)
                        if(this.consulta == ""){
                            if(typeof simbolo.valor === 'string'){
                                return simbolo.valor
                            }else{
                                console.log(simbolo.valor)
                                let retorno = simbolo.valor.getValor(entorno)
                                console.log(retorno, 'REVISAR AQUI')
                                simbolo.valor = retorno
                                return retorno
                            }
                        }else{                  
                            let entorno = this.ejecutarConsulta(`/${simbolo.variable}${this.consulta}`, simbolo.entorno)
                            entorno = this.buscarPadre(simbolo.entorno, entorno)
                            return entorno
                        }   
                    }else{
                        /*let entorno = this.ejecutarConsulta(this.valor, xml)
                        return entorno*/
                    }            
                }             
            }else{
                return this.valor
            }
        } catch (error) {
            let errorNuevo = new Error('Semantico', 'No se puedo encontrar la variable', this.linea, this.columna)
            return errorNuevo
        }
    }

    getVariable(){        
        let resultado = this.valor.split('/'); 
        if(resultado.length > 1){
            this.variable = resultado[0]
            this.consulta = ""
            for(let i =1; i < resultado.length; i++){
                this.consulta += '/'+resultado[i]
            }           
        }else{
            this.variable = resultado[0]
            this.consulta = ""; 
        }
        return this.variable
    } 

    ejecutarConsulta(consulta, xml){
        if(consulta == '') return 
        var funcion = parse(consulta); 
        if(funcion.errores.length > 0)
        {
            alert(`No se pudo realizar la consulta -> ${consulta}`); 
            console.log(funcion.errores); 
        }
        var respuesta = funcion.Ejecutar(xml);   // Aqui uso la consulta del G17
        var xmlNuevo = grammar(respuesta); 
        return xmlNuevo.datos
    }

    
    
    asignarPadre(entorno){
        for(let hijo of entorno.hijos){
            hijo.padre = entorno
            hijo = this.asignarPadre(hijo)
        }
        return entorno
    }

    buscarPadre(simboloEntorno, entorno){
        var padres = simboloEntorno.hijos
        var resultados = entorno.hijos; 

        for(let padre of padres){
            for(let hijo of padre.hijos){
                for(let resultado of resultados){
                    if(resultado.tipo == hijo.tipo && resultado.texto == hijo.texto){
                        resultado.padre = padre; 
                    }
                }
            }
        }
        return entorno
    }

}