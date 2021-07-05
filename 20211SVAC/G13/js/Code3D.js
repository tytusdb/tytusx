"use strict";
//clase de codigo de tres direcciones
Object.defineProperty(exports, "__esModule", { value: true });
var FilaTablaSimbolos_1 = require("./FilaTablaSimbolos");
var Code3D = /** @class */ (function () {
    /**
     * Constructor de un objeto tipo Code3D, los atributos
     * de esta clase se inicializan cuando se corren los comandos
     * que generan el codigo de tres direcciones
     */
    function Code3D() {
        this.header = this.setHeader();
        this.instrucciones_main = new Array();
        this.lista_temporales = new Array();
        this.contador_temps = 0;
        this.contador_heap = 0;
        this.contador_stack = 0;
        this.contador_tags = 0;
        this.top_heap = 0;
        this.top_stack = 0;
        this.xml_list = [];
        this.tabla_simbolos = [];
    }
    Code3D.prototype.getElements3DCode = function (xml, xpath) {
        var salida; //salida para codigo de tres direcciones
        var code3d = this.getCode3D(xml, xpath);
        var tablaSimbolos = this.getTablaSimbolos();
        salida = { codigo: code3d, tabla: tablaSimbolos };
        return salida;
    };
    /**
     * Crea cadenas de etiqueta y las agrega a lista global de etiquetas
     * @param start number | primer numero desde donde hace etiquetas
     * @param end number | ultimo numero hasta donde debe hacer etiquetas
     */
    Code3D.prototype.getAndAddTemps = function (start, end) {
        for (var i = start; i <= end; i++) {
            this.lista_temporales.push('t' + i);
        }
    };
    /**
    * Convierte una cadena de texto en codigo de tres direcciones para devolver
    * las instrucciones de 3 direcciones en un arreglo
    * @param texto string | texto a convertir en 3D_Code
    * @returns [string] | arreglo de cadenas
    */
    Code3D.prototype.turnTextTo3D = function (texto, msj) {
        var code3d = ['\n', '/* Guardar cadena en heap:inicio->' + texto + ' */'];
        if (msj !== undefined)
            code3d.push('//' + msj);
        var size = texto.length;
        for (var i = 0; i < size; i++) {
            code3d.push("heap[(int)H] = " + texto.charCodeAt(i) + ";");
            code3d.push('H = H + 1;');
        }
        code3d.push('heap[(int)H] = -1;\t//fin de cadena');
        code3d.push('H = H + 1;');
        code3d.push('/* Guardar cadena en heap:fin */\n');
        return code3d;
    };
    /**
     * Agrega una cadena o cadenas con el nombre de etiqueta temporal a usar en el
     * cuerpo del metodo instrucciones_main a la lista de temporales
     * @param tmp cadena o arreglo de cadenas que contienen etiquetas temporales
     * para el 3D_Code
     */
    Code3D.prototype.addTemporal = function (tmp) {
        if (Array.isArray(tmp) == true) {
            this.lista_temporales = this.lista_temporales.concat(tmp);
        }
        else if (typeof (tmp) == 'string') {
            this.lista_temporales.push(tmp);
        }
    };
    /**
     * Devuelve un string con la cadena final para un archivo con C-syntax para ejecutar el
     * 3D_Code, el encabezado y metodo instrucciones_main con su cuerpo incluido
     * @param xml ObjetoXML: recibe un objeto tipo ObjetoXML
     * @returns [string]: arreglo de strings
     */
    Code3D.prototype.getCode3D = function (xml, xpath) {
        this.xml_list = xml; //lista de objetos/etiquetas xml generadas durante el analisis
        if (xml.length == 0)
            return '';
        var cadena = ''; //cadena de salida
        cadena += this.header; // include <stdio.h> .... etc
        //Primer genero codo_3d para xml, ya que con esto tambien se obtiene 
        //numero de temporales usados para ello
        var xmlcode = this.setXMLCode(xml);
        //Se arma funcion para imprimir texto y las demas que sean necesarias
        var funciones = this.setFunctionPrint();
        //Se arma el codigo de tres direcciones para las instrucciones xPath
        var query = (xpath != undefined) ? this.setXpathCode(xpath) : [];
        /**Ahora se agregan todas la etiquetas temporales a usar
        * solo debe hacerse depues de que se ha generado todo el codigo
        * de tres direcciones en su totalidad porque durnate la generacion
        * se generan los temporales
        */
        cadena += 'double '; //double t0, t1, t2...
        for (var i = 0; i <= this.contador_temps; i++) {
            cadena += (i !== this.contador_temps) ? "t" + i + ", " : "t" + i;
            cadena += (i % 10 === 0 && i !== 0) ? '\n' : '';
        }
        cadena += ';\n\n';
        //Ahora agrego todas las funciones necesarias para la ejecusion
        cadena += '/*--------------NATIVE_FUNCTIONS--------------*/\n';
        cadena += funciones;
        //Ahora se escribe el contenido o cuerpo del metodo main
        cadena += '/*Instrucciones main*/\n';
        cadena += 'void main() {\n';
        cadena += '\tP = 0; H = 0;\n';
        //primero el codigo_3d de xml en donde guarda todo en estructuras junto con su identado
        for (var i = 0; i < xmlcode.length; i++) {
            cadena += '\t' + xmlcode[i] + '\n';
        }
        //codigo de tres direcciones de xpath
        for (var i = 0; i < query.length; i++) {
            cadena += '\t' + query[i] + '\n';
        }
        //Mensaje para informar que la ejecusion ha terminado
        cadena += '\tprintf("%c", (int)10);\n';
        cadena += ('\tprintf("Finished!...");\n');
        cadena += '\treturn;\n}';
        return cadena;
    };
    /**
     * Arma y genera el codigo de tres direcciones para las intrucciones de consultas
     * de xpath al hacer consultas
     * @param xpath [any]: lista de objetos devueltos por analizador de xpath
     * que contienen la informacion necesaria para generar el codigo de tres direcciones
     * @returns [string]: arreglo de strings con codigo de tres direcciones
     */
    Code3D.prototype.setXpathCode = function (xpath) {
        /*
        const Tipo = {
            "INTEGER" : 0, //+
            "DECIMAL" : 1, //+
            "STRING"  : 2, //+ Literalmente solo devuelve puro texto, importante: no tienen entorno
            "NODO"    : 3, //+
            "BOOLEAN" : 4,
            "ATRIB"   : 5, //+
            "ERROR"   : 6, //+
            "SIBLING" : 7
        }
         */
        //LITERAL-> constructor(tipo,valor)
        var code = []; //arreglo con codigo de tres direcciones
        var num = 0; //numero de identificacion de etiqueta
        var tipo = 0; //tipo de objeto
        var valor; //valor del objeto
        var obj;
        var size = xpath.length;
        for (var i = 0; i < size; i++) {
            obj = xpath[i];
            tipo = obj.tipo;
            valor = obj.valor;
            if (obj.entorno != undefined) { //Verifico que tenga entorno de lo contrario se hace algo diferente
                num = parseInt(obj.entorno.id);
                if (tipo == 3) { //para Nodos:etiquetas
                    code = code.concat(this.printTagComplete(num));
                }
                else if (tipo == 5) { //para atributos:texto
                    var tag = this.findXlmTag(num); //etiqueta xml
                    var indice = //indice en donde esta el atributo en la lista de atributos de tag
                     void 0; //indice en donde esta el atributo en la lista de atributos de tag
                    if (tag != undefined) {
                        indice = tag.findTagByVal(valor.toString());
                        console.log('index:' + indice);
                        if (indice != undefined) {
                            var saltos = 0; //numero de saltos hasta encontrar la posicion del atributo dentro del heap
                            for (var i_1 = 0; i_1 < indice; i_1++) {
                                //siempre le sumo 1 por el -1 que esta al final del atributo dentro del heap
                                saltos += tag.lista_atributos[i_1].getLongitud() + 1;
                            }
                            if (typeof (indice) == 'number') {
                                code = code.concat(this.printAtribute(num, saltos));
                            }
                        }
                    }
                }
                else if (tipo == 7) { //SIBLING
                    try {
                        code = code.concat(this.printTagComplete(num));
                    }
                    catch (error) {
                        code.push("printf(\"" + valor + " | Something went wrong with query... :(\");");
                        code.push('printf("%c", (char)10);');
                    }
                }
                else if (tipo == 6) { //ERRORES
                    code.push("printf(\"" + valor + " | Something went wrong with query... :(\");");
                    code.push('printf("%c", (char)10);');
                }
            }
            else { //para aquellos que son solo valores puntuales en la consultas
                if (tipo == 0) { //ENTEROS
                    var val = parseInt(valor);
                    if (typeof (val) == 'number') {
                        code.push("printf(\"%f\" , (double)" + Number(val) + ");");
                        code.push('printf("%c", (char)10);');
                    }
                }
                else if (tipo == 1) { //DECIMALES
                    var val = parseFloat(valor);
                    if (typeof (val) == 'number') {
                        code.push("printf(\"%f\" , (double)" + Number(val) + ");");
                        code.push('printf("%c", (char)10);');
                    }
                }
                else if (tipo == 2) { //PLAIN_TEXT
                    code = code.concat(this.printPlainText(valor.toString()));
                }
                else if (tipo == 6) { //ERRORES
                    code.push("printf(\"" + valor + " | Something went wrong with query... :(\");");
                    code.push('printf("%c", (char)10);');
                }
                else if (tipo == 7) {
                    code = code.concat(this.printPlainText(valor.toString()));
                }
            }
        }
        return code;
    };
    /**
     * Prepara el codigo de tres direcciones para las etiquetas xml
     * encontradas durante el analisis y agrega estas instrucciones de 3 direcciones a
     * la lista de instrucciones global, en el cuerpo de la funcion
     * 'main' en el archivo con C-syntax
     * @param xml_list arreglo [ObjetoXML] | lista de objetos/etiquetas xml
     * @returns [string]: arreglo de strings con codigo de tres direcciones
     */
    Code3D.prototype.setXMLCode = function (xml_list) {
        var size = xml_list.length; //tamaño de lista
        var cont = this.contador_temps; //contador para las etiquetas
        var tag; //Objeto actual xml/tag
        var cad = ['\n/*<<<<<<<<<------------>>>>>>>>> XML INSTRUNCTIONS:INICIO*/'];
        /** He de recorrer cada una de las etiquetas xml generadas durante el analisis
        * para generar el codio de tres direcciones que almacena toda su informacion
        * en las estructuras del stack y heap
        */
        for (var i = 0; i < size; i++) {
            tag = xml_list[i]; //seteo la etiqueta xml en la que me encuentro
            //etiquetas temporales que varian en el tiempo
            var t_stack = void 0, t_heap = void 0, t_act_heap = '';
            //guardo tamaño de las listas de etiquetas y la lista de atributos si es que contienen elementos
            var size_atribs = (tag.lista_atributos.length);
            var size_tags = (tag.lista_objetos.length);
            //le sumo 2; 1 para el nombre de la etiqueta y 1 mas para el contenido o texto de la etiqueta 
            //esto para 'reservar' espacio de los punteros hacia celdas del hip/stack
            //el segundo mas 2 es para almacenar los fin de lista de cada lista de atributos y 
            //el fin de la lista de objetos
            var size_total = ((size_atribs !== 0) ? size_atribs : 1) + ((size_tags !== 0) ? size_tags : 1) + 2 + 2;
            /** Seccion de inicio para definicion de las etiquetas */
            cad.push('\n');
            cad.push('/**Se inicia guardado de etiqueta xml:' + tag.etiqueta_id + '**/'.toUpperCase());
            cad.push('//Preparacion de apuntadores e indices');
            t_stack = "t" + cont;
            cad.push(t_stack + " = H;//" + t_stack + ":stack_pointer"); //t0 = H; guarda la posicion a la que debe apuntar en el stack;
            cont++;
            //t1=t0; t1 puntero del heap, es el numero de posicion/celda en el hip: hip[t1]            
            t_heap = "t" + cont;
            cad.push(t_heap + " = " + t_stack + ";//" + t_heap + ":heap_pointer");
            /*reserva de espacio en el hip, son posiciones que se usaran para los posibles
            elementos que posee una etiqueta xml, incluyendo 2 para los que siempre se
            reserva espacio: el nombre de la etiqueta y su contenido los demas son para la lista
            de atributos y la lista de etiquetas hijas*/
            cad.push("H = H + " + size_total + ";//heap_space_reservation");
            cont++;
            //t2: es la el puntero/indice en donde se encuentra el inicio del contenido guardado en el heap
            t_act_heap = "t" + cont;
            //t2 = H, -> posicion donde inicia cadena que esta apunto de ser ingresada en heap
            cad.push(t_act_heap + " = H;//" + t_act_heap + ": text_start_pointer_in_heap");
            /** Primera seccion se guarda el nombre de etiqueta */
            cad = cad.concat(this.turnTextTo3D(tag.etiqueta_id, 'Guardado de nombre de etiqueta'));
            cad.push("heap[(int)" + t_heap + "] = " + t_act_heap + ";//save_string_first_position:" + t_act_heap + " at heap_pointer:" + t_heap);
            cad.push(t_heap + " = " + t_heap + " + 1;//increase heap_pointer:" + t_heap);
            cont++;
            t_act_heap = "t" + cont;
            cad.push(t_act_heap + " = H;//" + t_act_heap + ":text_start_pointer_in_heap");
            /** Segunda seccion se guarda el texto/contenido de etiqueta */
            cad = cad.concat(this.turnTextTo3D(tag.contenido, 'Guardado de texto/contenido de etiqueta'));
            cad.push("heap[(int)" + t_heap + "] = " + t_act_heap + ";//save_string_first_position:" + t_act_heap + " at heap_pointer:" + t_heap);
            cad.push(t_heap + " = " + t_heap + " + 1;//increase heap_pointer:" + t_heap);
            cont++;
            t_act_heap = "t" + cont;
            cad.push(t_act_heap + " = H;//" + t_act_heap + ":text_start_pointer_in_heap");
            /** Tercera seccion se guardan los atributos de etiqueta */
            if (size_atribs !== 0) {
                var atrib = void 0;
                var content = '';
                cad.push('\n');
                cad.push('//Almacenamiento de Atributos de etiqueta:INICIO');
                for (var j = 0; j < size_atribs; j++) {
                    atrib = tag.lista_atributos[j];
                    content = atrib.toString();
                    cad = cad.concat(this.turnTextTo3D(content));
                    cad.push("heap[(int)" + t_heap + "] = " + t_act_heap + ";");
                    cad.push(t_heap + " = " + t_heap + " + 1;");
                    cont++;
                    t_act_heap = "t" + cont;
                    cad.push(t_act_heap + " = H;");
                }
                cad.push('//Indice que marca fin de lista de Atributos');
                cad.push("heap[(int)" + t_heap + "] = -1;");
                cad.push(t_heap + " = " + t_heap + " + 1;");
                cont++;
                t_act_heap = "t" + cont;
                cad.push(t_act_heap + " = H;");
                cad.push('//Almacenamiento de Atributos de etiqueta:FIN');
            }
            else {
                cad.push('\n');
                cad.push('//Almacenamiento de Atributos de etiqueta:INICIO');
                cad.push("heap[(int)" + t_heap + "] = -1;//Lista de atributos vacia");
                cad.push(t_heap + " = " + t_heap + " + 1;");
                cont++;
                t_act_heap = "t" + cont;
                cad.push(t_act_heap + " = H;");
                cad.push('//Almacenamiento de Atributos de etiqueta:FIN');
            }
            /** Cuarta seccion se guardan las etiquetas hijas de la etiqueta */
            if (size_tags !== 0) {
                var child_id = //Es la posicion en donde esta su hijo en el stack
                 void 0; //Es la posicion en donde esta su hijo en el stack
                cad.push('\n');
                cad.push('//Guardado de etiquetas hijas:INICIO');
                for (var j = 0; j < size_tags; j++) {
                    child_id = tag.lista_objetos[j].id;
                    cad.push("heap[(int)" + t_act_heap + "] = " + child_id + ";");
                    cad.push("H = H + 1;");
                    cont++;
                    t_act_heap = "t" + cont;
                    cad.push(t_act_heap + " = H;\n");
                }
                cad.push("heap[(int)" + t_act_heap + "] = -1;//fin de lista child_tags");
                cad.push("H = H + 1;");
                cont++;
                t_act_heap = "t" + cont;
                cad.push(t_act_heap + " = H;");
                cad.push('//Guardado de etiquetas hijas:FIN');
            }
            else {
                cad.push('\n');
                cad.push('//Guardado de etiquetas hijas:INICIO');
                cad.push("heap[(int)" + t_act_heap + "] = -1;//lista hijos vacia");
                cad.push("H = H + 1;");
                cont++;
                t_act_heap = "t" + cont;
                cad.push(t_act_heap + " = H;");
                cad.push('//Guardado de etiquetas hijas:FIN');
            }
            cad.push('\n');
            cad.push('/*Se guarda la etiqueta en el stack*/'.toUpperCase());
            cad.push("stack[(int)" + this.contador_stack + "] = " + t_stack + ";");
            this.contador_stack++; //Ya que estoy metiendo nuevos elemntos aumento el contador del stack
        }
        cad.push('\n/*<<<<<<<<<------------>>>>>>>>> XML INSTRUNCTIONS:FIN*/');
        this.contador_temps = cont;
        return cad;
    };
    /**
     * Builds up 3 address code to print a plain text
     * @param text string: text to print
     * @returns [string]: string array with 3 address code
     */
    Code3D.prototype.printPlainText = function (text) {
        var code = [];
        var t1;
        this.contador_stack++;
        this.contador_temps++;
        t1 = 't' + this.contador_temps;
        code.push(t1 + " = H;");
        code = code.concat(this.turnTextTo3D(text));
        code.push("stack[(int)" + this.contador_stack + "] = " + t1 + ";");
        code = code.concat(this.printSomeText(t1));
        code.push('\n');
        return code;
    };
    /**
     * Arma el codigo de tres direcciones necesario para invorcar la funcion
     * de printString e imprimir un texto contenido en la estructura heap, pero necesita
     * la posicion del heap en donde inicia el texto a imprimir
     * @param tmp string: etiqueta en donde se ha guardado previamente la posicion
     * o indice en el heap en donde se encuentra el primer caracter de la cadena
     * @returns [string]: arreglo de cadena con code_3d
     */
    Code3D.prototype.printSomeText = function (tmp) {
        //Necesito la etiqueta que contiene el indice/puntero en donde inicia el texto
        var code = []; //codigo de tres direcciones de salida
        var t1, t2; //etiquetas temporales necesarias
        this.contador_temps++;
        t1 = 't' + this.contador_temps;
        this.contador_temps++;
        t2 = 't' + this.contador_temps;
        //Hago los arreglos necesarios en el stack para rezlizar la impresion
        code.push(t1 + " = P + " + this.contador_stack + ";");
        code.push(t1 + " = " + t1 + " + 1;");
        code.push("stack[(int)" + t1 + "] = " + tmp + ";"); //tmp: es la etiqueta en donde esta el heap_pointer
        code.push("P = P + " + this.contador_stack + ";");
        code.push('printString();');
        code.push(t2 + " = stack[(int)P];");
        code.push("P = P - " + this.contador_stack + ";");
        code.push('//Impresion de code:FIN\n');
        return code;
    };
    /**
     * Arma el codigo de tres direcciones para imprimir el contenido
     * de una etiqueta xml de la forma: <xml [atrib_list] > [contenido] </xml>
     * @param stack_point number: indice o pointer en donde esta la etiqueta dentro del stack
     * @returns [string]: arreglo de cadena con intrucciones de code_3d
     */
    Code3D.prototype.printTagComplete = function (stack_point, identado) {
        if (identado === void 0) { identado = ''; }
        var xml = this.findXlmTag(stack_point); //busco la etiqueta
        var code = []; //codigo de tres direcciones de salida
        if (xml == undefined)
            return code; //verifico si encontre la etiqueta
        //Impresion de apertura de etiqueta -> <tag
        code.push('\n//printTagComplete: INICIO');
        if (identado !== undefined)
            code.push(identado);
        code.push("printf(\"<\");");
        code = code.concat(this.printTagName(stack_point));
        //Impresion de Atrubitos de etiqueta -> <tag at1="" at2="" atn=""
        var size;
        code.push('//Impresion de atributos de cadena');
        size = xml.lista_atributos.length;
        if (size != 0) {
            var t1 = void 0, t2 = void 0;
            this.contador_temps++;
            t1 = 't' + this.contador_temps;
            this.contador_temps++;
            t2 = 't' + this.contador_temps;
            code.push(t1 + " = stack[(int)" + stack_point + "];");
            code.push(t1 + " = " + t1 + " + 2;");
            //Ahora recorro todas los atributos para imprimirlos
            for (var i = 0; i < size; i++) {
                code.push(t2 + " = heap[(int)" + t1 + "];//" + t2 + ":has heap_pointer");
                code.push('printf(" ");');
                code = code.concat(this.printSomeText(t2)); //Obejto 3d_code de impresion de texto
                code.push('printf(" ");');
                code.push(t2 + " = " + t2 + " + 1;");
            }
        }
        code.push("printf(\">\");");
        //seccion para contenido: texto de etiqueta
        if (xml.contenido != '') {
            //console.log('There is!');
            var t1 = void 0, t2 = void 0;
            this.contador_temps++;
            t1 = 't' + this.contador_temps;
            this.contador_temps++;
            t2 = 't' + this.contador_temps;
            code.push(t1 + " = stack[(int)" + stack_point + "];");
            code.push(t1 + " = " + t1 + " + 1;");
            code.push(t2 + " = heap[(int)" + t1 + "];");
            code = code.concat(this.printSomeText(t2));
        }
        else { //seccion para para hijos de etiqueta
            if (xml.lista_objetos.length != 0)
                code.push('printf("%c" , (int)10);');
            var identado1 = identado + 'printf("%c" , (int)11);';
            var hijo_id = void 0;
            for (var i = 0; i < xml.lista_objetos.length; i++) {
                hijo_id = xml.lista_objetos[i].id;
                if (hijo_id != undefined) {
                    code = code.concat(this.printTagComplete(hijo_id, identado1));
                }
            }
        }
        if (identado !== undefined)
            code.push(identado);
        code.push("printf(\"<\");");
        code.push("printf(\"/\");");
        code = code.concat(this.printTagName(stack_point));
        code.push("printf(\">\");");
        code.push("printf(\"%c\" , (int)10);");
        code.push('//printTagComplete: FIN');
        return code;
    };
    /**
     * Esta funcion genera y arma el codigo de tres direcciones para
     * imprimir un atributo perteneciente a una etiqueta xml
     * @param stack number: posicion en donde se encuentra la etiqueta xml
     * dentro del stack
     * @param saltos numero de saltos denesarios hata encontrar posicion incial
     * de texto de atributo dentro del heap
     * @returns [string]: arreglo con codigo de tres direcciones
     */
    Code3D.prototype.printAtribute = function (stack, saltos) {
        var code = []; //codigo de tres direcciones de salida
        var t1, t2;
        this.contador_temps++, t1 = 't' + this.contador_temps;
        this.contador_temps++, t2 = 't' + this.contador_temps;
        code.push('//Impresion de Atributo');
        code.push(t1 + " = stack[(int)" + stack + "];"); //pointer to heap, start of object
        code.push(t1 + " = " + t1 + " + 2;"); //pointer to first char of the first element in list of atributes
        code.push(t2 + " = heap[(int)" + t1 + "];");
        code.push(t2 + " = " + t2 + " + " + saltos + ";");
        code = code.concat(this.printSomeText(t2));
        code.push('printf("%c" , (int)10);');
        return code;
    };
    Code3D.prototype.setFunctionFindAtribute = function () {
        var code = 'void findAtributePointer(){\n';
        var t1, t2, t3;
        this.contador_temps++;
        t1 = 't' + this.contador_temps;
        this.contador_temps++;
        t2 = 't' + this.contador_temps;
        code += '';
        code += '';
        code += '';
        code += '\n}\n';
        return code;
    };
    /**
     * Simplemente imprime el nombre de una etiqueta xml, para ello
     * necesita el indice o puntero en donde se encuentra la etiqueta/objeto en el stack
     * @param stack number: numero o indice en donde se encuentra la etiqueta en el stack
     * @returns [string]: arreglo con code_3d
     */
    Code3D.prototype.printTagName = function (stack) {
        var code = [];
        var t1, t2;
        this.contador_temps++;
        t1 = 't' + this.contador_temps;
        this.contador_temps++;
        t2 = 't' + this.contador_temps;
        code.push('\n//Impresion de tag_name:INICIO');
        code.push(t1 + " = stack[(int)" + stack + "];");
        code.push(t1 + " = " + t1 + " + 0;");
        code.push(t2 + " = heap[(int)" + t1 + "];");
        code = code.concat(this.printSomeText(t2));
        code.push('//Impresion de tag_name:FIN\n');
        return code;
    };
    /**
     * Busca en la lista de etiquetas xml si existe una etiqueta con cierto nombre
     * @param id number: numero de id unico de etiqueta
     * @returns ObjetoXML|undefined
     */
    Code3D.prototype.findXlmTag = function (id) {
        var size = this.xml_list.length;
        for (var i = 0; i < size; i++) {
            if (Number(this.xml_list[i].id) == Number(id)) {
                return this.xml_list[i];
            }
        }
        return undefined;
    };
    /**
     * Arma el codigo de tres direcciones para la funcion que imprime un texto
     * solo arama la funcion no imprime ningun texto
     * @returns string|cadena
     */
    Code3D.prototype.setFunctionPrint = function () {
        var func = 'void printString() {//Native function to print a string in heap\n\n';
        var tp, ta, th = '';
        this.contador_temps++;
        tp = "t" + this.contador_temps;
        func += "\t" + tp + " = P + 1;//return_position in stack\n";
        this.contador_temps++;
        ta = "t" + this.contador_temps;
        func += "\t" + ta + " = stack[(int)" + tp + "];//heap_position/pointer:" + ta + ", where string starts from stack\n";
        func += "\tL1://Seccion de impresion\n";
        this.contador_temps++;
        th = "t" + this.contador_temps;
        func += "\t\t" + th + " = heap[(int)" + ta + "];//single_char:" + th + " at heap_position:" + ta + "\n";
        func += "\t\tif(" + th + " == -1) goto L0;//check whether it's string end\n";
        func += "\t\tprintf(\"%c\",(char)" + th + ");\n";
        func += "\t\t" + ta + " = " + ta + " + 1;//set next heap_position:" + ta + "\n";
        func += "\t\tgoto L1;\n";
        func += "\tL0://Salida de funcion\n";
        func += '\t\treturn;\n}\n\n';
        return func;
    };
    /**
     * Define el texto para una funcion que imprime una etiqueta/objeto xml
     * por completa; eso incluye su nombre, atributos, contenido e hijos
     * de la forma -> <tag [lista_atributos] > [lista_hijos | contenido_texto] </tag>
     * @param stack number: posicion en el stack en donde se encuetra almacenado la etiqueta/obejto xml
     * @returns [string]: arreglo de string con codigo de tres direcciones de funcion
     */
    Code3D.prototype.setFunctionPrinTagComplete = function (stack) {
        var code = [];
        var tstack, theap, theapact;
        this.contador_temps++;
        tstack = 't' + this.contador_temps;
        this.contador_temps++;
        theap = 't' + this.contador_temps;
        this.contador_temps++;
        theapact = 't' + this.contador_temps;
        code.push("void function() {\n//Funcion que imprime una etiqueta xml por completo. Con nombre,atribs,content,hijos");
        code.push(tstack + " = " + tstack + " + 0;");
        code.push(theap + " = stack[(int)" + stack + "];");
        code.push("");
        code.push("");
        code.push("");
        code.push("");
        code.push("");
        code.push("");
        code.push("\n}\n");
        return code;
    };
    /**
     * Agrega una cadena o un arreglo de cadenas que contiene instrucciones en
     * 3D_Code al metodo instrucciones_main del archivo con C-syntax
     * @param cadena cadena o arreglos[] de cadenas a agregar al cuerpo del metodo instrucciones_main
     */
    Code3D.prototype.addToMain = function (code) {
        if (Array.isArray(code)) {
            var arr = this.instrucciones_main.concat(code);
            this.instrucciones_main = arr;
        }
        else {
            this.instrucciones_main.push(code);
        }
    };
    /**
     * Arma un arreglo con objetos FilaTablaSimbolos que servira para armar la
     * tabla de simbolos global en la pagian html
     * @param list [ObjetoXML]: Arreglo/lista de objetos tipo ObjetoXML, la lista
     * debe ser un arreglo que contiene todas las etiquetas xml una despues de otra;
     * esta lista puede pasarse como parametro de forma opcional, pero si el metodo
     * this.getCode3D ya ha sido invocado no hay necesidad de pasar el simbolo,
     * sin embargo es solo para  evitar errores si el metodo anterior no ha
     * sido ejecutado antes solo devolvera un arreglo vacio
     * @returns [FilaTablaSimbolos]: Arreglo/lista con objetos de tipo FilaTablaSimbolos
     */
    Code3D.prototype.getTablaSimbolos = function (list) {
        var filas = [];
        if (list === undefined)
            list = (this.xml_list !== undefined) ? this.xml_list : [];
        var sizexml = list.length;
        var xml;
        var atrib;
        var sizeatribs;
        for (var i = 0; i < sizexml; i++) {
            xml = list[i];
            sizeatribs = xml.lista_atributos.length;
            filas.push(new FilaTablaSimbolos_1.FilaTablaSimbolos(xml.etiqueta_id, xml.getNameFather(), 'Etiqueta', xml.linea, xml.columna, xml.getIdentificador()));
            for (var j = 0; j < sizeatribs; j++) {
                atrib = xml.lista_atributos[j];
                filas.push(new FilaTablaSimbolos_1.FilaTablaSimbolos(atrib.atributo, xml.etiqueta_id, 'Atributo', atrib.fila, atrib.columna));
            }
        }
        return filas;
    };
    /**
     * Solo devuelve el encabezado del archivo con C-syntax, que contiene los include's y la
     * definicion de las estructuras heap y el stack
     * @returns cadena
     */
    Code3D.prototype.setHeader = function () {
        var cad = '/*------HEADER------*/\n';
        cad += '#include <stdio.h>\n';
        cad += '#include <math.h>\n\n';
        cad += 'double heap[30101999];\n';
        cad += 'double stack[30101999];\n';
        cad += 'double P, H;\n';
        return cad;
    };
    return Code3D;
}());
exports.Code3D = Code3D;
