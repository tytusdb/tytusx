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
        this.lista_condiciones.forEach(condicion => {
            let res = condicion.ejecutar(ent);
            
            if(res != null) {
                return res;
            }

            if(condicion.ejecutado) {
                return null;
            }
        });

        if(this.bloque_else != null && this.bloque_else != undefined) {
            let res = this.bloque_else.ejecutar(new EntornoXQ(ent));
            
            if(res != null) {
                return res;
            }
        }
        
        return null;
    }
}