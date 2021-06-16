import { Excepcion } from "../excepcion.model";
import { NodoCST } from "./nodoCST.model";

export class Paquete{
    private errores: Array<Excepcion>;
    private arbol: NodoCST;
    private gramaticaRecorrida: string;
    private xmlVersion: string;
    private xmlEncoding: string;

    constructor(erroresEncontrados: Array<Excepcion>, arbol: NodoCST, gramaticaRecorrida: string, xmlVersion: string, xmlEncoding: string){
        this.errores = erroresEncontrados;
        this.arbol = arbol;
        this.gramaticaRecorrida = gramaticaRecorrida;
        this.xmlVersion = xmlVersion;
        this.xmlEncoding = xmlEncoding;
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
     
 }