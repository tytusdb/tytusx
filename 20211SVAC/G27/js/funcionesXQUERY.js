var listadoErroresEjecucionXquery = [];

/* FUNCIONES PARA EJECUCIÓN DE XQUERY */
// encabezadoFor2[0] = id de variable
// encabezadoFor2[1] = i inicial
// encabezadoFor2[2] = i final
encabezadoFor2 = [];
encabezadoFor3 = [];
rutaXpathFor3 = [];

const parseXQUERY = function(entrada){
    var mensajeConsola = "";
    try {
        console.log("***************************************************\n");
        console.log("**************ANALISIS DE XQUERY*******************\n");
        document.getElementById('consola').innerHTML += "\n>**********************************************\n"
                                                        + ">**************ANALISIS DE XQUERY***********\n";
        try {
            let resultado = gramaticaXQUERY.parse(entrada);
            console.log("\n\n");
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$\n");
            console.log("$$$$$$$$$$$$$$$$$$$$INICIA EJECUCIÓN XQUERY$$$$$$$$$$$$$$$\n\n");
            recorridoArbol(resultado);
            console.log("\n");
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$\n");
            if (resultado != undefined){
                console.log(">Se ejecutó correctamente el parser de XQUERY.\n");
                document.getElementById('consola').innerHTML += ">Se ejecutó correctamente el parser de XQUERY. \n";
            }else{
                console.log(">Undefinde Se ejecutó correctamente el parser de XQUERY.\n");
                document.getElementById('consola').innerHTML += ">Undefinded Se ejecutó correctamente el parser de XQUERY. \n";
            }
        } catch (e) {
            console.log(">[ERROR]:Ocurrió un error en el parseo del contenido XQUERY\n");
                document.getElementById('consola').innerHTML += ">[ERROR]:Ocurrió un error en el parseo del contenido XQUERY \n";
        }
    } catch (error) {
        document.getElementById('consola').innerHTML += ">" + error.toString(); 
    }
}

