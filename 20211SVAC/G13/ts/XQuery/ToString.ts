import { ExpresionXQ } from "../../Arbol/ExpresionXQ";
import { EntornoXQ } from "../../Entorno/Entorno";
import { EnumTipo, TipoXQ } from "../../Entorno/TipoXQ";
import { LiteralXQ } from "../../Expresiones/LiteralXQ";
var Entorno = require("../../../../AST/Entorno");

export class ToStringXQ extends ExpresionXQ {
    operacion:string;
    hD:ExpresionXQ;

    constructor(der:ExpresionXQ, l:number, c:number) {
        super();
        this.operacion = 'toString()';
        this.hD = der;
        this.linea = l;
        this.columna = c;
    }

    getValor(ent: EntornoXQ): ExpresionXQ {
        let res:LiteralXQ = new LiteralXQ(new TipoXQ(EnumTipo.error), "@ERROR@", this.linea, this.columna);
        let exD:ExpresionXQ = this.hD.getValor(ent);

        switch (exD.tipo.tipo) {
            case EnumTipo.entero:
                res.tipo.tipo = EnumTipo.cadena;
                res.valor = exD.valor.toString();
                return res;
            case EnumTipo.doble:
                res.tipo.tipo = EnumTipo.cadena;
                res.valor = exD.valor.toString();
                return res;
            case EnumTipo.booleano:
                res.tipo.tipo = EnumTipo.cadena;
                res.valor = exD.valor.toString();
                return res;
            case EnumTipo.XPath:
                res.tipo.tipo = EnumTipo.cadena;
                if(Array.isArray(exD.valor)) {
                    //Ya esta operado
                    res.valor = Entorno.conInicial(exD.valor);
                } //else {
                    //let xmlG = ent.buscar("#XML#", this.linea, this.columna, 'El objeto XML');
                    //var retXP = exD.valor.Ejecutar(xmlG.valor);
                    //var st = Entorno.conInicial(retXP);
                    //res.valor = st;
                //}
                return res;
            default:
                console.log('El tipo de la expresion a convertir no es valido para toString()');
                break;
        }

        return res;
    }

    copiar(): ExpresionXQ {
        return new ToStringXQ(this.hD, this.linea, this.columna);
    }
}