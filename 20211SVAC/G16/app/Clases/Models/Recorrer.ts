import { Expresion } from './../Interfaces/Expresion';
import Nodo from "./Nodo";
import Entorno from "../AST/Entorno";
import Simbolo from "../AST/Simbolo";
import Valor from "../AST/Valor";
const TableSimbols=require("../AST/TSXQuery.js");
export class Recorrer{


  constructor(){
  }

  addSimbolsTable(object:any,entorno:Entorno):Entorno{
   return object.insertSimbolsTable(object,"Global",entorno);
  }

/*
  Recorrido(Nodo:any,Entornito:Entorno,nombre:string){
    let aux=Entornito;
    if(Nodo.Hijos!=undefined){
      Nodo.Hijos.forEach(elemento=>{
        if(Nodo.Etiqueta=="FUNCIONES_XQUERY"){
          console.log("Es una función");
          let valor=new Valor("FUNCION",elemento,"");
          let simbolito=new Simbolo(elemento.nombre,valor,nombre,elemento.linea,elemento.columna,-1);
          Entornito.Add(simbolito);
          let Entorno_Funcion=new Entorno(Entornito);
          Entornito=Entorno_Funcion;
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
                let Entornito_Return=new Entorno(Entornito);
                Entornito=Entornito_Return;
                this.Recorrido(elemento.Expresion,Entornito,"Return");
              }else{
                let valor=new Valor("Variables",elemento,"")
                let simbolito=new Simbolo("Return",valor,nombre,elemento.linea,elemento.columna,-1);
                Entornito.Add(simbolito);
              }
          }
        }else if(Nodo.Etiqueta=="IF"){
          let valor=new Valor("If",elemento,"")
          let simbolito=new Simbolo("If",valor,nombre,elemento.fila,elemento.columna,-1);
          Entornito.Add(simbolito);
          let Entornito_If=new Entorno(Entornito);
          Entornito=Entornito_If;
          if(elemento.sentencias!=null){
            this.Recorrido(elemento.sentencias,Entornito,"If");
          }
          if(elemento.sino!=null){
            this.Recorrido(elemento.sino,Entornito,"If");
          }
        }else if(Nodo.Etiqueta=="FOR"){
          let valor=new Valor("For",elemento,"")
          let simbolito=new Simbolo("For",valor,nombre,elemento.linea,elemento.columna,-1);
          Entornito.Add(simbolito);
          let Entornito_For=new Entorno(Entornito);
          Entornito=Entornito_For;
          if(elemento.variable!=""){
          let valor=new Valor("Variable",elemento.variable,"")
          let simbolito=new Simbolo("Variable",valor,"For",elemento.linea,elemento.columna,-1);
          Entornito.Add(simbolito);
          }
          if(elemento.variable2!=""){
            let valor=new Valor("Variable",elemento.variable,"")
            let simbolito=new Simbolo("Variable",valor,nombre,elemento.linea,elemento.columna,-1);
            Entornito.Add(simbolito);
          }
          if(elemento.variable=="" && elemento.variable=="" && elemento.condiciones!=null){
            this.Recorrido(elemento.condiciones,Entornito,"For");
          }else{
            //error semántico
          }
          if(elemento.contenido!=null){
            for(let i=0;i<elemento.contenido.Hijos.length;i++){
              this.Recorrido(elemento.contenido.Hijos[i],Entornito,"For");
            }
          }
        }else if(Nodo.Etiqueta=="LOOP"){
          if(elemento.variable!=undefined || elemento.variable!=""){
            let valor=new Valor("Variable",elemento,"")
            let simbolito=new Simbolo("Variable",valor,nombre,elemento.linea,elemento.columna,-1);
            Entornito.Add(simbolito);
          }else{
            // error semántico
          }
        }else if(Nodo.Etiqueta=="ORDER_BY"){
          let valor=new Valor("Order_By",elemento,"")
          let simbolito=new Simbolo("Order_By",valor,nombre,elemento.linea,elemento.columna,-1);
          Entornito.Add(simbolito);
          console.log("pasó por el order by ")
        }else if(Nodo.Etiqueta=="WHERE"){
          let valor=new Valor("Where",elemento,"")
          let simbolito=new Simbolo("Where",valor,nombre,elemento.linea,elemento.columna,-1);
          Entornito.Add(simbolito);
          console.log("pasó por el where")
        }
      });
    }
    Entornito=aux;
    return Entornito;
  }
*/
}