function recorridoArbol(lst) {
    alert("Entro a recorrer el arbol");
    var cantidad = 0;
    var instruccion2 = "";
    for(let ins in lst.instruccion){
        var tipoIns = lst.instruccion[ins];
        instruccion2 = tipoIns.nombre;
        console.log(tipoIns);
        if(tipoIns.nombre == "LlamadaFuncion"){
            console.log("Entro a instrucción: LlamadaFuncion\n");

        }else if(tipoIns.nombre == "funcion"){
            console.log("Entro a instrucción: funcion\n");
            let resultado = ejecutarExpresion(tipoIns.cuerpo.exp);
            let valor = resultado.valor;
            console.log("EL RESULTADO DE LA EXPRESION ES: "+resultado.valor);
        }else if(tipoIns.nombre == "asigLetCompEXP"){
            //-------
            alert("asigLetCompEXP");
            console.log("Entro a instrucción: asigLetCompExp\n");
            let resultado = ejecutarExpresion(tipoIns.exp);
            console.log(resultado.valor);
            /*            
                    declare function local:minPrice($p as xs:decimal?,$d as xs:decimal?)
                    as xs:decimal?
                    {
                    let $disc := (10 * 8) div 100
                    return ($p - $disc)
                    };
            */

        }else if(tipoIns.nombre == ""){
            console.log("Entro a instrucción: \n");
        }else if(tipoIns.nombre == "senDoc"){
            console.log("Entro a instrucción: senDoc\n");
        }else if(tipoIns.nombre == "asigLetComp"){
            console.log("Entro a instrucción: asigLetComp\n");
        }else if(tipoIns.nombre == "asigLet"){
            console.log("Entro a instrucción: asigLet\n");
        }else if(tipoIns.nombre == "for1"){
            console.log("Entro a instrucción: for1\n");
        }else if(tipoIns.nombre == "for2"){
            console.log("Entro a instrucción: for2\n");
            //-------
            alert("for2");
            vaciarArray(encabezadoFor2);
            let resultado = ejecutarFor2(tipoIns);
            
            console.log("Encabezado de For2: \n");
            console.log(encabezadoFor2);
            var salida = "";
            var inicio = encabezadoFor2[1];
            var final = encabezadoFor2[2];
            for(var i = inicio; i <= final; i++){
                salida += i.toString()+"\n";
            }
            console.log(salida);
/*
for $x in (10,20), $y in (100,200)
return x={$x} and y={$y}; 
*/
        }else if(tipoIns.nombre == "for3"){
            console.log("Entro a instrucción: for3\n");
            //-------
            alert("for3");
            vaciarArray(encabezadoFor3);
            vaciarArray(rutaXpathFor3);
            let resultado = ejecutarFor3(tipoIns);
            console.log("Encabezado de For3: \n");
            console.log(encabezadoFor3);
            console.log(rutaXpathFor3);
            var salida = "";
            console.log(salida);

        }else if(tipoIns.nombre == "parametro"){
            console.log("Entro a instrucción: parametro\n");
        }else if(tipoIns.nombre == "orderBy"){
            console.log("Entro a instrucción: orderBy\n");
        }else if(tipoIns.nombre == "where"){
            console.log("Entro a instrucción: where\n");
        }else if(tipoIns.nombre == "return"){
            console.log("Entro a instrucción: return\n");
        }else if(tipoIns.nombre == "decToXPath"){
            console.log("Entro a instrucción: decToXPath\n");
        }else if(tipoIns.nombre == "decLstValoresXPath"){
            console.log("Entro a instrucción: decLstValoresXPath\n");
        }else if(tipoIns.nombre == "decTo"){
            console.log("Entro a instrucción: decTo\n");
            //-------
            alert("decTo");
            let resultado = ejecutarDecTo(tipoIns);
            console.log("Encabezado de For2: \n");
            console.log(encabezadosForDecTo);
            var salida = "";
            var inicio = encabezadosForDecTo[1];
            var final = encabezadosForDecTo[2];
            for(var i = inicio; i <= final; i++){
                salida += i.toString()+"\n";
            }
            console.log(salida);
        }else if(tipoIns.nombre == "decLstValores"){
            console.log("Entro a instrucción: decLstValores\n");
        }else if(tipoIns.nombre == "declaracion"){
            console.log("Entro a instrucción: declaracion\n");
        }else if(tipoIns.nombre == "declaracion2"){
            console.log("Entro a instrucción: declaracion2\n");
        }else if(tipoIns.nombre == "lstAcceso"){
            console.log("Entro a instrucción: lstAcceso\n");
        }else if(tipoIns.nombre == "lstAcceso2"){
            console.log("Entro a instrucción: lstAcceso2\n");
        }else if(tipoIns.nombre == "lstAcceso3"){
            console.log("Entro a instrucción: lstAcceso3\n");
        }else if(tipoIns.nombre == "lstAcceso4"){
            console.log("Entro a instrucción: lstAcceso4\n");
        }else if(tipoIns.nombre == "lstAcceso5"){
            console.log("Entro a instrucción: lstAcceso5\n");
        }else if(tipoIns.nombre == "lstAcceso6"){
            console.log("Entro a instrucción: lstAcceso6\n");
        }else if(tipoIns.nombre == "data"){
            console.log("Entro a instrucción: data\n");
        }else if(tipoIns.nombre == "lstNodos"){
            console.log("Entro a instrucción: lstNodos\n");
        }else if(tipoIns.nombre == "nodo"){
            console.log("Entro a instrucción: nodo\n");
        }else if(tipoIns.nombre == "nodo2"){
            console.log("Entro a instrucción: nodo2\n");
        }else if(tipoIns.nombre == "valorNodo"){
            console.log("Entro a instrucción: valorNodo\n");
        }else if(tipoIns.nombre == "valorNodo2"){
            console.log("Entro a instrucción: valorNodo2\n");
        }else if(tipoIns.nombre == "valorNodo3"){
            console.log("Entro a instrucción: valorNodo3\n");
        }else if(tipoIns.nombre == "lstObj"){
            console.log("Entro a instrucción: lstObj\n");
        }else if(tipoIns.nombre == "lstObj2"){
            console.log("Entro a instrucción: lstObj2\n");
        }else if(tipoIns.nombre == "lstObj3"){
            console.log("Entro a instrucción: lstObj3\n");
        }else if(tipoIns.nombre == "sentenciaIf_simple"){
            console.log("Entro a instrucción: sentenciIf_simple\n");
        }else if(tipoIns.nombre == "sentenciaIf_si_entonces1"){
            console.log("Entro a instrucción: sentenciaIf_si_entonces1\n");
        }else if(tipoIns.nombre == "sentenciaIf_si_entonces2"){
            console.log("Entro a instrucción: sentenciaIf_si_entonces2\n");
        }else if(tipoIns.nombre == "sentenciaIf_si_entonces3"){
            console.log("Entro a instrucción: sentenciaIf_si_entonces3\n");
        }else if(tipoIns.nombre == "si_if"){
            console.log("Entro a instrucción: siIf\n");
        }else if(tipoIns.nombre == "entoncesSi_else_elseif"){
            
        }else if(tipoIns.nombre == "entoncesSi_elseIf"){
            
        }else if(tipoIns.nombre == "entSi_simple"){
            
        }else if(tipoIns.nombre == "entSi_extendido"){
            
        }else if(tipoIns.nombre == "entonces_simple"){
            
        }else if(tipoIns.nombre == "entonces_extendido"){
            
        }else if(tipoIns.nombre == "select_doble"){
            
        }else if(tipoIns.nombre == "select_simple"){
            
        }else if(tipoIns.nombre == "entSi_simple"){
            
        }else if(tipoIns.nombre == "select_argumento_arroba"){
            
        }else if(tipoIns.nombre == "select_argumento_por"){
            
        }else if(tipoIns.nombre == "select_argumento_punto"){
            
        }else if(tipoIns.nombre == "select_argumento_doblePunto"){
            
        }else if(tipoIns.nombre == "eje_ancestor"){
            
        }else if(tipoIns.nombre == "eje_attribute"){
            
        }else if(tipoIns.nombre == "eje_child"){
            
        }else if(tipoIns.nombre == "eje_descendant"){
            
        }else if(tipoIns.nombre == "eje_following"){
            
        }else if(tipoIns.nombre == "eje_namespace"){
            
        }else if(tipoIns.nombre == "eje_parent"){
            
        }else if(tipoIns.nombre == "eje_preceding"){
            
        }else if(tipoIns.nombre == "eje_self"){
            
        }else if(tipoIns.nombre == "or_self_extendido"){
            
        }else if(tipoIns.nombre == "or_self_simple"){
            
        }else if(tipoIns.nombre == "sibling_extendido"){
            
        }else if(tipoIns.nombre == "funPrimitivaSubString"){
            
        }
        cantidad++;
    }
    console.log("Recorrió la instrucción: "+instruccion2+"\n");

}
/* 
for $x in (10 to 20)
return x={$x}
*/


