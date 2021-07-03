import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces.ts/Instruccion";
import Simbolos from "../TablaSimbolos/Simbolos";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../TablaSimbolos/Tipo";
import  Atributo from "./atributo";

export default class Objeto implements Instruccion{
    public identificador:string;
    public texto:string;
    public listaAtributos:Array<Atributo>;
    public listaObjetos: Array<Objeto>;
    public linea: number;
    public columna: number;
    public  tipoetiqueta:number;

    constructor(id:string, texto:string, linea:number, columna:number, listaAtributos:Array<Atributo>, listaO:Array<Objeto>,tipoetiqueta:number){
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaO
        this.tipoetiqueta=tipoetiqueta;
    }
    
    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let ts_local = new TablaSimbolos(ts,this.identificador);
        for(let at of this.listaAtributos ){
            let tipo=new Tipo("IDENTIFICADOR");
            let sim=new Simbolos(2,tipo,at.identificador,at.valor);
            ts_local.agregar(at.identificador,sim);
        }
        for(let at of this.listaObjetos ){
            let tipo=new Tipo("OBJETO");
            const regex = /^[0-9]+("."[0-9]+)?$/;
            let sim: Simbolos;
            if(isNaN(Number(at.texto))){
                console.log("no numero:"+at.texto);
                sim=new Simbolos(1,tipo,at.identificador,at.texto,at);
            }else{
                console.log("numero: "+at.texto)
                sim=new Simbolos(1,tipo,at.identificador,Number(at.texto),at);
            }
            ts_local.agregar(at.identificador,sim);
            ts_local.agregarSiguiente(at.identificador,at.ejecutar(controlador,ts_local));
        } 
        return ts_local;
    }


    gethtml(tab:string){
        let xml=tab+"<"+this.identificador;
        for(let at of this.listaAtributos ){
            xml+=" "+at.identificador+"=\""+at.valor+"\" ";
        }
        if(this.tipoetiqueta==1){
            xml+= "/>";
        }else{
            if(this.texto.length>0){
                xml+=">"+this.texto+"<"+this.identificador+"/>";
            }else{
                tab=tab+"   ";
                xml+=">";
                for(let at of this.listaObjetos ){
                    xml+="\n";
                    xml+=at.gethtml(tab);
                } 
                xml+=tab+"\n<"+this.identificador+"/>";
            }
        }
        return xml;
    }


    recorrer(): Nodo {
        let padre=new Nodo("objeto","");

        let hijo=new Nodo(this.identificador,"");
        if(this.texto.length>0){
            hijo.AddHijo(new Nodo(this.texto,""));
        }
        for(let at of this.listaAtributos ){
            hijo.AddHijo(new Nodo(at.identificador,""));
        }
        for(let at of this.listaObjetos ){
            hijo.AddHijo(at.recorrer());
        }
        padre.AddHijo(hijo);
        return padre;
    }
}