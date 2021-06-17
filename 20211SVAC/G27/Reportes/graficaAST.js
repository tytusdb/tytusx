var contNodos = 0;
var contNodos2 = 0;
function graficarArbolAST(Arbol){
    var script = "";
    if (Arbol){
        var Raiz = Arbol.Raiz;
        console.log("\n>>>Reconoció la Raíz del Arbol: "+Arbol.id);
        if (Raiz){
            script = "digraph G {\n";
            script += "graph[label=\"Gráfica Arbol AST\", labelloc=t, fontsize=30];\n";
            script += "node [shape = record, height = 0.1];\n";
            script += recorrerHijosAST(Raiz);
            script += "}"; 
        }

        console.log("\n>>>Terminó de construir el código de la gráfica...");
    }

    return script;
}

function recorrerHijosAST(Nodo){
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
                script += recorrerHijosAST(Hijo);
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
function probandoArbolAST(){
    //alert('Aqui se graficará el arbol');

    /*
    var Raiz = new Nodo('Raiz','+'); //Se crea un primer nodo para la raíz del Arbol
    var Tree = new Arbol('AST',Raiz); //Se crea el arbol indicando ID y Raiz
    
    alert('ID_Nodo: '+Raiz.id + '\nValor: ' + Raiz.valor + '\nCantidadHijos: '+Raiz.getCantidadHijos());
    Raiz.insertHijo('A','*');
    Raiz.insertHijo('B','*');

    var Hijo1 = Raiz.hijos[0];
    Hijo1.insertHijo('A1', '+');
    Hijo1.insertHijo('A2', '5');

    
    var Hijo2 = Raiz.hijos[1];
    Hijo2.insertHijo('B1', '*');
    Hijo2.insertHijo('B2', '15');


    var Hijo1_1 = Hijo1.hijos[0];
    Hijo1_1.insertHijo('AA1', '2');
    Hijo1_1.insertHijo('AA2', '10');

    var Hijo2_1 = Hijo2.hijos[0];
    Hijo2_1.insertHijo('BB1', '7');
    Hijo2_1.insertHijo('BB2', '9');
    */


    /* Forma de llamar a la función de graficación de CST*/
    /*
    var resultado = graficarArbolAST(Tree);
    pruebaGraficarViz(resultado);
    console.log("\n\n********GRAPHVIZ CODE*************\n");
    console.log(resultado);
    */

}

function pruebaGraficarVizAST(grafica){
    var viz = new Viz();
    viz.renderSVGElement(grafica)
    .then(function(element) {
        //document.body.appendChild(element);
        //alert('entro a la funcion elemento');
        let elemento = document.getElementById('reporteASTGrafica');
        elemento.appendChild(element);
    })
    .catch(error => {
        viz = new Viz();
        console.error(error);
    });
}
