`use strics`

  function reocorrerObjects(list_object){
        var cont=0;
        list_object.forEach(ob => {
                if(cont!=0){
                    xml3D += "//Aumenta 1 hp \n hp = hp+1; \n";
                    hp++;
                    xml3D +="heap[(int)hp]=-2;\n"
                    heap.push(-2)
                    xml3D +="hp = hp+1;\n"
                    hp++;
                }
                heap.push(-3)
                xml3D +="heap[(int)hp] = -1;  //new object\n"
                hp++;
                xml3D +="hp = hp+1;\n"
                xml3D += temp0 + " = hp;\n";
                t0=hp;
                xml3D += temp1 +" = sp;\n"
                t1= sp;
                var etiqueta_Aux = ob.getID();
                xml3D += "stack[(int)"+temp1+"]= " +temp0 +";\n"
                stack.push(t0)
                ob.SetearPosicion(t1)
                xml3D += temp1 +"= "+ temp1+"+1;\n"
                t1++;
                
                sp=t1
                for(let i in etiqueta_Aux){
                  //  xml3D += "//guardamos la " + etiqueta_Aux[i];
                    heap.push(etiqueta_Aux.codePointAt(i))
                    xml3D += "heap[(int)hp] = "+etiqueta_Aux.codePointAt(i)+";\n"
                    hp++
                    xml3D +="hp = hp+1;\n"
                }
                hp--;
                ob.getAtributos().forEach((atributo)=>{
                    hp++
                    xml3D +="hp = hp+1;\n"
                    heap.push(-4)
                    xml3D += "heap[(int)hp]=-4;\n"
                    hp++
                    xml3D +="hp = hp+1;\n"
                    xml3D += temp0 +"=hp;\n"
                    t0=hp
                    t1=sp
                    xml3D += temp1 +"=sp;\n"
                    stack.push(t0)
                    xml3D += "stack[(int)"+temp1+"]="+ temp0+";\n";
                    atributo.SetearPosicion(t1)
                    xml3D += temp1+"= "+temp1 + "+1;\n"
                    t1++
                    sp = t1
                    var attrAux = atributo.getID();

                    for(let i in attrAux){
                        heap.push(attrAux.codePointAt(i))
                        hp++
                    }
                    xml3D += "heap[(int)hp]=-5; //value attr \n"
                    heap.push(-5)
                    xml3D +="hp = hp+1;\n"
                    hp++
                    var valorAux=atributo.getValor();

                    for(let i in valorAux){
                        heap.push(valorAux.codePointAt(i))
                        xml3D += "heap[(int)hp]= "+ valorAux.codePointAt(i)+";\n"
                        hp++
                        xml3D +="hp = hp+1;\n"
                    }
                    xml3D +="hp = hp-1;\n"
                    hp--
                });

                if(ob.getTexto()!=""){
                    xml3D +="hp = hp+1;\n"
                    hp++;
                    var textoAux = ob.getTexto();
                    xml3D += "heap[(int)hp]=-9; // start text \n"
                    heap.push(-9)

                    for(let i in textoAux){
                        xml3D +="hp = hp+1;\n"
                        hp++
                        heap.push(textoAux.codePointAt(i))
                        xml3D += "heap[(int)hp]= "+ textoAux.codePointAt(i)+";\n"
                    }
                    hp++
                    xml3D +="hp = hp+1;\n"
                    heap.push(-10)
                    xml3D += "heap[(int)hp]=-10; // end text \n"
                }
                    if (ob.getObjetos().length >0){
                        xml3D +="hp = hp+1;\n"
                        hp++
                        xml3D += "heap[(int)hp]=-6; // son \n"
                        heap.push(-6)
                        xml3D +="hp = hp+1;\n"
                        hp++
                        reocorrerObjects(ob.getObjetos());
                        xml3D +="hp = hp+1;\n"
                        hp++
                        xml3D += "heap[(int)hp]=-10; // regresa \n"
                        heap.push(-7)
                    }
                    xml3D +="hp = hp+1;\n"
                    hp++
                    xml3D += "heap[(int)hp]=-8; // end object \n"
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
         xml3D +="hp = hp+1;\n"
         hp++
         t0 = hp
         xml3D+=temp0 +" = hp;\n";
         xml3D+="stack[(int)1]=t0;\n"
         endXml =t0
         return xml3D
    }
