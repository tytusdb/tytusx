import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Expreciones } from "../Interfaces.ts/Expreciones";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo,{ tipo } from "../TablaSimbolos/Tipo";
import { retorno } from "./retorno";


export default class last implements Expreciones {
    lblTrue: string;
    lblFalse: string;
    constructor(){

    }
    getvalor3d(controlador: Controlador, ts: TablaSimbolos) {
        let cont=0;
        for( let informacion of ts.tabla){
            if(informacion.identificador==controlador.idlast){
                cont++;
           }
       }
       return new retorno(cont+"",false,new Tipo("DOBLE"));
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
    limpiar() {
       
     }

}