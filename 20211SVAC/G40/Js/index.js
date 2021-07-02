"use strict";

function Optimizar(){
    ListaOptimizaciones = [];
    var contenido = SalidaTraduccion.getValue();
    if (contenido == ""){
        window.alert("No hay C3D para optimizar :O !");
    } else {

        pasada = 1;
        contenidoOptimizar = contenido;
        var backup = contenido;
        for(var i = 0; i<3; i++){

        analisisOptimizadorCorrecto = EjecutarOptimizador(contenidoOptimizar);

        if (analisisOptimizadorCorrecto){
            console.log("Pasada numero: " + pasada);
            //console.log("↓ RESULTADO PARSER OPTIMIZADOR ↓");
            //console.log(resultadoOptimizador);
            var Optimizar = new Optimizador(resultadoOptimizador);
            contenidoOptimizar = Optimizar.Ejecutar();
            pasada++;           
        } else {
            break;
            }          
        }

        if(analisisOptimizadorCorrecto){
            SalidaTraduccion.setValue(contenidoOptimizar);
            window.alert("C3D optimizado exitosamente :D !");
            console.log(ListaOptimizaciones);
            localStorage.setItem('opJSON',JSON.stringify(ListaOptimizaciones, null, 2));
        } else {
            window.alert("El parser del Optimizador no pudo recuperarse de un error sintactico D: !");
            SalidaTraduccion.setValue(backup);
        }

    }

}

