`use strics`

class TraductorXML{

  
    constructor(){

    }

    getTraduccion(){
        
    }
   
    traducir(objetos){

        var objetosAux = objetos;
        
        xmlC3D = "";
        temporal0 = "t"+contadorTemporales;
        contadorTemporales++;
        xmlC3D += `//El temporal ` + temporal0 + ` tiene la posicion inicial del Heap Pointer :D
        `;
        xmlC3D += temporal0 + ` = HP;
        `;
        T0 = HP;
        temporal1 = "t"+contadorTemporales;
        contadorTemporales++;
        xmlC3D += `//El temporal ` + temporal1 + ` tiene la primera posicion disponible en el stack :O
        `;
        xmlC3D += temporal1 + ` = SP;

        //en la primera posicion del heap iniciara nuestro XML mapeado en el heap`;
        T1 = SP;

        this.recorrerObjetos(objetosAux)

        xmlC3D += `
        //aumentamos en 1 el Heap Pointer
        HP = HP + 1;`;
        HP = HP + 1;
        xmlC3D += `
        //guardamos la posicion donde termina el xml en el heap`;
        xmlC3D += `
        ` + temporal0 + ` =  HP;` ;
        T0 = HP;
        xmlC3D += `
        //guardamos en la posicion 1 (definida por default) del stack, 
        //donde termina el xml en el heap
        stack[(int)1]= t0;`;
        stack[1] = T0;
        return xmlC3D;

    }

