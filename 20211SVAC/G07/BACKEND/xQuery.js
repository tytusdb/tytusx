function ejecutarXQuery(instruccion,entorno){
    let tablaSimbolos=new Entorno(null);
    let consulta=getConsultaXQuery(instruccion, entorno,tablaSimbolos);
    //console.log(tablaSimbolos);
    //tablaSimbolos

    if(consulta){
        imprimiConsola(consulta);
    }else{
        imprimiConsola("No hay resultados");
    }
}

function getConsultaXQuery(instruccion, entorno,tablaSimbolos){
    switch (instruccion.instr) {
        case "FOR_IN":
            return ejecutarForIn(instruccion,entorno,tablaSimbolos);
        case "HTML":
            return procesarHTML(instruccion.valor,entorno,tablaSimbolos)
        case "LLAMADA":
            return ejecutarLLamada(instruccion.valor,entorno,tablaSimbolos);
        case "F_DATA":
            return ejecutarData(instruccion.valor,entorno,tablaSimbolos);
        case "F_UPPER":
            return ejecutarUpper(instruccion.valor,entorno,tablaSimbolos);
        case "F_LOWER":
            return ejecutarLower(instruccion.valor,entorno,tablaSimbolos);
        case "F_SUBSTRING":
            return ejecutarSubstring(instruccion.valor,entorno,tablaSimbolos);
        case "MULTIPLES":
            return ejecutarInstrucciones(instruccion.valor,entorno,tablaSimbolos);
        default:
            return null
    }
}
function ejecutarIfElse(instruccion,entorno,tablaSimbolos){
   
    let condicion=procesarDato(instruccion.condicion,entorno,tablaSimbolos);
    tem=traductorC3D.t;
    traducirOperacion(instruccion.condicion,entorno,tablaSimbolos);
    traductorC3D.t+=tem;
    traductorC3D.traducirFuncion("",2);
    if(condicion){
        tem=traductorC3D.t;
        traducirOperacion(instruccion.accion.data,entorno,tablaSimbolos);
        traductorC3D.t+=tem;

        return procesarDato(instruccion.accion.data,entorno,tablaSimbolos);
        
    }else{
        if(instruccion.siguiente){
            if(instruccion.siguiente.regreso=="ELSEIF"){
                return ejecutarIfElse(instruccion.siguiente.data,entorno,tablaSimbolos);
            }else{
                tem=traductorC3D.t;
                traducirOperacion(instruccion.siguiente.data,entorno,tablaSimbolos);
                traductorC3D.t+=tem;
            
                return procesarDato(instruccion.siguiente.data,entorno,tablaSimbolos);
            }
        }
    }

    return null
}
function ejecutarInstrucciones(instrucciones,entorno,tablaSimbolos){
    
    for (const instruccion of instrucciones) {
        
        switch (instruccion.instr) {
            case "CREAR":
                crear_Variable(instruccion.valor,entorno,tablaSimbolos);
                break;
            case "ASIGNAR":
                asignar_variable(instruccion.valor,entorno,tablaSimbolos);
                break;
            case "IF_":
                return ejecutarIfElse(instruccion.valor,entorno,tablaSimbolos);
            case "CREAR_F":
                crear_funcion(instruccion.valor,entorno,tablaSimbolos);
                break;
            case "LLAMADA_F":
                return llamada_funcion(instruccion.valor,entorno,tablaSimbolos);
            case "NUEVO_ETR":

                tablaSimbolos=new Entorno(tablaSimbolos);
               
                break;
            case "RETURN":

                return procesarReturn(instruccion.valor,tablaSimbolos);
               
                break;

            default:
                return null
        }
    }
}
function crear_funcion(instrucciones,entorno,tablaSimbolos){
    if(!tablaSimbolos.existeEnActual(instrucciones.id)){
        let valor=instrucciones;
        tablaSimbolos.agregar(instrucciones.id,valor);
    }else{
        console.error("La funcion "+instrucciones.id+" ya existe en el entorno actual");
    }
    
}
function llamada_funcion(instrucciones,entorno,tablaSimbolos){
    
    
    if(tablaSimbolos.getFuncion(instrucciones.id)){

        let funcion=JSON.parse(JSON.stringify(tablaSimbolos.getFuncion(instrucciones.id)));

        let index=0;   
        
        for (const parametro of instrucciones.parametros) {
            
            funcion.parametros[index].valor={tipo:"NUMERO",valor:procesarDato( parametro,entorno,tablaSimbolos)};
            let nuevaVariable={instr:"CREAR",valor:funcion.parametros[index]};
            funcion.instr.unshift(nuevaVariable);
            index++;
        }
      
        
        funcion.instr.unshift({instr:"NUEVO_ETR"});
        return ejecutarInstrucciones(funcion.instr,entorno,tablaSimbolos);
    }else{
        console.error("La funcion "+instrucciones.id+" no existe en el entorno actual");
    }
   return null 
}
function crear_Variable(instrucciones,entorno,tablaSimbolos){
    console.log("crear");
    if(!tablaSimbolos.existeEnActual(instrucciones.id)){
        let valor;
        if(instrucciones.valor){
            valor=procesarDato(instrucciones.valor,entorno,tablaSimbolos);
            tem=traductorC3D.t;
            traducirOperacion(instrucciones.valor,entorno,tablaSimbolos);
            traductorC3D.t+=tem;
        }else{
            valor=null;
        }
       
        

        tablaSimbolos.agregar(instrucciones.id,valor);
    }else{
        console.error("La variable "+instrucciones.id+" ya existe en el entorno actual");
        var error = new Error("PARA");
            throw error;
    }
    
}
function asignar_variable(instrucciones,entorno,tablaSimbolos){
    if(tablaSimbolos.existeEnActual(instrucciones.id)){
        let valor=procesarDato(instrucciones.valor,entorno,tablaSimbolos);
        tem=traductorC3D.t;
        traducirOperacion(instrucciones.valor,entorno,tablaSimbolos);
        traductorC3D.t+=tem;

        tablaSimbolos.reemplazar(instrucciones.id,valor);
    }else{
        console.error("La variable "+instrucciones.id+" no existe en el entorno actual");
        var error = new Error("PARA");
            throw error;
    }

}
function procesarDato(instruccion,entorno,tablaSimbolos){
    let valor1;
    let valor2;
   
    switch (instruccion.tipo) {
        case "NUMERO":
            return parseInt(instruccion.valor);
        case "CADENA":
            return instruccion.valor;
        case "VARIABLE":
           
            let valor=tablaSimbolos.getSimbolo(instruccion.valor);
            if(valor||valor===0){
                return valor;
            }
            var error = new Error("PARA");
            throw error;
        case "LLAMADA_F":
            return llamada_funcion(instruccion.valor,entorno,tablaSimbolos);
        case "OP_MAS":
           valor1=procesarDato(instruccion.valor1,entorno,tablaSimbolos);
           valor2=procesarDato(instruccion.valor2,entorno,tablaSimbolos);
           return valor1+valor2;
        case "OP_RES":
        case "OP_MENOS":
           valor1=procesarDato(instruccion.valor1,entorno,tablaSimbolos);
           valor2=procesarDato(instruccion.valor2,entorno,tablaSimbolos);
           return valor1-valor2;
        case "OP_MUL":
           valor1=procesarDato(instruccion.valor1,entorno,tablaSimbolos);
           valor2=procesarDato(instruccion.valor2,entorno,tablaSimbolos);
           return valor1*valor2;
        case "OP_DIV":
           valor1=procesarDato(instruccion.valor1,entorno,tablaSimbolos);
           valor2=procesarDato(instruccion.valor2,entorno,tablaSimbolos);
           return valor1/valor2;
        case "OP_NEG":
            valor1=procesarDato(instruccion.valor1,entorno,tablaSimbolos);
            return -1*valor1;
        case "IGUAL":
        case "OP_IGUAL":
            valor1=procesarDato(instruccion.valor1,entorno,tablaSimbolos);
            valor2=procesarDato(instruccion.valor2,entorno,tablaSimbolos);
            return valor1 == valor2 ;
        case "OP_MAYOR":
        case "MAYOR":
            valor1=procesarDato(instruccion.valor1,entorno,tablaSimbolos);
            valor2=procesarDato(instruccion.valor2,entorno,tablaSimbolos);
            return valor1 > valor2;
        case "OP_MAYOR_IGUAL":
        case "MAYOR_IGUAL":
            valor1=procesarDato(instruccion.valor1,entorno,tablaSimbolos);
            valor2=procesarDato(instruccion.valor2,entorno,tablaSimbolos);
            return valor1 >= valor2;
        case "OP_MENOR":
        case "MENOR":
            valor1=procesarDato(instruccion.valor1,entorno,tablaSimbolos);
            valor2=procesarDato(instruccion.valor2,entorno,tablaSimbolos);
            return valor1 < valor2;
        case "OP_MENOR_IGUAL":
        case "MENOR_IGUAL":
            valor1=procesarDato(instruccion.valor1,entorno,tablaSimbolos);
            valor2=procesarDato(instruccion.valor2,entorno,tablaSimbolos);
            return valor1 <= valor2;
        case "AND":
            valor1=procesarDato(instruccion.valor1,entorno,tablaSimbolos);
            valor2=procesarDato(instruccion.valor2,entorno,tablaSimbolos);
            return valor1 && valor2 ;
        case "OR":
            valor1=procesarDato(instruccion.valor1,entorno,tablaSimbolos);
            valor2=procesarDato(instruccion.valor2,entorno,tablaSimbolos);
            return valor1 || valor2 ;
        case "xPath":        
            let arregloEntornos=procesarXpath(instruccion.valor,entorno,null)
            arregloEntornos=procesarEtorno(arregloEntornos);
            for (const iterator of arregloEntornos) {
                if(iterator.valorAtributo){
                    return iterator.valorAtributo;
                }
                return iterator.texto
            }
    }
    
}

