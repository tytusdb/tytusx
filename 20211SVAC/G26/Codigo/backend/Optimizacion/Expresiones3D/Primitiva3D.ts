import { Expresion3D, TipoExpresion3D } from "./Expresion3D";


export class Primitiva3D implements Expresion3D{
    fila: number;
    columna: number;
    tipo: TipoExpresion3D;
    tipoPrimitiva: TipoPrim3D;
    valor: any
    codigo3D: string;
    constructor(tipo: TipoExpresion3D, tipoPrimitiva:TipoPrim3D, valor: any, codigo3D: string, fila: number, columna: number){
        this.fila = fila;
        this.columna = columna;
        this.valor = valor;
        this.tipo = tipo;
        this.tipoPrimitiva = tipoPrimitiva;
        this.codigo3D = codigo3D;
    }

    getCodigo3D(): string{
        return this.valor;
    }

    getValor(){
        return this.valor;
    }

    getTipoPrim3D(): TipoPrim3D{
        return this.tipoPrimitiva
    }

    getTipoExpresion(): TipoExpresion3D{
        return this.tipo;
    }
}

export enum TipoPrim3D{
    IDENTIFIER,
    DOUBLE,
    INTEGER,
}