function ejecutarFor2(arr){
    var nombreVariable;
    var id;
    var tipoArr;
    var numInicial;
    var numFinal;
    if (arr != undefined){
        if(arr.lstDeclaracion){
            console.log(arr.lstDeclaracion);
            ejecutarFor2(arr.lstDeclaracion);
        }else{
            console.log(arr[0]);
            tipoArr = arr[0].nombre;
            if(tipoArr === "declaracion"){
                nombreVariable = arr[0].nombre;
                id = arr[0].id;
                encabezadoFor2.push(id);
                if(arr[0].declaracion){
                    if(arr[0].declaracion.lstVal){
                        ejecutarFor2(arr[0].declaracion.lstVal.lstValores);
                    }else if(arr[0].declaracion.exp1){
                        ejecutarDecTo(arr[0].declaracion);
                    }
                }
                if(arr[0].lstVal){
                    ejecutarFor2(arr[0].lstVal.lstValores);
                }
            }else if(tipoArr === "primitivoEntero"){
                let op1 = arr[0].op1;
                let op2 = arr[1].op1;
                var op1Convertido = parseFloat(op1);
                var op2Convertido = parseFloat(op2);
                encabezadoFor2.push(op1Convertido);
                encabezadoFor2.push(op2Convertido);
                numInicial = {valor:op1Convertido , tipo:"integer"};
                numFinal = {valor:op2Convertido , tipo: "integer"};
            }
        }
    }
    return true;
}

function ejecutarFor3(arr){
    var nombreVariable;
    var id;
    var id2;
    var tipoArr;
    var nombreFuenteDatos;
    if (arr != undefined){
        if(arr.declaracion){
            console.log(arr.declaracion);
            id = arr.id;
            id2 = arr.id2;
            encabezadoFor3.push(id);
            encabezadoFor3.push(id2);
            ejecutarFor3(arr.declaracion);
        }else{
            if(arr[0]){tipoArr = arr[0].nombre;}
            else{tipoArr = arr.nombre;}

            console.log(arr);
            if(tipoArr === "decLstValoresXPath"){
                if(arr.lstVal){
                    ejecutarFor3(arr.lstVal.lstValores);
                }
                if(arr.xPath){
                    ejecutarXpathImplicito(arr.xPath);
                }
            }else if(tipoArr === "primitivoString"){
                let op1 = arr[0].op1;
                var op1Convertido = op1.toString();
                encabezadoFor3.push(op1Convertido);
                nombreFuenteDatos = {valor:op1Convertido , tipo:"string"};
            }
        }
    }
    return true;
}

