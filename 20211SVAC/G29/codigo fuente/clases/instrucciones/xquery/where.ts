import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { simbolo } from "src/clases/ast/simbolo";
import { nodo3d } from "src/clases/c3d/nodo3d";
import predicate from "src/clases/expresiones/predicates/predicate";
import select from "src/clases/expresiones/select";
import { expresion } from "src/clases/interfaces/expresion";
import { instruccion } from "src/clases/interfaces/instruccion";
import { InsertarError } from "src/reports/ReportController";
import variable from "./variable";

export default class where implements instruccion {
    public accion: variable;
    public linea: number;
    public columna: number;
    public entSimbol: Array<entorno>;
    public simbol: simbolo;
    public slc: predicate

    constructor(accion, linea, columna) {
        this.accion = accion;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent: entorno, arbol: ast) {
        let ret: any;
        let xp = this.accion.xpath
        this.verificaMatch(ent);
        for (let j = 0; j < xp.length; j++) {
            for (let pat of xp[j]) {
                if (pat instanceof predicate) {
                    this.slc = pat
                    pat.xq = true;
                    pat.slcxq = this.entSimbol;
                    ret = [pat.getValor(ent.tabla["xml"].valor, arbol)];
                    ret.push("xpath");
                    this.simbol.valor = ret;
                }
            }
        }
    }

    /* Verifica que la variable a retornar exista en la tabla de simbolos */
    verificaMatch(ent: entorno) {
        let match = true; let ind = 0; let entXq = ent.tabla["xquery"].valor;
        while (match) {
            let simbol = entXq.getSimbol("var" + ind.toString());
            if (simbol && simbol.valor instanceof variable) {
                if (simbol.valor.id === this.accion.id) {
                    this.entSimbol = simbol.valor.valor[0];
                    this.simbol = simbol.valor;
                    match = false;
                }
                ind++;
            } else {
                match = false;
                InsertarError("Semantico", `Error, la variable de comparacion ${this.accion.id} no esta definida`, "xquery", this.accion.linea, this.accion.columna);
            }
        }
    }
    traducir(ent: entorno[], c3d: nodo3d) {
        c3d.main += `\t//where\n`
        this.slc.traducir(this.slc.matches, c3d)
    }
}