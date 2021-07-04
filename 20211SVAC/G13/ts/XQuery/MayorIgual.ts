import { ExpresionXQ } from "../../Arbol/ExpresionXQ";
import { EntornoXQ } from "../../Entorno/Entorno";
import { EnumTipo, TipoXQ } from "../../Entorno/TipoXQ";
import { LiteralXQ } from "../../Expresiones/LiteralXQ";

export class MayorIgualXQ extends ExpresionXQ {
    operacion:string;
    hI:ExpresionXQ;
    hD:ExpresionXQ;

    constructor(izq:ExpresionXQ, der:ExpresionXQ, l:number, c:number) {
        super();
        this.operacion = '>= | ge';
        this.hI = izq;
        this.hD = der;
        this.linea = l;
        this.columna = c;
    }
    
    getValor(ent: EntornoXQ): ExpresionXQ {
        let res:LiteralXQ = new LiteralXQ(new TipoXQ(EnumTipo.error), "@ERROR@", this.linea, this.columna);
        let exI:ExpresionXQ = this.hI.getValor(ent);
        let exD:ExpresionXQ = this.hD.getValor(ent);

        switch(exI.tipo.tipo) {
            case EnumTipo.entero:
                switch (exD.tipo.tipo) {
                    case EnumTipo.entero:
                        res.tipo.tipo = EnumTipo.booleano;
                        res.valor = parseInt(exI.valor.toString()) >= parseInt(exD.valor.toString());
                        return res;
                    case EnumTipo.doble:
                        res.tipo.tipo = EnumTipo.booleano;
                        res.valor = parseInt(exI.valor.toString()) >= parseFloat(exD.valor.toString());
                        return res;
                    default:
                        console.log('Error con la operacion MayorIgualQue de HI: Entero')
                        break;
                }
                break;
            case EnumTipo.doble:
                switch (exD.tipo.tipo) {
                    case EnumTipo.entero:
                        res.tipo.tipo = EnumTipo.booleano;
                        res.valor = parseFloat(exI.valor.toString()) >= parseInt(exD.valor.toString());
                        return res;
                    case EnumTipo.doble:
                        res.tipo.tipo = EnumTipo.booleano;
                        res.valor = parseFloat(exI.valor.toString()) >= parseFloat(exD.valor.toString());
                        return res;
                    default:
                        console.log('Error con la operacion MayorIgualQue de HI: Doble')
                        break;
                }
                break;
            default:
                console.log('No se puede operar MayorIgualQue HI >=GE HD');
                break;
        }
        return res;
    }

    copiar(): ExpresionXQ {
        return new MayorIgualXQ(this.hI.copiar(), this.hD.copiar(), this.linea, this.columna);
    }
}