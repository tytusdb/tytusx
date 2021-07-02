

    var aceptaAtributos=false;
    var aceptaValor=false;
    var concatenaXPath="";
    var arbolito=[];
    var arbolito2=[];
    var traducirExpresion="";
    contadorEtiAnt=0;
    var total=0;
    function getPosicionStack(elemento){
        var posicion=0;
        for (let index = 0; index < stack.length; index++) {
            if(stack.element==elemento){
                posicion=stack.posicion
                return posicion;
            }
            
        }

        return "no guardado";
    }
    function traducirXPath(nodo){
       // console.log(nodo)
        analisisXPath(nodo);
        console.log(arbolito)
        concatenaXPath=`void ciclo_XPath(){\n`+concatenaXPath+`};\n`
        funcionesALlamar+=`ciclo_XPath();\n`
    }
    function analisisXPath(nodo){

       // console.log(nodo)
        var concatena = "";
        if(nodo.valor='NODO'){
            cargarXPath(nodo);
        }
        concatena += nodo.id + ' valor '+ nodo.valor + "\n";
            nodo.hijos.forEach(element => {
                concatena += nodo.id+'->'+ this.id_n +";" + "\n";
                concatena+=analisisXPath(element);
            });
          
    // return concatena;
    }
    function cargarXPath(nodo){
        //console.log(nodo)
        var cont=0;
                for (let index = 0; index < nodo.hijos.length; index++) {
                   // console.log(nodo.hijos[index].valor)
                    
                    if(nodo.hijos[index].valor=='NODO'){
                       // nodo.hijos[index].valor='SELECTOR'
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio SELECTOR \n hp = hp + 1;\n` ;
                            hp = hp + 1;
                    }else if(nodo.hijos[index].valor=='/'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio Nodo simple \n hp = hp + 1;\n` ;
                            hp = hp + 1;
                            concatenaXPath+= nodoSimple('/')
                    }else if(nodo.hijos[index].valor=='*'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio Expresion *\n hp = hp + 1;\n` ;
                            hp = hp + 1;
                            concatenaXPath+=realizarOperaciones3DXPath('*');
                    }else if(nodo.hijos[index].valor=='-'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio Expresion -\n hp = hp + 1;\n` ;
                            hp = hp + 1;
                            concatenaXPath+=realizarOperaciones3DXPath('-');
                    }else if(nodo.hijos[index].valor=='+'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio Expresion +\n hp = hp + 1;\n` ;
                            hp = hp + 1;
                            concatenaXPath+=realizarOperaciones3DXPath('+');
                    }else if(nodo.hijos[index].valor=='='){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio Expresion =\n hp = hp + 1;\n` ;
                            hp = hp + 1;
                            concatenaXPath+=realizarLogicas3DXPath('=');
                    }else if(nodo.hijos[index].valor=='<'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio Expresion < \n hp = hp + 1;\n` ;
                            hp = hp + 1;
                            concatenaXPath+=realizarLogicas3DXPath('<');
                    }
                    else if(nodo.hijos[index].valor=='>'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio Expresion >\n hp = hp + 1;\n` ;
                            hp = hp + 1;
                            concatenaXPath+=realizarLogicas3DXPath('>');
                    }
                    else if(nodo.hijos[index].valor=='or'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio or\n hp = hp + 1;\n` ;
                            hp = hp + 1;
                            concatenaXPath+=realizarLogicas3DXPath('or');
                    }
                    else if(nodo.hijos[index].valor=='and'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio and\n hp = hp + 1;\n` ;
                            hp = hp + 1;
                            concatenaXPath+=realizarLogicas3DXPath('and');
                    }else if(nodo.hijos[index].valor=='.'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio nodoActual\n hp = hp + 1;\n` ;
                            hp = hp + 1;
                            concatenaXPath+=retrocesoPunto('.');
                    }
                    else if(nodo.hijos[index].valor=='..'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// retorno a padre \n hp = hp + 1;\n` ;
                            hp = hp + 1;
                            concatenaXPath+=retrocesoDosPunto('..');
                    }else if(nodo.hijos[index].valor=='@'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio atributo \n hp = hp + 1;\n` ;
                            hp = hp + 1;
                    concatenaXPath+= buscaAtributo('@');
                    }else if(nodo.hijos[index].valor=='|'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio or | \n hp = hp + 1;\n` ;
                            hp = hp + 1;
                    }else if(nodo.hijos[index].valor=='text()'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio node\n hp = hp + 1;\n` ;
                            hp = hp + 1;
                        concatenaXPath+= nodesSwitch('text()');
                    }else if(nodo.hijos[index].valor=='last()'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio node\n hp = hp + 1;\n` ;
                            hp = hp + 1;
                        concatenaXPath+= nodesSwitch('last()');
                    }else if(nodo.hijos[index].valor=='node()'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio node\n hp = hp + 1;\n` ;
                            hp = hp + 1;
                    concatenaXPath+= nodesSwitch('node()');
                    }else if(nodo.hijos[index].valor=='ancestor::'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio ancestor\n hp = hp + 1;\n` ;
                            hp = hp + 1;
                    concatenaXPath+=ancestor('ancestor::');
                    }else if(nodo.hijos[index].valor=='ancestor-or-self::'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio ancestor-or-self \n hp = hp + 1;\n` ;
                            hp = hp + 1;
                    concatenaXPath+=ancestor('ancestor-or-self::');
                    }else if(nodo.hijos[index].valor=='atribute::'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio atribute \n hp = hp + 1;\n` ;
                            hp = hp + 1;
                    concatenaXPath+=buscaAtributo('atribute::');
                    }else if(nodo.hijos[index].valor=='child'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio child \n hp = hp + 1;\n` ;
                            hp = hp + 1;
                    concatenaXPath+=child('child::');
                    }else if(nodo.hijos[index].valor=='descendant::'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio descendant \n hp = hp + 1;\n` ;
                            hp = hp + 1;
                    concatenaXPath+=descendant('descendant::');
                    }else if(nodo.hijos[index].valor=='descendant-or-self::'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio descendant or self \n hp = hp + 1;\n` ;
                            hp = hp + 1;
                    concatenaXPath+=descendant('descendant-or-self::');
                    }else if(nodo.hijos[index].valor=='following::'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio following \n hp = hp + 1;\n` ;
                            hp = hp + 1;
                    concatenaXPath+=following('following::')
                    }else if(nodo.hijos[index].valor=='following-sibling::'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio following-sibling \n hp = hp + 1;\n` ;
                            hp = hp + 1;
                        concatenaXPath+=following('following-sibling::')
                    }else if(nodo.hijos[index].valor=='parent::'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio parent \n hp = hp + 1;\n` ;
                            hp = hp + 1;
                    concatenaXPath+=parent('parent::')
                    }else if(nodo.hijos[index].valor=='preceding::'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio preceding \n hp = hp + 1;\n` ;
                            hp = hp + 1;
                    concatenaXPath+=precedent('preceding::')
                    }else if(nodo.hijos[index].valor=='preceding-self::'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio precedin-self \n hp = hp + 1;\n` ;
                            hp = hp + 1;
                    }else if(nodo.hijos[index].valor=='self::'){
                        concatenaXPath+=`heap[(int)hp] = -1 ;// inicio self \n hp = hp + 1;\n` ;
                            hp = hp + 1;
                    }
                    if(nodo.hijos[index].valor!=undefined&&nodo.hijos[index].valor!='Predicado'&&nodo.hijos[index].valor!='NODO'){

                        for (let j= 0; j < nodo.hijos[index].valor.length; j++) {
                                
                            hp = hp + 1;
                            var txt=nodo.hijos[index].valor[j];
                            concatenaXPath+=`heap[(int)hp] = `+txt.charCodeAt()+`; // `+txt+` \n hp = hp + 1;\n` ;
                            if(nodo.hijos[index].valor[j]=='.'&&nodo.hijos[index].valor[j+1]=='.'){
                                arbolito.push('::');
                               // concatenaXPath+=retrocesoDosPuntosDos('::');
                            }
                            if(nodo.hijos[index].valor[j]==':'&&nodo.hijos[index].valor[j+1]==':'){
                                
                                concatenaXPath+=retrocesoDosPuntosDos('::');
                            }
                        }
                    }
                    if(nodo.hijos[index].valor!=undefined&&nodo.hijos[index].valor!='Predicado'&&nodo.hijos[index].valor!='NODO'&&nodo.hijos[index].valor!='['&&nodo.hijos[index].valor!=']'){
                      //  console.log(nodo.hijos[index].valor)
                        
                        arbolito.push(nodo.hijos[index].valor)
                       
                    }
                    

                }

        
    }
    function nodesSwitch(elemento){
        
        var traducir="";
        var temporalExp1, temporalExp2=0;
        var elementoExp1="";
        var ultimoNodo="";
        var totalNodo="";
        if(elemento=='node()'){
                
                for (let index = 0; index < arbolito.length; index++) {
                    //console.log(arbolito[index])
                    if(arbolito[index]=='/'&&arbolito[index+1]!=undefined){
                        ultimoNodo=arbolito[index+1];
                        
                    }
                }
                    contadorNodos(ultimoNodo)
                    totalNodo=total
                    console.log(totalNodo)
                    if(elemento=='node()'){
                        
                       // elementoExp1=arbolito[index-2];
                       // elementoExp2=arbolito[index+2] ; // elemento encontrado en stack `+elementoExp1+` \n
                        contTemporal++;
                        contadorAnterior=contTemporal;
                        contTemporal++;
                        traducir+=`//imprime todos los nodos `+elemento+` nodos econtrados `+ totalNodo+` de `+ultimoNodo+`\n`;
                    
                        traducir+=`t`+contTemporal+` = sp-1;\n`;
                        traducir+=`t`+contadorAnterior+` = stack[(int)t`+contTemporal+`];\n`;
                        temporalExp1=contTemporal;
                        contTemporal++;
                        contadorAnterior=contTemporal;
                        traducir+=`t`+contTemporal+` = sp-2;\n`;
                        contTemporal++;
                        traducir+=`t`+contTemporal+` = stack[(int)t`+contadorAnterior+`];\n`;
                        temporalExp2=contTemporal;
                        contTemporal++;
                        traducir+=`t`+contTemporal+` = t`+temporalExp1+` + `+contadorAnterior+`;\n`;
                        contadorAnterior=contTemporal;
                        contTemporal++;
                        contEtiquetas++;
                        contEtiquetas++;
                        traducir+=`L`+contEtiquetas+`:\n`;
                        contEtiquetas--;
                        traducir+=`if(t`+contTemporal+` == -1) goto L`+contEtiquetas+`;\n`;
                        traducir+=`t`+contadorAnterior+` = t`+contadorAnterior+`+1;\n`;
                        contadorEtiAnt=contEtiquetas;
                        contEtiquetas++;
                        traducir+=`goto L`+contEtiquetas+`;\n`;
                        traducir+=`L`+contadorEtiAnt+`: ;\n`
                        traducir+=`t`+contTemporal +`= sp+3;\n`;
                        traducir+=`stack[(int)t`+contTemporal+`] = t`+contadorAnterior+`;\n`;
        
                        console.log(arbolito);
                        
                    
                
            }
        }else if(elemento=='text()'){
                
            for (let index = 0; index < arbolito.length; index++) {
                //console.log(arbolito[index])
                if(arbolito[index]=='/'&&arbolito[index+1]!=undefined){
                    ultimoNodo=arbolito[index+1];
                    
                }
            }
                contadorNodos(ultimoNodo)
                totalNodo=total
                console.log(totalNodo)
                if(elemento=='text()'){
                    
                   // elementoExp1=arbolito[index-2];
                   // elementoExp2=arbolito[index+2] ; // elemento encontrado en stack `+elementoExp1+` \n
                    contTemporal++;
                    contadorAnterior=contTemporal;
                    contTemporal++;
                    traducir+=`//imprime solo texto `+elemento+` nodos econtrados `+ ultimoNodo+`\n`;
                
                    traducir+=`t`+contTemporal+` = sp-1;\n`;
                    traducir+=`t`+contadorAnterior+` = stack[(int)t`+contTemporal+`];\n`;
                    temporalExp1=contTemporal;
                    contTemporal++;
                    contadorAnterior=contTemporal;
                    traducir+=`t`+contTemporal+` = sp-2;\n`;
                    contTemporal++;
                    traducir+=`t`+contTemporal+` = stack[(int)t`+contadorAnterior+`];\n`;
                    temporalExp2=contTemporal;
                    contTemporal++;
                    traducir+=`t`+contTemporal+` = t`+temporalExp1+` + `+contadorAnterior+`;\n`;
                    contadorAnterior=contTemporal;
                    contTemporal++;
                    contEtiquetas++;
                    contEtiquetas++;
                    traducir+=`L`+contEtiquetas+`:\n`;
                    contEtiquetas--;
                    traducir+=`if(t`+contTemporal+` == -1) goto L`+contEtiquetas+`;\n`;
                    traducir+=`t`+contadorAnterior+` = t`+contadorAnterior+`+1;\n`;
                    contadorEtiAnt=contEtiquetas;
                    contEtiquetas++;
                    traducir+=`goto L`+contEtiquetas+`;\n`;
                    traducir+=`L`+contadorEtiAnt+`: ;\n`
                    traducir+=`t`+contTemporal +`= sp+3;\n`;
                    traducir+=`stack[(int)t`+contTemporal+`] = t`+contadorAnterior+`;\n`;
    
                    console.log(arbolito);
                    
                
            
        }
    } else if(elemento=='last()'){
                
        for (let index = 0; index < arbolito.length; index++) {
            //console.log(arbolito[index])
            if(arbolito[index]=='/'&&arbolito[index+1]!=undefined){
                ultimoNodo=arbolito[index+1];
                
            }
        }
            contadorNodos(ultimoNodo)
            totalNodo=total
            console.log(totalNodo)
            if(elemento=='last()'){

                contTemporal++;
                contadorAnterior=contTemporal;
                contTemporal++;
                traducir+=`//imprime ultimo nodo `+elemento+` nodo a imprimir `+ totalNodo+` `+ultimoNodo+`\n`;
            
                traducir+=`t`+contTemporal+` = sp-1;\n`;
                traducir+=`t`+contadorAnterior+` = stack[(int)t`+contTemporal+`];\n`;
                temporalExp1=contTemporal;
                contTemporal++;
                contadorAnterior=contTemporal;
                traducir+=`t`+contTemporal+` = sp-2;\n`;
                contTemporal++;
                traducir+=`t`+contTemporal+` = stack[(int)t`+contadorAnterior+`];\n`;
                temporalExp2=contTemporal;
                contTemporal++;
                traducir+=`t`+contTemporal+` = t`+temporalExp1+` + `+contadorAnterior+`;\n`;
                contadorAnterior=contTemporal;
                contTemporal++;
                contEtiquetas++;
                contEtiquetas++;
                traducir+=`L`+contEtiquetas+`:\n`;
                contEtiquetas--;
                traducir+=`if(t`+contTemporal+` == -1) goto L`+contEtiquetas+`;\n`;
                traducir+=`t`+contadorAnterior+` = t`+contadorAnterior+`+1;\n`;
                contadorEtiAnt=contEtiquetas;
                contEtiquetas++;
                traducir+=`goto L`+contEtiquetas+`;\n`;
                traducir+=`L`+contadorEtiAnt+`: ;\n`
                traducir+=`t`+contTemporal +`= sp+3;\n`;
                traducir+=`stack[(int)t`+contTemporal+`] = t`+contadorAnterior+`;\n`;

                console.log(arbolito);
                
            
        
    }
}
             
         
             
     
          
        
        return traducir
    }
    function contadorNodos(nodo){
        var conteo=0;
        for (let index = 0; index < arbolito2.length; index++) {

            if(nodo==arbolito2[index].Nombre){
               // console.log(arbolito2[index])
                conteo++;
            }
            
        }
        total=conteo;
    }
    function nodoSimple(elemento){
        var traducir="";
        var temporalExp1, temporalExp2=0;
        var elementoExp1="";
       // traducirExpresion+= `void Expresion`+elemento+`(){\n`;
        for (let index = 0; index < arbolito.length; index++) {
            if(elemento==arbolito[index]){
                elementoExp1=arbolito[index+1];
               // elementoExp2=arbolito[index+2] ; // elemento encontrado en stack `+elementoExp1+` \n
                contTemporal++;
                contadorAnterior=contTemporal;
                contTemporal++;
                traducir+=`//busqueda tipo `+elemento+` entorno econtrado `+ elementoExp1+`\n`;
                getPosicionStack(arbolito[index]);
                traducir+=`t`+contTemporal+` = sp-1;\n`;
                traducir+=`t`+contadorAnterior+` = stack[(int)t`+contTemporal+`];\n`;
                temporalExp1=contTemporal;
                contTemporal++;
                contadorAnterior=contTemporal;
                traducir+=`t`+contTemporal+` = sp-2;\n`;
                contTemporal++;
                traducir+=`t`+contTemporal+` = stack[(int)t`+contadorAnterior+`];\n`;
                temporalExp2=contTemporal;
                contTemporal++;
                traducir+=`t`+contTemporal+` = t`+temporalExp1+` + `+contadorAnterior+`;\n`;
                contadorAnterior=contTemporal;
                contTemporal++;
                contEtiquetas++;
                contEtiquetas++;
                traducir+=`L`+contEtiquetas+`:\n`;
                contEtiquetas--;
                traducir+=`if(t`+contTemporal+` == -1) goto L`+contEtiquetas+`;\n`;
                traducir+=`t`+contadorAnterior+` = t`+contadorAnterior+`+1;\n`;
                contadorEtiAnt=contEtiquetas;
                contEtiquetas++;
                traducir+=`goto L`+contEtiquetas+`;\n`;
                traducir+=`L`+contadorEtiAnt+`: ;\n`
                traducir+=`t`+contTemporal +`= sp+3;\n`;
                traducir+=`stack[(int)t`+contTemporal+`] = t`+contadorAnterior+`;\n`;

                console.log(arbolito);
            }
        
    }
    return traducir

    }
    function buscaAtributo(elemento){
        var traducir="";
        var temporalExp1, temporalExp2=0;
        var elementoExp1="";
       // traducirExpresion+= `void Expresion`+elemento+`(){\n`;
        for (let index = 0; index < arbolito.length; index++) {
            if(elemento==arbolito[index]){
                elementoExp1=arbolito[index+1];
               // elementoExp2=arbolito[index+2] ; // elemento encontrado en stack `+elementoExp1+` \n
                contTemporal++;
                contadorAnterior=contTemporal;
                contTemporal++;
                traducir+=`//busqueda tipo `+elemento+`atributo econtrado `+ elementoExp1+`\n`;
                getPosicionStack(arbolito[index]);
                traducir+=`t`+contTemporal+` = sp-1;\n`;
                traducir+=`t`+contadorAnterior+` = stack[(int)t`+contTemporal+`];\n`;
                temporalExp1=contTemporal;
                contTemporal++;
                contadorAnterior=contTemporal;
                traducir+=`t`+contTemporal+` = sp-2;\n`;
                contTemporal++;
                traducir+=`t`+contTemporal+` = stack[(int)t`+contadorAnterior+`];\n`;
                temporalExp2=contTemporal;
                contTemporal++;
                traducir+=`t`+contTemporal+` = t`+temporalExp1+` + `+contadorAnterior+`;\n`;
                contadorAnterior=contTemporal;
                contTemporal++;
                contEtiquetas++;
                contEtiquetas++;
                traducir+=`L`+contEtiquetas+`:\n`;
                contEtiquetas--;
                traducir+=`if(t`+contTemporal+` == -1) goto L`+contEtiquetas+`;\n`;
                traducir+=`t`+contadorAnterior+` = t`+contadorAnterior+`+1;\n`;
                contadorEtiAnt=contEtiquetas;
                contEtiquetas++;
                traducir+=`goto L`+contEtiquetas+`;\n`;
                traducir+=`L`+contadorEtiAnt+`: ;\n`
                traducir+=`t`+contTemporal +`= sp+3;\n`;
                traducir+=`stack[(int)t`+contTemporal+`] = t`+contadorAnterior+`;\n`;

                console.log(arbolito);
            }
        
    }
    return traducir

    }
    function retrocesoDosPuntosDos(elemento){
        var traducir="";
        var temporalExp1, temporalExp2=0;
        var elementoExp1="";
       // traducirExpresion+= `void Expresion`+elemento+`(){\n`;
        for (let index = 0; index < arbolito.length; index++) {
            if(elemento==arbolito[index]){
                elementoExp1=arbolito[index+2];
               // elementoExp2=arbolito[index+2] ; // elemento encontrado en stack `+elementoExp1+` \n
                contTemporal++;
                contadorAnterior=contTemporal;
                contTemporal++;
                traducir+=`//retroceso tipo `+elemento+` entorno econtrado `+ elementoExp1+`\n`;
                getPosicionStack(arbolito[index]);
                traducir+=`t`+contTemporal+` = sp-1;\n`;
                traducir+=`t`+contadorAnterior+` = stack[(int)t`+contTemporal+`];\n`;
                temporalExp1=contTemporal;
                contTemporal++;
                contadorAnterior=contTemporal;
                traducir+=`t`+contTemporal+` = sp-1;\n`;
                contTemporal++;
                traducir+=`t`+contTemporal+` = stack[(int)t`+contadorAnterior+`];\n`;
                temporalExp2=contTemporal;
                contTemporal++;
                traducir+=`t`+contTemporal+` = t`+temporalExp1+` + `+contadorAnterior+`;\n`;
                contadorAnterior=contTemporal;
                contTemporal++;
                contEtiquetas++;
                contEtiquetas++;
                traducir+=`L`+contEtiquetas+`:\n`;
                contEtiquetas--;
                traducir+=`if(t`+contTemporal+` == -1) goto L`+contEtiquetas+`;\n`;
                traducir+=`t`+contadorAnterior+` = t`+contadorAnterior+`+1;\n`;
                contadorEtiAnt=contEtiquetas;
                contEtiquetas++;
                traducir+=`goto L`+contEtiquetas+`;\n`;
                traducir+=`L`+contadorEtiAnt+`: ;\n`
                traducir+=`t`+contTemporal +`= sp+2;\n`;
                traducir+=`stack[(int)t`+contTemporal+`] = t`+contadorAnterior+`;\n`;
                console.log(arbolito);
            }
        
    }
    return traducir

    }
    function ancestor(elemento){
        var traducir="";
        var temporalExp1, temporalExp2=0;
        var elementoExp1="";
       // traducirExpresion+= `void Expresion`+elemento+`(){\n`;
        for (let index = 0; index < arbolito.length; index++) {
            if(elemento==arbolito[index]){
                elementoExp1=arbolito[index+1];
               // elementoExp2=arbolito[index+2] ; // elemento encontrado en stack `+elementoExp1+` \n
                contTemporal++;
                contadorAnterior=contTemporal;
                contTemporal++;
                if(elemento=='ancestor::'){
                traducir+=`//ancestor entorno econtrado `+ elementoExp1+`\n`;
                }else{
                    traducir+=`//ancestor-or-self entorno econtrado `+ elementoExp1+`\n`; 
                }
                getPosicionStack(arbolito[index]);
                traducir+=`t`+contTemporal+` = sp-1;\n`;
                traducir+=`t`+contadorAnterior+` = stack[(int)t`+contTemporal+`];\n`;
                temporalExp1=contTemporal;
                contTemporal++;
                contadorAnterior=contTemporal;
                traducir+=`t`+contTemporal+` = sp-1;\n`;
                contTemporal++;
                traducir+=`t`+contTemporal+` = stack[(int)t`+contadorAnterior+`];\n`;
                temporalExp2=contTemporal;
                contTemporal++;
                traducir+=`t`+contTemporal+` = t`+temporalExp1+` + `+contadorAnterior+`;\n`;
                contadorAnterior=contTemporal;
                contTemporal++;
                contEtiquetas++;
                contEtiquetas++;
                traducir+=`L`+contEtiquetas+`:\n`;
                contEtiquetas--;
                traducir+=`if(t`+contTemporal+` == -1) goto L`+contEtiquetas+`;\n`;
                traducir+=`t`+contadorAnterior+` = t`+contadorAnterior+`+1;\n`;
                contadorEtiAnt=contEtiquetas;
                contEtiquetas++;
                traducir+=`goto L`+contEtiquetas+`;\n`;
                traducir+=`L`+contadorEtiAnt+`: ;\n`
                traducir+=`t`+contTemporal +`= sp+1;\n`;
                traducir+=`stack[(int)t`+contTemporal+`] = t`+contadorAnterior+`;\n`;
                console.log(arbolito);
            }
        
    }
    return traducir

    }
    function precedent(elemento){
        var traducir="";
        var temporalExp1, temporalExp2=0;
        var elementoExp1="";
       // traducirExpresion+= `void Expresion`+elemento+`(){\n`;
        for (let index = 0; index < arbolito.length; index++) {
            if(elemento==arbolito[index]){
                elementoExp1=arbolito[index+1];
               // elementoExp2=arbolito[index+2] ; // elemento encontrado en stack `+elementoExp1+` \n
                contTemporal++;
                contadorAnterior=contTemporal;
                contTemporal++;
                
                traducir+=`//preceding entorno econtrado `+ elementoExp1+`\n`;
                
                getPosicionStack(arbolito[index]);
                traducir+=`t`+contTemporal+` = sp-1;\n`;
                traducir+=`t`+contadorAnterior+` = stack[(int)t`+contTemporal+`];\n`;
                temporalExp1=contTemporal;
                contTemporal++;
                contadorAnterior=contTemporal;
                traducir+=`t`+contTemporal+` = sp-1;\n`;
                contTemporal++;
                traducir+=`t`+contTemporal+` = stack[(int)t`+contadorAnterior+`];\n`;
                temporalExp2=contTemporal;
                contTemporal++;
                traducir+=`t`+contTemporal+` = t`+temporalExp1+` + `+contadorAnterior+`;\n`;
                contadorAnterior=contTemporal;
                contTemporal++;
                contEtiquetas++;
                contEtiquetas++;
                traducir+=`L`+contEtiquetas+`:\n`;
                contEtiquetas--;
                traducir+=`if(t`+contTemporal+` == -1) goto L`+contEtiquetas+`;\n`;
                traducir+=`t`+contadorAnterior+` = t`+contadorAnterior+`+1;\n`;
                contadorEtiAnt=contEtiquetas;
                contEtiquetas++;
                traducir+=`goto L`+contEtiquetas+`;\n`;
                traducir+=`L`+contadorEtiAnt+`: ;\n`
                traducir+=`t`+contTemporal +`= sp+1;\n`;
                traducir+=`stack[(int)t`+contTemporal+`] = t`+contadorAnterior+`;\n`;
                console.log(arbolito);
            }
        
    }
    return traducir

    }
    function descendant(elemento){
        var traducir="";
        var temporalExp1, temporalExp2=0;
        var elementoExp1="";
       // traducirExpresion+= `void Expresion`+elemento+`(){\n`;
        for (let index = 0; index < arbolito.length; index++) {
            if(elemento==arbolito[index]){
                elementoExp1=arbolito[index+1];
               // elementoExp2=arbolito[index+2] ; // elemento encontrado en stack `+elementoExp1+` \n
                contTemporal++;
                contadorAnterior=contTemporal;
                contTemporal++;
                if(elemento=='descendant::'){
                traducir+=`//descendant entorno econtrado `+ elementoExp1+`\n`;
                }else{
                    traducir+=`//descendant-or-self entorno econtrado `+ elementoExp1+`\n`; 
                }
                getPosicionStack(arbolito[index]);
                traducir+=`t`+contTemporal+` = sp+1;\n`;
                traducir+=`t`+contadorAnterior+` = stack[(int)t`+contTemporal+`];\n`;
                temporalExp1=contTemporal;
                contTemporal++;
                contadorAnterior=contTemporal;
                traducir+=`t`+contTemporal+` = sp+1;\n`;
                contTemporal++;
                traducir+=`t`+contTemporal+` = stack[(int)t`+contadorAnterior+`];\n`;
                temporalExp2=contTemporal;
                contTemporal++;
                traducir+=`t`+contTemporal+` = t`+temporalExp1+` + `+contadorAnterior+`;\n`;
                contadorAnterior=contTemporal;
                contTemporal++;
                contEtiquetas++;
                contEtiquetas++;
                traducir+=`L`+contEtiquetas+`:\n`;
                contEtiquetas--;
                traducir+=`if(t`+contTemporal+` == -1) goto L`+contEtiquetas+`;\n`;
                traducir+=`t`+contadorAnterior+` = t`+contadorAnterior+`+1;\n`;
                contadorEtiAnt=contEtiquetas;
                contEtiquetas++;
                traducir+=`goto L`+contEtiquetas+`;\n`;
                traducir+=`L`+contadorEtiAnt+`: ;\n`
                traducir+=`t`+contTemporal +`= sp-1;\n`;
                traducir+=`stack[(int)t`+contTemporal+`] = t`+contadorAnterior+`;\n`;
                console.log(arbolito);
            }
        
    }
    return traducir

    }
    function child(elemento){
        var traducir="";
        var temporalExp1, temporalExp2=0;
        var elementoExp1="";
       // traducirExpresion+= `void Expresion`+elemento+`(){\n`;
        for (let index = 0; index < arbolito.length; index++) {
            if(elemento==arbolito[index]){
                elementoExp1=arbolito[index+1];
               // elementoExp2=arbolito[index+2] ; // elemento encontrado en stack `+elementoExp1+` \n
                contTemporal++;
                contadorAnterior=contTemporal;
                contTemporal++;
                if(elemento=='child::'){
                traducir+=`//child entorno econtrado `+ elementoExp1+`\n`;
                }else{
                    traducir+=`//child entorno econtrado `+ elementoExp1+`\n`; 
                }
                getPosicionStack(arbolito[index]);
                traducir+=`t`+contTemporal+` = sp+1;\n`;
                traducir+=`t`+contadorAnterior+` = stack[(int)t`+contTemporal+`];\n`;
                temporalExp1=contTemporal;
                contTemporal++;
                contadorAnterior=contTemporal;
                traducir+=`t`+contTemporal+` = sp+1;\n`;
                contTemporal++;
                traducir+=`t`+contTemporal+` = stack[(int)t`+contadorAnterior+`];\n`;
                temporalExp2=contTemporal;
                contTemporal++;
                traducir+=`t`+contTemporal+` = t`+temporalExp1+` + `+contadorAnterior+`;\n`;
                contadorAnterior=contTemporal;
                contTemporal++;
                contEtiquetas++;
                contEtiquetas++;
                traducir+=`L`+contEtiquetas+`:\n`;
                contEtiquetas--;
                traducir+=`if(t`+contTemporal+` == -1) goto L`+contEtiquetas+`;\n`;
                traducir+=`t`+contadorAnterior+` = t`+contadorAnterior+`+1;\n`;
                contadorEtiAnt=contEtiquetas;
                contEtiquetas++;
                traducir+=`goto L`+contEtiquetas+`;\n`;
                traducir+=`L`+contadorEtiAnt+`: ;\n`
                traducir+=`t`+contTemporal +`= sp-1;\n`;
                traducir+=`stack[(int)t`+contTemporal+`] = t`+contadorAnterior+`;\n`;
                console.log(arbolito);
            }
        
    }
    return traducir

    }
    function parent(elemento){
        var traducir="";
        var temporalExp1, temporalExp2=0;
        var elementoExp1="";
       // traducirExpresion+= `void Expresion`+elemento+`(){\n`;
        for (let index = 0; index < arbolito.length; index++) {
            if(elemento==arbolito[index]){
                elementoExp1=arbolito[index+1];
               // elementoExp2=arbolito[index+2] ; // elemento encontrado en stack `+elementoExp1+` \n
                contTemporal++;
                contadorAnterior=contTemporal;
                contTemporal++;
                if(elemento=='parent::'){
                traducir+=`//parent entorno econtrado `+ elementoExp1+`\n`;
                }else{
                    traducir+=`//parent entorno econtrado `+ elementoExp1+`\n`; 
                }
                getPosicionStack(arbolito[index]);
                traducir+=`t`+contTemporal+` = sp+1;\n`;
                traducir+=`t`+contadorAnterior+` = stack[(int)t`+contTemporal+`];\n`;
                temporalExp1=contTemporal;
                contTemporal++;
                contadorAnterior=contTemporal;
                traducir+=`t`+contTemporal+` = sp+1;\n`;
                contTemporal++;
                traducir+=`t`+contTemporal+` = stack[(int)t`+contadorAnterior+`];\n`;
                temporalExp2=contTemporal;
                contTemporal++;
                traducir+=`t`+contTemporal+` = t`+temporalExp1+` + `+contadorAnterior+`;\n`;
                contadorAnterior=contTemporal;
                contTemporal++;
                contEtiquetas++;
                contEtiquetas++;
                traducir+=`L`+contEtiquetas+`:\n`;
                contEtiquetas--;
                traducir+=`if(t`+contTemporal+` == -1) goto L`+contEtiquetas+`;\n`;
                traducir+=`t`+contadorAnterior+` = t`+contadorAnterior+`+1;\n`;
                contadorEtiAnt=contEtiquetas;
                contEtiquetas++;
                traducir+=`goto L`+contEtiquetas+`;\n`;
                traducir+=`L`+contadorEtiAnt+`: ;\n`
                traducir+=`t`+contTemporal +`= sp-1;\n`;
                traducir+=`stack[(int)t`+contTemporal+`] = t`+contadorAnterior+`;\n`;
                console.log(arbolito);
            }
        
    }
    return traducir

    function following(elemento){
        var traducir="";
        var temporalExp1, temporalExp2=0;
        var elementoExp1="";
       // traducirExpresion+= `void Expresion`+elemento+`(){\n`;
        for (let index = 0; index < arbolito.length; index++) {
            if(elemento==arbolito[index]){
                elementoExp1=arbolito[index+1];
               // elementoExp2=arbolito[index+2] ; // elemento encontrado en stack `+elementoExp1+` \n
                contTemporal++;
                contadorAnterior=contTemporal;
                contTemporal++;
                if(elemento=='following::'){
                traducir+=`//following entorno econtrado `+ elementoExp1+`\n`;
                }else{
                    traducir+=`//following entorno econtrado `+ elementoExp1+`\n`; 
                }
                getPosicionStack(arbolito[index]);
                traducir+=`t`+contTemporal+` = sp+1;\n`;
                traducir+=`t`+contadorAnterior+` = stack[(int)t`+contTemporal+`];\n`;
                temporalExp1=contTemporal;
                contTemporal++;
                contadorAnterior=contTemporal;
                traducir+=`t`+contTemporal+` = sp+1;\n`;
                contTemporal++;
                traducir+=`t`+contTemporal+` = stack[(int)t`+contadorAnterior+`];\n`;
                temporalExp2=contTemporal;
                contTemporal++;
                traducir+=`t`+contTemporal+` = t`+temporalExp1+` + `+contadorAnterior+`;\n`;
                contadorAnterior=contTemporal;
                contTemporal++;
                contEtiquetas++;
                contEtiquetas++;
                traducir+=`L`+contEtiquetas+`:\n`;
                contEtiquetas--;
                traducir+=`if(t`+contTemporal+` == -1) goto L`+contEtiquetas+`;\n`;
                traducir+=`t`+contadorAnterior+` = t`+contadorAnterior+`+1;\n`;
                contadorEtiAnt=contEtiquetas;
                contEtiquetas++;
                traducir+=`goto L`+contEtiquetas+`;\n`;
                traducir+=`L`+contadorEtiAnt+`: ;\n`
                traducir+=`t`+contTemporal +`= sp-1;\n`;
                traducir+=`stack[(int)t`+contTemporal+`] = t`+contadorAnterior+`;\n`;
                console.log(arbolito);
            }
        
    }
    return traducir

    }
    }
    function retrocesoPunto(elemento){
        var traducir="";
        var temporalExp1, temporalExp2=0;
        var elementoExp1="";
       // traducirExpresion+= `void Expresion`+elemento+`(){\n`;
        for (let index = 0; index < arbolito.length; index++) {
            if(elemento==arbolito[index]){
                elementoExp1=arbolito[index+2];
               // elementoExp2=arbolito[index+2] ; // elemento encontrado en stack `+elementoExp1+` \n
                contTemporal++;
                contadorAnterior=contTemporal;
                contTemporal++;
                traducir+=`//retroceso tipo `+elemento+`/ entorno econtrado `+ elementoExp1+`\n`;
                getPosicionStack(arbolito[index]);
                traducir+=`t`+contTemporal+` = sp-1;\n`;
                traducir+=`t`+contadorAnterior+` = stack[(int)t`+contTemporal+`];\n`;
                temporalExp1=contTemporal;
                contTemporal++;
                contadorAnterior=contTemporal;
                traducir+=`t`+contTemporal+` = sp-1;\n`;
                contTemporal++;
                traducir+=`t`+contTemporal+` = stack[(int)t`+contadorAnterior+`];\n`;
                temporalExp2=contTemporal;
                contTemporal++;
                traducir+=`t`+contTemporal+` = t`+temporalExp1+` + `+contadorAnterior+`;\n`;
                contadorAnterior=contTemporal;
                contTemporal++;
                contEtiquetas++;
                contEtiquetas++;
                traducir+=`L`+contEtiquetas+`:\n`;
                contEtiquetas--;
                traducir+=`if(t`+contTemporal+` == -1) goto L`+contEtiquetas+`;\n`;
                traducir+=`t`+contadorAnterior+` = t`+contadorAnterior+`+1;\n`;
                contadorEtiAnt=contEtiquetas;
                contEtiquetas++;
                traducir+=`goto L`+contEtiquetas+`;\n`;
                traducir+=`L`+contadorEtiAnt+`: ;\n`
                traducir+=`t`+contTemporal +`= sp+1;\n`;
                traducir+=`stack[(int)t`+contTemporal+`] = t`+contadorAnterior+`;\n`;
                console.log(arbolito);
            }
        
    }
    return traducir

    }
    function retrocesoDosPunto(elemento){
        var traducir="";
        var temporalExp1, temporalExp2=0;
        var elementoExp1="";
       // traducirExpresion+= `void Expresion`+elemento+`(){\n`;
        for (let index = 0; index < arbolito.length; index++) {
            if(elemento==arbolito[index]){
                elementoExp1=arbolito[index+2];
               // elementoExp2=arbolito[index+2] ; // elemento encontrado en stack `+elementoExp1+` \n
                contTemporal++;
                contadorAnterior=contTemporal;
                contTemporal++;
                traducir+=`//retroceso tipo `+elemento+`/ entorno econtrado `+ elementoExp1+`\n`;
                getPosicionStack(arbolito[index]);
                traducir+=`t`+contTemporal+` = sp-2;\n`;
                traducir+=`t`+contadorAnterior+` = stack[(int)t`+contTemporal+`];\n`;
                temporalExp1=contTemporal;
                contTemporal++;
                contadorAnterior=contTemporal;
                traducir+=`t`+contTemporal+` = sp-2;\n`;
                contTemporal++;
                traducir+=`t`+contTemporal+` = stack[(int)t`+contadorAnterior+`];\n`;
                temporalExp2=contTemporal;
                contTemporal++;
                traducir+=`t`+contTemporal+` = t`+temporalExp1+` + `+contadorAnterior+`;\n`;
                contadorAnterior=contTemporal;
                contTemporal++;
                contEtiquetas++;
                contEtiquetas++;
                traducir+=`L`+contEtiquetas+`:\n`;
                contEtiquetas--;
                traducir+=`if(t`+contTemporal+` == -1) goto L`+contEtiquetas+`;\n`;
                traducir+=`t`+contadorAnterior+` = t`+contadorAnterior+`+1;\n`;
                contadorEtiAnt=contEtiquetas;
                contEtiquetas++;
                traducir+=`goto L`+contEtiquetas+`;\n`;
                traducir+=`L`+contadorEtiAnt+`: ;\n`
                traducir+=`t`+contTemporal +`= sp+2;\n`;
                traducir+=`stack[(int)t`+contTemporal+`] = t`+contadorAnterior+`;\n`;
                console.log(arbolito);
            }
        
    }
    return traducir

    }
    function realizarLogicas3DXPath(elemento){
        var temporalExp1, temporalExp2=0;
        var elementoExp1, elementoExp2="";
       // traducirExpresion+= `void Expresion`+elemento+`(){\n`;
        for (let index = 0; index < arbolito.length; index++) {
            if(elemento==arbolito[index]){
                elementoExp1=arbolito[index+1];
                elementoExp2=arbolito[index+2] ; // elemento encontrado en stack `+elementoExp1+` \n
                contTemporal++;
                contadorAnterior=contTemporal;
                contTemporal++;
                traducirExpresion+=`//operacion `+elemento+` expresiones `+ elementoExp1+` y  `+elementoExp2+ `\n`;
                getPosicionStack(arbolito[index]);
                traducirExpresion+=`t`+contTemporal+` = sp+5;\n`;
                traducirExpresion+=`t`+contadorAnterior+` = stack[(int)t`+contTemporal+`];\n`;
                temporalExp1=contTemporal;
                contTemporal++;
                contadorAnterior=contTemporal;
                traducirExpresion+=`t`+contTemporal+` = sp+1;\n`;
                contTemporal++;
                traducirExpresion+=`t`+contTemporal+` = stack[(int)t`+contadorAnterior+`];\n`;
                temporalExp2=contTemporal;
                contTemporal++;
                traducirExpresion+=`t`+contTemporal+` = t`+temporalExp1+``+elemento+`t`+temporalExp2+`;\n`;
                contadorAnterior=contTemporal;
                contTemporal++;
                traducirExpresion+=`t`+contTemporal +`= sp+9;\n`;
                traducirExpresion+=`stack[(int)t`+contTemporal+`] = t`+contadorAnterior+`;\n`;
                console.log(arbolito);
            }
        
    }
    return traducirExpresion
        
    }
    function realizarOperaciones3DXPath(elemento){
        var temporalExp1, temporalExp2=0;
        var elementoExp1, elementoExp2="";
       // traducirExpresion+= `void Expresion`+elemento+`(){\n`;
        for (let index = 0; index < arbolito.length; index++) {
            if(elemento==arbolito[index]){
                elementoExp1=arbolito[index+1];
                elementoExp2=arbolito[index+2] ; // elemento encontrado en stack `+elementoExp1+` \n
                contTemporal++;
                contadorAnterior=contTemporal;
                contTemporal++;
                traducirExpresion+=`//operacion `+elemento+` expresiones `+ elementoExp1+` y  `+elementoExp2+ `\n`;
                getPosicionStack(arbolito[index]);
                traducirExpresion+=`t`+contTemporal+` = sp+2;\n`;
                traducirExpresion+=`t`+contadorAnterior+` = stack[(int)t`+contTemporal+`];\n`;
                temporalExp1=contTemporal;
                contTemporal++;
                contadorAnterior=contTemporal;
                traducirExpresion+=`t`+contTemporal+` = sp+3;\n`;
                contTemporal++;
                traducirExpresion+=`t`+contTemporal+` = stack[(int)t`+contadorAnterior+`];\n`;
                temporalExp2=contTemporal;
                contTemporal++;
                traducirExpresion+=`t`+contTemporal+` = t`+temporalExp1+``+elemento+`t`+temporalExp2+`;\n`;
                contadorAnterior=contTemporal;
                contTemporal++;
                traducirExpresion+=`t`+contTemporal +`= sp+7;\n`;
                traducirExpresion+=`stack[(int)t`+contTemporal+`] = t`+contadorAnterior+`;\n`;
               // arbolito.splice(index, 1);
                //arbolito.splice(index+1, 1);
                //arbolito.splice(index+2, 1);
                console.log(arbolito);
            }
        
    }
    return traducirExpresion
        
    }
     function setTraduccionXPath(texto){
         var textoAImprimir="";
         var auxiliar="";
         var contadorAnterior=0;
        // var contadorStack=0;
         textoAImprimir+=``
        for (let index = 0; index < texto.length; index++) {
            
            if(texto[index]=='<'&&texto[index+1]!='/'){
                aceptaAtributos=true;
                hp = hp + 1;
               // textoAImprimir+=texto[index].charCodeAt() +" "+contadorHeap+'\n';
                textoAImprimir+=`heap[(int)hp] = -1 ;// inicio objeto \n hp = hp + 1;\n` ;
                hp = hp + 1;
                textoAImprimir+=`heap[(int)hp] = -8 ;// inicio etiqueta \n hp = hp + 1;\n` ;
                hp = hp + 1;
                textoAImprimir+=`heap[(int)hp] = `+texto[index].charCodeAt()+`; // `+texto[index]+` \n hp = hp + 1;\n` ;
                
            }else if(texto[index]=='>') {
                aceptaAtributos=false;
                hp = hp + 1;
                 textoAImprimir+=`heap[(int)hp] = -7 ;//termina etiquta \n hp = hp + 1;\n` ;
                 hp = hp + 1;
                 textoAImprimir+=`heap[(int)hp] = `+texto[index].charCodeAt()+` ;// `+texto[index]+` \n hp = hp + 1;\n` ;

            }else if ((texto[index]=='<'&& texto[index+1]=='/') ){
                hp = hp + 1;
                textoAImprimir+=`heap[(int)hp] = -5; //termina texto \n hp = hp + 1;\n` ;
                hp = hp + 1;
                textoAImprimir+=`heap[(int)hp] = -6; //termina objeto \n hp = hp + 1;\n` ;
                hp = hp + 1;
               // textoAImprimir+=texto[index].charCodeAt() +" "+contadorHeap+'\n';
                textoAImprimir+=`heap[(int)hp] = -8; //inicia etiqueta \n hp = hp + 1;\n` ;
                hp = hp + 1;
            
            textoAImprimir+=`heap[(int)hp] = `+texto[index].charCodeAt()+`; // `+texto[index]+` \n hp = hp + 1;\n` ;
            
            }else if(texto[index]=='='&& texto[index+1]=='"'){
                
                aceptaValor=true;
                hp = hp + 1;
                textoAImprimir+=`heap[(int)hp] = -3;//inicia valor atributo \n hp = hp + 1;\n` ;
                hp = hp + 1;
                textoAImprimir+=`heap[(int)hp] = `+texto[index].charCodeAt()+`; // `+texto[index]+` \n hp = hp + 1;\n` ;

            }else{
                    if(texto[index]==' ' && aceptaAtributos==true){
                        hp = hp + 1;
                        textoAImprimir+=`heap[(int)hp] = -2;//inicia atributo \n hp = hp + 1;\n` ;
                        aceptaValor=false;
                    }else{
                        if(texto[index-1]=='>'){
                            hp = hp + 1;
                            textoAImprimir+=`heap[(int)hp] = -4;//inicia texto \n hp = hp + 1;\n` ;
                        }
                        hp = hp + 1;
                        textoAImprimir+=`heap[(int)hp] = `+texto[index].charCodeAt()+`; // `+texto[index]+` \n hp = hp + 1;\n` ;
                    }
            }
        }
        //console.log(""+textoAImprimir+"")
        contTemporal++;
        auxiliar+=`//llena un segmento del heap con la salida para facilitar xquery\n`
      //  auxiliar+= `void llenarHeapAuxiliar(){ \n t`+contTemporal+` = hp; \n`;
        auxiliar+= `\n t`+contTemporal+` = hp; \n`;
        contadorAnterior=contTemporal;
        contTemporal++;
        auxiliar+=`t`+contTemporal+` = sp+1; \n `+
`heap[(int)hp] = -9;//inicia Consulta \n stack[(int)t`+contTemporal+`] = t`+contadorAnterior+
            `; \n hp = hp + 1; \n sp=sp+1; \n`+textoAImprimir;
    textoAImprimir=auxiliar+'\n';
    contadorAnterior=contTemporal;
    contTemporal++;
        textoAImprimir+=`t`+contTemporal+` = hp;\n`;
        contTemporal++;
        textoAImprimir+=`t`+contTemporal+` = sp+1; \n`;
        textoAImprimir+=`heap[(int)hp] = -10;//termina Consulta \n `;//stack[(int)t`+contadorTemporales+`] = t`+contadorAnterior+ `; \n
        textoAImprimir+=`hp = hp + 1;\n`;// sp=sp+1; \n`;
        
       // textoAImprimir+=`t1 = sp+1;`;
       
       contTemporal++;
        textoAImprimir+=`t`+contTemporal +`= stack[(int)t`+contadorAnterior+`];`;
        textoAImprimir+=`L2:`;
        contadorAnterior=contTemporal;
        contTemporal++;
        textoAImprimir+=`t`+contTemporal+` = heap[(int)t`+contadorAnterior+`];`;
        textoAImprimir+=`if(t`+contTemporal+` == -10) goto L1;`;
        textoAImprimir+=`printf("%c", (char)t`+contTemporal+`);`;
        textoAImprimir+=`t`+contadorAnterior+` = t`+contadorAnterior+`+1;`;
        textoAImprimir+=`goto L2;`;
        textoAImprimir+=`L1:`;
        textoAImprimir+=`return ;`;
            
        
    
      //  textoAImprimir+=`}`;
      //  funcionesALlamar+=`llenarHeapAuxiliar();\n`
        
        xpathC3D=textoAImprimir;
       // return(xpathC3D)
    }
