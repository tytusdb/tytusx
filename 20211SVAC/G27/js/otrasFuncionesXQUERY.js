
var entornos = [];

var TablaSimbolo = {
    tabla : [],
    entAnterior:""
}

function agregarAmbito(tab) {
    
    TablaSimbolo.tabla = [];
    TablaSimbolo.entAnterior = tab;
    entornos.push(TablaSimbolo);
}


function agregarRegistro(id, simbolo, tablaActual) {
    if(tablaActual.length==0){
        tablaActual.push({id:id, simbolo});
    }else{
        for(var i in tablaActual){
            if(tablaActual[i].id != id){
                tablaActual.push({id:id, simbolo});
                console.log("Se registro simbolo");
            }else{
                console.log("No se registro simbolo");
            }
        }
    }
}

function buscarFuncion(id, tablaActual) {
    for(var i in tablaActual){
        if(tablaActual[i].simbolo.funcion === true && tablaActual[i].simbolo.id == id){
            console.log("Se encontro funcion");
            return tablaActual[i].simbolo;
        }else{
            console.log("No se encontro funcion");
            return null;
        }
    }
}


function existeFuncion(id, tablaActual) {
    for(var i in tablaActual){
        if(tablaActual[i].simbolo.funcion === true && tablaActual[i].simbolo.id == id){
            console.log("Se encontro funcion");
            return true;
        }else{
            console.log("No se encontro funcion");
            return false;
        }
    }
}




function guardarFuncion(lst){
    for(let ins in lst.instruccion){
        var tipoIns = lst.instruccion[ins];
        console.log(tipoIns);
        if(tipoIns.nombre == "funcion"){
            var simbolo = {
                funcion : true,
                lstParametros: tipoIns.lstParametros,
                tipo : tipoIns.tipo,
                prefix : tipoIns.prefix,
                id : tipoIns.id,
                id2 : tipoIns.id2,
                cuerpo : tipoIns.cuerpo               
            }
            agregarRegistro(tipoIns.id, simbolo, tabla);
        }
    }
}


function verificarParametros(id, lstPar, tabla) {
    var simboloFuncion = buscarFuncion(id, tabla);
    if(simboloFuncion!=null){
        var parametros = simboloFuncion.lstParametros.lstParametros;
        if(parametros.length == lstPar.lstDeclaracion.length){
            let tablaActual = agregarAmbito(tabla);

            for(var p in parametros){
                var exp = ejecutarExpresion(lstPar.lstDeclaracion[p].exp);
                //falta poner en expresiones Declaracion2 para poder devolver un resultado...
                var tipo = parametros[p].tpDato;
                
                if(tipo == exp.tipo){
                    console.log("si es un parametro del mismo tipo");
                    var simbolo = {
                        funcion : false,
                        tipo : tipo,
                        id : parametros[p].id,
                        valor : exp.valor               
                    }

                    agregarRegistro(parametros[p].id, simbolo, tablaActual);

                }else{
                    console.log("No contiene el mismo de parametro");
                    return null;
                }

            }
            return true;
        }else{
            console.log("No tiene el mismo numero de parametros");
        } 
    }

}



function llamadaFuncion(params, tablaActual) {
    if(existeFuncion(params.id, tablaActual)){
        let tablaLocal = agregarAmbito(tablaActual);
        var simboloFuncion = buscarFuncion(params.id, tablaActual);
        var parametros = simboloFuncion.lstParametros;
        if(verificarParametros(simboloFuncion.id, params.lstParametros, tablaActual)){
            var funcion = {nombre:"funcion", cuerpo:simboloFuncion.cuerpo};
            var valorRetorno = ejecutarFuncion(funcion, tablaLocal);
            return valorRetorno;
        }else{
            console.log("Los parametros no concuerdan");
        }
    }else{
        console.log("No existe la funcion");
    }
}


function ejecutarFuncion(funcion, tablaActual) {
       return recorridoArbol(funcion.cuerpo, tablaActual);
}