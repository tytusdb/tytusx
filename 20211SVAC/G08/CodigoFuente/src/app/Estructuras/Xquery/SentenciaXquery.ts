import { DeclaracionXquery, FunctionName } from "./DeclaracionXquery";
import { FLWORExpr } from "./FLWORExpr";
import { SingleExpresion } from "./SingleExpresion";

export class SentenciaXquery{
    FlworExpresion:FLWORExpr;
    AnnotatedDecl: DeclaracionXquery;
    Llamado:LlamadoFuncion;
    constructor( FlworExpresion:FLWORExpr, AnnotatedDecl: DeclaracionXquery, Llamado:LlamadoFuncion){
        this.FlworExpresion = FlworExpresion;
        this.AnnotatedDecl = AnnotatedDecl;
        this.Llamado = Llamado;
    }
    //DirectConstructor: HtmlSenteces;
}

export class LlamadoFuncion{
    Parametros:SingleExpresion[];
    Name: FunctionName;
    constructor( Parametros:SingleExpresion[], Name: FunctionName){
        this.Parametros = Parametros;
        this.Name = Name;
    }
    //DirectConstructor: HtmlSenteces;
}