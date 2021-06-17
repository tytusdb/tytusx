"use strict";
var CSTAcadena = "digraph G {node[shape= \"box\", style=filled ]";
var m = 0;
var k = 0;
var padreXML;
var cstXML;
var tablaGramatical = "";
var textoGramatical = "";
function GenerarReporteGramatical(){

    textoGramatical = "<!DOCTYPE html> ";
    textoGramatical+="<html lang=\"en\">";
    textoGramatical+="<head>";
    textoGramatical+="<meta charset=\"UTF-8\">";
    textoGramatical+="<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">";
    textoGramatical+="<title>Reporte Gramatical </title>";
    textoGramatical+="<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css\" integrity=\"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh\" crossorigin=\"anonymous\">";
    textoGramatical+="<script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js\" integrity=\"sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6\" crossorigin=\"anonymous\"></script>";
    textoGramatical+="</head>";
    textoGramatical+="<body>";
    textoGramatical+="<H1>Lista de Simbolos</H1>";
    textoGramatical+= "<table class=\"table\"><thead class=\"thead-dark\"> \n";
    textoGramatical+="<tr> \n";
    textoGramatical+= "<th scope=\"col\">PRODUCCION</th> \n";
    textoGramatical+= "<th scope=\"col\">REGLAS SEMANTICAS</th> \n";
    textoGramatical+= "</tr> \n";
    textoGramatical+= "</thead> \n";
    textoGramatical+= "<tbody>";
    textoGramatical+= tablaGramatical;
                    textoGramatical+= "</tbody> \n";
                    textoGramatical+= "</table> \n";
                
                    textoGramatical+="</body>";
                    textoGramatical+="</html>";
};

function llenarGramatical(produccion,regla) {
    tablaGramatical += "<tr> \n";
    tablaGramatical += "<th scope=\"row\">" + produccion + "</th> \n";
    tablaGramatical += "<td>" + regla + "</td>" ;
    tablaGramatical += "</tr>\n";
}

