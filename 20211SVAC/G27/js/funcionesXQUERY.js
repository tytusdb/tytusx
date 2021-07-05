var listadoErroresEjecucionXquery = [];

/* FUNCIONES PARA EJECUCIÓN DE XQUERY */
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
        }else if(tipoIns.nombre == "for3"){
            console.log("Entro a instrucción: for3\n");
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

