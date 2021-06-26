import { ast } from "../ast/ast";
import { entorno } from "../ast/entorno";

export interface expresion{
    getTipo(ent:entorno,arbol:ast);
    getValor(ent:entorno,arbol:ast);
}