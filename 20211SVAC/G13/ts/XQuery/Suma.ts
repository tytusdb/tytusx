import { ExpresionXQ } from "../../Arbol/ExpresionXQ";
import { EntornoXQ } from "../../Entorno/Entorno";
import { EnumTipo, TipoXQ } from "../../Entorno/TipoXQ";
import { LiteralXQ } from "../../Expresiones/LiteralXQ";

export class SumaXQ extends ExpresionXQ {
    operacion:string;
    hI: ExpresionXQ;
    hD: ExpresionXQ;

    constructor(izq:ExpresionXQ, der:ExpresionXQ, l:number, c:number) {
        super();
        this.operacion = '+';
        this.hI = izq;
        this.hD = der;
        this.linea = l;
        this.columna = c;
    }

    getValor(ent: EntornoXQ):ExpresionXQ {
        let res:LiteralXQ = new LiteralXQ(new TipoXQ(EnumTipo.error), "@ERROR@", this.linea, this.columna);
        let exI:ExpresionXQ = this.hI.getValor(ent);
        let exD:ExpresionXQ = this.hD.getValor(ent);

        switch (exI.tipo.tipo) {
            case EnumTipo.entero:
                switch(exD.tipo.tipo) {
                    case EnumTipo.entero:
                        res.tipo.tipo = EnumTipo.entero;
                        res.valor = parseInt(exI.valor.toString()) + parseInt(exD.valor.toString());
                        return res;
                    case EnumTipo.doble:
                        res.tipo.tipo = EnumTipo.doble;
                        res.valor = parseFloat(exI.valor.toString()) + parseFloat(exD.valor.toString());
                        return res;
                    case EnumTipo.cadena:
                        res.tipo.tipo = EnumTipo.cadena;
                        res.valor = exI.valor.toString() + exD.valor.toString();
                        return res;
                    default:
                        console.log('Error en la suma de HI: Entero');
                        return res;
                }
            case EnumTipo.doble:
                switch(exD.tipo.tipo) {
                    case EnumTipo.entero:
                        res.tipo.tipo = EnumTipo.doble;
                        res.valor = parseFloat(exI.valor.toString()) + parseFloat(exD.valor.toString());
                        return res;
                    case EnumTipo.doble:
                        res.tipo.tipo = EnumTipo.doble;
                        res.valor = parseFloat(exI.valor.toString()) + parseFloat(exD.valor.toString());
                        return res;
                    case EnumTipo.cadena:
                        res.tipo.tipo = EnumTipo.cadena;
                        res.valor = exI.valor.toString() + exD.valor.toString();
                        return res;
                    default:
                        console.log('Error en la suma de HI: Double');
                        return res;
                }
            case EnumTipo.cadena:
                switch(exD.tipo.tipo) {
                    case EnumTipo.entero:
                        res.tipo.tipo = EnumTipo.cadena;
                        res.valor = exI.valor.toString() + exD.valor.toString();
                        return res;
                    case EnumTipo.doble:
                        res.tipo.tipo = EnumTipo.cadena;
                        res.valor = exI.valor.toString() + exD.valor.toString();
                        return res;
                    case EnumTipo.cadena:
                        res.tipo.tipo = EnumTipo.cadena;
                        res.valor = exI.valor.toString() + exD.valor.toString();
                        return res;
                    default:
                        console.log('Error en la suma de HI: String');
                        return res;
                }
            case EnumTipo.XPath:
                switch(exD.tipo.tipo) {
                    case EnumTipo.XPath:
                        res.tipo.tipo = EnumTipo.XPath;
                        //res.valor = parseInt(exI.valor.toString()) + parseInt(exD.valor.toString());
                        return res;
                    default:
                        console.log('Error en la suma de HI: XPath');
                        return res;
                }
            default:
                console.log(`Error de tipos al sumar HI + HD`);
                break;
        }
        return res;
    }

    copiar():ExpresionXQ {
        return new SumaXQ(this.hI.copiar(), this.hD.copiar(), this.linea, this.columna);
    }
}