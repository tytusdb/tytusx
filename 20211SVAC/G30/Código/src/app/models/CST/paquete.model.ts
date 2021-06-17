import { Excepcion } from "../excepcion.model";
import { NodoCST } from "./nodoCST.model";
import { Simbolo } from "./simbolo.model";

export class Paquete{
    private errores: Array<Excepcion>;
    private arbol: NodoCST;
    private gramaticaRecorrida: string;
    private xmlVersion: string;
    private xmlEncoding: string;
    private simbolos: Simbolo;

    constructor(erroresEncontrados: Array<Excepcion>, arbol: NodoCST, gramaticaRecorrida: string, xmlVersion: string, xmlEncoding: string, simbolos: Simbolo){
        this.errores = erroresEncontrados;
        this.arbol = arbol;
        this.gramaticaRecorrida = gramaticaRecorrida;
        this.xmlVersion = xmlVersion;
        this.xmlEncoding = xmlEncoding;
        this.simbolos = simbolos;
    }

    public getErrores(): Array<Excepcion>{
        return this.errores;
    }

    public getArbol(): Object{
        return JSON.parse(JSON.stringify(this.arbol));
    }

    public getGramaticaRecorrida(): string{
        return this.gramaticaRecorrida;
    }

    public getXmlVersion(): string{
        return this.xmlVersion;
    }
    public getXmlEncoding(): string{
        return this.xmlEncoding;
    }

    public getSimbolo(): Simbolo{
        return this.simbolos;
    }
     
 }