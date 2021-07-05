import { ExpresionXQ } from "../../Arbol/ExpresionXQ";
import { EntornoXQ } from "../../Entorno/Entorno";
import { EnumTipo, TipoXQ } from "../../Entorno/TipoXQ";
import { LiteralXQ } from "../../Expresiones/LiteralXQ";
var Entorno = require("../../../../AST/Entorno");

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
                if(Array.isArray(exD.valor)) {
                    //Ya esta operado
                    if(exD.valor.length == 1) {
                        if(exD.valor[0].entorno.hijos.length == 0) {
                            //Convertir
                            let tempXP = Number(exD.valor[0].entorno.texto.toString());
                            if(!isNaN(tempXP)) {
                                if(this.tieneDot(tempXP.toString())) {
                                    res.tipo.tipo = EnumTipo.doble;
                                } else {
                                    res.tipo.tipo = EnumTipo.entero;
                                }
                                res.valor = tempXP.toString();
                                return res;
                            } else {
                                console.log('Error no se puede convertir \'' + exD.valor.toString() + '\' a Number');
                            }
                        } else {
                            //No es nodo hoja
                        }
                    } else {
                        //Hay varios retornos
                    }
                }/* else {
                    let xmlG = ent.buscar("#XML#", this.linea, this.columna, 'El objeto XML');
                    var retXP = exD.valor.Ejecutar(xmlG.valor);
                    if(retXP.length == 1) {
                        if(retXP[0].entorno.hijos.length == 0) {
                            //Convertir
                            let tempXP = Number(retXP[0].entorno.texto.toString());
                            if(!isNaN(tempXP)) {
                                if(this.tieneDot(tempXP.toString())) {
                                    res.tipo.tipo = EnumTipo.doble;
                                } else {
                                    res.tipo.tipo = EnumTipo.entero;
                                }
                                res.valor = tempXP.toString();
                                return res;
                            } else {
                                console.log('Error no se puede convertir \'' + exD.valor.toString() + '\' a Number');
                            }
                        } else {
                            //No es nodo hoja
                        }
                    } else {
                        //Hay varios retornos
                    }
                }*/
                return res;
            default:
                console.log('El tipo de la expresion a convertir no es valido para toNumber()');
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