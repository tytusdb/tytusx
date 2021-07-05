import {Nodo} from '../AST/Nodo';
import {Tabla} from '../AST/Tabla';
import {Arbol} from '../AST/Arbol';
import {Tipo} from '../AST/Tipo';
import {Errror} from '../AST/Errror';
import { Simbolo } from '../AST/Simbolo';
import {tipos} from '../AST/Tipo';
import { Return } from '../Expresiones/Return';
import { Declaracion } from './Declaracion';

class Funcion extends Nodo{

    nombre: string;
    id: string;
    parametros: Array<Declaracion>;
    cont_parametros: Array<Nodo>;
    tmp_param_val: Array<string>;
    tmp_param: Array<string>;
    contenido: Array<Nodo>;
    guardada: boolean;
    pila_llamada: Array<string>;
    tmp_principal: string;
  
    constructor(nombre: string, parametros: Array<Declaracion>, contenido: Array<Nodo>, tipo:Tipo, linea: number, columna: number){
        if(tipo == null){
            tipo = new Tipo(tipos.ANY);
        }
        super(tipo, linea, columna);
        this.nombre = nombre;
        this.contenido = contenido;
        this.parametros = parametros;
        this.generar_id();
        this.guardada = false;
        this.cont_parametros = [];
        this.tmp_param = [];
        this.tmp_param_val = [];
        this.pila_llamada = [];
        this.tmp_principal  = "";
    }

    traducir(tabla: Tabla, arbol: Arbol){
        let simbolo: Simbolo;
        arbol.contador_p = 0;
        let e_return = arbol.generar_etiqueta();
        arbol.etiquetas_return.push(e_return);
        simbolo = new Simbolo(this.tipo, this.id, this, this.linea, this.columna);
        const resp = tabla.set_variable(simbolo);
        if(resp != null){
            const error = new Errror('Semantico',"Ya esta declarada la funcion", this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
        }
        const nueva_tabla = new Tabla(tabla);
        arbol.contenido += "\nvoid " + this.nombre + "(){";
        let tmp_return  = arbol.generar_temporal();
        arbol.return_principal = tmp_return;
        //arbol.tmp_return.push(tmp_return);
        simbolo.tmp = tmp_return;
        this.parametros.forEach(element => {
            arbol.contenido += "\n\n//----------- Parametro "+ element.id+" -----------";
            element.traducir(nueva_tabla, arbol);
            let aux = "t" + arbol.contador_tmp;
            arbol.contenido += "\nstack[(int) " + aux + "] = ";
            let tmp = arbol.generar_temporal();
            arbol.contenido += tmp + ";";
            this.tmp_param_val.push(tmp);
            this.tmp_param.push(aux);  
        });
        arbol.contenido += "\n//------------- Fin de parametros --------/\n\n//---------- Contenido funcion ---------";
        for(let i = 0; i < this.contenido.length; i++){
            arbol.tmp_return = [];
            let res = this.contenido[i].traducir(nueva_tabla,arbol);
        }

        arbol.contenido += "\n//--------- Etiqueta Return de la funcion " + this.nombre +" ----------\n" + e_return + ":\nreturn;";
        arbol.contenido += "\n}";
        //arbol.tmp_return.pop();
        arbol.etiquetas_return.pop();
        arbol.contador_p = 0;
        return tmp_return;
    }

    
    guardar_funcion(tabla: Tabla, arbol:Arbol){
        let simbolo: Simbolo;
        simbolo = new Simbolo(this.tipo, this.id, this, this.linea, this.columna);
        const resp = tabla.set_variable(simbolo);
        if(resp != null){
            const error = new Errror('Semantico',"Ya esta declarada la funcion", this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
        }
        arbol.cabecera += "\nvoid " + this.nombre + "();";
        
    }

    generar_id(){
        this.id = "funcion#_" + this.nombre;
    }
    
    ejecutar(tabla: Tabla, arbol: Arbol):Object{
        let val = null;
        const nueva_tabla = new Tabla(tabla);
        let cont_aux = [];
        for(let i = 0; i < this.parametros.length; i++){
            this.parametros[i].valor = this.cont_parametros[i];
            cont_aux.push(this.parametros[i]);
        }
        this.contenido.forEach(element => {
            cont_aux.push(element);
        });

        for(let i = 0; i < cont_aux.length; i++){
            let res = cont_aux[i].ejecutar(nueva_tabla,arbol);
            if(res instanceof Return){
                if(res.tipo.type != this.tipo.type && this.tipo.type != tipos.ANY){
                    const error = new Errror('Semantico',"El tipo de dato del return no es igual al de la funcion", this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.toString()); 
                    return "Undefined";    
                }
                if(res.valor != null){
                    return res.valor;
                }
                return null;
            }
        }
        return null;
    }
}

export {Funcion};