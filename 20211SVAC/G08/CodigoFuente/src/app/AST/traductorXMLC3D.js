"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraductorXML_C3D = void 0;
class TraductorXML_C3D{ 
     
    constructor(){
        this.xml_C3D="";
        this.temporal_0="";
        this.temporal_1="";      
        this.contTempos=0;
        this.HP=0;
        this.SP=0;
        this.T_0=0;
        this.T_1=0;
        this.heap=[];
        this.stack=[];
        this.consulta_C3D="";
        this.contadorEtiqueta=0;
        this.contadorTemporales=1;
    }

    getTraduccion(){
        
    }
   
    traducir(objetos){

        var objetosAux = objetos;
        this.stack[0]=0;        
        this.xml_C3D = "";
        this.temporal_0 = "t"+this.contTempos;
        this.contTempos++;
        this.temporal_1 = "t"+this.contTempos;
        this.contTempos++;
        this.xml_C3D += "\n\t//en la posicion 1 del heap se comienza a almacenar el XML";
        this.recorrer_Lista_Objetos(objetosAux);
        this.xml_C3D += "\n\t//incrementa en 1 el puntero Heap";
        this.xml_C3D += "\n\tHP = HP + 1;";
        this.HP = this.HP + 1;
        this.xml_C3D += "\n\t//almacenar la posicion donde termina el xml en el heap"
        this.xml_C3D += "\n\t" + this.temporal_0 + " =  HP;" ;
        this.T_0 = this.HP;
        this.xml_C3D += "\n\t//almacenar en la posicion 1 del stack, donde termina el xml en el heap"; 
        this.xml_C3D += "\n\tstack[(int)1]= t0;";
        this.stack[0]=this.T_0;
        this.finalXML = this.T_0;
        return this.xml_C3D;

    }

