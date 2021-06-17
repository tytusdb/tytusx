import predicate from 'src/clases/expresiones/predicates/predicate';
import aritmetica from 'src/clases/expresiones/operaciones/aritmetica';
import primitivo from 'src/clases/expresiones/primitivo';
import relacional from 'src/clases/expresiones/operaciones/relacional';
import filtro from 'src/clases/expresiones/predicates/filtro';
import axes from 'src/clases/expresiones/axes/axes';
import last from 'src/clases/expresiones/predicates/last';
import position from 'src/clases/expresiones/predicates/position';
import select from 'src/clases/expresiones/select';
export class astXpath {
    constructor() {
        this.padre = "";
        this.auxPadre = "";
    }
    getArbolito(arbol) {
        this.arbolito = "";
        this.numeroNodo = -1;
        this.recorrerAst(arbol["lista_several"][0]);
        return this.arbolito;
    }
    recorrerAst(raiz) {
        for (let index = 0; index < raiz.length; index++) {
            if (raiz[index] instanceof select) {
                this.generaAst(raiz[index]["tipe"], raiz[index]["id"]);
            }
            else if (raiz[index] instanceof predicate) {
                this.generaAst(raiz[index]["slc"]["tipe"], raiz[index]["slc"]["id"]);
                this.numeroNodo++;
                this.nombreHijo = "nodo" + this.numeroNodo.toString();
                this.arbolito += this.nombreHijo + "[label=\"predicado\"];\n";
                this.auxPadre = this.nombreHijo;
                this.arbolito += this.padre + "->" + this.auxPadre + ";\n";
                this.padre = this.nombreHijo;
                this.recorreExpresion(raiz[index]["exp"]);
            }
            else if (raiz[index] instanceof axes) {
                this.generaAst(raiz[index]["tipe"], raiz[index]["axe"]);
                this.generaAst("::", raiz[index]["id"]);
            }
        }
    }
    /* Genera dot de instancias select */
    generaAst(tipo, id) {
        this.numeroNodo++;
        this.nombreHijo = "nodo" + this.numeroNodo.toString();
        this.arbolito += this.nombreHijo + "[label=\"" + tipo + "\"];\n";
        this.auxPadre = this.nombreHijo;
        this.numeroNodo++;
        this.nombreHijo = "nodo" + this.numeroNodo.toString();
        this.arbolito += this.nombreHijo + "[label=\"" + id + "\"];\n";
        if (this.padre !== "") {
            this.arbolito += this.padre + "->" + this.auxPadre + ";\n";
        }
        this.arbolito += this.auxPadre + "->" + this.nombreHijo + ";\n";
        this.padre = this.nombreHijo;
    }
    /* Recorre las expresiones de los predicados */
    recorreExpresion(expresion) {
        for (const key in expresion) {
            if (Object.prototype.hasOwnProperty.call(expresion, key)) {
                if (key !== "linea" && key !== "columna" && key !== "expU" && key !== "atr" && key !== "matches") {
                    if (!(expresion[key] instanceof aritmetica) && !(expresion[key] instanceof primitivo)
                        && !(expresion[key] instanceof relacional) && !(expresion[key] instanceof filtro)) {
                        if (expresion[key] instanceof last) {
                            this.generaAstE("last");
                        }
                        else if (expresion[key] instanceof position) {
                            this.generaAstE("position");
                        }
                        else {
                            this.generaAstE(expresion[key]);
                        }
                    }
                    if (key !== "operador" && key !== "expU" && key !== "id"
                        && key !== "atr" && key !== "matches" && key !== "primitivo") {
                        this.recorreExpresion(expresion[key]);
                    }
                }
            }
        }
    }
    /* Genera dot de instancias expresion */
    generaAstE(exprs) {
        this.numeroNodo++;
        this.nombreHijo = "nodo" + this.numeroNodo.toString();
        this.arbolito += this.nombreHijo + "[label=\"" + exprs + "\"];\n";
        this.arbolito += this.padre + "->" + this.nombreHijo + ";\n";
    }
}
//# sourceMappingURL=astXpath.js.map