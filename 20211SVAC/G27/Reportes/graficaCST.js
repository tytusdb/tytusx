var contNodos = 0;
var contNodos2 = 0;
function graficarArbolCST(Arbol){
    var script = "";
    if (Arbol){
        var Raiz = Arbol.Raiz;
        console.log("\n>>>Reconoció la Raíz del Arbol: "+Arbol.id);
        if (Raiz){
            script = "digraph G {\n";
            script += "graph[label=\"Gráfica Arbol CST\", labelloc=t, fontsize=30];\n";
            script += "node [shape = record, height = 0.1];\n";
            //script += "node"+contNodos+"[label = \"<f0> | <f1>"+Raiz.valor+" | <f2>\"];"
            script += recorrerHijos(Raiz);
            script += "}"; 
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
    let Padre = "node"+contNodos;
    script += Padre + ";\n";
    script += Padre + "[label = \"" + Nodo.valor +"\"];\n";

    //si el nodo padre tiene hijos entonces se crearán los nodos hijos en graphviz
    if (numHijos > 0){
        console.log("\n>>>Ingresará a generar los nodos hijos en graphviz...");
        for (var i = 0; i < numHijos; i++){
            console.log("\n>>>Construyendo Hijo: "+i);
            //contNodos++;
            contNodos2++;
            var Hijo = Nodo.hijos[i];
            let hoja = "nodeA"+contNodos2;
            
            var cantidadHijos2 = Hijo.getCantidadHijos();
            if (cantidadHijos2 > 0){
                script += Padre + "->";
                script += recorrerHijos(Hijo);
            }else{
                script += Padre + "->" + hoja + ";\n";
                script += hoja+"[label = \"" + Hijo.valor +"\"];\n";
            }
        }
        console.log("\n>>>Terminó de construir los nodos hijos...");
    }

    return script;
}


/*********************GRAFICA ARBOL **********************************************/
function probandoArbol(){
    //alert('Aquí se graficará el CST');
    /*
    var Raiz = new Nodo('Raiz','Raiz'); //Se crea un primer nodo para la raíz del Arbol
    var Tree = new Arbol('CST',Raiz); //Se crea el arbol indicando ID y Raiz
    
    alert('ID_Nodo: '+Raiz.id + '\nValor: ' + Raiz.valor + '\nCantidadHijos: '+Raiz.getCantidadHijos());
    Raiz.insertHijo('A','Hijo1');
    Raiz.insertHijo('B','Hijo2');
    Raiz.insertHijo('C','Hijo3');
    

    var Hijo1 = Raiz.hijos[0];
    Hijo1.insertHijo('A1', 'Hijo1');
    Hijo1.insertHijo('A2', 'Hijo2');

    
    var Hijo2 = Raiz.hijos[1];
    Hijo2.insertHijo('B1', 'Hijo1');

    
    var Hijo3 = Raiz.hijos[2];
    Hijo3.insertHijo('C1', 'Hijo1');
    Hijo3.insertHijo('C2', 'Hijo2');
    Hijo3.insertHijo('C3', 'Hijo3');
    Hijo3.insertHijo('C4', 'Hijo4');

    var Hijo1_1 = Hijo1.hijos[0];
    Hijo1_1.insertHijo('AA1', 'Hijo1');
    Hijo1_1.insertHijo('AA2', 'Hijo2');
    Hijo1_1.insertHijo('AA3', 'Hijo3');
    Hijo1_1.insertHijo('AA4', 'Hijo4');
    Hijo1_1.insertHijo('AA5', 'Hijo5');

    var Hijo2_1 = Hijo2.hijos[0];
    Hijo2_1.insertHijo('BB1', 'Hijo1');
    Hijo2_1.insertHijo('BB2', 'Hijo2');

    var Hijo3_1 = Hijo3.hijos[2];
    Hijo3_1.insertHijo('CC1', 'Hijo1');
    Hijo3_1.insertHijo('CC2', 'Hijo2');
    */

    /* Forma de llamar a la función de graficación de CST*/
    /*
    var resultado = graficarArbolCST(Tree);
    pruebaGraficarViz(resultado);
    console.log("\n\n********GRAPHVIZ CODE*************\n");
    console.log(resultado);
    */
}

function pruebaGraficarVizCST(grafica){
    var viz = new Viz();
    viz.renderSVGElement(grafica)
    .then(function(element) {
        //document.body.appendChild(element);
        //alert('entro a la funcion elemento');
        let elemento = document.getElementById('reporteCSTGrafica');
        elemento.appendChild(element);
    })
    .catch(error => {
        viz = new Viz();
        console.error(error);
    });
}