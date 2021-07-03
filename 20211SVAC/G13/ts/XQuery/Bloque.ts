import { ExpresionXQ } from "../Arbol/ExpresionXQ";
import { InstruccionXQ } from "../Arbol/InstruccionXQ";
import { NodoXQ } from "../Arbol/NodoXQ";
import { EntornoXQ } from "../Entorno/Entorno";

export class BloqueXQ extends InstruccionXQ {
    listabloque:[NodoXQ];

    constructor() {
        super();
        this.listabloque = [];
    }

    setDatos(lb:[NodoXQ], l:number, c:number) {
        this.listabloque = lb;
        this.linea = l;
        this.columna = c;
    }

    ejecutar(ent: EntornoXQ): Object {
        var ret = null;
        this.listabloque.forEach(nodo => {
            if(nodo instanceof InstruccionXQ) {
                let ins = nodo.ejecutar(ent);
                if(ins != null) {
                    ret = ins;
                }
            } else {
                console.log('Hacer cosas de expresion si es que hay');
                //nodo.getValor(ent);
            }
        });
        return ret;
    }
}