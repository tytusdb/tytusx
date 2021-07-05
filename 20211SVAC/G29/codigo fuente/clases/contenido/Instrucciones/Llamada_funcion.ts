import {Nodo} from '../AST/Nodo';
import {Tabla} from '../AST/Tabla';
import {Arbol} from '../AST/Arbol';
import {Tipo} from '../AST/Tipo';
import {Errror} from '../AST/Errror';
import { Simbolo } from '../AST/Simbolo';
import {tipos} from '../AST/Tipo';
import { Funcion } from '../Instrucciones/Funcion';
import { Expression } from '@angular/compiler';


class Llamada_funcion extends Nodo{
    nombre: string;
    parametros: Array<Nodo>;
    funcion: Object;
    id: string;
    graph :string = "";
    tmp :string = "";
    llamada_anterior: string ="";
    constructor(nombre:string, parametros: Array<Nodo>, linea:number, columna:number){
        super(null,linea, columna);
        this.nombre = nombre;
        this.parametros = parametros;
    }
    generar_id(){
        this.id = "funcion#_" + this.nombre;
    }
    get_tipo_(tabla: Tabla){
        this.generar_id();
        this.buscar_funcion(tabla);
        return this.tipo;
    }
    get_tipo(){
        return this.tipo;
    }

    buscar_funcion(tabla:Tabla){
        this.generar_id();
        let val = tabla.get_var(this.id);
        if(val != null){
            this.tmp = val.tmp;
            this.funcion =  val.valor;
            this.tipo = new Tipo(tipos.ANY);
            if(this.funcion instanceof Funcion){
                this.tipo = this.funcion.tipo;
            }

        }
    }
    traducir(tabla: Tabla, arbol: Arbol){
        this.buscar_funcion(tabla);
        if(this.funcion instanceof Funcion){

            let f_tmp:Funcion = this.funcion;
            this.parametros.forEach(element => {
                if(element instanceof Llamada_funcion){
                    element.traducir(tabla, arbol);
                }
            });

            if(this.parametros.length == f_tmp.parametros.length){

                arbol.contenido += "\n//---------- Llamada de funcion "+f_tmp.nombre +" -------------\n";
                if(tabla.t_anterior == null){
                    arbol.contenido += "\n" + this.tmp + " = 10000;";
                }else{
                    /*AGREGANDO RETURN*/
                    if(arbol.tmp_return.length > 0){
                        let tmp = arbol.tmp_return.pop();
                        arbol.tmp_return.push(tmp);
                        arbol.contenido += "\nstack[(int) " + this.tmp + "] = " +tmp + ";"
                        arbol.contenido += "\n" + this.tmp + " = " + this.tmp + " + 1;";
                    }
                    if(this.tipo.type != tipos.VOID){
                        arbol.contenido += "\n" + this.tmp + " = " + this.tmp + " + 1;";
                    }
                }

                for(let i = 0; i < this.parametros.length; i++){
                    arbol.contenido += "\n//---------  Parametro "+f_tmp.parametros[i].id + " ------------\n";
                   if(tabla.t_anterior != null){
                            let aux = arbol.generar_temporal();
                            arbol.contenido += "\n" + aux + " = stack[(int)" + this.funcion.tmp_param[i] + "];";
                            arbol.contenido += "\nstack[(int) " + this.tmp + "] = " +aux + ";"
                            arbol.contenido += "\n" + this.tmp + " = " + this.tmp + " + 1;";
                    }
                    let llamada = this.parametros[i];
                            if(llamada instanceof Llamada_funcion){
                                arbol.contenido += "\n" + f_tmp.tmp_param_val[i] + " = " + llamada.llamada_anterior + ";";

                            }else{
                                let res = this.parametros[i].traducir(tabla, arbol);
                               arbol.contenido += "\n" + f_tmp.tmp_param_val[i] + " = " + res + ";";
                            }
                    //PARA HACKERMAN
                }

                arbol.contenido += "\n" + f_tmp.nombre + "();";

                if(this.tipo.type == tipos.VOID){
                    if(tabla.t_anterior != null){
                        arbol.contenido += "\n//---------  Obteniendo parametros ------------\n";
                        for(let i = this.parametros.length-1; i >= 0; i--){
                            arbol.contenido += "\n//---------  Parametro "+f_tmp.parametros[i].id + " ------------\n";
                            let aux = arbol.generar_temporal();
                            arbol.contenido += "\n" + this.tmp + " = " + this.tmp + " - 1;";
                            arbol.contenido += "\n" + aux + " = stack[(int)" + this.tmp + "];";
                            arbol.contenido += "\nstack[(int) " + this.funcion.tmp_param[i] + "] = " +aux + ";"

                        }

                    }
                }else{
                    let retorno = arbol.generar_temporal();
                    if(tabla.t_anterior != null){
                        arbol.contenido += "\n" + retorno + "= stack[(int) " + this.tmp + "];";
                        arbol.contenido += "\n//---------  Obteniendo parametros ------------\n";
                        for(let i = this.parametros.length-1; i >= 0; i--){
                            arbol.contenido += "\n//---------  Parametro "+f_tmp.parametros[i].id + " ------------\n";
                            let aux = arbol.generar_temporal();
                            arbol.contenido += "\n" + this.tmp + " = " + this.tmp + " - 1;";
                            arbol.contenido += "\n" + aux + " = stack[(int)" + this.tmp + "];";
                            arbol.contenido += "\nstack[(int) " + this.funcion.tmp_param[i] + "] = " +aux + ";"

                        }

                    }
                    if(tabla.t_anterior != null){
                        arbol.contenido += "\n" + this.tmp + " = " + this.tmp + " - 1;";
                    }
                    let auxtmp = arbol.generar_temporal();

                    if(tabla.t_anterior == null){
                        arbol.contenido += "\n" + auxtmp  +"=stack[(int) " + this.tmp + "];";
                        return auxtmp;
                    }else{
                        if(arbol.tmp_return.length > 0){
                            let tmp = arbol.tmp_return.pop();
                            arbol.contenido += "\n" + this.tmp + " = " + this.tmp + " - 1;";
                            arbol.contenido += "\n" + tmp  +"=stack[(int) " + this.tmp + "];";

                        }
                        arbol.tmp_return.push(retorno);
                        this.llamada_anterior = retorno;
                        return retorno;
                    }
                }

            }else{
                const error = new Errror('Semantico',
                "Error en llamada de funcion : " + this.nombre + " Cantidad de parametros no cumple." ,
                this.linea, this.columna);
                arbol.errores.push(error);
                arbol.consola.push(error.toString());
                return error;
            }
        }else{
            const error = new Errror('Semantico',
            "Error en llamada de funcion sin declarar: " + this.nombre + " ." ,
            this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return error;
        }
      return null;
    }

    ejecutar(tabla:Tabla, arbol:Arbol): any{
        this.buscar_funcion(tabla);
        if(this.nombre == "graficar_ts"){
           this.graficar_ts(tabla, arbol);
        } else if(this.funcion instanceof Funcion){
            if(this.funcion.parametros.length != this.parametros.length){
                const error = new Errror('Semantico',
                "Error en llamada de funcion: \"" + this.id + "\". La cantidad de parametros no cumple." ,
                this.linea, this.columna);
                arbol.errores.push(error);
                arbol.consola.push(error.toString());
                return error;
            }
            let si_llama = true;
            for(let  i = 0; i < this.funcion.parametros.length; i++){
                let tipo2:Tipo = null;
                let parametro = this.parametros[i];
                if(parametro instanceof Llamada_funcion){
                    parametro.get_tipo_(tabla);

                }
                parametro.ejecutar(tabla,arbol);
                tipo2 = parametro.tipo;
                if(this.funcion.parametros[i].tipo.type != tipo2.type){
                    si_llama = false;
                }
            }
            if(!si_llama){
                const error = new Errror('Semantico',
                "Error en llamada de funcion: " + this.id + " El orden de parametros no cumple." ,
                this.linea, this.columna);
                arbol.errores.push(error);
                arbol.consola.push(error.toString());
                return error;
            }
            for(let i = 0; i <  this.parametros.length; i++){
                this.funcion.cont_parametros[i] = this.parametros[i];
            }
            let ast = this.funcion.ejecutar(tabla, arbol);
            return ast;
        }else{
            const error = new Errror('Semantico',
            "Error en llamada de funcion sin declarar: " + this.nombre + " ." ,
            this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return error;
        }
    }
}

export{Llamada_funcion};
