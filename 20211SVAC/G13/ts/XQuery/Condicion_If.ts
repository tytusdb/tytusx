import { ExpresionXQ } from "../Arbol/ExpresionXQ";
import { InstruccionXQ } from "../Arbol/InstruccionXQ";
import { EntornoXQ } from "../Entorno/Entorno";
import { EnumTipo } from "../Entorno/TipoXQ";
import { BloqueXQ } from "./Bloque";

export class Condicion_If extends InstruccionXQ {
    condicion:ExpresionXQ;
    bloque_ins:BloqueXQ;
    ejecutado:boolean;
    
    constructor(con:ExpresionXQ, b:BloqueXQ, l:number, c:number) {
        super();
        this.ejecutado = false;
        this.condicion = con;
        this.bloque_ins = b;
        this.linea = l;
        this.columna = c;
    }

    ejecutar(ent: EntornoXQ): Object {
        this.ejecutado = false;
        let ex:ExpresionXQ = this.condicion.getValor(ent);

        if(ex.tipo.tipo == EnumTipo.booleano) {
            let res:boolean = (ex.valor.toString() == 'true');
            if(res == true) {
                //console.log('Es TRUE');
                let ret:any = this.bloque_ins.ejecutar(new EntornoXQ(ent));
                this.ejecutado = true;
                if(ret != null) {
                    return ret;
                }
            } else {
                //console.log('Es FALSEs');
            }
        } else {
            // Error condicion del if no es booleano
            console.log('Condicion del if no es booleano');
        }

        return null;
    }
}