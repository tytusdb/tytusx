import { ast } from "../ast/ast";
import { entorno } from "../ast/entorno";

export interface instruccion{
    ejecutar(ent:entorno,arbol:ast);
}