function comparar(palabra1,palabra2){
    if(!isNaN(palabra1)&&!isNaN(palabra2)){
        if(parseFloat(palabra1)<parseFloat(palabra2)){
            return true;
        } 
    }else{
        if(palabra1&&palabra2){
            return alfabeto(palabra1,palabra2,0);
        }
        return false;
    }

    return false;
}

function alfabeto(palabra1,palabra2,i){

    if(palabra1.charCodeAt(i)>palabra2.charCodeAt(i)){
        return true
    }else if(palabra1.charCodeAt(i)==palabra2.charCodeAt(i)){
        return alfabeto(palabra1,palabra2,i+1);
    }
    return false;
}












function ejecutarForIn(instruccion,entorno,padre){
    
    let respuesta="";
    traductorC3D.traducirFuncion("",3);
    if(instruccion.iterador.consulta.tipo=="TO"){
        for (let index = instruccion.iterador.consulta.inicio; index <= instruccion.iterador.consulta.fin; index++) {
            let var_= new Entorno(padre);
            var_.agregar(instruccion.iterador.variable,index);
            tem=traductorC3D.t;
            retorno=procesarReturn(instruccion.retorno,var_);
            traductorC3D.t+=tem;
            if(retorno){
                respuesta+=retorno+'\n';
            }
        }
        if(respuesta!=""){
            return respuesta;
        }
    }else{
    let consulta=instruccion.iterador.consulta;
    let entornos=procesarXpath(consulta,entorno,null);
    entornos=procesarEtorno(entornos);
    
    //Orden by
    if(instruccion.order){
        entornos=ordenar(instruccion.order,entornos);
    }
    let where=instruccion.where;

    let respuesta="";
    let contador=1;
    for (const x of entornos) {
        let var_= new Entorno(padre);
        var_.agregar(instruccion.iterador.variable,x);
        var_.agregar(instruccion.iterador.contador,contador);
        
        contador++;
        let retorno=null;
        if(where){
            tem=traductorC3D.t;
            traducirOperacionW(where.condicion,var_);
            traductorC3D.t+=tem;
        }
        if(where==null||validarWhere(where.condicion,var_)){
            retorno=procesarReturn(instruccion.retorno,var_);
        }
        if(retorno){
            respuesta+=retorno+'\n';
        }
        
    }
    
    if(respuesta!=""){
        return respuesta;
    }
    console.error("A  QUI");
}
    return null;
    
}
function ejecutarLLamada (instruccion,entorno,padre){
    let variable=entorno.getSimbolo(instruccion.variable);

        if(variable){
            if(instruccion.consulta){
                let arregloEntornos=procesarXpath(instruccion.consulta,variable,variable);
                
                arregloEntornos=procesarEtorno(arregloEntornos);
                let txt="";
                for (const iterator of arregloEntornos) {
                    txt+=imprimirEntorno(iterator);
                }
                
                return txt;
            }
            return imprimirEntorno(variable);
        }
        return null;
}
function validarWhere(instruccion,tabla){

    let valor1;
    let valor2;
    switch (instruccion.tipo) {
        case "OP_MAS":
            valor1=validarWhere(instruccion.valor1,tabla);
            valor2=validarWhere(instruccion.valor2,tabla);
            return valor1+valor2;
         case "OP_RES":
         case "OP_MENOS":
            valor1=validarWhere(instruccion.valor1,tabla);
            valor2=validarWhere(instruccion.valor2,tabla);
            return valor1-valor2;
         case "OP_MUL":
            valor1=validarWhere(instruccion.valor1,tabla);
            valor2=validarWhere(instruccion.valor2,tabla);
            return valor1*valor2;
         case "OP_DIV":
            valor1=validarWhere(instruccion.valor1,tabla);
            valor2=validarWhere(instruccion.valor2,tabla);
            return valor1/valor2;
         case "OP_NEG":
             valor1=validarWhere(instruccion.valor1,tabla);
             return -1*valor1;

        case "MAYOR":
            valor1=validarWhere(instruccion.valor1,tabla);
            valor2=validarWhere(instruccion.valor2,tabla);
            return valor1 > valor2;
        case "MAYOR_IGUAL":
            valor1=validarWhere(instruccion.valor1,tabla);
            valor2=validarWhere(instruccion.valor2,tabla);
            return valor1 >= valor2;
        case "MENOR":
            valor1=validarWhere(instruccion.valor1,tabla);
            valor2=validarWhere(instruccion.valor2,tabla);
            return valor1 < valor2;
        case "MENOR_IGUAL":
            valor1=validarWhere(instruccion.valor1,tabla);
            valor2=validarWhere(instruccion.valor2,tabla);
            return valor1 <= valor2;
        case "IGUAL":
            valor1=validarWhere(instruccion.valor1,tabla);
            valor2=validarWhere(instruccion.valor2,tabla);
            return valor1 == valor2;
        case "DIFERENTE":
            valor1=validarWhere(instruccion.valor1,tabla);
            valor2=validarWhere(instruccion.valor2,tabla);
            return valor1 != valor2;
        case "OR":
            valor1=validarWhere(instruccion.valor1,tabla);
            valor2=validarWhere(instruccion.valor2,tabla);
            return valor1 || valor2;
        case "NUMERO":
            return parseInt(instruccion.valor)
        case "CADENA":
            
            return instruccion.valor
        case "VARIABLE":
            let variable=tabla.getSimbolo(instruccion.variable);
            
            let arregloEntornos=procesarXpath(instruccion.consulta,variable,variable)
            arregloEntornos=procesarEtorno(arregloEntornos);
            for (const iterator of arregloEntornos) {
                if(iterator.valorAtributo){
                    return iterator.valorAtributo;
                }
                return iterator.texto
            }

        default:
            return false;
           
    }
}
function procesarReturn(instruccion,variables){
    if(instruccion.tipo=="VAR"){
        let variable=variables.getSimbolo(instruccion.variable);
        
        if(variable){
            if(instruccion.consulta){
                let arregloEntornos=procesarXpath(instruccion.consulta,variable,variables);
                arregloEntornos=procesarEtorno(arregloEntornos);
                let txt="";
                for (const iterator of arregloEntornos) {
                    txt+=imprimirEntorno(iterator);
                }
                return txt;
            }
            return imprimirEntorno(variable);
        }
        
       
    }else if(instruccion.tipo=="HTML"){
        
        return procesarHTML(instruccion.valor,variables,null)
    }else if(instruccion.tipo=="IF"){
        

        return procesarIF(instruccion.valor,variables,null);
    }
    
    return null;
}
function procesarIF(instruccion,variables){
    let res=validarWhere(instruccion.condicion,variables);
    
    traducirOperacionW(instruccion.condicion,variables);
    
    if(res){
        switch (instruccion.then.tipo) {
            case "HTML":
                return procesarHTML(instruccion.then.valor,variables,null)  ; 
            case "LLAMADA":
                return ejecutarLLamada(instruccion.else.valor,entorno,entorno);         
            default:
              return null;
        }
    }else{
        if(instruccion.else){
            switch (instruccion.else.tipo) {
                case "HTML":
                    return procesarHTML(instruccion.else.valor,variables,null)  ;
                case "LLAMADA":
                    return ejecutarLLamada(instruccion.else.valor,entorno,entorno);     
                default:
                  return null;
            }
        }
    }
    return null;
}

