import { Entorno } from "../AST/Entorno";
import { Expresion } from "../Interfaz/expresion";
import { InstruccionXQuery } from "../Interfaz/instruccionXQuery";
import { TranslateXPath } from "../Traduccion/TranslateXPath";
import { TranslateXQuery } from "../Traduccion/TranslateXQuery";
import { Nodo } from "../XPath/Nodo";
import { CondicionIf } from "./CondicionIf";
import { ElseIf } from "./ElseIf";


export class IfThenElse implements InstruccionXQuery{
    linea: number;
    columna: number
    identificador: string | undefined;
    condicion: Expresion;
    condicionThen: CondicionIf
    condicionElse: CondicionIf
    fromRoot: boolean;
    listaElseIf: Array<ElseIf>;
    constructor(identificador: string | undefined, condicion: Expresion, respThen: CondicionIf, listaElseIf: Array<ElseIf>, respElse: CondicionIf, fromRoot: boolean, linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador
        this.condicion = condicion;
        this.condicionElse = respElse;
        this.condicionThen = respThen
        this.listaElseIf = listaElseIf;
        this.fromRoot = fromRoot;
    }

    isFromRoot(): boolean {
        return this.fromRoot;
    }
    getCodigo3Dir(XQueryEnt: Entorno, xmlEnt: Entorno, traductorXPath: TranslateXPath, traductorXQuery: TranslateXQuery){
        let code = "";
        return code;
    }    

    ejecutar(XQEnt: Entorno, xmlEnt: Entorno){
        let nuevaLista: Array<any> = [];
        if(this.identificador){
            //1. Obtener simbolo
            let ls = XQEnt.obtenerSimbolo(this.identificador);
            //2. Ver si es fromRoot / o no //
            if(this.isFromRoot()){
                //Es /, buscar la expresion solo sobre este entorno
                ls.valor.forEach((s: any) =>{
                    let et = s.valor;
                    let respuesta = this.condicion.getValor(et);
                    if(respuesta != null && respuesta != undefined){
                        //Aplicarle la response del THEN
                        if(respuesta.tsimbolos !== undefined && respuesta.tsimbolos.length > 0){
                            if(!this.condicionThen.isVacio()){
                                nuevaLista = nuevaLista.concat(this.condicionThen.obtenerResponse(s));
                            }
                        }else if(respuesta.tsimbolos === undefined && respuesta){
                            if(!this.condicionThen.isVacio()){
                                nuevaLista = nuevaLista.concat(this.condicionThen.obtenerResponse(s));
                            }
                        }else{
                            //Ver si aplicar la respuesta de algun ELSE IF o ELSE
                            let aplicado = false;
                            for(let x = 0; x < this.listaElseIf.length; x++){
                                //Para cada else if valuar para ver si aplica uno.
                                let unElseIf  = this.listaElseIf[x];
                                if(unElseIf.condicionCumple(et)){
                                    //Si cumple, aplicar la respuesta de este else if y break.
                                    aplicado = true;
                                    nuevaLista = nuevaLista.concat(unElseIf.obtenerResponse(s));
                                    break;
                                }
                            }
                            if(!aplicado && !this.condicionElse.isVacio()){
                                nuevaLista = nuevaLista.concat(this.condicionElse.obtenerResponse(s));
                            }
                        }
                    }else{
                            //Ver si aplicar la respuesta de algun ELSE IF o ELSE
                            let aplicado = false;
                            for(let x = 0; x < this.listaElseIf.length; x++){
                                //Para cada else if valuar para ver si aplica uno.
                                let unElseIf  = this.listaElseIf[x];
                                if(unElseIf.condicionCumple(et)){
                                    //Si cumple, aplicar la respuesta de este else if y break.
                                    aplicado = true;
                                    nuevaLista = nuevaLista.concat(unElseIf.obtenerResponse(s));
                                    break;
                                }
                            }
                            if(!aplicado && !this.condicionElse.isVacio()){
                                nuevaLista = nuevaLista.concat(this.condicionElse.obtenerResponse(s));
                            }
                    }
                })
            }else{
                //Viene expresion ej: if($id > 40)
                //1. Evaluar las expresiones de cada cosa
            }
        }
        return nuevaLista;
    }
}