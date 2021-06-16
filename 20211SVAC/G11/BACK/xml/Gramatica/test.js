"use strict";
exports.__esModule = true;
var Entorno_1 = require("../scripts/js/Entorno");
var Simbolo_1 = require("../scripts/js/Simbolo");
var Tipo_1 = require("../scripts/js/Tipo");
var gramar_1 = require("./gramar");
var gramar_1_1 = require("./gramar_cy");
var gramar_2 = require("./gramar_des");
var gramar_2_2 = require("./gramar_des_cy");
var tree_1 = require("./tree_roud")
var errores_1 = require("./tabla_error");

var contenido_cst = {};




function ejecutarCodigo(entrada) {
    errores_1.errores.clear();
    var objetos = gramar_2.parse(entrada);
    var arbolito = gramar_1_1.parse(entrada);
    var rcst = new tree_1();
    //var resultado =getError();
    //console.log(resultado);
    contenido_cst = rcst.tour(arbolito);
    /*var complet_fill = `digraph {
      node [shape=circle fontsize=15]
      edge [length=150, color=#ad85e4, fontcolor=black]
       `+contenido_cst+"}";* //DEVUELVE ARBOL/ */
    var tabla = setTable(objetos.objast);
    var ejemplo = ['biblioteca'];
    var texto = "";
    return_info(tabla,ejemplo);
    //console.log(nodosid);
    console.log(objetos.reporteg);
    //console.log(objetos);
    //console.log(resultado);
    //for (var i=objetos.reporteg.length-1; i > -1; i--) { console.log(objetos.reporteg[i]); }
}


function pilitatablaSimbolos(element, padreEntorno) {
    var entornoObjeto = new Entorno_1.Entorno(null);
    if(element.listaAtributos.length > 0 || element.listaElementos.length > 0){
        padreEntorno.hijitos.push(entornoObjeto);
      if (element.listaAtributos.length > 0) {
          element.listaAtributos.forEach(function (atributo) {
              var simbolo = new Simbolo_1.Simbolo(Tipo_1.Tipo.ATRIBUTO, atributo.identificador, atributo.linea, atributo.columna, atributo.valor);
              entornoObjeto.agregar(simbolo.indentificador, simbolo);
          });
      }
      if (element.listaElementos.length > 0) {
          element.listaElementos.forEach(function (elemento) {
              var simbolo = new Simbolo_1.Simbolo(Tipo_1.Tipo.ELEMENTO, elemento.identificador, elemento.linea, elemento.columna, elemento);
              entornoObjeto.agregar(simbolo.indentificador, simbolo);
              elemento.entorno=entornoObjeto;
              return pilitatablaSimbolos(elemento, entornoObjeto);
          });
      }
      else {
          return ;
      }
    }else{
      return ;
    }
}
function setTable(objetos) {
    var entornoGlobal = new Entorno_1.Entorno(null);
    objetos.forEach(function (element) {
        var simbolo = new Simbolo_1.Simbolo(Tipo_1.Tipo.ELEMENTO, element.identificador, element.linea, element.columna, element);
        entornoGlobal.agregar(simbolo.indentificador, simbolo);
        element.entorno = entornoGlobal;
        pilitatablaSimbolos(element, entornoGlobal);
    });
    return entornoGlobal;
}

function getError() {
  try {
      return errores_1.errores.getErrores();
  }
  catch (er) {
      return "Error al enviar errores: " + er.toString();
  }
}

/* retorno de informacion de consultas */
function return_info(globalTable,lista){
  var n_m = lista.length;
  var flag = 0;
  var raiz = lista[flag];


  if(globalTable.hijitos.length > 0){
    var hijo =ifExist(globalTable.tabla,raiz);
    if(hijo!=-1){
      console.log(getText(globalTable.tabla[raiz],''));
      //console.log(globalTable.hijitos[hijo]);
    }
    else
      console.log('no existe la llave');
  }
}

function ifExist(claves, raiz){
  var name_r = Object.keys(claves);
  for(var i=0; i < name_r.length;i++){
    if( name_r[i] == raiz)
      return i;
  }
  return -1;
}

function getText(claves,text_cont){
  var name_r = claves["valor"];

  if(name_r.listaAtributos.length !== 0){
    console.log(name_r.listaAtributos);
  }else{
    if(name_r.texto===''){
      return '<'+ name_r.identificador+'>'+text_cont+'</'+name_r.identificador2+'>';
    }else{
      return '<'+ name_r.identificador+'>'+name_r.texto+'</'+name_r.identificador2+'>';
    }
  }
}

