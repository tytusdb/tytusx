import { ExpresionXQ } from "../../Arbol/ExpresionXQ";
import { EntornoXQ } from "../../Entorno/Entorno";
import { EnumTipo, TipoXQ } from "../../Entorno/TipoXQ";
import { LiteralXQ } from "../../Expresiones/LiteralXQ";

export class NegativoXQ extends ExpresionXQ {
    operacion:string;
    hD: ExpresionXQ;

    constructor(der:ExpresionXQ, l:number, c:number) {
        super();
        this.operacion = '- EXP';
        this.hD = der;
        this.linea = l;
        this.columna = c;
    }

    getValor(ent: EntornoXQ): ExpresionXQ {
        let res:LiteralXQ = new LiteralXQ(new TipoXQ(EnumTipo.error), "@ERROR@", this.linea, this.columna);
        let exD:ExpresionXQ = this.hD.getValor(ent);

        if(exD.tipo.tipo == EnumTipo.entero) {
            res.tipo.tipo = exD.tipo.tipo;
            res.valor = 0 - parseInt(exD.valor.toString());
            return res;
        } else if(exD.tipo.tipo == EnumTipo.doble) {
            res.tipo.tipo = exD.tipo.tipo;
            res.valor = 0.0 - parseFloat(exD.valor.toString());
            return res;
        } else {
            console.log('No se puede aplicar la operacion de negacion aritmetica');
        }

        return res;
    }
    
    copiar(): ExpresionXQ {
        return new NegativoXQ(this.hD, this.linea, this.columna);
    }
}