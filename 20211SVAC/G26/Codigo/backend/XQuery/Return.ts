import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Instruccion } from "../Interfaz/instruccion";
import { InstruccionXQuery } from "../Interfaz/instruccionXQuery";
import { Consulta } from "../XPath/Consulta";
import { Nodo } from "../XPath/Nodo";
import { FuncionXQuery } from "./FuncionXQuery";
import { Html } from "./Html";
import { IfThenElse } from "./IfThenElse";

export class Return implements InstruccionXQuery{
    linea: number;
    columna: number;
    identificador: string | undefined;
    listaNodos: Array<Nodo> | undefined;
    html: Html | undefined;
    ifthen: IfThenElse | undefined;
    funcion: FuncionXQuery | undefined
    tipo: TipoReturn;
    constructor(tipoRet: TipoReturn, identificador: string | undefined, listaNodos: Array<Nodo> | undefined, html: Html | undefined, ifthen: IfThenElse | undefined,  funcion: FuncionXQuery | undefined, linea: number, columna: number){
        this.tipo = tipoRet;
        this.funcion = funcion;
        this.html = html;
        this.listaNodos = listaNodos;
        this.identificador = identificador;
        this.linea = linea;
        this.columna = columna;
        this.ifthen = ifthen;
    }

    ejecutar(XQEnt:Entorno, xmlEnt: Entorno){
        //Ej: return $x/book
        //1. Buscar variable $id
        let pruebaReturn = "";
        let listaReturn: Array<any> = [];
        if(this.tipo === TipoReturn.NORMAL && this.identificador != undefined){
            console.log("Return normal.")
            let ListaSimb = XQEnt.obtenerSimbolo(this.identificador);
            if(ListaSimb != null){
                console.log("LISTAISMB:", ListaSimb)
                if(this.listaNodos != undefined && this.listaNodos.length > 0){
                    let temp: Consulta = new Consulta(this.listaNodos, this.linea, this.columna);                    
                    ListaSimb.valor.forEach((simb: any) =>{
                        let auxEntorno = simb.valor;
                        listaReturn = listaReturn.concat((temp.ejecutar(auxEntorno)));
                    })
                    pruebaReturn += temp.simbolosToString(listaReturn);
                }else{
                    let temp: Consulta = new Consulta([], this.linea, this.columna);
                    pruebaReturn += temp.simbolosToString(ListaSimb.valor);
                }
                
            }else{
                console.log("ERROR - El simbolo: $", this.identificador, " no existe.")
            }
        }else if(this.tipo === TipoReturn.FUNCIONXQUERY && this.funcion != undefined){
            let temp: Consulta = new Consulta([], this.linea, this.columna);
            pruebaReturn += temp.simbolosToString(this.funcion.getValor(XQEnt).valor)
        }else if(this.tipo === TipoReturn.IFTHENELSE && this.ifthen != undefined){
            let nue = this.ifthen.ejecutar(XQEnt, xmlEnt)
            let temp: Consulta = new Consulta([], this.linea, this.columna);
            pruebaReturn += temp.simbolosToString(nue)
        }
        return pruebaReturn;
    }


}



export enum TipoReturn{
    NORMAL,
    HTML,
    IFTHENELSE,
    FUNCIONXQUERY
}