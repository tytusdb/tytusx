import { Arbol } from '../AST/Arbol';
import { Errror } from '../AST/Errror';
import { Nodo } from "../AST/Nodo";
import { Simbolo } from '../AST/Simbolo';
import { Tabla } from '../AST/Tabla';
import { Tipo, tipos } from '../AST/Tipo';
import { Primitivo } from '../Expresiones/Primitivo';
import { Arreglo } from './Arreglo';

class Concat extends Nodo{
    exp1: Nodo;
    exp2: Nodo;
    id: string;
    
    constructor(exp1:Nodo, exp2:Nodo, linea: number, columna: number){
        super(null, linea, columna);
        this.exp1 = exp1;
        this.exp2 = exp2;
    }
    traducir(tabla: Tabla, arbol: Arbol){
        let res1 = this.exp1.traducir(tabla, arbol);
        let res2 = this.exp2.traducir(tabla, arbol);
        let tmp1 = res1;
        let tmp2 = res2;
        if(res1 instanceof Errror){
            //error
            return null;
        }
       
        if(this.exp1.tipo.type != tipos.STRING || this.exp1.tipo.type != tipos.STRING){
            //error
            return null;
        }
        if(this.exp1 instanceof Primitivo){
                tmp1 = arbol.generar_temporal();
                arbol.contenido += "\n" +tmp1 + " = h;\n";
                arbol.contenido += "\n" +this.cadena_a_heap(this.exp1.valor.toString(), arbol);
                arbol.contenido += "\nt1 =  -1;\nguardar_cadena();\n";
        }
        if(this.exp2 instanceof Primitivo){
            tmp2 = arbol.generar_temporal();
            arbol.contenido += "\n" +tmp2 + " = h;\n";
            arbol.contenido += "\n" +this.cadena_a_heap(this.exp2.valor.toString(), arbol);
            arbol.contenido += "\nt1 =  -1;\nguardar_cadena();\n";
        }
        
        this.tipo = this.exp1.tipo;   
        let tmp = arbol.generar_temporal();
        arbol.contenido += "\n" + tmp + " = h;";
        arbol.contenido += "\nt1 = " + tmp1 + ";";
        arbol.contenido += "\nunir_cadena();";
        arbol.contenido += "\nt1 = " + tmp2 + ";";
        arbol.contenido += "\nunir_cadena();";
        arbol.contenido += "t1 =  -1;\nguardar_cadena();\n";
        return tmp;  
    }

    ejecutar(tabla: Tabla, arbol: Arbol){
        return 0;
    }
    
}
export {Concat};