function procesarHTML(arreglo,entorno,padre){
    let txt="";
    for (const iterator of arreglo) {
        if(iterator.tipo=="TXT"){
            txt+=iterator.valor+'\n';
        }
        if(iterator.tipo=="COD"){
            txt+=getConsultaXQuery(iterator.valor,entorno,padre);
        }
    }
    return txt;
}
//Regresa un arreglo de entornos
function getAcceso(instruccion,entorno,padre){
    if(padre)//Si existe entonces no es el primero y hay que pasar a los hijos
    {
        let respuesta=[];
        
        if(entorno.hijos){
            for (const hijo of entorno.hijos) {
                if(instruccion.valor==hijo.etiqueta)
                {
                    respuesta.push(hijo);
                }
            }
        }
        if(instruccion.index)
        {
            //Procesamos para que solo nos devuelva los entornos con el indice correcto
        }
        return respuesta;
    }
    if(instruccion.valor==entorno.etiqueta)
    {
        if(instruccion.index)
        {
            //Procesamos para que solo nos devuelva los entornos con el indice correcto
        }
        return [entorno];//Si no tiene indice entonces devolvemos todos los hijos
    }
    return [];
}

function procesarXpath(consulta,entorno,padre){
    let instruccion=consulta[0];
    consulta=getConsultaXPath(consulta);
    if(!instruccion){
        return null;
    }
    switch (instruccion.instr) {
        case "ACCESO":
            let coleccionEntornos=getAcceso(instruccion,entorno,padre);//Spñp tiene que devolver los entornos a donde se tiene 
            let res=[];
            for (const entornoIndividual of coleccionEntornos) {
                if(consulta.length==0)
                {
                    let impresion=entornoIndividual;
                    if(impresion){
                        res.push(impresion);
                    }
                    
                }else{
                    let impresion=procesarXpath(consulta,entornoIndividual,entorno);
                    if(impresion){
                        
                        res.push(impresion);
                    }   
                }
            }
            if(res!=[]){
                return res
            }
            return null
        case "ATRIBUTO":
            let regreso=[];
            for (const atributo of entorno.atributos) {
                if(atributo.nombreAtributo==instruccion.valor){
                    regreso.push(atributo);
                }
            }
            if(regreso!=[]){
                return regreso;
            }
            return null;
        default:
            return null
    }
}

