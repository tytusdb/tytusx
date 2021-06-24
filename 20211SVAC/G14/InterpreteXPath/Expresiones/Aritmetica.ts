import { Simbolo } from "../../InterpreteXML/TablaSimbolo/Simbolo";
import { TipoDato } from "../../InterpreteXML/TablaSimbolo/TipoDato";
import NodoAST from "../AST/NodoAST";
import { Expresion } from "../Interface/Expresion";
import {Error} from "./Error"
export enum TipoA {
    SUMA="+",
    RESTA="-",
    MULTI="*",
    DIV="/",
    MOD="%"
}

export class Aritmetica extends Expresion {
    
    private tipoA: TipoA
    private left: Expresion;
    private right: Expresion;

    constructor(fila: number, columna: number, left: Expresion, right: Expresion, tipo: TipoA) {
        super(fila, columna)
        this.tipoA = tipo;
        this.left = left;
        this.right = right;
    }

    public evaluar(): Simbolo {
        var res_left: Simbolo = this.left.evaluar();
        var res_right: Simbolo = this.right.evaluar();

        if(res_left.getTipo() != TipoDato.INT || res_right.getTipo() != TipoDato.INT){
           console.log(new Error(this.left.fila, this.left.columna, "Tipos de dato Incorrectos", "Error Semantico")); // Aqui se debe agregar a una lista
           throw new Error(this.left.fila, this.left.columna, "Tipos de dato Incorrectos", "Error Semantico");
        }

        switch (this.tipoA) {
            case TipoA.SUMA:
                return new Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) + Number(res_right.getValorImplicito()), res_right.fila, res_right.columna)
            case TipoA.RESTA:
                return new Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) - Number(res_right.getValorImplicito()), res_right.fila, res_right.columna)
            case TipoA.DIV:
                return new Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) / Number(res_right.getValorImplicito()), res_right.fila, res_right.columna)
            case TipoA.MULTI:
                return new Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) * Number(res_right.getValorImplicito()), res_right.fila, res_right.columna)
            default:
                return new Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) % Number(res_right.getValorImplicito()), res_right.fila, res_right.columna)

        }

    }

    public ast(): NodoAST {
        var nodo =  new NodoAST(this.tipoA);
        
        nodo.addHijo(this.left.ast());
        nodo.addHijo(this.right.ast());
        return nodo;
    }
    public concatenar() {
        throw new Error(0,0,"","Method not implemented.");
    }
    public buscar(lista: Simbolo[], isFinal: boolean): Simbolo[] {
        throw new Error(0,0,"","Method not implemented.");
    }
}