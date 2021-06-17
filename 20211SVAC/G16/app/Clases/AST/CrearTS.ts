import Objeto from "../Models/Objeto";
import {AST} from "../AST/AST"
import Entorno from "./Entorno";
import Simbolo from "./Simbolo";
import Valor from "./Valor";
import Raiz from "../Models/Raiz";
const errores=require('../Models/ListaError.js')
const nodoError=require('../Models/Errores.js')

export default class Crear{

  global:Entorno=new Entorno(null);
  constructor(){}


  agregar(Elemento:any, ambito:string){
    if(Elemento!=undefined){
      Elemento.forEach(element => {
        if(element.lista!=undefined){
          this.agregar(element.lista,ambito);
        }else{
          if(element.texto!=undefined){

            let elementos=element;
            if(elementos.nombreInit!=elementos.nombreFin && elementos.unica==false){
              errores.Errores.add(new nodoError.Error("Semántico","Las etiquetas de apertura y "+
              "cierre son diferentes: "+elementos.nombreInit+", "+elementos.nombreFin,elementos.linea,elementos.columna,"XML"));
            }
            if(elementos.texto!=""){
              const valor:Valor=new Valor("Texto",elementos);
              const simbolo:Simbolo=new Simbolo(elementos.nombreInit,valor,ambito,elementos.linea,elementos.columna);
              this.global.Add(simbolo);
            }else if(elementos.elementos!=null){

              const valor:Valor=new Valor("Elementos",elementos);
              const simbolo:Simbolo=new Simbolo(elementos.nombreInit,valor,ambito,elementos.linea,elementos.columna);
              this.global.Add(simbolo);
              this.agregar(elementos.elementos.lista,elementos.nombreInit);
            }else{

              const valor:Valor=new Valor("Vacio",elementos);
              const simbolo:Simbolo=new Simbolo(elementos.nombreInit,valor,ambito,elementos.linea,elementos.columna);
              this.global.Add(simbolo);

            }
            if(elementos.atributos!=undefined && elementos.atributos!=null){
              if(elementos.atributos.lista!=undefined){
                this.agregar(elementos.atributos.lista,elementos.nombreInit);
              }else{
                let el=elementos.atributos[0];
                const valor:Valor=new Valor("Atributo",el.valor);
                const simbolo:Simbolo=new Simbolo(el.identificador,valor,elementos.nombreInit,el.linea,el.columna);
                this.global.Add(simbolo);

              }

            }
        }
        if(element.identificador!=undefined){
          let elementos=element;
          const valor:Valor=new Valor("Atributo",elementos);
          const simbolo:Simbolo=new Simbolo(element.identificador,valor,ambito,elementos.linea,elementos.columna);
          this.global.Add(simbolo);

        }

      }

    });
    }
  }

  getTabla(){
    return this.global.Get();
  }
}

