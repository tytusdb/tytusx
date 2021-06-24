function ejecutarXQuery(instruccion,entorno){
    console.log("Iniciando ejecucion");
    
    let consulta=getConsultaXQuery(instruccion, entorno,null);
    if(consulta){
        imprimiConsola(consulta);
    }else{
        imprimiConsola("No hay resultados");
    }
}

function getConsultaXQuery(instruccion, entorno,padre){
    switch (instruccion.instr) {
        case "FOR_IN":

            return ejecutarForIn(instruccion,entorno,padre);
        case "HTML":
            
            return procesarHTML(instruccion.valor,entorno,null)
        case "LLAMADA":
            return ejecutarLLamada(instruccion.valor,entorno,padre);
        case "F_DATA":
            return ejecutarData(instruccion.valor,entorno,padre);
        case "F_UPPER":
            return ejecutarUpper(instruccion.valor,entorno,padre);
        case "F_LOWER":
            return ejecutarLower(instruccion.valor,entorno,padre);
        case "F_SUBSTRING":
            return ejecutarSubstring(instruccion.valor,entorno,padre);
        default:
            return null
    }
}

function ejecutarForIn(instruccion,entorno,padre){

    
    let consulta=instruccion.iterador.consulta;
    let entornos=procesarXpath(consulta,entorno,padre);
    entornos=procesarEtorno(entornos);
    
    //Orden by
    if(instruccion.order){
        entornos=ordenar(instruccion.order,entornos);
    }
    let where=instruccion.where;
    let respuesta="";
    for (const x of entornos) {
        let var_= new Entorno(padre);
        var_.agregar(instruccion.iterador.variable,x);
        let retorno=null;
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
        for (const hijo of entorno.hijos) {
            if(instruccion.valor==hijo.etiqueta)
            {
                respuesta.push(hijo);
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
    if(entorno.valorAtributo){
        let txt =entorno.nombreAtributo +'="' +entorno.valorAtributo +'"\n';
        return txt;
    }else{
        if (entorno.atributos) {
            for (const atr of entorno.atributos) {
              
              atributo = {
                  etiqueta: atr.nombreAtributo,
                  valor: atr.valorAtributo,
                };
              arregloAtributo.unshift(atributo);
            }
          } else {
              arregloAtributo = [];
          }
      for (const iterator of entorno.hijos) {
          contenido += imprimirEntorno(iterator);
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
    console.log(entorno);
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



    console.log(entornosAux);
    var n, i, k, aux,aux2;
    n = entornosAux.length;
    for (k = 1; k < n; k++) {
        for (i = 0; i < (n - k); i++) {
            if (parseFloat(entornosAux[i].texto) < parseFloat(entornosAux[i + 1].texto)) {
                console.log(entornosAux[i].texto);
                console.log(" CAMBIO POR ");
                console.log(entornosAux[i+1].texto);
                aux = entornosAux[i];
                entornosAux[i] = entornosAux[i + 1];
                entornosAux[i + 1] = aux;
                
                aux2 = entornos[i];
                entornos[i] = entornos[i + 1];
                entornos[i + 1] = aux2;
                
            }
        }
    }
    console.log(entornosAux);
 
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
    console.log(instruccion);
    if(res){
        if(instruccion.fin){
            return  res.substring(instruccion.inicio,instruccion.fin);
        }
        return  res.substring(instruccion.inicio,res.length);
    }
    return  null;
}