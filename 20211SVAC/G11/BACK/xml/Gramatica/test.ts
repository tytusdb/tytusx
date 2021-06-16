import { AST } from "../scripts/typescript/AST";
import { Entorno } from "../scripts/typescript/Entorno";
import { Elemento } from "../scripts/typescript/Elemento";
import { Atributo } from "../scripts/typescript/Atributo";
import { Simbolo } from "../scripts/typescript/Simbolo";
import { Tipo } from "../scripts/typescript/Tipo";

import parsergramar  from './gramar';

function ejecutarCodigo(entrada:string){
    const objetos = parsergramar.parse(entrada);
    const tabla =  setTable(objetos);

    console.log(tabla);   
}

function pilitatablaSimbolos(element:Elemento, padreEntorno:Entorno){
        const entornoObjeto:Entorno = new Entorno(null);
        entornoObjeto.anterior= padreEntorno;
        padreEntorno.hijitos.push(entornoObjeto);
        if(element.listaAtributos.length > 0){
            element.listaAtributos.forEach((atributo:Atributo) => {
                const simbolo:Simbolo = new Simbolo(Tipo.ATRIBUTO,atributo.identificador,atributo.linea,atributo.columna,atributo.valor);
                entornoObjeto.agregar(simbolo.indentificador,simbolo);
            });
        }

        if(element.listaElementos.length > 0){
            element.listaElementos.forEach((elemento:Elemento) => {
                const simbolo:Simbolo = new Simbolo(Tipo.ELEMENTO,elemento.identificador,elemento.linea,elemento.columna,elemento);
                entornoObjeto.agregar(simbolo.indentificador,simbolo);
                return pilitatablaSimbolos(elemento,entornoObjeto);
            });
        }else{
            return  element.entorno= entornoObjeto;
        }
}

function setTable(objetos: any){
    const entornoGlobal:Entorno = new Entorno(null);
    objetos.forEach((element:Elemento) => {
        pilitatablaSimbolos(element, entornoGlobal);
        const simbolo:Simbolo = new Simbolo(Tipo.ELEMENTO,element.identificador,element.linea,element.columna,element);
        entornoGlobal.agregar(simbolo.indentificador, simbolo);
    });
    return entornoGlobal;
}
