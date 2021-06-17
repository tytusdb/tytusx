/***********************************************FUNCIONES ESPECÍFICAS DE XML*********************************************************** */
//Función para ejecutar el parser del analizador XML de jison
const parseXML = function (entrada) {
    var mensajeConsola = "";
    try {
        console.log("Ingresó a la función parseXML" + new Date());
        document.getElementById('consola').innerHTML += ">Intentando analizar XML (" + new Date() + ") \n";
        try {
            let resultado = gramaticaXML.parse(entrada);
            if (resultado) {
                document.getElementById('consola').value += ">Se ejecutó el parser";
                console.info('Entrada fue parseada correctamente!!!!');
                document.getElementById('consola').value += ">Entrada parseada correctamente! \n";

                //Si la entrada fue parseada correctamente, se procede a generar el reporte de Tabla de Símbolos
                console.log("\n\n\n################################################################");
                var codigoTablaSimbolos = construyeGraficaTS(resultado);
                console.log("\n################################################################");
                document.getElementById("hiddenTablaSimbolos").value = codigoTablaSimbolos;


                return resultado;
            } else {
                console.info('\nNo se ejecutó la clase parser');
            }
        } catch (e) {
            document.getElementById('consola').value += ">Error al parsear la entrada: \n>" + e.toString() + "\n";
            throw ('Error al parserar la entrada: ' + e);
        }
    } catch (error) {
        console.log(error);
        if (!error)
            document.getElementById('consola').value += ">"+error.toString() + "\n";
    }

};

const parseXMLTS = function (raiz){
    var listaA = [];
    var listaO = []; 
    var listaA2 = [];
    var listaO2 = [];
    var listaA3 = [];
    var listaO3 = [];
    var listaA4 = [];
    var listaO4 = [];

    var raiz = new Objeto('Raiz', 'Raiz', 0,0,listaA,listaO);
    var atributo = new Atributo('Atributo1', 'Atributo1_Valor',5, 3);
    var Nodo1 = new Objeto('N1','N1', 10,1, listaA2, listaO2);
    var Nodo2 = new Objeto('N2', 'N2', 15,1, listaA3, listaO3);
    var Nodo3 = new Objeto('N3','Libro',30,10,listaA4,listaO4);
    //raiz.listaAtributos = atributo;
    raiz.agregarObjeto(Nodo1);
    raiz.agregarObjeto(Nodo2);
    Nodo1.agregarObjeto(Nodo3);
    alert("Cantidad objetos Raiz: "+raiz.listaObjetos.length);
    alert("Cantidad objetos Nodo1: "+Nodo1.listaObjetos.length);
    //alert("Raiz ID: " + raiz.identificador);
    //alert("Hijo ID: " + raiz.listaObjetos[0].identificador +"\nHijo2 ID: "+raiz.listaObjetos[1].identificador);
    
    return construyeGraficaTS(raiz);

}

/******************************************FUNCIONES DE MENÚ DE BOTONES**************************************************************** */
//función para crear un nuevo archivo reiniciando los objetos de texto
const nuevoArchivo = function(){
    //Elimina el contenido de las text areas para crear un nuevo archivo
    showCode();
    document.getElementById("Entrada").value = "";
    editor.setValue("");
    document.getElementById("Salida").value  = "";
    document.getElementById("consola").value = "";
    document.getElementById("Entrada").focus();
};

//Función para abrir un dialog para seleccionar y cargar el contenido de un archivo externo.
const abrirArchivo = function(evento){
    let archivo = evento.target.files[0];

    if (archivo){
        let reader = new FileReader();
        reader.onload = function(e){
            let contenido = e.target.result;
            //var texto = contenido.replace(/\n/g, '<br />');            
            document.getElementById("Entrada").innerHTML = contenido;//texto;
            editor.setValue(contenido);
        };

        reader.readAsText(archivo);
    }else{
        alert('No se ha seleccionado ningún archivo.');
    }
};

function abrirReporteAST(){
    //window.open("Paginas/reporteAST.html","popup","width=600,height=600");
    //window.open("Paginas/reporteAST.html","_blank");
    var informacion = document.getElementById('hiddenAST').value;
    document.getElementById('reporteASTGrafica').visible = true;
    document.getElementById('reporteASTGrafica').innerHTML = informacion;
}

function abrirReporteCST(){
    //window.open("Paginas/reporteAST.html","popup","width=600,height=600");
    //window.open("Paginas/reporteCST.html","_blank");
    var informacion = document.getElementById('hiddenCST').value;
    document.getElementById('reporteCSTGrafica').visible = true;
    document.getElementById('reporteCSTGrafica').innerHTML = informacion;
}

function abrirReporteErrores(){
    //window.open("Paginas/reporteAST.html","popup","width=600,height=600");
    //window.open("Paginas/reporteErrores.html","_blank");
    var informacion = document.getElementById('hiddenErrores').value;
    document.getElementById('reporteErroresTabla').visible = true;
    document.getElementById('reporteErroresTabla').innerHTML = informacion;
}

function abrirReporteTS(tabla){
    //window.open("Paginas/reporteAST.html","popup","width=600,height=600");
    var tablas = document.getElementById("hiddenTablaSimbolos").value;
    //tablas = tablas.replace('\n','');
    //var url = "Paginas/reporteTS.html?Tabla="+tablas;
    //alert("URL: \n"+tablas);
    //window.open(url,"_blank");
    document.getElementById('reporteTablaSimbolosIndex').visible = true;
    document.getElementById('reporteTablaSimbolosIndex').innerHTML = tablas;
}

function abrirReporteGramatical(){
    //window.open("Paginas/reporteAST.html","popup","width=600,height=600");
    //window.open("Paginas/reporteGramatical.html","_blank");
    var informacion = document.getElementById('hiddenGramatical').value;
    document.getElementById('reporteGramatical').visible = true;
    document.getElementById('reporteGramatical').innerHTML = informacion;
}


/*********************GRAFICA ARBOL **********************************************/
function probandoArbol(){
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


    /* Forma de llamar a la función de graficación de CST*/
    var resultado = graficarArbolCST(Tree);
    pruebaGraficarViz(resultado);
    console.log("\n\n********GRAPHVIZ CODE*************\n");
    console.log(resultado);
}

function probandoArbolAST(){
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



    /* Forma de llamar a la función de graficación de CST*/
    var resultado = graficarArbolAST(Tree);
    pruebaGraficarViz(resultado);
    console.log("\n\n********GRAPHVIZ CODE*************\n");
    console.log(resultado);
}

function pruebaGraficarViz(grafica){
    var viz = new Viz();
    viz.renderSVGElement(grafica)
    .then(function(element) {
        //document.body.appendChild(element);
        alert('entro a la funcion elemento');
        let elemento = document.getElementById('grafica');
        elemento.appendChild(element);
    })
    .catch(error => {
        viz = new Viz();
        console.error(error);
    });
}
/***********************************FUNCIONES ESPECÍFICAS DE CODE MIRROR**************************************************** */
function numerar(){
    var contador = 0;
    var contenido = document.getElementById('Entrada').value;
    var lineas = contenido.replace(new RegExp(/([a-z0-9]+)(\s?)/g), function(or) {contador += 1; return contador + '. ' + or});

    document.getElementById('textA').value = lineas;
}

var code = $(".codemirror-textarea")[0];
var editor = CodeMirror.fromTextArea(code, {
    lineNumbers : true,
    mode: "application/xml",
    enterMode: "indent",
    tabMode: "shift",
    autoRefresh: true
});


function showCode(){
    var text = editor.getValue();
    return text;
}