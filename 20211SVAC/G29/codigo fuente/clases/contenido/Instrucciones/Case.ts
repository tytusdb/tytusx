import { Arbol } from '../AST/Arbol';
import { Nodo } from "../AST/Nodo";
import { Tabla } from '../AST/Tabla';
import { Break } from '../Expresiones/Break';
import { Continue } from '../Expresiones/Continue';
import { Return } from '../Expresiones/Return';

class Case extends Nodo{

    expresion: Nodo;
    contenido: Array<Nodo>;
    constructor(expresion: Nodo, contenido: Array<Nodo>,linea: number, columna: number){
        super(null, linea, columna);
        this.expresion = expresion;
        this.contenido = contenido;
    }
    traducir(tabla: Tabla, arbol: Arbol){
        const nueva_tabla = new Tabla(tabla);
        for(let i = 0; i <  this.contenido.length; i++){
            const cont = this.contenido[i].traducir(nueva_tabla, arbol);
        }
        return '';
    }


    ejecutar(tabla: Tabla, arbol:Arbol){
        const nueva_tabla = new Tabla(tabla);
        for(let i = 0; i <  this.contenido.length; i++){
            const cont = this.contenido[i].ejecutar(nueva_tabla, arbol);
            if(cont instanceof Return){
                return cont;
            }
            if(cont instanceof Continue || cont instanceof Break){
                return null;
            }

        }
      return '';
    }
}
export{Case};