    recorrer_Lista_Objetos(objetos){
       
        var _this = this;
        var _counter = 0;
        objetos.forEach(function (objeto){
            if(_counter != 0){
                _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                _this.xml_C3D += "\n\tHP = HP + 1;";
                _this.HP = _this.HP + 1; 
                _this.xml_C3D += "\n\t//almacena un -9 para indicar que empieza un hermano";
                _this.xml_C3D += "\n\theap[(int)HP] = -9;";
                _this.heap.push(-9);
                _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                _this.xml_C3D += "\n\tHP = HP + 1;";
                _this.HP = _this.HP + 1; 
            }

            _this.xml_C3D += "\n\t//almacena un -1 para indicar que comienza un objeto";
            _this.xml_C3D += "\n\theap[(int)HP] = -1;";
            _this.heap.push(-1);
            _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
            _this.xml_C3D += "\n\tHP = HP + 1;";
            _this.HP = _this.HP + 1;

            _this.xml_C3D += "\n\t//El temporal " + _this.temporal_0 + " tiene el valor del Puntero Heap";
            _this.xml_C3D += "\n\t" + _this.temporal_0 + " = HP;";
            _this.T_0 = _this.HP;
                
            _this.xml_C3D += "\n\t//El temporal " + _this.temporal_1 + " tiene el valor del stack \n";
            _this.xml_C3D += "\n\t" + _this.temporal_1 + " = SP;";
            _this.T_1 = _this.SP;

            var etiqueta_aux = objeto.getId();

            _this.xml_C3D += "\n\t//almacena en el stack la referencia al heap del OBJETO -> "  + etiqueta_aux;
            _this.xml_C3D += "\n\tstack[(int)"+ _this.temporal_1 + "] = "+ _this.temporal_0 + ";";
            _this.stack.push(_this.T_0);
            objeto.setPosicion(_this.T_1);
            _this.xml_C3D += "\n\t//incrementa en 1 el temporal -> "+ _this.temporal_1;
            _this.xml_C3D += "\n\t" + _this.temporal_1 + " = " + _this.temporal_1 + " + 1;" ;
            _this.T_1 = _this.T_1 + 1;
            _this.xml_C3D += "\n\tSP = "+_this.temporal_1+";";//**** */
            _this.SP = _this.T_1;                
            _this.xml_C3D += "\n\t//empieza almacenar la etiqueta -> " + etiqueta_aux;
            
            for(var i = 0; i<etiqueta_aux.length; i++){
                _this.xml_C3D += "\n\t//almacena la letra -> " + etiqueta_aux[i];
                _this.xml_C3D += "\n\theap[(int)HP] = " + etiqueta_aux.codePointAt(i) + ";";
                _this.heap.push(etiqueta_aux.codePointAt(i));
                _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                _this.xml_C3D += "\n\tHP = HP + 1;";
                _this.HP = _this.HP + 1;
            }
            _this.xml_C3D += "\n\tHP = HP - 1;";
            _this.HP = _this.HP - 1;
            if (objeto.getAtributos().length > 0){
                objeto.getAtributos().forEach(function (atributo){
                    _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                    _this.xml_C3D += "\n\tHP = HP + 1;";
                    _this.HP = _this.HP + 1;
                    _this.xml_C3D += "\n\t//almacena un -2 para indicar que comienza un ATRIBUTO";
                    _this.xml_C3D += "\n\theap[(int)HP] = -2;";
                    _this.heap.push(-2);
                    _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                    _this.xml_C3D += "\n\tHP = HP + 1;";
                    _this.HP = _this.HP + 1;
                    _this.xml_C3D += "\n\t//almacenamos en "+ _this.temporal_0 + " la posicion del heap para el siguiente objeto o atributo";
                    _this.xml_C3D += "\n\t" + _this.temporal_0 + " = HP;";
                    _this.T_0 = _this.HP;
                    _this.T_1 = _this.SP;
                    var atrib_aux = atributo.getId();
    
                    _this.xml_C3D += "\n\t//almacena en el stack la referencia al heap del ATRIBUTO -> " + atrib_aux;
                    _this.xml_C3D += "\n\tstack[(int)"+ _this.temporal_1 + "] = "+ _this.temporal_0 + ";";
                    _this.stack.push(_this.T_0);
                    atributo.setPosicion(_this.T_1);
                    _this.xml_C3D += "\n\t//incrementa en 1 el temporal -> "+ _this.temporal_1;
                    _this.xml_C3D += "\n\t" + _this.temporal_1 + " = " + _this.temporal_1 + " + 1;" ;
                    _this.T_1 = _this.T_1 + 1;
                    _this.xml_C3D += "\n\tSP = "+_this.temporal_1 +";";/****** */

                    _this.SP = _this.T_1;

                    
                    _this.xml_C3D += "\n\t//empieza almacenar el id del ATRIBUTO -> " + atrib_aux;                    
                    for(var i = 0; i<atrib_aux.length; i++){                      
                        _this.xml_C3D += "\n\t//almacenamos la letra ->" + atrib_aux[i];
                        _this.xml_C3D += "\n\theap[(int)HP] = " + atrib_aux.codePointAt(i) + ";";
                        _this.heap.push(atrib_aux.codePointAt(i));
                        _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                        _this.xml_C3D += "\n\tHP = HP + 1;";
                        _this.HP = _this.HP + 1;
                    }

                    _this.xml_C3D += "\n\t//almacena un -3 para indicar comienza el valor del ATROBUTO";
                    _this.xml_C3D += "\n\theap[(int)HP] = -3;";
                    _this.heap.push(-3);
                    _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                    _this.xml_C3D += "\n\tHP = HP + 1;";
                    _this.HP = _this.HP + 1;
                    var valor_aux = atributo.getValor();
                    _this.xml_C3D += "\n\t//empieza almacenar el valor del ATRIBUTO -> " + atrib_aux + " = " + valor_aux;

                    for(var i = 0; i<valor_aux.length; i++){                      
                        _this.xml_C3D += "\n\t//almacena el caracter -> " + valor_aux[i];
                        _this.xml_C3D += "\n\theap[(int)HP] = " + valor_aux.codePointAt(i) + ";";
                        _this.heap.push(valor_aux.codePointAt(i));
                        _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                        _this.xml_C3D += "\n\tHP = HP + 1;";
                        _this.HP = _this.HP + 1;
                    }
                    _this.xml_C3D += "\n\tHP = HP - 1;";
                    _this.HP = _this.HP - 1;
                    
                });
            }
            
            if (objeto.getTexto() != ""){
                _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                _this.xml_C3D += "\n\tHP = HP + 1;";
                _this.HP = _this.HP + 1;
                var text_aux = objeto.getTexto();
                _this.xml_C3D += "\n\t//almacena un -4 para indicar que comienza TEXTO -> " + text_aux;
                _this.xml_C3D += "\n\theap[(int)HP] = -4;";
                _this.heap.push(-4);

                for(var i = 0; i<text_aux.length; i++){
                    _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                    _this.xml_C3D += "\n\tHP = HP + 1;";
                    _this.HP = _this.HP + 1;
                    _this.xml_C3D += "\n\t//almacena la letra -> " + text_aux[i];
                    _this.xml_C3D += "\n\theap[(int)HP] = " + text_aux.codePointAt(i) + ";";
                    _this.heap.push(text_aux.codePointAt(i));
                }

                _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                _this.xml_C3D += "\n\tHP = HP + 1;";
                _this.HP = _this.HP + 1;
                _this.xml_C3D += "\n\t//almacena un -5 para indicar fin del TEXTO -> " + text_aux;
                _this.xml_C3D += "\n\theap[(int)HP] = -5;";
                _this.heap.push(-5);
            }

            if (objeto.getObjetos().length > 0){
                _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                _this.xml_C3D += "\n\tHP = HP + 1;";
                _this.HP = _this.HP + 1;
                _this.xml_C3D += "\n\t//almacena un -7 para indicar que comienza HIJO";
                _this.xml_C3D += "\n\theap[(int)HP] = -7;";
                _this.heap.push(-7);
                _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                _this.xml_C3D += "\n\tHP = HP + 1;";
                _this.HP = _this.HP + 1;
                _this.recorrer_Lista_Objetos(objeto.getObjetos());
                _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                _this.xml_C3D += "\n\tHP = HP + 1;";
                _this.HP = _this.HP + 1;
                _this.xml_C3D += "\n\t//almacena un -8 para indicar que se retorna al PADRE -> " + etiqueta_aux;
                _this.xml_C3D += "\n\theap[(int)HP] = -8;";
                _this.heap.push(-8);
            }

            _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
            _this.xml_C3D += "\n\tHP = HP + 1;";
            _this.HP = _this.HP + 1;
            _this.xml_C3D += "\n\t//almacena un -6 para indicar fin del OBJETO -> " + etiqueta_aux;
            _this.xml_C3D += "\n\theap[(int)HP] = -6;";
            _this.heap.push(-6);
            _counter++;
        });       
    }
    
