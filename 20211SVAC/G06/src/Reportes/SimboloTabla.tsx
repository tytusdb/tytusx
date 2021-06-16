import {Entorno} from "../xmlAST/Entorno";
import { Simbolo } from "../xmlAST/Simbolo";

export class SimboloTabla{
    linea:number;
    columna:number;
    nombre:string;
    tipo:string;
    ambito:string;
    valor:string;


    constructor(linea:number,columna:number,nombre:string,tipo:string,ambito:string,valor:string){
        this.linea=linea;
        this.columna=columna;
        this.nombre=nombre;
        this.tipo=tipo;
        this.ambito=ambito;
        this.valor=valor;
    }
}

var re = /\"/gi;
var re2 = /</gi;
var re3 = />/gi;
var newstr = "";

export function crearTablaSimbolos(raiz:Entorno,resultado:Array<SimboloTabla>,entorno:string){
    newstr = raiz.texto.replace(re, " COMILLAS ");
    newstr = newstr.replace(re2," MENOR ");
    newstr = newstr.replace(re3," MAYOR ");
    resultado.push(new SimboloTabla(raiz.linea,raiz.columna,raiz.identificador,"Entorno",entorno,newstr));
    for (const key in raiz.listaSimbolos) {
        newstr = raiz.listaSimbolos[key].valor.replace(re, " COMILLAS ");
        newstr = newstr.replace(re2," MENOR ");
        newstr = newstr.replace(re3," MAYOR ");
        resultado.push(new SimboloTabla(raiz.listaSimbolos[key].linea,raiz.listaSimbolos[key].columna,raiz.listaSimbolos[key].identificador,"Atributo",raiz.identificador,newstr));
    }
    for (const key in raiz.listaEntornos) {
        resultado = crearTablaSimbolos(raiz.listaEntornos[key],resultado,raiz.identificador);
    }
    return resultado;   
}

export function crearTextoGraphvizTablaSimbolos(lista:Array<SimboloTabla>,texto:string) {
    texto += "node0[shape=record label=\"{Numero";
    for (const key in lista) {
        texto += "|" + key;
    }
    texto += "}|{Linea";
    for (const key in lista) {
        texto += "|" + lista[key].linea;
    }
    texto += "}|{Columna";
    for (const key in lista) {
        texto += "|" + lista[key].columna;
    }
    texto += "}|{Nombre";
    for (const key in lista) {
        texto += "|" + lista[key].nombre;
    }
    texto += "}|{Tipo";
    for (const key in lista) {
        texto += "|" + lista[key].tipo;
    }
    texto += "}|{Ambito";
    for (const key in lista) {
        texto += "|" + lista[key].ambito;
    }
    texto += "}|{Valor";
    for (const key in lista) {
        texto += "|" + lista[key].valor;
    }
    texto += "}\"];";
    return texto;
}