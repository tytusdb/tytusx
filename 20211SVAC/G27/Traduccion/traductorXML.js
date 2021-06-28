let stack = [];
let heap = [];
let contador = 0;
var s = "";
var y = "";
var contadorTemporal=0;
var tmpStack = 0;
var tmpHeap = 0;
//Cambio
var stackv2 = new tsStack();
var heapv2 = new tsHeap();

function generarXMLC3D(ts){
    //si la tabla de símbolos si tiene objetos se procede a recorrer los nodos
    var cantidadObjetos = ts.getCantidadObjetos();
    var texto = "";
    var texto2 = "";

    alert("Cantidad de Objetos XML: "+cantidadObjetos);
    if (cantidadObjetos > 0){
        //se escribe el encabezado de la traducción a lenguaje C
        texto += generaEncabezadoXML3D();

        //En texto2 se construye todo el codigo 3D de las etiquetas de la tabla de símbolos
        for (var i = 0; i < cantidadObjetos; i++){
            texto2 += generarCodigo3DEtiqueta(ts.listaObjetos[i], ts);
        }
        //Se asigna la declaracion de temporales
        texto += creaAsignacionDeTemporales(ts);
        //Se agrega todo el C3D de etiquetas generado dentro del for.
        texto += texto2;
        //Se crea el cierre de la clase C que representará el código
        texto += generaCierreXML3D();

        console.log("Codigo 3D: \n"+texto);
        var tablaSimbolosContenido = imprimeTablaSimbolos3D(ts);
        console.log(tablaSimbolosContenido);
        console.log("\n\n*************DATOS DE STACK Y HEAP************************\n");
        console.log("Cantidad de elementos en stack: "+ stack.length + "\n");
        console.log("Cantidad de elementos en heap: " + heap.length + "\n");
        var txtStackv2 = recorreStackv2(stackv2);
        console.log(txtStackv2);
        var txtHeap2 = recorreHeapV2(heapv2);
        console.log(txtHeap2);
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
    /*
    tipo: any;
    apuntadorNombre: any;
    apuntadorAtributos: any;
    apuntadorHijos: any;
    apuntadorContenido: any;
    */        
    var objetoS = new tsObjetoStack("","","","","",0);
    var actualizaPadre=true;
    objetoS.numId=objeto.i;
    objetoS.setTipo(getIntTipoObjeto(objeto.tipo));

    var longitud = obtieneLongitudCadena(objeto.identificador);
    //alert("Longitud: "+ longitud);
    var cadena = objeto.identificador; //Etiqueta1
    var arregloCadena = cadena.split('');
    
    texto += "\n/*----------------------*/\n";
    tmpStack = contadorTemporal; //0
    texto += "t"+contadorTemporal+" = S;\n"; // t0 = S;

    //se envía a la tabla de símbolos el temporal o SP que corresponde al objeto.
    ts.insertaTemporal(objeto.i, objeto.identificador, "t"+contadorTemporal);
    //Actualiza posicion de objeto en el stack
    objetoS.getApuntadorNombre(contadorTemporal);

    contadorTemporal++; //1
    tmpHeap = contadorTemporal; //1
    texto += "t"+contadorTemporal+" = H;\n" // t1 = H;
    texto += "STACK[t"+tmpStack+"] = t"+contadorTemporal+";\n";  // Stack[t0] = t1
    stack.push(objeto.identificador);
    tmpStack = contadorTemporal; //1
    contadorTemporal++; //2

    objetoS.setApuntadorNombre(tmpHeap);
    arregloCadena.forEach(element => {
        var asciiCaracter = element.charCodeAt(0);
        texto += "HEAP[t"+tmpHeap+"] = " + asciiCaracter + ";\n"; // HEAP[t1] = ascii; Heap[t2] = ascii;
        heap.push(asciiCaracter);
        //CREA OBJETO HIP E INSERTA EN LISTA HEAP       
        var objetoH = new tsObjetoHeap(tmpHeap,asciiCaracter);         
        //INSERTA EL OBJETO HEAP EN LA LISTA HEAP
        heapv2.listaObjetos.push(objetoH);
        texto += "H = t"+tmpHeap + " + 1;\n"; //H = t1 + 1; H = t2 + 1;
        tmpHeap = contadorTemporal; //2 //3
        texto += "t"+contadorTemporal + " = H;\n" //t3 = H; // t4 = H;
        //VEFIFICA SI DEBE DE ACTUALIZAR EL PADRE
        if(actualizaPadre){ 
            var hijo = tmpHeap;
            for(var j=0;j<stackv2.listaObjetos.length;j++){
                if(objeto.padre.numId==stackv2.listaObjetos[j].numId){
                    if(objetoS.tipo==1){
                        if(Array.isArray(stackv2.listaObjetos[j].apuntadorHijos)){
                            stackv2.listaObjetos[j].apuntadorHijos.push(tmpHeap);
                        }
                        else{
                            stackv2.listaObjetos[j].apuntadorHijos=new Array();
                            stackv2.listaObjetos[j].apuntadorHijos.push(tmpHeap);
                        }
                    }
                    if(objetoS.tipo==2){
                        if(Array.isArray(stackv2.listaObjetos[j].apuntadorAtributos)){
                            stackv2.listaObjetos[j].apuntadorAtributos.push(tmpHeap);
                        }
                        else{
                            stackv2.listaObjetos[j].apuntadorAtributos=new Array();
                            stackv2.listaObjetos[j].apuntadorAtributos.push(tmpHeap);
                        } 
                    }
                    if(objetoS.tipo!=1 && objetoS.tipo!=2){                        
                        if(Array.isArray(stackv2.listaObjetos[j].apuntadorContenido)){
                            stackv2.listaObjetos[j].apuntadorContenido.push(tmpHeap);
                        }
                        else{
                            stackv2.listaObjetos[j].apuntadorContenido=new Array();
                            stackv2.listaObjetos[j].apuntadorContenido.push(tmpHeap);
                        } 
                    }

                    break;

                }
            }
            actualizaPadre=false;
            
        }

        contadorTemporal++; //3 //4
    });    
    //INSERTA EL OBJETO STACK EN LA LISTA STACK 
    stackv2.listaObjetos.push(objetoS);

    //Se agrega el -1 al final de la cadena en heap
    texto += "HEAP[t"+tmpHeap+"] = -1;\n"; // HEAP[t1] = ascii; Heap[t2] = -1;
    heap.push("-1");
    texto += "H = t"+tmpHeap + " + 1;\n"; //H = t1 + 1; H = t2 + 1;
    tmpHeap = contadorTemporal; //2 //3
    texto += "t"+contadorTemporal + " = H;\n" //t3 = H; // t4 = H;

    texto += "S = t"+contadorTemporal + " + 1;\n"; //P = tn + 1;
    contadorTemporal++;
    actualizaPadre=true;
    //CREA OBJETO HIP E INSERTA EN LISTA HEAP       
    var objetoH = new tsObjetoHeap(tmpHeap,-1);
    //INSERTA EL OBJETO HEAP EN LA LISTA HEAP
    heapv2.listaObjetos.push(objetoH);
    
    //finaliza la traducción a C3D de una etiqueta
    return texto;
   
}

function creaAsignacionDeTemporales(ts){
    //se recorre la tabla de símbolos y para cada uno de ellos se obtiene el temporal y se estructura su código en C
    var texto = "\n";
    // cantidadObjetos = ts.getCantidadObjetos();
    //var ultimoObjeto = ts.listaObjetos[cantidadObjetos-1];
    //var temporalObjeto = ultimoObjeto.sp.split('t');
    //alert("CantidadObjetosTemporalSeparado: "+temporalObjeto.length);
    //alert("literal de ultimo temporal: "+temporalObjeto[1]);
    //for (var i = 0; i <= temporalObjeto[1]; i++){

    //En la variable contadorTemporal se lleva el contedo de temporales creados
    for (var i = 0; i < contadorTemporal; i++)
    {
        texto += "Double t" + i + ";\n";
    }
    
    return texto;
}

//función simple para retornar el conteo de temporales creados y poder utilizar ese dato en otras clases para continuar la creación de temporales a partir de ese número.
function getConteoTemporales(){
    return contadorTemporal;
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






//CAMBIO
function getIntTipoObjeto(strTipoObjeto){
    var tipoObjeto=0;

    switch(strTipoObjeto){
        case "Etiqueta":
            tipoObjeto=1;
            break;
        case "Atributo":
           tipoObjeto=2;
            break;
        default:
            tipoObjeto=3;
        break;

    }
    return tipoObjeto;
}



function recorreStackv2(tsStack){

    var texto = "";
    var indice = 0;
    var cantidadObjetos = tsStack.getCantidadObjetos();
    if (cantidadObjetos > 0)
    {
        texto += "\n\n*******************************************************************************\n";
        texto += "******************      RECORRER STACK V2       ***********************************\n";
        texto += "  INDICE    |       TIPO        |   apuntadorNombre \n";
        texto += "_______________________________________________________________________________\n";
        for (var i = 0; i < tsStack.listaObjetos.length; i++) {
            texto += "    "+indice+"       "+ "|     " + tsStack.listaObjetos[i].tipo + "     |     " + tsStack.listaObjetos[i].apuntadorNombre + "   | \n";            
            /*texto += "\n\n******************      VALORES V2       ***********************************\n";
            texto += "  APUNTADOR \n";            
            for (var j = 0; j < tsStack.listaObjetos[i].apuntadorContenido.length; j++) {
                texto += "  "+tsStack.listaObjetos[i].apuntadorContenido[j]+ "   | \n";                            
                indice++;
            }*/
            indice++;
        }
    }

    return texto;
    
}


function recorreHeapV2(tsHeap){

    var texto = "";
    var indice = 0;
    var cantidadObjetos = tsHeap.getCantidadObjetos();
    if (cantidadObjetos > 0)
    {
        texto += "\n\n*******************************************************************************\n";
        texto += "******************      RECORRER HEAP V2       ***********************************\n";
        texto += "     POSICION        |   VALOR    \n";
        texto += "_______________________________________________________________________________\n";
        tsHeap.listaObjetos.forEach(element => {
            texto += "    " + element.posicion + "     |     " + element.valor + "   | \n";            
        });
    }

    return texto;
    
}


/*function repetido(num){
    var repe = false;
    for (i=0; i<=usados.length; i++) {
        if (num == usados[i]) {
            repe = true;
        }
    }
    return repe;
}

function aleatorio(min, max) {
    while (repe != false) {
        var num = Math.floor(Math.random()*(max-min+1))+min;
        var repe = repetido(num);
    }
    usados.push(num);
    return num;
}*/