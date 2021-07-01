

    var aceptaAtributos=false;
    var aceptaValor=false;
    var concatenaXPath="";
    function traducirXPath(nodo){
        analisisXPath(nodo);
        concatenaXPath=`void CargarXPath(){`+concatenaXPath+`};\n`
        funcionesALlamar+=`CargarXPath();\n`
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

                for (let index = 0; index < nodo.hijos.length; index++) {
                   // console.log(nodo.hijos[index].valor)
                    
                    if(nodo.hijos[index].valor=='NODO'){
                        nodo.hijos[index].varlor='SELECTOR'
                        concatenaXPath+=`heap[(int)HP] = -1 ;// inicio nodo \n HP = HP + 1;\n` ;
                            heapPointer = heapPointer + 1;
                    }else if(nodo.hijos[index].valor=='-'){
                        concatenaXPath+=`heap[(int)HP] = -1 ;// inicio Expresion -\n HP = HP + 1;\n` ;
                            heapPointer = heapPointer + 1;
                    }else if(nodo.hijos[index].valor=='*'){
                        concatenaXPath+=`heap[(int)HP] = -1 ;// inicio Expresion *\n HP = HP + 1;\n` ;
                            heapPointer = heapPointer + 1;
                    }else if(nodo.hijos[index].valor=='+'){
                        concatenaXPath+=`heap[(int)HP] = -1 ;// inicio Expresion +\n HP = HP + 1;\n` ;
                            heapPointer = heapPointer + 1;
                    }else if(nodo.hijos[index].valor=='div'){
                        concatenaXPath+=`heap[(int)HP] = -1 ;// inicio Expresion div\n HP = HP + 1;\n` ;
                            heapPointer = heapPointer + 1;
                    }else if(nodo.hijos[index].valor=='='){
                        concatenaXPath+=`heap[(int)HP] = -1 ;// inicio Expresion =\n HP = HP + 1;\n` ;
                            heapPointer = heapPointer + 1;
                    }else if(nodo.hijos[index].valor=='<'){
                        concatenaXPath+=`heap[(int)HP] = -1 ;// inicio Expresion < \n HP = HP + 1;\n` ;
                            heapPointer = heapPointer + 1;
                    }
                    else if(nodo.hijos[index].valor=='>'){
                        concatenaXPath+=`heap[(int)HP] = -1 ;// inicio predicado\n HP = HP + 1;\n` ;
                            heapPointer = heapPointer + 1;
                    }
                    else if(nodo.hijos[index].valor=='Predicado'){
                        concatenaXPath+=`heap[(int)HP] = -1 ;// inicio predicado\n HP = HP + 1;\n` ;
                            heapPointer = heapPointer + 1;
                    }
                    else if(nodo.hijos[index].valor=='Predicado'){
                        concatenaXPath+=`heap[(int)HP] = -1 ;// inicio predicado\n HP = HP + 1;\n` ;
                            heapPointer = heapPointer + 1;
                    }
                    else if(nodo.hijos[index].valor=='Predicado'){
                        concatenaXPath+=`heap[(int)HP] = -1 ;// inicio predicado\n HP = HP + 1;\n` ;
                            heapPointer = heapPointer + 1;
                    }
                    else if(nodo.hijos[index].valor=='Predicado'){
                        concatenaXPath+=`heap[(int)HP] = -1 ;// inicio predicado\n HP = HP + 1;\n` ;
                            heapPointer = heapPointer + 1;
                    }
                    else if(nodo.hijos[index].valor=='Predicado'){
                        concatenaXPath+=`heap[(int)HP] = -1 ;// inicio predicado\n HP = HP + 1;\n` ;
                            heapPointer = heapPointer + 1;
                    }
                    if(nodo.hijos[index].valor!=undefined){
                        for (let j= 0; j < nodo.hijos[index].valor.length; j++) {
                       
                            heapPointer = heapPointer + 1;
                            var txt=nodo.hijos[index].valor[j];
                            concatenaXPath+=`heap[(int)HP] = `+txt.charCodeAt()+`; // `+txt+` \n HP = HP + 1;\n` ;
                        }
                    }
                    

                }

        
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
                heapPointer = heapPointer + 1;
               // textoAImprimir+=texto[index].charCodeAt() +" "+contadorHeap+'\n';
                textoAImprimir+=`heap[(int)HP] = -1 ;// inicio objeto \n HP = HP + 1;\n` ;
                heapPointer = heapPointer + 1;
                textoAImprimir+=`heap[(int)HP] = -8 ;// inicio etiqueta \n HP = HP + 1;\n` ;
                heapPointer = heapPointer + 1;
                textoAImprimir+=`heap[(int)HP] = `+texto[index].charCodeAt()+`; // `+texto[index]+` \n HP = HP + 1;\n` ;
                
            }else if(texto[index]=='>') {
                aceptaAtributos=false;
                heapPointer = heapPointer + 1;
                 textoAImprimir+=`heap[(int)HP] = -7 ;//termina etiquta \n HP = HP + 1;\n` ;
                 heapPointer = heapPointer + 1;
                 textoAImprimir+=`heap[(int)HP] = `+texto[index].charCodeAt()+` ;// `+texto[index]+` \n HP = HP + 1;\n` ;

            }else if ((texto[index]=='<'&& texto[index+1]=='/') ){
                heapPointer = heapPointer + 1;
                textoAImprimir+=`heap[(int)HP] = -5; //termina texto \n HP = HP + 1;\n` ;
                heapPointer = heapPointer + 1;
                textoAImprimir+=`heap[(int)HP] = -6; //termina objeto \n HP = HP + 1;\n` ;
                heapPointer = heapPointer + 1;
               // textoAImprimir+=texto[index].charCodeAt() +" "+contadorHeap+'\n';
                textoAImprimir+=`heap[(int)HP] = -8; //inicia etiqueta \n HP = HP + 1;\n` ;
                heapPointer = heapPointer + 1;
            
            textoAImprimir+=`heap[(int)HP] = `+texto[index].charCodeAt()+`; // `+texto[index]+` \n HP = HP + 1;\n` ;
            
            }else if(texto[index]=='='&& texto[index+1]=='"'){
                
                aceptaValor=true;
                heapPointer = heapPointer + 1;
                textoAImprimir+=`heap[(int)HP] = -3;//inicia valor atributo \n HP = HP + 1;\n` ;
                heapPointer = heapPointer + 1;
                textoAImprimir+=`heap[(int)HP] = `+texto[index].charCodeAt()+`; // `+texto[index]+` \n HP = HP + 1;\n` ;

            }else{
                    if(texto[index]==' ' && aceptaAtributos==true){
                        heapPointer = heapPointer + 1;
                        textoAImprimir+=`heap[(int)HP] = -2;//inicia atributo \n HP = HP + 1;\n` ;
                        aceptaValor=false;
                    }else{
                        if(texto[index-1]=='>'){
                            heapPointer = heapPointer + 1;
                            textoAImprimir+=`heap[(int)HP] = -4;//inicia texto \n HP = HP + 1;\n` ;
                        }
                        heapPointer = heapPointer + 1;
                        textoAImprimir+=`heap[(int)HP] = `+texto[index].charCodeAt()+`; // `+texto[index]+` \n HP = HP + 1;\n` ;
                    }
            }
        }
        //console.log(""+textoAImprimir+"")
        contTemporal++;
        auxiliar+= `void imprimirConsulta1(){t`+contTemporal+` = HP; \n`;
        contadorAnterior=contTemporal;
        contTemporal++;
        auxiliar+=`t`+contTemporal+` = SP+1; \n `+
`heap[(int)HP] = -9;//inicia Consulta \n stack[(int)t`+contTemporal+`] = t`+contadorAnterior+
            `; \n HP = HP + 1; \n SP=SP+1; \n`+textoAImprimir;
    textoAImprimir=auxiliar+'\n';
    contadorAnterior=contTemporal;
    contTemporal++;
        textoAImprimir+=`t`+contTemporal+` = HP;\n`;
        contTemporal++;
        textoAImprimir+=`t`+contTemporal+` = SP+1; \n`;
        textoAImprimir+=`heap[(int)HP] = -10;//termina Consulta \n `;//stack[(int)t`+contadorTemporales+`] = t`+contadorAnterior+ `; \n
        textoAImprimir+=`HP = HP + 1;\n`;// SP=SP+1; \n`;
        
       // textoAImprimir+=`t1 = SP+1;`;
       
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
            
        
    
        textoAImprimir+=`}`;
        funcionesALlamar+=`imprimirConsulta1();\n`
        
        xpathC3D=textoAImprimir;
       // return(xpathC3D)
    }
