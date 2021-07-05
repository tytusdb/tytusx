import { ExpresionXQ } from "../../Arbol/ExpresionXQ";
import { EntornoXQ } from "../../Entorno/Entorno";
import { EnumTipo, TipoXQ } from "../../Entorno/TipoXQ";
import { LiteralXQ } from "../../Expresiones/LiteralXQ";

export class NotXQ extends ExpresionXQ {
    operacion:string;
    hD:ExpresionXQ;

    constructor(der:ExpresionXQ, l:number, c:number) {
        super();
        this.operacion = '! | not';
        this.hD = der;
        this.linea = l;
        this.columna = c;
    }
    
    getValor(ent: EntornoXQ): ExpresionXQ {
        let res:LiteralXQ = new LiteralXQ(new TipoXQ(EnumTipo.error), "@ERROR@", this.linea, this.columna);
        let exD:ExpresionXQ = this.hD.getValor(ent);

        if(exD.tipo.tipo == EnumTipo.booleano) {
            res.tipo.tipo = EnumTipo.booleano;

            let tmp = (exD.valor.toString() == 'true');
            res.valor = (!tmp).toString();

            return res;
        } else {
            console.log('Error con la operacion NOT. La expresion no es de tipo booleano');
        }

        return res;
    }

    copiar(): ExpresionXQ {
        return new NotXQ(this.hD.copiar(), this.linea, this.columna);
    }
}