import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Expreciones } from "../Interfaces.ts/Expreciones";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo from "../TablaSimbolos/Tipo";
import { retorno } from "./retorno";

export default class position implements Expreciones{
    lblTrue: string;
    lblFalse: string;
    getvalor3d(controlador: Controlador, ts: TablaSimbolos) {
        return new retorno(controlador.position+"",false,new Tipo("DOBLE"));
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        return controlador.position;
    }
    recorrer(): Nodo {
        let padre = new Nodo("position();","");
        return padre;
    }
    limpiar() {
        
     }

}