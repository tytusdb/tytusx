"use strict";

function CargarXML(){

    var contenido = editor.getValue();
    var contenidoXpath = EntradaXPath.getValue();

    if (contenido == ""){
        SalidaXPath.setValue("No hay entrada XML para analizar.");
        SalidaXPath.refresh();
    } else {

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
            SetSalida("El parser XML no pudo recuperarse de un error sintactico en el parser.");
        }

        if (analisisCorrecto) {

            if (contenidoXpath == ""){
                SalidaXPath.setValue("No hay entrada XPath para analizar pero se han generado reportes XML");
                SalidaXPath.refresh();
            } else {

                analisisXpathCorrecto = EjecutarXpathAsc(contenidoXpath);

                if (analisisXpathCorrecto){

                    DOTXPATHASTasc = GenerarDOT.recorrerDOT(nodoxPATHASC);
                    DOTXPATHASTasc = "digraph {" + DOTXPATHASTasc + "}";
                    localStorage.setItem('astXPATH',DOTXPATHASTasc);
                    localStorage.setItem('errJSON',JSON.stringify(ListaErr.errores, null, 2));
                    console.log("↓ Funcion XPath ↓");
                    console.log(resultadoXPath);
                    resultadoXPath.ejecutar(tablaSimbolosXML.getEntornoGlobal(),null);
                    SetSalida("TODO SALIO BIEN :D!!");
                } else {
                    SetSalida("El parser Xpath no pudo recuperarse de un error sintactico.");
                }

            }

        }

    }        
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
                codificacion = objetos[i].texto;
                console.log("La nueva codificacion es: "+codificacion);
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

function SetSalida(texto){
    SalidaXPath.setValue(texto);
    SalidaXPath.refresh();
}



