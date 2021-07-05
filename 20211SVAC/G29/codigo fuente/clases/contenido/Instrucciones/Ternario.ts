import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Arbol } from '../AST/Arbol';
import { Errror } from '../AST/Errror';
import { Nodo } from "../AST/Nodo";
import { Tabla } from '../AST/Tabla';
import { Tipo, tipos } from '../AST/Tipo';
import { Break } from '../Expresiones/Break';
import { Continue } from '../Expresiones/Continue';
import { Primitivo } from '../Expresiones/Primitivo';
import { Return } from '../Expresiones/Return';

class Ternario extends Nodo{

    condicion:Nodo;
    exp1:Nodo;
    exp2:Nodo;

    constructor(tipo:Tipo, condicion:Nodo, exp1:Nodo, exp2:Nodo, linea:number, columna:number){
        super(tipo, linea, columna);
        this.condicion = condicion;
        this.exp1 = exp1;
        this.exp2 = exp2;
    }
    traducir(tabla: Tabla, arbol: Arbol){
        let cond = this.condicion.traducir(tabla, arbol);
        let e_si = arbol.generar_etiqueta();
        let e_no = arbol.generar_etiqueta();
        let e_fin = arbol.generar_etiqueta();
        let tmp =  arbol.generar_temporal();
        if (cond instanceof Error) {
            return cond;
        }
        arbol.contenido += "\nif(" + cond + " == 1)goto " + e_si + ";";
        arbol.contenido += "\ngoto " +e_no + ";";
        arbol.contenido += "\n" + e_si + ":";
        let tmp1 = this.exp1.traducir(tabla, arbol);
        
        if(tmp1 instanceof Errror){
            return tmp1;
        }
        if(this.exp1 instanceof Primitivo){
            if(this.exp1.tipo.type == tipos.STRING){
                let aux = arbol.generar_temporal();
                arbol.contenido += "\n" + aux + " = h;"
                arbol.contenido += this.cadena_a_heap(tmp1, arbol);               
                arbol.contenido += this.numero_a_heap(-1, arbol);
                tmp1 = aux;
            
            }
        }
        arbol.contenido += "\n" + tmp + " = " + tmp1 + ";";
        arbol.contenido += "\ngoto " +e_fin + ";";
        arbol.contenido += "\n" + e_no + ":";
        let tmp2 = this.exp2.traducir(tabla, arbol);
        if(tmp2 instanceof Errror){
            return tmp2;
        }
        if(this.exp2 instanceof Primitivo){
            if(this.exp2.tipo.type == tipos.STRING){
                let aux = arbol.generar_temporal();
                arbol.contenido += "\n" + aux + " = h;"
                arbol.contenido += this.cadena_a_heap(tmp2, arbol);               
                arbol.contenido += this.numero_a_heap(-1, arbol);
                tmp2 = aux;
        
            }    
        }
        arbol.contenido += "\n" + tmp + " = " + tmp2 + ";";
        arbol.contenido += "\n" +e_fin + ":";
        return tmp;
    }

    ejecutar(tabla: Tabla, arbol: Arbol){
        let res: Nodo;
        res = this.condicion.ejecutar(tabla, arbol);
        if (res instanceof Array) {
            return res;
        }

        if (this.condicion.tipo.type !== tipos.BOOLEAN) {
            const error = new Errror('Semantico',
                `condicion incorrecta`,
                this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return error;
        }
        if(res){  
            const cont = this.exp1.ejecutar(tabla, arbol);
            this.tipo.type = this.exp1.tipo.type;
            if(cont instanceof Return){
                return cont;
            }
            if(cont instanceof Continue || cont instanceof Break){
                return null;
            }
            return cont;
        }else{  
            const cont = this.exp2.ejecutar(tabla, arbol);
            this.tipo.type = this.exp2.tipo.type;
            if(cont instanceof Return){
                return cont;
            }
            if(cont instanceof Continue || cont instanceof Break){
                return null;
            }
            return cont;
        }
    }
    
}
export{Ternario};