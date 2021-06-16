var objets_xml = {};
var errores_xml =[];
var objetc_tree_xml={};
var table_global={};

function analisis_asc(){
    analisis_xml_asc();
}

function analisis_xml_asc(){
    errores.clear();
    var context = document.getElementById('txtxml').value;
    objets_xml = gramar.parse(context);
    objetc_tree_xml = gramar_cy.parse(context);
    errores_xml = getError();
    table_global = setTable(objets_xml.objast);
}

function getError() {
    try {
        return errores.getErrores();
    }
    catch (er) {
        return "Error al enviar errores: " + er.toString();
    }
}

function pilitatablaSimbolos(element, padreEntorno) {
    var entornoObjeto = new Entorno(null);
    if(element.listaAtributos.length > 0 || element.listaElementos.length > 0){
        padreEntorno.hijitos.push(entornoObjeto);
      if (element.listaAtributos.length > 0) {
          element.listaAtributos.forEach(function (atributo) {
              var simbolo = new Simbolo(Tipo.ATRIBUTO, atributo.identificador, atributo.linea, atributo.columna, atributo.valor);
              entornoObjeto.agregar(simbolo.indentificador, simbolo);
          });
      }
      if (element.listaElementos.length > 0) {
          element.listaElementos.forEach(function (elemento) {
              var simbolo = new Simbolo(Tipo.ELEMENTO, elemento.identificador, elemento.linea, elemento.columna, elemento);
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
    var entornoGlobal = new Entorno(null);
    objetos.forEach(function (element) {
        var simbolo = new Simbolo(Tipo.ELEMENTO, element.identificador, element.linea, element.columna, element);
        entornoGlobal.agregar(simbolo.indentificador, simbolo);
        element.entorno = entornoGlobal;
        pilitatablaSimbolos(element, entornoGlobal);
    });
    return entornoGlobal;
}
