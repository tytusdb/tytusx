import { Entorno } from "../AST/Entorno";
import { Expresion } from "../Interfaz/expresion";
import { Instruccion } from "../Interfaz/instruccion";
import { InstruccionXQuery } from "../Interfaz/instruccionXQuery";
import { Consulta } from "../XPath/Consulta";
import { Nodo } from "../XPath/Nodo";
import { FuncionXQuery } from "./FuncionXQuery";
import { Html } from "./Html";

export class CondicionIf{
    linea: number;
    columna: number;
    etiqueta: Html | undefined;
    identificador: string | undefined;
    listaNodos: Array<Nodo> | undefined;
    funcionXQ: FuncionXQuery | undefined;
    vacio: boolean;
    llamadaFuncion: any;
    constructor(identificador: string | undefined, listaNodos: Array<Nodo> | undefined, etiqueta: Html | undefined, funcionXQ: FuncionXQuery | undefined, vacio: boolean, linea: number, columna: number, llamadaFuncion?: any){
        this.etiqueta = etiqueta;
        this.identificador = identificador;
        this.listaNodos = listaNodos;
        this.funcionXQ = funcionXQ;
        this.linea = linea;
        this.columna = columna;
        this.vacio = vacio;
        this.llamadaFuncion = llamadaFuncion;
    }
    isVacio(){
        return this.vacio
    }
    obtenerResponse(simbolo: any): Array<any>{
        if(this.identificador != undefined && this.listaNodos != undefined){
            //Es del tipo: $x/algo/otro
            //1. Sobre el simbolo recibido, obtener la consulta
            let tempC: Consulta = new Consulta(this.listaNodos, this.linea, this.columna)
            let resp: Array<any> = []
            return resp.concat(tempC.ejecutar(simbolo.valor));
        }else if(this.funcionXQ != undefined){
            //Es del tipo: data($id/algo)
            let resp: Array<any> = []
            resp = resp.concat(this.funcionXQ.getSobreEntornoXML(simbolo.valor));
            //resp.concat(simbolo);
            return resp;
        }else if(this.llamadaFuncion != undefined){

        }
        return [];
    }
}