function imprimirEntorno(entorno){

    let contenido="";
    let atributo;
    let arregloAtributo=[];
    if (!isNaN(entorno)) {
        return entorno.toString();;
      }
    if(entorno.valorAtributo){
        let txt =entorno.nombreAtributo +'="' +entorno.valorAtributo +'"\n';
        return txt;
    }else{
        if (entorno.atributos) {
            for (const atr of entorno.atributos) {
              
              atributo = {
                  etiqueta: atr.nombreAtributo,
                  valor: atr.valorAtributo,
                  ref:atr.referenciaHeap
                };
              arregloAtributo.unshift(atributo);
            }
          } else {
              arregloAtributo = [];
          }
          
          if(entorno.hijos){
            traductorC3D.traducirFuncion("<" + entorno.etiqueta );

            traductorC3D.traducirFuncion( ">");
           
            if(traductorC3D.esNumero(entorno.texto)){

              traductorC3D.imprimirNumero(entorno.referenciaHeap);
            }else{
              traductorC3D.imprimirCadena(entorno.referenciaHeap);
            }
          }
      for (const iterator of entorno.hijos) {
          contenido += imprimirEntorno(iterator);
      }
      if(entorno.hijos){
        traductorC3D.traducirFuncion("</" + entorno.etiqueta + ">");
      }
      
      let retorno = new Etiqueta(
          entorno.etiqueta,
          entorno.texto,
          contenido,
          arregloAtributo
        ); //nombre,texto,contenido
        if (retorno) {
            
          return retorno.obtenerXML();
        }
    }
      return null;
}
function getConsultaXPath(arreglo){
    let retorno=[];
    let contador=0;
    for (const iterator of arreglo) {
        if(contador!=0){
            retorno.push(iterator);
        }
        contador++;
    }
    return retorno;
}
let regreso_=[];
function procesarEtorno(entorno){
    regreso_=[];
    procesarArreglo(entorno);
    return regreso_;
}

