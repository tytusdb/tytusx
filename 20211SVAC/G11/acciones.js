var objets_xml = {};
var errores_xml =[];
var objetc_tree_xml={};
var table_global={};

function analisis_asc(){
    analisis_xml_asc();
    fill_gramar_asc();
    fill_error();
    grafica_xml_asc();
    alert('succes','Analisis completado');
}

function analisis_desc(){
    analisis_xml_desc();
    fill_gramar_desc();
    fill_error();
    grafica_xml_desc();
    alert('succes','Analisis completado');
}

function analisis_xml_asc(){
    errores.clear();
    var context = document.getElementById('txtxml').value;
    objets_xml = gramar.parse(context);
    objetc_tree_xml = gramar_cy.parse(context);
    errores_xml = getError();
    table_global = setTable(objets_xml.objast);
}

function analisis_xml_desc(){
    errores.clear();
    var context = document.getElementById('txtxml').value;
    objets_xml = gramar_des.parse(context);
    objetc_tree_xml = gramar_des_cy.parse(context);
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



function fill_gramar_asc(){
    var tabla = document.getElementById('gram_asc'); 
    var j = 0;
    var contiene =``;
    for (var i=objets_xml.reporteg.length-1; i > -1; i--) { 
        j++;
        contiene+=`<tr>\n<th scope="row">`+j+`</th>\n`;
        contiene+=`<td>`+objets_xml.reporteg[i].p+`</td>\n`;
        contiene+=`<td>`+objets_xml.reporteg[i].g+`</td>\n`;
        contiene+=`</tr>\n`;
    }
    tabla.innerHTML = contiene;
}

function fill_gramar_desc(){
    var tabla = document.getElementById('gram_desc'); 
    var j = 0;
    var contiene =``;
    for (var i=objets_xml.reporteg.length-1; i > -1; i--) { 
        j++;
        contiene+=`<tr>\n<th scope="row">`+j+`</th>\n`;
        contiene+=`<td>`+objets_xml.reporteg[i].p+`</td>\n`;
        contiene+=`<td>`+objets_xml.reporteg[i].g+`</td>\n`;
        contiene+=`</tr>\n`;
    }
    tabla.innerHTML = contiene;
}

function fill_error(){
    var tabla = document.getElementById('gram_asc_error'); 
    var j = 0;
    var contiene =``;
    if(errores_xml.length === 0){
        contiene+=`<tr>\n<th scope="row">`+1+`</th>\n`;
        contiene+=`<td>No hay errores</td>\n`;
        contiene+=`<td>No hay errores</td>\n`;
        contiene+=`</tr>\n`;
    }else{
        for (var i=0;i < errores_xml.length; i++) { 
            j++;
            contiene+=`<tr>\n<th scope="row">`+j+`</th>\n`;
            contiene+=`<td>`+errores_xml[i].tipo+`</td>\n`;
            contiene+=`<td>`+errores_xml[i].descripcion+`</td>\n`;
            contiene+=`<td>`+errores_xml[i].linea+`</td>\n`;
            contiene+=`<td>`+errores_xml[i].valor+`</td>\n`;
            contiene+=`</tr>\n`;
        }
    }
    tabla.innerHTML = contiene;
}

function return_tree(){
    var rcst = new Tree_tour();
    contenido_cst = rcst.tour(objetc_tree_xml);
    var arbol = `digraph {
        node [shape=circle fontsize=15]
        edge [length=150, color=#ad85e4, fontcolor=black]
        `+contenido_cst+`}`;
    return arbol;
}

function grafica_xml_asc(){
    var DOTstring = return_tree();
    var container = document.getElementById('xml_asc_cst');
    var parsedData = vis.network.convertDot(DOTstring);
    var dataDOT = {
         nodes: parsedData.nodes,
         edges: parsedData.edges
         }

     var options = {
     autoResize: true,
     physics:{
     stabilization:false
     },
     layout: {
             hierarchical:{
                 levelSeparation: 150,
                 nodeSpacing: 150,
                 parentCentralization: true,
                 direction: 'UD',
                 sortMethod: 'directed' 
             },
         }
     };

     var network = new vis.Network(container, dataDOT, options);
}

function grafica_xml_desc(){
    var DOTstring = return_tree();
    var container = document.getElementById('xml_desc_cst');
    var parsedData = vis.network.convertDot(DOTstring);
    var dataDOT = {
         nodes: parsedData.nodes,
         edges: parsedData.edges
         }

     var options = {
     autoResize: true,
     physics:{
     stabilization:false
     },
     layout: {
             hierarchical:{
                 levelSeparation: 150,
                 nodeSpacing: 150,
                 parentCentralization: true,
                 direction: 'UD',
                 sortMethod: 'directed' 
             },
         }
     };

     var network = new vis.Network(container, dataDOT, options);
}