import predicate from 'src/clases/expresiones/predicates/predicate';
import aritmetica from 'src/clases/expresiones/operaciones/aritmetica';
import primitivo from 'src/clases/expresiones/primitivo';
import relacional from 'src/clases/expresiones/operaciones/relacional';
import filtro from 'src/clases/expresiones/predicates/filtro';
import axes from 'src/clases/expresiones/axes/axes';
import last from 'src/clases/expresiones/predicates/last';
import position from 'src/clases/expresiones/predicates/position';
import select from 'src/clases/expresiones/select';
import ast_xpath from '../clases/ast/ast_xpath'

export class astXpath{
    private numeroNodo:number;
    private arbolito:string;
    private nombreHijo:string;
    private padre:string = "";
    private auxPadre:string = "";

    public getArbolito(arbol:ast_xpath):string{
        this.arbolito = "";
        this.numeroNodo = -1;
        this.recorrerAst(arbol["lista_several"][0]);
        return this.arbolito;
    }

    private recorrerAst(raiz:Array<select>){

        for(let index = 0; index < raiz.length; index++){
            
            if (raiz[index] instanceof select){

                this.generaAst(raiz[index]["tipe"],raiz[index]["id"]);

            }else if (raiz[index] instanceof predicate){
                
                if (raiz[index]["slc"].hasOwnProperty("axe")){
                    this.generaAst(raiz[index]["slc"]["tipe"],raiz[index]["slc"]["axe"]);
                    if (raiz[index]["slc"]["axe"].toLocaleLowerCase() === "attribute" || raiz[index]["slc"]["axe"].toLocaleLowerCase() === "child"
                        || raiz[index]["slc"]["axe"].toLocaleLowerCase() === "descendant" || raiz[index]["slc"]["axe"].toLocaleLowerCase() === "descendant_or_self"
                        || raiz[index]["slc"]["axe"].toLocaleLowerCase() === "ancestor" || raiz[index]["slc"]["axe"].toLocaleLowerCase() === "ancestor_or_self"
                        || raiz[index]["slc"]["axe"].toLocaleLowerCase() === "following" || raiz[index]["slc"]["axe"].toLocaleLowerCase() === "following_sibling"
                        || raiz[index]["slc"]["axe"].toLocaleLowerCase() === "parent" || raiz[index]["slc"]["axe"].toLocaleLowerCase() === "preceding"
                        || raiz[index]["slc"]["axe"].toLocaleLowerCase() === "self" || raiz[index]["slc"]["axe"].toLocaleLowerCase() === "preceding_sibling"){

                            this.generaAst("::",raiz[index]["slc"]["id"]);                            

                    }
                }else{
                    this.generaAst(raiz[index]["slc"]["tipe"],raiz[index]["slc"]["id"]);
                }

                this.numeroNodo++;

                this.nombreHijo = "nodo" + this.numeroNodo.toString();
                this.arbolito += this.nombreHijo + "[label=\"predicado\"];\n";
                this.auxPadre = this.nombreHijo

                this.arbolito += this.padre + "->" + this.auxPadre + ";\n";
                this.padre = this.nombreHijo;

                this.recorreExpresion(raiz[index]["exp"]);

            }else if (raiz[index] instanceof axes){

                this.generaAst(raiz[index]["tipe"],raiz[index]["axe"]);

                if (raiz[index]["axe"].toLocaleLowerCase() === "attribute" || raiz[index]["axe"].toLocaleLowerCase() === "child"
                        || raiz[index]["axe"].toLocaleLowerCase() === "descendant" || raiz[index]["axe"].toLocaleLowerCase() === "descendant_or_self"
                        || raiz[index]["axe"].toLocaleLowerCase() === "ancestor" || raiz[index]["axe"].toLocaleLowerCase() === "ancestor_or_self"
                        || raiz[index]["axe"].toLocaleLowerCase() === "following" || raiz[index]["axe"].toLocaleLowerCase() === "following_sibling"
                        || raiz[index]["axe"].toLocaleLowerCase() === "parent" || raiz[index]["axe"].toLocaleLowerCase() === "preceding"
                        || raiz[index]["axe"].toLocaleLowerCase() === "self" || raiz[index]["axe"].toLocaleLowerCase() === "preceding_sibling"){

                            this.generaAst("::",raiz[index]["id"]);                            

                    }
            }
        }
    }

    /* Genera dot de instancias select */
    private generaAst(tipo:string,id:string){
        this.numeroNodo++;

        this.nombreHijo = "nodo" + this.numeroNodo.toString();
        this.arbolito += this.nombreHijo + "[label=\"" + tipo + "\"];\n";
        this.auxPadre = this.nombreHijo;

        this.numeroNodo++;

        this.nombreHijo = "nodo" + this.numeroNodo.toString();
        this.arbolito += this.nombreHijo + "[label=\"" + id + "\"];\n";
                

        if (this.padre !== ""){
            this.arbolito += this.padre + "->" + this.auxPadre + ";\n";
        }
        this.arbolito += this.auxPadre + "->" + this.nombreHijo + ";\n";

        this.padre = this.nombreHijo;
    }

    /* Recorre las expresiones de los predicados */
    private recorreExpresion(expresion){
        for (const key in expresion) {

            if (Object.prototype.hasOwnProperty.call(expresion, key)) {

                if (key !== "linea" && key !== "columna" && key !== "expU" && key !== "atr" && key !== "matches"){

                    if (!(expresion[key] instanceof aritmetica) && !(expresion[key] instanceof primitivo)
                        && !(expresion[key] instanceof relacional) && !(expresion[key] instanceof filtro)){
                            
                            if (expresion[key] instanceof last){
                                this.generaAstE("last");
                            }else if (expresion[key] instanceof position){
                                this.generaAstE("position");
                            }else{
                                this.generaAstE(expresion[key]);
                            }
                    }
                    
                    if (key !== "operador" && key !== "expU" && key !== "id" 
                        && key !== "atr" && key !== "matches" && key !== "primitivo"){

                        this.recorreExpresion(expresion[key])
                    }
                }
            }
        }
    }

    /* Genera dot de instancias expresion */
    private generaAstE(exprs:string){
        this.numeroNodo++;
        this.nombreHijo = "nodo" + this.numeroNodo.toString();
        
        this.arbolito += this.nombreHijo + "[label=\"" + exprs + "\"];\n";
        this.arbolito += this.padre + "->" + this.nombreHijo + ";\n";
    }
}