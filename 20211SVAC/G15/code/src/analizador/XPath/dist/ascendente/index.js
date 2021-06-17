const  AST = require('./AST.js').default;
const parser =require('./gramatica');
const nodito = require('./Nodo');

var Entorno_1 = require("../../../XML/dist/Simbolo/Entorno");
var Simbolo_1 = require("../../../XML/dist/Simbolo/Simbolo");
var Tipo_1 = require("../../../XML/dist/Simbolo/Tipo");

var bandera=0;
var cadenaTablaSimbolos = "";
var EntornoActual = new Entorno_1.Entorno(null);
var EntornoPadre = new Entorno_1.Entorno(null);
var Hereda = [];
var ArrayEntorno=[];
var texto="";

var BanderaDDiagonal = false;

var cadenaSalidaConsola = "";
var TablaEntornosActual=[];
var TablaEntornosActualPadre=[];


var TablaDiagonales=[];
var ContadorDiagonales=0;


var TablaAtributos=[];
var BanderaHayAtributos = false;

var TablaEntornosActualTemporal=[];
var TablaEntornosActualTemporalPadre=[];

function AnalisisXPath(texto){
    var analisis=  parser.parse(texto.toString()); 
    var Raiz = new AST();
    var CodigoGraphvizRecuperado= Raiz.RecorrerAST(analisis.diagramaAST);
    Raiz.LimpiarVariableGraph();
    console.log(CodigoGraphvizRecuperado);
    cadenaSalidaConsola="";
    return {objeto:analisis,DotAst:CodigoGraphvizRecuperado,msj:'Analisis Ascendente XPath finalizado.',nodo:analisis.diagramaAST};
}
//AnalisisXPath('//bookstore[7+3 or 4*3 or price=12] | //racknack//braith//caicul[7+3 and price>32 or price=12]| //totis//chel[7+3 and price>32 or price=12]');

function Run(nodos,Entorno,encoding){
    cadenaTablaSimbolos="";
    TablaEntornosActual = [];
    TablaEntornosActualTemporal = [];
    TablaAtributos=[];
    TablaDiagonales=[];
    ContadorDiagonales = 1;
    BanderaHayAtributos = false;

    var retornarSalida = ""
    var i=0;


    TablaEntornosActual.push(Entorno);
    TablaEntornosActualPadre.push(null);

    var ten = recorrer(nodos,Entorno,encoding);



   // if(ten != "0" || TablaEntornosActual.length != 0){
        console.log("\nEMPIEZA TABLAS ENTORNOS ACTUAL:\n");
        // console.log("TAMANIO TABLA -> " + TablaEntornosActual.length);
        // console.log("YY TEN -> " + ten);
        
        for (let index = 0; index < TablaEntornosActual.length; index++) {
            console.log(TablaEntornosActual[index]);
            console.log("Padre");
            console.log(TablaEntornosActualPadre[index]);
        }
        

        //REVISAR ESTO, PARA PODER ACEPTAR LOS PADRES Y DEMAS, LA BANDERA ES PARA  VER SI VIENEN SOLO ATRIBUTOS

        if (BanderaHayAtributos) {
            EscribirSalidaAtriutos();
        }else{
            EscribirSalidaConsola();
        }

        


        
        console.log("\n: FINALIZA TABLAS ENTORNOS ACTUAL\n");
        retornarSalida = cadenaSalidaConsola;

    //}else{
       // retornarSalida = "NO SE ENCONTRO EL NODO REQUERIDO";
    ///}





    
    // ArrayEntorno.forEach(function (item, index) {
    //     console.log(item);
    //     //PintarTablasSimbolos(item);
    //     i++
    //   });
    //   ArrayEntorno=[];
    //   Hereda = [];
    //     PintarTablasSimbolos(EntornoPadre);
    // return cadenaTablaSimbolos;

    return retornarSalida;
}


