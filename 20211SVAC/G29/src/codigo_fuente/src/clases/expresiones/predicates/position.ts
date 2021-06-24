import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { tipo } from "src/clases/ast/tipo";
import { expresion } from "src/clases/interfaces/expresion";

export default class position implements expresion{
    public linea: number
    public columna: number
    constructor(linea,columna){
        this.linea = linea
        this.columna = columna
    }
    getTipo(ent: entorno, arbol: ast) {
        return tipo.INT
    }
    getValor(ent: entorno, arbol: ast) {
        if (ent instanceof Array){
            return [ent.length]
        } else {
            return [1]
        }
    }

}