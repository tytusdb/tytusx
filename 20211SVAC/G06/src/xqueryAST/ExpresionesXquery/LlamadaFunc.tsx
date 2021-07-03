import { ExpressionXquery, Retorno } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { Simbolo } from "../../xmlAST/Simbolo";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";
import { tipoPrimitivo } from "../ExpresionesXpath/Primitivo";
import { DecFunction } from "./DecFunction";

export class LlamadaFunc implements ExpressionXquery{

    constructor(
    public line: Number, 
    public column: Number,
    public idFunc: string,
    public expsParams: ExpressionXquery[]){}

    executeXquery(entAct: EntornoXQuery, RaizXML: Entorno, simboloPadre?: Simbolo): Retorno {
        
        var func = entAct.getFunc(this.idFunc);
        if (func != null){

            if (func.decsParams.length === this.expsParams.length){

                var valsParams = this.validarExpsParams(func, entAct, RaizXML);// executo los valores de los parametros de la llamada a la funcion y los obtengo
                
                var nvoEnt = new EntornoXQuery(entAct, this.idFunc);// creo un nuevo entorno 
                for (const decParam of func.decsParams) {
                    decParam.executeXquery(nvoEnt, RaizXML);        // declaro los parametros de la funcion
                }

                for (let i = 0; i < func.decsParams.length; i++) { // en este for recorro las variables que acabo de crear y las comparo con los tipos de los parametros de la llamada de la funcion 
                    
                    let param = nvoEnt.getVar(func.decsParams[i].idVar);
                    let valParam = valsParams[i];
                    
                    if (param?.type === valParam.type){
                        nvoEnt.guaradarVar(func.decsParams[i].idVar, valParam); // actualizo las variables declaradas
                    }if (param !== null){
                        throw new Error("Error Semantico: El Paramentro '" + param.type + "' no es compatible con el valor " + valParam.type+", linea:" +this.line + "columna: "+ this.column);
                    }
                }

                var salida;
                for (const xquery of this.expsParams) {
                    try {
                        salida += xquery.executeXquery(nvoEnt, RaizXML);
                    } catch (error) {
                        console.log(error)
                    }
                }


            }else {
                //errror
            }


        }else {
            //error
        }
        return {value: "", type: 0, SP: -1}// este solo es para salvar errores no eh terminado la progra

    }

    private validarExpsParams(func : DecFunction, entAct: EntornoXQuery, RaizXML: Entorno) : Retorno[] {

        var paramas: Retorno[] = []
        for (const expParam of this.expsParams) {
        
            var resultParam = expParam.executeXquery(entAct, RaizXML);
            if (resultParam.type === tipoPrimitivo.RESP){
                
                if (resultParam.value.length === 1){

                    if (resultParam.value[0].type === tipoPrimitivo.NODO){
                
                        if (resultParam.value.listaEntornos.length === 0 && resultParam.value.texto !== ''){
                            paramas.push({value:resultParam.value.texto, type: tipoPrimitivo.STRING, SP: -1})
                        }else { 
                            throw new Error("Error semantico: el tipo es: "+resultParam.type+"  sin texto, linea:" +this.line + "columna: "+ this.column);
                        }

                    }else {
                        paramas.push(resultParam)
                    }
                }else {
                    throw new Error("Error semantico: el tipo es un  listado de valores, linea: " +this.line + "columna: "+ this.column);
                }
                
            }else if (resultParam.type === tipoPrimitivo.NODO){
                
                if (resultParam.value.listaEntornos.length === 0 && resultParam.value.texto !== ''){
                    paramas.push({value:resultParam.value.texto, type: tipoPrimitivo.STRING, SP: -1})
                }else { 
                    throw new Error("Error semantico: el tipo es: "+resultParam.type+"  sin texto, linea:" +this.line + "columna: "+ this.column);
                }

            }else {
                paramas.push(resultParam)
            }
            
        } 
        return paramas;
    }

    GraficarAST(texto: string): string {
        throw new Error("Method not implemented.");
    }


        
}