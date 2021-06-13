function ejecutarXPATH(tds:[],listaDir){

        if(listaDir.dato.tipo == TIPO_DATO.IDENTIFICADOR){
            let temporal = BusquedaXML(tds, listaDir.dato.valor);
            let temporal2;
            let d = listaDir.ruta2;
            if(listaDir.ruta2.ruta2 != undefined){
                ejecutarXPATH(temporal[0], d);
            }else{
                temporal2 = BusquedaXML(temporal[0], listaDir.dato.valor);
            }
            console.log('ESTO ES LO QUE IMPRIME' + temporal2);
        }

}



function ejecutarXPATH2(tds:[],listaDir){

    if(listaDir.dato.tipo == TIPO_DATO.IDENTIFICADOR){
        let temporal = BusquedaXML(tds, listaDir.dato.valor);
        let d = listaDir.ruta2;
        if(listaDir.ruta2 != undefined){
            ejecutarXPATH(temporal[0], d);
        }else{
            let temporal2 = BusquedaXML(temporal, listaDir.dato.valor);
        }
        console.log('ESTO ES LO QUE IMPRIME' + temporal2);
    }

}