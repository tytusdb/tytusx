import { Primitivo } from "./Primitivo"
import { TiposOp } from "./TiposOp"
import { TipoVal } from "./TipoVal"
import { Expresion } from "./Expresion"

export class OpBinaria implements Expresion {
    opIzq:OpBinaria 
    opDer:OpBinaria
    tipo:string

    constructor(opIzq:OpBinaria, opDer:OpBinaria, tipo:string) {
        this.opIzq = opIzq
        this.opDer = opDer
        this.tipo = tipo
    }
    
    ejecutar():Primitivo {
        let primitivoIzq = this.opIzq.ejecutar()
        let primitivoDer = this.opDer.ejecutar()
        switch(this.tipo) {
            case TiposOp.SUMA:
                if ((primitivoIzq.tipo === TipoVal.ENTERO || primitivoIzq.tipo === TipoVal.DECIMAL) && 
                    (primitivoDer.tipo === TipoVal.ENTERO || primitivoDer.tipo === TipoVal.DECIMAL)) {
                    let res = primitivoIzq.valor + primitivoDer.valor
                    let tipo = res%1 === 0? TipoVal.ENTERO : TipoVal.DECIMAL
                    return new Primitivo(res, tipo)
                }
            case TiposOp.RESTA:
                if ((primitivoIzq.tipo === TipoVal.ENTERO || primitivoIzq.tipo === TipoVal.DECIMAL) && 
                    (primitivoDer.tipo === TipoVal.ENTERO || primitivoDer.tipo === TipoVal.DECIMAL)) {
                    let res = primitivoIzq.valor - primitivoDer.valor
                    let tipo = res%1 === 0? TipoVal.ENTERO : TipoVal.DECIMAL
                    return new Primitivo(res, tipo)
                }
            case TiposOp.MULTIPLICACION:
                if ((primitivoIzq.tipo === TipoVal.ENTERO || primitivoIzq.tipo === TipoVal.DECIMAL) && 
                    (primitivoDer.tipo === TipoVal.ENTERO || primitivoDer.tipo === TipoVal.DECIMAL)) {
                    let res = primitivoIzq.valor * primitivoDer.valor
                    let tipo = res%1 === 0? TipoVal.ENTERO : TipoVal.DECIMAL
                    return new Primitivo(res, tipo)
                }
            case TiposOp.DIVISION:
                if ((primitivoIzq.tipo === TipoVal.ENTERO || primitivoIzq.tipo === TipoVal.DECIMAL) && 
                    (primitivoDer.tipo === TipoVal.ENTERO || primitivoDer.tipo === TipoVal.DECIMAL)) {
                    let res = primitivoIzq.valor / primitivoDer.valor
                    let tipo = res%1 === 0? TipoVal.ENTERO : TipoVal.DECIMAL
                    return new Primitivo(res, tipo)
                }
            case TiposOp.MODULO:
                if ((primitivoIzq.tipo === TipoVal.ENTERO || primitivoIzq.tipo === TipoVal.DECIMAL) && 
                    (primitivoDer.tipo === TipoVal.ENTERO || primitivoDer.tipo === TipoVal.DECIMAL)) {
                    let res = primitivoIzq.valor % primitivoDer.valor
                    let tipo = res%1 === 0? TipoVal.ENTERO : TipoVal.DECIMAL
                    return new Primitivo(res, tipo)
                }
            case TiposOp.AND: 
                if (primitivoIzq.tipo === TipoVal.BOLEANO && primitivoDer.tipo === TipoVal.BOLEANO) {
                    let res = primitivoIzq.valor && primitivoDer.valor
                    let tipo = TipoVal.BOLEANO
                    return new Primitivo(res, tipo)
                }
            case TiposOp.OR: 
                if (primitivoIzq.tipo === TipoVal.BOLEANO && primitivoDer.tipo === TipoVal.BOLEANO) {
                    let res = primitivoIzq.valor || primitivoDer.valor
                    let tipo = TipoVal.BOLEANO
                    return new Primitivo(res, tipo)
                }
            case TiposOp.MAYOR_QUE:
                if (primitivoIzq.tipo in [TipoVal.ENTERO, TipoVal.DECIMAL, TipoVal.BOLEANO, TipoVal.CADENA] && 
                    primitivoDer.tipo in [TipoVal.ENTERO, TipoVal.DECIMAL, TipoVal.BOLEANO, TipoVal.CADENA]) {
                    let res:any = primitivoIzq.valor > primitivoDer.valor
                    let tipo = TipoVal.BOLEANO
                    return new Primitivo(res, tipo)
                }
            case TiposOp.MENOR_QUE:
                if (primitivoIzq.tipo in [TipoVal.ENTERO, TipoVal.DECIMAL, TipoVal.BOLEANO, TipoVal.CADENA] && 
                    primitivoDer.tipo in [TipoVal.ENTERO, TipoVal.DECIMAL, TipoVal.BOLEANO, TipoVal.CADENA]) {
                    let res:any = primitivoIzq.valor < primitivoDer.valor
                    let tipo = TipoVal.BOLEANO
                    return new Primitivo(res, tipo)
                }
            case TiposOp.MAYOR_IGUAL:
                if (primitivoIzq.tipo in [TipoVal.ENTERO, TipoVal.DECIMAL, TipoVal.BOLEANO, TipoVal.CADENA] && 
                    primitivoDer.tipo in [TipoVal.ENTERO, TipoVal.DECIMAL, TipoVal.BOLEANO, TipoVal.CADENA]) {
                    let res:any = primitivoIzq.valor >= primitivoDer.valor
                    let tipo = TipoVal.BOLEANO
                    return new Primitivo(res, tipo)
                }
            case TiposOp.MENOR_IGUAL:
                if (primitivoIzq.tipo in [TipoVal.ENTERO, TipoVal.DECIMAL, TipoVal.BOLEANO, TipoVal.CADENA] && 
                    primitivoDer.tipo in [TipoVal.ENTERO, TipoVal.DECIMAL, TipoVal.BOLEANO, TipoVal.CADENA]) {
                    let res:any = primitivoIzq.valor <= primitivoDer.valor
                    let tipo = TipoVal.BOLEANO
                    return new Primitivo(res, tipo)
                }
            case TiposOp.NO_IGUAL:
                if (primitivoIzq.tipo in [TipoVal.ENTERO, TipoVal.DECIMAL, TipoVal.BOLEANO, TipoVal.CADENA] && 
                    primitivoDer.tipo in [TipoVal.ENTERO, TipoVal.DECIMAL, TipoVal.BOLEANO, TipoVal.CADENA]) {
                    let res:any = primitivoIzq.valor != primitivoDer.valor
                    let tipo = TipoVal.BOLEANO
                    return new Primitivo(res, tipo)
                }
        }
    }

}