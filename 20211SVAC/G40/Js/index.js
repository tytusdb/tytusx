"use strict";

function CargarXML(){

    var contenido = editor.getValue();
    if (contenido == ""){
        SalidaXPath.setValue("No hay entrada para analizar.");
        SalidaXPath.refresh();
    } else {

        analisisCorrecto = EjecutarXMLAsc(contenido);
       
        if (analisisCorrecto) {
            NumeroE = 1;
            DOTxmlCSTasc = "";
            GenerarDOT.id_n = 1;
            DOTxmlCSTasc = GenerarDOT.recorrerDOT(resultadoXML[1]);
            DOTxmlCSTasc = "digraph {" + DOTxmlCSTasc + "}";
            localStorage.setItem('cstXML',DOTxmlCSTasc);      
            ErroresSemanticosXML(resultadoXML[0]);                              
            console.log(ListaErr.getErrores());
            console.log(resultadoXML[0]);
            localStorage.setItem('errJSON',JSON.stringify(ListaErr.errores, null, 2));
            SetSalida(JSON.stringify(ListaErr.errores, null, 2));
        } else {
            SetSalida("El analizador no pudo recuperarse de un error sintactico.");
        }
    }        
}

function EjecutarXMLAsc(contenidoXML){
    try {
        ListaErr.limpiarArreglo();
        //Parser XML ascendente
        //resultadoXML = XMLasc.parse(contenidoXML);
        resultadoXML = XMLascReports.parse(contenidoXML);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

function ErroresSemanticosXML(objetos){

    for (var i=0; i < objetos.length;i++ ) {
        
        if (objetos[i].identificador1 == objetos[i].identificador2){
            ErroresSemanticosXML(objetos[i].listaObjetos);
        } else {
            ListaErr.agregarError(new Error(NumeroE, i+1,1, "Semántico", objetos[i].identificador1+` no es igual que `+objetos[i].identificador2,"XML")); NumeroE++;
            objetos.splice(i,1);
            i--; 
           // continue;
        }
        
    }


}

function SetSalida(texto){
    SalidaXPath.setValue(texto);
    SalidaXPath.refresh();
}



