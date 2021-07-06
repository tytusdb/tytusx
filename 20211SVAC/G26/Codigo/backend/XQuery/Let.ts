import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaz/expresion";
import { Instruccion } from "../Interfaz/instruccion";
import { InstruccionXQuery } from "../Interfaz/instruccionXQuery";
import { TranslateXPath } from "../Traduccion/TranslateXPath";
import { TranslateXQuery } from "../Traduccion/TranslateXQuery";
import { Consulta } from "../XPath/Consulta";


export class Let implements InstruccionXQuery{
    linea: number;
    columna: number;
    consultas: Array<Consulta> | null;
    identifier: string;
    desde: number | undefined;
    hasta: number | undefined;
    listaEnteros: Array<number> | undefined;
    expresion: Expresion | undefined;
    constructor(identifier: string, consultas: Array<Consulta> | null, linea: number, columna: number, desde?:string, hasta?:string, listaEnteros?: Array<number>, expresion?: Expresion){
        this.linea = linea;
        this.columna = columna;
        this.consultas = consultas;
        this.listaEnteros = listaEnteros;
        this.identifier = identifier;
        this.expresion = expresion;
        if(desde != undefined && hasta != undefined){
            this.desde = +desde;
            this.hasta = +hasta;
        }
    }

    getCodigo3Dir(XQueryEnt: Entorno, xmlEnt: Entorno, traductorXPath: TranslateXPath, traductorXQuery: TranslateXQuery){
        let code = "";
        return code;
    }    

    ejecutar(XQEnt: Entorno, xmlEnt: Entorno){
        let listaSimbolos: Array<any> = [];        
        if(this.consultas != undefined){
            this.consultas.forEach((consulta: Consulta) => {
                listaSimbolos.push(consulta.ejecutar(xmlEnt));
            });
            let newSimb = new Simbolo(Tipo.XQ_VAR, this.identifier, listaSimbolos, this.linea, this.columna);
            XQEnt.agregarSimbolo(this.identifier, newSimb);   
        }else if(this.listaEnteros != undefined){
            let newSimb: Simbolo = new Simbolo(Tipo.XQ_VAR, this.identifier, this.listaEnteros, this.linea, this.columna);                    
            XQEnt.agregarSimbolo(this.identifier, newSimb);             
        }else if(this.desde != undefined && this.hasta != undefined){
            for(let i = this.desde; i <= this.hasta; i++){
                console.log("i: ", i)
                listaSimbolos.push(""+i);
            }
            let newSimb: Simbolo = new Simbolo(Tipo.XQ_VAR, this.identifier, listaSimbolos, this.linea, this.columna);                    
            XQEnt.agregarSimbolo(this.identifier, newSimb);

            console.log("SIMBOLO: ", XQEnt.obtenerSimbolo(this.identifier));
        }
    }
}