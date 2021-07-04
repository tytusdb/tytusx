import { ExpresionXQ } from "../../Arbol/ExpresionXQ";
import { EntornoXQ } from "../../Entorno/Entorno";
import { EnumTipo, TipoXQ } from "../../Entorno/TipoXQ";
import { LiteralXQ } from "../../Expresiones/LiteralXQ";

export class OrXQ extends ExpresionXQ {
    operacion:string;
    hI:ExpresionXQ;
    hD:ExpresionXQ;

    constructor(izq:ExpresionXQ, der:ExpresionXQ, l:number, c:number) {
        super();
        this.operacion = 'or';
        this.hI = izq;
        this.hD = der;
        this.linea = l;
        this.columna = c;
    }
    
    getValor(ent: EntornoXQ): ExpresionXQ {
        let res:LiteralXQ = new LiteralXQ(new TipoXQ(EnumTipo.error), "@ERROR@", this.linea, this.columna);
        let exI:ExpresionXQ = this.hI.getValor(ent);
        let exD:ExpresionXQ = this.hD.getValor(ent);

        if(exI.tipo.tipo == EnumTipo.booleano) {
            if((exI.valor.toString()) == 'true') {
                //Automaticamente devolver true
                res.tipo.tipo = EnumTipo.booleano;
                res.valor = (true).toString();
            } else if(exD.tipo.tipo == EnumTipo.booleano) {
                //Evaluar la operacion
                res.tipo.tipo = EnumTipo.booleano;
                res.valor = (exI.valor.toString() == 'true') || (exD.valor.toString() == 'true');
            } else {
                console.log('Error con la operacion OR. HD no es de tipo booleano');
            }
        } else {
            console.log('Error con la operacion OR. HI no es de tipo booleano');
        }

        return res;
    }

    copiar(): ExpresionXQ {
        return new OrXQ(this.hI.copiar(), this.hD.copiar(), this.linea, this.columna);
    }
}