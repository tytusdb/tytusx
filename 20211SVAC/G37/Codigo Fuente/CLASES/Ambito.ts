import { Simbolo } from "./Simbolo";
import { Tipo } from "./Tipo";

/* El ambito internamente almacenara una tabla de simbolos 
    La tabla de simbolos podra contener cualquier tipo especificado en 'Tipo.ts'
*/
export class Ambito { 

    private ambito_anterior: Ambito;
    tablaSimbolos:{ [id:string] : Simbolo }; // Tabla hash, que representa la tabla de simbolos interna del ambito

    constructor(ambito_anterior:any){
        this.ambito_anterior = ambito_anterior;
        this.tablaSimbolos = {};
    }

    agregar(id:string,simbolo:Simbolo):void { // Agregar un nuevo simbolo al ambito 
        this.tablaSimbolos[id] = simbolo; // insercion a la tabla hash.
    }
    
    
}