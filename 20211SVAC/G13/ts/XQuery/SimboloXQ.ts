import { EntornoXQ } from "./Entorno";
import { ExpresionXQ } from "../Arbol/ExpresionXQ";
import { LiteralXQ } from "../Expresiones/LiteralXQ";
import { TipoXQ } from "./TipoXQ";

export class SimboloXQ extends ExpresionXQ{
    constructor(t:TipoXQ, v:any) {
        super();
        this.tipo = t;
        this.valor = v;
    }

    getValor(ent: EntornoXQ): ExpresionXQ {
        return new LiteralXQ(this.tipo, this.valor, this.linea, this.columna);
    }

    copiar() {
        return new SimboloXQ(this.tipo, this.valor);
    }
}