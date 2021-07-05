import { Arbol } from '../AST/Arbol';
import { Errror } from '../AST/Errror';
import { Nodo } from "../AST/Nodo";
import { Tabla } from '../AST/Tabla';
import { tipos } from '../AST/Tipo';
import { Break } from '../Expresiones/Break';
import { Continue } from '../Expresiones/Continue';
import { Return } from '../Expresiones/Return';
import { Asignacion } from './Asignacion';
import { Declaracion } from './Declaracion';

class For extends Nodo{

    exp1:Object;
    exp2:Nodo;
    exp3:Asignacion;
    contenido: Array<Nodo>;

    constructor(exp1:Object, exp2:Nodo, exp3:Asignacion, contenido: Array<Nodo>,linea:number, columna:number){
        super(null, linea, columna);
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.exp3 = exp3;
        this.contenido = contenido;
    }
    traducir(tabla: Tabla, arbol: Arbol){
        let nueva_tabla = new Tabla(tabla);
        let cond;
        if(this.exp1 instanceof Declaracion || this.exp1 instanceof Asignacion){
            this.exp1.traducir(nueva_tabla, arbol);
        }
        let e_inicio = arbol.generar_etiqueta();
        let e_si = arbol.generar_etiqueta();
        let e_no = arbol.generar_etiqueta();
        let e_fin = arbol.generar_etiqueta();

        arbol.contenido += "\n" + e_inicio + ":";

        cond = this.exp2.traducir(nueva_tabla, arbol);

        arbol.contenido += "\nif(" + cond + " == 1) goto " + e_si + ";";
        arbol.contenido += "\ngoto " + e_no + ";";
        arbol.contenido += "\n" + e_si + ":";

        for (let i = 0; i < this.contenido.length; i++) {
            const cont = this.contenido[i].traducir(nueva_tabla, arbol);
        }
        this.exp3.traducir(nueva_tabla, arbol);
        arbol.contenido += "\ngoto " + e_inicio + ";";
        arbol.contenido += "\n" + e_no + ":";
        arbol.contenido += "\ngoto " + e_fin + ";";
        arbol.contenido += "\n" + e_fin + ":";
        return null;
    }


    ejecutar(tabla: Tabla, arbol: Arbol){
        let nueva_tabla = new Tabla(tabla);
        let res;
        let contador = 0;
        if(this.exp1 instanceof Declaracion || this.exp1 instanceof Asignacion){
            this.exp1.ejecutar(nueva_tabla, arbol);
        }
        do {
            nueva_tabla = new Tabla(nueva_tabla);
            res = this.exp2.ejecutar(nueva_tabla, arbol);
            if (res instanceof Error) {
                return res;
            }

            if (this.exp2.tipo.type != tipos.BOOLEAN) {
                const error = new Errror('Semantico',
                    `Se esperaba una expresion booleana para la condicion`,
                    this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.toString());
                    return error;
              }

            if(res){
                for (let i = 0; i < this.contenido.length; i++) {
                    const cont = this.contenido[i].ejecutar(nueva_tabla, arbol);
                    if(cont instanceof Return){
                        return cont;
                    }
                    if(cont instanceof Continue || cont instanceof Break){
                        return null;
                    }
                }
            }else{
                return null;
            }
            contador++;
            this.exp3.ejecutar(nueva_tabla,arbol);
            } while (res && contador < 99999999);
      return null;
    }
}
export{For};
