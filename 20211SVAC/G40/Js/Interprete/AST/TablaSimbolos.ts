import { Entorno } from "./Entorno";
import { Objeto } from "../Expresiones/Objeto";
import { Simbolo } from "./Simbolo";
import { Tipo } from "./Tipo";
import { Atributo } from "../Expresiones/Atributo";

export class TablaSimbolo{

    entornoGlobal: Entorno;

    constructor(){
        this.entornoGlobal = new Entorno(null);
    }


    LlenarTabla(entornoPadre:Entorno, objetos:Objeto[]){

        objetos.forEach((element:Objeto) => {

            const entornoObjeto:Entorno = new Entorno(entornoPadre);
            if(element.listaAtributos.length>0){
                element.listaAtributos.forEach((atributo:Atributo) => {
                    const simbolo:Simbolo = new Simbolo(Tipo.ATRIBUTO,atributo.identificador,atributo.linea,atributo.columna, atributo.valor);
                    entornoObjeto.agregar(simbolo.indentificador, simbolo); 
                });           
            } 

            if(element.listaObjetos.length>0){
                this.LlenarTabla(entornoObjeto,element.listaObjetos);
            }

            element.entorno = entornoObjeto;
            const simbolo:Simbolo = new Simbolo(Tipo.STRUCT,element.identificador1,element.linea,element.columna, element);
            entornoPadre.agregar(simbolo.indentificador,simbolo);

        });
    }

  


    setEntornoGlobal(entorno:Entorno){
        this.entornoGlobal = entorno;
    }
}