function otra(result) {
    tablaGramatical=""
    result.forEach(function (element) {
        llenarGramatical("RAIZ -> RAICES RAIZ \n |RAIZ \n ","RAICES.val=RAIZ.val")
    llenarGramatical("\n RAIZ -> OBJETO","\n\n\n RAIZ.val=OBJETO.val")
        cstXML += "digraph G{ node[shape= \"box\", style=filled ];\n\n";
        cstXML += "RAIZ[label = \" RAIZ \n START -> RAIZ EOF \n RAIZ -> OBJETO \"];\n";
        cstXML += 'RAIZ->';
        cstXML += recorrer(element);
        cstXML += '}';
     
    });
    cstXML = cstXML.replace('undefined', '');
    return cstXML;
}
function recorrer(objetos) {
    var concatena = "";
    var padreAux;
    m++;
    var padre = "nodo" + m;
    padreAux=padre
    
    //Se agrega el entorno anterior al padre
    if(objetos.id==objetos.EtiquetaCierre){
        if(objetos.tablaEntornos!=0){
    concatena += padre + "[label = \" OBJETOS:= OBJETO \"];\n";
    llenarGramatical("| OBJETO","OBJETO:= OBJETOS")
    
    concatena += padre + "[label = \" OBJETO \n < ID> LISTA_OBJETOS </ID> \"];\n";
    //llenarGramatical("OBJETO->< ID> LISTA_ID </ID> ","OBJETO.texto=LISTA_ID.val")
        }else{
            concatena += padre + "[label = \" OBJETOS:= OBJETO \"];\n";
            llenarGramatical("| OBJETO","OBJETOS:= OBJETO")
            concatena += padre + "[label = \" OBJETO \n < ID> LISTA_ID </ID> \"];\n";
            //llenarGramatical("OBJETO->< ID> LISTA_ID /> ","OBJETO.texto=LISTA_ID.val")
        }
    }else{
        
                    concatena += padre + "[label = \" OBJETOS:= OBJETO \"];\n";
                    
                    concatena += padre + "[label = \" OBJETO \n < ID /> \"];\n";
                
    }
    

    concatena += padre+"->"
    m++;
    concatena +="nodo"+m+"[label =\"menorque.val= <\"]\n"
    concatena += "nodo"+m + "[label = \" < \"];\n";

    m++;
    concatena+=padre+"->";
    padre="nodo"+m;
    concatena+=padre+"[label =\"OBJETO.id+=id.val\n"+objetos.id+"\"]\n";
    concatena += padre + "[label = \" IDENTIFICADOR:= OBJETO.id \n"+objetos.id+" \"];\n";
    llenarGramatical("OBJETO-> < ID > LISTA_ID < / ID > ","OBJETO.id:=id.val\n"+objetos.id)
   // llenarGramatical("OBJETO->< ID LISTA_ID /> ","OBJETO.texto=LISTA_ID.val")
    //m++;
    if(objetos.id==objetos.EtiquetaCierre){
        
    concatena += padreAux+"->"
    m++;
    concatena +="nodo"+m+"[label =\"mayorque.val= >\"]\n"
    concatena += "nodo"+m + "[label = \" > \"];\n";

    concatena += padreAux+"->"
    m++;
    concatena +="nodo"+m+"[label =\"menorque.val= <\"]\n"
    concatena += "nodo"+m + "[label = \" < \"];\n";

    concatena += padreAux+"->"
    m++;
    concatena +="nodo"+m+"[label =\"slash.val= / \"]\n"
    concatena += "nodo"+m + "[label = \" / \"];\n";

    concatena += padreAux+"->"
    m++;
    concatena +="nodo"+m+"[label =\"OBJETO.EtiquetaCierre+=id.val\n"+objetos.id+"\"]\n"
    concatena += "nodo"+m + "[label = \""+objetos.id +"\"];\n";

    concatena += padreAux+"->"
    m++;
    concatena +="nodo"+m+"[label =\"mayorque.val= >\"]\n";
    concatena += "nodo"+m + "[label = \" > \"];\n";
    }else{
        concatena += padreAux+"->"
    m++;
    concatena +="nodo"+m+"[label =\"slash.val= / \"]\n"
    concatena += "nodo"+m + "[label = \" / \"];\n";

    concatena += padreAux+"->"
    m++;
    concatena +="nodo"+m+"[label =\"mayorque.val= >\"]\n"
    concatena += "nodo"+m + "[label = \" > \"];\n";
    }
    m++;
    concatena+=padre+"->";
    padre="nodo"+m;
    concatena+=padre+"[label =\"OBJETO.id+=id.val\n"+objetos.id+"\"]\n";


    concatena += padre + "[label = \"" + objetos.id + "\"];\n";
    if (objetos.tablaSimbolos != undefined) {
        
        if (objetos.tablaSimbolos.length != 0) {
            llenarGramatical("OBJETO->< ID LISTA_ID /> ","OBJETO.texto=LISTA_ID.val "+objetos.id)
            m++;
            concatena+=padre+"-> nodo"+m+"\n";
            concatena+="nodo"+m+"[label = \" ATRIBUTOS \n ATRIBUTO:=id igual String \"];\n";
            
           let npadre="nodo"+m;

            objetos.tablaSimbolos.forEach(function (atributos) {
                k++;
                var atributo = "nodoAtributo" + k;
                concatena+= npadre +"->"+atributo+";\n";
                concatena+= atributo + "[label =\"ATRIBUTO \"  ];\n";
                //k++;
                let patributo="nodoAtributo"+k;
                var val = "";
                //Acciones para graficara tributos a objeto
                concatena += patributo + "->" ;
                k++;
                atributo="nodoAtributo"+k;
                
                concatena += atributo + "[label =\"ATRIBUTO.valor+=id.val "+atributos.id+"\"];\n";
                llenarGramatical(" ATRIBUTOS -> ATRIBUTOS ATRIBUTO \n | ATRIBUTO","")
                llenarGramatical(" ","ATRIBUTO.valor+=id.val"+atributos.id)
                
                val = atributos.valor.replace('"', '');
                val = val.replace('"', '');
                concatena += "nodoAtributo"+k + "[label =\"" + atributos.id + "\"];\n";
                concatena += patributo + "->" ;
                k++;
                atributo="nodoAtributo"+k;
                concatena += atributo + ";\n";
                concatena += "nodoAtributo"+k + "[label =\"" + "=" + "\"];\n";
                concatena += patributo + "->" ;
                k++;
                atributo="nodoAtributo"+k;
                llenarGramatical(" ","ATRIBUTO.valor+=cadena.val \n"+val)
                concatena += atributo + "[label =\"ATRIBUTO.valor+=cadena.val \n"+val+"\"];\n";
                concatena += "nodoAtributo"+k  + "[label =\"" + val + "\"];\n";
            });
        }
    }
    //si no tiene mas hijos
    if (objetos.texto != '') {
        m++;
        var nodoTexto = "nodoTexto" + m;
        concatena += padre + "->" + nodoTexto + "[label =\"LISTA_ID.valor+=texto.val \n"+objetos.texto+"\"];\n";
        
        concatena += nodoTexto + "[label = \"LISTA ID \n LISTA_ID -> LISTA_ID ID \n | ID \" ];\n";
        llenarGramatical(" LISTA_ID -> LISTA_ID \n ","")
        llenarGramatical(" | ID-> texto ","LISTA_ID.valor+=texto.val \n"+objetos.texto)
      //  m++;
        nodoTexto="nodoTexto"+m;
        concatena += nodoTexto + "->";
        m++;
        nodoTexto="nodoTexto"+m+"[label =\"ID:=id.val ("+objetos.id+")\"]";
        llenarGramatical(" | ID -> texto","texto.val= \n"+objetos.texto)
        concatena += nodoTexto +"[label =\"texto.val= \n"+objetos.texto+"\"];\n";
        concatena += nodoTexto + "[label =\"" + objetos.texto + "\"];\n";
    }
    if (objetos.tablaEntornos != undefined) {
        
        if (objetos.tablaEntornos.length != 0) {
            llenarGramatical("OBJETO-> < ID > OBJETOS < / ID > ","OBJETO:= OBJETOS")
            m++;
            concatena+=padre+"-> nodo"+m+"[label = \"  OBJETO -> OBJETOS\"] \n";
            if(objetos.tablaEntornos.length==1){
                llenarGramatical("OBJETOS->  OBJETO ","OBJETOS:= OBJETO")
                concatena+="nodo"+m+"[label = \" OBJETOS  \n OBJETOS -> OBJETO\"];\n";
            }else{
                llenarGramatical("OBJETOS-> OBJETOS OBJETO ","")
                concatena+="nodo"+m+"[label = \" OBJETOS \n OBJETOS -> OBJETOS OBJETO\"];\n";
            }
            
            padre="nodo"+m;
            objetos.tablaEntornos.forEach(function (objetoSiguiente) {
                //Con esta linea agregamos el objeto anterior al padre
                concatena += padre + "->";
                concatena += recorrer(objetoSiguiente);
            });
        }
    }
    return concatena;
}
var opcionesXML;
var datosML;
var arbolito;
function pruebaGraficarXML(){
   
    var contenedorXML= document.getElementById("grafo");//llama al contenedor
    var result=arbolito;
    var datosXML=otra(result)
    var parsedData = vis.network.convertDot(datosXML);
     datosML = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    };
     opcionesXML = {//estética del grafo
        layout:{
            hierarchical:{
                levelSeparation:100,
                nodeSpacing:100,
                parentCentralization:true,
                
            }
        }
    };
    var graf = new vis.Network(contenedorXML, datosML,opcionesXML);//muestra grafo
}


//document.getElementById("botonCST").addEventListener("click",analizarTextoCST);
//# sourceMappingURL=prueba.js.map