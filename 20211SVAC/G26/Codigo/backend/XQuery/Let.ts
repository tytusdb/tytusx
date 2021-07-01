import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Instruccion } from "../Interfaz/instruccion";
import { InstruccionXQuery } from "../Interfaz/instruccionXQuery";
import { Consulta } from "../XPath/Consulta";


export class Let implements InstruccionXQuery{
    linea: number;
    columna: number;
    consultas: Array<Consulta> | null;
    identifier: string;
    desde: number | undefined;
    hasta: number | undefined;
    listaEnteros: Array<number> | undefined;
    constructor(identifier: string, consultas: Array<Consulta> | null, linea: number, columna: number, desde?:string, hasta?:string, listaEnteros?: Array<number>){
        this.linea = linea;
        this.columna = columna;
        this.consultas = consultas;
        this.listaEnteros = listaEnteros;
        this.identifier = identifier;
        if(desde != undefined && hasta != undefined){
            this.desde = +desde;
            this.hasta = +hasta;
        }
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
            console.log("Wow: ",this.desde+" to ", this.hasta)
            for(let i = this.desde; i <= this.hasta; i++){
                console.log("i: ", i)
                listaSimbolos.push(""+i);
            }
            console.log("what: ", listaSimbolos)
            let newSimb: Simbolo = new Simbolo(Tipo.XQ_VAR, this.identifier, listaSimbolos, this.linea, this.columna);                    
            XQEnt.agregarSimbolo(this.identifier, newSimb);

            console.log("SIMBOLO: ", XQEnt.obtenerSimbolo(this.identifier));
        }
    }
}