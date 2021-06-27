`use strics`

  function reocorrerObjects(list_object){
        var cont=0;
        list_object.forEach(ob => {
                if(cont!=0){
                    xml3D += "//Aumenta 1 heapPointer \n heapPointer = heapPointer+1; \n";
                    heapPointer++;
                    xml3D +="heap[(int)heapPointer]=-2;\n"
                    heap.push(-2)
                    xml3D +="heapPointer = heapPointer+1;\n"
                    heapPointer++;
                }
                heap.push(-3)
                xml3D +="heap[(int)heapPointer] = -1;  //new object\n"
                heapPointer++;
                xml3D +="heapPointer = heapPointer+1;\n"
                xml3D += temp0 + " = heapPointer;\n";
                t0=heapPointer;
                xml3D += temp1 +" = stackPointer;\n"
                t1= stackPointer;
                var etiqueta_Aux = ob.getID();
                xml3D += "stack[(int)"+temp1+"]= " +temp0 +";\n"
                stack.push(t0)
                ob.SetearPosicion(t1)
                xml3D += temp1 +"= "+ temp1+"+1;\n"
                t1++;
                
                stackPointer=t1
                for(let i in etiqueta_Aux){
                  //  xml3D += "//guardamos la " + etiqueta_Aux[i];
                    heap.push(etiqueta_Aux.codePointAt(i))
                    xml3D += "heap[(int)heapPointer] = "+etiqueta_Aux.codePointAt(i)+";\n"
                    heapPointer++
                    xml3D +="heapPointer = heapPointer+1;\n"
                }
                heapPointer--;
                ob.getAtributos().forEach((atributo)=>{
                    heapPointer++
                    xml3D +="heapPointer = heapPointer+1;\n"
                    heap.push(-4)
                    xml3D += "heap[(int)heapPointer]=-4;\n"
                    heapPointer++
                    xml3D +="heapPointer = heapPointer+1;\n"
                    xml3D += temp0 +"=heapPointer;\n"
                    t0=heapPointer
                    t1=stackPointer
                    xml3D += temp1 +"=stackPointer;\n"
                    stack.push(t0)
                    xml3D += "stack[(int)"+temp1+"]="+ temp0+";\n";
                    atributo.SetearPosicion(t1)
                    xml3D += temp1+"= "+temp1 + "+1;\n"
                    t1++
                    stackPointer = t1
                    var attrAux = atributo.getID();

                    for(let i in attrAux){
                        heap.push(attrAux.codePointAt(i))
                        heapPointer++
                    }
                    xml3D += "heap[(int)heapPointer]=-5; //value attr \n"
                    heap.push(-5)
                    xml3D +="heapPointer = heapPointer+1;\n"
                    heapPointer++
                    var valorAux=atributo.getValor();

                    for(let i in valorAux){
                        heap.push(valorAux.codePointAt(i))
                        xml3D += "heap[(int)heapPointer]= "+ valorAux.codePointAt(i)+";\n"
                        heapPointer++
                        xml3D +="heapPointer = heapPointer+1;\n"
                    }
                    xml3D +="heapPointer = heapPointer-1;\n"
                    heapPointer--
                });

                if(ob.getTexto()!=""){
                    xml3D +="heapPointer = heapPointer+1;\n"
                    heapPointer++;
                    var textoAux = ob.getTexto();
                    xml3D += "heap[(int)heapPointer]=-9; // start text \n"
                    heap.push(-9)

                    for(let i in textoAux){
                        xml3D +="heapPointer = heapPointer+1;\n"
                        heapPointer++
                        heap.push(textoAux.codePointAt(i))
                        xml3D += "heap[(int)heapPointer]= "+ textoAux.codePointAt(i)+";\n"
                    }
                    heapPointer++
                    xml3D +="heapPointer = heapPointer+1;\n"
                    heap.push(-10)
                    xml3D += "heap[(int)heapPointer]=-10; // end text \n"
                }
                    if (ob.getObjetos().length >0){
                        xml3D +="heapPointer = heapPointer+1;\n"
                        heapPointer++
                        xml3D += "heap[(int)heapPointer]=-6; // son \n"
                        heap.push(-6)
                        xml3D +="heapPointer = heapPointer+1;\n"
                        heapPointer++
                        reocorrerObjects(ob.getObjetos());
                        xml3D +="heapPointer = heapPointer+1;\n"
                        heapPointer++
                        xml3D += "heap[(int)heapPointer]=-10; // regresa \n"
                        heap.push(-7)
                    }
                    xml3D +="heapPointer = heapPointer+1;\n"
                    heapPointer++
                    xml3D += "heap[(int)heapPointer]=-8; // end object \n"
                    heap.push(-8)
                    cont++
        });
    }

    function getTraduction(list_object){
        var aux = list_object;
        xml3D=""
        temp0="t"+contTemporal
        contTemporal++
        temp1="t"+contTemporal
        contTemporal++
         reocorrerObjects(aux)
         xml3D +="heapPointer = heapPointer+1;\n"
         heapPointer++
         t0 = heapPointer
         xml3D+=temp0 +" = heapPointer;\n";
         xml3D+="stack[(int)1]=t0;\n"
         endXml =t0
         return xml3D
    }
