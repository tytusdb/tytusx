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
var actualizaPadre=true;

function generarXMLC3D(ts){
    //si la tabla de símbolos si tiene objetos se procede a recorrer los nodos
    var cantidadObjetos = ts.getCantidadObjetos();
    var texto = "";
    var texto2 = "";

    //alert("Cantidad de Objetos XML: "+cantidadObjetos);
    if (cantidadObjetos > 0){
        //se escribe el encabezado de la traducción a lenguaje C
        texto += generaEncabezadoXML3D();

        //En texto2 se construye todo el codigo 3D de las etiquetas de la tabla de símbolos
        for (var i = 0; i < cantidadObjetos; i++){
            if (getIntTipoObjeto(ts.listaObjetos[i].tipo) != 3){
                texto2 += generarCodigo3DEtiqueta(ts.listaObjetos[i], ts);
            }else{
                texto2 += generarCodigo3DContenido(ts.listaObjetos[i-1],ts.listaObjetos[i], ts);
            }
        }
 
        //Se asigna la declaracion de temporales
        texto += creaAsignacionDeTemporales(ts);
        //Se agrega todo el C3D de etiquetas generado dentro del for.
        texto += texto2;        
        texto += actualizaC3D(ts, tmpStack,tmpHeap);        
        //Se crea el cierre de la clase C que representará el código
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
    texto  += "double HEAP[30101999];\n";
    texto  += "double STACK[30101999];\n";
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
    //se envía a la tabla de símbolos el temporal o SP que corresponde al objeto.
    ts.insertaTemporal(objeto.i, objeto.identificador, "t"+contadorTemporal);    
    contadorTemporal++;
    
    //se inserta en stack el tipo de objeto
    texto += "t"+ contadorTemporal + " = " + getIntTipoObjeto(objeto.tipo) + ";\n"; // tx = tipoObjeto;
    tmpStack = contadorTemporal;
    //contadorTemporal++;
    texto += "STACK[t" + posicionInicialStack + "] = t" + tmpStack + ";\n"; // STACK[tz] = tx;
    texto += "S = S + 1;\n";
    objetoS.setTipo(getIntTipoObjeto(objeto.tipo));
    

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
        contadorTemporal++; //3 //4
    });        
    //Se agrega el -1 al final de la cadena en heap
    texto += "HEAP[t"+tmpHeap+"] = -1;\n"; // HEAP[t1] = ascii; Heap[t2] = -1;
    heap.push("-1");
    texto += "H = H + 1;\n"; //H = t1 + 1;
    tmpHeap = contadorTemporal; //2 //3
    //texto += "t"+contadorTemporal + " = H;\n" //t3 = H; // t4 = H;
    actualizaPadre=true;
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
    

    //CREA OBJETO HIP E INSERTA EN LISTA HEAP       
    var objetoH = new tsObjetoHeap(tmpHeap,-1);
    //INSERTA EL OBJETO HEAP EN LA LISTA HEAP
    heapv2.listaObjetos.push(objetoH);
    //finaliza la traducción a C3D de una etiqueta
    return texto;
   
}

function generarCodigo3DContenido(objetoAnterior,objeto, ts){
    var texto = "";  
    var objetoS = new tsObjetoStack("","","","","",0);
    var actualizaPadre=true;
    var posicionInicialStack = 0;
    var temporalAtributos = 0;
    var temporalHijos = 0;
    var temporalContenido = 0;
    objetoS.numId=objeto.i;

    var longitud = obtieneLongitudCadena(objeto.identificador);    
    var cadena = objeto.identificador; //Etiqueta1
    var arregloCadena = cadena.split('');
    texto += "\n/*----------------------*/\n";
    tmpStack = contadorTemporal; //0
    //texto += "t"+contadorTemporal+" = S;\n"; // t0 = S;
    texto += "t"+contadorTemporal+" = " + objetoAnterior.sp + " + 4;\n"; // t27 = t12 +4;
    posicionInicialStack = contadorTemporal;
    contadorTemporal++;
    
    //se inserta en stack el tipo de objeto
    texto += "t"+ contadorTemporal + " = H;\n"; // t28 = H;
    tmpStack = contadorTemporal;
    //contadorTemporal++;
    texto += "STACK[t" + posicionInicialStack + "] = t" + tmpStack + ";\n"; // STACK[27] = t28;

    tmpStack = contadorTemporal;
    tmpHeap = contadorTemporal;
    contadorTemporal++;

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
        contadorTemporal++; //3 //4        
    });    

    //Se agrega el -1 al final de la cadena en heap
    texto += "HEAP[t"+tmpHeap+"] = -1;\n"; // HEAP[t1] = ascii; Heap[t2] = -1;
    heap.push("-1");
    texto += "H = H + 1;\n"; //H = t1 + 1;
    tmpHeap = contadorTemporal; //2 //3
    //texto += "t"+contadorTemporal + " = H;\n" //t3 = H; // t4 = H;

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