function ejecutarXpathImplicito(arr){
    var nombreVariable;
    var id;
    var id2;
    var tipoArr;
    var nombre;
    if (arr != undefined){
        if(arr.valorNodo){
            console.log(arr.valorNodo);
            id = arr.valorNodo.id;
            rutaXpathFor3.push(id);
            ejecutarXpathImplicito(arr.valorNodo.nodoComplemento);
        }else{
            if(arr[0]){tipoArr = arr[0].nombre;}
            else{tipoArr = arr.nombre;}
            console.log(arr);
            if(tipoArr !== "primitivoNodoid"){
                if(arr.lstValor[0].valorNodo){
                    id = arr.lstValor[0].valorNodo.id;
                    rutaXpathFor3.push(id);
                    ejecutarXpathImplicito(arr.lstValor[0].valorNodo.nodoComplemento);
                }else if(arr.lstValor[0].exp){
                    id = arr.lstValor[0].exp.op1;
                    rutaXpathFor3.push(id);
                }
            }
        }
    }
    return true;
}

function ejecutarDecTo(arr){
    var nombreVariable;
    var id;
    var tipoArr;
    var numInicial;
    var numFinal;
    let exp1 = arr.exp1;
    let exp2 = arr.exp2;
    if (arr != undefined){
        if(exp1.nombre === "primitivoEntero"){
                let op1 = exp1.op1;
                let op2 = exp2.op1;
                var op1Convertido = parseFloat(op1);
                var op2Convertido = parseFloat(op2);
                encabezadoFor2.push(op1Convertido);
                encabezadoFor2.push(op2Convertido);
                numInicial = {valor:op1Convertido , tipo:"integer"};
                numFinal = {valor:op2Convertido , tipo: "integer"};
            }
    }
    return true;
}
     /*            
                    declare function local:minPrice($p as xs:decimal?,$d as xs:decimal?)
                    as xs:decimal?
                    {
                    let $disc := (10 * 8) div 100
                    return ($p - $disc)
                    };
            */