function recorrer(nodos,Entorno,encoding,EntornoOriginal){
    //var nodos= new nodito();
    
    console.log(nodos.Tipo);



    switch(nodos.Tipo){
        case "Xpath":
            
            var todo= recorrer(nodos.Hijos[0],Entorno,encoding);
            return todo;
        ;
        case "OPERACIONOR:simpleor":

                var sorI= recorrer(nodos.Hijos[0],Entorno,encoding);
                var sorD= recorrer(nodos.Hijos[1],Entorno,encoding);

            return sorI+"\n"+sorD;
            
        case "PATHRELL1:sdiagonal":
            TablaDiagonales.push(nodos.Valor);

                var hlength=nodos.Hijos.length; 
                var path1="";
                var path2="";    
                    if(hlength===1){
//                        biblioteca //libro//hoja
                    path1=recorrer(nodos.Hijos[0],Entorno,encoding);
                    

                    }else{
                        
                        path1=recorrer(nodos.Hijos[0],Entorno,encoding);
                        path2=recorrer(nodos.Hijos[1],EntornoActual,encoding);
                    }
            return path1+path2;
                
        case "PATHRELL1:ddiagonal":

            TablaDiagonales.push(nodos.Valor);

            var hlength=nodos.Hijos.length; 
            var path1="";
            var path2="";    
                if(hlength===1){
                path1=recorrer(nodos.Hijos[0],Entorno,encoding);

                }else{
                    path1=recorrer(nodos.Hijos[0],Entorno,encoding);
                    path2=recorrer(nodos.Hijos[1],EntornoActual,encoding);
                }
        return path1+path2;

        case "PATHRELL2:sdiagonal":
            TablaDiagonales.push(nodos.Valor);

                var hlength=nodos.Hijos.length; 
                var path1="";
                var path2="";    
                    if(hlength===1){
                    path1=recorrer(nodos.Hijos[0],Entorno,encoding);

                    }else{

                        path1=recorrer(nodos.Hijos[0],Entorno,encoding);
                        path2=recorrer(nodos.Hijos[1],EntornoActual,encoding);
                    }
            return path1+path2;
                
        case "PATHRELL2:ddiagonal":
            TablaDiagonales.push(nodos.Valor);

            var hlength=nodos.Hijos.length; 
                var path1="";
                var path2="";    
                    if(hlength===1){
                    path1=recorrer(nodos.Hijos[0],Entorno,encoding);
                    
                    }else{

                       
                        path1=recorrer(nodos.Hijos[0],Entorno,encoding);
                        path2=recorrer(nodos.Hijos[1],EntornoActual,encoding);
                    }
        return path1+path2;


        case "ACCES:identificador":
            var tem = "0";

            TablaEntornosActualTemporal = TablaEntornosActual;
            TablaEntornosActual = [];
            TablaEntornosActualPadre = [];


            var TipoDiagonal = TablaDiagonales[TablaDiagonales.length-ContadorDiagonales];          
            // console.log("*** INICION DE TABLA DE DIAGONALES:"); 
            // console.log("Nodo:" + nodos.Valor + " Diagon:" + TipoDiagonal);                         //ver que diagonal es, y ver la posicion de diagonales
            
            // console.log("tamanio:"+TablaDiagonales.length + "cont:"+ContadorDiagonales );
            // for (let index = 0; index < TablaDiagonales.length; index++) {
            //     console.log("HAY:"+TablaDiagonales[index] + "POS:" + index);
            // }
            
            
            if(TipoDiagonal=="//"){
                for (let index = 0; index < TablaEntornosActualTemporal.length; index++) {
                    BuscarEntornoHijo(TablaEntornosActualTemporal[index] );
                }

                //entra unicamente si es el primer comando es //, ejm: //hola/cosa, si el // esta en medio del comando, no entra ej:  /hola//cosa
                if(TablaDiagonales[TablaDiagonales.length-1] == "//" && ContadorDiagonales==1){       
                    TablaEntornosActualTemporal=[]
                    TablaEntornosActualTemporal = TablaEntornosActual;
                    TablaEntornosActual = [];
                    TablaEntornosActualPadre = [];

                    for (let index = 0; index < TablaEntornosActualTemporal.length; index++) {
                        BuscarEntornoHijo(TablaEntornosActualTemporal[index] );
                    }
                }
                

                TablaEntornosActualTemporal =[];
                TablaEntornosActualTemporal = TablaEntornosActual;
                TablaEntornosActual = [];
                TablaEntornosActualPadre = [];

                for (let index = 0; index < TablaEntornosActualTemporal.length; index++) {
                    BuscarEntornosObjetos(nodos.Valor,TablaEntornosActualTemporal[index] );
                }
                
            }else{

                for (let index = 0; index < TablaEntornosActualTemporal.length; index++) {
                    BuscarEntornosObjetos(nodos.Valor,TablaEntornosActualTemporal[index] );
                }
                
            }

            ContadorDiagonales++;
            
            


            //     console.log("<<<<<<<    "+nodos.Valor+"\n");
            //     bandera=0;
            //     var tem="";
            //    var tem1=RecorrerXML(nodos.Valor,Entorno);
            //    if(tem1===null){
            //     return;
            //    }else{
            //     EntornoPadre=Entorno;
            //     //EntornoActual=tem1;
            //        bandera=1;
            //    }

               //                                                          //biblioteca //libro // pagin
               //var tem= "<"+">";
               //aqui busco en el entorno que si existe
        
            return tem;
                
        case "ACCES:arrobaidentificador":
            var tem = "0";
            //console.log("AQUI ENTRO EL ACCES.INDENTIFICADOR ->" + nodos.Valor);

            TablaEntornosActualTemporal = TablaEntornosActual;
            TablaEntornosActualTemporalPadre = TablaEntornosActualPadre;
            TablaEntornosActual = [];
            TablaEntornosActualPadre = [];


            var TipoDiagonal = TablaDiagonales[TablaDiagonales.length-ContadorDiagonales];  

            var tems=nodos.Valor.replace(/[@"]+/g, '');
            

            if(TipoDiagonal=="//"){
                for (let index = 0; index < TablaEntornosActualTemporal.length; index++) {
                    BuscarEntornoHijo(TablaEntornosActualTemporal[index] );
                }

                //entra unicamente si es el primer comando es //, ejm: //hola/cosa, si el // esta en medio del comando, no entra ej:  /hola//cosa
                if(TablaDiagonales[TablaDiagonales.length-1] == "//" && ContadorDiagonales==1){       
                    TablaEntornosActualTemporal=[]
                    TablaEntornosActualTemporal = TablaEntornosActual;
                    TablaEntornosActual = [];
                    TablaEntornosActualPadre = [];

                    for (let index = 0; index < TablaEntornosActualTemporal.length; index++) {
                        BuscarEntornoHijo(TablaEntornosActualTemporal[index] );
                    }

                    TablaEntornosActualTemporal=[]
                    TablaEntornosActualTemporal = TablaEntornosActual;
                    TablaEntornosActual = [];
                    TablaEntornosActualPadre = [];

                    for (let index = 0; index < TablaEntornosActualTemporal.length; index++) {
                        BuscarEntornoHijo(TablaEntornosActualTemporal[index] );
                    }
                }
                

                TablaEntornosActualTemporal =[];
                TablaEntornosActualTemporal = TablaEntornosActual;
                TablaEntornosActual = [];
                TablaEntornosActualPadre = [];

                for (let index = 0; index < TablaEntornosActualTemporal.length; index++) {
                    BuscarEntornosAtributos(tems, TablaEntornosActualTemporal[index]);
                }
                
            }else{

                for (let index = 0; index < TablaEntornosActualTemporal.length; index++) {
                    console.log("*** Padre ****");
                    console.log(TablaEntornosActualTemporal[index]);
                    BuscarEntornosAtributos(tems, TablaEntornosActualTemporal[index], TablaEntornosActualTemporalPadre[index]);
                }
                
            }

            ContadorDiagonales++;
            


            /*for (let index = 0; index < TablaEntornosActualTemporal.length; index++) {
                BuscarEntornos(nodos.Valor,TablaEntornosActualTemporal[index] );
            }

            
            

            if(TablaEntornosActual.length !=0 || TablaEntornosActual[0] === undefined){
                tem = "1";
            }*/
            //aqui busco en el entorno que si existe
            // var tem1=RecorrerXML(nodos.Valor,Entorno);
            // var tem2=tem1.split('@');
            // var tem=tem2[1];

            console.log("AQUI ENTRO EL ACCES.ARROBAidentificador" + nodos.valor);

        return tem;

        case "ACCES:arrobamul":
            //aqui busco en el entorno que si existe
            var tem="";
        return tem;
        case "ACCES:spunto":
            var tem="";
            //aqui busco en el entorno que si existe
        return tem;
        case "ACCES:dpunto":
            var tem="";
            //aqui busco en el entorno que si existe
        return tem;
        case "AXISNAME:UNICO":
            var tem="";
            var Axis1=nodos.Hijos[0].Valor;
            var Axis2=recorrer(nodos.Hijos[2],Entorno,encoding);
            if(Axis1==="ancestor"){

            }else if(Axis1==="ancestor_or_self"){

            }else if(Axis1==="attribute"){

            }else if(Axis1==="child"){

            }else if(Axis1==="descendant"){

            }else if(Axis1==="descendant_or_self"){

            }else if(Axis1==="following"){

            }else if(Axis1==="following_sibling"){

            }else if(Axis1==="namespace_node"){

            }else if(Axis1==="parent"){

            }else if(Axis1==="preceding"){

            }else if(Axis1==="preceding_sibling"){

            }else if(Axis1==="self"){

            }

        return tem;

        case "OPERACION:mas":
            var tem="";
            var OP1=recorrer(nodos.Hijos[0],Entorno,encoding);
            var OP2=recorrer(nodos.Hijos[2],Entorno,encoding);
            if(typeof(OP1)==="boolean" && typeof(OP2)==="boolean"){
                
            }else if(typeof(OP1)==="number" && typeof(OP2)==="number"){
                tem=(parseInt(OP1) + parseInt(OP2));

            }else if(typeof(OP1)==="string" && typeof(OP2)==="string"){
                tem=OP1+""+ OP2;
            }else if((typeof(OP1)==="string" && typeof(OP2)==="number")||(typeof(OP1)==="number" && typeof(OP2)==="string")){
                tem=OP1+""+ OP2;
            }

        return tem;

        case "OPERACION:menos":
            var tem="";
            var OP1=recorrer(nodos.Hijos[0],Entorno,encoding);
            var OP2=recorrer(nodos.Hijos[2],Entorno,encoding);
            if(typeof(OP1)==="number" && typeof(OP2)==="number"){
                tem=(parseInt(OP1) - parseInt(OP2));

            }else {
                //error semantico
            }

        return tem;

        case "OPERACION:mul":
            var tem="";
            var OP1=recorrer(nodos.Hijos[0],Entorno,encoding);
            var OP2=recorrer(nodos.Hijos[2],Entorno,encoding);
            if(typeof(OP1)==="boolean" && typeof(OP2)==="boolean"){
                //error semantico
            }else if(typeof(OP1)==="number" && typeof(OP2)==="number"){
                tem=(parseInt(OP1) * parseInt(OP2));

            }else if(typeof(OP1)==="string" && typeof(OP2)==="string"){
                //error semantico
            }
        return tem;

        case "OPERACION:div":
            var tem="";
            var OP1=recorrer(nodos.Hijos[0],Entorno,encoding);
            var OP2=recorrer(nodos.Hijos[2],Entorno,encoding);
            if(typeof(OP1)==="boolean" && typeof(OP2)==="boolean"){
                //error semantico
            }else if(typeof(OP1)==="number" && typeof(OP2)==="number"){
                tem=(parseInt(OP1) / parseInt(OP2));

            }else if(typeof(OP1)==="string" && typeof(OP2)==="string"){
                //error semantico
            }
        return tem;

        case "OPERACION:igual":
            var tem="";
            var OP1=recorrer(nodos.Hijos[0],Entorno,encoding);
            var OP2=recorrer(nodos.Hijos[2],Entorno,encoding);
            if(typeof(OP1)==="boolean" && typeof(OP2)==="boolean"){
                
            }else if(typeof(OP1)==="number" && typeof(OP2)==="number"){
                

            }else if(typeof(OP1)==="string" && typeof(OP2)==="string"){
                
            }else if((typeof(OP1)==="string" && typeof(OP2)==="number")||(typeof(OP1)==="number" && typeof(OP2)==="string")){
                
            }
        return tem;

        case "OPERACION:diferente":
            var tem="";
            var OP1=recorrer(nodos.Hijos[0],Entorno,encoding);
            var OP2=recorrer(nodos.Hijos[2],Entorno,encoding);

            if(typeof(OP1)==="boolean" && typeof(OP2)==="boolean"){
            
            }else if(typeof(OP1)==="number" && typeof(OP2)==="number"){
                tem=(parseInt(OP1) % parseInt(OP2));

            }else if(typeof(OP1)==="string" && typeof(OP2)==="string"){

            }
        return tem;

        case "OPERACION:menorque":
            var tem="";
            var OP1=recorrer(nodos.Hijos[0],Entorno,encoding);
            var OP2=recorrer(nodos.Hijos[2],Entorno,encoding);

            if(typeof(OP1)==="number" && typeof(OP2)==="number"){
                tem=(parseInt(OP1) < parseInt(OP2));

            }else if(typeof(OP1)==="string" && typeof(OP2)==="string"){

            }
        return tem;

        case "OPERACION:menorigual":
            var tem="";
            var OP1=recorrer(nodos.Hijos[0],Entorno,encoding);
            var OP2=recorrer(nodos.Hijos[2],Entorno,encoding);
            if(typeof(OP1)==="number" && typeof(OP2)==="number"){
                tem=(parseInt(OP1) <= parseInt(OP2));

            }else if(typeof(OP1)==="string" && typeof(OP2)==="string"){

            }
        return tem;

        case "OPERACION:mayorque":
            var tem="";
            var OP1=recorrer(nodos.Hijos[0],Entorno,encoding);
            var OP2=recorrer(nodos.Hijos[2],Entorno,encoding);
            if(typeof(OP1)==="number" && typeof(OP2)==="number"){
                tem=(parseInt(OP1) > parseInt(OP2));

            }else if(typeof(OP1)==="string" && typeof(OP2)==="string"){

            }
        return tem;

        case "OPERACION:mayorigual":
            var tem="";
            var OP1=recorrer(nodos.Hijos[0],Entorno,encoding);
            var OP2=recorrer(nodos.Hijos[2],Entorno,encoding);
            if(typeof(OP1)==="number" && typeof(OP2)==="number"){
                tem=(parseInt(OP1) >= parseInt(OP2));

            }else if(typeof(OP1)==="string" && typeof(OP2)==="string"){

            }
        return tem;

        case "OPERACION:or":

            console.log("$$$$$$$$$$$$$$$$$$ ENTRO A OR $$$$$$$$$$$$$$$$$$$");

            // if (BanderaHayAtributos) {
            //     EscribirSalidaAtriutos();
            // }else{
            //     EscribirSalidaConsola();
            // }

            var tem="";
            var OP1=recorrer(nodos.Hijos[0],Entorno,encoding);
            var OP2=recorrer(nodos.Hijos[2],Entorno,encoding);
            if(typeof(OP1)==="boolean" && typeof(OP2)==="boolean"){
            
            }else if(typeof(OP1)==="number" && typeof(OP2)==="number"){
                

            }else if(typeof(OP1)==="string" && typeof(OP2)==="string"){

            }

        return tem;

        case "OPERACION:and":
            var tem="";
            var OP1=recorrer(nodos.Hijos[0],Entorno,encoding);
            var OP2=recorrer(nodos.Hijos[2],Entorno,encoding);


            if(typeof(OP1)==="boolean" && typeof(OP2)==="boolean"){
            
            }else if(typeof(OP1)==="number" && typeof(OP2)==="number"){
                

            }else if(typeof(OP1)==="string" && typeof(OP2)==="string"){

            }


        return tem;

        case "OPERACION:mod":
            var tem;
            var OP1=recorrer(nodos.Hijos[0],Entorno,encoding);
            var OP2=recorrer(nodos.Hijos[2],Entorno,encoding);
            if(typeof(OP1)==="boolean" && typeof(OP2)==="boolean"){
            
            }else if(typeof(OP1)==="number" && typeof(OP2)==="number"){
                

            }else if(typeof(OP1)==="string" && typeof(OP2)==="string"){

            }
        return tem;

        case "OPERAD:decimal":
            var tem=nodos.Valor;
        return tem;

        case "OPERAD:entero":
            var tem=nodos.Valor;
            

        return tem;

        case "OPERAD:cadenaS":
            var tem=nodos.Valor;
        return tem;

        case "OPERAD:cadenaC":
            var tem=nodos.Valor;
        return tem;

        case "METODO:text":
            var tem="";
        return tem;

        case "METODO:node":
            var tem="";
        return tem;

        case "METODO:last":
            var tem="";
        return tem;

        case "METODO:posicion":
            var tem="";
        return tem;

        case "METODO:atributo":
            var tem="";
            var OP=recorrer(nodos.Hijos[1],Entorno,encoding);
        return tem;

        case "METODO:etiqueta":
            var tem="";
            var OP=recorrer(nodos.Hijos[1],Entorno,encoding);
        return tem;

        
        
    }
   
}



function BuscarEntornosObjetos(token,entornoObjeto) {
    var contadorEntorno = 0;
    while (entornoObjeto.tabla[String(contadorEntorno)] != undefined) {

        if(entornoObjeto.tabla[String(contadorEntorno)].indentificador=== token.toLowerCase()){     //<---- comparo con minusculas, por que el identificador son  todos minusculas       
            TablaEntornosActual.push(entornoObjeto.tabla[String(contadorEntorno)].entorno);
            TablaEntornosActualPadre.push(entornoObjeto.tabla[String(contadorEntorno)]);           
        }

        contadorEntorno++;
    }
}


function BuscarEntornosAtributos(token,entornoObjeto,simboloObjeto) {
    var contadorEntorno = 0;

    while (entornoObjeto.tabla[String(contadorEntorno)] != undefined) {

        if(entornoObjeto.tabla[String(contadorEntorno)].indentificador=== token.toLowerCase()){     //<---- comparo con minusculas, por que el identificador son  todos minusculas       
            
            //console.log("ES UN ATRIBUTO");

            //console.log(entornoObjeto.tabla[String(contadorEntorno)]);
            TablaAtributos.push(entornoObjeto.tabla[String(contadorEntorno)]);
            TablaEntornosActual.push(entornoObjeto);
            TablaEntornosActualPadre.push(simboloObjeto);


            BanderaHayAtributos = true;

            // TablaEntornosActual.push(entornoObjeto.tabla[String(contadorEntorno)].entorno);
            // TablaEntornosActualPadre.push(entornoObjeto.tabla[String(contadorEntorno)]);           
        }

        contadorEntorno++;
    }
}


function BuscarEntornoHijo(entornoObjeto) {
    var contadorEntorno = 0;

    while (entornoObjeto.tabla[String(contadorEntorno)] != undefined) {

//if(entornoObjeto.tabla[String(contadorEntorno)].indentificador=== token.toLowerCase()){     //<---- comparo con minusculas, por que el identificador son  todos minusculas       
            TablaEntornosActual.push(entornoObjeto.tabla[String(contadorEntorno)].entorno);
            TablaEntornosActualPadre.push(entornoObjeto.tabla[String(contadorEntorno)]);           
        //}


        contadorEntorno++;
    }
}


function EscribirSalidaAtriutos(){
    var Simbolo;

    espacios = "";
    for (let i = 0; i < TablaAtributos.length; i++) {
        Simbolo = TablaAtributos[i];

        cadenaSalidaConsola += Simbolo.indentificador + "=" + Simbolo.valor + "\n";

    }

}


var espacios = "";
function EscribirSalidaConsola(){
    var Simbolo;
    //cadenaSalidaConsola = "";
    espacios = "";
    for (let i = 0; i < TablaEntornosActual.length; i++) {
        Simbolo = TablaEntornosActualPadre[i];

        cadenaSalidaConsola += "<" +Simbolo.indentificador + ">";

        EscribirEntornos(TablaEntornosActual[i]);

        if(Simbolo.valor != ""){
            cadenaSalidaConsola += " " + Simbolo.valor + " "
        }

        cadenaSalidaConsola += "</" +Simbolo.indentificador + ">\n\n";
    }

}

function EscribirEntornos(entornoObjeto){
    var Simbolo;
    var contadorEntorno = 0;
    var tipo = "";

    while (entornoObjeto.tabla[String(contadorEntorno)] != undefined) {
        
        tipo = Tipo_1.Tipo[entornoObjeto.tabla[String(contadorEntorno)].tipo];

        if (tipo != "ATRIBUTO") {
            cadenaSalidaConsola += "\n<" + entornoObjeto.tabla[String(contadorEntorno)].indentificador + ">";
            EscribirEntornos(entornoObjeto.tabla[String(contadorEntorno)].entorno);
            if(entornoObjeto.tabla[String(contadorEntorno)].valor != ""){
                cadenaSalidaConsola += " " + entornoObjeto.tabla[String(contadorEntorno)].valor + " "
            }else{
                cadenaSalidaConsola +="\n"
            }
            cadenaSalidaConsola += "</" + entornoObjeto.tabla[String(contadorEntorno)].indentificador + ">";
        }else{
            cadenaSalidaConsola += entornoObjeto.tabla[String(contadorEntorno)].indentificador + "=" + entornoObjeto.tabla[String(contadorEntorno)].valor;
        }

        contadorEntorno++;
    }
}




module.exports = { AnalizarAsc: AnalisisXPath , recorrerXpathAsc:recorrer,RUN:Run};





