import { Entorno } from "../AST/Entorno";
import { Expresion } from "../Interfaz/expresion";
import { InstruccionXQuery } from "../Interfaz/instruccionXQuery";
import { Nodo } from "../XPath/Nodo";
import { CondicionIf } from "./CondicionIf";


export class IfThenElse implements InstruccionXQuery{
    linea: number;
    columna: number
    identificador: string;
    condicion: Expresion;
    condicionThen: CondicionIf
    condicionElse: CondicionIf
    fromRoot: boolean;
    constructor(identificador: string, condicion: Expresion, respThen: CondicionIf, respElse: CondicionIf, fromRoot: boolean, linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador
        this.condicion = condicion;
        this.condicionElse = respElse;
        this.condicionThen = respThen
        this.fromRoot = fromRoot;
    }

    isFromRoot(): boolean {
        return this.fromRoot;
    }

    ejecutar(XQEnt: Entorno, xmlEnt: Entorno){
        let nuevaLista: Array<any> = [];
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
                        //Aplicarle la respuesta del ELSE
                        if(!this.condicionElse.isVacio()){
                            nuevaLista = nuevaLista.concat(this.condicionElse.obtenerResponse(s));
                        }
                    }
                }else{
                    //Aplicarle la respuesta del ELSE
                    if(!this.condicionElse.isVacio()){
                        nuevaLista = nuevaLista.concat(this.condicionElse.obtenerResponse(s));
                    }
                }
            })
        }
        console.log("The nueva lista is: ", nuevaLista);
        return nuevaLista;
    }
}