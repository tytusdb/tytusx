import { Expresion3D, TipoExpresion3D } from "./Expresion3D";
import { Primitiva3D } from "./Primitiva3D";


export class Operacion3D implements Expresion3D{
    fila: number;
    columna: number;
    tipo: TipoExpresion3D;
    op_izq: Primitiva3D;
    tipoOperacion: TipoOperacion3D;
    op_der: Primitiva3D | null;
    codigo3D: string;
    constructor(tipo: TipoExpresion3D, tipoOperacion: TipoOperacion3D, op_izq: Primitiva3D, op_der: Primitiva3D | null, codigo3D: string, fila: number, columna: number){
        this.tipo = tipo;
        this.codigo3D = codigo3D;
        this.fila = fila; 
        this.tipoOperacion = tipoOperacion;
        this.columna = columna;
        this.op_der = op_der;
        this.op_izq = op_izq;
        if(this.tipoOperacion == TipoOperacion3D.MENOSUNARIO){
            if(this.op_izq instanceof Primitiva3D){
                this.op_izq.valor = this.op_izq.getValor() * -1
                this.op_izq.codigo3D = "-"+this.op_izq.valor;
            }
        }
    }

    getCodigo3D(): string{
        this.codigo3D = this.op_izq.getCodigo3D();
        if(this.op_der != null){
            this.codigo3D += " "+this.getOperandoString()+" ";
            this.codigo3D += this.op_der.getCodigo3D();
        }
        return this.codigo3D;
    }

    getOperandoString(): string{
        switch(this.tipoOperacion){
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
    
    getTipoOperacion(): TipoOperacion3D{
        return this.tipoOperacion;
    }

    getTipoExpresion(): TipoExpresion3D{
        return this.tipo;
    }

    getValorRelacional(): boolean{
        switch(this.tipoOperacion){
            case TipoOperacion3D.MAYORQUE:
                if(this.op_der){
                    return this.op_izq.getValor() > this.op_der.getValor()
                }
            case TipoOperacion3D.MAYORIGUALQUE:
                if(this.op_der){
                    return this.op_izq.getValor() >= this.op_der.getValor()
                }
            case TipoOperacion3D.IGUALIGUAL:
                if(this.op_der){
                    return this.op_izq.getValor() == this.op_der.getValor()
                }
            case TipoOperacion3D.DIFERENTEQUE:
                if(this.op_der){
                    return this.op_izq.getValor() != this.op_der.getValor()
                }
            case TipoOperacion3D.MENORQUE:
                if(this.op_der){
                    return this.op_izq.getValor() < this.op_der.getValor()
                }
            case TipoOperacion3D.MENORIGUALQUE:
                if(this.op_der){
                    return this.op_izq.getValor() <= this.op_der.getValor()
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

    negarCondicion(){
        switch(this.tipoOperacion){
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

export enum TipoOperacion3D{
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MOD,
    MAYORQUE,
    MENORQUE,
    IGUALIGUAL,
    DIFERENTEQUE,
    MAYORIGUALQUE,
    MENORIGUALQUE,
    MENOSUNARIO,
}