function EjecutarOptimizador(contenidoC3D){ 
    try {

        resultadoOptimizador = GramaticaOptimizador.parse(contenidoC3D);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

function CargarXML(){

    
    var contenido = "";
    salidaGlobal = "";

    if(tab==1){
        contenido = editor.getValue();
    } else if (tab==2){
        contenido = editor2.getValue();
    } else if (tab==3){
        contenido = editor3.getValue();
    } else if (tab==4){
        contenido = editor4.getValue();
    } 

    
    var contenidoXpath = EntradaXPath.getValue();
    var contenidoXQuery = EntradaXQuery.getValue();

    if (contenido == ""){
        SalidaXPath.setValue("No hay entrada XML para analizar.");
        SalidaXPath.refresh();
    } else {

        contenido = ReemplazarEspeciales(contenido);
       //console.log(contenido);
        analisisCorrecto = EjecutarXMLAsc(contenido);
        
        if (analisisCorrecto) {
            IDentorno = 1;
            IDobj = 1;
            NumeroE = 1;
            DOTxmlCSTasc = "";
            GenerarDOT.id_n = 1;
            DOTxmlCSTasc = GenerarDOT.recorrerDOT(resultadoXML[1]);
            DOTxmlCSTasc = "digraph {" + DOTxmlCSTasc + "}";
            localStorage.setItem('cstXML',DOTxmlCSTasc);
            ExtraerCodificacion(resultadoXML[0]);       
            ErroresSemanticosXML(resultadoXML[0]);
            heap = [];
            stack = [];
            contadorStack = 0;
            contadorTemporales = 0;
            contadorEtiquetas = 0;
            SP = 2;
            HP = 0;
            T0 = 0;
            T1 = 0;      
            xmlC3D = "";
            xmlC3D = C3DXML.traducir(resultadoXML[0]);
            localStorage.setItem('heapJSON',JSON.stringify(heap, null, 2));          
            var tablaSimbolosXMLAux = new TablaSimbolosXML();                     
            tablaSimbolosXMLAux.LlenarTabla(tablaSimbolosXMLAux.entornoGlobal,resultadoXML[0]);
            tablaSimbolosXML = tablaSimbolosXMLAux;          
            var ReportesTSXML = new ReporteTablaSimbolosXML();
            ReportesTSXML.limpiarArreglo();
            ReportesTSXML.GenerarArreglo(tablaSimbolosXML.entornoGlobal,"Global");
            console.log("↓ Lista de errores ↓");
            console.log(ListaErr.getErrores());
            console.log("↓ Estructura XML ↓");
            console.log(resultadoXML[0]);
            console.log("↓ Tabla Simbolos ↓");
            console.log(tablaSimbolosXML);
            console.log("↓ Arreglo Simbolos ↓");
            console.log(ReportesTSXML.arreglo);
            RGxml.arreglo = RGxml.arreglo.reverse();
            localStorage.setItem('tsJSON',JSON.stringify(ReportesTSXML.arreglo, null, 2));
            localStorage.setItem('errJSON',JSON.stringify(ListaErr.errores, null, 2));
            localStorage.setItem('rgJSON',JSON.stringify(RGxml.arreglo, null, 2));
            
        } else {
            SetSalida("El parser XML no pudo recuperarse de un error sintactico.");
        }

        if (analisisCorrecto) {

            if (contenidoXpath == ""){
                EntradaXPath.setValue("No hay entrada XPath para analizar pero se han generado reportes XML");
                EntradaXPath.refresh();
            } else {

                analisisXpathCorrecto = EjecutarXpathAsc(contenidoXpath);

                if (analisisXpathCorrecto){

                    DOTXPATHASTasc = GenerarDOT.recorrerDOT(nodoxPATHASC);
                    DOTXPATHASTasc = "digraph {" + DOTXPATHASTasc + "}";
                    localStorage.setItem('astXPATH',DOTXPATHASTasc);
                    localStorage.setItem('errJSON',JSON.stringify(ListaErr.errores, null, 2));
                    console.log("↓ Funcion XPath ↓");
                    console.log(resultadoXPath);
                    
                    salidaGlobal = "";
                    var contador = 1;
                    resultadoXPath.forEach(function (funcion){

                        salidaGlobal+="↓ Resultado consulta XPath "+contador+" ↓\n\n";
                        salidaRecursiva = "";
                        salidaXPath = funcion.ejecutar(tablaSimbolosXML.getEntornoGlobal(),null);
                        //console.log(salidaXPath);
                        GenerarSalidaXPath(salidaXPath);

                        if(salidaRecursiva!=""){
                            salidaGlobal+= salidaRecursiva + "\n\n";
                        } else {
                            salidaGlobal+= "No se encontraron coincidencias. :(\n\n";
                        }

                        contador++;
                    } );
                    
                    SetSalida(salidaGlobal);
                    localStorage.setItem('errJSON',JSON.stringify(ListaErr.errores, null, 2));

                    /* TRADUCIENDO XPATH A C3D */
                    xpathC3D = "";
                    var funcionesXPath = contenidoXpath.split(/[ ]*\|[ ]*/g);

                    for(var i = 0; i < resultadoXPath.length; i++) {
                    
                        var salida = C3DXPATH.traducir(funcionesXPath[i] ,resultadoXPath[i]);
                        xpathC3D += salida + "\n\n";
                    }

                } else {
                    SetSalida("El parser Xpath no pudo recuperarse de un error sintactico.");
                }

            }

        }

        if (analisisCorrecto) {

            if (contenidoXQuery == ""){
                EntradaXQuery.setValue("No hay entrada XQuery para analizar pero se han generado reportes XML");
                EntradaXQuery.refresh();
            } else {

                analisisXqueryCorrecto = EjecutarXQueryAsc(contenidoXQuery);

                if (analisisXqueryCorrecto){

                    DOTXQUERYASTAsc = GenerarDOT.recorrerDOT(resultadoXQuery[1]);
                    DOTXQUERYASTAsc = "digraph {" + DOTXQUERYASTAsc + "}";
                    localStorage.setItem('astXQUERY', DOTXQUERYASTAsc);
                    
                    console.log("↓ Funcion XQuery ↓");
                    console.log(resultadoXQuery[0]);
                    funcionesXQuery = [];

                    var contador = 1;
                    resultadoXQuery[0].forEach(function (funcion){

                        salidaGlobal+="↓ Resultado consulta XQuery "+contador+" ↓\n\n";
                        salidaRecursiva = "";
                        salidaXQuery = funcion.ejecutar(tablaSimbolosXML.getEntornoGlobal(),null);

                        if(funcion.getTipo() == TipoXInstruccion.XPATH || funcion.getTipo() == TipoXInstruccion.XFLOWER){

                            GenerarSalidaXPath(salidaXQuery);

                            if(salidaRecursiva!=""){
                                salidaGlobal+= salidaRecursiva + "\n\n";
                            } else {
                                salidaGlobal+= "No se encontraron coincidencias. :(\n\n";
                            }

                        } else {
                            salidaGlobal+= salidaXQuery.toString() + "\n\n";
                        } 

                        contador++;
                    } );
                    
                    SetSalida(salidaGlobal);
                    localStorage.setItem('errJSON',JSON.stringify(ListaErr.errores, null, 2));

                } else {                   
                    SetSalida("El parser XQuery no pudo recuperarse de un error sintactico.");
                }

            }

        }
    } 

 SetearTraduccion();
    
}

function CargarXMLDesc(){

    var contenido = "";

    if(tab==1){
        contenido = editor.getValue();
    } else if (tab==2){
        contenido = editor2.getValue();
    } else if (tab==3){
        contenido = editor3.getValue();
    } else if (tab==4){
        contenido = editor4.getValue();
    } 
    
    var contenidoXpath = EntradaXPath.getValue();

    if (contenido == ""){
        SalidaXPath.setValue("No hay entrada XML para analizar.");
        SalidaXPath.refresh();
    } else {

        contenido = ReemplazarEspeciales(contenido);
        analisisCorrecto = EjecutarXMLDesc(contenido);
        
        if (analisisCorrecto) {
            IDentorno = 1;
            IDobj = 1;
            NumeroE = 1;
            DOTxmlCSTdesc = "";
            GenerarDOT.id_n = 1;
            DOTxmlCSTdesc = GenerarDOT.recorrerDOT(resultadoXML[1]);
            DOTxmlCSTdesc = "digraph {" + DOTxmlCSTdesc + "}";
            localStorage.setItem('cstXMLDesc',DOTxmlCSTdesc);
            ExtraerCodificacion(resultadoXML[0]);       
            ErroresSemanticosXML(resultadoXML[0]);
            heap = [];
            stack = [];
            contadorStack = 0;
            contadorTemporales = 0;
            SP = 2;
            HP = 0;
            T0 = 0;
            T1 = 0;
            xmlC3D = "";
            xmlC3D = C3DXML.traducir(resultadoXML[0]);    
            var tablaSimbolosXMLAux = new TablaSimbolosXML();                     
            tablaSimbolosXMLAux.LlenarTabla(tablaSimbolosXMLAux.entornoGlobal,resultadoXML[0]);
            tablaSimbolosXML = tablaSimbolosXMLAux;
            var ReportesTSXML = new ReporteTablaSimbolosXML();
            ReportesTSXML.limpiarArreglo();
            ReportesTSXML.GenerarArreglo(tablaSimbolosXML.entornoGlobal,"Global");
            console.log("↓ Lista de errores ↓");
            console.log(ListaErr.getErrores());
            console.log("↓ Estructura XML ↓");
            console.log(resultadoXML[0]);
            console.log("↓ Tabla Simbolos ↓");
            console.log(tablaSimbolosXML);
            console.log("↓ Arreglo Simbolos ↓");
            console.log(ReportesTSXML.arreglo);
            RGxmlDesc.arreglo = RGxmlDesc.arreglo.reverse();
            localStorage.setItem('tsJSON',JSON.stringify(ReportesTSXML.arreglo, null, 2));
            localStorage.setItem('errJSON',JSON.stringify(ListaErr.errores, null, 2));
            localStorage.setItem('rgJSONdesc',JSON.stringify(RGxmlDesc.arreglo, null, 2));
            
        } else {
            SetSalida("El parser XML no pudo recuperarse de un error sintactico en el parser.");
        }

        if (analisisCorrecto) {

            if (contenidoXpath == ""){
                EntradaXPath.setValue("No hay entrada XPath para analizar pero se han generado reportes XML");
                EntradaXPath.refresh();
            } else {

                analisisXpathCorrecto = EjecutarXpathDesc(contenidoXpath);

                if (analisisXpathCorrecto){

                    DOTXPATHASTDesc = GenerarDOT.recorrerDOT(nodoxPATHDESC);
                    DOTXPATHASTDesc = "digraph {" + DOTXPATHASTDesc + "}";
                    localStorage.setItem('astXPATHDesc',DOTXPATHASTDesc);
                    localStorage.setItem('errJSON',JSON.stringify(ListaErr.errores, null, 2));
                    console.log("↓ Funcion XPath ↓");
                    console.log(resultadoXPath);
                    
                    salidaGlobal = "";
                    var contador = 1;
                    resultadoXPath.forEach(function (funcion){

                        salidaGlobal+="↓ Resultado consulta "+contador+" ↓\n\n";
                        salidaRecursiva = "";
                        salidaXPath = funcion.ejecutar(tablaSimbolosXML.getEntornoGlobal(),null);
                        GenerarSalidaXPath(salidaXPath);

                        if(salidaRecursiva!=""){
                            salidaGlobal+= salidaRecursiva + "\n\n";
                        } else {
                            salidaGlobal+= "No se encontraron coincidencias. :(\n\n";
                        }

                        contador++;
                    } );
                    salidaGlobal = salidaGlobal.replaceAll(" =\"\"", "");
                    SetSalida(salidaGlobal);
                    localStorage.setItem('errJSON',JSON.stringify(ListaErr.errores, null, 2));
                } else {
                    SetSalida("El parser Xpath descendente no pudo recuperarse de un error sintactico.");
                }

            }

        }

    }
    SetearTraduccion();        
}

function EjecutarXMLAsc(contenidoXML){
    try {
        ListaErr.limpiarArreglo();
        RGxml.limpiarArreglo();
        //Parser XML ascendente
        resultadoXML = XMLascReports.parse(contenidoXML);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

function EjecutarXMLDesc(contenidoXML){
    try {
        ListaErr.limpiarArreglo();
        RGxmlDesc.limpiarArreglo();
        //Parser XML ascendente
        resultadoXML = XMLdescReports.parse(contenidoXML);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

function EjecutarXpathAsc(contenidoXpath){

    try {
        nodoxPATHASC = new NodoArbol("INICIO","");
        //Parser XPath ascendente
        resultadoXPath = XpathAsc.parse(contenidoXpath);
        return true;
        
    } catch (error) {
        console.log(error);
        return false;
    }

}

function EjecutarXpathDesc(contenidoXpath){

    try {
        nodoxPATHDESC = new NodoArbol("INICIO","");
        //Parser XPath ascendente
        resultadoXPath = XpathDesc.parse(contenidoXpath);
        return true;
        
    } catch (error) {
        console.log(error);
        return false;
    }

}

function EjecutarXQueryAsc(contenidoXQuery){

    try {
        //Parser XPath ascendente
        resultadoXQuery = XQueryAsc.parse(contenidoXQuery);
        return true;
        
    } catch (error) {
        console.log(error);
        return false;
    }

}

function ErroresSemanticosXML(objetos){

    for (var i=0; i < objetos.length;i++ ) {
        
        if (objetos[i].identificador1.toLowerCase() == objetos[i].identificador2.toLowerCase()){
            ErroresSemanticosXML(objetos[i].listaObjetos);
        } else {
            ListaErr.agregarError(new Error(NumeroE, i+1,1, "Semántico", objetos[i].identificador1+` no es igual que `+objetos[i].identificador2,"XML")); NumeroE++;
            objetos.splice(i,1);
            i--; 
           // continue;
        }
        
    }


}

function ExtraerCodificacion(objetos){

    for (var i=0; i < objetos.length;i++ ) {
        
        if (objetos[i].agregar >= 1){
           // console.log("hola");
            ExtraerCodificacion(objetos[i].listaObjetos);
        } else {

            if (objetos[i].identificador1 == "version" && objetos[i].identificador2 == "version"){
                //codificacionGlobal = objetos[i].texto;
                DefinirCodificacion(objetos[i].texto);
                console.log("La nueva codificacion es: "+codificacionGlobal);
            }         
            objetos.splice(i,1);
            i--; 
           // continue;
        }
        
    }

}

function ObtenerObjetos(entorno){

    var objetos = [];
    

        entorno.getTabla().forEach(function (simbolo){

            if(simbolo.getTipo()==Tipo.STRUCT){

                if(!ObjetoYaExiste(objetos,simbolo.getValor().LeerID())){
                    objetos.push(simbolo.getValor());
                }  
            }  
        });


    return objetos;
}

function ObtenerEntornos(entorno){

    var entornoArr = [];
    

        entorno.getTabla().forEach(function (element){

            if(element.getTipo()==Tipo.STRUCT){
                entornoArr.push(element.getValor().getEntorno());
            }
    
        });


    return entornoArr;
}

function EntornoYaExiste(arreglo, id){

    var existe = false;

    arreglo.forEach(function (entorno){

        if(entorno.getID()==id){
            existe = true;
        }
    });

    return existe;

}



function ObjetoYaExiste(arreglo, id){

    var existe = false;

    arreglo.forEach(function (objeto){

        if(objeto.LeerID()==id){
            existe = true;
        }
    });

    return existe;

}

function AtributoYaExiste(arreglo, id){

    var existe = false;

    arreglo.forEach(function (atributo){

        if(atributo.getID()==id){
            existe = true;
        }
    });

    return existe;

}

function BuscarObjeto(arreglo, id){

    var existe = null;

    arreglo.forEach(function (objeto){

        if(objeto.getID().toLowerCase()==id.toLowerCase()){
            existe = objeto;
        }
    });

    return existe;

}

function GenerarSalidaXPath(objetos){

    if(objetos!=null){
        if(objetos!=[]){
            objetos.forEach(function (objeto){

                if(objeto.getAgregar()==1){
        
                    salidaRecursiva+='<'+objeto.getID();
                    
                    if (objeto.getAtributos().length > 0) {
                        objeto.getAtributos().forEach(function (atributo) {
                        salidaRecursiva+=" "+atributo.getID()+"="+`"`+atributo.getValor()+`"`;
                        });
                    }
                    salidaRecursiva+=">";
                    if (objeto.getObjetos().length > 0) {
                        salidaRecursiva+="\n"
                        GenerarSalidaXPath(objeto.getObjetos());
                    }
        
                    if(objeto.getTexto()!=""){
                        salidaRecursiva+= CambiarCodificacion(objeto.getTexto());
                    }
        
                    salidaRecursiva+='</'+objeto.getID()+'>'+"\n";
                } else if(objeto.getAgregar()==2){
        
                    salidaRecursiva+='<'+objeto.getID();
                    
                    if (objeto.getAtributos().length > 0) {
                        objeto.getAtributos().forEach(function (atributo) {
                        salidaRecursiva+=" "+atributo.getID()+"="+`"`+atributo.getValor()+`"`;
                        });
                    }
                    salidaRecursiva+=" />"+"\n";
                    }
        
            });
        } else {
            salidaRecursiva = "No se encontraron coincidencias. :(";
        }
    } else {
        salidaRecursiva = "No se encontraron coincidencias. :(";
    }

}

function SetSalida(texto){
    SalidaXPath.setValue(texto);
    SalidaXPath.refresh();
}

function ReemplazarEspeciales(cadena){

    var pattern = /(?<=[a-zA-ZñÑ]+)'/gi;
    var aposPattern = /&apos;/gi;
    var ampPattern = /&amp;/gi;
    var ltPattern = /&lt;/gi;
    var gtPattern = /&gt;/gi;
    var quotPattern = /&quot;/gi;
    cadena = cadena.replace(pattern, " &apos; ");
    cadena = cadena.replace(aposPattern, " &apos; ");
    cadena = cadena.replace(ampPattern, " &amp; ");
    cadena = cadena.replace(ltPattern, " &lt; ");
    cadena = cadena.replace(gtPattern, " &gt; ");
    cadena = cadena.replace(quotPattern, " &quot; ");
    return cadena
}

function DefinirCodificacion(codificacion){

    switch(codificacion.toLowerCase()) {
        case "utf-8":
        case "utf8":
            codificacionGlobal = "UTF-8";
          break;
        case "iso-8859-1":
        case "iso8859-1":
        case "iso-88591":
        case "iso88591": 
            codificacionGlobal = "ISO-8859-1";
          break;
        default:
            codificacionGlobal = "UTF-8";
      }
}

function CambiarCodificacion(cadena){
 try {
    var cadenaAux = cadena;
    var cadenaUTF8 = "";
    var cadenaISO = "";
    switch(codificacionGlobal) {
        case "UTF-8":
            cadenaUTF8 = decodeURIComponent(cadenaAux);
            cadenaISO = decodeURIComponent(escape(cadenaUTF8));
            cadenaAux = cadenaISO;
          break;
        case "ISO-8859-1": 
            cadenaUTF8 = unescape(encodeURIComponent(cadenaAux));
            cadenaAux = cadenaUTF8;
          break;
        default:
            cadenaUTF8 = decodeURIComponent(cadenaAux);
            cadenaISO = decodeURIComponent(escape(cadenaUTF8));
            cadenaAux = cadenaISO;
      }
    return cadenaAux;
 } catch (error) {
     console.log(error);
     return cadena
 }
}

function SetearTraduccion(){

    globalC3D = "";
    globalC3D += `/* ------ HEADERS ------ */
    #include <stdio.h>
    #include <math.h>
    
    double heap[30101999];
    double stack[30101999];
    double xheap[30101999];
    double xstack[30101999];
    double resultados[3010199];
    double SP;
    double HP;
    double XSP;
    double XHP;

    `;

    for(var i = 0; i< contadorTemporales;i++ ){
        if(i==0){
            globalC3D += `double t`+i.toString();
        } else{
            globalC3D += `, t`+i.toString();
        }
    }

    globalC3D += `;
    
    `;

    globalC3D += funcionesC3D;
    
    globalC3D += `int main(){
        
        //el stack pointer inicia en 2 porque en la posicion 0 guardamos el encoding
        //y la posicion 1 indicara donde termina el xml en el heap
        //El heap pointer inicia en cero.
        SP = 2;
        HP = 0;
        
        //guardamos el encoding en el stack en la posicion 0 (definida por default)
        // -1 : utf8
        // -2 : iso
        // -3 : ascii
        
        `;

    if(codificacionGlobal == "UTF-8"){
        globalC3D += `stack[(int)0] = -1;
        
        `;
        encodingXML = -1;
    } else {
        globalC3D += `stack[(int)0] = -2;
        
        `;
        encodingXML = -1;
    }

    
    globalC3D += xmlC3D;

    globalC3D += "\n";

    globalC3D += xpathC3D;

    globalC3D +=`

        return 0;

    }`;    

    SalidaTraduccion.setValue(globalC3D);
    SalidaTraduccion.refresh();

    stack.unshift(encodingXML,finalXML);
    localStorage.setItem('stackJSON',JSON.stringify(stack, null, 2));
    window.alert("Traducción XML a C3D exitosa, scrollee hacia abajo para ver resultado. :D");
}