function actualizaC3D(ts, temporalStack, temporalHeap){
    var texto="\n\n/*------------------------------------------*/\n\n";
    var boolAgregaEtiqueta=false;
    var boolAgregaAtributo=false; 
    var tmptxt3dAtributo="";
    var tmptxt3dEtiqueta="";
    for(var i=0;i<ts.listaObjetos.length;i++){

        if(getIntTipoObjeto(ts.listaObjetos[i].tipo)==1 || getIntTipoObjeto(ts.listaObjetos[i].tipo)==2)
        {
            var temporal = ts.listaObjetos[i].sp.slice(1);                     
            if(ts.listaObjetos[i].listaAtributos.length>0)
            {                
                tmptxt3dAtributo+="t"+temporalStack+"= t"+temporal+"+2;\n";
                tmptxt3dAtributo+="STACK[t"+temporalStack+"]=H;\n";
                tmptxt3dAtributo+="S=S+1;\n";                
                ts.listaObjetos[i].listaAtributos.forEach(  function(value)
                {
                    if(temporalStack>temporalHeap){                        
                        temporalHeap=temporalStack+1;
                    }
                    else{
                        temporalHeap++;                        
                    }                                                                
                    tmptxt3dAtributo+="t"+temporalHeap+"=H;\n";
                    tmptxt3dAtributo+="HEAP[t"+temporalHeap+"]="+ value +";\n";
                    tmptxt3dAtributo+="H=H+1;\n";                    
                    boolAgregaAtributo=true;
                });                  
                temporalHeap++;                
                tmptxt3dAtributo+="t"+temporalHeap+"=H;\n";
                tmptxt3dAtributo+="HEAP[t"+temporalHeap+"]=-1;\n";
                tmptxt3dAtributo+="H=H+1;\n";             
                temporalHeap++;
                temporalStack=temporalHeap;                
                temporalHeap++;
            }
           

            if(ts.listaObjetos[i].listaEtiquetasHijas.length>0)
            {        
                var temporal = ts.listaObjetos[i].sp.slice(1);                
                tmptxt3dEtiqueta+="t"+temporalStack+"= t"+temporal+"+ 3;\n";
                tmptxt3dEtiqueta+="STACK[t"+temporalStack+"]=H;\n";
                tmptxt3dEtiqueta+="S=S+1;\n";                               
                ts.listaObjetos[i].listaEtiquetasHijas.forEach(  function(value)
                {
                    if(temporalStack>temporalHeap){                        
                        temporalHeap=temporalStack+1;
                    }
                    else{
                        temporalHeap++;                     
                    }
                    tmptxt3dEtiqueta+="t"+temporalHeap+"=H;\n";
                    tmptxt3dEtiqueta+="HEAP[t"+temporalHeap+"]="+ value +";\n";
                    tmptxt3dEtiqueta+="H=H+1;\n";                    
                    boolAgregaEtiqueta=true;
                });                
                temporalHeap++;
                tmptxt3dEtiqueta+="t"+temporalHeap+"=H;\n";
                tmptxt3dEtiqueta+="HEAP[t"+temporalHeap+"]=-1;\n";
                tmptxt3dEtiqueta+="H=H+1;\n";             
                temporalHeap++;
                temporalStack=temporalHeap;                
                //temporalHeap++;
            }
        }

    }
    if(boolAgregaEtiqueta)
    {
        texto+=tmptxt3dEtiqueta;                
    }    
    if(boolAgregaAtributo)
    {
        texto+=tmptxt3dAtributo;        
    }    
    return texto;
}

