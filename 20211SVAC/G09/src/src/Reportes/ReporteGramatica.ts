import { NodoReporteGramatica } from "./NodoReporteGramatica"
export class ReporteGramatica{
Nodo:NodoReporteGramatica

 static Lista:any=[]



constructor(  produccion:string,regla_semantica:string){

  ReporteGramatica.Lista.push(new NodoReporteGramatica(produccion,regla_semantica));

    
    
    
}




}