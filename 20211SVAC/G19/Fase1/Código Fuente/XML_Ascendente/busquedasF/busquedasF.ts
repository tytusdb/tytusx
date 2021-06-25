
//var pruebaDeQuery=['/','CATALOG','/','CD','[','5',']','/','TITLE',']']
var pruebaDeQuery=['/','CATALOG','/','CD']
var guardaActual:any;
var posicionArreglo:number;
var tamanoArreglo:number;
var consumidas=[];
var faltantes:any;
var recorrido=[];
function reconocerCaso(arreglo:Array<String>,tabla:Array<EntornoXML>){
   
    faltantes=arreglo
    for (let index = 0; index < arreglo.length; index++) {
        if(posicionArreglo==arreglo.length){
            console.log(arreglo[index])
        }else{
        if(arreglo[index].toString()=='/' && arreglo[index+1]!='/'){

            
            consumidas.push('/')
            consumidas.push(arreglo[index+1])
            
            //console.log(index)
            retornarTabla(arreglo[index+1],tabla)
           // console.log(recorrido)
           // index++;
            //posicionArreglo++;
            //index++;
            //posicionArreglo++;
            
        } 
    }
        
        
    }
}
function retornarTabla(objeto:any,tabla:Array<EntornoXML>){
    if(tabla!=undefined){
        tabla.forEach((element)=>{ 
            
            if(element.id==objeto){//SI LO ENCUENTRA
                recorrido.push(element)
                pruebaDeQuery.shift()
                pruebaDeQuery.shift()
                //console.log(recorrido)
               // console.log("consumidas")
                
               // reconocerCaso(pruebaDeQuery, element.tablaEntornos)

            }else{//SI NO LO ENCUENTRA PASA AL SIGUIENTE ENTORNO
                //console.log(element.tablaEntornos)
                retornarTabla(objeto,element.tablaEntornos)
                   
                }
            
          
        })
        }else{
            console.log("no se encuentra en la tabla actual")
        }
        
}
function recorreTablaExpresiones(objeto:any,tabla:Array<EntornoXML>) {//envia una objeto a buscar y su tabla de simbolos(objetos)
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
function llenarElementosExperesiones(tabla:Array<EntornoXML>) {
    
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