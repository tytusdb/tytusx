import { ExpresionXQ } from "../../Arbol/ExpresionXQ";
import { EntornoXQ } from "../../Entorno/Entorno";
import { EnumTipo, TipoXQ } from "../../Entorno/TipoXQ";
import { LiteralXQ } from "../../Expresiones/LiteralXQ";

export class lowerCaseXQ extends ExpresionXQ {
    operacion:string;
    hD:ExpresionXQ;

    constructor(der:ExpresionXQ, l:number, c:number) {
        super();
        this.operacion = 'lowerCase()';
        this.hD = der;
        this.linea = l;
        this.columna = c;
    }

    getValor(ent: EntornoXQ): ExpresionXQ {
        let res:LiteralXQ = new LiteralXQ(new TipoXQ(EnumTipo.error), "@ERROR@", this.linea, this.columna);
        let exD:ExpresionXQ = this.hD.getValor(ent);

        if(exD.tipo.tipo == EnumTipo.cadena) {
            res.tipo.tipo = EnumTipo.cadena;
            res.valor = exD.valor.toString().toLowerCase();
            return res;
        } else {
            console.log('(lower-case) El argumento proporcionado no es de tipo cadena');
        }
        return res;
    }

    copiar(): ExpresionXQ {
        return new lowerCaseXQ(this.hD, this.linea, this.columna);
    }
}