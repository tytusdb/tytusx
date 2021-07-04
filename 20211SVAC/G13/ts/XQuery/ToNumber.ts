import { ExpresionXQ } from "../../Arbol/ExpresionXQ";
import { EntornoXQ } from "../../Entorno/Entorno";
import { EnumTipo, TipoXQ } from "../../Entorno/TipoXQ";
import { LiteralXQ } from "../../Expresiones/LiteralXQ";

export class ToNumberXQ extends ExpresionXQ {
    operacion:string;
    hD:ExpresionXQ;

    constructor(der:ExpresionXQ, l:number, c:number) {
        super();
        this.operacion = 'toNumber';
        this.hD = der;
        this.linea = l;
        this.columna = c;
    }

    getValor(ent: EntornoXQ): ExpresionXQ {
        let res:LiteralXQ = new LiteralXQ(new TipoXQ(EnumTipo.error), "@ERROR@", this.linea, this.columna);
        let exD:ExpresionXQ = this.hD.getValor(ent);

        switch (exD.tipo.tipo) {
            case EnumTipo.booleano:
                res.tipo.tipo = EnumTipo.entero;
                if(exD.valor.toString() == 'true') {
                    res.valor = 1;
                } else if(exD.valor.toString() == 'false') {
                    res.valor = 0;
                } else {
                    console.log('No se puede convertir a entero :v1');
                }
                return res;
            case EnumTipo.cadena:
                let temp = Number(exD.valor.toString());
                if(!isNaN(temp)) {
                    if(this.tieneDot(exD.valor.toString())) {
                        res.tipo.tipo = EnumTipo.doble;
                    } else {
                        res.tipo.tipo = EnumTipo.entero;
                    }
                    res.valor = temp.toString();
                    return res;
                } else {
                    console.log('Error no se puede convertir \'' + exD.valor.toString() + '\' a Number');
                }
                return res;
            case EnumTipo.XPath:
                res.tipo.tipo = EnumTipo.doble;
                //res.valor = exD.valor.toString();
                console.log('Pendiente de operar XPath');
                res.valor = -22;
                return res;
            default:
                console.log('El tipo de la expresion a convertir no es valido para toString()');
                break;
        }

        return res;
    }

    copiar(): ExpresionXQ {
        return new ToNumberXQ(this.hD, this.linea, this.columna);
    }

    tieneDot(entrada:string) {
        return (entrada.includes('.'))? true: false;
    }
}