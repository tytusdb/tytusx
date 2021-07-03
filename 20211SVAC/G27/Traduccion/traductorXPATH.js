var contadorEtiquetas = 0;

//Función que se encarga de tomar los caracteres correspondientes a números dentro del HEAP y los convierte a un número.
function parseDigitosXpath(posicionHeap, contadorTemporal){
    var texto = "\n\n";
    //var expresion = heap[posicionHeap];//se obtiene el caracter que está en x posición dentro del Heap hasta que encuentre -1
    var digitos;
    var i = 0;
    var temporalAnterior = contadorTemporal;
    //var contadorEtiquetas = 0;
    var temporalResultado = 0;
    var temporalValorNumerico = 0; //etiqueta para almacenar el ascii - 48
    var temporalPosicionHeap = 0; //correlativo de la etiqueta que hace referencia a la posición del puntero del heap
    var etiquetaFuncionPadre = 0; //correlativo de la etiqueta inicial L1

    /*
    t0 = posicionHeap;
    t1 = t0;
    t2 = 0;

    L1:
        t3 = heap[t1];
        t4 = t3 - 48;
        if (t4 < 0) goto L2;
            t5 = t2 * 10;
            t6 = t5 + t4; 
            t2 = t6;
            t1 = t1 + 1;
            goto L1;
    L2:
        //continuación

    */

    /* Se definen temporales iniciales*/
    texto += "t"+ contadorTemporal + " = " + posicionHeap + ";\n"; //t0 = posicionHeap;
    contadorTemporal++;
    texto += "t" + contadorTemporal + " = t" + temporalAnterior + ";\n" //t1 = t0; 
    temporalPosicionHeap = contadorTemporal;
    temporalAnterior = contadorTemporal;
    
    /* Se define el temporal que almacenara recursivamente el resultado de la conversión de dígitos*/
    contadorTemporal++;
    texto += "t" + contadorTemporal + " = 0;\n";  //t2 = 0;
    temporalResultado = contadorTemporal;
    temporalAnterior = contadorTemporal;

    /*Inicia construcción de etiqueta L1 */
    texto += "L" + contadorEtiquetas + ":\n"; //L1:
    etiquetaFuncionPadre = contadorEtiquetas;

    texto += "\t";
    texto += "t" + contadorTemporal + " = heap[t" + temporalAnterior + "];\n"; //t3 = heap[t1];
    temporalAnterior = contadorTemporal;
    contadorTemporal++;

    texto += "\t";
    texto += "t" + contadorTemporal + " = t" + temporalAnterior + " - 48;\n"; //t4 = t3 - 48;
    temporalValorNumerico = contadorTemporal;

    
    contadorEtiquetas++; //se aumenta en +1 el contador de etiquetas: 
    texto += "\t";
    
    /* Se define el código 3D para el if que compara si se logró un resultado coherente en el algoritmo */
    texto += "if(t" + contadorTemporal + " < 0) goto L"+contadorEtiquetas+";\n"; //if (t4 < 0) goto L2;
    temporalAnterior = contadorTemporal;
    contadorTemporal++;

    //inician las líneas para el casteo de la información
    texto += "\t\tt" + contadorTemporal + " = t"+temporalResultado+" * 10;\n";//t5 = t2 * 10;
    temporalAnterior = contadorTemporal;
    contadorTemporal++;

    
    texto += "\t\tt" + contadorTemporal + " = t" + temporalAnterior + " + t" + temporalValorNumerico + ";\n"; //t6 = t5 + t4; 
    texto += "\t\tt" + temporalValorNumerico + " = t" + contadorTemporal + ";\n"; // t2 = t6;
    texto += "\t\tt" + temporalPosicionHeap + " = " + "t" + temporalPosicionHeap + " + 1;\n"; // t1 = t1 + 1;
    texto += "\t\tgoto L" + etiquetaFuncionPadre + ";\n"; //goto L1;
    texto += "L" + contadorEtiquetas + ":\n"; //L2:

    contadorEtiquetas++;

    return texto;
}

function pruebaParseoDigitosXpath(contadorTemporales){
    /* se crea un heap ficticio con varias entradas */
    var heap = [];
    var resultado = "";
    var contenidoHeap = "";
    var i = 0;
    /* Se llena el heap con digitos*/
    heap.push("2");
    heap.push("5");
    heap.push(-1);
    heap.push("1");
    heap.push("0");
    heap.push(-1);
    heap.push("5");
    heap.push("3");
    heap.push("2");
    heap.push(-1);

    /* se recorre el heap para preparar el código para cada */
    heap.forEach(element => {
        if (element != -1)
        {
            resultado += parseDigitosXpath(i, contadorTemporales);
        }
        contenidoHeap += "[" + i + "][" + element + "]\n";
        i++;
    });
    console.log("\n\n***********************************************************************\n");
    
    console.log("Resultado de Parseo de Digitos: \n");
    console.log(contenidoHeap + "\n" + resultado);
}
/*
function convertirAscii(digitoAscii){
    var resultado = digitoAscii - 48;
    return resultado;
}*/