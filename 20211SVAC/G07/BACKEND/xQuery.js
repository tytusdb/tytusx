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
            respuesta+=retorno;
        }
    }
    
    if(respuesta!=""){
        return respuesta;
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
                return iterator.texto
            }

        default:
            return false;
           
    }
}


function procesarReturn(instruccion,variables){
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
    return null;
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
    if(!entorno.etiqueta){
        for (const iterator of entorno) {
            procesarArreglo(iterator);
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
            entornosAux.unshift(arregloEntornos[0]);
        }else{
            entornosAux.unshift(entorno);
        }
        
    }
    console.log(entornosAux);
    let i=0;
    for (const principal of entornosAux) {
        let ii=0;
        for (const secundario of entornosAux) {
            if(entornosAux[i].texto>entornosAux[ii].texto){
                let aux=entornosAux[ii];
                entornosAux[ii]=entornosAux[i];
                entornosAux[i]=aux;

                let aux2=entornos[ii];
                entornos[ii]=entornos[i];
                entornos[i]=aux2;
            }
            ii++;
        } 
        i++;
    }
 
    return entornos;
}
