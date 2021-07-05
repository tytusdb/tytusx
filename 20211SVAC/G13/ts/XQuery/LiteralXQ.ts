import { ExpresionXQ } from "../Arbol/ExpresionXQ";
import { EntornoXQ } from "../Entorno/Entorno";
import { EnumTipo, TipoXQ } from "../Entorno/TipoXQ";

export class LiteralXQ extends ExpresionXQ {
    constructor(t:TipoXQ, v:any, l:number, c:number) {
        super();
        this.tipo = t;
        this.valor = v;
        this.linea = l;
        this.columna = c;
    }

    getValor(ent: EntornoXQ):ExpresionXQ {
        if(this.tipo.tipo == EnumTipo.XPath) {
            if(Array.isArray(this.valor)) {
                //Ya operado
                return new LiteralXQ(this.tipo, this.valor, this.linea, this.columna);    
            } else {
                //Operar
                let xmlG = ent.buscar("#XML#", this.linea, this.columna, 'El objeto XML');
                var retXP = this.valor.Ejecutar(xmlG.valor);
                return new LiteralXQ(this.tipo, retXP, this.linea, this.columna);
            }
        } else {
            return new LiteralXQ(this.tipo, this.valor, this.linea, this.columna);
        }
    }

    copiar():ExpresionXQ {
        return new LiteralXQ(this.tipo, this.valor, this.linea, this.columna);
    }
}