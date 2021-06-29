import { DeclaracionXquery } from "./DeclaracionXquery";
import { FLWORExpr } from "./FLWORExpr";

export class SentenciaXquery{
    FlworExpresion:FLWORExpr;
    AnnotatedDecl: DeclaracionXquery;
    constructor( FlworExpresion:FLWORExpr, AnnotatedDecl: DeclaracionXquery){
        this.FlworExpresion = FlworExpresion;
        this.AnnotatedDecl = AnnotatedDecl;
    }
    //DirectConstructor: HtmlSenteces;
}