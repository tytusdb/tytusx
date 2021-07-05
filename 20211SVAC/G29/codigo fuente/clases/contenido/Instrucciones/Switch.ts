import { Arbol } from '../AST/Arbol';
import { Errror } from '../AST/Errror';
import { Nodo } from "../AST/Nodo";
import { Tabla } from '../AST/Tabla';
import { tipos } from '../AST/Tipo';
import { Break } from '../Expresiones/Break';
import { Continue } from '../Expresiones/Continue';
import { Primitivo } from '../Expresiones/Primitivo';
import { Return } from '../Expresiones/Return';
import { Case } from './Case';
import { Default } from './Default';

class Switch extends Nodo{

    expresion: Nodo;
    contenido: Array<Nodo>;
    e_cases: Array<string>;
    e_default: string;
    constructor(expresion: Nodo, contenido: Array<Nodo>,linea: number, columna: number){
        super(null, linea, columna);
        this.expresion = expresion;
        this.contenido = contenido;
        this.e_cases = [];
        this.e_default = "";
    }
    traducir(tabla: Tabla, arbol: Arbol){
        let exp = this.expresion.traducir(tabla, arbol);
        if(this.expresion instanceof Primitivo){
            if(this.expresion.tipo.type == tipos.STRING){
                let aux = arbol.generar_temporal();
                arbol.contenido += "\n" + aux + " = h;"
                arbol.contenido += this.cadena_a_heap(exp, arbol);               
                arbol.contenido += this.numero_a_heap(-1, arbol);
                exp = aux; 
            }
        }
        let e_i_ciclo = arbol.generar_etiqueta();
        let e_f_ciclo = arbol.generar_etiqueta();
        arbol.etiquetas_fin.push(e_f_ciclo);
        /*obtener etiquetas por cada case*/
        for(let i = 0; i < this.contenido.length; i++){
            let cases = this.contenido[i];
            if(cases instanceof Case){
                let res = cases.expresion.traducir(tabla,arbol);
                if(cases.expresion instanceof Primitivo){
                    if(cases.expresion.tipo.type == tipos.STRING){
                        let aux = arbol.generar_temporal();
                        arbol.contenido += "\n" + aux + " = h;"
                        arbol.contenido += this.cadena_a_heap(res, arbol);               
                        arbol.contenido += this.numero_a_heap(-1, arbol);
                        res = aux; 
                    }
                }
                let e_si = arbol.generar_etiqueta();
                let e_no = arbol.generar_etiqueta();
                let e_fin = arbol.generar_etiqueta();
                let e_case = arbol.generar_etiqueta();
                let tmp = arbol.generar_temporal();

                if(this.expresion.tipo.type == tipos.STRING ||cases.expresion.tipo.type == tipos.STRING){
                    arbol.contenido += "\nt1 = " + exp + ";";
                    arbol.contenido += "\nt2 = " + res + ";";
                    arbol.contenido += "\ncomparar_cadena();"; 
                    arbol.contenido += "\nif(t5 == 1) goto " + e_si + ";";
                }else{
                    arbol.contenido +=  "\nif(" +exp +" == " + res + ")goto " + e_si +";";
                }
                arbol.contenido += "\ngoto " + e_no + ";";
                arbol.contenido += "\n" + e_si + ":";
                arbol.contenido += "\n" + tmp + " = 1;\ngoto " + e_fin + ";"; 
                arbol.contenido += "\n" + e_no + ":";
                arbol.contenido += "\n" + tmp + " = 0;"; 
                arbol.contenido += "\n" + e_fin + ":";
                arbol.contenido +=  "\nif(" +tmp +" == 1)goto " + e_case +";";
                this.e_cases.push(e_case);
            }else if(cases instanceof Default){
                this.e_default =  arbol.generar_etiqueta();
                arbol.contenido += "\ngoto " + this.e_default + ";";      
            } 
        }
        for(let i = 0; i < this.contenido.length; i++){
            let cases = this.contenido[i];
            if(cases instanceof Case){
                arbol.contenido += "\n" + this.e_cases[i] + ":";
                let res = cases.traducir(tabla, arbol);
            }else if(cases instanceof Default){
                arbol.contenido += "\n" + this.e_default + ":";
                let res = cases.traducir(tabla, arbol);
            }
        }
        arbol.contenido += "\n" + e_f_ciclo + ":";
        arbol.etiquetas_fin.pop();   
    }

    ejecutar(tabla: Tabla, arbol:Arbol){
        const nueva_tabla = new Tabla(tabla);
        let res: Nodo;
        res = this.expresion.ejecutar(nueva_tabla, arbol);
        if (res instanceof Errror) {
            return res;
        }
        let def = true;
        let cont_def = null;
        for(let i = 0; i <  this.contenido.length; i++){
            let cases = this.contenido[i];
            if(cases instanceof Case){
                if(res == cases.expresion.ejecutar(nueva_tabla, arbol)){
                    def = false;
                    const cont = cases.ejecutar(nueva_tabla, arbol);
                    if(cont instanceof Continue || cont instanceof Break){
                        return null;
                    }
               
                    if(cont instanceof Return){
                        return cont;
                    }
                    
                   
                }
            }else if(cases instanceof Default && cont_def == null){
                cont_def = cases;
            }
        }
        if(def == true && cont_def != null){
            const cont = cont_def.ejecutar(nueva_tabla, arbol);
            if(cont instanceof Return){
                return cont;
            }
            if(cont instanceof Continue || cont instanceof Break){
                return null;
            }
       
        }
        return null;
    }
}
export{Switch};