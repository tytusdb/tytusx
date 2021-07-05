import { ExpresionXQ } from "../../Arbol/ExpresionXQ";
import { EntornoXQ } from "../../Entorno/Entorno";
import { EnumTipo, TipoXQ } from "../../Entorno/TipoXQ";
import { LiteralXQ } from "../../Expresiones/LiteralXQ";

export class ModuloXQ extends ExpresionXQ {
    operacion:string;
    hI: ExpresionXQ;
    hD: ExpresionXQ;

    constructor(izq:ExpresionXQ, der:ExpresionXQ, l:number, c:number) {
        super();
        this.operacion = 'mod';
        this.hI = izq;
        this.hD = der;
        this.linea = l;
        this.columna = c;
    }

    getValor(ent: EntornoXQ):ExpresionXQ {
        let res:LiteralXQ = new LiteralXQ(new TipoXQ(EnumTipo.error), "@ERROR@", this.linea, this.columna);
        let exI:ExpresionXQ = this.hI.getValor(ent);
        let exD:ExpresionXQ = this.hD.getValor(ent);

        if(exD.valor.toString() != '0') {
            switch (exI.tipo.tipo) {
                case EnumTipo.entero:
                    switch(exD.tipo.tipo) {
                        case EnumTipo.entero:
                            res.tipo.tipo = EnumTipo.doble;
                            res.valor = parseInt(exI.valor.toString()) % parseInt(exD.valor.toString());
                            return res;
                        case EnumTipo.doble:
                            res.tipo.tipo = EnumTipo.doble;
                            res.valor = parseFloat(exI.valor.toString()) % parseFloat(exD.valor.toString());
                            return res;
                        default:
                            console.log('Error al obtener el modulo HI: Entero');
                            return res;
                    }
                case EnumTipo.doble:
                    switch(exD.tipo.tipo) {
                        case EnumTipo.entero:
                            res.tipo.tipo = EnumTipo.doble;
                            res.valor = parseFloat(exI.valor.toString()) % parseFloat(exD.valor.toString());
                            return res;
                        case EnumTipo.doble:
                            res.tipo.tipo = EnumTipo.doble;
                            res.valor = parseFloat(exI.valor.toString()) % parseFloat(exD.valor.toString());
                            return res;
                        default:
                            console.log('Error al obtener el modulo de HI: Double');
                            return res;
                    }
                default:
                    console.log(`Error de tipos al obtener el modulo de HI % HD`);
                    break;
            }
        } else {
            console.log('EJECUCION: No se puede obtener el modulo de una division entre 0');
            return res;
        }

        return res;
    }

    copiar():ExpresionXQ {
        return new ModuloXQ(this.hI.copiar(), this.hD.copiar(), this.linea, this.columna);
    }
}