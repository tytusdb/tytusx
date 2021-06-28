import { Expresion } from './../Interfaces/Expresion';
import Nodo from "./Nodo";
import Entorno from "../AST/Entorno";
import Simbolo from "../AST/Simbolo";
import Valor from "../AST/Valor";
export class Recorrer{


  constructor(){
  }


  Recorrido(Nodo:any,Entornito:Entorno,nombre:string){

    if(Nodo.Hijos.length!=undefined){
      console.log(Nodo.Hijos)
      Nodo.Hijos.forEach(elemento=>{
        if(Nodo.Etiqueta=="FUNCIONES_XQUERY"){
          console.log("Es una función");
          let valor=new Valor("FUNCION",elemento,"");
          let simbolito=new Simbolo(elemento.nombre,valor,nombre,elemento.linea,elemento.columna,-1);
          Entornito.Add(simbolito);
          let Entorno_For=new Entorno(Entornito);
          Entornito=Entorno_For;
          nombre=elemento.nombre
          if(elemento.parametros!=null){
            this.Recorrido(elemento.parametros,Entornito,nombre);
          }
          if(elemento.sentencias!=null){
            this.Recorrido(elemento.sentencias,Entornito,nombre);
          }
          if(elemento.tipoRetorno!=null){
            let valor=new Valor("TIPO_RETORNO",elemento.tipoRetorno.Hijos[0],"");
            let simbolito=new Simbolo("Retorno",valor,nombre,elemento.linea,elemento.columna,-1);
            Entornito.Add(simbolito);
          }else{
            //error semantico, debe retornar un tipo
          }
        }else if(Nodo.Etiqueta=="PARAMETROS"){
          if(elemento.Hijos!=undefined){
            this.Recorrido(elemento,Entornito,nombre);
          }else if(elemento.variable!=undefined){
            if(elemento.tipo.Hijos!=undefined){
              let valor=new Valor("PARAMETRO",elemento.tipo.Hijos[0],"");
              let simbolito=new Simbolo(elemento.variable,valor,nombre,elemento.linea,elemento.columna,-1);
              Entornito.Add(simbolito);
            }else{
              //error semántico, debe tener un tipo de dato
            }
          }
        }else if(Nodo.Etiqueta=="SENTENCIAS"){
          console.log("------entró a sentencias------");
          if(elemento.Hijos!=undefined){
            this.Recorrido(elemento,Entornito,nombre);
          }else{
            //no hay sentencias, debería ser un error pero no sé de que xd, creo que es imposible que entre aqui.
          }
        }else if(Nodo.Etiqueta=="LET"){
          if(Nodo.Hijos!=undefined){
            let cont=Nodo.Hijos[0];
            let valor=new Valor("Variable",cont.valor,"");
            let simbolito=new Simbolo(cont.nombre,valor,nombre,cont.linea,cont.columna,-1);
            Entornito.Add(simbolito);
          }
        }else if(Nodo.Etiqueta=="RETURN"){
          if (elemento.Expresion.Etiqueta!=undefined){
              if(elemento.Expresion.Etiqueta=="CONDICION"){
                let valor=new Valor("Condicion",elemento.Expresion.Hijos,"")
                let simbolito=new Simbolo("Return",valor,nombre,elemento.linea,elemento.columna,-1);
                Entornito.Add(simbolito);
              }else if(elemento.Expresion.Etiqueta=="VARIABLES"){
                let valor=new Valor("Variables",elemento.Expresion.Hijos,"")
                let simbolito=new Simbolo("Return",valor,nombre,elemento.linea,elemento.columna,-1);
                Entornito.Add(simbolito);
              }else if(elemento.Expresion.Etiqueta=="ETIQUETAS"){
                let valor=new Valor("Etiquetas",elemento.Expresion.Hijos,"")
                let simbolito=new Simbolo("Return",valor,nombre,elemento.linea,elemento.columna,-1);
                Entornito.Add(simbolito);
              }else if(elemento.Expresion.Etiqueta=="IF"){
                let valor=new Valor("If",elemento.Expresion.Hijos,"")
                let simbolito=new Simbolo("Return",valor,nombre,elemento.linea,elemento.columna,-1);
                Entornito.Add(simbolito);
                let Entornito_If=new Entorno(Entornito);
                Entornito=Entornito_If;
                this.Recorrido(elemento.Expresion,Entornito,"Return");
              }
          }
        }else if(Nodo.Etiqueta=="IF"){
          console.log(Nodo);
        }else if(Nodo.Etiqueta=="FOR"){

        }
      });
    }
  }



}
