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
        default:
            return null
    }
}

function ejecutarForIn(instruccion,entorno,padre){
    console.error("ejecutarForIn");
    let entorno= new Entorno(padre);
    let consulta=instruccion.iterador.consulta;
    let entornos=procesarXpath(consulta,entorno,padre);
    let respuesta="";
    for (const x of entornos) {
        let variable={nombre:instruccion.iterador.variable,valor:x};
        let retorno=procesarReturn(instruccion.retorno,variable);
        if(retorno){
            respuesta+=retorno;
        }
    }
    
    if(respuesta!=""){
        return respuesta;
    }

    return null;
    
}
function procesarReturn(instruccion,entorno){

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
        default:
            return null
    }
}

function imprimirEntorno(entorno){

    let contenido="";
    let atributo;
        if (entorno.atributos) {
          atributo = {
            etiqueta: entorno.atributos.nombreAtributo,
            valor: entorno.atributos.valorAtributo,
          };
        } else {
          atributo = "";
        }
    for (const iterator of entorno.hijos) {
        contenido += imprimirEntorno(iterator);
    }
    let retorno = new Etiqueta(
        entorno.etiqueta,
        entorno.texto,
        contenido,
        atributo
      ); //nombre,texto,contenido
      if (retorno) {
        return retorno.obtenerXML();
      }
      return null;
}
function getConsultaXPath(arreglo){
    let retorno=[];
    let indice=0;
    let contador=0;
    for (const iterator of arreglo) {
        if(contador!=0){
            retorno.push(iterator);
        }
        contador++;
    }
    return retorno;
}

