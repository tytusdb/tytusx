
import { Token } from 'src/app/models/token.model'
import { Excepcion } from './excepcion.model'
import { NodoFinal } from "../models/AST/nodoAST.model";
import { NodoCST } from "../models/CST/nodoCST.model";

export class Paquete {

    private errores: Array<Excepcion>;
    private arbolAST: NodoFinal;
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

export const reportes = {

    Errores: new Array<Excepcion>(),
    Tokens: new Array<Token>(),

    nuevoError: function (tipo:string, desc:string, fila:number, columna:number){

        this.Errores.push(new Excepcion(tipo, fila, columna, desc));
        return;
    },

    getErrores: function (){
        return this.Errores;
    },
    
    nuevoToken: function (tipo: string, fila:number, columna:number, valor:string, ambito:string, profundidad:number){
    
        this.Tokens.push(new Token(tipo, fila, columna, valor, ambito, profundidad));
        return;
    }, 
    
    getTokens: function (){
        return this.Tokens;
    }

}








