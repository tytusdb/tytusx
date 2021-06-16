import { AST } from "../CLASES/AST";
import { Ambito } from "../CLASES/Ambito";
import { Simbolo } from "../CLASES/Simbolo";
import { Tipo } from "../CLASES/Tipo";
import { Atributo } from "../CLASES/Atributo";
//import { Objeto } from "../CLASES/Objeto";
import { Instruccion } from "../CLASES/Instruccion";

class Nodo{
    identificador:string;
    dslash:boolean;

    constructor(identificador:string, dslash:boolean){
        this.identificador = identificador;
        this.dslash = dslash;
    }
}