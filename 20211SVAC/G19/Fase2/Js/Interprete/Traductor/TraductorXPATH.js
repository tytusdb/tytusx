

    var aceptaAtributos=false;
    var aceptaValor=false;
     function setTraduccionXPath(texto){
         var textoAImprimir="";
         var auxiliar="";
         var contadorAnterior=0;
        // var contadorStack=0;
         
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
    contTemporal++;
        textoAImprimir+=`t`+contTemporal+` = HP;\n`;
        contTemporal++;
        textoAImprimir+=`t`+contTemporal+` = SP+1; \n`;
        textoAImprimir+=`heap[(int)HP] = -10;//termina Consulta \n `;//stack[(int)t`+contadorTemporales+`] = t`+contadorAnterior+ `; \n
        textoAImprimir+=`HP = HP + 1;\n`;// SP=SP+1; \n`;
        
       // textoAImprimir+=`t1 = SP+1;`;
       contadorAnterior=contTemporal;
       contTemporal++;
        textoAImprimir+=`t`+contTemporal +`= stack[(int)t`+contadorAnterior+`];`;
        textoAImprimir+=`L2:`;
        contadorAnterior=contTemporal;
        contTemporal++;
        textoAImprimir+=`t`+contTemporal+` = heap[(int)t`+contadorAnterior+`];`;
        textoAImprimir+=`if(t`+contTemporal+` == -10) goto L1;`;
        textoAImprimir+=`printf("%c", (char)t`+contTemporal+`);`;
        textoAImprimir+=`t`+contadorAnterior+` = t`+contTemporal+`+1;`;
        textoAImprimir+=`goto L2;`;
        textoAImprimir+=`L1:`;
        textoAImprimir+=`return 0;`;
            
        
    
        textoAImprimir+=`}`;
        funcionesALlamar+=`imprimirConsulta1();\n`
        
        xpathC3D=textoAImprimir;
       // return(xpathC3D)
    }
