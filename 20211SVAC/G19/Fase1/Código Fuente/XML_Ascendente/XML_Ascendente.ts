var cont = 0;
var tablaGeneral:any = [];
var entornoAnterior = "Global";
var simboloAnterior;
let entornoGlobalXML:any;
let guardarTabla:any;
let contadorLineas:number;
///////// PRUEBA DE BUSQUEDA TIPO----> //titulo
function recorreTabla(objeto:any,tabla:Array<EntornoXML>) {//envia una objeto a buscar y su tabla de simbolos(objetos)
    if(tabla!=undefined){
    tabla.forEach((element)=>{
        
        if(element.id==objeto){//SI LO ENCUENTRA
            if(element.id==element.EtiquetaCierre){// SI EL ELEMENTO ES DOBLE TIPO <TITULO>"TEXTO"</TITULO>
                //if(element.tablaSimbolos.length!=0){// SI EL ELEMENTO TIENE MAS ENTORNOS EN SU INTERIOR

    
                //}else{// SI EL ELEMENTO NO TIENE MAS ENTORNO EN SU INTERIOR
                    if(element.texto!=""){// SI EL ELEMENTO NO TIENE MAS ENTORNOS EN SU INTERIOR <---- DOBLE VALIDACION 
                        if(element.tablaSimbolos.length!=0){//SI EL ELEMENTO TIENE ATRIBUTOS
                            
                        }else{// SI EL ELEMENTO NO TIENE ATRIBUTOS
                            console.log("<"+element.id+">"+element.texto+"</"+element.EtiquetaCierre+">")
                        }
                        
                    }else{//SI EL ELEMENTO TIENE MAS ENTORNOS EN SU INTERIOR <---- DOBLE VALIDACION

                    }
                
               // } 
            }else{// SI EL ELEMENTO ES TIPO <TITULO --PARAMETROS-- />
                if(element.tablaSimbolos.length>0){//SI EL ELEMENTO TIENE ATRIBUTOS
                            
                }else{// SI EL ELEMENTO NO TIENE ATRIBUTOS
                   //AQUI NO DEBERIA ENTRAR JAJA CREO QUE SERIA ERROR SINTACTICO
                   // console.log("<"+element.id+">"+element.texto+"</"+element.EtiquetaCierre+">")
                }
            }
           // recorreTabla()
            
           // console.log(element.tablaEntornos)
        }else{//SI NO LO ENCUENTRA PASA AL SIGUIENTE ENTORNO
            recorreTabla(objeto,element.tablaEntornos)
               
            }
        
      
    })
    }
}
///////////////////////////---> PRUEBA FUNCION PARA BUSQUEDAS TIPO /BIBLIOTECA/LIBROS
function llenarElementos(tabla:Array<EntornoXML>) {
    
    if(tabla!=undefined){
    tabla.forEach((element)=>{
        if(element.id==element.EtiquetaCierre){
             if(element.tablaSimbolos.length!=0){// SI EL ELEMENTO TIENE MAS ENTORNOS EN SU INTERIOR
    
                }else{
                if(element.texto!=""){
                    console.log("<"+element.id+">"+element.texto+"</"+element.EtiquetaCierre+">")
                }
            
            }
        }else{

        }

    })
}
}

