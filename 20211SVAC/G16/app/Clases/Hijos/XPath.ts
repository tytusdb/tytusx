import Entorno from "../AST/Entorno";
import { Expresion } from "../Interfaces/Expresion";
import { Formato } from "../Models/Formato.js";
const TablaSim=require("../XPath/TablaSimbolosXP.js");
const parserXpathAsc=require('../../../Gramaticas/XPathA.js');
export class XPath implements Expresion{
  xpath:any;
  encoding:string;
  padre=[];
  lista=[];
  constructor(xpath:any){
    this.xpath=xpath
  }
  ejecutar(entorno: Entorno, node: any) {
    TablaSim.TablaSimbolosXP.clear()
    let x = parserXpathAsc.parse(this.xpath);
    this.RecorrerAbstractas()
    return {array:this.padre,xpath:this.xpath}
  }
  RecorrerAbstractas(){
    this.encoding = localStorage.getItem("encoding");
    this.padre = []
    this.lista = []
    if(TablaSim.TablaSimbolosXP.getSimbolos().length>0){
      for (let i=0; i < TablaSim.TablaSimbolosXP.getSimbolos().length; i++){
        this.lista.push(TablaSim.TablaSimbolosXP.getSimbolos()[i])
      }
    }
    this.padre = JSON.parse(localStorage.getItem("tablaSimbolo"))
    this.padre = this.padre[0]
    localStorage.setItem("dad", JSON.stringify(this.padre))
    this.lista.forEach(element => {
      this.padre = JSON.parse(localStorage.getItem("dad"))
      element.execute(this.padre);
    });
    try{
      this.padre = JSON.parse(localStorage.getItem("dad"))
      return this.padre
     /* const formato = new Formato(this.padre, this.encoding);
      var y = formato.darFormato()
      console.log(y)*/

    }catch{
      let textopadre = localStorage.getItem("dad")
      return textopadre
    }
  }



}
