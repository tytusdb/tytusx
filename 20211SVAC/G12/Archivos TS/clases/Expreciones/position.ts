import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Expreciones } from "../Interfaces.ts/Expreciones";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";

export default class position implements Expreciones{

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

}