import { Primitiva3D } from "./Primitiva3D";
export class Operacion3D {
    constructor(tipo, tipoOperacion, op_izq, op_der, codigo3D, fila, columna) {
        this.tipo = tipo;
        this.codigo3D = codigo3D;
        this.fila = fila;
        this.tipoOperacion = tipoOperacion;
        this.columna = columna;
        this.op_der = op_der;
        this.op_izq = op_izq;
        if (this.tipoOperacion == TipoOperacion3D.MENOSUNARIO) {
            if (this.op_izq instanceof Primitiva3D) {
                this.op_izq.valor = this.op_izq.getValor() * -1;
                this.op_izq.codigo3D = "-" + this.op_izq.valor;
            }
        }
    }
    getCodigo3D() {
        this.codigo3D = this.op_izq.getCodigo3D();
        if (this.op_der != null) {
            this.codigo3D += " " + this.getOperandoString() + " ";
            this.codigo3D += this.op_der.getCodigo3D();
        }
        return this.codigo3D;
    }
    getOperandoString() {
        switch (this.tipoOperacion) {
            case TipoOperacion3D.SUMA:
                return "+";
            case TipoOperacion3D.RESTA:
                return "-";
            case TipoOperacion3D.MULTIPLICACION:
                return "*";
            case TipoOperacion3D.DIVISION:
                return "/";
            case TipoOperacion3D.MOD:
                return "%";
            case TipoOperacion3D.MAYORQUE:
                return ">";
            case TipoOperacion3D.MENORQUE:
                return "<";
            case TipoOperacion3D.MAYORIGUALQUE:
                return ">=";
            case TipoOperacion3D.MENORIGUALQUE:
                return "<=";
            case TipoOperacion3D.IGUALIGUAL:
                return "==";
            case TipoOperacion3D.DIFERENTEQUE:
                return "!=";
            case TipoOperacion3D.MENOSUNARIO:
                return "-";
            default:
                return "?";
        }
    }
    getTipoOperacion() {
        return this.tipoOperacion;
    }
    getTipoExpresion() {
        return this.tipo;
    }
    getValorRelacional() {
        switch (this.tipoOperacion) {
            case TipoOperacion3D.MAYORQUE:
                if (this.op_der) {
                    return this.op_izq.getValor() > this.op_der.getValor();
                }
            case TipoOperacion3D.MAYORIGUALQUE:
                if (this.op_der) {
                    return this.op_izq.getValor() >= this.op_der.getValor();
                }
            case TipoOperacion3D.IGUALIGUAL:
                if (this.op_der) {
                    return this.op_izq.getValor() == this.op_der.getValor();
                }
            case TipoOperacion3D.DIFERENTEQUE:
                if (this.op_der) {
                    return this.op_izq.getValor() != this.op_der.getValor();
                }
            case TipoOperacion3D.MENORQUE:
                if (this.op_der) {
                    return this.op_izq.getValor() < this.op_der.getValor();
                }
            case TipoOperacion3D.MENORIGUALQUE:
                if (this.op_der) {
                    return this.op_izq.getValor() <= this.op_der.getValor();
                }
            default:
                console.log("Tipo condicion Incorrecta: ", this.tipoOperacion);
                return false;
        }
    }
    /*
        getTipoOriginal(tipoOp: TipoOperacion3D): TipoOperacion3D{
            switch(tipoOp)
    
        }*/
    negarCondicion() {
        switch (this.tipoOperacion) {
            case TipoOperacion3D.MAYORQUE:
                return TipoOperacion3D.MENORQUE;
            case TipoOperacion3D.MAYORIGUALQUE:
                return TipoOperacion3D.MENORIGUALQUE;
            case TipoOperacion3D.IGUALIGUAL:
                return TipoOperacion3D.DIFERENTEQUE;
            case TipoOperacion3D.DIFERENTEQUE:
                return TipoOperacion3D.IGUALIGUAL;
            case TipoOperacion3D.MENORQUE:
                return TipoOperacion3D.MAYORQUE;
            case TipoOperacion3D.MENORIGUALQUE:
                return TipoOperacion3D.MAYORIGUALQUE;
            default:
                console.log("Tipo condicion Incorrecta: ", this.tipoOperacion);
                return null;
        }
    }
}
export var TipoOperacion3D;
(function (TipoOperacion3D) {
    TipoOperacion3D[TipoOperacion3D["SUMA"] = 0] = "SUMA";
    TipoOperacion3D[TipoOperacion3D["RESTA"] = 1] = "RESTA";
    TipoOperacion3D[TipoOperacion3D["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    TipoOperacion3D[TipoOperacion3D["DIVISION"] = 3] = "DIVISION";
    TipoOperacion3D[TipoOperacion3D["MOD"] = 4] = "MOD";
    TipoOperacion3D[TipoOperacion3D["MAYORQUE"] = 5] = "MAYORQUE";
    TipoOperacion3D[TipoOperacion3D["MENORQUE"] = 6] = "MENORQUE";
    TipoOperacion3D[TipoOperacion3D["IGUALIGUAL"] = 7] = "IGUALIGUAL";
    TipoOperacion3D[TipoOperacion3D["DIFERENTEQUE"] = 8] = "DIFERENTEQUE";
    TipoOperacion3D[TipoOperacion3D["MAYORIGUALQUE"] = 9] = "MAYORIGUALQUE";
    TipoOperacion3D[TipoOperacion3D["MENORIGUALQUE"] = 10] = "MENORIGUALQUE";
    TipoOperacion3D[TipoOperacion3D["MENOSUNARIO"] = 11] = "MENOSUNARIO";
})(TipoOperacion3D || (TipoOperacion3D = {}));
