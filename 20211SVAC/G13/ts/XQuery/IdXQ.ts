import { ExpresionXQ } from "../Arbol/ExpresionXQ";
import { EntornoXQ } from "../Entorno/Entorno";
import { SimboloXQ } from "../Entorno/SimboloXQ";
import { LiteralXQ } from "./LiteralXQ";
import { TipoXQ, EnumTipo } from "../Entorno/TipoXQ"

export class IdXQ extends ExpresionXQ {
    id:string;

    constructor(id:string, l:number, c:number) {
        super();
        this.id = id;
        this.linea = l;
        this.columna = c;
    }

    getValor(ent: EntornoXQ): ExpresionXQ {
        let sim:SimboloXQ = ent.buscar(this.id, this.linea, this.columna, 'La Variable');
        
        if(sim != null || sim != undefined) {
            let ret:LiteralXQ = new LiteralXQ(sim.tipo, sim.valor, this.linea, this.columna);
            return ret;
        }

        return new LiteralXQ(new TipoXQ(EnumTipo.error), "@Error@", this.linea, this.columna);
    }

    copiar(): ExpresionXQ {
        return new IdXQ(this.id, this.linea, this.columna);
    }
}