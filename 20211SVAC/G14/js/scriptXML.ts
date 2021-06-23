import { Objeto } from "../InterpreteXML/Expresion/Objeto";
import { Atributo } from "../InterpreteXML/Expresion/Atributo";
import { Simbolo } from "../InterpreteXML/TablaSimbolo/Simbolo";
import { TipoDato } from "../InterpreteXML/TablaSimbolo/TipoDato";
import NodoAST from "../InterpreteXPath/AST/NodoAST";
import { Etiqueta } from "../InterpreteXPath/AST/Etiqueta";
import { Expresion } from "../InterpreteXPath/Interface/Expresion";

const gramaticaAsc = require("../InterpreteXML/GrammerXML/AscGrammer");
const gramaticaDesc = require("../InterpreteXML/GrammerXML/DescGrammer");
const gramaticaXpathAsc = require("../InterpreteXPath/GramaticaXPath/xpathAsc");

var dot = "";
var c = 0;

function ParsearAsc(entrada: string): any {
  const objetos = gramaticaAsc.parse(entrada);
  //console.log(objetos);
  return objetos;
}

function ParsearDesc(entrada: string): any {
  const objetos = gramaticaDesc.parse(entrada);
  //console.log(objetos);
  return objetos;
}

function ParsearAscPath(entrada: string): any{
  const xpath = gramaticaXpathAsc.parse(entrada);
  return xpath;
}

function Graficar(datos: Array<any>) {
  let instr:NodoAST = new NodoAST("INICIO");
  datos.forEach((element: Objeto) => {
    instr.addHijo(element.obtenerNodos()[0]);
  });

  let grafo:string = "";
  grafo = getDot(instr);
}

function GraficarAST(datos: Array<any>) {
let instr:NodoAST = new NodoAST("INICIO");
  datos.forEach((element: Expresion) => {
    instr.addHijo(element.ast());
  });

  var grafo = "";
  grafo = getDot(instr);
}

function getDot(raiz: NodoAST) {
  dot = "";
  dot += "digraph {\n";
  dot += 'n0[label="' + raiz.getValor().replace(/\"/g, "") + '"];\n';
  c = 1;
  recorrerAST("n0", raiz);
  dot += "}";
  return dot;
}

function recorrerAST(padre: string, nPadre: NodoAST) {
  for (let hijo of nPadre.getHijos()) {
    var nombreHijo = "n" + c;
    dot += nombreHijo + '[label="' + hijo.getValor().replace(/\"/g, "") + '"];\n';
    dot += padre + "->" + nombreHijo + ";\n";
    c++;
    recorrerAST(nombreHijo, hijo);
  }
}

function BuildSimbolTable(listado:any): Simbolo{
  let global: Simbolo = new Simbolo("Global", TipoDato.ARRAY, "", 0, 0);

  let root: Simbolo = new Simbolo(
    listado.identificador,
    TipoDato.ETIQUETA,
    listado.texto,
    listado.linea,
    listado.columna
  );
  global.entorno.push(root);
  buildGlobal(root, listado);
  return global;
}

function buildGlobal(entorno: Simbolo, padre: Objeto) {
  if (padre.lista != null) {
    getEtiqueta(entorno, padre.lista, TipoDato.ATRIBUTO)
  }
  if (padre.listaObjetos != null) {
    getEtiqueta(entorno, padre.listaObjetos, TipoDato.ETIQUETA);
  }
}

function getEtiqueta(entorno: Simbolo, padre: Etiqueta, tipo: TipoDato) {
  if (padre.etiqueta != null) {
    if( padre.etiqueta.identificador == "objeto" || padre.etiqueta.identificador == "atributo")
    {
      getEtiqueta(entorno, padre.etiqueta, tipo)
  
    }else{
      if (tipo == TipoDato.ATRIBUTO) {

        getValorAtributo(entorno, padre.etiqueta)
      } else {
  
        getValorObjeto(entorno, padre.etiqueta)
      }
    }
    }
  if (padre.valor != null) {
    if(padre.valor.identificador === "objeto" || padre.valor.identificador === "atributo"){
      getEtiqueta(entorno, padre.valor, tipo)
    }else{
      if (tipo == TipoDato.ATRIBUTO) {

        getValorAtributo(entorno, padre.valor)
      } else {
  
        getValorObjeto(entorno, padre.valor)
      }
    }
    
  }
}

function getValorAtributo(entorno: Simbolo, padre: Atributo) {
  let cont: number = BuscarRepetido(entorno, padre.identificador);
  let root: Simbolo
  if (cont > 0) {
    root = new Simbolo(
      padre.identificador,
      TipoDato.ATRIBUTO,
      padre.valor,
      padre.fila,
      padre.columna,
      cont
    )
  } else {
    root = new Simbolo(
      padre.identificador,
      TipoDato.ATRIBUTO,
      padre.valor,
      padre.fila,
      padre.columna
    )
  }

  entorno.entorno.push(root)
}

function getValorObjeto(entorno: Simbolo, padre: Objeto) {
  let cont: number = BuscarRepetido(entorno, padre.identificador);
  let root: Simbolo
  if (cont > 0) {
    root = new Simbolo(
      padre.identificador,
      TipoDato.ETIQUETA,
      padre.texto,
      padre.fila,
      padre.columna,
      cont
    )
  } else {
    root = new Simbolo(
      padre.identificador,
      TipoDato.ETIQUETA,
      padre.texto,
      padre.fila,
      padre.columna
    )
  }

  entorno.entorno.push(root)
  if (padre.lista != null || padre.listaObjetos != null) {
    buildGlobal(root, padre)
  }
}

function BuscarRepetido(entorno: Simbolo, identi: String): number {
  let id = identi;
  let i = 0;
  let aux = 0;
  for (i; i < entorno.entorno.length; i++) {
    if (id === entorno.entorno[i].id) {
      aux++;
    }
  }
  return aux;
}

export { ParsearAsc, Graficar, GraficarAST, dot, ParsearDesc, BuildSimbolTable, ParsearAscPath }
