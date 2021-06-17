var contNodos = 0;
var contNodos2 = 0;
function graficarReporteGramatical(Arbol){
    var script = "";
    if (Arbol){
        var Raiz = Arbol.Raiz;
        console.log("\n>>>Reconoció la Raíz del Arbol: "+Arbol.id);
        if (Raiz){
            script += "<h2>Reporte Tabla de Símbolos</h2>\n";
            script += "<br>\n";
            script += "<table class=\"table\" style=\"width:100%;\" align=\"center\">\n";
            script += "<tbody>\n";

            script += recorrerHijos(Raiz);

            //Se cierran las etiquetas de body y table
            script += "</tbody>\n"; 
            script += "</table>\n";
        }

        console.log("\n>>>Terminó de construir el código de la gráfica...");
    }

    return script;
}

function recorrerHijos(Nodo){
    console.log("\n>>>Ingresó a función recorrerHijos...");
    var script = "";
    contNodos++;
    //se obtiene la cantidad de hijos del nodo
    var numHijos = Nodo.getCantidadHijos();
    console.log("\n>>>Cantidad de hijos del nodo: "+ numHijos);

    //se genera el nodo padre
    script += "<tr><td colpsan='1'>\n"
    let Padre = "<"+Nodo.id+">";
    script += Padre + " ::= ";

    //si el nodo padre tiene hijos entonces se crearán los nodos hijos en graphviz
    if (numHijos > 0){
        console.log("\n>>>Ingresará a generar los nodos hijos en graphviz...");
        for (var i = 0; i < numHijos; i++){
            console.log("\n>>>Construyendo Hijo: "+i);
            //contNodos++;
            contNodos2++;
            var Hijo = Nodo.hijos[i];
            let hoja = "<"+Hijo.id+">";
            script += hoja + "\n";
        }
        script += "</td></tr>";

        for (var i = 0; i < numHijos; i++){
            console.log("\n>>>Construyendo Hijo: "+i);
            //contNodos++;
            contNodos2++;
            var Hijo = Nodo.hijos[i];
            script += recorrerHijos(Hijo);
        }
        console.log("\n>>>Terminó de construir los nodos hijos...");
    }else{
        script += "</td><tr>\n";
    }

    return script;
}