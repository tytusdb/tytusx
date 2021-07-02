import { Entorno } from "../ArbolST/Entorno";
import { Simbolo } from "../ArbolST/Simbolo";
import { Elemento_tabla, tabla_simbolos } from '../ArbolST/TablaSimbolos';
import { Tipos } from "../ArbolST/Tipos";
import { Instruccion } from "../Interfaces/Instruccion";

export class ReporteSimbolos  {
    constructor(linea : number, columna : number){
        
    }

    public ejecutar(entorno: Entorno) {
        let ent : Entorno | null = entorno;
        //console.log("entro a graficar");
        console.log('entorno', ent);
        let a = 0;
        tabla_simbolos.push();
        while(ent != null){
          
          for(var [llave_variable, valor_variable] of Entorno[a]){
              let elemento = {
                ambito : "",
                nombre : "",
                tipo : "",
                fila : 0,
                columna : 0
              };
              elemento.nombre = llave_variable;
              if(ent.comprobar == null){
                  elemento.ambito = "global";
              }else{
                  elemento.ambito = "local"
              }
              if(valor_variable.tipo == Tipos.INT){
                  elemento.tipo = "number"
              }else if(valor_variable.tipo == Tipos.STRING){
                  elemento.tipo = "string";
              }else if(valor_variable.tipo == Tipos.VOID){
                  elemento.tipo = "undefined";
              }else{
                  elemento.tipo = (valor_variable.tipo);
              }
              elemento.fila = (valor_variable.linea);
              elemento.columna = (valor_variable.columna);
              tabla_simbolos.push(new Elemento_tabla(elemento.nombre, elemento.ambito, elemento.tipo, elemento.fila, elemento.columna));
          }
          console.log('paso');
          for(var [llave_funcion, valor_funcion] of Entorno[a]){
            let elemento = {
              ambito : "",
              nombre : "",
              tipo : "",
              fila : 0,
              columna : 0
            };
            elemento.nombre = llave_funcion;
            if(ent.getSimbolo== null){
                elemento.ambito = "global";
            }else{
                elemento.ambito = "local"
            }
            
            elemento.fila = (valor_funcion.linea);
            elemento.columna = (valor_funcion.columna);
            tabla_simbolos.push(new Elemento_tabla(elemento.nombre, elemento.ambito, elemento.tipo, elemento.fila, elemento.columna));
          }
      
      }
    }
}