function ejecutarExpresion(exp){

    if (exp != undefined){
        //let sig = exp.tipo;
        if(exp.tipo === "*"){
            let op1 = ejecutarExpresion(exp.op1);
            let op2 = ejecutarExpresion(exp.op2);
                if(op1.tipo === "integer" && op2.tipo === "integer" ){
                    console.log(">Resultado Ejecución Multiplicación "+op1.valor + " * "+op2.valor+" = "+ op1*op2+"\n");
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor = op1Convertido * op2Convertido;
                    return {valor:valor , tipo:"integer"};
                }if(op1.tipo === "decimal" && op2.tipo === "decimal" ){
                    console.log(">Resultado Ejecución Multiplicación "+op1.valor + " * "+op2.valor+" = "+ op1*op2+"\n");
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor = op1Convertido * op2Convertido;
                    return {valor:valor , tipo:"decimal"};
                }else{
                    listadoErroresEjecucionXquery.push({tipo:"Sintáctico", descripcion:"No se pueden sumar dos operandos no numéricos"});
                }
        
        }else if(exp.tipo === "div"){
            let op1 = ejecutarExpresion(exp.op1);
            let op2 = ejecutarExpresion(exp.op2);
                if(op1.tipo === "integer" && op2.tipo === "integer"){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor = op1Convertido / op2Convertido;
                    return {valor:valor , tipo:"integer"};
                }else if(op1.tipo === "decimal" && op2.tipo === "decimal"){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor = op1Convertido / op2Convertido;
                    return {valor:valor , tipo:"decimal"};
                }
        }else if(exp.tipo === "+"){
            let op1 = ejecutarExpresion(exp.op1);
            let op2 = ejecutarExpresion(exp.op2);
                if(op1.tipo === "integer" && op2.tipo === "integer"){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor = op1Convertido + op2Convertido;
                    return {valor:valor , tipo:"integer"};
                }else if(op1.tipo === "decimal" && op2.tipo === "decimal"){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor = op1Convertido + op2Convertido;
                    return {valor:valor , tipo:"decimal"};
                }
        }else if(exp.tipo === "-"){
            let op1 = ejecutarExpresion(exp.op1);
            let op2 = ejecutarExpresion(exp.op2);
                if(op1.tipo === "integer" && op2.tipo === "integer"){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor = op1Convertido - op2Convertido;
                    return {valor:valor , tipo:"integer"};
                }else if(op1.tipo === "decimal" && op2.tipo === "decimal"){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor = op1Convertido - op2Convertido;
                    return {valor:valor , tipo:"decimal"};
                }
        }else if(exp.tipo === "%"){
            let op1 = ejecutarExpresion(exp.op1);
            let op2 = ejecutarExpresion(exp.op2);
                if(op1.tipo === "integer" && op2.tipo === "integer"){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor = op1Convertido % op2Convertido;
                    return {valor:valor , tipo:"integer"};
                }else if(op1.tipo === "decimal" && op2.tipo === "decimal"){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor = op1Convertido % op2Convertido;
                    return {valor:valor , tipo:"decimal"};
                }
        }else if(exp.tipo === "<"){
            let op1 = ejecutarExpresion(exp.op1);
            let op2 = ejecutarExpresion(exp.op2);
                if((op1.tipo === "integer" && op2.tipo === "integer") || (op1.tipo === "decimal" && op2.tipo === "decimal") || 
                   (op1.tipo === "integer" && op2.tipo === "decimal") || (op1.tipo === "decimal" && op2.tipo === "integer")){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor;
                    if(op1Convertido < op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
                if(op1.tipo === "string" && op2.tipo === "string"){
                    var op1Convertido = op1.valor.toString();
                    var op2Convertido = op2.valor.toString();
                    var valor;
                    if(op1Convertido < op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
        }else if(exp.tipo === "<="){
            let op1 = ejecutarExpresion(exp.op1);
            let op2 = ejecutarExpresion(exp.op2);
                if((op1.tipo === "integer" && op2.tipo === "integer") || (op1.tipo === "decimal" && op2.tipo === "decimal") || 
                (op1.tipo === "integer" && op2.tipo === "decimal") || (op1.tipo === "decimal" && op2.tipo === "integer")){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor;
                    if(op1Convertido <= op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
                if(op1.tipo === "string" && op2.tipo === "string"){
                    var op1Convertido = op1.valor.toString();
                    var op2Convertido = op2.valor.toString();
                    var valor;
                    if(op1Convertido <= op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
        }else if(exp.tipo === ">"){
            let op1 = ejecutarExpresion(exp.op1);
            let op2 = ejecutarExpresion(exp.op2);
                if((op1.tipo === "integer" && op2.tipo === "integer") || (op1.tipo === "decimal" && op2.tipo === "decimal") || 
                (op1.tipo === "integer" && op2.tipo === "decimal") || (op1.tipo === "decimal" && op2.tipo === "integer")){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor;
                    if(op1Convertido > op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
                if(op1.tipo === "string" && op2.tipo === "string"){
                    var op1Convertido = op1.valor.toString();
                    var op2Convertido = op2.valor.toString();
                    var valor;
                    if(op1Convertido > op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
        }else if(exp.tipo === ">="){
            let op1 = ejecutarExpresion(exp.op1);
            let op2 = ejecutarExpresion(exp.op2);
                if((op1.tipo === "integer" && op2.tipo === "integer") || (op1.tipo === "decimal" && op2.tipo === "decimal") || 
                (op1.tipo === "integer" && op2.tipo === "decimal") || (op1.tipo === "decimal" && op2.tipo === "integer")){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor;
                    if(op1Convertido >= op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
                if(op1.tipo === "string" && op2.tipo === "string"){
                    var op1Convertido = op1.valor.toString();
                    var op2Convertido = op2.valor.toString();
                    var valor;
                    if(op1Convertido >= op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
        }else if(exp.tipo === "="){
            let op1 = ejecutarExpresion(exp.op1);
            let op2 = ejecutarExpresion(exp.op2);
                if((op1.tipo === "integer" && op2.tipo === "integer") || (op1.tipo === "decimal" && op2.tipo === "decimal") || 
                (op1.tipo === "integer" && op2.tipo === "decimal") || (op1.tipo === "decimal" && op2.tipo === "integer")){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor;
                    if(op1Convertido = op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
                if(op1.tipo === "string" && op2.tipo === "string"){
                    var op1Convertido = op1.valor.toString();
                    var op2Convertido = op2.valor.toString();
                    var valor;
                    if(op1Convertido === op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
        }else if(exp.tipo === "!="){
            let op1 = ejecutarExpresion(exp.op1);
            let op2 = ejecutarExpresion(exp.op2);
                if((op1.tipo === "integer" && op2.tipo === "integer") || (op1.tipo === "decimal" && op2.tipo === "decimal") || 
                (op1.tipo === "integer" && op2.tipo === "decimal") || (op1.tipo === "decimal" && op2.tipo === "integer")){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor;
                    if(op1Convertido != op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
                if(op1.tipo === "string" && op2.tipo === "string"){
                    var op1Convertido = op1.valor.toString();
                    var op2Convertido = op2.valor.toString();
                    var valor;
                    if(op1Convertido != op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
        }else if(exp.tipo === "||"){
            let op1 = ejecutarExpresion(exp.op1);
            let op2 = ejecutarExpresion(exp.op2);
                if((op1.tipo === "integer" && op2.tipo === "integer") || (op1.tipo === "decimal" && op2.tipo === "decimal") || 
                (op1.tipo === "integer" && op2.tipo === "decimal") || (op1.tipo === "decimal" && op2.tipo === "integer")){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor;
                    if(op1Convertido){
                        valor = true;
                    }else if(op2Convertido){
                        valor = true;
                    }else{
                        valor = false;
                    }
                    return {valor:valor , tipo:"or"};
                }
                if(op1.tipo === "string" && op2.tipo === "string"){
                    var op1Convertido = op1.valor.toString();
                    var op2Convertido = op2.valor.toString();
                    var valor;
                    if(op1Convertido != ""){
                        valor = true;
                    }else if(op2Convertido != ""){
                        valor = true;
                    }else{
                        valor = false;
                    }
                    return {valor:valor , tipo:"boolean"};
                }
        }else if(exp.tipo === "and" || exp.tipo ==="AND"){
            let op1 = ejecutarExpresion(exp.op1);
            let op2 = ejecutarExpresion(exp.op2);
                if((op1.tipo === "integer" && op2.tipo === "integer") || (op1.tipo === "decimal" && op2.tipo === "decimal") || 
                (op1.tipo === "integer" && op2.tipo === "decimal") || (op1.tipo === "decimal" && op2.tipo === "integer")){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor;
                    if(op1Convertido != undefined && op2Convertido != undefined){
                        valor = true;
                    }else if(op2Convertido){
                        valor = false;
                    }
                    return {valor:valor , tipo:"boolean"};
                }
                if(op1.tipo === "string" && op2.tipo === "string"){
                    var op1Convertido = op1.valor.toString();
                    var op2Convertido = op2.valor.toString();
                    var valor;
                    if(op1Convertido != undefined && op2Convertido != undefined){
                        valor = true;
                    }else if(op2Convertido){
                        valor = false;
                    }
                    return {valor:valor , tipo:"boolean"};
                }
        }else if(exp.tipo === "eq"){
            let op1 = ejecutarExpresion(exp.op1);
            let op2 = ejecutarExpresion(exp.op2);
                if((op1.tipo === "integer" && op2.tipo === "integer") || (op1.tipo === "decimal" && op2.tipo === "decimal") || 
                (op1.tipo === "integer" && op2.tipo === "decimal") || (op1.tipo === "decimal" && op2.tipo === "integer")){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor;
                    if(op1Convertido = op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
                if(op1.tipo === "string" && op2.tipo === "string"){
                    var op1Convertido = op1.valor.toString();
                    var op2Convertido = op2.valor.toString();
                    var valor;
                    if(op1Convertido === op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
        }else if(exp.tipo === "ne"){
            let op1 = ejecutarExpresion(exp.op1);
            let op2 = ejecutarExpresion(exp.op2);
                if((op1.tipo === "integer" && op2.tipo === "integer") || (op1.tipo === "decimal" && op2.tipo === "decimal") || 
                (op1.tipo === "integer" && op2.tipo === "decimal") || (op1.tipo === "decimal" && op2.tipo === "integer")){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor;
                    if(op1Convertido != op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
                if(op1.tipo === "string" && op2.tipo === "string"){
                    var op1Convertido = op1.valor.toString();
                    var op2Convertido = op2.valor.toString();
                    var valor;
                    if(op1Convertido != op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
        }else if(exp.tipo === "lt"){
            let op1 = ejecutarExpresion(exp.op1);
            let op2 = ejecutarExpresion(exp.op2);
                if((op1.tipo === "integer" && op2.tipo === "integer") || (op1.tipo === "decimal" && op2.tipo === "decimal") || 
                   (op1.tipo === "integer" && op2.tipo === "decimal") || (op1.tipo === "decimal" && op2.tipo === "integer")){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor;
                    if(op1Convertido < op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
                if(op1.tipo === "string" && op2.tipo === "string"){
                    var op1Convertido = op1.valor.toString();
                    var op2Convertido = op2.valor.toString();
                    var valor;
                    if(op1Convertido < op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
        }else if(exp.tipo === "le"){
            let op1 = ejecutarExpresion(exp.op1);
            let op2 = ejecutarExpresion(exp.op2);
                if((op1.tipo === "integer" && op2.tipo === "integer") || (op1.tipo === "decimal" && op2.tipo === "decimal") || 
                (op1.tipo === "integer" && op2.tipo === "decimal") || (op1.tipo === "decimal" && op2.tipo === "integer")){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor;
                    if(op1Convertido <= op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
                if(op1.tipo === "string" && op2.tipo === "string"){
                    var op1Convertido = op1.valor.toString();
                    var op2Convertido = op2.valor.toString();
                    var valor;
                    if(op1Convertido <= op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
        }else if(exp.tipo === "gt"){
            let op1 = ejecutarExpresion(exp.op1);
            let op2 = ejecutarExpresion(exp.op2);
                if((op1.tipo === "integer" && op2.tipo === "integer") || (op1.tipo === "decimal" && op2.tipo === "decimal") || 
                (op1.tipo === "integer" && op2.tipo === "decimal") || (op1.tipo === "decimal" && op2.tipo === "integer")){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor;
                    if(op1Convertido > op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
                if(op1.tipo === "string" && op2.tipo === "string"){
                    var op1Convertido = op1.valor.toString();
                    var op2Convertido = op2.valor.toString();
                    var valor;
                    if(op1Convertido > op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
        }else if(exp.tipo === "ge"){
            let op1 = ejecutarExpresion(exp.op1);
            let op2 = ejecutarExpresion(exp.op2);
                if((op1.tipo === "integer" && op2.tipo === "integer") || (op1.tipo === "decimal" && op2.tipo === "decimal") || 
                (op1.tipo === "integer" && op2.tipo === "decimal") || (op1.tipo === "decimal" && op2.tipo === "integer")){
                    var op1Convertido = parseFloat(op1.valor);
                    var op2Convertido = parseFloat(op2.valor);
                    var valor;
                    if(op1Convertido >= op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
                if(op1.tipo === "string" && op2.tipo === "string"){
                    var op1Convertido = op1.valor.toString();
                    var op2Convertido = op2.valor.toString();
                    var valor;
                    if(op1Convertido >= op2Convertido){valor = true;}else{valor = false;};
                    return {valor:valor , tipo:"boolean"};
                }
        }else if(exp.nombre === "primitivoEntero"){
                let op1 = exp.op1;
                var op1Convertido = parseFloat(op1);
                return {valor:op1Convertido , tipo:"integer"};
        }else if(exp.nombre === "primitivoDecimal"){
            let op1 = exp.op1;
            var op1Convertido = parseFloat(op1);
            return {valor:op1Convertido , tipo:"decimal"};
        }else if(exp.nombre === "primitivoString"){
            let op1 = exp.op1;
            var op1Convertido = op1.toString();
            return {valor:op1Convertido , tipo:"string"};
        }
    }
}

function vaciarArray(array){
    for(var i = array.length; i > 0; i--){
        array[i].pop();
    }
}
/*--------------------------------------------------------------------------------------------*/

/* codemirror para textarea de XQUERY */
var code2 = document.getElementById("EntradaXQuery");
var editor2 = CodeMirror.fromTextArea(code2, {
    height: "350px;",
        mode: "text/x-sql",
        lineNumbers: true
});

function showCodeXQuery(){
    var text = editor2.getValue();
    return text;
}