function agregarTablaSimbolos3(result:any) {
    entornoGlobalXML = new Entorno(null);
    result.forEach((element:any) => {
      //  contadorLineas++;
    if(element!=undefined){
    if(element.id == element.EtiquetaCierre || element.EtiquetaCierre=='Unica'){
        let entornoObjeto = new Entorno(null);
        if (element.tablaSimbolos.lenght != 0) {
            element.tablaSimbolos.forEach((atributo:any) => {
                if (atributo != undefined) {
                    let simbolo = new SimboloXML("ATRIBUTO", atributo.id, atributo.linea, atributo.columna, atributo.valor, element.id);
                    entornoObjeto.agregar(simbolo.id, simbolo);
                    llenar(simbolo);
                }
            });
        }
        element.entorno = entornoObjeto;
      //  if( element.tablaEntornos != undefined){
       // if (element.tablaEntornos.lenght != 0) {
         //   entornoAnterior = element.id;
          //  element.tablaEntornos.forEach((objeto:any) => {
            //    if (objeto != undefined) {
              //      let simbolo = new SimboloXML("OBJETO", objeto.id, objeto.linea, objeto.columna, objeto.texto, entornoAnterior);
                //    entornoObjeto.agregar(simbolo.id, simbolo);
                   // agregarTablaSimbolos3(objeto.tablaEntornos);
                  //  llenar(simbolo);
              //  }
            //});
        //}
    //}
        if (element != undefined) {
            let simbolo = new SimboloXML("OBJETO", element.id, element.linea, element.columna, element.texto, "");
            entornoGlobalXML.agregar(simbolo, element, simbolo);
            llenar(simbolo);
            entornoAnterior=element.id
            agregarTablaSimbolos3(element.tablaEntornos)
        }
         
        }else{
          console.log("Error semantico"+ element.id)
          var er =new NodoError("Error Semantico","XML Ascendente","Etiquetas no coinciden: "+ element.id+"-> "+element.EtiquetaCierre, element.linea,element.columna);
                               Errores.add(er);
        }
    }
    });
}
function agregarTablaSimbolos(element:any) {
    for (let index = 0; index < element.length; index++) {
       if( element[0].tablaEntornos != undefined){

            //if(element[index].id == element[index].EtiquetaCierre || element[index].EtiquetaCierre=='Unica'){
                if (element[0].tablaEntornos.length == 0) {
                    let simbolo = new SimboloXML("OBJETO", element[index].id, element[index].linea, element[index].columna, element[index].texto, entornoAnterior);
                    llenar(simbolo);
                   // console.log(element[0])
                    contadorLineas++;
                }
            //}else{
              //  console.log("Error semantico"+ element[index].id)
               // var er =new NodoError("Error Semantico","Etiquetas no coinciden: "+ element[index].id+"-> "+element[index].EtiquetaCierre, contadorLineas,0);
               // Errores.add(er);
           // }
        }
    }
    for (let index = 0; index < element.length; index++) {
        if( element[index].tablaEntornos != undefined){
           // if(element[index].id == element[index].EtiquetaCierre || element[index].EtiquetaCierre=='Unica'){
                if (element[index].tablaEntornos.length != 0) {
                let simbolo = new SimboloXML("OBJETO", element[index].id, element[index].linea, element[index].columna, element[index].texto, entornoAnterior);
                llenar(simbolo);
                //console.log(element[index])
                contadorLineas++;
                }
            if (element[index].tablaSimbolos != undefined) {
                element[index].tablaSimbolos.forEach((atributo:any) => {
                    let simbolo = new SimboloXML("ATRIBUTO", atributo.id, atributo.linea, atributo.columna, atributo.valor, element[index].id);
                    llenar(simbolo);
                    
                });
            }
       // }else{
         //   console.log("Error semantico"+ element[index].id)
          //  var er =new NodoError("Error Semantico","Etiquetas no coinciden: "+ element[index].id+"-> "+element[index].EtiquetaCierre, contadorLineas,0);
           // Errores.add(er);
       // }
    }
}
    for (let index = 0; index < element.length; index++) {
        if( element[index].tablaEntornos != undefined){
            if(element[index].id == element[index].EtiquetaCierre || element[index].EtiquetaCierre=='Unica'){
                if (element[index].tablaEntornos.length != 0) {
                simboloAnterior = new SimboloXML("OBJETO", element[index].id, element[index].linea, element[index].columna, element[index].texto, entornoAnterior);
                entornoAnterior = element[index].id;
                contadorLineas++;
               // console.log(element[index])
                agregarTablaSimbolos(element[index].tablaEntornos);
                }
            }else{
                console.log("Error semantico"+ element[index].id)
                var er =new NodoError("Error Semantico","XML Ascendente","Etiquetas no coinciden: "+ element[index].id+"-> "+element[index].EtiquetaCierre, element[index].linea,element[index].columna);
                Errores.add(er);
            }
        }
    }
}

var tabla = "";
function llenar(TablaSimbolos:any) {
    tabla += "<tr> \n";
    tabla += "<th scope=\"row\">" + TablaSimbolos.id + "</th> \n";
    tabla += "<td>" + TablaSimbolos.tipo + "</td><td>" +
        TablaSimbolos.valor + "</td><td>" +
        TablaSimbolos.linea + "</td><td>\n" +
        TablaSimbolos.columna + "</td><td>\n" +
        TablaSimbolos.Entorno + "</td>\n";
    tabla += "</tr>\n";
}