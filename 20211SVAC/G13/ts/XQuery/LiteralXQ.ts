import { ExpresionXQ } from "../Arbol/ExpresionXQ";
import { TipoXQ } from "../Entorno/TipoXQ";

export class LiteralXQ extends ExpresionXQ {
    constructor(t:TipoXQ, v:any, l:number, c:number) {
        super();
        this.tipo = t;
        this.valor = v;
        this.linea = l;
        this.columna = c;
    }

    getValor():ExpresionXQ {
        return new LiteralXQ(this.tipo, this.valor, this.linea, this.columna);
    }

    copiar():ExpresionXQ {
        return new LiteralXQ(this.tipo, this.valor, this.linea, this.columna);
    }
}