import { Atributo } from "./Atributo";

export class Objeto{
    identificador:string;
    texto:string;
    listaAtributos:Array<Atributo>;
    listaObjetos: Array<Objeto>;
    linea: number;
    columna: number;
    tipo: number;
    padre: Objeto;
    posicion:number;
    constructor(id:string, texto:string, linea:number, columna:number, listaAtributos:Array<Atributo>, listaO:Array<Objeto>,Tipo:number,Padre:Objeto){
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaO;
        this.tipo = Tipo;
        this.padre = Padre;
        this.posicion= -1;
    }
    getId() {
        return this.identificador;
    };
    getConcatenar(text) {
        this.texto = this.texto + " " + text;
    };
    setPosicion(pos) {
        if(this.posicion==-1) this.posicion = pos;    
    };
    getAtributos (){
        return this.listaAtributos;
    }; 
    getTexto (){
        return this.texto;
    }; 

    getObjetos (){
        return this.listaObjetos;
    }; 

}