function procesarArreglo(entorno){
    
   if(entorno){
    if(!entorno.etiqueta||!entorno){
        if(entorno.valorAtributo){
            regreso_.push(entorno);
        }else{
            for (const iterator of entorno) {
                procesarArreglo(iterator);
            }
        }
   
    }else{
        regreso_.push(entorno);
    }
   }
    
}
function ordenar(instruccion,entornos){
    let entornosAux=[];
    for (const entorno of entornos) {
        if(instruccion.consulta){
            let arregloEntornos=procesarXpath(instruccion.consulta,entorno,entorno)
            arregloEntornos=procesarEtorno(arregloEntornos);
            entornosAux.push(arregloEntornos[0]);
        }else{
            entornosAux.push(entorno);
        }
        
    }



    
    var n, i, k, aux,aux2;
    n = entornosAux.length;
    for (k = 1; k < n; k++) {
        for (i = 0; i < (n - k); i++) {
            if (comparar(entornosAux[i].texto,entornosAux[i + 1].texto)) {
                
                aux = entornosAux[i];
                entornosAux[i] = entornosAux[i + 1];
                entornosAux[i + 1] = aux;
                
                aux2 = entornos[i];
                entornos[i] = entornos[i + 1];
                entornos[i + 1] = aux2;
                
            }
        }
    }
    
 
    return entornos;
}
function ejecutarData(instruccion,entorno,padre){
    let res=ejecutarLLamada(instruccion,entorno,entorno);
    res = res.replace(/[<][^><]+[>]/gm, '');
    res = res.replace('\n', '');
    if(res){
        return  res;
    }
    return  null;
}
function ejecutarUpper(instruccion,entorno,padre){
    let res=ejecutarLLamada(instruccion,entorno,entorno);
    
    if(res){
        return  res.toUpperCase();
    }
    return  null;
}
function ejecutarLower(instruccion,entorno,padre){
    let res=ejecutarLLamada(instruccion,entorno,entorno);
    
    if(res){
        return  res.toLowerCase();
    }
    return  null;
}

