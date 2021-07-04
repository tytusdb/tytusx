import { NodoReporte } from "./NodoReporte";

export class ReporteGA{
   
    public static r_gramatica:Array<NodoReporte>=new Array<NodoReporte>();

    constructor(){
        ReporteGA.r_gramatica=new Array<NodoReporte>();
    }

    public static agregar(b:string,p:string,g:string){
        let nuevo:NodoReporte = new NodoReporte(b,p,g);
        ReporteGA.r_gramatica.unshift(nuevo);
    }

    public static recorrer(){
        for(let i=0; i<ReporteGA.r_gramatica.length; i++){
            console.log(ReporteGA.r_gramatica[i].getbnf());
        }
    }
}