import { Expresion } from "./Expresion";
import { Literal } from "./Literal";

export class ObjetoXPath {
    valor: string;
    atributo: boolean;
    ambito: string;
    exp: any; //Expresion de predicado
    
    constructor(v: string) {
        this.valor = v;
        this.atributo = false;
        this.ambito = "local";
    }

    copiarValor(): ObjetoXPath {
        var nuevo: ObjetoXPath = new ObjetoXPath(this.valor);
        nuevo.atributo = this.atributo;
        nuevo.ambito = this.ambito;
        if(this.exp != undefined) {
            nuevo.exp = this.exp.copiarValor();
        } else {
            nuevo.exp = undefined;
        }

        return nuevo;
    }

    setExpresion(E: Expresion) {
        this.exp = E;
    }
}