function ejecutarSubstring(instruccion,entorno,padre){
    let res=ejecutarLLamada(instruccion.valor,entorno,entorno);
    
    if(res){
        if(instruccion.fin){
            return  res.substring(instruccion.inicio,instruccion.fin);
        }
        return  res.substring(instruccion.inicio,res.length);
    }
    return  null;
}



function validarWhere(instruccion,tabla){

    let valor1;
    let valor2;
    switch (instruccion.tipo) {
        case "OP_MAS":
            valor1=validarWhere(instruccion.valor1,tabla);
            valor2=validarWhere(instruccion.valor2,tabla);
            return valor1+valor2;
         case "OP_RES":
         case "OP_MENOS":
            valor1=validarWhere(instruccion.valor1,tabla);
            valor2=validarWhere(instruccion.valor2,tabla);
            return valor1-valor2;
         case "OP_MUL":
            valor1=validarWhere(instruccion.valor1,tabla);
            valor2=validarWhere(instruccion.valor2,tabla);
            return valor1*valor2;
         case "OP_DIV":
            valor1=validarWhere(instruccion.valor1,tabla);
            valor2=validarWhere(instruccion.valor2,tabla);
            return valor1/valor2;
         case "OP_NEG":
             valor1=validarWhere(instruccion.valor1,tabla);
             return -1*valor1;

        case "MAYOR":
            valor1=validarWhere(instruccion.valor1,tabla);
            valor2=validarWhere(instruccion.valor2,tabla);
            return valor1 > valor2;
        case "MAYOR_IGUAL":
            valor1=validarWhere(instruccion.valor1,tabla);
            valor2=validarWhere(instruccion.valor2,tabla);
            return valor1 >= valor2;
        case "MENOR":
            valor1=validarWhere(instruccion.valor1,tabla);
            valor2=validarWhere(instruccion.valor2,tabla);
            return valor1 < valor2;
        case "MENOR_IGUAL":
            valor1=validarWhere(instruccion.valor1,tabla);
            valor2=validarWhere(instruccion.valor2,tabla);
            return valor1 <= valor2;
        case "IGUAL":
            valor1=validarWhere(instruccion.valor1,tabla);
            valor2=validarWhere(instruccion.valor2,tabla);
            return valor1 == valor2;
        case "DIFERENTE":
            valor1=validarWhere(instruccion.valor1,tabla);
            valor2=validarWhere(instruccion.valor2,tabla);
            return valor1 != valor2;
        case "NUMERO":
            return parseInt(instruccion.valor)
        case "CADENA":
            
            return instruccion.valor
        case "VARIABLE":
            let variable=tabla.getSimbolo(instruccion.variable);
            
            let arregloEntornos=procesarXpath(instruccion.consulta,variable,variable)
            arregloEntornos=procesarEtorno(arregloEntornos);
            for (const iterator of arregloEntornos) {
                if(iterator.valorAtributo){
                    return iterator.valorAtributo;
                }
                return iterator.texto
            }

        default:
            return false;
           
    }
}