import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Expreciones } from "../Interfaces.ts/Expreciones";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";


export default class last implements Expreciones {

    
    constructor(){

    }

    getTipo(controlador: Controlador, ts: TablaSimbolos) {
        
    }
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        let cont=0;
        for( let informacion of ts.tabla){
            if(informacion.identificador==controlador.idlast){
                cont++;
           }
       }
       return cont;
    }
    recorrer(): Nodo {
        let padre = new Nodo("LAST();","");
       return padre;
    }

}