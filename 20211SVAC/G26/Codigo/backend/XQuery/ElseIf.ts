import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Expresion } from "../Interfaz/expresion";
import { CondicionIf } from "./CondicionIf";


export class ElseIf{

    identifier: string | undefined;
    condicion: Expresion;
    respThen: CondicionIf;
    fila: number;
    columna: number;
    constructor(identifier:string | undefined, condicion: Expresion, respThen: CondicionIf, fila: number, columna: number){
        this.identifier = identifier;
        this.condicion = condicion;
        this.respThen = respThen;
        this.fila = fila;
        this.columna = columna;
    }

    condicionCumple(entorno: Entorno): boolean{
        if(this.identifier != undefined){
            console.log("Prueba :", entorno.obtenerSimbolo(this.identifier));
        }
        let respuesta = this.condicion.getValor(entorno);
        if(respuesta != null && respuesta != undefined){
            if(respuesta.tsimbolos !== undefined && respuesta.tsimbolos.length > 0){
                return true;
            }else if(respuesta.tsimbolos === undefined && respuesta){
                return true;
            }else{
                return false;
            }
        }
        return false;
    }

    obtenerResponse(s: Simbolo): Array<any>{
        if(!this.respThen.isVacio()){
            return this.respThen.obtenerResponse(s);
        }
        return [];
    }


}