    traducirconsulta(objetosFiltrados){
        var objetosAux = objetosFiltrados;
        this.consulta_C3D += "\n\n//metodo para imprimir resultado de consulta"
        this.consulta_C3D += "\nvoid imprimirConsulta(){";
        this.recorrerListaConsulta(objetosAux);
        this.consulta_C3D += "\n\tL"+this.contadorEtiqueta+":";
        this.consulta_C3D += "\n\treturn;"
        this.consulta_C3D +="\n}";
        return this.consulta_C3D;

    }

    recorrerListaConsulta(objetosFil){
        var _this = this;
        _this.contadorTemporales++;
        objetosFil.forEach(function(obj){
            var tipo=obj.getIdC();
            var tempTexto=0;
            var gotoEtiqueta=0;
            //if(tipo !=null){
            //_this.contadorTemporales++;
            _this.consulta_C3D += "\n\tL"+_this.contadorEtiqueta+":";
/*
            if(_this.contadorTemporales!=2){
                //imprimir cierre de etiqueta apertura anterior
                _this.consulta_C3D += "\n\t//se cierre de etiqueta apertura"
                _this.consulta_C3D += "\n\tprintf(\"%c\",(char)62);"
            }
            
            _this.consulta_C3D += "\n\t//se imprime salto de linea"
            _this.consulta_C3D += "\n\tprintf(\"%c\",(char)10);"
*/
            
            
            _this.consulta_C3D +="\n\t//se almacena en t"+_this.contadorTemporales +" la posicion del objeto en el stack";
            var pos=obj.getPosicion();
            _this.consulta_C3D +="\n\tt"+_this.contadorTemporales+" = "+pos +";";
            //var banderaEt=_this.contadorTemporales;
            var temporalA = _this.contadorTemporales;
            _this.contadorTemporales++;
            _this.consulta_C3D +="\n\t//se almacena en t"+_this.contadorTemporales + " la posicion del objeto en el heap";
            
            _this.consulta_C3D +="\n\tt"+_this.contadorTemporales +" = stack[(int)t"+ temporalA+"];";
            var posHeap=_this.heap[pos]; 
            var bandera=_this.heap[pos];
            var temporalA2= _this.contadorTemporales;//bandera para cierre etiqueta
            _this.contadorTemporales++;
            _this.consulta_C3D += "\n\t//se almacena la posicion donde inicia el objeto para etiqueta cierre";
            _this.consulta_C3D +="\n\tt"+_this.contadorTemporales +" = t"+ temporalA2+";";
            //imprimiendo la etiqueta

            _this.consulta_C3D += "\n\t//se imprime <";
            _this.consulta_C3D += "\n\tprintf(\"%c\", (char)60);";

            _this.consulta_C3D += "\n\t//empieza ciclo para imprimir caracteres etiqueta "+obj.getId();
            
            _this.contadorEtiqueta++;//*****+++++++ */
            _this.consulta_C3D += "\n\tL"+_this.contadorEtiqueta +":";
            var tempAnterior=_this.contadorTemporales;
            var etiquetaAnterior = _this.contadorEtiqueta;
            _this.contadorEtiqueta++;
            _this.contadorTemporales++;
            _this.consulta_C3D += "\n\t//se almacena en t"+_this.contadorTemporales +" cada caracter de etiqueta "+obj.getId();
            _this.consulta_C3D += "\n\tt"+_this.contadorTemporales +" = heap[(int)t"+tempAnterior+"];"

            _this.consulta_C3D += "\n\t//se almacena t"+tempAnterior+ " en HP para saber donde empieza texto";
            _this.consulta_C3D += "\n\tHP = "+ "t"+tempAnterior+";"; 
            
            _this.consulta_C3D += "\n\tif(t"+_this.contadorTemporales+" < 0 ) goto L"+_this.contadorEtiqueta+";";
            _this.consulta_C3D += "\n\tprintf(\"%c\", (char)t"+_this.contadorTemporales+");";
            _this.consulta_C3D += "\n\tt"+tempAnterior +" = t"+tempAnterior+" + 1;";
            _this.consulta_C3D += "\n\tgoto L"+etiquetaAnterior+";";
            _this.gotoEtiqueta=_this.contadorEtiqueta;
            if (obj.getAtributos().length > 0){
                obj.getAtributos().forEach(function (atributo){
                    var eti_anterior=_this.contadorEtiqueta;
                    _this.contadorEtiqueta++;   
                    _this.contadorTemporales++;
                    var pos= atributo.getPosicion();
                    var atriAux=atributo.getId();
                    _this.consulta_C3D +="\n\t//etiqueta para imprimir atributo "+ atriAux;
                    _this.consulta_C3D += "\n\tL" + eti_anterior+":"                    
                    _this.consulta_C3D +="\n\t//se almacena en t"+_this.contadorTemporales +" la posicion del objeto en el stack"                        
                    
                    _this.consulta_C3D +="\n\tt"+_this.contadorTemporales+" = "+pos +";";
                    var temporalA = _this.contadorTemporales;
                    _this.contadorTemporales++;
                    _this.consulta_C3D +="\n\t//se almacena en t"+_this.contadorTemporales + " la posicion del objeto en el heap";
                    
                    _this.consulta_C3D +="\n\tt"+_this.contadorTemporales +" = stack[(int)t"+ temporalA+"];";
                    //imprimiendo la nombre atributo

                    _this.consulta_C3D += "\n\t//se imprime  espacio ";
                    _this.consulta_C3D += "\n\tprintf(\"%c\", (char)32);";
                    _this.consulta_C3D += "\n\t//empieza ciclo para imprimir caracteres del nombre atributo "+atriAux;
            
                    _this.consulta_C3D += "\n\tL"+_this.contadorEtiqueta +":";
                    var tempAnterior=_this.contadorTemporales;
                    var etiquetaAnterior = _this.contadorEtiqueta;
                    _this.contadorEtiqueta++;
                    var etiqueAtributo=_this.contadorEtiqueta;
                    _this.contadorTemporales++;
                    _this.consulta_C3D += "\n\t//se almacena en t"+_this.contadorTemporales +" cada caracter de etiqueta "+obj.getId();
                    _this.consulta_C3D += "\n\tt"+_this.contadorTemporales +" = heap[(int)t"+tempAnterior+"];"
                    _this.consulta_C3D += "\n\tif(t"+_this.contadorTemporales+" < 0 ) goto L"+_this.contadorEtiqueta+";";
                    _this.consulta_C3D += "\n\tprintf(\"%c\", (char)t"+_this.contadorTemporales+");";
                    _this.consulta_C3D += "\n\tt"+tempAnterior +" = t"+tempAnterior+" + 1;";
                    _this.consulta_C3D += "\n\tgoto L"+etiquetaAnterior+";";

                    //imprimir valor de atrubuto
                    
                    _this.contadorTemporales++;                        
                    _this.consulta_C3D +="\n\t//se imprime el valor del atributo "+ atriAux;
                    _this.consulta_C3D +="\n\tL"+etiqueAtributo+":";
                    _this.consulta_C3D +="\n\t//t"+tempAnterior +" almacena la posicion del valor del atributo en el heap";
                    _this.consulta_C3D += "\n\tt"+tempAnterior +" = t"+tempAnterior+" + 1;";
                    _this.consulta_C3D += "\n\t//se almacena en t"+_this.contadorTemporales+ " la posicion del valor del atributo en el heap";
                    _this.consulta_C3D += "\n\tt"+ _this.contadorTemporales +" = t" + tempAnterior+";";


                    _this.consulta_C3D += "\n\t//se imprime signo igual ";
                    _this.consulta_C3D += "\n\tprintf(\"%c\", (char)61);";
                    _this.consulta_C3D += "\n\t//empieza ciclo para imprimir caracteres del nombre valor del atributo "+atriAux;
                    _this.contadorEtiqueta++;
                    _this.consulta_C3D += "\n\tL"+_this.contadorEtiqueta +":";
                    var temp_Anterior=_this.contadorTemporales;
                    var etiqueta_Anterior = _this.contadorEtiqueta;
                    _this.contadorEtiqueta++;
                    //var etiqueAtributo=_this.contadorEtiqueta;
                    _this.contadorTemporales++;
                    _this.consulta_C3D += "\n\t//se almacena en t"+_this.contadorTemporales +" cada caracter de etiqueta "+obj.getId();
                    _this.consulta_C3D += "\n\tt"+_this.contadorTemporales +" = heap[(int)t"+temp_Anterior+"];"
                    _this.consulta_C3D += "\n\t//se almacena t"+temp_Anterior+ " en HP para saber donde empieza texto";
                    _this.consulta_C3D += "\n\tHP = "+ "t"+temp_Anterior+";"; 

                    _this.consulta_C3D += "\n\tif(t"+_this.contadorTemporales+" < 0 ) goto L"+_this.contadorEtiqueta+";";
                    _this.consulta_C3D += "\n\tprintf(\"%c\", (char)t"+_this.contadorTemporales+");";
                    _this.consulta_C3D += "\n\tt"+temp_Anterior +" = t"+temp_Anterior+" + 1;";
                    _this.consulta_C3D += "\n\tgoto L"+etiqueta_Anterior+";";                        
                    _this.gotoEtiqueta=_this.contadorEtiqueta;
                })
            }
            
            if (obj.getTexto() != ""){
                //imprimir el texto de la etiqueta
                _this.contadorTemporales++;
                _this.consulta_C3D += "\n\t//se imprime el texto de la etiqueta";
                _this.consulta_C3D += "\n\tL"+_this.gotoEtiqueta+":";
                //en este punto se debe cerrar la etiqueta
                //
                //
                _this.consulta_C3D += "\n\t//se cierra la etiqueta de apertura "+obj.getId()+" ";
                _this.consulta_C3D += "\n\tprintf(\"%c\", (char)62);";
                

                _this.consulta_C3D += "\n\t//se crea el temporal t"+_this.contadorTemporales+" para almacenar la posicion del texto en el heap";
                _this.consulta_C3D += "\n\tt"+_this.contadorTemporales + "= HP;";
                _this.consulta_C3D += "\n\t//se incrementa t"+_this.contadorTemporales +" en 1 para acceder al comienzo del texto";
                _this.consulta_C3D += "\n\tt"+_this.contadorTemporales+" = t"+_this.contadorTemporales +" + 1;";


                _this.consulta_C3D += "\n\t//empieza ciclo para imprimir el texto que esta entre etiquetas";
                _this.contadorEtiqueta++;
                _this.consulta_C3D += "\n\tL"+_this.contadorEtiqueta +":";
                var temp_Anterior2=_this.contadorTemporales;
                var etiqueta_Anterior2 = _this.contadorEtiqueta;
                _this.contadorEtiqueta++;
                //var etiqueAtributo=_this.contadorEtiqueta;
                _this.contadorTemporales++;
                _this.consulta_C3D += "\n\t//se almacena en t"+_this.contadorTemporales +" cada caracter de del texto ";
                _this.consulta_C3D += "\n\tt"+_this.contadorTemporales +" = heap[(int)t"+temp_Anterior2+"];"
                //_this.consulta_C3D += "\n\t//se almacena t"+_this.contadorTemporales+ " en HP para saber donde empieza texto";
                //_this.consulta_C3D += "\n\tHP = "+ "t"+_this.contadorTemporales+";"; 

                _this.consulta_C3D += "\n\tif(t"+_this.contadorTemporales+" < 0 ) goto L"+_this.contadorEtiqueta+";";
                _this.consulta_C3D += "\n\tprintf(\"%c\", (char)t"+_this.contadorTemporales+");";
                _this.consulta_C3D += "\n\tt"+temp_Anterior2 +" = t"+temp_Anterior2+" + 1;";
                _this.consulta_C3D += "\n\tgoto L"+etiqueta_Anterior2+";";
/*
                _this.consulta_C3D += "\n\tL"+_this.contadorEtiqueta+":";
                _this.consulta_C3D += "\n\t//se cierra la etiqueta de apertura "+obj.getId()+" ";
                _this.consulta_C3D += "\n\tprintf(\"%c\", (char)62);";
                _this.consulta_C3D += "\n\tprintf(\"%c\", (char)10);";

                _this.contadorEtiqueta++;
                _this.consulta_C3D += "\n\tgoto L"+_this.contadorEtiqueta+";";
*/
                
            }
            else{
                 //imprimir el texto de la etiqueta
                 _this.contadorTemporales++;
                 _this.consulta_C3D += "\n\t//se imprime el texto de la etiqueta";
                 _this.consulta_C3D += "\n\tL"+_this.gotoEtiqueta+":";
                 //en este punto se debe cerrar la etiqueta
                 //
                 //
                _this.contadorEtiqueta++;
                 _this.consulta_C3D += "\n\t//se cierra la etiqueta de apertura "+obj.getId()+" ";
                 _this.consulta_C3D += "\n\tprintf(\"%c\", (char)62);";
                 _this.consulta_C3D += "\n\tprintf(\"%c\", (char)10);";
                 _this.consulta_C3D += "\n\tgoto L"+_this.contadorEtiqueta+";";
                
                
            }


            if(obj.getObjetos().length > 0){
                //tiene hijo
                console.log(_this.contadorTemporales);
                _this.recorrerListaConsulta(obj.getObjetos());
            }
            
            //verificar tipo etiqueta </id> 
            var objAux=obj;
            //verificar si la etiqueta es 
            // <id>...</id>
            // o <id/>
            if(obj.getIdC()!=null){//<id></id>
                _this.contadorTemporales++;
                _this.consulta_C3D += "\n\tL"+_this.contadorEtiqueta +":";
                _this.consulta_C3D += "\n\t//imprimir </";
                _this.consulta_C3D += "\n\tprintf(\"%c\", (char)60);";
                _this.consulta_C3D += "\n\tprintf(\"%c\", (char)47);";
                
                _this.consulta_C3D += "\n\t//se imprime el cierre de etiqueta "+objAux.getId();
                _this.consulta_C3D += "\n\t//t"+_this.contadorTemporales+" guarda la posicion del stack de la etiqueta";
                _this.consulta_C3D += "\n\tt"+_this.contadorTemporales+" = t"+temporalA2 +";";

                _this.consulta_C3D += "\n\t//empieza ciclo para imprimir el texto que esta entre etiquetas";
                _this.contadorEtiqueta++;
                _this.consulta_C3D += "\n\tL"+_this.contadorEtiqueta +":";
                var temp_Anterior2_=_this.contadorTemporales;
                var etiqueta_Anterior2_ = _this.contadorEtiqueta;
                _this.contadorEtiqueta++;
                //var etiqueAtributo=_this.contadorEtiqueta;
                _this.contadorTemporales++;
                _this.consulta_C3D += "\n\t//se almacena en t"+_this.contadorTemporales +" cada caracter de del texto ";
                _this.consulta_C3D += "\n\tt"+_this.contadorTemporales +" = heap[(int)t"+temp_Anterior2_+"];"
                //_this.consulta_C3D += "\n\t//se almacena t"+_this.contadorTemporales+ " en HP para saber donde empieza texto";
                //_this.consulta_C3D += "\n\tHP = "+ "t"+_this.contadorTemporales+";"; 

                _this.consulta_C3D += "\n\tif(t"+_this.contadorTemporales+" < 0 ) goto L"+_this.contadorEtiqueta+";";
                _this.consulta_C3D += "\n\tprintf(\"%c\", (char)t"+_this.contadorTemporales+");";
                _this.consulta_C3D += "\n\tt"+temp_Anterior2_ +" = t"+temp_Anterior2_+" + 1;";
                _this.consulta_C3D += "\n\tgoto L"+etiqueta_Anterior2_+";";

                _this.consulta_C3D += "\n\tL"+_this.contadorEtiqueta+":";
                _this.consulta_C3D += "\n\t//se cierra la etiqueta de clausura "+obj.getId()+" ";
                _this.consulta_C3D += "\n\tprintf(\"%c\", (char)62);";
                _this.consulta_C3D += "\n\tprintf(\"%c\", (char)10);";

                _this.contadorEtiqueta++;
                _this.consulta_C3D += "\n\tgoto L"+_this.contadorEtiqueta+";";



            }
            else{//imprimir cierr />
                _this.contadorTemporales++;
                _this.consulta_C3D += "\n\tL"+_this.contadorEtiqueta +":";
                _this.consulta_C3D += "\n\t//imprimir />";
                _this.consulta_C3D += "\n\tprintf(\"%c\", (char)47);";
                _this.consulta_C3D += "\n\tprintf(\"%c\", (char)62);";
                _this.consulta_C3D += "\n\tprintf(\"%c\", (char)10);";
                _this.contadorEtiqueta++;
                _this.consulta_C3D += "\n\tgoto "+ _this.contadorEtiqueta+";";


            }

            

            
            //var tipoObjeto=
                


            //}



        });

    }

    generarTemporales(){
        var cadenaTemporales="Double ";
        for(var i=0;i<this.contadorTemporales;i++){
            cadenaTemporales += "t"+i+", ";
        }
        cadenaTemporales+= "t"+this.contadorTemporales +";";
        return cadenaTemporales;
    }

}
exports.TraductorXML_C3D = TraductorXML_C3D;