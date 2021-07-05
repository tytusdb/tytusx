import Primitivo from "../Expresiones/Primitivo";
import Aritmetica from "../Operaciones/Aritmeticas";
import Logica from "../Operaciones/Logica";

interface ayudaGrafico {
    valor: string
    padre: string
}

interface predicadoAyuda {
    ex1: any,
    ex2: any
}

export class Arbol {

    dot: string = "";
    objetos: any = [];

    constructor(objetos: any) {
        this.objetos = objetos
        this.dot = "";
    }

    crearGrafoAST(): string {
        this.dot = "digraph AST{\n";
        this.dot += "\"raiz\" [label = \"Raiz\"]\n";
        
        if(this.objetos.length > 1){
            let i = 0;
            while ( i < this.objetos.length ){
                this.dot += `\"${i}\" [label = \"|\"]\n`
                this.dot += `\"raiz\" -> \"${i}\"\n`;
                this.dot += this.generarNodoAST(this.objetos[i], `${i}`); 
                if (i + 1 < this.objetos.length ) {
                this.dot += this.generarNodoAST(this.objetos[i+1], `${i}`);
                }
                i += 2
            }
        }else{
            this.objetos.forEach((objeto: any) => {
                this.dot += this.generarNodoAST(objeto, 'raiz');
            });
        }
        
        this.dot += "}";
        console.log(this.dot)
        return this.dot;
    }

    generarNodoAST(objeto: any, padre: any): string {
        var aux:string = "";
        var izqID = `${objeto.linea.toString()}_${objeto.columna.toString()}I`;
        var derID = `${objeto.linea.toString()}_${objeto.columna.toString()}D`;
        
        aux = `\"${izqID}\" [label = \"${objeto.estado}\"]\n`;
        aux += `\"${derID}\" [label = \"${objeto.identificador}\"]\n`;

        aux += `\"${padre}\" -> \"${izqID}\"\n`;
        aux += `\"${padre}\" -> \"${derID}\"\n`;
        
        if (objeto.nodos.length > 0){
            aux += this.generarNodoAST(objeto.nodos[0], izqID);
        }

        return aux;
    }

    crearGrafoCST():string {
        this.dot = "digraph AST {\n";
        this.dot += "\"raiz\" [label = \"Raiz\"]\n";
        
        if(this.objetos.length > 1){
            let i = 0;
            while ( i < this.objetos.length ){
                this.dot += `\"${i}S\" [label = \"Separador\"]\n`
                this.dot += `\"${i}\" [label = \"|\"]\n`
                this.dot += `\"raiz\" -> \"${i}S\"\n`;
                this.dot += `\"${i}S\" -> \"${i}\"\n`;
                this.dot += this.generarNodoCST(this.objetos[i], `${i}`); 
                if (i + 1 < this.objetos.length ) {
                this.dot += this.generarNodoCST(this.objetos[i+1], `${i}`);
                }
                i += 2
            }
        }else{
            this.objetos.forEach((objeto: any) => {
                this.dot += this.generarNodoCST(objeto, 'raiz');
            });
        }
        this.dot += "}";
        return this.dot;
    }

    generarNodoCST(objeto: any, padre: string):string {
        var aux:string = "";
        var izqID = `${objeto.linea.toString()}_${objeto.columna.toString()}I`;
        var derID = `${objeto.linea.toString()}_${objeto.columna.toString()}D`;
        var centroID = `${objeto.linea.toString()}_${objeto.columna.toString()}C`;

        aux = `\"${izqID}\" [label = \"${objeto.estado}\"]\n`;
        aux += `\"${derID}\" [label = \"${objeto.identificador}\"]\n`;
        aux += `\"${centroID}\" [label = \"Nodo\"]\n`;

        aux += `\"${centroID}\" -> \"${izqID}\"\n`;
        aux += `\"${centroID}\" -> \"${derID}\"\n`;
        aux += `\"${padre}\" -> \"${centroID}\"\n`;

        if (objeto.nodos.length > 0){
            aux += this.generarNodoCST(objeto.nodos[0], izqID);
        }

        return aux;
    }

    ejecutarArbol():string {
        this.dot = "";
        
        if(this.objetos.length > 1){
            for (let i = 0; i < this.objetos.length; i++){
                this.dot += this.ejecutarNodoArbol(this.objetos[i]);
                if (i != this.objetos.length - 1) { this.dot += "|"; }
            }
        }else{
            this.dot += this.ejecutarNodoArbol(this.objetos[0])
        }
        
        console.log(this.dot)
        return this.dot
    }

    ejecutarNodoArbol(objeto: any):string {
        var aux:string = objeto.estado + objeto.identificador;
        
        if (objeto.nodos.length > 0){
            aux += this.ejecutarNodoArbol(objeto.nodos[0]);
        }
        
        /*if (objeto.predicado !== null){
            let ret = this.ejecutarPredicado(objeto.predicado.expresion)
            aux += "[" + ret.ex1 + ret.ex2 + "]";
        }*/

        return aux
    }

    /*ejecutarPredicado(objeto: any):predicadoAyuda {
        var expre1: any, expre2: any;
        if (objeto.exp1 instanceof Primitivo) {
            expre1 = this.ejecutarIzquierdo(objeto.exp1);
            console.log(expre1)
        }
        if (objeto.exp2 instanceof Primitivo) {
            expre2 = this.ejecutarDerecho(objeto.exp2);
            console.log(expre2)
        }
        if (objeto.exp1 instanceof Primitivo == false && objeto.exp2 instanceof Primitivo == false) {
            expre1 = this.ejecutarPredicado(objeto.exp1).ex1
            expre2 = this.ejecutarPredicado(objeto.exp2).ex2
            expre1 = expre1.getValor();
            expre2 = expre2.getValor();
            console.log(expre1)
            console.log(expre2)
        }

        return {ex1: expre1, ex2: expre2}
    }   

    ejecutarIzquierdo(objeto: any): any {
        return objeto.getValor();
    }

    ejecutarDerecho(objeto: any): any {
        return objeto.getValor();
    }

    ejecutarAritmetica(objeto: any):any {

    }*/
}