    recorrerObjetos(objetos){

        var _this = this;

        var contador = 0;

        objetos.forEach(function (objeto){

            if(contador != 0){
                xmlC3D += `
        //aumentamos en 1 el Heap Pointer
        HP = HP + 1;`;
                HP = HP + 1; 
                xmlC3D += ` 
        //guardamos un -9 para indicar que empieza un hermano
        heap[(int)HP] = -9;`;
                heap.push(-9);
                xmlC3D += `
        //aumentamos en 1 el Heap Pointer
        HP = HP + 1;`;
                HP = HP + 1; 
            }

            xmlC3D += ` 
        //guardamos un -1 para indicar que empieza un objeto
        heap[(int)HP] = -1;`;
            heap.push(-1);
            var etiquetaAux = objeto.getID();
        
            xmlC3D += `
        //empezamos a guardar la etiqueta: ` + etiquetaAux;
            
            for(var i = 0; i<etiquetaAux.length; i++){
                xmlC3D += `
        //aumentamos en 1 el Heap Pointer
        HP = HP + 1;`;
                HP = HP + 1;
                xmlC3D += `
        //guardamos la ` + etiquetaAux[i];
                xmlC3D += `
        heap[(int)HP] = ` + etiquetaAux.codePointAt(i) + `;`;
                heap.push(etiquetaAux.codePointAt(i));
            }

            xmlC3D += `
        //guardamos en el stack la referencia al heap de nuestro objeto: ` + etiquetaAux;
            xmlC3D += `
        stack[(int)`+ temporal1 + `] = `+ temporal0 + `;`;
            stack.push(T0);
            objeto.SetearPosicion(T0);
            xmlC3D += `
        //aumentamos en 1 el temporal: `+ temporal1;
            xmlC3D += `
        ` + temporal1 + ` = ` + temporal1 + ` + 1;` ;
            T1 = T1 + 1;

            if (objeto.getAtributos().length > 0){
                objeto.getAtributos().forEach(function (atributo){
                    xmlC3D += `
        //aumentamos en 1 el heap pointer
        HP = HP + 1;`;
                    HP = HP + 1;
                    xmlC3D += `
        //guardamos un -2 para indicar que viene un atributo
        heap[(int)HP] = -2;`;
                    heap.push(-2);
                    xmlC3D += `
        //aumentamos en 1 el heap pointer
        HP = HP + 1;`;
                    HP = HP + 1;
                    xmlC3D += `
        //guardamos en `+ temporal0 + ` la posicion del heap para el siguiente objeto o atributo`;
                    xmlC3D += `
        ` + temporal0 + ` = HP;`;
                    T0 = HP;
                    var atributoAux = atributo.getID();
                    xmlC3D += `
        //iniciamos a guardar el identificador del atributo: ` + atributoAux;
                    
                    for(var i = 0; i<atributoAux.length; i++){                      
                        xmlC3D += `
        //guardamos la ` + atributoAux[i];
                        xmlC3D += `
        heap[(int)HP] = ` + atributoAux.codePointAt(i) + `;`;
                        heap.push(atributoAux.codePointAt(i));
                        xmlC3D += `
        //aumentamos en 1 el Heap Pointer
        HP = HP + 1;`;
                        HP = HP + 1;
                    }

                    xmlC3D += `
        //guardamos un -3 para indicar que viene el valor del atributo
        heap[(int)HP] = -3;`;
                    heap.push(-3);
                    xmlC3D += `
        //aumentamos en 1 el heap pointer
        HP = HP + 1;`;
                    HP = HP + 1;
                    var valorAux = atributo.getValor();
                    xmlC3D += `
        //iniciamos a guardar el valor del atributo: ` + atributoAux + ` = ` + valorAux;

                    for(var i = 0; i<valorAux.length; i++){                      
                        xmlC3D += `
        //guardamos la ` + valorAux[i];
                        xmlC3D += `
        heap[(int)HP] = ` + valorAux.codePointAt(i) + `;`;
                        heap.push(valorAux.codePointAt(i));
                        xmlC3D += `
        //aumentamos en 1 el Heap Pointer
        HP = HP + 1;`;
                        HP = HP + 1;
                    }

                    HP = HP - 1;
                    xmlC3D += `
        //guardamos en el stack la referencia al heap de nuestro atributo: ` + atributoAux;
                    xmlC3D += `
        stack[(int)`+ temporal1 + `] = `+ temporal0 + `;`;
                    stack.push(T0);
                    atributo.SetearPosicion(T0);
                    xmlC3D += `
        //aumentamos en 1 el temporal: `+ temporal1;
                    xmlC3D += `
                    ` + temporal1 + ` = ` + temporal1 + ` + 1;` ;
                    T1 = T1 + 1;
                });
            }
            
            if (objeto.getTexto() != ""){
                xmlC3D += `
        //aumentamos en 1 el Heap Pointer
        HP = HP + 1;`;
                HP = HP + 1;
                var textoAux = objeto.getTexto();
                xmlC3D += ` 
        //guardamos un -4 para indicar que viene un texto: ` + textoAux  + ` 
        heap[(int)HP] = -4;`;
                heap.push(-4);

                for(var i = 0; i<textoAux.length; i++){
                    xmlC3D += `
        //aumentamos en 1 el Heap Pointer
        HP = HP + 1;`;
                    HP = HP + 1;
                    xmlC3D += `
        //guardamos la ` + textoAux[i];
                    xmlC3D += `
        heap[(int)HP] = ` + textoAux.codePointAt(i) + `;`;
                    heap.push(textoAux.codePointAt(i));
                }

                xmlC3D += `
        //aumentamos en 1 el Heap Pointer
        HP = HP + 1;`;
                HP = HP + 1;
                xmlC3D += ` 
        //guardamos un -5 para indicar que termina el texto: ` + textoAux  + ` 
        heap[(int)HP] = -5;`;
                heap.push(-5);
            }

            if (objeto.getObjetos().length > 0){
                xmlC3D += `
        //aumentamos en 1 el Heap Pointer
        HP = HP + 1;`;
                HP = HP + 1;
                xmlC3D += ` 
        //guardamos un -7 para indicar que viene uno o mas hijos
        heap[(int)HP] = -7;`;
                heap.push(-7);
                xmlC3D += `
        //aumentamos en 1 el Heap Pointer
        HP = HP + 1;`;
                HP = HP + 1;
                _this.recorrerObjetos(objeto.getObjetos());
                xmlC3D += `
        //aumentamos en 1 el Heap Pointer
        HP = HP + 1;`;
                HP = HP + 1;
                xmlC3D += ` 
        //guardamos un -8 para indicar que se regresa al padre: ` + etiquetaAux  + ` 
        heap[(int)HP] = -8;`;
                heap.push(-8);
            }

            xmlC3D += `
        //aumentamos en 1 el Heap Pointer
        HP = HP + 1;`;
            HP = HP + 1;
            xmlC3D += ` 
        //guardamos un -6 para indicar que termina el objeto: ` + etiquetaAux  + ` 
        heap[(int)HP] = -6;`;
            heap.push(-6);

            contador++;
        });


       
    }       
}