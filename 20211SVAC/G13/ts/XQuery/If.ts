import { InstruccionXQ } from "../Arbol/InstruccionXQ";
import { EntornoXQ } from "../Entorno/Entorno";
import { BloqueXQ } from "./Bloque";
import { Condicion_If } from "./Condicion_If";

export class If extends InstruccionXQ {
    lista_condiciones:[Condicion_If];
    bloque_else:BloqueXQ;

    constructor(lc:[Condicion_If], b:BloqueXQ, l:number, c:number) {
        super();
        this.lista_condiciones = lc;
        this.bloque_else = b;
        this.linea = l;
        this.columna = c;
    }
    
    ejecutar(ent: EntornoXQ): Object {
        let retn = 'nulo';
        for (const condicion of this.lista_condiciones) {
            var res = condicion.ejecutar(ent);
            if (res != null) {
                retn = res;
                break;
            }
            if (retn == 'nulo') {
                if (condicion.ejecutado) {
                    retn = null;
                    break;
                }
            }   
        }
        if(retn == 'nulo') {
            if(this.bloque_else != null && this.bloque_else != undefined) {
                let res = this.bloque_else.ejecutar(new EntornoXQ(ent));     
                if(res != null) {
                    retn = res;
                } else {
                    retn = null;
                }
            } else {
                retn = null;
            }
        }
        return retn;
    }
}