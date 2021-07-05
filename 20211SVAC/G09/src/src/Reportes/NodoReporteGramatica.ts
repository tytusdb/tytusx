import { throws } from "assert";

export class NodoReporteGramatica{

 

regla_semantica :string ;
produccion :string;


constructor( produccion:string,regla_semantica:string){

    this.produccion=produccion;
    this.regla_semantica=regla_semantica;
    
    
    
}


}