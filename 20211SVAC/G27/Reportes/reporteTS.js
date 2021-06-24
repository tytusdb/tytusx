/* OBJETO */
//id => identificador
//texto
//linea
//columna
//listaAtributos
//listaObjetos

/* ATRIBUTO */
//identificador
//valor
//linea
//columna

//Función para construir los nodos del árbol de objetos en código html que representará una tabla de símbolos
var contNodos = 0;
var contNodos2 = 0;
var isFirst = 0;

function construyeGraficaTS(Arbol){
    var script = "";
    contNodos=0;
    if (Arbol){
        var Raiz = Arbol;
        console.log("\n>>>Reconoció la Raíz del TS: "+Arbol.identificador);
        if (Raiz){
            console.log("\n>>>Se construye encabezado de la tabla de simbolos...");
            script += "<h2>Reporte Tabla de Símbolos</h2>\n";
            script += "<br>\n";
            script += "<table class=\"table\" style=\"width:80%;\" align=\"center\">\n";
            script += "<thead class=\"thead-dark\">\n";
            script += "<tr>\n";
            script += "<th scope=\"col\">#</th>\n"
            script += "<th scope=\"col\">Nombre</th>\n";
            script += "<th scope=\"col\">Tipo</th>\n";
            script += "<th scope=\"col\">Entorno</th>\n";
            script += "<th scope=\"col\">Fila</th>\n";
            script += "<th scope=\"col\">Columna</th>\n";
            script += "</tr>\n";
            script += "</thead>\n";
            script += "<tbody>\n";
            
            //se construye el body de la tabla
            //Se construye la primera fila
            console.log("\n>>>Se crea la primera fila correspondiente a los datos de la raiz...");
            contNodos++;
            script += "<tr>\n";
            script += "<td>"+    contNodos           + "</td>\n";
            script += "<td>"+    Raiz.identificador  + "</td>\n";
            script += "<td>"+    Raiz.texto          + "</td>\n";
            script += "<td>"+    "Global"            + "</td>\n"; 
            script += "<td>"+    Raiz.linea           + "</td>\n";
            script += "<td>"+    Raiz.columna        + "</td>\n";
            script += "</tr>\n";

            script += construyeAtributos(Raiz);

            //Se cierran las etiquetas de body y table
            script += "</tbody>\n"; 
            script += "</table>\n";
        }

        console.log("\n>>>Terminó de construir el código de la tabla...");
    }    

    return script;
}

function construyeAtributos(Nodo){
    console.log("\n>>>Ingresó a construir los atributos del nodo: " + Nodo.identificador);
    var script = "";
    var numHijos = 0;
    var numObjetos = 0;
    //se obtiene la cantidad de hijos del nodo
    if(Nodo.listaAtributos != null){
        //alert('Entro a asignación de hijos');
        numHijos = Nodo.listaAtributos.length;
    }
    console.log("\n>>>Cantidad de atributos del nodo: "+ numHijos);

    //si el nodo padre tiene hijos entonces se crearán los nodos hijos en graphviz
    if (numHijos > 0){
        contNodos++;
        console.log("\n>>>Ingresará a imprimir los atributos del nodo...");
        for (var i = 0; i < numHijos; i++){
            contNodos++;
            //contNodos2++;
            console.log("\n++++++++++++++++++++++++++++++++++++++++++++++++++");
            var Atributo = Nodo.listaAtributos[i];
            console.log("\n>>>Construyendo Nodo: "+ Nodo.identificador + "  y Atributo: " + Atributo.identificador);
            var filaHijo = "";
            filaHijo += "<tr>\n";
            filaHijo += "<td>"+    contNodos                + "</td>\n";
            filaHijo += "<td>"+    Atributo.identificador   + "</td>\n";
            filaHijo += "<td>"+    Atributo.tipo            + "</td>\n";
            filaHijo += "<td>"+    Nodo.identificador       + "</td>\n"; 
            filaHijo += "<td>"+    Atributo.linea           + "</td>\n";
            filaHijo += "<td>"+    Atributo.columna         + "</td>\n";
            filaHijo += "</tr>\n";
            script += filaHijo;
            console.log("\n++++++++++++++++++++++++++++++++++++++++++++++++++");
        }
        console.log("\n>>>Terminó de generar los atributos...");
        console.log("\n**************************************");
        console.log("\n**************************************");
        console.log("\n**************************************");
        console.log("\n**************************************");
        console.log("\n");
    }

    if (Nodo.listaObjetos != null){
        var numObjetos = Nodo.listaObjetos.length;
    }

    console.log("\n>>>Cantidad de Objetos hijos del nodo: "+numObjetos);
    if (numObjetos > 0){
        //Empezará a verificar los objetos del nodo
        for (var i = 0; i < numObjetos; i++){
            console.log("\n--------------------------------------------");
            console.log("\n>>>Construyendo Objeto Hijo: "+i);
            contNodos++;
            //contNodos2++;
            var Hijo = Nodo.listaObjetos[i];
            script += construyeObjetos(Hijo, Nodo);
            console.log("\n--------------------------------------------");
        }
    }

    return script;
}

function construyeObjetos(Nodo, Padre){
    console.log("\n>>>Construyendo Objeto Hijo: "+ Nodo.identificador + "  con Objeto Padre: " + Padre.identificador);
    var script = "";
    var filaHijo = "";
    //se genera la fila para el primer nodo
    filaHijo += "<tr>\n";
    filaHijo += "<td>"+    contNodos            + "</td>\n";
    filaHijo += "<td>"+    Nodo.identificador   + "</td>\n";
    filaHijo += "<td>"+    Nodo.tipo            + "</td>\n";
    filaHijo += "<td>"+    Padre.identificador  + "</td>\n"; 
    filaHijo += "<td>"+    Nodo.linea           + "</td>\n";
    filaHijo += "<td>"+    Nodo.columna         + "</td>\n";
    filaHijo += "</tr>\n";
    script += filaHijo;

    //var numAtributos = Nodo.listaAtributos.length;
    //console.log("\n>>>Cantidad de atributos del nodo: "+ numAtributos);
    //if (numAtributos > 0)
    //{
        script += construyeAtributos(Nodo);
    //}

    return script;
}

const codigoTS = function(){
    var tabla = document.getElementById('Salida').value;
    //alert("Tabla:\n"+tabla);
    return tabla;
}