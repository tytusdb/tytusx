import { Arbol } from '../AST/Arbol';
import { Nodo } from "../AST/Nodo";
import { Tabla } from '../AST/Tabla';
import { tipos } from '../AST/Tipo';
import { Break } from '../Expresiones/Break';
import { Continue } from '../Expresiones/Continue';
import { Primitivo } from '../Expresiones/Primitivo';
import { Return } from '../Expresiones/Return';
import { Arreglo } from './Arreglo';
import { Declaracion } from './Declaracion';

class For_1 extends Nodo{


    variable: string;
    id: string;
    tipo_for: string;
    contenido: Array<Nodo>;


    constructor(variable: string, tipo_for: string,id: string, contenido: Array<Nodo>, linea: number, columna: number){
        super(null, linea, columna);
        this.variable = variable;
        this.tipo_for = tipo_for;
        this.id = id;
        this.contenido = contenido;
    }

    traducir(tabla: Tabla, arbol: Arbol){}

    ejecutar(tabla: Tabla, arbol: Arbol){
        let arr = "ARRAY#_" + this.id;
        let res = tabla.get_var(this.id);
        if(res == null){
            res = tabla.get_var(arr);
        }
        let fin;
        if(res.tipo.type == tipos.STRING){
            fin = res.valor.toString().length;
            if(this.tipo_for == "in"){
                // error
            }
        }else if(res.valor instanceof Arreglo){
            fin = res.valor.contenido.length;
        }else{
            return null;
        }

        let nueva_tabla = new Tabla(tabla);
        for(let i = 0; i < fin; i++){
            let dec:Declaracion;
            if(this.tipo_for == "of"){
                dec = new Declaracion("let", res.tipo, this.variable, null, this.linea, this.columna);
                if(res.tipo.type == tipos.STRING){
                    dec.valor = new Primitivo(res.tipo, res.valor[i],this.linea, this.columna);
                }else if(res.valor instanceof Arreglo){
                    dec.valor = res.valor.contenido[i];
                }
            }else if(this.tipo_for == "in"){
                dec = new Declaracion("let", res.tipo, this.variable, null, this.linea, this.columna);
                if(res.valor instanceof Arreglo){
                    dec.valor = new Primitivo(res.tipo, i,this.linea, this.columna);
                }
            }
            dec.ejecutar(nueva_tabla, arbol);
            for (let j = 0; j < this.contenido.length; j++) {
                const cont = this.contenido[j].ejecutar(nueva_tabla, arbol);
                if(cont instanceof Return){
                    return cont;
                }
                if(cont instanceof Continue || cont instanceof Break){
                    return null;
                }
            }
            nueva_tabla = new Tabla(tabla);
        }
      return null;
    }
}
export {For_1};
