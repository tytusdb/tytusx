import { Nodo } from '../AST/Nodo';
import { Tabla } from '../AST/Tabla';
import { Arbol} from '../AST/Arbol';
import { Errror } from '../AST/Errror';
import { tipos } from '../AST/Tipo';
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Return } from '../Expresiones/Return';

class If extends Nodo {
    condicion: Nodo;
    lista_if: Array<Nodo>;
    lista_else: Array<Nodo>;
    etiqueta_i: string = '';
    etiqueta_f: string = '';
    constructor(condicion: Nodo, lista_if: Array<Nodo>, lista_else: Array<Nodo>, linea: number, columna: number) {
        super(null, linea, columna);
        this.condicion = condicion;
        this.lista_if = lista_if;
        this.lista_else = lista_else;
    }
    traducir(tabla: Tabla, arbol: Arbol){
        const nueva_tabla = new Tabla(tabla);
        let cond = this.condicion.traducir(nueva_tabla, arbol);
        if (cond instanceof Errror) {
            return cond;
        }
        if (this.condicion.tipo.type !== tipos.BOOLEAN) {
            const error = new Errror('Semantico',
                `condicion incorrecta`,
                this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return error;
        }
        arbol.contenido += "\n/*****SENTENCIA IF****/";
      
        let e_if = arbol.generar_etiqueta();
        let e_else = arbol.generar_etiqueta();
        let e_fin = arbol.generar_etiqueta();
        
        arbol.contenido += "\nif(" + cond + " == 1) goto " + e_if +";";
        arbol.contenido += "\ngoto " + e_else + ";";
        arbol.contenido += "\n" + e_if + ":";
        for (let i = 0; i < this.lista_if.length; i++) {                
            const cont = this.lista_if[i].traducir(nueva_tabla, arbol);
            if(cont instanceof Return){
                let e_retrn = arbol.etiquetas_return.pop();
                arbol.etiquetas_return.push(e_retrn);
                arbol.contenido += "\ngoto " + e_retrn + ";";
            }
        }
        arbol.contenido += "\ngoto " + e_fin + ";";
        arbol.contenido += "\n" + e_else + ":";
        if(this.lista_else.length > 0){
            arbol.contenido += "\n//--------- SENTENCIA ELSE ------------------";    
        }
        for (let i = 0; i < this.lista_else.length; i++) {                
            const cont = this.lista_else[i].traducir(nueva_tabla, arbol);
            if(cont instanceof Return){
                let e_retrn = arbol.etiquetas_return.pop();
                arbol.etiquetas_return.push(e_retrn);
                arbol.contenido += "\ngoto " + e_retrn + ";";
            }
        }
        arbol.contenido += "\n" + e_fin + ":";
        return null;
    }

    ejecutar(tabla: Tabla, arbol: Arbol) {
        const nueva_tabla = new Tabla(tabla);
        let res: Nodo;
        res = this.condicion.ejecutar(nueva_tabla, arbol);
        if (res instanceof Errror) {
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

        if (res) {

            for (let i = 0; i < this.lista_if.length; i++) {                
                const cont = this.lista_if[i].ejecutar(nueva_tabla, arbol);
                if(cont instanceof Return){
                    return cont;
                }
                if(cont instanceof Continue || cont instanceof Break){
                    return null;
                }
            }
        } else {  
            for (let i = 0; i < this.lista_else.length; i++) {
                const cont = this.lista_else[i].ejecutar(nueva_tabla, arbol);
                if(cont instanceof Return){
                    return cont;
                }
                if(cont instanceof Continue || cont instanceof Break){
                    return null;
                }
            }
        }
        return null;
    }
}
export{If};
