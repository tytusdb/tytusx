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
            if (ts.listaObjetos[i].tipo != 3){
                texto2 += generarCodigo3DEtiqueta(ts.listaObjetos[i], ts);
            }else{
                texto2 += generarCodigo3DContenido(ts.listaObjetos[i], ts);
            }
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


function generarCodigo3DEtiqueta(objeto, ts)
{
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
    var posicionInicialStack = 0;
    var temporalAtributos = 0;
    var temporalHijos = 0;
    var temporalContenido = 0;
    objetoS.numId=objeto.i;

    var longitud = obtieneLongitudCadena(objeto.identificador);
    //alert("Longitud: "+ longitud);
    var cadena = objeto.identificador; //Etiqueta1
    var arregloCadena = cadena.split('');
    
    texto += "\n/*----------------------*/\n";
    tmpStack = contadorTemporal; //0
    texto += "t"+contadorTemporal+" = S;\n"; // t0 = S;
    posicionInicialStack = contadorTemporal;
    contadorTemporal++;
    
    //se inserta en stack el tipo de objeto
    texto += "t"+ contadorTemporal + " = " + getIntTipoObjeto(objeto.tipo) + ";\n"; // tx = tipoObjeto;
    tmpStack = contadorTemporal;
    //contadorTemporal++;
    texto += "STACK[t" + posicionInicialStack + "] = t" + tmpStack + ";\n"; // STACK[tz] = tx;
    texto += "S = S + 1;\n";
    objetoS.setTipo(getIntTipoObjeto(objeto.tipo));
    
    //se envía a la tabla de símbolos el temporal o SP que corresponde al objeto.
    ts.insertaTemporal(objeto.i, objeto.identificador, "t"+contadorTemporal);

    //Se inserta en stack el apuntador al nombre de etiqueta
    objetoS.setApuntadorNombre(contadorTemporal);//Actualiza posicion de objeto en el stack
    contadorTemporal++; //1
    tmpHeap = contadorTemporal; //1
    texto += "t"+contadorTemporal+" = H;\n" // t1 = H;
    
    tmpStack = contadorTemporal;
    contadorTemporal++;
    texto += "t" + contadorTemporal + " = S;\n";
    texto += "STACK[t"+contadorTemporal+"] = t"+tmpStack+";\n";  // Stack[t1] = t0
    texto += "S = S + 1;\n";
    stack.push(objeto.identificador);

    tmpStack = contadorTemporal; //1
    contadorTemporal++; //2

    arregloCadena.forEach(element => {
        var asciiCaracter = element.charCodeAt(0);
        texto += "HEAP[t"+tmpHeap+"] = " + asciiCaracter + ";\n"; // HEAP[t1] = ascii; Heap[t2] = ascii;
        heap.push(asciiCaracter);
        //CREA OBJETO HIP E INSERTA EN LISTA HEAP       
        var objetoH = new tsObjetoHeap(tmpHeap,asciiCaracter);         
        //INSERTA EL OBJETO HEAP EN LA LISTA HEAP
        heapv2.listaObjetos.push(objetoH);
        texto += "H = H + 1;\n"; //H = H + 1;
        tmpHeap = contadorTemporal; //2 //3
        //contadorTemporal++;
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
    texto += "H = H + 1;\n"; //H = t1 + 1;
    tmpHeap = contadorTemporal; //2 //3
    //texto += "t"+contadorTemporal + " = H;\n" //t3 = H; // t4 = H;

    //Se inserta un -1 en el stack como referencia a los atributos
    //tmpStack = contadorTemporal;
    //contadorTemporal++;
    texto += "t" + contadorTemporal + " = -1;\n"; //tx = -1;
    temporalAtributos = contadorTemporal;
    objetoS.setApuntadorAtributos(-1); //al inicio se inserta -1 porque está vacío

    //Se inserta un -1 en el stack como referencia a las etiquetas hijas
    tmpStack = contadorTemporal;
    contadorTemporal++;
    texto += "t" + contadorTemporal + " = -1;\n"; // tx = -1;
    temporalHijos = contadorTemporal;
    objetoS.setApuntadorHijos(-1); //al inicio se inserta -1 porque está vacío

    //Se inserta un -1 en el stack como referencia a cadena de contenido de etiqueta
    tmpStack = contadorTemporal;
    contadorTemporal++;
    texto += "t" + contadorTemporal + " = -1;\n";
    temporalContenido = contadorTemporal;
    objetoS.setApuntadorContenido(-1);

    tmpStack = contadorTemporal;
    contadorTemporal++;
    //texto += "t"+contadorTemporal + " = S;\n";

    //texto += "S = S + 1;\n"; //P = S + 1;
    //tmpStack = contadorTemporal;
    //contadorTemporal++;

    //se inserta en stack el valor de los atributos
    texto += "t" + contadorTemporal + " = S;\n"; //tx = S;
    texto += "STACK[t"+contadorTemporal+"] = t"+temporalAtributos+";\n";  // Stack[t1] = t0
    texto += "S = S + 1;\n"; //P = S + 1;
    tmpStack = contadorTemporal;
    contadorTemporal++;

    //se inserta en stack el valor de los Hijos
    texto += "t" + contadorTemporal + " = S;\n"; //tx = S;
    texto += "STACK[t"+contadorTemporal+"] = t"+temporalHijos+";\n";  // Stack[t1] = t0
    texto += "S = S + 1;\n"; //P = S + 1;
    tmpStack = contadorTemporal;
    contadorTemporal++;

    //se inserta en stack el valor de los Hijos
    texto += "t" + contadorTemporal + " = S;\n"; //tx = S;
    texto += "STACK[t"+contadorTemporal+"] = t"+temporalContenido+";\n";  // Stack[t1] = t0
    texto += "S = S + 1;\n"; //P = S + 1;
    tmpStack = contadorTemporal;
    contadorTemporal++;
    
    actualizaPadre=true;

    //CREA OBJETO HIP E INSERTA EN LISTA HEAP       
    var objetoH = new tsObjetoHeap(tmpHeap,-1);
    //INSERTA EL OBJETO HEAP EN LA LISTA HEAP
    heapv2.listaObjetos.push(objetoH);

    //finaliza la traducción a C3D de una etiqueta
    return texto;
   
}

function generarCodigo3DContenido(objeto, ts){
    var texto = "";  
    var objetoS = new tsObjetoStack("","","","","",0);
    var actualizaPadre=true;
    var posicionInicialStack = 0;
    var temporalAtributos = 0;
    var temporalHijos = 0;
    var temporalContenido = 0;
    objetoS.numId=objeto.i;

    var longitud = obtieneLongitudCadena(objeto.identificador);
    //alert("Longitud: "+ longitud);
    var cadena = objeto.identificador; //Etiqueta1
    var arregloCadena = cadena.split('');
    
    texto += "\n/*----------------------*/\n";
    tmpStack = contadorTemporal; //0
    texto += "t"+contadorTemporal+" = S;\n"; // t0 = S;
    posicionInicialStack = contadorTemporal;
    contadorTemporal++;
    
    //se inserta en stack el tipo de objeto
    texto += "t"+ contadorTemporal + " = " + getIntTipoObjeto(objeto.tipo) + ";\n"; // tx = tipoObjeto;
    tmpStack = contadorTemporal;
    //contadorTemporal++;
    texto += "STACK[t" + posicionInicialStack + "] = t" + tmpStack + ";\n"; // STACK[tz] = tx;
    texto += "S = S + 1;\n";
    objetoS.setTipo(getIntTipoObjeto(objeto.tipo));
    
    //se envía a la tabla de símbolos el temporal o SP que corresponde al objeto.
    ts.insertaTemporal(objeto.i, objeto.identificador, "t"+contadorTemporal);

    //Se inserta en stack el apuntador al nombre de etiqueta
    objetoS.setApuntadorNombre(contadorTemporal);//Actualiza posicion de objeto en el stack
    contadorTemporal++; //1
    tmpHeap = contadorTemporal; //1
    texto += "t"+contadorTemporal+" = H;\n" // t1 = H;
    
    tmpStack = contadorTemporal;
    contadorTemporal++;
    texto += "t" + contadorTemporal + " = S;\n";
    texto += "STACK[t"+contadorTemporal+"] = t"+tmpStack+";\n";  // Stack[t1] = t0
    texto += "S = S + 1;\n";
    stack.push(objeto.identificador);

    tmpStack = contadorTemporal; //1
    contadorTemporal++; //2

    arregloCadena.forEach(element => {
        var asciiCaracter = element.charCodeAt(0);
        texto += "HEAP[t"+tmpHeap+"] = " + asciiCaracter + ";\n"; // HEAP[t1] = ascii; Heap[t2] = ascii;
        heap.push(asciiCaracter);
        //CREA OBJETO HIP E INSERTA EN LISTA HEAP       
        var objetoH = new tsObjetoHeap(tmpHeap,asciiCaracter);         
        //INSERTA EL OBJETO HEAP EN LA LISTA HEAP
        heapv2.listaObjetos.push(objetoH);
        texto += "H = H + 1;\n"; //H = H + 1;
        tmpHeap = contadorTemporal; //2 //3
        //contadorTemporal++;
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
    texto += "H = H + 1;\n"; //H = t1 + 1;
    tmpHeap = contadorTemporal; //2 //3
    //texto += "t"+contadorTemporal + " = H;\n" //t3 = H; // t4 = H;

    //Se inserta un -1 en el stack como referencia a los atributos
    //tmpStack = contadorTemporal;
    //contadorTemporal++;
    texto += "t" + contadorTemporal + " = -1;\n"; //tx = -1;
    temporalAtributos = contadorTemporal;
    objetoS.setApuntadorAtributos(-1); //al inicio se inserta -1 porque está vacío

    //Se inserta un -1 en el stack como referencia a las etiquetas hijas
    tmpStack = contadorTemporal;
    contadorTemporal++;
    texto += "t" + contadorTemporal + " = -1;\n"; // tx = -1;
    temporalHijos = contadorTemporal;
    objetoS.setApuntadorHijos(-1); //al inicio se inserta -1 porque está vacío

    //Se inserta un -1 en el stack como referencia a cadena de contenido de etiqueta
    tmpStack = contadorTemporal;
    contadorTemporal++;
    texto += "t" + contadorTemporal + " = -1;\n";
    temporalContenido = contadorTemporal;
    objetoS.setApuntadorContenido(-1);

    tmpStack = contadorTemporal;
    contadorTemporal++;
    //texto += "t"+contadorTemporal + " = S;\n";

    //texto += "S = S + 1;\n"; //P = S + 1;
    //tmpStack = contadorTemporal;
    //contadorTemporal++;

    //se inserta en stack el valor de los atributos
    texto += "t" + contadorTemporal + " = S;\n"; //tx = S;
    texto += "STACK[t"+contadorTemporal+"] = t"+temporalAtributos+";\n";  // Stack[t1] = t0
    texto += "S = S + 1;\n"; //P = S + 1;
    tmpStack = contadorTemporal;
    contadorTemporal++;

    //se inserta en stack el valor de los Hijos
    texto += "t" + contadorTemporal + " = S;\n"; //tx = S;
    texto += "STACK[t"+contadorTemporal+"] = t"+temporalHijos+";\n";  // Stack[t1] = t0
    texto += "S = S + 1;\n"; //P = S + 1;
    tmpStack = contadorTemporal;
    contadorTemporal++;

    //se inserta en stack el valor de los Hijos
    texto += "t" + contadorTemporal + " = S;\n"; //tx = S;
    texto += "STACK[t"+contadorTemporal+"] = t"+temporalContenido+";\n";  // Stack[t1] = t0
    texto += "S = S + 1;\n"; //P = S + 1;
    tmpStack = contadorTemporal;
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
        texto += "  INDICE    |       TIPO        |   apuntadorNombre     |   apuntadorAtributos  |      apuntadorHijos    |     apuntadorContenido  | \n";
        texto += "____________________________________________________________________________________________________________________________________\n";
        for (var i = 0; i < tsStack.listaObjetos.length; i++) {
            texto += "    "+indice+"       "+ "|         " + tsStack.listaObjetos[i].tipo + "         |             " + tsStack.listaObjetos[i].apuntadorNombre + "         |            " + tsStack.listaObjetos[i].apuntadorAtributos + "         |           " + tsStack.listaObjetos[i].apuntadorHijos + "          |           " + tsStack.listaObjetos[i].apuntadorContenido +  "           | \n";            
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