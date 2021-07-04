import { ExpresionXQ } from "../../Arbol/ExpresionXQ";
import { EntornoXQ } from "../../Entorno/Entorno";
import { EnumTipo, TipoXQ } from "../../Entorno/TipoXQ";
import { LiteralXQ } from "../../Expresiones/LiteralXQ";

export class subStringXQ extends ExpresionXQ {
    operacion:string;
    h:ExpresionXQ;
    inicio:ExpresionXQ;
    len:ExpresionXQ;

    constructor(st:ExpresionXQ, start:ExpresionXQ, cantidad:ExpresionXQ, l:number, c:number) {
        super();
        this.operacion = 'substring()';
        this.h = st;
        this.inicio = start;
        this.len = cantidad;
        this.linea = l;
        this.columna = c;
    }

    getValor(ent: EntornoXQ): ExpresionXQ {
        let res:LiteralXQ = new LiteralXQ(new TipoXQ(EnumTipo.error), "@ERROR@", this.linea, this.columna);
        let arg:ExpresionXQ = this.h.getValor(ent);
        let init:ExpresionXQ = this.inicio.getValor(ent);
        
        if(arg.tipo.tipo == EnumTipo.cadena) {
            if(init.tipo.tipo == EnumTipo.entero || init.tipo.tipo == EnumTipo.doble) {
                let inicial = parseInt(init.valor.toString());
                if(inicial >= 1) {
                    if(this.len != null) {
                        let fin:ExpresionXQ = this.len.getValor(ent);
                        if(fin.tipo.tipo == EnumTipo.entero || fin.tipo.tipo == EnumTipo.doble) {
                            let pFinal = parseInt(fin.valor.toString());
                            if(pFinal <= arg.valor.toString().length) {
                                res.tipo.tipo = EnumTipo.cadena;
                                res.valor = (arg.valor.toString()).substring(inicial - 1, pFinal);
                                return res;        
                            } else {
                                console.log('La posicion final proporcionado es mayor al tamaño del string');
                            }
                        } else {
                            console.log('La posicion final proporcionada no es de tipo entero');
                        }
                    } else {
                        res.tipo.tipo = EnumTipo.cadena;
                        res.valor = (arg.valor.toString()).substring(inicial - 1);
                        return res;
                    }
                } else {
                    console.log('La posicion inicial proporcionado es menor a la posicion del primer digito');    
                }
            } else {
                console.log('La posicion inicial proporcionado no es de tipo entero');
            }
        } else {
            console.log('El argumento proporcionado no es de tipo cadena');
        }
        return res;
    }

    copiar(): ExpresionXQ {
        return new subStringXQ(this.h, this.inicio, this.len, this.linea, this.columna);
    }
}