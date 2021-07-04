import { Entorno, TablaSimbolos } from '../Tabla/TablaSimbolos'
import { NodoXQuery } from "./Expresion";
import { parse } from "../../analizadorXPath/Xpath";
import { parse as grammar } from "../../analizadorXML/grammar";
import { Error } from '../Tabla/Error';
import { If } from '../Instrucciones/If';
import { isArray } from 'lodash';
var { datosXML } = require('../../analizadorXPath/AST/Global')
const { ErroresGlobal } = require('../../analizadorXPath/AST/Global')

export class Consulta extends NodoXQuery{
    consulta = ""; 
    linea = 0; 
    columna = 0; 
    variable = ""; 
    instrucciones = null

    constructor(tipo, valor, consulta, instrucciones, linea, columna){
        super(tipo, valor)
        this.consulta = consulta; 
        this.variable = ""
        this.instrucciones = instrucciones
        if(this.valor.includes('$') || this.valor.includes('/')){
            this.getVariable(); 
        }
        this.linea = linea; 
        this.columna = columna
    }

    getValor(entorno, xml){
        //try {
            console.log('Esto se esta tratando de ejecu5tar en CONSULTA', this, entorno)
            if(this.instrucciones[0] == undefined || this.instrucciones == undefined){
                console.log('')
                if(this.valor.includes('$') || this.valor.includes('/')){
                    this.getVariable(); 
                    if(entorno instanceof Entorno){ 
                        if(entorno.buscar(this.variable)){      
                            let simbolo = entorno.getVariable(this.variable); 
                            console.log('Se encontro este simbolo', simbolo)
                            if(this.consulta == "" && !this.valor.includes('/')){
                                if(typeof simbolo.valor === 'string' || typeof simbolo.valor === 'number'){
                                    return simbolo.valor.toString()
                                }else{
                                    if(simbolo.valor instanceof Object){
                                        return simbolo.valor
                                    }
                                        console.log(simbolo.valor)
                                        let retorno = simbolo.valor.getValor(entorno)
                                        console.log(retorno, 'REVISAR AQUI')
                                        simbolo.valor = retorno.toString()
                                        return retorno
                                                                     
                                }
                            }else{                  
                                console.log('Se va a realizar la consulta', `/${simbolo.variable}${this.consulta}`)
                                let retorno = this.ejecutarConsulta(`/${simbolo.variable}${this.consulta}`, simbolo.valor)
                                retorno = this.buscarPadre(simbolo.valor, retorno)
                                return retorno
                            }   
                        }else{
                            let retorno = this.ejecutarConsulta(this.consulta, xml)                        
                            retorno = this.verificarRetorno(retorno)
                            console.log('Esto se ejecuto', retorno)
                            return retorno
                        }            
                    }             
                }else{
                    return this.valor
                }
            } else {
                console.log('Instrucciones de consulta', this.instrucciones)
                let retorno; 
                if(Array.isArray(this.instrucciones)){
                    for(let ins of this.instrucciones){
                        if(Array.isArray(ins)){
                            for(let instruccion of ins){
                                let ret = instruccion.getValor(entorno, xml)
                                retorno = ret
                            }
                        }else{
                            retorno = ins.getValor(entorno, xml)
                        }
                    }
                    console.log('Instrucciones de consulta: retorno', retorno)
                    if(retorno != undefined)
                        return retorno
                }else{
                    let retorno = this.instrucciones.getValor(entorno, xml)
                    if(retorno != undefined)
                        return retorno
                }
            }
        //} catch (error) {
        //    let errorNuevo = new Error('Semantico', 'No se puedo encontrar la variable', this.linea, this.columna)
        //    return errorNuevo
        //}
    }

    verificarRetorno(retorno){
        if(retorno.hijos.length === 1){
            if(retorno.hijos[0].hijos.length === 0){
                return retorno.hijos[0].texto
            }else{
                return retorno
            }            
        }else{
            return retorno
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