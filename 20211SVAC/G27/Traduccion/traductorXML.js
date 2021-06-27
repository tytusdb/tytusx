let stack = [];
let heap = [];
let contador = 0;
var s = "";
var y = "";
var contadorTemporal=0;
var tmpStack = 0;
var tmpHeap = 0;

function generarXMLC3D(ts){
    //si la tabla de símbolos si tiene objetos se procede a recorrer los nodos
    var cantidadObjetos = ts.getCantidadObjetos();
    var texto = "";

    alert("Cantidad de Objetos XML: "+cantidadObjetos);
    if (cantidadObjetos > 0){
        texto += generaEncabezadoXML3D();
        for (var i = 0; i < cantidadObjetos; i++){
            texto += generarCodigo3DEtiqueta(ts.listaObjetos[i], ts);
        }
        texto += generaCierreXML3D();
        console.log("Codigo 3D: \n"+texto);
        var tablaSimbolosContenido = imprimeTablaSimbolos3D(ts);
        console.log(tablaSimbolosContenido);
        console.log("\n\n*************DATOS DE STACK Y HEAP************************\n");
        console.log("Cantidad de elementos en stack: "+ stack.length + "\n");
        console.log("Cantidad de elementos en heap: " + heap.length + "\n");
    }
}

//------------función que genera el encabezado para el código 3 direcciones----------------------
function generaEncabezadoXML3D(){   
    var texto = "";
    texto  += "/***********HEADER**********/\n";
    texto  += "#include <stdio.h>\n\n";
    texto  += "double heap[30101999];\n";
    texto  += "double stack[30101999];\n";
    texto  += "double S;\n";
    texto  += "double H; \n\n";

    texto += "/*--------MAIN---------*/\n";
    texto += "void main(){\n";
    texto += "S = 0; H = 0;\n\n";

    return texto;
}

function generaCierreXML3D(){
    var texto = "";
    texto += "\nreturn;\n";
    texto += "}\n";

    return texto;
}


function generarCodigo3DEtiqueta(objeto, ts){
    var texto = "";
    
    var longitud = obtieneLongitudCadena(objeto.identificador);
    alert("Longitud: "+ longitud);
    var cadena = objeto.identificador; //Etiqueta1
    var arregloCadena = cadena.split('');
    
    texto += "\n/*----------------------*/\n";
    tmpStack = contadorTemporal; //0
    texto += "t"+contadorTemporal+" = S;\n"; // t0 = S;

    //se envía a la tabla de símbolos el temporal o SP que corresponde al objeto.
    ts.insertaTemporal(objeto.identificador, "t"+contadorTemporal);

    contadorTemporal++; //1
    tmpHeap = contadorTemporal; //1
    texto += "t"+contadorTemporal+" = H;\n" // t1 = H;
    
    texto += "STACK[t"+tmpStack+"] = t"+contadorTemporal+";\n";  // Stack[t0] = t1
    stack.push(objeto.identificador);
    tmpStack = contadorTemporal; //1
    contadorTemporal++; //2

    arregloCadena.forEach(element => {
        var asciiCaracter = element.charCodeAt(0);
        texto += "HEAP[t"+tmpHeap+"] = " + asciiCaracter + ";\n"; // HEAP[t1] = ascii; Heap[t2] = ascii;
        heap.push(asciiCaracter);
        texto += "H = t"+tmpHeap + " + 1;\n"; //H = t1 + 1; H = t2 + 1;
        tmpHeap = contadorTemporal; //2 //3
        texto += "t"+contadorTemporal + " = H;\n" //t3 = H; // t4 = H;
        contadorTemporal++; //3 //4
    });

    //Se agrega el -1 al final de la cadena en heap
    texto += "HEAP[t"+tmpHeap+"] = -1;\n"; // HEAP[t1] = ascii; Heap[t2] = -1;
    heap.push("-1");
    texto += "H = t"+tmpHeap + " + 1;\n"; //H = t1 + 1; H = t2 + 1;
    tmpHeap = contadorTemporal; //2 //3
    texto += "t"+contadorTemporal + " = H;\n" //t3 = H; // t4 = H;

    texto += "S = t"+contadorTemporal + " + 1;\n"; //P = tn + 1;
    contadorTemporal++;
    
    //finaliza la traducción a C3D de una etiqueta
    return texto;
   
}

const obtieneLongitudCadena = function(cadena){
    "use strict";

    var codePoint, acumulado = 0;

    for (var stringIndex = 0, endOfString = cadena.length; stringIndex < endOfString; stringIndex++)
    {
        codePoint = cadena.charCodeAt( stringIndex );
        if (codePoint < 0x100){
            acumulado += 1;
            continue;
        }

        if (codePoint < 0x10000){
            acumulado += 2;
            continue;
        }

        if (codePoint < 0x1000000){
            acumulado += 3;
        }else {
            acumulado += 4;
        }
    }

    return acumulado * 2;
}

function pruebaC3D(){
    //var nodo1 = new tsObjeto('Etiquetas', 'Nodo','Global',0);
    //var nodo2 = new tsObjeto('Etiqueta1', 'Nodo','Etiquetas',0);
    //var nodo3 = new tsObjeto('Nombre', 'Atributo','Etiqueta1',0);
    var tablaSimbolos = new tsXML();

    tablaSimbolos.insertarObjeto('Etiquetas', 'Nodo','Global',0);
    tablaSimbolos.insertarObjeto('ABC', 'Nodo','Etiquetas', 0);
    //tablaSimbolos.insertarObjeto('Nombre', 'Atributo','Etiqueta1');

    generarXMLC3D(tablaSimbolos);
}

function imprimeTablaSimbolos3D(ts){
    var texto = "";
    var indice = 0;
    var cantidadObjetos = ts.getCantidadObjetos();
    if (cantidadObjetos > 0)
    {
        texto += "\n\n*******************************************************************************\n";
        texto += "***************************TABLA DE SÍMBOLOS***********************************\n";
        texto += "INDICE    |   IDENTIFICADOR   |   ENTORNO   |   TIPO  |   SP  |   LONGITUD    |\n";
        texto += "_______________________________________________________________________________\n";
        ts.listaObjetos.forEach(element => {
            texto += "    "+indice+"       "+ "|     " + element.identificador + "     |     " + element.entorno + "       |       " + element.tipo + "     |       " + element.sp + "     |      " + element.longitud + "   | \n";
            indice++;
        });
    }

    return texto;
}
