
import { Token } from 'src/app/models/token.model'
import { Excepcion } from './excepcion.model'
import { NodoFinal } from "../models/AST/nodoAST.model";
import { NodoCST } from "../models/CST/nodoCST.model";

export class Paquete {

    private errores: Array<Excepcion>;
    public arbolAST: NodoFinal;
    private gramaticaRecorrida: string;
    private tokens: Array<Token>;

    constructor(erroresEncontrados: Array<Excepcion>, tokens: Array<Token>,  arbolAST: NodoFinal, gramaticaRecorrida: string){
        this.errores = erroresEncontrados;
        this.tokens = tokens;
        this.arbolAST = arbolAST;
        this.gramaticaRecorrida = gramaticaRecorrida;
    }

    public getErrores(): Array<Excepcion>{
        return this.errores;
    }

    public getTokens(): Array<Token>{
        return this.tokens;
    }

    public getArbolAST(): Object{
        return JSON.parse(JSON.stringify(this.arbolAST));
    }

    public getGramaticaRecorrida(): string{
        return this.gramaticaRecorrida;
    }
}

export class Descendente {

    


}








