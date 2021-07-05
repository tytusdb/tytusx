import {Nodo} from '../AST/Nodo';
import {Tabla} from '../AST/Tabla';
import {Arbol} from '../AST/Arbol';
import {Tipo} from '../AST/Tipo';
import {tipos} from '../AST/Tipo';
import { Primitivo } from '../Expresiones/Primitivo';
import { Identificador } from './Identificador';

class Imprimir extends Nodo{
  
    expresion: Nodo;
 
    constructor(expresion: Nodo, linea: number, columna: number){
        super(new Tipo(tipos.VOID), linea, columna);
        this.expresion = expresion;
    }
    
    traducir(tabla: Tabla, arbol: Arbol){
        let value =  this.expresion.traducir(tabla, arbol);
        if(this.expresion instanceof Primitivo){
            if(this.expresion.tipo.type == tipos.STRING){
                arbol.contador_tmp++;
                arbol.contenido += "t" + arbol.contador_tmp + " = h;\n";
                arbol.contenido += this.cadena_a_heap(this.expresion.valor.toString(), arbol);
                value = "t" + arbol.contador_tmp;

                arbol.contenido += "t1 =  -1;\nguardar_cadena();\n";
                arbol.contenido += "\nt1 = " + value + ";";
                arbol.contenido += '\nimprimir_cadena();\nprintf("\\n");\n';
        
            }else if(this.expresion.tipo.type == tipos.NUMBER){
                arbol.contador_tmp++;
                arbol.contenido += "t" + arbol.contador_tmp + " = " + value + ";\n";
                arbol.contenido += '\nprintf("%f",t'+ arbol.contador_tmp +' );\nprintf("\\n");\n';
            }  
        }else{
            if(this.expresion.tipo.type == tipos.NUMBER){
                arbol.contador_tmp++;
                arbol.contenido += "\nt" + arbol.contador_tmp + " = " + value + ";\n";
                arbol.contenido += '\nprintf("%f",t'+ arbol.contador_tmp +' );\nprintf("\\n");\n';

            }else{
                arbol.contenido += "\nt1 =  -1;\nguardar_cadena();\n";
                arbol.contenido += "\nt1 = " + value + ";";
                arbol.contenido += '\nimprimir_cadena();\nprintf("\\n");\n';
            }
        }            
        
        return null; 
    }

    ejecutar(tabla: Tabla, arbol: Arbol): any {
        const value =  this.expresion.ejecutar(tabla, arbol);
        arbol.consola.push(value);
        return null;
    }
}
export{Imprimir};