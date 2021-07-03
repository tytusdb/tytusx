var tabla = [];
function llenarTablaSimbolos(xmlAST){

    let raiz = new Object();
    raiz.identificador = xmlAST.identificador;
    raiz.texto = xmlAST.texto;
    raiz.tipo = 'ETIQUETA';
    raiz.columna = xmlAST.columna;
    raiz.linea = xmlAST.linea;
    raiz.entorno = '';
    tabla.push(raiz);

    if(xmlAST.listaAtributos != null){
        getHijos(xmlAST.listaAtributos.listaAtributos, xmlAST.identificador, 'ATRIBUTO');
    }

    if(xmlAST.listaObjetos != null){
        getHijos(xmlAST.listaObjetos.listaObjetos, xmlAST.identificador, 'ETIQUETA');
    }
    console.log(tabla);
    return tabla;
}

function getHijos(nodos, entorno, tipo){

    nodos.forEach(element =>{
        let hijo = new Object();
        hijo.identificador = element[0].identificador;
        hijo.texto = element[0].texto;
        hijo.tipo = tipo;
        hijo.columna = element[0].columna;
        hijo.linea = element[0].linea;
        hijo.entorno = entorno ;
        if(element[0].listaAtributos != null){
            getHijos(element[0].listaAtributos.listaAtributos, element[0].identificador, 'ATRIBUTO');
        }
        if(element[0].listaObjetos != null){
            getHijos(element[0].listaObjetos.listaObjetos, element[0].identificador, 'ETIQUETA');
        }
        tabla.push(hijo);
    })
}

function getTablaSimbolosXML(tabla){
    let tablaHTML = "" ;
    tabla.forEach(simbolo =>{
        tablaHTML += "<tr>";
        tablaHTML += "<td>"+simbolo.identificador+"</td>" +
                    "<td>"+simbolo.texto+"</td>" +
                    "<td>"+simbolo.tipo+"</td>" +
                    "<td>"+simbolo.columna+"</td>"+
                    "<td>"+simbolo.linea+"</td>"+
                    "<td>"+simbolo.entorno+"</td>";
        tablaHTML += "</tr>";
    })
    return tablaHTML;
}